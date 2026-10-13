import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Home: undefined;
  Visitors: undefined;
  Notices: undefined;
  Amenities: undefined;
  Dues: undefined;
  Helpdesk: undefined;
};

export type RootStackParamList = {
  Main: NavigatorScreenParams<TabParamList>;
  Details: { title: string };
};
