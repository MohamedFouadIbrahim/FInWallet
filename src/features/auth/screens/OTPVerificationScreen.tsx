import React, { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { OtpInput } from 'react-native-otp-entry';
import type { OtpInputRef } from 'react-native-otp-entry';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AlertCircleIcon from '@components/ui/icons/AlertCircleIcon';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import CheckCircleIcon from '@components/ui/icons/CheckCircleIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'VerifyCode'>;

// Placeholder — replace with real OTP validation
const validateOtp = (code: string) => code === '123456';

const RESEND_SECONDS = 30;

type OtpState = 'idle' | 'error' | 'success';

export default function OTPVerificationScreen({ navigation, route }: Props) {
  const { maskedIdentifier } = route.params;
  const otpRef = useRef<OtpInputRef>(null);
  const [otpValue, setOtpValue] = useState('');
  const [otpState, setOtpState] = useState<OtpState>('idle');
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [resendKey, setResendKey] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown(prev => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendKey]);

  const handleResend = () => {
    otpRef.current?.clear();
    setOtpValue('');
    setOtpState('idle');
    setCountdown(RESEND_SECONDS);
    setResendKey(k => k + 1);
    setTimeout(() => otpRef.current?.focus(), 50);
  };

  const handleFilled = (code: string) => {
    setTimeout(() => {
      if (validateOtp(code)) {
        setOtpState('success');
        // Auto-navigate to CreatePin after briefly showing success state
        setTimeout(() => navigation.navigate('CreatePin'), 1000);
      } else {
        setOtpState('error');
        setTimeout(() => {
          setOtpState('idle');
          otpRef.current?.clear();
          setTimeout(() => otpRef.current?.focus(), 50);
        }, 800);
      }
    }, 200);
  };

  const formatCountdown = (secs: number) =>
    `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`;

  const getBoxStyle = (index: number) => {
    const filled = index < otpValue.length;
    if (otpState === 'error' && filled) return [styles.otpBox, styles.otpBoxError];
    if (otpState === 'success') return [styles.otpBox, styles.otpBoxSuccess];
    return [styles.otpBox, filled ? styles.otpBoxFilled : styles.otpBoxEmpty];
  };

  // Verify button is disabled while user is typing or after success (auto-navigates)
  const isVerifyDisabled = otpValue.length < 6 || otpState === 'success';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable
              style={styles.backButton}
              onPress={() => navigation.goBack()}
              accessibilityLabel="Go back"
            >
              <ArrowLeftIcon size={20} color="#111827" />
            </Pressable>
          </View>

          {/* Content */}
          <View style={styles.content}>
            {/* Title + subtitle */}
            <View style={styles.titleGroup}>
              <Text style={styles.title} allowFontScaling={false}>
                Verify Your Code
              </Text>
              <Text style={styles.subtitle} allowFontScaling={false}>
                {'We sent a 6-digit code to '}
                <Text style={styles.subtitleBold}>{maskedIdentifier}</Text>
              </Text>
            </View>

            {/* OTP section */}
            <View style={styles.otpSection}>
              {/* Custom 6 OTP boxes */}
              <View
                style={[
                  styles.otpRow,
                  otpState === 'success' && styles.otpRowDimmed,
                ]}
              >
                {([0, 1, 2, 3, 4, 5] as const).map(i => (
                  <Pressable
                    key={i}
                    style={getBoxStyle(i)}
                    onPress={() =>
                      otpState !== 'success' && otpRef.current?.focus()
                    }
                  >
                    {i < otpValue.length && (
                      <Text style={styles.otpDigit} allowFontScaling={false}>
                        {otpValue[i]}
                      </Text>
                    )}
                  </Pressable>
                ))}
              </View>

              {/* Hidden OtpInput */}
              <View style={styles.hiddenOtp} pointerEvents="none">
                <OtpInput
                  ref={otpRef}
                  numberOfDigits={6}
                  type="numeric"
                  autoFocus
                  blurOnFilled
                  disabled={otpState === 'success'}
                  onTextChange={setOtpValue}
                  onFilled={handleFilled}
                  theme={{ containerStyle: styles.hiddenOtpContainer }}
                />
              </View>

              {/* Status row */}
              <View style={styles.statusRow}>
                {otpState === 'error' && (
                  <>
                    <AlertCircleIcon size={16} color="#EF4444" />
                    <Text style={styles.errorText} allowFontScaling={false}>
                      Invalid code. Please try again.
                    </Text>
                  </>
                )}
                {otpState === 'success' && (
                  <>
                    <CheckCircleIcon size={16} color="#10B981" />
                    <Text style={styles.successText} allowFontScaling={false}>
                      Verified successfully!
                    </Text>
                  </>
                )}
              </View>
            </View>

            {/* Resend row */}
            <View style={styles.resendRow}>
              {countdown > 0 ? (
                <Text style={styles.resendCountdown} allowFontScaling={false}>
                  {'Resend code in '}
                  <Text style={styles.resendTimer}>
                    {formatCountdown(countdown)}
                  </Text>
                </Text>
              ) : (
                <Pressable
                  style={styles.resendButton}
                  onPress={handleResend}
                  accessibilityLabel="Resend code"
                >
                  <Text style={styles.resendButtonText} allowFontScaling={false}>
                    Resend Code
                  </Text>
                </Pressable>
              )}
            </View>
          </View>
        </View>

        {/* Verify button pinned to bottom */}
        <View style={styles.bottom}>
          <Pressable
            style={[
              styles.verifyButton,
              isVerifyDisabled && styles.verifyButtonDisabled,
            ]}
            onPress={() => {}}
            disabled={isVerifyDisabled}
            accessibilityLabel="Verify code"
          >
            <Text style={styles.verifyButtonText} allowFontScaling={false}>
              Verify
            </Text>
          </Pressable>
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
  },
  titleGroup: {
    gap: 8,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 35,
    color: '#111827',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 25.6,
    color: '#6B7280',
  },
  subtitleBold: {
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  // OTP section
  otpSection: {
    marginBottom: 16,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 16,
  },
  otpRowDimmed: {
    opacity: 0.5,
  },
  otpBox: {
    width: 48,
    height: 56,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBoxEmpty: {
    backgroundColor: '#F3F4F6',
    borderColor: 'transparent',
  },
  otpBoxFilled: {
    backgroundColor: '#F3F4F6',
    borderColor: 'transparent',
  },
  otpBoxError: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  otpBoxSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  otpDigit: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 22,
    lineHeight: 31,
    color: '#111827',
  },
  // Hidden OtpInput
  hiddenOtp: {
    position: 'absolute',
    opacity: 0,
    height: 0,
    overflow: 'hidden',
  },
  hiddenOtpContainer: {
    height: 0,
  },
  // Status row
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    height: 21,
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#EF4444',
  },
  successText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#10B981',
  },
  // Resend
  resendRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendCountdown: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#9CA3AF',
  },
  resendTimer: {
    fontFamily: 'JetBrainsMono-Medium',
    color: '#374151',
  },
  resendButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    minHeight: 44,
    justifyContent: 'center',
  },
  resendButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: '#2563EB',
  },
  // Bottom Verify button
  bottom: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  verifyButton: {
    height: 52,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyButtonDisabled: {
    opacity: 0.5,
  },
  verifyButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 22.857,
    color: '#FFFFFF',
  },
});
