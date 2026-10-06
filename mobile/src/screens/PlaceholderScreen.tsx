import { ScrollView, StyleSheet, Text } from 'react-native';
import { Card, EmptyState } from '../components';
import { colors, spacing, typography } from '../theme/tokens';

export function PlaceholderScreen({ title, description }: { title: string; description: string }) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Card>
        <EmptyState title={`${title} is coming soon`} message={description} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.lg },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.lg },
});
