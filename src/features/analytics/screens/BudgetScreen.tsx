import React from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';

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

const PlusIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path d="M12 5V19" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
    <Path d="M5 12H19" stroke="#FFFFFF" strokeWidth={2.2} strokeLinecap="round" />
  </Svg>
);

const WarningIcon = ({ color }: { color: string }) => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M12 9v5" stroke={color} strokeWidth={2} strokeLinecap="round" />
    <Circle cx={12} cy={17.5} r={0.8} fill={color} />
  </Svg>
);

const CheckCircleIcon = () => (
  <Svg width={13} height={13} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={10} stroke="#059669" strokeWidth={2} />
    <Polyline
      points="8,12 11,15 16,10"
      stroke="#059669"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EditIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"
      stroke="#9CA3AF"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"
      stroke="#9CA3AF"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TrashIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"
      stroke="#EF4444"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Data ──────────────────────────────────────────────────────────────────────

const BUDGETS = [
  { label: 'Food & Drink', color: '#F59E0B', bgColor: '#FFFBEB', spent: 380, budget: 400 },
  { label: 'Shopping',     color: '#7C3AED', bgColor: '#F5F3FF', spent: 320, budget: 300 },
  { label: 'Transport',    color: '#2563EB', bgColor: '#EFF6FF', spent: 145, budget: 250 },
  { label: 'Entertainment',color: '#059669', bgColor: '#F0FDF4', spent: 185, budget: 200 },
  { label: 'Utilities',    color: '#EC4899', bgColor: '#FDF2F8', spent: 290, budget: 300 },
];

const TOTAL_BUDGET = BUDGETS.reduce((s, b) => s + b.budget, 0); // 1450
const TOTAL_SPENT  = BUDGETS.reduce((s, b) => s + b.spent,  0); // 1320

// ── Status helpers ────────────────────────────────────────────────────────────

type Status = 'ontrack' | 'warning' | 'exceeded';

function getStatus(spent: number, budget: number): Status {
  const pct = spent / budget;
  if (pct > 1)    return 'exceeded';
  if (pct >= 0.8) return 'warning';
  return 'ontrack';
}

function getBarColor(status: Status) {
  if (status === 'exceeded') return '#EF4444';
  if (status === 'warning')  return '#F59E0B';
  return '#059669';
}

function getPctColor(status: Status) {
  if (status === 'exceeded') return '#EF4444';
  if (status === 'warning')  return '#F59E0B';
  return '#059669';
}

// ── BudgetCard ────────────────────────────────────────────────────────────────

interface BudgetCardProps {
  item: (typeof BUDGETS)[0];
  isDark: boolean;
}

const BudgetCard = ({ item, isDark }: BudgetCardProps) => {
  const status   = getStatus(item.spent, item.budget);
  const pct      = Math.min(item.spent / item.budget, 1);
  const pctLabel = `${Math.round((item.spent / item.budget) * 100)}%`;
  const remaining = item.budget - item.spent;
  const barColor  = getBarColor(status);
  const pctColor  = getPctColor(status);

  const cardBorder  = status === 'exceeded' ? '#EF4444'
                    : isDark ? '#334155' : '#E5E7EB';
  const cardBg      = isDark ? '#1E293B' : '#FFFFFF';
  const labelColor  = isDark ? '#F9FAFB' : '#111827';
  const subColor    = isDark ? '#6B7280' : '#9CA3AF';
  const trackColor  = isDark ? '#374151' : '#F3F4F6';
  const iconBtnBg   = isDark ? '#111827' : '#F9FAFB';

  return (
    <View style={[styles.budgetCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
      {/* ── Row 1: dot + name + status badge ── */}
      <View style={styles.cardTopRow}>
        <View style={[styles.categoryDot, { backgroundColor: item.color }]} />
        <Text style={[styles.categoryName, { color: labelColor }]} allowFontScaling={false}>
          {item.label}
        </Text>

        {status === 'ontrack' && (
          <View style={styles.badgeOnTrack}>
            <CheckCircleIcon />
            <Text style={styles.badgeOnTrackText} allowFontScaling={false}>On Track</Text>
          </View>
        )}
        {status === 'warning' && (
          <View style={styles.badgeWarning}>
            <WarningIcon color="#D97706" />
            <Text style={styles.badgeWarningText} allowFontScaling={false}>Warning</Text>
          </View>
        )}
        {status === 'exceeded' && (
          <View style={styles.badgeExceeded}>
            <WarningIcon color="#EF4444" />
            <Text style={styles.badgeExceededText} allowFontScaling={false}>Exceeded</Text>
          </View>
        )}
      </View>

      {/* ── Row 2: amount + pct ── */}
      <View style={styles.amountRow}>
        <View style={styles.amountGroup}>
          <Text style={[styles.spentAmount, { color: labelColor }]} allowFontScaling={false}>
            ${item.spent}
          </Text>
          <Text style={[styles.budgetAmount, { color: subColor }]} allowFontScaling={false}>
            {' '}/ ${item.budget}
          </Text>
        </View>
        <Text style={[styles.pctLabel, { color: pctColor }]} allowFontScaling={false}>
          {pctLabel}
        </Text>
      </View>

      {/* ── Progress bar ── */}
      <View style={[styles.progressTrack, { backgroundColor: trackColor }]}>
        <View
          style={[
            styles.progressFill,
            { width: `${pct * 100}%`, backgroundColor: barColor },
          ]}
        />
      </View>

      {/* ── Row 3: remaining / over + action icons ── */}
      <View style={styles.cardBottomRow}>
        {remaining >= 0 ? (
          <Text style={[styles.remainingText, { color: subColor }]} allowFontScaling={false}>
            ${remaining} remaining
          </Text>
        ) : (
          <Text style={[styles.overText]} allowFontScaling={false}>
            Over by ${Math.abs(remaining)}
          </Text>
        )}

        <View style={styles.actionIcons}>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: iconBtnBg }]}
            accessibilityLabel={`Edit ${item.label} budget`}
            hitSlop={6}
          >
            <EditIcon />
          </Pressable>
          <Pressable
            style={[styles.iconBtn, { backgroundColor: iconBtnBg }]}
            accessibilityLabel={`Delete ${item.label} budget`}
            hitSlop={6}
          >
            <TrashIcon />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// ── BudgetScreen ──────────────────────────────────────────────────────────────

export default function BudgetScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();

  const bg        = isDark ? '#0F172A' : '#F8FAFC';
  const cardBg    = isDark ? '#1E293B' : '#FFFFFF';
  const cardBorder= isDark ? '#334155' : '#E5E7EB';
  const titleColor= isDark ? '#F9FAFB' : '#111827';
  const subColor  = isDark ? '#6B7280' : '#6B7280';

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <BackIcon />
        </Pressable>
        <Text style={[styles.headerTitle, { color: titleColor }]} allowFontScaling={false}>
          Budgets
        </Text>
        <Pressable
          style={styles.addBtn}
          onPress={() => navigation.navigate('AddBudget')}
          accessibilityLabel="Add budget"
        >
          <PlusIcon />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={{ backgroundColor: bg }}
      >
        {/* ── Summary cards ───────────────────────────────────────────────── */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <Text style={[styles.summaryLabel, { color: subColor }]} allowFontScaling={false}>
              Total Budget
            </Text>
            <Text style={[styles.summaryAmount, { color: titleColor }]} allowFontScaling={false}>
              ${TOTAL_BUDGET.toLocaleString()}
            </Text>
          </View>
          <View style={[styles.summaryCard, { backgroundColor: cardBg, borderColor: cardBorder }]}>
            <Text style={[styles.summaryLabel, { color: subColor }]} allowFontScaling={false}>
              Total Spent
            </Text>
            <Text style={[styles.summaryAmountRed]} allowFontScaling={false}>
              ${TOTAL_SPENT.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* ── Budget cards ─────────────────────────────────────────────────── */}
        {BUDGETS.map(item => (
          <BudgetCard key={item.label} item={item} isDark={isDark} />
        ))}
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
    flex: 1,
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 20,
    lineHeight: 30,
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Scroll
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 4,
    paddingBottom: 40,
    gap: 14,
  },
  // Summary cards
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 6,
  },
  summaryLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
  },
  summaryAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
  },
  summaryAmountRed: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    color: '#EF4444',
  },
  // Budget card
  budgetCard: {
    borderRadius: 16,
    borderWidth: 1.5,
    paddingHorizontal: 18,
    paddingTop: 16,
    paddingBottom: 14,
    gap: 12,
  },
  // Card top row
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 4,
    flexShrink: 0,
  },
  categoryName: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  // Status badges
  badgeOnTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    backgroundColor: '#F0FDF4',
  },
  badgeOnTrackText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#059669',
  },
  badgeWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
    backgroundColor: '#FFFBEB',
  },
  badgeWarningText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#D97706',
  },
  badgeExceeded: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    height: 26,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FECACA',
    backgroundColor: '#FEF2F2',
  },
  badgeExceededText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#EF4444',
  },
  // Amount row
  amountRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  amountGroup: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  spentAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
  },
  budgetAmount: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
  },
  pctLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  // Progress bar
  progressTrack: {
    height: 7,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 7,
    borderRadius: 4,
  },
  // Bottom row
  cardBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  remainingText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
  },
  overText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#EF4444',
  },
  actionIcons: {
    flexDirection: 'row',
    gap: 8,
  },
  iconBtn: {
    width: 34,
    height: 34,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
