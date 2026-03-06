import React, { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path, G } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';

// ── Icons ─────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 15.8333L4.16667 10L10 4.16667"
      stroke="#374151"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8333 10H4.16667"
      stroke="#374151"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronDownIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke="#374151"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const ACCOUNT_FILTERS = [
  { id: 'all', label: 'All Accounts' },
  { id: 'main', label: 'Main Wallet' },
  { id: 'savings', label: 'Savings' },
  { id: 'credit', label: 'Credit Card' },
];

const CATEGORIES = [
  { label: 'Housing', transactions: 2, amount: '$1,200', pct: 40.7, color: '#EF4444', bgColor: '#FEF2F2' },
  { label: 'Food & Drink', transactions: 18, amount: '$380', pct: 12.9, color: '#F59E0B', bgColor: '#FFFBEB' },
  { label: 'Shopping', transactions: 7, amount: '$320', pct: 10.8, color: '#7C3AED', bgColor: '#F5F3FF' },
  { label: 'Transport', transactions: 22, amount: '$245', pct: 8.3, color: '#2563EB', bgColor: '#EFF6FF' },
  { label: 'Entertainment', transactions: 5, amount: '$185', pct: 6.3, color: '#059669', bgColor: '#F0FDF4' },
  { label: 'Utilities', transactions: 4, amount: '$290', pct: 9.8, color: '#EC4899', bgColor: '#FDF2F8' },
  { label: 'Health', transactions: 3, amount: '$165', pct: 5.6, color: '#06B6D4', bgColor: '#ECFEFF' },
  { label: 'Other', transactions: 6, amount: '$165', pct: 5.6, color: '#6B7280', bgColor: '#F3F4F6' },
];

const TOTAL_LABEL = '$2,950';

// ── Donut chart ───────────────────────────────────────────────────────────────

const DONUT_CX = 110;
const DONUT_CY = 110;
const DONUT_R = 80;
const STROKE_W = 32;
const CIRCUMFERENCE = 2 * Math.PI * DONUT_R;

function useDonutSegments() {
  return useMemo(() => {
    let cumulative = 0;
    return CATEGORIES.map(cat => {
      const fraction = cat.pct / 100;
      const segLen = CIRCUMFERENCE * fraction;
      const dashoffset = CIRCUMFERENCE * (0.25 - cumulative);
      cumulative += fraction;
      return { color: cat.color, segLen, dashoffset };
    });
  }, []);
}

// ── SpendingAnalyticsScreen ───────────────────────────────────────────────────

export default function CategoryBreakdownScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState('all');
  const segments = useDonutSegments();

  const bg = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#E5E7EB';
  const titleColor = isDark ? '#F9FAFB' : '#111827';
  const subColor = isDark ? '#6B7280' : '#6B7280';
  const dividerColor = isDark ? '#1F2937' : '#F3F4F6';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <BackIcon />
        </Pressable>
        <Text
          style={[styles.headerTitle, { color: titleColor }]}
          allowFontScaling={false}
        >
          Spending Analytics
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ backgroundColor: bg }}
      >
        {/* ── Month picker ───────────────────────────────────────────────── */}
        <Pressable
          style={[styles.monthPicker, { backgroundColor: cardBg, borderColor: cardBorder }]}
          accessibilityLabel="Select month"
        >
          <Text
            style={[styles.monthText, { color: isDark ? '#D1D5DB' : '#374151' }]}
            allowFontScaling={false}
          >
            Mar 2026
          </Text>
          <ChevronDownIcon />
        </Pressable>

        {/* ── Account filter chips ──────────────────────────────────────── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
        >
          {ACCOUNT_FILTERS.map(f => {
            const isActive = f.id === activeFilter;
            return (
              <Pressable
                key={f.id}
                style={[
                  styles.filterChip,
                  isActive
                    ? styles.filterChipActive
                    : [styles.filterChipInactive, { backgroundColor: cardBg, borderColor: cardBorder }],
                ]}
                onPress={() => setActiveFilter(f.id)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    { color: isActive ? '#FFFFFF' : (isDark ? '#9CA3AF' : '#6B7280') },
                  ]}
                  allowFontScaling={false}
                >
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* ── Total Spent ────────────────────────────────────────────────── */}
        <View style={styles.totalSection}>
          <Text
            style={[styles.totalLabel, { color: subColor }]}
            allowFontScaling={false}
          >
            Total Spent
          </Text>
          <Text
            style={[styles.totalAmount, { color: titleColor }]}
            allowFontScaling={false}
          >
            $2,950.00
          </Text>
        </View>

        {/* ── Donut chart ────────────────────────────────────────────────── */}
        <View style={styles.donutWrapper}>
          <Svg width={220} height={220} viewBox="0 0 220 220">
            {/* Track */}
            <Circle
              cx={DONUT_CX}
              cy={DONUT_CY}
              r={DONUT_R}
              stroke={isDark ? '#334155' : '#F3F4F6'}
              strokeWidth={STROKE_W}
              fill="none"
            />
            {/* Segments */}
            <G>
              {segments.map((seg, i) => (
                <Circle
                  key={i}
                  cx={DONUT_CX}
                  cy={DONUT_CY}
                  r={DONUT_R}
                  stroke={seg.color}
                  strokeWidth={STROKE_W}
                  fill="none"
                  strokeDasharray={[seg.segLen, CIRCUMFERENCE - seg.segLen]}
                  strokeDashoffset={seg.dashoffset}
                  strokeLinecap="butt"
                />
              ))}
            </G>
          </Svg>
          {/* Center label */}
          <View style={styles.donutCenter} pointerEvents="none">
            <Text
              style={[styles.donutCenterLabel, { color: isDark ? '#9CA3AF' : '#9CA3AF' }]}
              allowFontScaling={false}
            >
              Total
            </Text>
            <Text
              style={[styles.donutCenterAmount, { color: titleColor }]}
              allowFontScaling={false}
            >
              {TOTAL_LABEL}
            </Text>
          </View>
        </View>

        {/* ── Categories ─────────────────────────────────────────────────── */}
        <View style={styles.categoriesSection}>
          <Text
            style={[styles.categoriesSectionLabel, { color: subColor }]}
            allowFontScaling={false}
          >
            CATEGORIES
          </Text>

          <View
            style={[
              styles.categoriesCard,
              { backgroundColor: cardBg, borderColor: cardBorder },
            ]}
          >
            {CATEGORIES.map((cat, i) => (
              <View key={cat.label}>
                <View style={styles.categoryRow}>
                  {/* Icon */}
                  <View style={[styles.categoryIcon, { backgroundColor: cat.bgColor }]}>
                    <View style={[styles.categoryDot, { backgroundColor: cat.color }]} />
                  </View>

                  {/* Name + transactions */}
                  <View style={styles.categoryInfo}>
                    <Text
                      style={[styles.categoryName, { color: isDark ? '#D1D5DB' : '#374151' }]}
                      allowFontScaling={false}
                      numberOfLines={1}
                    >
                      {cat.label}
                    </Text>
                    <Text
                      style={[styles.categoryTxCount, { color: isDark ? '#6B7280' : '#9CA3AF' }]}
                      allowFontScaling={false}
                    >
                      {cat.transactions} transaction{cat.transactions !== 1 ? 's' : ''}
                    </Text>
                  </View>

                  {/* Amount + pct */}
                  <View style={styles.categoryValues}>
                    <Text
                      style={[styles.categoryAmount, { color: titleColor }]}
                      allowFontScaling={false}
                    >
                      {cat.amount}
                    </Text>
                    <Text
                      style={[styles.categoryPct, { color: cat.color }]}
                      allowFontScaling={false}
                    >
                      {cat.pct}%
                    </Text>
                  </View>
                </View>

                {i < CATEGORIES.length - 1 && (
                  <View style={[styles.rowDivider, { backgroundColor: dividerColor }]} />
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    height: 56,
    gap: 16,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 44,
    minHeight: 44,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
  },
  // Scroll
  scrollContent: {
    paddingBottom: 40,
  },
  // Month picker
  monthPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    alignSelf: 'flex-start',
    marginHorizontal: 24,
    marginBottom: 16,
    height: 37.5,
    paddingHorizontal: 17,
    borderRadius: 10,
    borderWidth: 1,
  },
  monthText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
  },
  // Filter chips
  filtersRow: {
    paddingLeft: 24,
    paddingRight: 8,
    gap: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChip: {
    height: 34,
    borderRadius: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  filterChipActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  filterChipInactive: {
    borderWidth: 1,
  },
  filterChipText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
  },
  // Total spent
  totalSection: {
    alignItems: 'center',
    gap: 4,
    marginTop: 20,
    paddingHorizontal: 24,
  },
  totalLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  totalAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 36,
    lineHeight: 54,
    letterSpacing: -0.5,
  },
  // Donut chart
  donutWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    position: 'relative',
  },
  donutCenter: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  donutCenterLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  donutCenterAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    lineHeight: 30,
  },
  // Categories
  categoriesSection: {
    paddingHorizontal: 24,
    marginTop: 28,
    gap: 12,
  },
  categoriesSectionLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  categoriesCard: {
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 1,
    paddingVertical: 1,
    overflow: 'hidden',
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 65.5,
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
  },
  categoryInfo: {
    flex: 1,
    gap: 0,
  },
  categoryName: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
  },
  categoryTxCount: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 11,
    lineHeight: 16.5,
  },
  categoryValues: {
    alignItems: 'flex-end',
    gap: 0,
    flexShrink: 0,
  },
  categoryAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'right',
  },
  categoryPct: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    textAlign: 'right',
  },
  rowDivider: {
    height: 1,
    marginLeft: 64,
  },
});
