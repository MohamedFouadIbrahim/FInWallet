import React, { useRef, useState } from 'react';
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
import AppButton from '@components/ui/AppButton';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import FingerprintIcon from '@components/ui/icons/FingerprintIcon';
import LockIcon from '@components/ui/icons/LockIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'CreatePin'>;

export default function CreatePinScreen({ navigation }: Props) {
  const otpRef = useRef<OtpInputRef>(null);
  const [pinValue, setPinValue] = useState('');
  const [biometricEnabled, setBiometricEnabled] = useState(false);

  const handleContinue = () => {
    navigation.navigate('EnableBiometrics');
  };

  const getPinBoxStyle = (index: number) => {
    const filled = index < pinValue.length;
    return [styles.pinBox, filled ? styles.pinBoxFilled : styles.pinBoxEmpty];
  };

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
            {/* Lock badge */}
            <View style={styles.badgeWrapper}>
              <View style={styles.badge}>
                <LockIcon size={28} color="#2563EB" />
              </View>
            </View>

            {/* Title + subtitle */}
            <View style={styles.titleGroup}>
              <Text style={styles.title} allowFontScaling={false}>
                Create 4-Digit PIN
              </Text>
              <Text style={styles.subtitle} allowFontScaling={false}>
                This PIN will be used to securely access your wallet.
              </Text>
            </View>

            {/* Custom PIN boxes — tapping opens keyboard via OtpInput focus */}
            <Pressable
              style={styles.pinRow}
              onPress={() => otpRef.current?.focus()}
              accessibilityLabel="PIN entry"
            >
              {([0, 1, 2, 3] as const).map(i => (
                <View key={i} style={getPinBoxStyle(i)}>
                  {i < pinValue.length && <View style={styles.pinDot} />}
                </View>
              ))}
            </Pressable>

            {/* Hidden OtpInput — handles keyboard + value tracking */}
            <View style={styles.hiddenOtp} pointerEvents="none">
              <OtpInput
                ref={otpRef}
                numberOfDigits={4}
                type="numeric"
                autoFocus
                blurOnFilled
                onTextChange={setPinValue}
                theme={{ containerStyle: styles.hiddenOtpContainer }}
              />
            </View>

            {/* Biometric toggle */}
            <Pressable
              style={styles.biometricRow}
              onPress={() => setBiometricEnabled(prev => !prev)}
              accessibilityLabel="Toggle biometric login"
              accessibilityRole="switch"
              accessibilityState={{ checked: biometricEnabled }}
            >
              <View style={styles.biometricLeft}>
                <FingerprintIcon size={20} color="#2563EB" />
                <Text style={styles.biometricLabel} allowFontScaling={false}>
                  Enable biometric login
                </Text>
              </View>
              <View style={[styles.toggle, biometricEnabled && styles.toggleOn]}>
                <View
                  style={[
                    styles.toggleThumb,
                    biometricEnabled && styles.toggleThumbOn,
                  ]}
                />
              </View>
            </Pressable>
          </View>

          {/* Bottom CTA */}
          <View style={styles.bottom}>
            <AppButton
              label="Continue"
              onPress={handleContinue}
              disabled={pinValue.length < 4}
            />
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
    paddingBottom: 24,
  },
  // Lock badge
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  badge: {
    width: 64,
    height: 64,
    backgroundColor: '#EFF6FF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Title
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
  // PIN boxes
  pinRow: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
    marginBottom: 24,
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
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2563EB',
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
  // Biometric toggle row
  biometricRow: {
    height: 52,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  biometricLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  biometricLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  toggle: {
    width: 32,
    height: 18,
    borderRadius: 9999,
    backgroundColor: '#D1D5DB',
    padding: 1,
    justifyContent: 'center',
  },
  toggleOn: {
    backgroundColor: '#2563EB',
  },
  toggleThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    alignSelf: 'flex-start',
  },
  toggleThumbOn: {
    alignSelf: 'flex-end',
  },
  // Bottom
  bottom: {
    paddingBottom: 40,
  },
});
