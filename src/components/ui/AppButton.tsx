import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { useTheme } from '@theme/useTheme';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  accessibilityLabel?: string;
  style?: StyleProp<ViewStyle>;
}

export default function AppButton({
  label,
  onPress,
  variant = 'primary',
  disabled = false,
  accessibilityLabel,
  style,
}: Props) {
  const { isDark } = useTheme();

  return (
    <Pressable
      style={[
        styles.base,
        variant === 'primary'
          ? disabled
            ? styles.primaryDisabled
            : styles.primary
          : [styles.secondary, isDark && styles.secondaryDark],
        style,
      ]}
      className="active:opacity-pressed"
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? label}
    >
      <Text
        className={
          variant === 'primary'
            ? 'text-white font-inter-semibold'
            : 'text-neutral-900 dark:text-neutral-50 font-inter-semibold'
        }
        style={styles.text}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: '#2563EB',
  },
  primaryDisabled: {
    backgroundColor: '#D1D5DB',
    opacity: 0.5,
  },
  secondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  secondaryDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  text: {
    fontSize: 16,
    lineHeight: 22.857,
  },
});
