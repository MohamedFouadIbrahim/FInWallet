import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Svg, { Circle, Path, Polyline } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import type { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

type RouteProps = RouteProp<DashboardStackParamList, 'BillPayment'>;

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Circle cx={10} cy={10} r={8.5} stroke="#10B981" strokeWidth={1.5} />
    <Polyline points="6,10 9,13 14,7" stroke="#10B981" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Circle cx={8} cy={8} r={6.5} stroke="#2563EB" strokeWidth={1.3} />
    <Path d="M8 7.5V11" stroke="#2563EB" strokeWidth={1.3} strokeLinecap="round" />
    <Circle cx={8} cy={5.5} r={0.75} fill="#2563EB" />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path d="M4 6L8 10L12 6" stroke="#374151" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── BillPaymentScreen ──────────────────────────────────────────────────────────

export default function BillPaymentScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const { provider } = route.params;

  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('');

  const isAccountValid = accountNumber.length >= 6;
  const customerName = 'Alex Carter';

  const canReview = isAccountValid && amount.trim().length > 0;

  const handleAccountChange = useCallback((text: string) => {
    setAccountNumber(text);
    if (text.length >= 6) {
      setAmount('85.00');
    } else {
      setAmount('');
    }
  }, []);

  const handleAmountChange = useCallback((text: string) => {
    setAmount(text);
  }, []);

  const billAmount = parseFloat(amount || '0');
  const serviceFee = 0.99;
  const totalPayable = billAmount + serviceFee;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl h-[56px] gap-[16px]">
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={styles.backButton}
        >
          <BackIcon />
        </Pressable>
        <View className="flex-1 gap-[2px]">
          <Text
            className="font-jakarta-bold text-[20px] text-[#111827] dark:text-neutral-50 leading-[30px]"
            allowFontScaling={false}
          >
            Bill Details
          </Text>
          <Text
            className="font-inter-regular text-[12px] text-[#6B7280] dark:text-neutral-400 leading-[18px]"
            allowFontScaling={false}
          >
            {provider.name}
          </Text>
        </View>
      </View>

      {/* ── Scrollable content ──────────────────────────────────────────── */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Provider card */}
        <View style={styles.providerCard}>
          <View style={[styles.avatar, { backgroundColor: provider.avatarBg }]}>
            <Text style={[styles.avatarText, { color: provider.initialsColor }]} allowFontScaling={false}>
              {provider.initials}
            </Text>
          </View>
          <View className="flex-1 gap-[2px]">
            <Text
              className="font-inter-semibold text-[14px] leading-[21px] text-[#111827] dark:text-neutral-50"
              allowFontScaling={false}
              numberOfLines={1}
            >
              {provider.name}
            </Text>
            <Text
              className="font-inter-medium text-[12px] leading-[18px] text-[#6B7280] dark:text-neutral-400"
              allowFontScaling={false}
              numberOfLines={1}
            >
              {provider.subtitle}
            </Text>
          </View>
        </View>

        {/* Account number field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel} allowFontScaling={false}>Account Number</Text>
          <View style={[styles.inputRow, isAccountValid && styles.inputRowValid]}>
            <TextInput
              style={styles.textInput}
              className="flex-1 font-inter-regular text-[14px] text-[#111827] dark:text-neutral-50"
              placeholder="Enter account number"
              placeholderTextColor="#9CA3AF"
              value={accountNumber}
              onChangeText={handleAccountChange}
              keyboardType="default"
              returnKeyType="next"
              allowFontScaling={false}
            />
            {isAccountValid && (
              <View style={styles.inputIcon}>
                <CheckCircleIcon />
              </View>
            )}
          </View>
          {isAccountValid && (
            <Text style={styles.accountHelperText} allowFontScaling={false}>
              Account holder: {customerName}
            </Text>
          )}
        </View>

        {/* Customer name field (conditional) */}
        {isAccountValid && (
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel} allowFontScaling={false}>Account Holder</Text>
            <View style={styles.readOnlyRow}>
              <Text style={styles.readOnlyText} allowFontScaling={false}>
                {customerName}
              </Text>
            </View>
          </View>
        )}

        {/* Amount field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel} allowFontScaling={false}>Amount</Text>
          <View style={styles.inputRow}>
            <Text style={styles.currencyPrefix} allowFontScaling={false}>$</Text>
            <TextInput
              style={styles.textInput}
              className="flex-1 font-inter-regular text-[14px] text-[#111827] dark:text-neutral-50"
              placeholder="0.00"
              placeholderTextColor="#9CA3AF"
              value={amount}
              onChangeText={handleAmountChange}
              keyboardType="decimal-pad"
              returnKeyType="done"
              allowFontScaling={false}
            />
            <View style={styles.currencyChip}>
              <Text style={styles.currencyChipText} allowFontScaling={false}>USD</Text>
              <ChevronDownIcon />
            </View>
          </View>
          {isAccountValid && (
            <View style={styles.infoHint}>
              <InfoIcon />
              <Text style={styles.infoHintText} allowFontScaling={false}>
                Outstanding amount auto-fetched
              </Text>
            </View>
          )}
        </View>

        {/* Fee breakdown (conditional) */}
        {isAccountValid && (
          <View style={styles.feeCard}>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel} allowFontScaling={false}>Bill Amount</Text>
              <Text style={styles.feeValue} allowFontScaling={false}>
                ${billAmount.toFixed(2)}
              </Text>
            </View>
            <View style={styles.feeRow}>
              <Text style={styles.feeLabel} allowFontScaling={false}>Service Fee</Text>
              <Text style={styles.feeValue} allowFontScaling={false}>
                ${serviceFee.toFixed(2)}
              </Text>
            </View>
            <View style={styles.feeDivider} />
            <View style={styles.feeRow}>
              <Text style={styles.feeTotalLabel} allowFontScaling={false}>Total Payable</Text>
              <Text style={styles.feeTotalValue} allowFontScaling={false}>
                ${totalPayable.toFixed(2)}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <View style={styles.bottomBar}>
        <Pressable
          style={[styles.reviewButton, canReview && styles.reviewButtonActive]}
          onPress={() =>
            navigation.navigate('BillReview', {
              provider,
              accountNumber,
              amount,
              customerName,
            })
          }
          disabled={!canReview}
          accessibilityLabel="Review Payment"
        >
          <Text
            style={[styles.reviewText, canReview && styles.reviewTextActive]}
            allowFontScaling={false}
          >
            Review Payment
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backButton: {
    minWidth: 44,
    minHeight: 44,
  },

  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    gap: 16,
  },

  // Provider card
  providerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    height: 72,
    paddingHorizontal: 17,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 21,
  },

  // Field groups
  fieldGroup: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },

  // Input row
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    gap: 8,
  },
  inputRowValid: {
    borderColor: '#10B981',
  },
  textInput: {
    flex: 1,
    height: '100%',
    padding: 0,
  },
  inputIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Account valid helper
  accountHelperText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#10B981',
    marginTop: 2,
  },

  // Read-only field
  readOnlyRow: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    height: 52,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  readOnlyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },

  // Currency prefix & chip
  currencyPrefix: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
  },
  currencyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  currencyChipText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#374151',
  },

  // Info hint
  infoHint: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  infoHintText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
  },

  // Fee breakdown card
  feeCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 16,
    gap: 12,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  feeValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#111827',
  },
  feeDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  feeTotalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  feeTotalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#2563EB',
  },

  // Bottom bar
  bottomBar: {
    paddingTop: 17,
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  reviewButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E5E7EB',
  },
  reviewButtonActive: {
    backgroundColor: '#2563EB',
  },
  reviewText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#9CA3AF',
  },
  reviewTextActive: {
    color: '#FFFFFF',
  },
});
