import { fireEvent, render, screen } from '@testing-library/react-native';
import { Badge, Button, Card, EmptyState, ErrorBanner, ListItem, LoadingState, TextField } from '../src/components';
import { Text } from 'react-native';

describe('shared components', () => {
  it('Button fires onPress and is inert when disabled or loading', () => {
    const onPress = jest.fn();
    const { rerender } = render(<Button title="Save" onPress={onPress} />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
    rerender(<Button title="Save" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Save'));
    rerender(<Button title="Save" onPress={onPress} loading />);
    expect(screen.queryByText('Save')).toBeNull();
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('TextField shows label, error and reports changes', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Email" error="Required" onChangeText={onChangeText} />);
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Required')).toBeTruthy();
    fireEvent.changeText(screen.getByLabelText('Email'), 'a@b.c');
    expect(onChangeText).toHaveBeenCalledWith('a@b.c');
  });

  it('Card renders children', () => {
    render(<Card><Text>inside</Text></Card>);
    expect(screen.getByText('inside')).toBeTruthy();
  });

  it('ListItem renders text and handles press', () => {
    const onPress = jest.fn();
    render(<ListItem title="Flat A-101" subtitle="Block A" right={<Badge label="Paid" tone="success" />} onPress={onPress} />);
    expect(screen.getByText('Block A')).toBeTruthy();
    expect(screen.getByText('Paid')).toBeTruthy();
    fireEvent.press(screen.getByText('Flat A-101'));
    expect(onPress).toHaveBeenCalled();
  });

  it('Badge renders label', () => {
    render(<Badge label="Overdue" tone="danger" />);
    expect(screen.getByText('Overdue')).toBeTruthy();
  });

  it('EmptyState shows message and action', () => {
    const onAction = jest.fn();
    render(<EmptyState title="No notices" message="Check later" actionLabel="Refresh" onAction={onAction} />);
    expect(screen.getByText('Check later')).toBeTruthy();
    fireEvent.press(screen.getByText('Refresh'));
    expect(onAction).toHaveBeenCalled();
  });

  it('LoadingState shows message', () => {
    render(<LoadingState message="Fetching" />);
    expect(screen.getByText('Fetching')).toBeTruthy();
  });

  it('ErrorBanner shows message and retry', () => {
    const onRetry = jest.fn();
    render(<ErrorBanner message="Failed" onRetry={onRetry} />);
    expect(screen.getByText('Failed')).toBeTruthy();
    fireEvent.press(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalled();
  });
});
