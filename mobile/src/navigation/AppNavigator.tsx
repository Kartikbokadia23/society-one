import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme';
import { AmenitiesScreen } from '../screens/AmenitiesScreen';
import { DuesScreen } from '../screens/DuesScreen';
import { HelpdeskScreen } from '../screens/HelpdeskScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { NoticesScreen } from '../screens/NoticesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { VisitorsScreen } from '../screens/VisitorsScreen';

export type TabParamList = {
  Home: undefined;
  Visitors: undefined;
  Notices: undefined;
  Amenities: undefined;
  Dues: undefined;
  Helpdesk: undefined;
};
export type RootStackParamList = { Tabs: undefined; Settings: undefined };

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: typography.caption,
        tabBarIconStyle: { display: 'none' },
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { ...typography.heading, color: colors.text },
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

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
