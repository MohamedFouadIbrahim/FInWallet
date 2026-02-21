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
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import KeyIcon from '@components/ui/icons/KeyIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    // TODO: call reset password API
    console.log('Send reset link to:', value);
  };

  const inputBorderStyle = isFocused ? styles.inputFocused : undefined;

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
            {/* Key icon badge */}
            <View style={styles.iconWrapper}>
              <View style={styles.iconBadge}>
                <KeyIcon size={28} color="#D97706" />
              </View>
            </View>

            {/* Title + subtitle */}
            <View style={styles.titleGroup}>
              <Text style={styles.title} allowFontScaling={false}>
                Reset Password
              </Text>
              <Text style={styles.subtitle} allowFontScaling={false}>
                Enter your phone number or email and we'll send you a reset
                link.
              </Text>
            </View>

            {/* Input group */}
            <View style={styles.inputGroup}>
              <Text style={styles.label} allowFontScaling={false}>
                Phone or Email
              </Text>
              <TextInput
                style={[styles.input, styles.inputBg, inputBorderStyle]}
                value={value}
                onChangeText={setValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Enter phone or email"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling={false}
              />
              <Text style={styles.helperText} allowFontScaling={false}>
                We'll send a password reset link to this address.
              </Text>
            </View>
          </View>

          {/* Bottom CTA */}
          <View style={styles.bottom}>
            <AppButton
              label="Send Reset Link"
              onPress={handleSend}
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
  iconWrapper: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconBadge: {
    width: 64,
    height: 64,
    backgroundColor: '#FEF3C7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleGroup: {
    gap: 8,
    marginBottom: 32,
    alignItems: 'center',
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
    maxWidth: 294,
    textAlign: 'center',
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
  inputFocused: {
    borderWidth: 2,
    borderColor: 'rgba(59,130,246,0.28)',
  },
  helperText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#9CA3AF',
  },
  bottom: {
    paddingBottom: 40,
  },
});
