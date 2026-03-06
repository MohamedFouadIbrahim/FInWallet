import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Svg, { Circle, Path } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import type { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

type RouteProps = RouteProp<DashboardStackParamList, 'BillReview'>;

const SERVICE_FEE = 0.99;

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.66667} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const AlertCircleIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Circle cx={8} cy={8} r={6.5} stroke="#2563EB" strokeWidth={1.3} />
    <Path d="M8 5V8.5" stroke="#2563EB" strokeWidth={1.3} strokeLinecap="round" />
    <Circle cx={8} cy={10.5} r={0.75} fill="#2563EB" />
  </Svg>
);

// ── BillReviewScreen ───────────────────────────────────────────────────────────

export default function BillReviewScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const { provider, accountNumber, amount, customerName } = route.params;

  const billAmount = parseFloat(amount || '0');
  const totalDeducted = billAmount + SERVICE_FEE;

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
        <Text
          className="font-jakarta-bold text-[20px] text-[#111827] dark:text-neutral-50 leading-[30px]"
          allowFontScaling={false}
        >
          Review Payment
        </Text>
      </View>

      {/* ── Scrollable content ──────────────────────────────────────────── */}
      <ScrollView
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
              className="font-inter-regular text-[12px] leading-[18px] text-[#6B7280] dark:text-neutral-400"
              allowFontScaling={false}
              numberOfLines={1}
            >
              {provider.subtitle}
            </Text>
          </View>
        </View>

        {/* Details card */}
        <View style={styles.detailsCard}>
          {/* Account / Reference */}
          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel} allowFontScaling={false}>Account / Reference</Text>
            <Text style={styles.detailValue} allowFontScaling={false}>{accountNumber}</Text>
          </View>

          {/* Customer Name */}
          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel} allowFontScaling={false}>Customer Name</Text>
            <Text style={styles.detailValue} allowFontScaling={false}>{customerName}</Text>
          </View>

          {/* Bill Amount */}
          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel} allowFontScaling={false}>Bill Amount</Text>
            <Text style={styles.detailValue} allowFontScaling={false}>${billAmount.toFixed(2)}</Text>
          </View>

          {/* Service Fee */}
          <View style={[styles.detailRow, styles.detailRowBorder]}>
            <Text style={styles.detailLabel} allowFontScaling={false}>Service Fee</Text>
            <Text style={styles.detailValue} allowFontScaling={false}>${SERVICE_FEE.toFixed(2)}</Text>
          </View>

          {/* Total Deducted */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel} allowFontScaling={false}>Total Deducted</Text>
            <Text style={styles.totalValue} allowFontScaling={false}>${totalDeducted.toFixed(2)}</Text>
          </View>
        </View>

        {/* Info bar */}
        <View style={styles.infoBar}>
          <AlertCircleIcon />
          <Text style={styles.infoBarText} allowFontScaling={false}>
            Estimated processing: Instant
          </Text>
        </View>
      </ScrollView>

      {/* ── Bottom CTA ──────────────────────────────────────────────────── */}
      <View style={styles.bottomBar}>
        <Pressable
          style={styles.confirmButton}
          onPress={() =>
            navigation.navigate('BillProcessing', {
              provider,
              accountNumber,
              amount,
              customerName,
            })
          }
          accessibilityLabel="Confirm and Pay"
        >
          <Text style={styles.confirmText} allowFontScaling={false}>
            Confirm & Pay
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
    height: 78,
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

  // Details card
  detailsCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 21,
    paddingTop: 6,
    overflow: 'hidden',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  detailRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  detailValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#111827',
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 52,
  },
  totalLabel: {
    fontFamily: 'Inter-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#111827',
  },
  totalValue: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    lineHeight: 30,
    color: '#2563EB',
  },

  // Info bar
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    height: 42,
    paddingHorizontal: 16,
  },
  infoBarText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
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
  confirmButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  confirmText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#FFFFFF',
  },
});
