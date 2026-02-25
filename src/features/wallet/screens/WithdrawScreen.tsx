import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  TextInput,
  ScrollView,
  StyleSheet,
  type TextInput as TextInputType,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import BankBuildingIcon from '@components/ui/icons/BankBuildingIcon';
import RadioCheckedIcon from '@components/ui/icons/RadioCheckedIcon';
import PlusIcon from '@components/ui/icons/PlusIcon';
import ChevronRightIcon from '@components/ui/icons/ChevronRightIcon';
import type { WalletStackParamList } from '../navigation/WalletNavigator';

// ── Types ─────────────────────────────────────────────────────────────────────

type Nav = NativeStackNavigationProp<WalletStackParamList, 'WalletWithdraw'>;
type Destination = 'chase' | 'wellsfargo';

// ── Constants ─────────────────────────────────────────────────────────────────

const AVAILABLE_BALANCE = 8240.5;
const TRANSFER_FEE = 2.5;

const formatBalance = (value: number) =>
  value.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

interface BankOption {
  id: Destination;
  name: string;
  detail: string;
  iconColor: string;
  iconBg: string;
  iconBgDark: string;
}

const BANK_OPTIONS: BankOption[] = [
  {
    id: 'chase',
    name: 'Chase Bank',
    detail: 'Checking · •••• 1234',
    iconColor: '#2563EB',
    iconBg: '#EFF6FF',
    iconBgDark: '#1e3a5f',
  },
  {
    id: 'wellsfargo',
    name: 'Wells Fargo',
    detail: 'Savings · •••• 5678',
    iconColor: '#7C3AED',
    iconBg: '#F5F3FF',
    iconBgDark: '#2d1b5e',
  },
];

// ── DestinationCard ───────────────────────────────────────────────────────────

interface DestinationCardProps {
  option: BankOption;
  selected: boolean;
  onPress: () => void;
  isDark: boolean;
}

const DestinationCard = React.memo(
  ({ option, selected, onPress, isDark }: DestinationCardProps) => (
    <Pressable
      style={[
        styles.destCard,
        isDark
          ? selected
            ? styles.destCardSelectedDark
            : styles.destCardDark
          : selected
            ? styles.destCardSelected
            : styles.destCardUnselected,
      ]}
      onPress={onPress}
      className="active:opacity-pressed"
      accessibilityLabel={`Select ${option.name}`}
      accessibilityState={{ selected }}
    >
      <View
        style={[
          styles.destIconWrap,
          { backgroundColor: isDark ? option.iconBgDark : option.iconBg },
        ]}
      >
        <BankBuildingIcon size={18} color={option.iconColor} />
      </View>
      <View style={styles.destInfo}>
        <Text
          style={[styles.destName, isDark && styles.destNameDark]}
          allowFontScaling={false}
          numberOfLines={1}
        >
          {option.name}
        </Text>
        <Text style={styles.destDetail} allowFontScaling={false} numberOfLines={1}>
          {option.detail}
        </Text>
      </View>
      {selected ? (
        <RadioCheckedIcon size={20} color="#2563EB" />
      ) : (
        <View style={[styles.radioEmpty, isDark && styles.radioEmptyDark]} />
      )}
    </Pressable>
  ),
);

// ── Main Screen ───────────────────────────────────────────────────────────────

const WithdrawScreen = () => {
  const navigation = useNavigation<Nav>();
  const { isDark } = useTheme();

  const [selectedDest, setSelectedDest] = useState<Destination>('chase');
  const [amount, setAmount] = useState('');
  const inputRef = useRef<TextInputType>(null);

  const numericAmount = parseFloat(amount) || 0;
  const youReceive = numericAmount - TRANSFER_FEE;
  const isValid = numericAmount > 0 && numericAmount <= AVAILABLE_BALANCE;

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  const handleAmountChange = useCallback((text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, '').replace(/(\..*)\./, '$1');
    setAmount(cleaned);
  }, []);

  const handleMax = useCallback(() => {
    setAmount(String(AVAILABLE_BALANCE));
    inputRef.current?.blur();
  }, []);

  const handleSelectDest = useCallback((id: Destination) => {
    setSelectedDest(id);
  }, []);

  const handleConfirm = useCallback(() => {
    const bank = BANK_OPTIONS.find(b => b.id === selectedDest)!;
    navigation.navigate('WalletWithdrawSuccess', {
      amount,
      bankName: bank.name,
      bankDetail: bank.detail,
      fee: String(TRANSFER_FEE),
      timestamp: Date.now(),
    });
  }, [navigation, amount, selectedDest]);

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
          Withdraw Funds
        </Text>
      </View>

      {/* ── Scrollable Content ── */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >

        {/* ── Balance Card ── */}
        <LinearGradient
          colors={['#2563EB', '#1E3A8A']}
          start={{ x: 0.2, y: 0.06 }}
          end={{ x: 0.8, y: 0.94 }}
          style={styles.balanceCard}
        >
          <View style={styles.balanceLeft}>
            <Text style={styles.balanceLabel} allowFontScaling={false}>
              Available to Withdraw
            </Text>
            <Text style={styles.balanceAmount} allowFontScaling={false}>
              {`$${formatBalance(AVAILABLE_BALANCE)}`}
            </Text>
          </View>
          <View style={styles.balanceRight}>
            <Text style={styles.currencyLabel} allowFontScaling={false}>
              Currency
            </Text>
            <View style={styles.currencyRow}>
              <Text style={styles.currencyFlag} allowFontScaling={false}>
                🇺🇸
              </Text>
              <Text style={styles.currencyCode} allowFontScaling={false}>
                USD
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* ── Select Destination ── */}
        <Text style={styles.sectionLabel} allowFontScaling={false}>
          Select Destination
        </Text>

        <View style={styles.destContainer}>
          {BANK_OPTIONS.map(option => (
            <DestinationCard
              key={option.id}
              option={option}
              selected={selectedDest === option.id}
              onPress={() => handleSelectDest(option.id)}
              isDark={isDark}
            />
          ))}
        </View>

        {/* ── Add New Bank Account ── */}
        <Pressable
          style={[styles.addBankBtn, isDark && styles.addBankBtnDark]}
          className="active:opacity-pressed"
          accessibilityLabel="Add new bank account"
        >
          <View style={[styles.addBankIconWrap, isDark && styles.addBankIconWrapDark]}>
            <PlusIcon size={15} color={isDark ? '#9CA3AF' : '#6B7280'} />
          </View>
          <Text
            style={[styles.addBankText, isDark && styles.addBankTextDark]}
            allowFontScaling={false}
          >
            Add New Bank Account
          </Text>
          <ChevronRightIcon size={15} color={isDark ? '#4B5563' : '#D1D5DB'} />
        </Pressable>

        {/* ── Amount ── */}
        <Text style={styles.sectionLabel} allowFontScaling={false}>
          Amount
        </Text>

        <Pressable
          style={[styles.amountCard, isDark && styles.amountCardDark]}
          onPress={() => inputRef.current?.focus()}
          accessible={false}
        >
          <View style={styles.amountRow}>
            <Text
              style={[styles.dollarSign, isDark && styles.dollarSignDark]}
              allowFontScaling={false}
            >
              $
            </Text>
            <TextInput
              ref={inputRef}
              style={[styles.amountInput, isDark && styles.amountInputDark]}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor={
                isDark ? 'rgba(248,250,252,0.3)' : 'rgba(17,24,39,0.3)'
              }
              keyboardType="decimal-pad"
              keyboardAppearance={isDark ? 'dark' : 'light'}
              maxLength={12}
              allowFontScaling={false}
              selectionColor="#2563EB"
            />
            <Pressable
              style={[styles.maxBtn, isDark && styles.maxBtnDark]}
              onPress={handleMax}
              className="active:opacity-pressed"
              accessibilityLabel="Set maximum amount"
            >
              <Text style={styles.maxBtnText} allowFontScaling={false}>
                Max
              </Text>
            </Pressable>
          </View>
        </Pressable>

        {/* ── Transaction Summary ── */}
        {numericAmount > 0 && (
          <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
            {/* Withdrawal Amount */}
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}
                allowFontScaling={false}
              >
                Withdrawal Amount
              </Text>
              <Text
                style={[styles.summaryValue, isDark && styles.summaryValueDark]}
                allowFontScaling={false}
              >
                {`$${formatBalance(numericAmount)}`}
              </Text>
            </View>

            <View style={[styles.summarySep, isDark && styles.summarySepDark]} />

            {/* Transaction Fee */}
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryLabel, isDark && styles.summaryLabelDark]}
                allowFontScaling={false}
              >
                Transaction Fee
              </Text>
              <Text
                style={[styles.summaryValue, isDark && styles.summaryValueDark]}
                allowFontScaling={false}
              >
                {`$${formatBalance(TRANSFER_FEE)}`}
              </Text>
            </View>

            <View style={[styles.summarySep, isDark && styles.summarySepDark]} />

            {/* You Receive */}
            <View style={styles.summaryRow}>
              <Text
                style={[styles.summaryTotalLabel, isDark && styles.summaryTotalLabelDark]}
                allowFontScaling={false}
              >
                You Receive
              </Text>
              <Text style={styles.summaryTotalValue} allowFontScaling={false}>
                {`$${formatBalance(youReceive)}`}
              </Text>
            </View>
          </View>
        )}

      </ScrollView>

      {/* ── Footer ── */}
      <View style={[styles.footer, isDark && styles.footerDark]}>
        <Pressable
          style={[
            styles.confirmBtn,
            isValid ? styles.confirmBtnActive : styles.confirmBtnDisabled,
          ]}
          onPress={isValid ? handleConfirm : undefined}
          disabled={!isValid}
          className={isValid ? 'active:opacity-pressed' : undefined}
          accessibilityLabel="Confirm withdrawal"
          accessibilityState={{ disabled: !isValid }}
        >
          <Text
            style={[
              styles.confirmBtnText,
              isValid ? styles.confirmBtnTextActive : styles.confirmBtnTextDisabled,
            ]}
            allowFontScaling={false}
          >
            Confirm Withdrawal
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
};

export default WithdrawScreen;

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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },

  // ── Balance Card ──
  balanceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 82,
    borderRadius: 14,
    // paddingHorizontal: 16,
    // overflow: 'hidden',
  },
  balanceLeft: {
    gap: 3,
    marginHorizontal:10
  },
  balanceLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.65)',
  },
  balanceAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 22,
    lineHeight: 33,
    color: '#FFFFFF',
    letterSpacing: -0.3,
  },
  balanceRight: {
    // alignItems: 'flex-end',
    gap: 2,
    marginHorizontal:5
  },
  currencyLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: 'rgba(255,255,255,0.55)',
    textAlign: 'right',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  currencyFlag: {
    fontSize: 16,
    lineHeight: 24,
  },
  currencyCode: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#FFFFFF',
  },

  // ── Section Labels ──
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
    letterSpacing: 0.77,
    textTransform: 'uppercase',
    marginTop: 24,
    marginBottom: 12,
  },

  // ── Destination Cards ──
  destContainer: {
    gap: 10,
  },
  destCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 74,
    borderRadius: 14,
    borderWidth: 2,
    paddingHorizontal: 18,
  },
  destCardUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  destCardSelected: {
    backgroundColor: '#F8FAFF',
    borderColor: '#2563EB',
  },
  destCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  destCardSelectedDark: {
    backgroundColor: '#1e3a5f',
    borderColor: '#2563EB',
  },
  destIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  destInfo: {
    flex: 1,
    gap: 2,
  },
  destName: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  destNameDark: {
    color: '#F8FAFC',
  },
  destDetail: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
  radioEmpty: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  radioEmptyDark: {
    borderColor: '#4B5563',
  },

  // ── Add Bank Button ──
  addBankBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 61,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 17,
    marginTop: 10,
  },
  addBankBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  addBankIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addBankIconWrapDark: {
    backgroundColor: '#334155',
  },
  addBankText: {
    flex: 1,
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },
  addBankTextDark: {
    color: '#9CA3AF',
  },

  // ── Amount Card ──
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    height: 74,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  amountCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dollarSign: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: '#9CA3AF',
    includeFontPadding: false,
  },
  dollarSignDark: {
    color: '#6B7280',
  },
  amountInput: {
    flex: 1,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 28,
    lineHeight: 42,
    letterSpacing: -0.5,
    color: '#111827',
    padding: 0,
    includeFontPadding: false,
  },
  amountInputDark: {
    color: '#F8FAFC',
  },
  maxBtn: {
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  maxBtnDark: {
    backgroundColor: '#1e3a5f',
  },
  maxBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
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
  confirmBtn: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBtnActive: {
    backgroundColor: '#2563EB',
  },
  confirmBtnDisabled: {
    backgroundColor: '#E5E7EB',
    opacity: 0.5,
  },
  confirmBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 16,
    lineHeight: 23,
  },
  confirmBtnTextActive: {
    color: '#FFFFFF',
  },
  confirmBtnTextDisabled: {
    color: '#9CA3AF',
  },

  // ── Transaction Summary ──
  summaryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    paddingHorizontal: 18,
    marginTop: 16,
  },
  summaryCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
  },
  summaryLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },
  summaryLabelDark: {
    color: '#9CA3AF',
  },
  summaryValue: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  summaryValueDark: {
    color: '#F8FAFC',
  },
  summaryFree: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#059669',
  },
  summarySep: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  summarySepDark: {
    backgroundColor: '#334155',
  },
  summaryTotalLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  summaryTotalLabelDark: {
    color: '#F8FAFC',
  },
  summaryTotalValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#059669',
  },
});
