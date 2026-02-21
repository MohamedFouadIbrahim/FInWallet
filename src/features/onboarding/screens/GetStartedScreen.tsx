import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import ShieldIcon from '@components/ui/icons/ShieldIcon';
import WalletIcon from '@components/ui/icons/WalletIcon';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import type { OnboardingStackParamList } from '@features/onboarding/navigation/OnboardingNavigator';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'GetStarted'>;

export default function GetStartedScreen({ navigation: _navigation }: Props) {
  const { isDark } = useTheme();

  return (
    <ScreenWrapper>
      <View style={styles.content}>
        {/* ── Hero ── */}
        <View style={styles.hero}>
          {/* Wallet icon badge with blue gradient */}
          <LinearGradient
            colors={['#2563EB', '#1D4ED8']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.iconBadge,
              {
                shadowColor: '#2563EB',
                shadowOpacity: isDark ? 0.5 : 0.3,
              },
            ]}
          >
            <WalletIcon size={40} color="#FFFFFF" />
          </LinearGradient>

          {/* Title */}
          <Text
            className="text-neutral-900 dark:text-neutral-50 font-jakarta-bold text-center"
            style={styles.title}
            allowFontScaling={false}
          >
            Welcome to FinWallet
          </Text>

          {/* Subtitle */}
          <Text
            className="text-neutral-500 dark:text-neutral-400 font-inter-regular text-center"
            style={styles.subtitle}
          >
            Your secure digital wallet for fast payments and smart money
            management.
          </Text>

          {/* Bank-grade security badge */}
          <View
            style={[styles.securityBadge, isDark && styles.securityBadgeDark]}
          >
            <ShieldIcon size={16} color="#10B981" />
            <Text
              className="font-inter-medium"
              style={styles.securityText}
              allowFontScaling={false}
            >
              Bank-grade security
            </Text>
          </View>
        </View>

        {/* ── Bottom Actions ── */}
        <View style={styles.bottomPadding}>
          <View style={styles.buttons}>
            {/* Sign In */}
            <Pressable
              style={styles.signInBtn}
              className="active:opacity-pressed"
              accessibilityLabel="Sign In"
            >
              <Text
                className="text-white font-inter-semibold text-center"
                style={styles.btnText}
                allowFontScaling={false}
              >
                Sign In
              </Text>
            </Pressable>

            {/* Create Account */}
            <Pressable
              style={[styles.createBtn, isDark && styles.createBtnDark]}
              className="active:opacity-pressed"
              accessibilityLabel="Create Account"
            >
              <Text
                className="text-neutral-900 dark:text-neutral-50 font-inter-semibold text-center"
                style={styles.btnText}
                allowFontScaling={false}
              >
                Create Account
              </Text>
            </Pressable>

            {/* Legal text */}
            <Text
              className="text-neutral-400 dark:text-neutral-500 font-inter-regular text-center"
              style={styles.legalText}
            >
              {'By continuing, you agree to our '}
              <Text className="font-inter-medium" style={styles.legalLink}>
                Terms of Service
              </Text>
              {' and '}
              <Text className="font-inter-medium" style={styles.legalLink}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    justifyContent: 'space-between',
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 48,
    gap: 12,
  },
  iconBadge: {
    width: 80,
    height: 80,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 24,
    elevation: 12,
  },
  title: {
    fontSize: 28,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 25.6,
    maxWidth: 248,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 24,
    paddingHorizontal: 16,
    height: 34,
    marginTop: 20,
  },
  securityBadgeDark: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  securityText: {
    fontSize: 12,
    lineHeight: 18,
    color: '#10B981',
  },
  buttons: {
    gap: 12,
  },
  signInBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  createBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  btnText: {
    fontSize: 16,
    lineHeight: 22.857,
  },
  legalText: {
    fontSize: 12,
    lineHeight: 18,
  },
  legalLink: {
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
  },
  bottomPadding: {
    paddingBottom: 40,
  },
});
