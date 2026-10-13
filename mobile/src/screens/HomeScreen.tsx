import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Button } from '../components';
import type { RootStackParamList } from '../navigation/types';
import { PlaceholderScreen } from './PlaceholderScreen';

export function HomeScreen() {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <PlaceholderScreen title="Home" description="Your resident dashboard will appear here.">
      <Button title="View details" variant="secondary" onPress={() => nav.navigate('Details', { title: 'Details' })} />
    </PlaceholderScreen>
  );
}
