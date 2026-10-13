import { colors, spacing, typography } from '../src/theme/tokens';

describe('design tokens', () => {
  it('exposes colors, spacing and typography', () => {
    expect(colors.primary).toMatch(/^#[0-9A-F]{6}$/i);
    expect(spacing.md).toBeGreaterThan(spacing.sm);
    expect(typography.title.fontSize).toBeGreaterThan(typography.body.fontSize);
  });
});
