import { StyleSheet, View } from 'react-native';
import { EmptyState } from '../components';
import { colors, spacing } from '../theme';

export function PlaceholderScreen({ title }: { title: string }) {
  return (
    <View style={styles.wrap}>
      <EmptyState title={title} message="This module is coming soon." />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, justifyContent: 'center', backgroundColor: colors.background, padding: spacing.md },
});
