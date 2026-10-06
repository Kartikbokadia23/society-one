import { StyleSheet, Text, View } from 'react-native';
import { colors, radii, spacing, typography } from '../theme/tokens';
import { Button } from './Button';

export function ErrorBanner({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <View accessibilityRole="alert" style={styles.banner}>
      <Text style={styles.text}>{message}</Text>
      {onRetry ? <Button title="Retry" variant="danger" onPress={onRetry} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  banner: { backgroundColor: colors.dangerBg, borderRadius: radii.md, padding: spacing.lg, gap: spacing.md, marginBottom: spacing.md },
  text: { ...typography.body, color: colors.danger },
});
