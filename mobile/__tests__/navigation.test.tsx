import { fireEvent, render, screen } from '@testing-library/react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from '../src/navigation/RootNavigator';

const metrics = { frame: { x: 0, y: 0, width: 360, height: 640 }, insets: { top: 0, left: 0, right: 0, bottom: 0 } };

describe('app shell', () => {
  it('shows all six tabs and navigates between them and the stack', () => {
    render(
      <SafeAreaProvider initialMetrics={metrics}>
        <RootNavigator />
      </SafeAreaProvider>,
    );
    for (const tab of ['Home', 'Visitors', 'Notices', 'Amenities', 'Dues', 'Helpdesk']) {
      expect(screen.getAllByText(tab).length).toBeGreaterThan(0);
    }
    fireEvent.press(screen.getAllByText('Dues')[0]);
    expect(screen.getByText('Dues is coming soon')).toBeTruthy();
    fireEvent.press(screen.getAllByText('Home')[0]);
    fireEvent.press(screen.getByText('View details'));
    expect(screen.getByText('Details is coming soon')).toBeTruthy();
  });
});
