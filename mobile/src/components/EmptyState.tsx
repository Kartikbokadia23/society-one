import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Button } from './Button';

interface Props {
  title: string;
  message?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ title, message, actionLabel, onAction }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{title}</Text>
      {!!message && <Text style={styles.message}>{message}</Text>}
      {!!actionLabel && !!onAction && <Button title={actionLabel} onPress={onAction} />}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', padding: spacing.xl },
  title: { ...typography.heading, color: colors.text, marginBottom: spacing.sm, textAlign: 'center' },
  message: { ...typography.body, color: colors.textMuted, marginBottom: spacing.md, textAlign: 'center' },
});
