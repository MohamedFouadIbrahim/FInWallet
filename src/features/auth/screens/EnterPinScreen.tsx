import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { OtpInput } from 'react-native-otp-entry';
import type { OtpInputRef } from 'react-native-otp-entry';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AlertCircleIcon from '@components/ui/icons/AlertCircleIcon';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import FingerprintIcon from '@components/ui/icons/FingerprintIcon';
import LockIcon from '@components/ui/icons/LockIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';
import { RootStackParamList } from '@/navigation/RootNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'EnterPin'>;

const MAX_ATTEMPTS = 5;

// Placeholder — replace with real validation against stored/server PIN
const validatePin = (pin: string) => pin === '1234';

type PinBoxState = 'empty' | 'filled' | 'error' | 'locked';

export default function EnterPinScreen({ navigation }: Props) {
  const otpRef = useRef<OtpInputRef>(null);
  const [pinValue, setPinValue] = useState('');
  const [isLocked, setIsLocked] = useState(false);
  const [hasError, setHasError] = useState(false);
  const failedRef = useRef(0);

  const handleFilled = (value: string) => {
    if (isLocked) return;

    setTimeout(() => {
      if (validatePin(value)) {
        // TODO: Navigate to main app / dashboard
        const rootNav = navigation.getParent<NativeStackNavigationProp<RootStackParamList>>();
        rootNav?.navigate('Main');
      } else {
        failedRef.current += 1;
        if (failedRef.current >= MAX_ATTEMPTS) {
          setIsLocked(true);
        } else {
          // Show red error state briefly, then clear and re-open keyboard
          setHasError(true);
          setTimeout(() => {
            setHasError(false);
            otpRef.current?.clear();
            setTimeout(() => otpRef.current?.focus(), 50);
          }, 800);
        }
      }
    }, 200);
  };

  const getPinBoxState = (index: number): PinBoxState => {
    if (isLocked) return 'locked';
    if (hasError && index < pinValue.length) return 'error';
    if (index < pinValue.length) return 'filled';
    return 'empty';
  };

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style={styles.container}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <ArrowLeftIcon size={20} color="#111827" />
          </Pressable>
        </View>

        {/* ── Content ── */}
        <View style={styles.content}>
          {/* Icon badge */}
          <View style={styles.badgeWrapper}>
            <View
              style={[
                styles.badge,
                isLocked ? styles.badgeLocked : styles.badgeNormal,
              ]}
            >
              <LockIcon size={28} color={isLocked ? '#EF4444' : '#2563EB'} />
            </View>
          </View>

          {/* Title + subtitle */}
          <View style={styles.titleGroup}>
            <Text style={styles.title} allowFontScaling={false}>
              {isLocked ? 'Account Locked' : 'Enter Your PIN'}
            </Text>
            <Text style={styles.subtitle} allowFontScaling={false}>
              {isLocked
                ? 'Please try again later or reset your PIN.'
                : 'Enter your 4-digit PIN to access your wallet.'}
            </Text>
          </View>

          {/* ── Custom PIN boxes — tapping opens keyboard via OtpInput focus ── */}
          <Pressable
            style={styles.pinRow}
            onPress={() => !isLocked && otpRef.current?.focus()}
            accessibilityLabel="PIN entry"
          >
            {([0, 1, 2, 3] as const).map(i => {
              const state = getPinBoxState(i);
              return (
                <View
                  key={i}
                  style={[
                    styles.pinBox,
                    state === 'empty' && styles.pinBoxEmpty,
                    state === 'filled' && styles.pinBoxFilled,
                    (state === 'error' || state === 'locked') &&
                      styles.pinBoxError,
                  ]}
                >
                  {state !== 'empty' && (
                    <View
                      style={[
                        styles.pinDot,
                        state === 'filled'
                          ? styles.pinDotFilled
                          : styles.pinDotError,
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </Pressable>

          {/* ── Hidden OtpInput — handles keyboard + value tracking ── */}
          <View style={styles.hiddenOtp} pointerEvents="none">
            <OtpInput
              ref={otpRef}
              numberOfDigits={4}
              type="numeric"
              autoFocus
              blurOnFilled
              disabled={isLocked}
              onTextChange={setPinValue}
              onFilled={handleFilled}
              theme={{ containerStyle: styles.hiddenOtpContainer }}
            />
          </View>

          {/* Error row */}
          <View style={styles.errorRow}>
            {(hasError || isLocked) && (
              <>
                <AlertCircleIcon size={14} color="#EF4444" />
                <Text style={styles.errorText} allowFontScaling={false}>
                  {isLocked
                    ? 'Too many attempts. Account temporarily locked.'
                    : 'Incorrect PIN. Please try again.'}
                </Text>
              </>
            )}
          </View>

          {/* Actions: Forgot PIN + biometric */}
          <View style={styles.actionsRow}>
            <Pressable
              style={styles.forgotButton}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText} allowFontScaling={false}>
                Forgot PIN?
              </Text>
            </Pressable>

            <Pressable
              style={styles.biometricButton}
              onPress={() => console.log('Biometric auth')}
              accessibilityLabel="Use biometric authentication"
              disabled={isLocked}
            >
              <FingerprintIcon size={24} color="#2563EB" />
            </Pressable>
          </View>
        </View>
      </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  header: {
    height: 56,
    justifyContent: 'center',
  },
  backButton: {
    width: 40,
    height: 40,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 40,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeNormal: {
    backgroundColor: '#EFF6FF',
  },
  badgeLocked: {
    backgroundColor: '#FEF2F2',
  },
  titleGroup: {
    alignItems: 'center',
    gap: 8,
    marginBottom: 32,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 35,
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 25.6,
    color: '#6B7280',
    textAlign: 'center',
  },
  // Custom PIN boxes
  pinRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  pinBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinBoxEmpty: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  pinBoxFilled: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  pinBoxError: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
    opacity: 0.5,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  pinDotFilled: {
    backgroundColor: '#2563EB',
  },
  pinDotError: {
    backgroundColor: '#EF4444',
  },
  // Hidden OtpInput — invisible but captures keyboard events
  hiddenOtp: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    overflow: 'hidden',
  },
  hiddenOtpContainer: {
    height: 0,
  },
  // Error row
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 24,
    marginTop: 16,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#EF4444',
  },
  // Actions
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    height: 48,
    marginTop: 8,
  },
  forgotButton: {
    minHeight: 44,
    justifyContent: 'center',
  },
  forgotText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#2563EB',
  },
  biometricButton: {
    width: 48,
    height: 48,
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
