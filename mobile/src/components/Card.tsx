import { ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colors, radius, spacing } from '../theme/tokens';

export function Card({ children, style }: { children: ReactNode; style?: ViewStyle }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: { backgroundColor: colors.surface, borderRadius: radius.md, borderWidth: 1, borderColor: colors.border, padding: spacing.md, marginBottom: spacing.md },
});
