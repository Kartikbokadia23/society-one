import { fireEvent, render, screen } from '@testing-library/react-native';
import { Badge, Button, Card, EmptyState, ErrorBanner, ListItem, LoadingState, TextField } from '../src/components';
import { Text } from 'react-native';

describe('shared components', () => {
  it('Button fires onPress and is inert when disabled', () => {
    const onPress = jest.fn();
    const { rerender } = render(<Button title="Save" onPress={onPress} />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    rerender(<Button title="Save" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('Button hides its title while loading', () => {
    render(<Button title="Save" onPress={jest.fn()} loading />);
    expect(screen.queryByText('Save')).toBeNull();
  });

  it('TextField reports changes and shows errors', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Email" onChangeText={onChangeText} error="Required" />);
    fireEvent.changeText(screen.getByLabelText('Email'), 'a@b.c');
    expect(onChangeText).toHaveBeenCalledWith('a@b.c');
    expect(screen.getByText('Required')).toBeTruthy();
  });

  it('Card renders children', () => {
    render(<Card><Text>inside</Text></Card>);
    expect(screen.getByText('inside')).toBeTruthy();
  });

  it('ListItem shows title, subtitle and handles press', () => {
    const onPress = jest.fn();
    render(<ListItem title="Gate 1" subtitle="Guard" onPress={onPress} right={<Badge label="Open" tone="success" />} />);
    expect(screen.getByText('Guard')).toBeTruthy();
    expect(screen.getByText('Open')).toBeTruthy();
    fireEvent.press(screen.getByText('Gate 1'));
    expect(onPress).toHaveBeenCalled();
  });

  it('EmptyState renders action', () => {
    const onAction = jest.fn();
    render(<EmptyState title="Nothing here" message="Add one" actionLabel="Add" onAction={onAction} />);
    fireEvent.press(screen.getByText('Add'));
    expect(onAction).toHaveBeenCalled();
  });

  it('LoadingState shows message', () => {
    render(<LoadingState message="Fetching" />);
    expect(screen.getByText('Fetching')).toBeTruthy();
  });

  it('ErrorBanner shows message and retries', () => {
    const onRetry = jest.fn();
    render(<ErrorBanner message="Failed" onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toBeTruthy();
    fireEvent.press(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalled();
  });
});
