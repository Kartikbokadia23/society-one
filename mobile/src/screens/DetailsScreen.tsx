import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { PlaceholderScreen } from './PlaceholderScreen';

export function DetailsScreen({ route }: NativeStackScreenProps<RootStackParamList, 'Details'>) {
  return <PlaceholderScreen title={route.params.title} description="Detail views are built by each module." />;
}
