import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '../theme';

interface Props {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onPress?: () => void;
}

export function ListItem({ title, subtitle, right, onPress }: Props) {
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
  row: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.md - 4, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border },
  main: { flex: 1, paddingRight: spacing.sm },
  title: { ...typography.body, color: colors.text },
  subtitle: { ...typography.caption, color: colors.textMuted, marginTop: 2 },
});
