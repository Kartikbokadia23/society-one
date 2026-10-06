import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors, typography } from '../theme/tokens';
import {
  AmenitiesScreen, DetailScreen, DuesScreen, HelpdeskScreen, HomeScreen, NoticesScreen, VisitorsScreen,
} from '../screens';

export type TabParamList = {
  Home: undefined; Visitors: undefined; Notices: undefined; Amenities: undefined; Dues: undefined; Helpdesk: undefined;
};
export type RootStackParamList = { Tabs: undefined; Detail: { id: string } | undefined };

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

export const TAB_SCREENS = [
  { name: 'Home', component: HomeScreen },
  { name: 'Visitors', component: VisitorsScreen },
  { name: 'Notices', component: NoticesScreen },
  { name: 'Amenities', component: AmenitiesScreen },
  { name: 'Dues', component: DuesScreen },
  { name: 'Helpdesk', component: HelpdeskScreen },
] as const;

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: typography.caption,
        tabBarIconStyle: { display: 'none' },
      }}
    >
      {TAB_SCREENS.map((s) => (
        <Tab.Screen key={s.name} name={s.name} component={s.component} />
      ))}
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: colors.surface }, headerTintColor: colors.text }}>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Detail" component={DetailScreen} options={{ title: 'Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
