import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme/tokens';

export interface ListItemProps {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  onPress?: () => void;
}

export function ListItem({ title, subtitle, right, onPress }: ListItemProps) {
  return (
    <Pressable accessibilityRole={onPress ? 'button' : undefined} disabled={!onPress} onPress={onPress} style={styles.row}>
      <View style={styles.main}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md, paddingHorizontal: spacing.lg, backgroundColor: colors.surface, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  main: { flex: 1, marginRight: spacing.md },
  title: { ...typography.body, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted, marginTop: spacing.xs },
});
