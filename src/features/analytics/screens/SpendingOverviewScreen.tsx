import React, { useMemo } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Rect, Line } from 'react-native-svg';

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

const ChevronDownWhite = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ChevronDownGray = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path d="M6 9L12 15L18 9" stroke="#374151" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const TrendingDownIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M22 17L13.5 8.5L8.5 13.5L2 7" stroke="#059669" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M16 17H22V11" stroke="#059669" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const BarChartIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={12} width={4} height={9} rx={1} stroke="#EF4444" strokeWidth={1.8} />
    <Rect x={10} y={7} width={4} height={14} rx={1} stroke="#EF4444" strokeWidth={1.8} />
    <Rect x={17} y={4} width={4} height={17} rx={1} stroke="#EF4444" strokeWidth={1.8} />
  </Svg>
);

const MinusIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12H19" stroke="#2563EB" strokeWidth={2} strokeLinecap="round" />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const CHART_DATA = [
  { label: 'Housin.', mar: 1200, feb: 1200 },
  { label: 'Food', mar: 380, feb: 420 },
  { label: 'Shoppi.', mar: 320, feb: 480 },
  { label: 'Entert.', mar: 185, feb: 220 },
  { label: 'Utilit.', mar: 290, feb: 276 },
  { label: 'Health', mar: 165, feb: 180 },
  { label: 'Other', mar: 165, feb: 190 },
];

const COMPARISON_ROWS = [
  { label: 'Housing', amount: '$1,200', mar: 1200, feb: 1200 },
  { label: 'Food', amount: '$380', mar: 380, feb: 420 },
  { label: 'Shopping', amount: '$320', mar: 320, feb: 480 },
  { label: 'Transport', amount: '$245', mar: 245, feb: 260 },
  { label: 'Entertainment', amount: '$185', mar: 185, feb: 220 },
  { label: 'Utilities', amount: '$290', mar: 290, feb: 276 },
  { label: 'Health', amount: '$165', mar: 165, feb: 180 },
  { label: 'Other', amount: '$165', mar: 165, feb: 190 },
];

const Y_LABELS = ['$1k', '$900', '$600', '$300', '$0'];
const Y_VALUES = [1000, 900, 600, 300, 0];
const CHART_MAX = 1200;
const CHART_H = 160;

// ── Helpers ───────────────────────────────────────────────────────────────────

function getChangeBadge(mar: number, feb: number) {
  if (feb === 0) return { label: '~0%', type: 'neutral' as const };
  const pct = ((mar - feb) / feb) * 100;
  if (Math.abs(pct) < 1) return { label: '~0%', type: 'neutral' as const };
  if (pct < 0) return { label: `↓${Math.abs(Math.round(pct))}%`, type: 'down' as const };
  return { label: `↑${Math.round(pct)}%`, type: 'up' as const };
}

// ── SpendingOverviewScreen ────────────────────────────────────────────────────

export default function SpendingOverviewScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  const bg = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder = isDark ? '#334155' : '#E5E7EB';
  const titleColor = isDark ? '#F9FAFB' : '#111827';
  const subColor = isDark ? '#6B7280' : '#6B7280';
  const gridColor = isDark ? '#1F2937' : '#F3F4F6';

  const badgeColors = useMemo(() => ({
    down: { bg: '#F0FDF4', text: '#059669' },
    up: { bg: '#FEF2F2', text: '#EF4444' },
    neutral: { bg: isDark ? '#374151' : '#F3F4F6', text: isDark ? '#9CA3AF' : '#6B7280' },
  }), [isDark]);

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
        <Text style={[styles.headerTitle, { color: titleColor }]} allowFontScaling={false}>
          Monthly Comparison
        </Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ backgroundColor: bg }}
      >
        {/* ── Period pickers ─────────────────────────────────────────────── */}
        <View style={styles.periodRow}>
          <Pressable style={styles.periodBtnActive} accessibilityLabel="Select current month">
            <Text style={styles.periodBtnActiveText} allowFontScaling={false}>Mar 2026</Text>
            <ChevronDownWhite />
          </Pressable>

          <Text style={[styles.vsText, { color: subColor }]} allowFontScaling={false}>vs</Text>

          <Pressable
            style={[styles.periodBtnInactive, { backgroundColor: cardBg, borderColor: cardBorder }]}
            accessibilityLabel="Select comparison month"
          >
            <Text style={[styles.periodBtnInactiveText, { color: isDark ? '#D1D5DB' : '#374151' }]} allowFontScaling={false}>
              Feb 2026
            </Text>
            <ChevronDownGray />
          </Pressable>
        </View>

        {/* ── Stat cards ─────────────────────────────────────────────────── */}
        <View style={styles.statRow}>
          {/* Less spent */}
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={styles.statIconWrap}>
              <TrendingDownIcon />
            </View>
            <Text style={[styles.statValue, { color: titleColor }]} allowFontScaling={false}>5%</Text>
            <Text style={[styles.statLabel, { color: subColor }]} allowFontScaling={false}>Less spent</Text>
          </View>

          {/* Highest spend */}
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.statIconWrap, { backgroundColor: '#FEF2F2' }]}>
              <BarChartIcon />
            </View>
            <Text style={[styles.statValue, { color: titleColor }]} allowFontScaling={false}>Housing</Text>
            <Text style={[styles.statLabel, { color: subColor }]} allowFontScaling={false}>Highest spend</Text>
          </View>

          {/* Avg/day */}
          <View style={[styles.statCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <View style={[styles.statIconWrap, { backgroundColor: '#EFF6FF' }]}>
              <MinusIcon />
            </View>
            <Text style={[styles.statValue, { color: titleColor }]} allowFontScaling={false}>$95</Text>
            <Text style={[styles.statLabel, { color: subColor }]} allowFontScaling={false}>Avg / day</Text>
          </View>
        </View>

        {/* ── By Category chart ──────────────────────────────────────────── */}
        <View style={[styles.card, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {/* Card header */}
          <View style={styles.chartHeader}>
            <Text style={[styles.cardTitle, { color: titleColor }]} allowFontScaling={false}>
              By Category
            </Text>
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                <Text style={[styles.legendText, { color: subColor }]} allowFontScaling={false}>Mar</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#BFDBFE' }]} />
                <Text style={[styles.legendText, { color: subColor }]} allowFontScaling={false}>Feb</Text>
              </View>
            </View>
          </View>

          {/* Chart body */}
          <View style={styles.chartBody}>
            {/* Y-axis labels + grid */}
            <View style={styles.yAxis}>
              {Y_LABELS.map((lbl, i) => (
                <Text
                  key={lbl}
                  style={[styles.yLabel, { color: isDark ? '#6B7280' : '#9CA3AF', top: (CHART_H / (Y_LABELS.length - 1)) * i - 7 }]}
                  allowFontScaling={false}
                >
                  {lbl}
                </Text>
              ))}
            </View>

            {/* Bars + grid lines */}
            <View style={styles.barsArea}>
              {/* Grid lines */}
              {Y_VALUES.map((val, i) => (
                <View
                  key={val}
                  style={[
                    styles.gridLine,
                    {
                      bottom: (val / CHART_MAX) * CHART_H,
                      backgroundColor: gridColor,
                    },
                  ]}
                />
              ))}

              {/* Bar groups */}
              {CHART_DATA.map(item => {
                const marH = Math.max(2, (item.mar / CHART_MAX) * CHART_H);
                const febH = Math.max(2, (item.feb / CHART_MAX) * CHART_H);
                return (
                  <View key={item.label} style={styles.barGroup}>
                    <View style={styles.barPair}>
                      <View style={[styles.bar, styles.barMar, { height: marH }]} />
                      <View style={[styles.bar, styles.barFeb, { height: febH }]} />
                    </View>
                    <Text style={[styles.xLabel, { color: isDark ? '#6B7280' : '#9CA3AF' }]} allowFontScaling={false}>
                      {item.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        {/* ── Category comparison list ────────────────────────────────────── */}
        <View style={[styles.listCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
          {COMPARISON_ROWS.map((row, i) => {
            const badge = getChangeBadge(row.mar, row.feb);
            const badgeStyle = badgeColors[badge.type];
            return (
              <View key={row.label}>
                <View style={styles.compRow}>
                  <Text
                    style={[styles.compLabel, { color: isDark ? '#D1D5DB' : '#374151' }]}
                    allowFontScaling={false}
                  >
                    {row.label}
                  </Text>
                  <Text
                    style={[styles.compAmount, { color: titleColor }]}
                    allowFontScaling={false}
                  >
                    {row.amount}
                  </Text>
                  <View style={[styles.badge, { backgroundColor: badgeStyle.bg }]}>
                    <Text
                      style={[styles.badgeText, { color: badgeStyle.text }]}
                      allowFontScaling={false}
                    >
                      {badge.label}
                    </Text>
                  </View>
                </View>
                {i < COMPARISON_ROWS.length - 1 && (
                  <View style={[styles.rowDivider, { backgroundColor: gridColor }]} />
                )}
              </View>
            );
          })}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
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
  scrollContent: {
    paddingBottom: 40,
    gap: 16,
  },
  // Period pickers
  periodRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
  },
  periodBtnActive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: '#2563EB',
  },
  periodBtnActiveText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#FFFFFF',
  },
  vsText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  periodBtnInactive: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    height: 40,
    paddingHorizontal: 16,
    borderRadius: 10,
    borderWidth: 1,
  },
  periodBtnInactiveText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 21,
  },
  // Stat cards
  statRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 24,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 14,
    gap: 8,
  },
  statIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
  },
  statLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  // Bar chart card
  card: {
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    gap: 16,
  },
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
    alignItems: 'center',
    gap: 10,
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
  legendText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  // Chart
  chartBody: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 4,
  },
  yAxis: {
    width: 36,
    height: CHART_H,
    position: 'relative',
  },
  yLabel: {
    position: 'absolute',
    right: 4,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 9,
    lineHeight: 14,
    textAlign: 'right',
  },
  barsArea: {
    flex: 1,
    height: CHART_H,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    position: 'relative',
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
  },
  barGroup: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    height: CHART_H,
  },
  barPair: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
  },
  bar: {
    width: 9,
    borderRadius: 3,
  },
  barMar: {
    backgroundColor: '#2563EB',
  },
  barFeb: {
    backgroundColor: '#BFDBFE',
  },
  xLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 8,
    lineHeight: 12,
    textAlign: 'center',
  },
  // Comparison list
  listCard: {
    marginHorizontal: 24,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 20,
    overflow: 'hidden',
  },
  compRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    gap: 12,
  },
  compLabel: {
    flex: 1,
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
  },
  compAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
  },
  badge: {
    height: 22,
    borderRadius: 6,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 48,
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
  },
  rowDivider: {
    height: 1,
  },
});
