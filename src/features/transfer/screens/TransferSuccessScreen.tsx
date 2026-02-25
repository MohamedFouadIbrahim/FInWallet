import React, { useCallback, useEffect, useRef } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import Svg, { Path, G, ClipPath, Defs, Rect } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import { useTheme } from '@theme/useTheme';
import { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

// ── Icons ─────────────────────────────────────────────────────────────────────

const CheckIcon = () => (
  <Svg width={48} height={48} viewBox="0 0 48 48" fill="none">
    <G>
      <Path
        d="M24 44C35.0457 44 44 35.0457 44 24C44 12.9543 35.0457 4 24 4C12.9543 4 4 12.9543 4 24C4 35.0457 12.9543 44 24 44Z"
        stroke="#059669"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 24L22 28L30 20"
        stroke="#059669"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const CopyIcon = () => (
  <Svg width={13} height={13} viewBox="0 0 13 13" fill="none">
    <G clipPath="url(#copyClip)">
      <Path
        d="M10.8333 4.33333H5.41667C4.81836 4.33333 4.33333 4.81836 4.33333 5.41667V10.8333C4.33333 11.4316 4.81836 11.9167 5.41667 11.9167H10.8333C11.4316 11.9167 11.9167 11.4316 11.9167 10.8333V5.41667C11.9167 4.81836 11.4316 4.33333 10.8333 4.33333Z"
        stroke="#2563EB"
        strokeWidth={1.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.16667 8.66667C1.57083 8.66667 1.08333 8.17917 1.08333 7.58333V2.16667C1.08333 1.57083 1.57083 1.08333 2.16667 1.08333H7.58333C8.17917 1.08333 8.66667 1.57083 8.66667 2.16667"
        stroke="#2563EB"
        strokeWidth={1.08333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
    <Defs>
      <ClipPath id="copyClip">
        <Rect width={13} height={13} fill="white" />
      </ClipPath>
    </Defs>
  </Svg>
);

const ShareIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G>
      <Path
        d="M12 5.33333C13.1046 5.33333 14 4.4379 14 3.33333C14 2.22876 13.1046 1.33333 12 1.33333C10.8954 1.33333 10 2.22876 10 3.33333C10 4.4379 10.8954 5.33333 12 5.33333Z"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 10C5.10457 10 6 9.10457 6 8C6 6.89543 5.10457 6 4 6C2.89543 6 2 6.89543 2 8C2 9.10457 2.89543 10 4 10Z"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12 14.6667C13.1046 14.6667 14 13.7712 14 12.6667C14 11.5621 13.1046 10.6667 12 10.6667C10.8954 10.6667 10 11.5621 10 12.6667C10 13.7712 10.8954 14.6667 12 14.6667Z"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.72667 9.00667L10.28 11.66"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10.2733 4.34L5.72667 6.99333"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const DownloadIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <G>
      <Path
        d="M14 10V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V10"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4.66667 6.66667L8 10L11.3333 6.66667"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M8 10V2"
        stroke="#374151"
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

const generateTxnId = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const seg = (n: number) =>
    Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `TXN-${seg(4)}-${seg(4)}-${seg(4)}`;
};

const formatDateTime = (date: Date) =>
  date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }) +
  ', ' +
  date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

// ── Types ─────────────────────────────────────────────────────────────────────

type SuccessRoute = RouteProp<DashboardStackParamList, 'TransferSuccess'>;

// ── ReceiptRow ────────────────────────────────────────────────────────────────

interface RowProps {
  label: string;
  value: string;
  isLast?: boolean;
  valueStyle?: object;
  isDark: boolean;
}

const ReceiptRow = ({ label, value, isLast, valueStyle, isDark }: RowProps) => (
  <View>
    <View style={styles.receiptRow}>
      <Text style={styles.receiptKey} allowFontScaling={false}>
        {label}
      </Text>
      <Text
        style={[styles.receiptValue, isDark && styles.receiptValueDark, valueStyle]}
        allowFontScaling={false}
      >
        {value}
      </Text>
    </View>
    {!isLast && <View style={[styles.rowDivider, isDark && styles.rowDividerDark]} />}
  </View>
);

// ── TransferSuccessScreen ─────────────────────────────────────────────────────

export default function TransferSuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<SuccessRoute>();
  const { isDark } = useTheme();

  const { amount, recipientName } = route.params;

  const txnId = useRef(generateTxnId()).current;
  const txnDate = useRef(new Date()).current;

  const transferFee = 0;
  const totalDeducted = amount + transferFee;
  const formattedAmount = `$${amount.toFixed(2)}`;
  const formattedTotal = `$${totalDeducted.toFixed(2)}`;

  // Entrance animations
  const iconScale = useSharedValue(0);
  const cardOpacity = useSharedValue(0);
  const cardTranslate = useSharedValue(24);

  useEffect(() => {
    iconScale.value = withTiming(1, { duration: 500, easing: Easing.out(Easing.back(1.6)) });
    cardOpacity.value = withDelay(200, withTiming(1, { duration: 400 }));
    cardTranslate.value = withDelay(200, withTiming(0, { duration: 400, easing: Easing.out(Easing.quad) }));
  }, [iconScale, cardOpacity, cardTranslate]);

  const iconStyle = useAnimatedStyle(() => ({
    transform: [{ scale: iconScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslate.value }],
  }));

  const handleDone = useCallback(() => {
    navigation.popToTop();
  }, [navigation]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <View style={[styles.bg, isDark && styles.bgDark]}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Hero ──────────────────────────────────────────────────── */}
          <View style={styles.hero}>
            <Animated.View style={[styles.checkContainer, iconStyle]}>
              <CheckIcon />
            </Animated.View>
            <Text
              style={[styles.heroTitle, isDark && styles.heroTitleDark]}
              allowFontScaling={false}
            >
              Transfer Successful!
            </Text>
            <Text style={styles.heroSubtitle} allowFontScaling={false}>
              {formattedAmount} sent to {recipientName}
            </Text>
          </View>

          {/* ── Receipt card ──────────────────────────────────────────── */}
          <Animated.View style={[styles.card, isDark && styles.cardDark, cardStyle]}>
            {/* Green header */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardHeaderLabel} allowFontScaling={false}>
                TRANSACTION RECEIPT
              </Text>
              <View style={styles.completedBadge}>
                <Text style={styles.completedText} allowFontScaling={false}>
                  Completed
                </Text>
              </View>
            </View>

            {/* Body */}
            <View style={styles.cardBody}>
              {/* Transaction ID */}
              <View style={[styles.txnIdRow, isDark && styles.txnIdRowDark]}>
                <View style={styles.txnIdLeft}>
                  <Text style={styles.txnIdLabel} allowFontScaling={false}>
                    Transaction ID
                  </Text>
                  <Text
                    style={[styles.txnIdValue, isDark && styles.txnIdValueDark]}
                    allowFontScaling={false}
                  >
                    {txnId}
                  </Text>
                </View>
                <Pressable
                  style={styles.copyBtn}
                  accessibilityLabel="Copy transaction ID"
                  onPress={() => {}}
                >
                  <CopyIcon />
                </Pressable>
              </View>

              {/* Data rows */}
              <View style={styles.rows}>
                <ReceiptRow
                  label="Date & Time"
                  value={formatDateTime(txnDate)}
                  isDark={isDark}
                />
                <ReceiptRow
                  label="Recipient"
                  value={recipientName}
                  isDark={isDark}
                />
                <ReceiptRow
                  label="Amount Sent"
                  value={formattedAmount}
                  isDark={isDark}
                />
                <ReceiptRow
                  label="Transfer Fee"
                  value="Free"
                  valueStyle={styles.freeText}
                  isDark={isDark}
                />
                <ReceiptRow
                  label="Total Deducted"
                  value={formattedTotal}
                  valueStyle={styles.totalText}
                  isDark={isDark}
                />
                <ReceiptRow
                  label="Delivery"
                  value="Instant"
                  isLast
                  isDark={isDark}
                />
              </View>
            </View>
          </Animated.View>

          {/* ── Action buttons ────────────────────────────────────────── */}
          <View style={styles.actionRow}>
            <Pressable
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              accessibilityLabel="Share receipt"
              onPress={() => {}}
            >
              <ShareIcon />
              <Text
                style={[styles.actionBtnText, isDark && styles.actionBtnTextDark]}
                allowFontScaling={false}
              >
                Share
              </Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, isDark && styles.actionBtnDark]}
              accessibilityLabel="Download receipt"
              onPress={() => {}}
            >
              <DownloadIcon />
              <Text
                style={[styles.actionBtnText, isDark && styles.actionBtnTextDark]}
                allowFontScaling={false}
              >
                Download
              </Text>
            </Pressable>
          </View>

          {/* ── Done ──────────────────────────────────────────────────── */}
          <AppButton
            label="Back to Home"
            onPress={handleDone}
          />

          <View className="h-[24px]" />
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    // backgroundColor: '#F9FAFB',
  },
  bgDark: {
    // backgroundColor: '#0F172A',
  },
  scrollContent: {
    paddingTop: 28,
    paddingHorizontal: 24,
    paddingBottom: 8,
    gap: 0,
  },

  // Hero
  hero: {
    alignItems: 'center',
    marginBottom: 28,
    gap: 0,
  },
  checkContainer: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#D1FAE5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 24,
    lineHeight: 36,
    color: '#111827',
    textAlign: 'center',
    marginBottom: 6,
  },
  heroTitleDark: {
    color: '#F9FAFB',
  },
  heroSubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Receipt card
  card: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 18,
    overflow: 'hidden',
    marginBottom: 14,
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#059669',
    paddingHorizontal: 18,
    height: 50,
  },
  cardHeaderLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.8)',
    letterSpacing: 0.84,
    textTransform: 'uppercase',
  },
  completedBadge: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    paddingHorizontal: 8,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#FFFFFF',
  },
  cardBody: {
    paddingBottom: 4,
  },

  // Transaction ID row
  txnIdRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F9FAFB',
    borderRadius: 10,
    marginHorizontal: 18,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 58,
  },
  txnIdRowDark: {
    backgroundColor: '#0F172A',
  },
  txnIdLeft: {
    gap: 2,
  },
  txnIdLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
  },
  txnIdValue: {
    fontFamily: 'Inter24pt-Bold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#111827',
    letterSpacing: 0.39,
  },
  txnIdValueDark: {
    color: '#F9FAFB',
  },
  copyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Data rows
  rows: {
    paddingHorizontal: 18,
    marginTop: 4,
  },
  receiptRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  receiptKey: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#9CA3AF',
  },
  receiptValue: {
    fontFamily: 'PlusJakartaSans-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },
  receiptValueDark: {
    color: '#D1D5DB',
  },
  rowDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
  },
  rowDividerDark: {
    backgroundColor: '#334155',
  },
  freeText: {
    color: '#059669',
  },
  totalText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#2563EB',
  },

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  actionBtn: {
    flex: 1,
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  actionBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  actionBtnText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },
  actionBtnTextDark: {
    color: '#D1D5DB',
  },
});
