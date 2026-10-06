import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from 'react-native';
import { Badge, Button, Card, EmptyState, ErrorBanner, ListItem, LoadingState, TextField } from '../src/components';

describe('Button', () => {
  it('calls onPress', () => {
    const onPress = jest.fn();
    render(<Button title="Save" onPress={onPress} />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
  it('does not fire when disabled', () => {
    const onPress = jest.fn();
    render(<Button title="Save" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).not.toHaveBeenCalled();
  });
  it('does not fire when loading', () => {
    const onPress = jest.fn();
    render(<Button title="Save" onPress={onPress} loading />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('TextField', () => {
  it('shows label, emits changes and shows error', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Phone" onChangeText={onChangeText} error="Required" />);
    expect(screen.getByText('Phone')).toBeTruthy();
    expect(screen.getByText('Required')).toBeTruthy();
    fireEvent.changeText(screen.getByLabelText('Phone'), '123');
    expect(onChangeText).toHaveBeenCalledWith('123');
  });
});

describe('Card and Badge', () => {
  it('render children and label', () => {
    render(
      <Card>
        <Text>inside</Text>
        <Badge label="Paid" tone="success" />
      </Card>,
    );
    expect(screen.getByText('inside')).toBeTruthy();
    expect(screen.getByText('Paid')).toBeTruthy();
  });
});

describe('ListItem', () => {
  it('renders text and handles press', () => {
    const onPress = jest.fn();
    render(<ListItem title="Gate 1" subtitle="Guard" onPress={onPress} right={<Badge label="On" />} />);
    expect(screen.getByText('Guard')).toBeTruthy();
    fireEvent.press(screen.getByText('Gate 1'));
    expect(onPress).toHaveBeenCalled();
  });
});

describe('EmptyState', () => {
  it('renders message and action', () => {
    const onAction = jest.fn();
    render(<EmptyState title="Nothing here" message="Add one" actionLabel="Add" onAction={onAction} />);
    expect(screen.getByText('Add one')).toBeTruthy();
    fireEvent.press(screen.getByText('Add'));
    expect(onAction).toHaveBeenCalled();
  });
});

describe('LoadingState', () => {
  it('shows message', () => {
    render(<LoadingState message="Fetching" />);
    expect(screen.getByText('Fetching')).toBeTruthy();
  });
});

describe('ErrorBanner', () => {
  it('shows message and retry', () => {
    const onRetry = jest.fn();
    render(<ErrorBanner message="Boom" onRetry={onRetry} />);
    expect(screen.getByText('Boom')).toBeTruthy();
    fireEvent.press(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalled();
  });
});
