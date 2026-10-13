import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AmenitiesScreen } from '../screens/AmenitiesScreen';
import { DetailsScreen } from '../screens/DetailsScreen';
import { DuesScreen } from '../screens/DuesScreen';
import { HelpdeskScreen } from '../screens/HelpdeskScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NoticesScreen } from '../screens/NoticesScreen';
import { VisitorsScreen } from '../screens/VisitorsScreen';
import { colors, typography } from '../theme/tokens';
import type { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { ...typography.heading, color: colors.text },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarIconStyle: { display: 'none' },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Visitors" component={VisitorsScreen} />
      <Tab.Screen name="Notices" component={NoticesScreen} />
      <Tab.Screen name="Amenities" component={AmenitiesScreen} />
      <Tab.Screen name="Dues" component={DuesScreen} />
      <Tab.Screen name="Helpdesk" component={HelpdeskScreen} />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={({ route }) => ({ title: route.params.title })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
