import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation, useRoute, type RouteProp } from '@react-navigation/native';
import Svg, { Circle, Line, Path, Polyline, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import type { DashboardStackParamList } from '@features/dashboard/navigation/DashboardNavigator';

type RouteProps = RouteProp<DashboardStackParamList, 'BillSuccess'>;

const SERVICE_FEE = 0.99;

// ── Icons ──────────────────────────────────────────────────────────────────────

const CheckCircleIcon = () => (
  <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
    <Circle cx={22} cy={22} r={20} stroke="#10B981" strokeWidth={2.5} />
    <Polyline
      points="13,22 19,28 31,16"
      stroke="#10B981"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CopyIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Rect x={4.5} y={0.5} width={8} height={9} rx={1} stroke="#6B7280" strokeWidth={1.2} fill="white" />
    <Rect x={0.5} y={3.5} width={8} height={9} rx={1} stroke="#6B7280" strokeWidth={1.2} fill="white" />
  </Svg>
);

const Share2Icon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Circle cx={18} cy={5} r={3} stroke="#374151" strokeWidth={1.8} />
    <Circle cx={6} cy={12} r={3} stroke="#374151" strokeWidth={1.8} />
    <Circle cx={18} cy={19} r={3} stroke="#374151" strokeWidth={1.8} />
    <Line x1={8.59} y1={13.51} x2={15.42} y2={17.49} stroke="#374151" strokeWidth={1.8} />
    <Line x1={15.41} y1={6.51} x2={8.59} y2={10.49} stroke="#374151" strokeWidth={1.8} />
  </Svg>
);

const DownloadIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"
      stroke="#374151"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Polyline
      points="7,10 12,15 17,10"
      stroke="#374151"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Line x1={12} y1={15} x2={12} y2={3} stroke="#374151" strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function generateTxId() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return 'TXN' + Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function formatDate(date: Date) {
  return (
    date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) +
    ', ' +
    date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  );
}

// ── BillSuccessScreen ─────────────────────────────────────────────────────────

export default function BillSuccessScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProps>();
  const { provider, accountNumber, amount, customerName } = route.params;

  const billAmount = parseFloat(amount || '0');
  const totalDeducted = billAmount + SERVICE_FEE;

  const transactionId = useMemo(() => generateTxId(), []);
  const dateString = useMemo(() => formatDate(new Date()), []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Success icon + heading ─────────────────────────────────── */}
        <View style={styles.topSection}>
          <View style={styles.iconContainer}>
            <CheckCircleIcon />
          </View>
          <Text style={styles.title} allowFontScaling={false}>
            Payment Successful
          </Text>
          <Text style={styles.subtitle} allowFontScaling={false}>
            Your bill has been paid successfully
          </Text>
        </View>

        {/* ── Receipt card ──────────────────────────────────────────── */}
        <View style={styles.receiptCard}>
          {/* Transaction ID */}
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Transaction ID</Text>
            <View style={styles.rowValueGroup}>
              <Text style={styles.rowValue} allowFontScaling={false}>{transactionId}</Text>
              <Pressable accessibilityLabel="Copy transaction ID" hitSlop={8}>
                <CopyIcon />
              </Pressable>
            </View>
          </View>

          {/* Date & Time */}
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Date & Time</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>{dateString}</Text>
          </View>

          {/* Provider */}
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Provider</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>{provider.name}</Text>
          </View>

          {/* Account */}
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Account</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>{accountNumber}</Text>
          </View>

          {/* Amount Paid */}
          <View style={[styles.row, styles.rowBorder]}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Amount Paid</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>${billAmount.toFixed(2)}</Text>
          </View>

          {/* Fees */}
          <View style={styles.row}>
            <Text style={styles.rowLabel} allowFontScaling={false}>Fees</Text>
            <Text style={styles.rowValue} allowFontScaling={false}>${SERVICE_FEE.toFixed(2)}</Text>
          </View>

          {/* Total Deducted */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel} allowFontScaling={false}>Total Deducted</Text>
            <Text style={styles.totalValue} allowFontScaling={false}>${totalDeducted.toFixed(2)}</Text>
          </View>
        </View>

        {/* ── Action buttons ────────────────────────────────────────── */}
        <View style={styles.actionRow}>
          <Pressable style={styles.actionButton} accessibilityLabel="Share receipt">
            <Share2Icon />
            <Text style={styles.actionText} allowFontScaling={false}>Share</Text>
          </Pressable>
          <Pressable style={styles.actionButton} accessibilityLabel="Download receipt">
            <DownloadIcon />
            <Text style={styles.actionText} allowFontScaling={false}>Download</Text>
          </Pressable>
        </View>

        {/* ── Back to Dashboard ─────────────────────────────────────── */}
        <Pressable
          style={styles.dashboardButton}
          onPress={() => navigation.navigate('HomeMain')}
          accessibilityLabel="Back to Dashboard"
        >
          <Text style={styles.dashboardText} allowFontScaling={false}>
            Back to Dashboard
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    gap: 16,
  },

  // Top section
  topSection: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 22,
    lineHeight: 33,
    color: '#111827',
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Receipt card
  receiptCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 21,
    paddingTop: 6,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 44,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  rowLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
  },
  rowValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#111827',
  },
  rowValueGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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

  // Action buttons
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
  },
  actionText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },

  // Back to Dashboard
  dashboardButton: {
    height: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
  },
  dashboardText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#FFFFFF',
  },
});
