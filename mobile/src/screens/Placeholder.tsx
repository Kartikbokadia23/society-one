import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { colors, spacing, typography } from '../theme';
import { Card, EmptyState } from '../components';

interface Props {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function Placeholder({ title, description, actionLabel, onAction }: Props) {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Card>
        <EmptyState title={`${title} is coming soon`} message={description} actionLabel={actionLabel} onAction={onAction} />
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  content: { padding: spacing.md },
  title: { ...typography.title, color: colors.text, marginBottom: spacing.md },
});
