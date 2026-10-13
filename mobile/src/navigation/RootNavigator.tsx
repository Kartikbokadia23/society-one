import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from '../theme';
import {
  AmenitiesScreen, DetailsScreen, DuesScreen, HelpdeskScreen, HomeScreen, NoticesScreen, VisitorsScreen,
} from '../screens';
import type { RootStackParamList, TabParamList } from './types';

const Tab = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
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
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Main" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={DetailsScreen as any} options={({ route }) => ({ title: route.params.title })} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
