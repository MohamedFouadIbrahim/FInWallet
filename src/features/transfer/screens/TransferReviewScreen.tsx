import React, { useCallback } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import { useTheme } from '@theme/useTheme';
import { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const WalletIcon = () => (
  <Svg width={17} height={17} viewBox="0 0 17 17" fill="none">
    <G>
      <Path
        d="M13.4583 4.95833V2.83333C13.4583 2.64547 13.3837 2.4653 13.2509 2.33247C13.118 2.19963 12.9379 2.125 12.75 2.125H3.54167C3.16594 2.125 2.80561 2.27426 2.53993 2.53993C2.27426 2.80561 2.125 3.16594 2.125 3.54167C2.125 3.91739 2.27426 4.27772 2.53993 4.5434C2.80561 4.80908 3.16594 4.95833 3.54167 4.95833H14.1667C14.3545 4.95833 14.5347 5.03296 14.6675 5.1658C14.8004 5.29864 14.875 5.47881 14.875 5.66667V8.5M14.875 8.5H12.75C12.3743 8.5 12.0139 8.64926 11.7483 8.91493C11.4826 9.18061 11.3333 9.54094 11.3333 9.91667C11.3333 10.2924 11.4826 10.6527 11.7483 10.9184C12.0139 11.1841 12.3743 11.3333 12.75 11.3333H14.875C15.0629 11.3333 15.243 11.2587 15.3759 11.1259C15.5087 10.993 15.5833 10.8129 15.5833 10.625V9.20833C15.5833 9.02047 15.5087 8.8403 15.3759 8.70747C15.243 8.57463 15.0629 8.5 14.875 8.5Z"
        stroke="#2563EB"
        strokeWidth={1.41667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.125 3.54167V13.4583C2.125 13.8341 2.27426 14.1944 2.53993 14.4601C2.80561 14.7257 3.16594 14.875 3.54167 14.875H14.1667C14.3545 14.875 14.5347 14.8004 14.6675 14.6675C14.8004 14.5347 14.875 14.3545 14.875 14.1667V11.3333"
        stroke="#2563EB"
        strokeWidth={1.41667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const ClockIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G clipPath="url(#clip0)">
      <Path
        d="M8 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8 1.33333C4.3181 1.33333 1.33333 4.3181 1.33333 8C1.33333 11.6819 4.3181 14.6667 8 14.6667Z"
        stroke="#D97706"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 4V8L10.6667 9.33333"
        stroke="#D97706"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="clip0">
        <Rect width={16} height={16} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const ShieldIcon = () => (
  <Svg width={13} height={13} viewBox="0 0 13 13" fill="none">
    <Path
      d="M10.8333 7.04167C10.8333 9.75 8.9375 11.1042 6.68417 11.8896C6.56617 11.9296 6.438 11.9277 6.32125 11.8842C4.0625 11.1042 2.16667 9.75 2.16667 7.04167V3.25C2.16667 3.10634 2.22373 2.96857 2.32532 2.86698C2.4269 2.7654 2.56467 2.70833 2.70833 2.70833C3.79167 2.70833 5.14583 2.05833 6.08833 1.235C6.20309 1.13696 6.34907 1.08309 6.5 1.08309C6.65093 1.08309 6.79691 1.13696 6.91167 1.235C7.85958 2.06375 9.20833 2.70833 10.2917 2.70833C10.4353 2.70833 10.5731 2.7654 10.6747 2.86698C10.7763 2.96857 10.8333 3.10634 10.8333 3.25V7.04167Z"
      stroke="#9CA3AF"
      strokeWidth={1.08333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type ReviewRoute = RouteProp<DashboardStackParamList, 'TransferReview'>;

// ── TransferReviewScreen ──────────────────────────────────────────────────────

export default function TransferReviewScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<ReviewRoute>();
  const { isDark } = useTheme();

  const { amount, recipientName, recipientUsername } = route.params;

  const formattedAmount = `$${amount.toFixed(2)}`;
  const initials = recipientName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  const handleConfirm = useCallback(() => {
    navigation.navigate('PinConfirm', {
      amount,
      recipientName,
      recipientUsername,
    });
  }, [navigation, amount, recipientName, recipientUsername]);

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
          Review Transfer
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Recipient + Amount card ───────────────────────────────── */}
        <View className="px-xl">
          <View style={[styles.card, isDark && styles.cardDark]}>
            {/* Recipient row */}
            <View style={styles.recipientRow}>
              {/* Avatar */}
              <View style={styles.avatar}>
                <Text style={styles.avatarText} allowFontScaling={false}>
                  {initials}
                </Text>
              </View>

              {/* Name & username */}
              <View className="flex-1 gap-[3px]">
                <Text
                  style={[styles.recipientName, isDark && styles.recipientNameDark]}
                  allowFontScaling={false}
                >
                  {recipientName}
                </Text>
                <Text style={styles.recipientUsername} allowFontScaling={false}>
                  {recipientUsername}
                </Text>
              </View>

              {/* Wallet button */}
              <View style={styles.walletBtn}>
                <WalletIcon />
              </View>
            </View>

            {/* Divider */}
            <View style={[styles.cardDivider, isDark && styles.cardDividerDark]} />

            {/* Amount row */}
            <View style={styles.amountRow}>
              <Text style={styles.amountLabel} allowFontScaling={false}>
                Amount Sending
              </Text>
              <Text
                style={[styles.amountValue, isDark && styles.amountValueDark]}
                allowFontScaling={false}
              >
                {formattedAmount}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Fee breakdown card ────────────────────────────────────── */}
        <View className="px-xl mt-[14px]">
          <View style={[styles.card, isDark && styles.cardDark, styles.feeCard]}>
            {/* You Send row */}
            <View style={styles.feeRow}>
              <Text style={styles.feeKey} allowFontScaling={false}>
                You Send
              </Text>
              <Text
                style={[styles.feeValue, isDark && styles.feeValueDark]}
                allowFontScaling={false}
              >
                {formattedAmount}
              </Text>
            </View>
            <View style={[styles.feeDivider, isDark && styles.feeDividerDark]} />

            {/* Transfer Fee row */}
            <View style={styles.feeRow}>
              <Text style={styles.feeKey} allowFontScaling={false}>
                Transfer Fee
              </Text>
              <Text style={styles.freeValue} allowFontScaling={false}>
                Free
              </Text>
            </View>
            <View style={[styles.feeDivider, isDark && styles.feeDividerDark]} />

            {/* Total row */}
            <View style={styles.totalRow}>
              <Text
                style={[styles.totalKey, isDark && styles.totalKeyDark]}
                allowFontScaling={false}
              >
                Total Deducted
              </Text>
              <Text style={styles.totalValue} allowFontScaling={false}>
                {formattedAmount}
              </Text>
            </View>
          </View>
        </View>

        {/* ── Delivery info banner ──────────────────────────────────── */}
        <View className="px-xl mt-[14px]">
          <View style={styles.deliveryBanner}>
            <ClockIcon />
            <View className="flex-1 gap-[2px]">
              <Text style={styles.deliveryTitle} allowFontScaling={false}>
                Estimated delivery: Instant
              </Text>
              <Text style={styles.deliverySubtitle} allowFontScaling={false}>
                Transfers processed on business days
              </Text>
            </View>
          </View>
        </View>

        {/* ── Legal disclaimer ──────────────────────────────────────── */}
        <View className="px-xl mt-[14px]">
          <View style={styles.disclaimer}>
            <ShieldIcon />
            <Text style={styles.disclaimerText} allowFontScaling={false}>
              By confirming, you authorize FinWallet to process this transfer. Transfers are
              protected by 256-bit encryption. Please verify all recipient details before
              proceeding.
            </Text>
          </View>
        </View>

        <View className="h-[24px]" />
      </ScrollView>

      {/* ── Footer ───────────────────────────────────────────────────── */}
      <View className="px-xl pt-[17px] pb-[10px]" style={styles.footer}>
        <AppButton
          label={`Confirm & Send  →`}
          onPress={handleConfirm}
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

  // Cards
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    paddingHorizontal: 21,
    paddingTop: 21,
    paddingBottom: 21,
    gap: 0,
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  feeCard: {
    paddingHorizontal: 19,
    paddingTop: 19,
    paddingBottom: 19,
  },

  // Recipient row
  recipientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingBottom: 16,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(37,99,235,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 17,
    lineHeight: 25.5,
    color: '#2563EB',
  },
  recipientName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 17,
    lineHeight: 25.5,
    color: '#111827',
  },
  recipientNameDark: {
    color: '#F9FAFB',
  },
  recipientUsername: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
  },
  walletBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(37,99,235,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },

  // Card divider
  cardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginBottom: 16,
  },
  cardDividerDark: {
    backgroundColor: '#334155',
  },

  // Amount row
  amountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 39,
  },
  amountLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
  },
  amountValue: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 26,
    lineHeight: 39,
    color: '#111827',
    letterSpacing: -0.5,
  },
  amountValueDark: {
    color: '#F9FAFB',
  },

  // Fee rows
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 41,
  },
  feeDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  feeDividerDark: {
    backgroundColor: '#334155',
  },
  feeKey: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  feeValue: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  feeValueDark: {
    color: '#D1D5DB',
  },
  freeValue: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#059669',
  },

  // Total row
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  totalKey: {
    fontFamily: 'Inter24pt-Bold',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
  },
  totalKeyDark: {
    color: '#9CA3AF',
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#2563EB',
  },

  // Delivery banner
  deliveryBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    paddingLeft: 15,
    paddingVertical: 10,
    paddingRight: 12,
  },
  deliveryTitle: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#92400E',
  },
  deliverySubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#B45309',
  },

  // Disclaimer
  disclaimer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  disclaimerText: {
    flex: 1,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 17.6,
    color: '#9CA3AF',
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
