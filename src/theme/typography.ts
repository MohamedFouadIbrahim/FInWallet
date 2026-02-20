/**
 * Typography constants mirroring tailwind.config.js.
 * Use in style={} props when className is insufficient.
 */

// ─── Font families ────────────────────────────────────────────────────────────

export const fontFamily = {
  jakartaBold:     'PlusJakartaSans-Bold',
  jakartaSemibold: 'PlusJakartaSans-SemiBold',
  jakartaMedium:   'PlusJakartaSans-Medium',
  interRegular:    'Inter24pt-Regular',
  interMedium:     'Inter24pt-Medium',
  interSemibold:   'Inter24pt-SemiBold',
  interBold:       'Inter24pt-Bold',
  monoRegular:     'JetBrainsMono-Regular',
  monoMedium:      'JetBrainsMono-Medium',
} as const;

// ─── Font sizes ───────────────────────────────────────────────────────────────

export const fontSize = {
  display:     { fontSize: 36, lineHeight: 44, letterSpacing: -1 },
  h1:          { fontSize: 28, lineHeight: 36, letterSpacing: -0.5 },
  h2:          { fontSize: 22, lineHeight: 28, letterSpacing: -0.3 },
  h3:          { fontSize: 18, lineHeight: 24, letterSpacing: -0.2 },
  h4:          { fontSize: 16, lineHeight: 22, letterSpacing: 0 },
  bodyLg:      { fontSize: 16, lineHeight: 24, letterSpacing: 0 },
  body:        { fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  small:       { fontSize: 12, lineHeight: 16, letterSpacing: 0.1 },
  caption:     { fontSize: 11, lineHeight: 14, letterSpacing: 0.2 },
  overline:    { fontSize: 11, lineHeight: 14, letterSpacing: 1 },
  amount:      { fontSize: 18, lineHeight: 24, letterSpacing: -0.3 },
  amountLg:    { fontSize: 36, lineHeight: 44, letterSpacing: -1 },
  amountSm:    { fontSize: 14, lineHeight: 18, letterSpacing: 0 },
  cardNumber:  { fontSize: 16, lineHeight: 22, letterSpacing: 2 },
  otp:         { fontSize: 24, lineHeight: 32, letterSpacing: 8 },
} as const;
