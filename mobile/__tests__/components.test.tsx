import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import {
  Badge, Button, Card, EmptyState, ErrorBanner, ListItem, LoadingState, TextField,
} from '../src/components';
import { Text } from 'react-native';

describe('Button', () => {
  it('calls onPress', () => {
    const onPress = jest.fn();
    render(<Button title="Save" onPress={onPress} />);
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not fire when disabled or loading', () => {
    const onPress = jest.fn();
    const { rerender } = render(<Button title="Save" onPress={onPress} disabled />);
    fireEvent.press(screen.getByText('Save'));
    rerender(<Button title="Save" onPress={onPress} loading />);
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });
});

describe('TextField', () => {
  it('shows label, reports changes and shows error', () => {
    const onChangeText = jest.fn();
    render(<TextField label="Email" value="" onChangeText={onChangeText} error="Required" />);
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByText('Required')).toBeTruthy();
    fireEvent.changeText(screen.getByLabelText('Email'), 'a@b.com');
    expect(onChangeText).toHaveBeenCalledWith('a@b.com');
  });
});

describe('Card, Badge', () => {
  it('render children and labels', () => {
    render(
      <Card>
        <Text>Inside</Text>
        <Badge label="Paid" tone="success" />
      </Card>,
    );
    expect(screen.getByText('Inside')).toBeTruthy();
    expect(screen.getByText('Paid')).toBeTruthy();
  });
});

describe('ListItem', () => {
  it('renders text and handles press', () => {
    const onPress = jest.fn();
    render(<ListItem title="Guest" subtitle="Today" right={<Badge label="Expected" />} onPress={onPress} />);
    expect(screen.getByText('Today')).toBeTruthy();
    expect(screen.getByText('Expected')).toBeTruthy();
    fireEvent.press(screen.getByText('Guest'));
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
    render(<ErrorBanner message="Failed" onRetry={onRetry} />);
    expect(screen.getByRole('alert')).toBeTruthy();
    fireEvent.press(screen.getByText('Retry'));
    expect(onRetry).toHaveBeenCalled();
  });
});
