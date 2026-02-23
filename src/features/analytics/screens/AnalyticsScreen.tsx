import React, { useCallback } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';

// ── Icons ─────────────────────────────────────────────────────────────────────

const IncomeIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <G>
      <Path
        d="M12.8333 4.08333L7.875 9.04167L4.95833 6.125L1.16667 9.91667"
        stroke="#059669"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.33333 4.08333H12.8333V7.58333"
        stroke="#059669"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const ExpensesIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <G>
      <Path
        d="M12.8333 9.91667L7.875 4.95833L4.95833 7.875L1.16667 4.08333"
        stroke="#EF4444"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.33333 9.91667H12.8333V6.41667"
        stroke="#EF4444"
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const ChevronRightIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 18L15 12L9 6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Bar chart data ────────────────────────────────────────────────────────────

const BAR_DATA = [
  { month: 'Oct', income: 0.38, expenses: 0.22 },
  { month: 'Nov', income: 0.48, expenses: 0.32 },
  { month: 'Dec', income: 0.42, expenses: 0.38 },
  { month: 'Jan', income: 0.58, expenses: 0.38 },
  { month: 'Feb', income: 0.85, expenses: 0.52, highlight: true },
];

const BAR_MAX_HEIGHT = 100;

// ── Category data ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    label: 'Housing',
    amount: '$1,200',
    percent: 40,
    color: '#EF4444',
    bgColor: '#FEF2F2',
  },
  {
    label: 'Food & Drink',
    amount: '$380',
    percent: 13,
    color: '#F59E0B',
    bgColor: '#FFFBEB',
  },
  {
    label: 'Shopping',
    amount: '$320',
    percent: 11,
    color: '#7C3AED',
    bgColor: '#F5F3FF',
  },
  {
    label: 'Transport',
    amount: '$210',
    percent: 7,
    color: '#2563EB',
    bgColor: '#EFF6FF',
  },
  {
    label: 'Entertainment',
    amount: '$150',
    percent: 5,
    color: '#059669',
    bgColor: '#F0FDF4',
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

interface SummaryCardProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  amount: string;
  amountColor: string;
  isDark: boolean;
}

const SummaryCard = ({
  icon,
  iconBg,
  label,
  amount,
  amountColor,
  isDark,
}: SummaryCardProps) => (
  <View
    style={[
      styles.summaryCard,
      {
        backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
        borderColor: isDark ? '#334155' : '#E5E7EB',
        shadowColor: isDark ? '#000' : '#94A3B8',
        shadowOpacity: isDark ? 0.3 : 0.08,
      },
    ]}
  >
    <View style={styles.summaryCardTop}>
      <View style={[styles.iconWrap, { backgroundColor: iconBg }]}>{icon}</View>
      <Text
        style={[styles.summaryLabel, { color: isDark ? '#9CA3AF' : '#6B7280' }]}
        allowFontScaling={false}
      >
        {label}
      </Text>
    </View>
    <Text
      style={[styles.summaryAmount, { color: amountColor }]}
      allowFontScaling={false}
    >
      {amount}
    </Text>
    <Text
      style={[styles.summarySubtitle, { color: isDark ? '#6B7280' : '#9CA3AF' }]}
      allowFontScaling={false}
    >
      This month
    </Text>
  </View>
);

interface CategoryRowProps {
  item: (typeof CATEGORIES)[0];
  isLast: boolean;
  isDark: boolean;
}

const CategoryRow = ({ item, isLast, isDark }: CategoryRowProps) => (
  <>
    <View style={styles.categoryRow}>
      <View style={[styles.categoryIconWrap, { backgroundColor: item.bgColor }]}>
        <View
          style={[styles.categoryDot, { backgroundColor: item.color }]}
        />
      </View>
      <View style={styles.categoryContent}>
        <View style={styles.categoryTopRow}>
          <Text
            style={[
              styles.categoryName,
              { color: isDark ? '#D1D5DB' : '#374151' },
            ]}
            allowFontScaling={false}
          >
            {item.label}
          </Text>
          <Text
            style={[
              styles.categoryAmount,
              { color: isDark ? '#F9FAFB' : '#111827' },
            ]}
            allowFontScaling={false}
          >
            {item.amount}
          </Text>
        </View>
        <View
          style={[
            styles.progressTrack,
            { backgroundColor: isDark ? '#374151' : '#F3F4F6' },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              { width: `${item.percent}%`, backgroundColor: item.color },
            ]}
          />
        </View>
      </View>
      <Text
        style={[styles.categoryPercent, { color: isDark ? '#6B7280' : '#9CA3AF' }]}
        allowFontScaling={false}
      >
        {item.percent}%
      </Text>
    </View>
    {!isLast && (
      <View
        style={[
          styles.rowDivider,
          { backgroundColor: isDark ? '#1F2937' : '#F9FAFB' },
        ]}
      />
    )}
  </>
);

// ── Main screen ───────────────────────────────────────────────────────────────

const AnalyticsScreen = () => {
  const { isDark } = useTheme();

  const handleSeeAll = useCallback(() => {
    // navigation to full category breakdown
  }, []);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <ScrollView
        style={{ flex: 1, backgroundColor: isDark ? '#0F172A' : '#F8FAFC' }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ───────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          <Text
            style={[styles.headerSub, { color: isDark ? '#9CA3AF' : '#6B7280' }]}
            allowFontScaling={false}
          >
            Financial Overview
          </Text>
          <Text
            style={[styles.headerTitle, { color: isDark ? '#F9FAFB' : '#111827' }]}
            allowFontScaling={false}
          >
            Analytics
          </Text>
        </View>

        {/* ── Summary cards ─────────────────────────────────────────────────── */}
        <View style={styles.summaryRow}>
          <SummaryCard
            icon={<IncomeIcon />}
            iconBg="#F0FDF4"
            label="Income"
            amount="$4,500"
            amountColor="#059669"
            isDark={isDark}
          />
          <SummaryCard
            icon={<ExpensesIcon />}
            iconBg="#FEF2F2"
            label="Expenses"
            amount="$2,950"
            amountColor="#EF4444"
            isDark={isDark}
          />
        </View>

        {/* ── Bar chart ─────────────────────────────────────────────────────── */}
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
              borderColor: isDark ? '#334155' : '#E5E7EB',
              shadowColor: isDark ? '#000' : '#94A3B8',
              shadowOpacity: isDark ? 0.3 : 0.08,
            },
          ]}
        >
          {/* Chart header */}
          <View style={styles.chartHeader}>
            <Text
              style={[
                styles.cardTitle,
                { color: isDark ? '#F9FAFB' : '#111827' },
              ]}
              allowFontScaling={false}
            >
              Income vs Expenses
            </Text>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#059669' }]} />
                <Text
                  style={[
                    styles.legendLabel,
                    { color: isDark ? '#9CA3AF' : '#6B7280' },
                  ]}
                  allowFontScaling={false}
                >
                  Income
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#EF4444' }]} />
                <Text
                  style={[
                    styles.legendLabel,
                    { color: isDark ? '#9CA3AF' : '#6B7280' },
                  ]}
                  allowFontScaling={false}
                >
                  Expenses
                </Text>
              </View>
            </View>
          </View>

          {/* Bars */}
          <View style={styles.chartArea}>
            {BAR_DATA.map(bar => (
              <View key={bar.month} style={styles.barGroup}>
                {/* bars grow upward inside this flex-end column */}
                <View style={styles.barsContainer}>
                  <View
                    style={[
                      styles.bar,
                      {
                        height: BAR_MAX_HEIGHT * bar.income,
                        backgroundColor: bar.highlight ? '#059669' : '#DCFCE7',
                      },
                    ]}
                  />
                  <View
                    style={[
                      styles.bar,
                      {
                        height: BAR_MAX_HEIGHT * bar.expenses,
                        backgroundColor: bar.highlight ? '#EF4444' : '#FEE2E2',
                      },
                    ]}
                  />
                </View>
                <Text
                  style={[
                    styles.barLabel,
                    { color: isDark ? '#6B7280' : '#9CA3AF' },
                  ]}
                  allowFontScaling={false}
                >
                  {bar.month}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* ── Top Categories ────────────────────────────────────────────────── */}
        <View style={styles.categoriesSection}>
          <View style={styles.categoriesHeader}>
            <Text
              style={[
                styles.sectionTitle,
                { color: isDark ? '#F9FAFB' : '#111827' },
              ]}
              allowFontScaling={false}
            >
              Top Categories
            </Text>
            <Pressable
              style={styles.seeAllBtn}
              onPress={handleSeeAll}
              accessibilityLabel="See all categories"
              hitSlop={8}
            >
              <Text style={styles.seeAllText} allowFontScaling={false}>
                See All
              </Text>
              <ChevronRightIcon />
            </Pressable>
          </View>

          <View
            style={[
              styles.categoriesCard,
              {
                backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                borderColor: isDark ? '#334155' : '#E5E7EB',
                shadowColor: isDark ? '#000' : '#94A3B8',
                shadowOpacity: isDark ? 0.3 : 0.08,
              },
            ]}
          >
            {CATEGORIES.map((item, index) => (
              <CategoryRow
                key={item.label}
                item={item}
                isLast={index === CATEGORIES.length - 1}
                isDark={isDark}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default AnalyticsScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },
  // Header
  header: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 4,
    gap: 2,
  },
  headerSub: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
  },
  // Summary cards
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 24,
    marginTop: 20,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 15,
    gap: 8,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  summaryCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconWrap: {
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 11,
    lineHeight: 16.5,
  },
  summaryAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    lineHeight: 30,
  },
  summarySubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  // Card
  card: {
    marginHorizontal: 24,
    marginTop: 20,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 17,
    paddingTop: 17,
    paddingBottom: 16,
    gap: 12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  // Chart
  chartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  legend: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  legendLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 10,
    lineHeight: 15,
  },
  chartArea: {
    flexDirection: 'row',
    // each barGroup fills the height; bars grow upward, label sits below
    height: BAR_MAX_HEIGHT + 22, // 100 bars + 6 gap + 14 label + 2 padding
    alignItems: 'stretch',
  },
  barGroup: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end', // push bars+label to bottom
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end', // bars grow upward from a shared baseline
    gap: 3,
  },
  bar: {
    width: 14,
    borderRadius: 3,
  },
  barLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 10,
    lineHeight: 14,
    marginTop: 6,
  },
  // Categories
  categoriesSection: {
    marginTop: 24,
    paddingHorizontal: 24,
    gap: 14,
  },
  categoriesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minHeight: 44,
  },
  seeAllText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#2563EB',
  },
  categoriesCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 62,
  },
  categoryIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  categoryContent: {
    flex: 1,
    gap: 5,
    justifyContent: 'center',
  },
  categoryTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  categoryName: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
  },
  categoryAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 13,
    lineHeight: 19.5,
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: 4,
    borderRadius: 2,
  },
  categoryPercent: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    width: 32,
    textAlign: 'right',
    flexShrink: 0,
  },
  rowDivider: {
    height: 1,
    marginLeft: 64,
  },
});
