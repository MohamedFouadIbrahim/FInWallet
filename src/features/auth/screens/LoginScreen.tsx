import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import AlertCircleIcon from '@components/ui/icons/AlertCircleIcon';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'Login'>;

function isValidInput(val: string): boolean {
  const trimmed = val.trim();
  // basic phone: digits + optional +, -, spaces, min 7 chars
  const phoneRegex = /^[+\d][\d\s\-()]{6,}$/;
  // basic email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return phoneRegex.test(trimmed) || emailRegex.test(trimmed);
}

export default function LoginScreen({ navigation }: Props) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = () => {
    if (!isValidInput(value)) {
      setError('Please enter a valid phone number or email address.');
      return;
    }
    setError('');
    // TODO: navigate to next auth step (PIN / OTP)
    console.log('Proceed with:', value);
  };

  const inputBorderStyle = error
    ? styles.inputError
    : isFocused
      ? styles.inputFocused
      : undefined;

  const inputBgStyle = error ? styles.inputBgError : styles.inputBg;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
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
          <View style={styles.flex}>
            {/* Title + subtitle */}
            <View style={styles.titleGroup}>
              <Text style={styles.title} allowFontScaling={false}>
                Sign In
              </Text>
              <Text style={styles.subtitle} allowFontScaling={false}>
                Enter your phone number or email to continue.
              </Text>
            </View>

            {/* Input group */}
            <View style={styles.inputGroup}>
              <Text style={styles.label} allowFontScaling={false}>
                Phone or Email
              </Text>
              <TextInput
                style={[styles.input, inputBgStyle, inputBorderStyle]}
                value={value}
                onChangeText={text => {
                  setValue(text);
                  if (error) setError('');
                }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter phone or email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling={false}
              />
              {!!error && (
                <View style={styles.errorRow}>
                  <AlertCircleIcon size={14} color="#EF4444" />
                  <Text style={styles.errorText} allowFontScaling={false}>
                    {error}
                  </Text>
                </View>
              )}
            </View>

            {/* Forgot password link */}
            <Pressable
              style={styles.forgotLink}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.forgotText} allowFontScaling={false}>
                Forgot Password?
              </Text>
            </Pressable>
          </View>

          {/* Bottom CTA */}
          <View style={styles.bottom}>
            <AppButton
              label="Continue"
              onPress={handleContinue}
              disabled={!value.trim()}
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
  titleGroup: {
    gap: 8,
    marginBottom: 32,
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
    maxWidth: 277,
  },
  inputGroup: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#374151',
  },
  input: {
    height: 52,
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  inputBg: {
    backgroundColor: '#F3F4F6',
  },
  inputBgError: {
    backgroundColor: '#FEF2F2',
  },
  inputFocused: {
    borderWidth: 2,
    borderColor: 'rgba(59,130,246,0.28)',
  },
  inputError: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#EF4444',
    flex: 1,
  },
  forgotLink: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  forgotText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#2563EB',
  },
  bottom: {
    paddingBottom: 40,
  },
});
