import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import CreditCardIcon from '@components/ui/icons/CreditCardIcon';
import BankBuildingIcon from '@components/ui/icons/BankBuildingIcon';
import PlusIcon from '@components/ui/icons/PlusIcon';
import ChevronRightIcon from '@components/ui/icons/ChevronRightIcon';
import type { WalletStackParamList } from '../navigation/WalletNavigator';

// ── Types ─────────────────────────────────────────────────────────────────────

type PaymentMethod = 'card' | 'bank';

type Nav = NativeStackNavigationProp<WalletStackParamList, 'WalletTopUp'>;

// ── RadioDot ──────────────────────────────────────────────────────────────────

interface RadioDotProps {
  selected: boolean;
  isDark: boolean;
}

const RadioDot = ({ selected, isDark }: RadioDotProps) => (
  <View
    style={[
      styles.radioBorder,
      selected && styles.radioBorderSelected,
      isDark && !selected && styles.radioBorderDark,
    ]}
  >
    {selected && <View style={styles.radioFill} />}
  </View>
);

// ── PaymentMethodCard ─────────────────────────────────────────────────────────

interface PaymentMethodCardProps {
  id: PaymentMethod;
  selected: boolean;
  onSelect: (id: PaymentMethod) => void;
  isDark: boolean;
  iconBg: string;
  iconBgDark: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  badge: string;
  badgeStyle: 'green' | 'amber';
  fee: string;
}

const PaymentMethodCard = React.memo(
  ({
    id,
    selected,
    onSelect,
    isDark,
    iconBg,
    iconBgDark,
    icon,
    title,
    detail,
    badge,
    badgeStyle,
    fee,
  }: PaymentMethodCardProps) => (
    <Pressable
      style={[
        styles.methodCard,
        selected && styles.methodCardSelected,
        isDark && styles.methodCardDark,
        selected && isDark && styles.methodCardSelectedDark,
      ]}
      onPress={() => onSelect(id)}
      className="active:opacity-pressed"
      accessibilityLabel={title}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
    >
      <View
        style={[
          styles.methodIconWrap,
          { backgroundColor: isDark ? iconBgDark : iconBg },
        ]}
      >
        {icon}
      </View>

      <View style={styles.methodInfo}>
        <Text
          style={[styles.methodTitle, isDark && styles.methodTitleDark]}
          allowFontScaling={false}
          numberOfLines={1}
        >
          {title}
        </Text>

        <View style={styles.methodDetailRow}>
          <Text style={styles.methodDetail} allowFontScaling={false}>
            {detail}
          </Text>
          <View
            style={[
              styles.badge,
              badgeStyle === 'green' ? styles.badgeGreen : styles.badgeAmber,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                badgeStyle === 'green'
                  ? styles.badgeTextGreen
                  : styles.badgeTextAmber,
              ]}
              allowFontScaling={false}
            >
              {badge}
            </Text>
          </View>
        </View>

        <Text style={styles.methodFee} allowFontScaling={false}>
          {fee}
        </Text>
      </View>

      <RadioDot selected={selected} isDark={isDark} />
    </Pressable>
  ),
);

// ── Main Screen ───────────────────────────────────────────────────────────────

const TopUpScreen = () => {
  const navigation = useNavigation<Nav>();
  const { isDark } = useTheme();
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);
  const handleSelectMethod = useCallback((id: PaymentMethod) => setSelectedMethod(id), []);
  const handleAddMethod = useCallback(() => {}, []);
  const handleContinue = useCallback(() => {
    if (selectedMethod) {
      navigation.navigate('WalletTopUpAmount', { method: selectedMethod });
    }
  }, [navigation, selectedMethod]);

  const canContinue = selectedMethod !== null;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} className="bg-white dark:bg-neutral-900">

      {/* ── Header ── */}
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Pressable
          style={[styles.backBtn, isDark && styles.backBtnDark]}
          onPress={handleBack}
          className="active:opacity-pressed"
          accessibilityLabel="Go back"
        >
          <ArrowLeftIcon size={20} color={isDark ? '#D1D5DB' : '#374151'} />
        </Pressable>
        <Text
          style={[styles.headerTitle, isDark && styles.headerTitleDark]}
          allowFontScaling={false}
        >
          Top Up Wallet
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Selected Wallet Chip ── */}
        <View style={[styles.walletChip, isDark && styles.walletChipDark]}>
          <Text style={styles.walletChipFlag} allowFontScaling={false}>
            🇺🇸
          </Text>
          <Text
            style={[styles.walletChipText, isDark && styles.walletChipTextDark]}
            allowFontScaling={false}
            numberOfLines={1}
          >
            USD Wallet · $8,240.50
          </Text>
        </View>

        {/* ── Section Label ── */}
        <Text style={styles.sectionLabel} allowFontScaling={false}>
          Select Payment Method
        </Text>

        {/* ── Payment Methods ── */}
        <View style={styles.methodsContainer}>
          <PaymentMethodCard
            id="card"
            selected={selectedMethod === 'card'}
            onSelect={handleSelectMethod}
            isDark={isDark}
            iconBg="#EFF6FF"
            iconBgDark="#1e3a5f"
            icon={<CreditCardIcon size={20} color="#2563EB" />}
            title="Debit / Credit Card"
            detail="Visa •••• 4829"
            badge="Instant"
            badgeStyle="green"
            fee="1.5% processing fee"
          />

          <PaymentMethodCard
            id="bank"
            selected={selectedMethod === 'bank'}
            onSelect={handleSelectMethod}
            isDark={isDark}
            iconBg="#F5F3FF"
            iconBgDark="#2d1b5e"
            icon={<BankBuildingIcon size={20} color="#7C3AED" />}
            title="Linked Bank Account"
            detail="Chase Bank •••• 1234"
            badge="1–2 days"
            badgeStyle="amber"
            fee="No fee"
          />
        </View>

        {/* ── Add New Payment Method ── */}
        <Pressable
          style={[styles.addMethodBtn, isDark && styles.addMethodBtnDark]}
          onPress={handleAddMethod}
          className="active:opacity-pressed"
          accessibilityLabel="Add new payment method"
        >
          <View style={[styles.addMethodIconWrap, isDark && styles.addMethodIconWrapDark]}>
            <PlusIcon size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </View>
          <Text
            style={[styles.addMethodText, isDark && styles.addMethodTextDark]}
            allowFontScaling={false}
          >
            Add New Payment Method
          </Text>
          <ChevronRightIcon size={16} color={isDark ? '#4B5563' : '#D1D5DB'} />
        </Pressable>

        {/* ── Security Notice ── */}
        <View style={[styles.securityNotice, isDark && styles.securityNoticeDark]}>
          <Text style={styles.lockEmoji} allowFontScaling={false}>
            🔒
          </Text>
          <Text
            style={[styles.securityText, isDark && styles.securityTextDark]}
            allowFontScaling={false}
          >
            Your payment details are encrypted with 256-bit SSL security.
          </Text>
        </View>
      </ScrollView>

      {/* ── Footer ── */}
      <View style={[styles.footer, isDark && styles.footerDark]}>
        <Pressable
          style={[
            styles.continueBtn,
            canContinue ? styles.continueBtnActive : styles.continueBtnDisabled,
          ]}
          onPress={canContinue ? handleContinue : undefined}
          disabled={!canContinue}
          className={canContinue ? 'active:opacity-pressed' : undefined}
          accessibilityLabel="Continue"
          accessibilityState={{ disabled: !canContinue }}
        >
          <Text
            style={[
              styles.continueBtnText,
              canContinue
                ? styles.continueBtnTextActive
                : styles.continueBtnTextDisabled,
            ]}
            allowFontScaling={false}
          >
            Continue
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default TopUpScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 56,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  headerDark: {
    borderBottomColor: '#1E293B',
    backgroundColor: '#0F172A',
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
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F8FAFC',
  },

  // ── Scroll ──
  scrollContent: {
    paddingTop: 24,
    paddingHorizontal: 24,
    paddingBottom: 24,
  },

  // ── Wallet Chip ──
  walletChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    height: 49,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  walletChipDark: {
    backgroundColor: '#1e3a5f',
    borderColor: '#2563EB',
  },
  walletChipFlag: {
    fontSize: 18,
    lineHeight: 27,
  },
  walletChipText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#1D4ED8',
  },
  walletChipTextDark: {
    color: '#93C5FD',
  },

  // ── Section Label ──
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
    letterSpacing: 0.77,
    textTransform: 'uppercase',
    marginTop: 28,
    marginBottom: 12,
  },

  // ── Methods ──
  methodsContainer: {
    gap: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    height: 97,
    paddingHorizontal: 18,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  methodCardSelected: {
    borderColor: '#2563EB',
  },
  methodCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  methodCardSelectedDark: {
    borderColor: '#3B82F6',
  },
  methodIconWrap: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodInfo: {
    flex: 1,
    gap: 3,
  },
  methodTitle: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  methodTitleDark: {
    color: '#F8FAFC',
  },
  methodDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  methodDetail: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  badge: {
    height: 19,
    paddingHorizontal: 7,
    borderRadius: 6,
    justifyContent: 'center',
  },
  badgeGreen: {
    backgroundColor: '#F0FDF4',
  },
  badgeAmber: {
    backgroundColor: '#FFFBEB',
  },
  badgeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 10,
    lineHeight: 15,
  },
  badgeTextGreen: {
    color: '#059669',
  },
  badgeTextAmber: {
    color: '#D97706',
  },
  methodFee: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
  },

  // ── Radio button ──
  radioBorder: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioBorderSelected: {
    borderColor: '#2563EB',
  },
  radioBorderDark: {
    borderColor: '#4B5563',
  },
  radioFill: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2563EB',
  },

  // ── Add Method ──
  addMethodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 67,
    marginTop: 12,
    paddingHorizontal: 17,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
  },
  addMethodBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  addMethodIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addMethodIconWrapDark: {
    backgroundColor: '#334155',
  },
  addMethodText: {
    flex: 1,
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },
  addMethodTextDark: {
    color: '#9CA3AF',
  },

  // ── Security Notice ──
  securityNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  securityNoticeDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  lockEmoji: {
    fontSize: 16,
    lineHeight: 24,
  },
  securityText: {
    flex: 1,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  securityTextDark: {
    color: '#9CA3AF',
  },

  // ── Footer ──
  footer: {
    paddingTop: 17,
    paddingHorizontal: 24,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  footerDark: {
    backgroundColor: '#0F172A',
    borderTopColor: '#1E293B',
  },
  continueBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnActive: {
    backgroundColor: '#2563EB',
  },
  continueBtnDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  continueBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 16,
    lineHeight: 23,
  },
  continueBtnTextActive: {
    color: '#FFFFFF',
  },
  continueBtnTextDisabled: {
    color: '#9CA3AF',
  },
});
