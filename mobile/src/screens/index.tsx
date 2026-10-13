import React from 'react';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Placeholder } from './Placeholder';

function make(title: string, description: string) {
  return function Screen() {
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
      <Placeholder
        title={title}
        description={description}
        actionLabel="Open details"
        onAction={() => nav.navigate('Details', { title })}
      />
    );
  };
}

export const HomeScreen = make('Home', 'Your society at a glance will appear here.');
export const VisitorsScreen = make('Visitors', 'Pre-approve and track visitors here.');
export const NoticesScreen = make('Notices', 'Society announcements will appear here.');
export const AmenitiesScreen = make('Amenities', 'Book clubhouse, gym and more here.');
export const DuesScreen = make('Dues', 'Maintenance invoices and payments will appear here.');
export const HelpdeskScreen = make('Helpdesk', 'Raise and track complaints here.');

export function DetailsScreen({ route }: { route: { params: { title: string } } }) {
  return <Placeholder title={route.params.title} description="Detail view placeholder." />;
}
