import { fireEvent, render, screen } from '@testing-library/react-native';
import { AppNavigator } from '../src/navigation/AppNavigator';

describe('AppNavigator', () => {
  it('renders all tabs with placeholder screens', () => {
    render(<AppNavigator />);
    for (const name of ['Home', 'Visitors', 'Notices', 'Amenities', 'Dues', 'Helpdesk']) {
      expect(screen.getAllByText(name).length).toBeGreaterThan(0);
    }
    fireEvent.press(screen.getAllByText('Dues')[0]);
    expect(screen.getAllByText('Dues').length).toBeGreaterThan(0);
  });
});
