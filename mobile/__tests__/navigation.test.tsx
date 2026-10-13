import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { RootNavigator } from '../src/navigation/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const metrics = { frame: { x: 0, y: 0, width: 320, height: 640 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } };

describe('app shell', () => {
  it('shows all six tabs and navigates between them', () => {
    render(
      <SafeAreaProvider initialMetrics={metrics}>
        <RootNavigator />
      </SafeAreaProvider>,
    );
    for (const name of ['Home', 'Visitors', 'Notices', 'Amenities', 'Dues', 'Helpdesk']) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
    fireEvent.press(screen.getAllByText('Dues')[0]);
    expect(screen.getByText('Dues is coming soon')).toBeTruthy();
  });

  it('pushes a stack screen', () => {
    render(
      <SafeAreaProvider initialMetrics={metrics}>
        <RootNavigator />
      </SafeAreaProvider>,
    );
    fireEvent.press(screen.getByText('Open details'));
    expect(screen.getByText('Detail view placeholder.')).toBeTruthy();
  });
});
