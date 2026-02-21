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
import MailIcon from '@components/ui/icons/MailIcon';
import PhoneIcon from '@components/ui/icons/PhoneIcon';
import type { AuthStackParamList } from '@features/auth/navigation/AuthNavigator';

type Props = NativeStackScreenProps<AuthStackParamList, 'CreateAccount'>;

type Tab = 'phone' | 'email';

function maskPhone(value: string): string {
  if (value.length <= 4) return `***${value}`;
  return `***${value.slice(-4)}`;
}

function maskEmail(value: string): string {
  const atIdx = value.indexOf('@');
  if (atIdx < 1) return value;
  return `***@${value.slice(atIdx + 1)}`;
}

export default function CreateAccountScreen({ navigation }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('phone');
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const isPhone = activeTab === 'phone';
  const canContinue = value.trim().length > 0;

  const handleTabSwitch = (tab: Tab) => {
    setActiveTab(tab);
    setValue('');
  };

  const handleContinue = () => {
    const masked = isPhone ? maskPhone(value) : maskEmail(value);
    navigation.navigate('VerifyCode', { maskedIdentifier: masked });
  };

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
                Create Account
              </Text>
              <Text style={styles.subtitle} allowFontScaling={false}>
                Enter your phone number or email to get started.
              </Text>
            </View>

            {/* Tab switcher */}
            <View style={styles.tabList}>
              <Pressable
                style={[styles.tab, activeTab === 'phone' && styles.tabActive]}
                onPress={() => handleTabSwitch('phone')}
                accessibilityLabel="Phone tab"
              >
                <PhoneIcon size={16} color="#111827" />
                <Text style={styles.tabText} allowFontScaling={false}>
                  Phone
                </Text>
              </Pressable>
              <Pressable
                style={[styles.tab, activeTab === 'email' && styles.tabActive]}
                onPress={() => handleTabSwitch('email')}
                accessibilityLabel="Email tab"
              >
                <MailIcon size={16} color="#111827" />
                <Text style={styles.tabText} allowFontScaling={false}>
                  Email
                </Text>
              </Pressable>
            </View>

            {/* Input group */}
            <View style={styles.inputGroup}>
              <Text style={styles.label} allowFontScaling={false}>
                {isPhone ? 'Phone Number' : 'Email Address'}
              </Text>
              <TextInput
                style={[
                  styles.input,
                  styles.inputBg,
                  isFocused && styles.inputFocused,
                ]}
                value={value}
                onChangeText={setValue}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={isPhone ? '0581785433' : 'you@example.com'}
                placeholderTextColor="#9CA3AF"
                keyboardType={isPhone ? 'phone-pad' : 'email-address'}
                autoCapitalize="none"
                autoCorrect={false}
                allowFontScaling={false}
              />
              <Text style={styles.helperText} allowFontScaling={false}>
                {isPhone
                  ? "We'll send a verification code to this number."
                  : "We'll send a verification link to this email."}
              </Text>
            </View>
          </View>

          {/* Bottom CTA */}
          <View style={styles.bottom}>
            <AppButton
              label="Continue"
              onPress={handleContinue}
              disabled={!canContinue}
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
    maxWidth: 306,
  },
  // Tab switcher
  tabList: {
    height: 48,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginBottom: 24,
    gap: 4,
  },
  tab: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    borderRadius: 10,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#111827',
  },
  // Input group
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
    lineHeight: 19.5,
    color: '#9CA3AF',
  },
  bottom: {
    paddingBottom: 40,
  },
});
