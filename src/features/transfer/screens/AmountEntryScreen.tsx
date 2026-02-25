import React, { useCallback, useRef, useState } from 'react';
import {
  Keyboard,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import { useTheme } from '@theme/useTheme';

// ── Constants ─────────────────────────────────────────────────────────────────

const AVAILABLE_BALANCE = 12485.5;
const QUICK_AMOUNTS_ROW1 = [50, 100, 250, 500];
const QUICK_AMOUNT_ROW2 = 1000;

// ── AmountEntryScreen ─────────────────────────────────────────────────────────

export default function AmountEntryScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const inputRef = useRef<TextInput>(null);
  const [rawValue, setRawValue] = useState('');

  const numericAmount = parseFloat(rawValue) || 0;
  const isValid = numericAmount > 0 && numericAmount <= AVAILABLE_BALANCE;

  const handleChangeText = useCallback((text: string) => {
    // Allow only digits and a single decimal point
    const cleaned = text.replace(/[^0-9.]/g, '');
    const parts = cleaned.split('.');
    if (parts.length > 2) return; // block multiple decimals
    if (parts[1] && parts[1].length > 2) return; // max 2 decimal places
    setRawValue(cleaned);
  }, []);

  const handleQuickAmount = useCallback((amount: number) => {
    setRawValue(amount.toString());
    Keyboard.dismiss();
  }, []);

  const handleContinue = useCallback(() => {
    navigation.navigate('TransferReview', {
      amount: numericAmount,
      recipientName: 'Sarah Johnson',
      recipientUsername: '@sarahj',
    });
  }, [navigation, numericAmount]);

  const reviewLabel = isValid
    ? `Review Transfer · $${numericAmount.toFixed(2)}`
    : 'Review Transfer';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl h-[56px] gap-md">
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={styles.backBtn}
        >
          <ArrowLeftIcon size={20} color={isDark ? '#F9FAFB' : '#111827'} />
        </Pressable>
        <Text
          className="font-jakarta-bold text-h3 leading-[27px] text-neutral-900 dark:text-neutral-50"
          allowFontScaling={false}
        >
          Enter Amount
        </Text>
      </View>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Recipient card ───────────────────────────────────────── */}
          <View className="px-xl">
            <View style={[styles.recipientCard, isDark && styles.recipientCardDark]}>
              {/* Avatar */}
              <View style={styles.recipientAvatar}>
                <Text style={styles.recipientInitials} allowFontScaling={false}>
                  SJ
                </Text>
              </View>
              {/* Name & username */}
              <View className="flex-1 gap-[2px]">
                <Text
                  className="font-inter-semibold text-[14px] leading-[21px] text-neutral-900 dark:text-neutral-50"
                  allowFontScaling={false}
                >
                  Sarah Johnson
                </Text>
                <Text
                  className="font-inter-regular text-[12px] leading-[18px] text-[#9CA3AF]"
                  allowFontScaling={false}
                >
                  @sarahj
                </Text>
              </View>
              {/* Instant badge */}
              <View style={styles.instantBadge}>
                <Text style={styles.instantBadgeText} allowFontScaling={false}>
                  Instant
                </Text>
              </View>
            </View>
          </View>

          {/* ── Amount input ─────────────────────────────────────────── */}
          <Pressable
            onPress={() => inputRef.current?.focus()}
            style={styles.amountWrap}
          >
            <View style={styles.amountRow}>
              {/* Dollar symbol */}
              <Text style={styles.currencySymbol} allowFontScaling={false}>
                $
              </Text>
              {/* Hidden real input + display */}
              <TextInput
                ref={inputRef}
                value={rawValue}
                onChangeText={handleChangeText}
                keyboardType="numeric"
                placeholder="0"
                placeholderTextColor="rgba(17,24,39,0.25)"
                style={[
                  styles.amountInput,
                  isDark && styles.amountInputDark,
                ]}
                maxLength={10}
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
                allowFontScaling={false}
                caretHidden={false}
                selectionColor="#2563EB"
              />
            </View>

            {/* Available balance */}
            <Text
              style={styles.availableText}
              allowFontScaling={false}
            >
              Available: ${AVAILABLE_BALANCE.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </Text>
          </Pressable>

          {/* ── Quick amount buttons ──────────────────────────────────── */}
          <View className="px-xl gap-[8px]">
            {/* Row 1 */}
            <View className="flex-row justify-center gap-[8px]">
              {QUICK_AMOUNTS_ROW1.map(amount => (
                <Pressable
                  key={amount}
                  onPress={() => handleQuickAmount(amount)}
                  style={[
                    styles.quickBtn,
                    isDark ? styles.quickBtnDark : styles.quickBtnLight,
                    rawValue === amount.toString() && styles.quickBtnSelected,
                  ]}
                  accessibilityLabel={`Set amount to $${amount}`}
                >
                  <Text
                    style={[
                      styles.quickBtnText,
                      isDark && styles.quickBtnTextDark,
                      rawValue === amount.toString() && styles.quickBtnTextSelected,
                    ]}
                    allowFontScaling={false}
                  >
                    ${amount}
                  </Text>
                </Pressable>
              ))}
            </View>
            {/* Row 2 — centered $1000 */}
            <View className="flex-row justify-center">
              <Pressable
                onPress={() => handleQuickAmount(QUICK_AMOUNT_ROW2)}
                style={[
                  styles.quickBtn,
                  isDark ? styles.quickBtnDark : styles.quickBtnLight,
                  rawValue === QUICK_AMOUNT_ROW2.toString() && styles.quickBtnSelected,
                ]}
                accessibilityLabel="Set amount to $1000"
              >
                <Text
                  style={[
                    styles.quickBtnText,
                    isDark && styles.quickBtnTextDark,
                    rawValue === QUICK_AMOUNT_ROW2.toString() && styles.quickBtnTextSelected,
                  ]}
                  allowFontScaling={false}
                >
                  $1000
                </Text>
              </Pressable>
            </View>
          </View>

          {/* ── Summary card ─────────────────────────────────────────── */}
          <View className="px-xl mt-xl">
            <View style={[styles.summaryCard, isDark && styles.summaryCardDark]}>
              {/* Label */}
              <Text style={styles.summaryLabel} allowFontScaling={false}>
                SUMMARY
              </Text>

              {/* Send Amount row */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey} allowFontScaling={false}>
                  Send Amount
                </Text>
                <Text style={[styles.summaryValue, isDark && styles.summaryValueDark]} allowFontScaling={false}>
                  {numericAmount > 0
                    ? `$${numericAmount.toFixed(2)}`
                    : '$0.00'}
                </Text>
              </View>

              {/* Transfer Fee row */}
              <View style={styles.summaryRow}>
                <Text style={styles.summaryKey} allowFontScaling={false}>
                  Transfer Fee
                </Text>
                <Text style={styles.feeValue} allowFontScaling={false}>
                  Free
                </Text>
              </View>

              {/* Divider */}
              <View style={[styles.summaryDivider, isDark && styles.summaryDividerDark]} />

              {/* Total row */}
              <View style={styles.summaryRow}>
                <Text style={[styles.totalKey, isDark && styles.totalKeyDark]} allowFontScaling={false}>
                  Total Deducted
                </Text>
                <Text style={styles.totalValue} allowFontScaling={false}>
                  {numericAmount > 0
                    ? `$${numericAmount.toFixed(2)}`
                    : '$0.00'}
                </Text>
              </View>
            </View>
          </View>

          <View className="h-[24px]" />
        </ScrollView>
      </TouchableWithoutFeedback>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View
        className="px-xl pt-[17px] pb-[10px] "
        style={styles.footer}
      >
        <AppButton
          label={reviewLabel}
          onPress={handleContinue}
          disabled={!isValid}
        />
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContent: {
    paddingTop: 20,
    paddingBottom: 8,
  },

  // Recipient card
  recipientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    backgroundColor: 'rgba(37,99,235,0.05)',
    borderColor: 'rgba(37,99,235,0.13)',
  },
  recipientCardDark: {
    backgroundColor: 'rgba(37,99,235,0.12)',
    borderColor: 'rgba(37,99,235,0.25)',
  },
  recipientAvatar: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: 'rgba(37,99,235,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  recipientInitials: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#2563EB',
  },
  instantBadge: {
    paddingHorizontal: 9,
    height: 22,
    borderRadius: 8,
    backgroundColor: 'rgba(37,99,235,0.09)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  instantBadgeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#2563EB',
  },

  // Amount input
  amountWrap: {
    alignItems: 'center',
    paddingVertical: 28,
    gap: 8,
  },
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  currencySymbol: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 40,
    color: '#9CA3AF',
    alignSelf: 'flex-end',
    paddingBottom: 6,
  },
  amountInput: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 52,
    lineHeight: 66,
    color: 'rgba(17,24,39,0.7)',
    letterSpacing: -1,
    textAlign: 'center',
    minWidth: 80,
    maxWidth: 260,
    padding: 0,
  },
  amountInputDark: {
    color: 'rgba(249,250,251,0.7)',
  },
  availableText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
    textAlign: 'center',
  },

  // Quick amount buttons
  quickBtn: {
    height: 36,
    borderRadius: 20,
    borderWidth: 1.5,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 56,
  },
  quickBtnLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  quickBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  quickBtnSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  quickBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  quickBtnTextDark: {
    color: '#94A3B8',
  },
  quickBtnTextSelected: {
    color: '#2563EB',
  },

  // Summary card
  summaryCard: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 14,
    padding: 14,
    gap: 0,
  },
  summaryCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  summaryLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: 0.77,
    color: '#9CA3AF',
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 34,
  },
  summaryKey: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  summaryValue: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },
  summaryValueDark: {
    color: '#D1D5DB',
  },
  feeValue: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#059669',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 10,
  },
  summaryDividerDark: {
    backgroundColor: '#334155',
  },
  totalKey: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  totalKeyDark: {
    color: '#F9FAFB',
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 17,
    lineHeight: 25.5,
    color: '#2563EB',
  },

  // Footer
  footer: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
});
