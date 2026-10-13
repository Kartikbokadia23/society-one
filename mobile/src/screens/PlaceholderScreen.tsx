import { ReactNode } from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { EmptyState } from '../components';
import { colors, spacing, typography } from '../theme/tokens';

type Props = { title: string; description: string; children?: ReactNode };

export function PlaceholderScreen({ title, description, children }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <EmptyState title={`${title} is coming soon`} message={description} />
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { ...typography.title, color: colors.text },
});
