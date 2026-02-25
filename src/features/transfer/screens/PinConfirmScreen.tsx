import React, { useCallback, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Svg, { Path, G } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import { useTheme } from '@theme/useTheme';
import { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

// ── Lock icon ─────────────────────────────────────────────────────────────────

const LockIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <G>
      <Path
        d="M22.1667 12.8333H5.83333C4.54467 12.8333 3.5 13.878 3.5 15.1667V23.3333C3.5 24.622 4.54467 25.6667 5.83333 25.6667H22.1667C23.4553 25.6667 24.5 24.622 24.5 23.3333V15.1667C24.5 13.878 23.4553 12.8333 22.1667 12.8333Z"
        stroke="#2563EB"
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8.16667 12.8333V8.16667C8.16667 6.61957 8.78125 5.13584 9.87521 4.04188C10.9692 2.94792 12.4529 2.33333 14 2.33333C15.5471 2.33333 17.0308 2.94792 18.1248 4.04188C19.2188 5.13584 19.8333 6.61957 19.8333 8.16667V12.8333"
        stroke="#2563EB"
        strokeWidth={2.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type PinRoute = RouteProp<DashboardStackParamList, 'PinConfirm'>;

const DEMO_PIN = '123456';
const PIN_LENGTH = 6;

// ── PinConfirmScreen ──────────────────────────────────────────────────────────

export default function PinConfirmScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<PinRoute>();
  const { isDark } = useTheme();

  const { amount, recipientName, recipientUsername } = route.params;
  const formattedAmount = `$${amount.toFixed(2)}`;

  const inputRef = useRef<TextInput>(null);
  const [pin, setPin] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChangePin = useCallback(
    (text: string) => {
      const cleaned = text.replace(/\D/g, '').slice(0, PIN_LENGTH);
      setPin(cleaned);
      setHasError(false);

      if (cleaned.length === PIN_LENGTH) {
        Keyboard.dismiss();
        if (cleaned === DEMO_PIN) {
          navigation.navigate('TransferLoading', {
            amount,
            recipientName,
            recipientUsername,
          });
        } else {
          setHasError(true);
          setPin('');
          inputRef.current?.focus();
        }
      }
    },
    [navigation, amount, recipientName, recipientUsername],
  );

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <View
        className="flex-row items-center px-xl h-[56px] gap-md"
        style={styles.headerBorder}
      >
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={[styles.backBtn, isDark && styles.backBtnDark]}
        >
          <ArrowLeftIcon size={20} color={isDark ? '#F9FAFB' : '#111827'} />
        </Pressable>
        <Text
          className="font-jakarta-bold text-[18px] leading-[27px] text-neutral-900 dark:text-neutral-50"
          allowFontScaling={false}
        >
          Enter PIN to Confirm
        </Text>
      </View>

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <View style={styles.body}>
        {/* Lock icon */}
        <View style={styles.lockContainer}>
          <LockIcon />
        </View>

        {/* Authorizing text */}
        <Text style={styles.authLabel} allowFontScaling={false}>
          Authorizing transfer of
        </Text>

        {/* Amount */}
        <Text
          style={[styles.amountText, isDark && styles.amountTextDark]}
          allowFontScaling={false}
        >
          {formattedAmount}
        </Text>

        {/* PIN dots — tap to focus the hidden input */}
        <Pressable
          onPress={focusInput}
          style={styles.dotsRow}
          accessibilityLabel="PIN entry dots, tap to enter PIN"
        >
          {Array.from({ length: PIN_LENGTH }).map((_, i) => {
            const filled = i < pin.length;
            return (
              <View
                key={i}
                style={[
                  styles.dot,
                  filled
                    ? styles.dotFilled
                    : isDark
                      ? styles.dotEmptyDark
                      : styles.dotEmpty,
                  hasError && styles.dotError,
                ]}
              />
            );
          })}
        </Pressable>

        {/* Hint */}
        <Text style={styles.hintText} allowFontScaling={false}>
          {hasError
            ? 'Incorrect PIN, try again'
            : 'Enter your 6-digit PIN · Demo: 123456'}
        </Text>
      </View>

      {/* Hidden input — captures native number pad */}
      <TextInput
        ref={inputRef}
        value={pin}
        onChangeText={handleChangePin}
        keyboardType="number-pad"
        maxLength={PIN_LENGTH}
        secureTextEntry
        style={styles.hiddenInput}
        caretHidden
        autoFocus
      />

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View style={styles.footer}>
        <Pressable
          onPress={focusInput}
          accessibilityLabel="Use Face ID or Biometrics instead"
          style={styles.biometricsBtn}
        >
          <Text style={styles.biometricsText} allowFontScaling={false}>
            Use Face ID / Biometrics instead
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  headerBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnDark: {
    backgroundColor: '#1E293B',
  },

  // Body
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 0,
    paddingBottom: 40,
  },

  // Lock icon
  lockContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },

  // Auth label
  authLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 4,
  },

  // Amount
  amountText: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 28,
    lineHeight: 42,
    color: '#111827',
    letterSpacing: -0.5,
    textAlign: 'center',
    marginBottom: 32,
  },
  amountTextDark: {
    color: '#F9FAFB',
  },

  // PIN dots
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 16,
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  dotEmpty: {
    backgroundColor: '#E5E7EB',
    borderColor: '#D1D5DB',
  },
  dotEmptyDark: {
    backgroundColor: '#334155',
    borderColor: '#475569',
  },
  dotFilled: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  dotError: {
    backgroundColor: '#FEE2E2',
    borderColor: '#EF4444',
  },

  // Hint
  hintText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Hidden input
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
    bottom: 0,
    left: 0,
  },

  // Footer
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
  biometricsBtn: {
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  biometricsText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#2563EB',
    textAlign: 'center',
  },
});
