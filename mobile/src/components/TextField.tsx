import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';
import { colors, radii, spacing, typography } from '../theme/tokens';

export interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label: string;
  error?: string;
}

export function TextField({ label, error, ...input }: TextFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        accessibilityLabel={label}
        placeholderTextColor={colors.textMuted}
        {...input}
        style={[styles.input, !!error && styles.inputError]}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: spacing.lg },
  label: { ...typography.label, color: colors.text, marginBottom: spacing.xs },
  input: { ...typography.body, minHeight: 48, borderWidth: 1, borderColor: colors.border, borderRadius: radii.md, backgroundColor: colors.surface, paddingHorizontal: spacing.md, color: colors.text },
  inputError: { borderColor: colors.danger },
  error: { ...typography.caption, color: colors.danger, marginTop: spacing.xs },
});
