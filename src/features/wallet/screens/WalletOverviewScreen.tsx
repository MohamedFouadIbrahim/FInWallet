import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  type NativeSyntheticEvent,
  type NativeScrollEvent,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import type { WalletStackParamList } from '../navigation/WalletNavigator';
import ChevronRightIcon from '@components/ui/icons/ChevronRightIcon';
import TrendingUpIcon from '@components/ui/icons/TrendingUpIcon';
import SendArrowIcon from '@components/ui/icons/SendArrowIcon';
import RequestArrowIcon from '@components/ui/icons/RequestArrowIcon';
import ExchangeArrowsIcon from '@components/ui/icons/ExchangeArrowsIcon';
import SettingsIcon from '@components/ui/icons/SettingsIcon';
import InfoCircleIcon from '@components/ui/icons/InfoCircleIcon';
import BasketIcon from '@components/ui/icons/BasketIcon';
import ShoppingBagIcon from '@components/ui/icons/ShoppingBagIcon';
import PlusIcon from '@components/ui/icons/PlusIcon';

// ── Constants ──────────────────────────────────────────────────────────────────

const WALLET_CARD_W = 170;
const WALLET_CARD_H = 122;
const WALLET_CARD_GAP = 12;
const WALLET_CARD_RADIUS = 18;
const H_SCROLL_PAD = 24;

// Gradient direction for 153.415° (wallet cards) — start top-left → end bottom-right
const CARD_GRAD_START = { x: 0.276, y: 0.053 };
const CARD_GRAD_END = { x: 0.724, y: 0.947 };

// ── Data ──────────────────────────────────────────────────────────────────────

interface WalletData {
  id: string;
  flag: string;
  currency: string;
  amount: string;
  change: string;
  positive: boolean | null;
  gradient: [string, string];
  shadowOpacity: number;
  shadowYOffset: number;
  shadowBlurRadius: number;
}

interface TransactionData {
  id: string;
  name: string;
  date: string;
  amount: string;
  positive: boolean;
  iconBg: string;
  iconType: 'basket' | 'receive' | 'shopping';
}

const WALLETS: WalletData[] = [
  {
    id: 'usd',
    flag: '🇺🇸',
    currency: 'USD',
    amount: '$8,240.50',
    change: '+1.3% today',
    positive: true,
    gradient: ['#2563EB', '#1E3A8A'],
    shadowOpacity: 0.22,
    shadowYOffset: 8,
    shadowBlurRadius: 12,
  },
  {
    id: 'eur',
    flag: '🇪🇺',
    currency: 'EUR',
    amount: '€3,150.25',
    change: '-0.4% today',
    positive: false,
    gradient: ['#7C3AED', '#5B21B6'],
    shadowOpacity: 0.12,
    shadowYOffset: 4,
    shadowBlurRadius: 6,
  },
  {
    id: 'gbp',
    flag: '🇬🇧',
    currency: 'GBP',
    amount: '£1,820.00',
    change: '+0.8% today',
    positive: true,
    gradient: ['#059669', '#047857'],
    shadowOpacity: 0.12,
    shadowYOffset: 4,
    shadowBlurRadius: 6,
  },
  {
    id: 'aed',
    flag: '🇦🇪',
    currency: 'AED',
    amount: 'د.إ5,500.00',
    change: 'No change',
    positive: null,
    gradient: ['#D97706', '#B45309'],
    shadowOpacity: 0.12,
    shadowYOffset: 4,
    shadowBlurRadius: 6,
  },
];

const TRANSACTIONS: TransactionData[] = [
  {
    id: 'starbucks',
    name: 'Starbucks',
    date: 'Today, 9:41 AM',
    amount: '-$6.50',
    positive: false,
    iconBg: '#F5F3FF',
    iconType: 'basket',
  },
  {
    id: 'transfer',
    name: 'Transfer from John',
    date: 'Yesterday, 6:30 PM',
    amount: '+$500.00',
    positive: true,
    iconBg: '#F0FDF4',
    iconType: 'receive',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    date: 'Yesterday, 2:15 PM',
    amount: '-$45.99',
    positive: false,
    iconBg: '#FFFBEB',
    iconType: 'shopping',
  },
];

// ── WalletCard ─────────────────────────────────────────────────────────────────
// Layout uses flex (justifyContent: 'space-between') — no position:absolute on content.
// Only the decorative circle uses absolute (purely visual overlay).

interface WalletCardProps {
  wallet: WalletData;
  style?: StyleProp<ViewStyle>;
}

const WalletCard = React.memo(({ wallet, style }: WalletCardProps) => (
  <View
    style={[
      styles.walletCardShadow,
      {
        backgroundColor: wallet.gradient[1],
        shadowColor: '#000000',
        shadowOpacity: wallet.shadowOpacity,
        shadowOffset: { width: 0, height: wallet.shadowYOffset },
        shadowRadius: wallet.shadowBlurRadius,
      },
      style,
    ]}
  >
    <LinearGradient
      colors={wallet.gradient}
      start={CARD_GRAD_START}
      end={CARD_GRAD_END}
      style={styles.walletCard}
    >
      {/* Decorative circle — purely visual overlay, position:absolute is acceptable */}
      <View style={styles.walletDecCircle} />

      {/* Header row: flag left, currency right */}
      <View style={styles.walletCardHeader}>
        <Text style={styles.walletFlag} allowFontScaling={false}>
          {wallet.flag}
        </Text>
        <Text style={styles.walletCurrency} allowFontScaling={false}>
          {wallet.currency}
        </Text>
      </View>

      {/* Bottom group: amount + change pushed to bottom via space-between */}
      <View style={{margin:10}} >
        <Text style={styles.walletAmount} allowFontScaling={false}>
          {wallet.amount}
        </Text>
        <Text
          style={[
            styles.walletChange,
            wallet.positive === true && styles.walletChangePos,
            wallet.positive === false && styles.walletChangeNeg,
            wallet.positive === null && styles.walletChangeNeutral,
          ]}
          allowFontScaling={false}
        >
          {wallet.change}
        </Text>
      </View>
    </LinearGradient>
  </View>
));

// ── AddWalletCard ──────────────────────────────────────────────────────────────

interface AddWalletCardProps {
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
  isDark: boolean;
}

const AddWalletCard = React.memo(({ style, onPress, isDark }: AddWalletCardProps) => (
  <Pressable
    style={[styles.addWalletCard, isDark && styles.addWalletCardDark, style]}
    onPress={onPress}
    className="active:opacity-pressed"
    accessibilityLabel="Add new wallet"
  >
    <View style={[styles.addWalletIconWrap, isDark && styles.addWalletIconWrapDark]}>
      <PlusIcon size={16} color={isDark ? '#9CA3AF' : '#6B7280'} />
    </View>
    <Text style={styles.addWalletText} allowFontScaling={false}>
      Add Wallet
    </Text>
  </Pressable>
));

// ── ActionButton ───────────────────────────────────────────────────────────────

interface ActionButtonProps {
  label: string;
  iconBg: string;
  iconBgDark: string;
  icon: React.ReactNode;
  onPress: () => void;
  isDark: boolean;
}

const ActionButton = ({
  label,
  iconBg,
  iconBgDark,
  icon,
  onPress,
  isDark,
}: ActionButtonProps) => (
  <Pressable
    style={styles.actionBtn}
    onPress={onPress}
    className="active:opacity-pressed"
    accessibilityLabel={label}
  >
    <View style={[styles.actionIconWrap, { backgroundColor: isDark ? iconBgDark : iconBg }]}>
      {icon}
    </View>
    <Text
      style={[styles.actionLabel, isDark && styles.actionLabelDark]}
      allowFontScaling={false}
    >
      {label}
    </Text>
  </Pressable>
);

// ── LimitRow ───────────────────────────────────────────────────────────────────

interface LimitRowProps {
  label: string;
  subtitle: string;
  percent: number;
  remaining: string;
  max: string;
  gradientColors: [string, string];
  isDark: boolean;
}

const LimitRow = ({
  label,
  subtitle,
  percent,
  remaining,
  max,
  gradientColors,
  isDark,
}: LimitRowProps) => (
  <View style={styles.limitRow}>
    <View style={styles.limitRowHeader}>
      <Text
        style={[styles.limitLabel, isDark && styles.limitLabelDark]}
        allowFontScaling={false}
        numberOfLines={1}
      >
        {label}
        <Text style={styles.limitSubtitle}>{`  ${subtitle}`}</Text>
      </Text>
      <Text
        style={[styles.limitPercent, isDark && styles.limitPercentDark]}
        allowFontScaling={false}
      >
        {`${percent}%`}
      </Text>
    </View>
    <View style={[styles.progressTrack, isDark && styles.progressTrackDark]}>
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.progressFill, { width: `${percent}%` }]}
      />
    </View>
    <View style={styles.limitRowFooter}>
      <Text style={styles.limitMeta} allowFontScaling={false}>
        {remaining}
      </Text>
      <Text style={styles.limitMeta} allowFontScaling={false}>
        {max}
      </Text>
    </View>
  </View>
);

// ── TransactionRow ─────────────────────────────────────────────────────────────

interface TransactionRowProps {
  txn: TransactionData;
  isLast: boolean;
  isDark: boolean;
}

const TxnIcon = ({ type, bg }: { type: TransactionData['iconType']; bg: string }) => (
  <View style={[styles.txnIconWrap, { backgroundColor: bg }]}>
    {type === 'basket' && <BasketIcon size={18} color="#7C3AED" />}
    {type === 'receive' && <RequestArrowIcon size={18} color="#059669" />}
    {type === 'shopping' && <ShoppingBagIcon size={18} color="#F59E0B" />}
  </View>
);

const TransactionRow = React.memo(({ txn, isLast, isDark }: TransactionRowProps) => (
  <View>
    <View style={styles.txnRow}>
      <TxnIcon type={txn.iconType} bg={txn.iconBg} />
      <View style={styles.txnInfo}>
        <Text
          style={[styles.txnName, isDark && styles.txnNameDark]}
          allowFontScaling={false}
        >
          {txn.name}
        </Text>
        <Text style={styles.txnDate} allowFontScaling={false}>
          {txn.date}
        </Text>
      </View>
      <Text
        style={[
          styles.txnAmount,
          txn.positive
            ? styles.txnAmountPos
            : isDark
              ? styles.txnAmountNeutDark
              : styles.txnAmountNeut,
        ]}
        allowFontScaling={false}
      >
        {txn.amount}
      </Text>
    </View>
    {!isLast && <View style={styles.txnDivider} />}
  </View>
));

// ── Main Screen ────────────────────────────────────────────────────────────────

const WalletOverviewScreen = () => {
  const { isDark } = useTheme();
  const navigation = useNavigation<NativeStackNavigationProp<WalletStackParamList>>();
  const [activeWalletIdx, setActiveWalletIdx] = useState(0);

  const handleWalletScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      const x = e.nativeEvent.contentOffset.x;
      const idx = Math.round(x / (WALLET_CARD_W + WALLET_CARD_GAP));
      setActiveWalletIdx(Math.max(0, Math.min(idx, WALLETS.length - 1)));
    },
    [],
  );

  const handleSettings = useCallback(() => {}, []);
  const handleTopUp = useCallback(() => navigation.navigate('WalletTopUp'), [navigation]);
  const handleWithdraw = useCallback(() => navigation.navigate('WalletWithdraw'), [navigation]);
  const handleExchange = useCallback(() => {}, []);
  const handleAddWallet = useCallback(() => {}, []);
  const handleUpgrade = useCallback(() => {}, []);
  const handleSeeAll = useCallback(() => {}, []);

  return (
    <ScreenWrapper
      edges={['top', 'left', 'right']}
      className="bg-neutral-50 dark:bg-neutral-900"
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <View>
            <Text style={styles.subTitle} allowFontScaling={false}>
              Total Portfolio
            </Text>
            <Text
              style={[styles.title, isDark && styles.titleDark]}
              allowFontScaling={false}
            >
              My Wallets
            </Text>
          </View>
          <Pressable
            style={[styles.settingsBtn, isDark && styles.settingsBtnDark]}
            onPress={handleSettings}
            className="active:opacity-pressed"
            accessibilityLabel="Settings"
          >
            <SettingsIcon size={18} color={isDark ? '#9CA3AF' : '#374151'} />
          </Pressable>
        </View>

        {/* ── Total Balance Card ── */}
        {/* Shadow wrapper + overflow:hidden gradient — no position:absolute on text content */}
        <View style={[styles.balanceCardWrapper, isDark && styles.balanceCardWrapperDark]}>
          <LinearGradient
            colors={['#111827', '#1F2937']}
            start={{ x: 0.326, y: 0.031 }}
            end={{ x: 0.674, y: 0.969 }}
            style={styles.balanceCard}
          >
            {/* Decorative circles — purely visual overlays */}
            <View style={styles.balanceCircle1} />
            <View style={styles.balanceCircle2} />

          <View style={{ flex:1, justifyContent:'space-between', padding: 20}} >
            <View>
              <Text style={styles.balanceLabel} allowFontScaling={false}>
                Total Balance (USD equiv.)
              </Text>
              <Text style={styles.balanceAmount} allowFontScaling={false}>
                $18,710.75
              </Text>
            </View>

            {/* Footer: trend badge + today + dots */}
            <View style={styles.balanceFooter}>
              <View style={styles.balanceTrendRow}>
                <View style={styles.trendBadge}>
                  <TrendingUpIcon size={11} color="#34D399" />
                  <Text style={styles.trendText} allowFontScaling={false}>
                    +$240.00 (1.3%)
                  </Text>
                </View>
                <Text style={styles.todayText} allowFontScaling={false}>
                  today
                </Text>
              </View>
              <View style={styles.dotsRow}>
                {WALLETS.map((_, i) => (
                  <View
                    key={i}
                    style={[styles.dot, i === activeWalletIdx && styles.dotActive]}
                  />
                ))}
              </View>
            </View>
            </View>
          </LinearGradient>
        </View>

        {/* ── Wallet Cards Horizontal Scroll ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={WALLET_CARD_W + WALLET_CARD_GAP}
          decelerationRate="fast"
          onMomentumScrollEnd={handleWalletScroll}
          contentContainerStyle={styles.walletScrollContent}
          style={styles.walletScroll}
        >
          {WALLETS.map((wallet, idx) => (
            <WalletCard
              key={wallet.id}
              wallet={wallet}
              style={idx < WALLETS.length - 1 ? { marginRight: WALLET_CARD_GAP } : undefined}
            />
          ))}
          <AddWalletCard
            style={{ marginLeft: WALLET_CARD_GAP }}
            onPress={handleAddWallet}
            isDark={isDark}
          />
        </ScrollView>

        {/* ── Quick Actions ── */}
        <View style={[styles.actionsPanel, isDark && styles.actionsPanelDark]}>
          <ActionButton
            label="Top Up"
            iconBg="#EFF6FF"
            iconBgDark="#1e3a5f"
            icon={<SendArrowIcon size={20} color="#2563EB" />}
            onPress={handleTopUp}
            isDark={isDark}
          />
          <View style={[styles.actionDivider, isDark && styles.actionDividerDark]} />
          <ActionButton
            label="Withdraw"
            iconBg="#F0FDF4"
            iconBgDark="#14352a"
            icon={<RequestArrowIcon size={20} color="#059669" />}
            onPress={handleWithdraw}
            isDark={isDark}
          />
          <View style={[styles.actionDivider, isDark && styles.actionDividerDark]} />
          <ActionButton
            label="Exchange"
            iconBg="#F5F3FF"
            iconBgDark="#2d1b5e"
            icon={<ExchangeArrowsIcon size={20} color="#7C3AED" />}
            onPress={handleExchange}
            isDark={isDark}
          />
        </View>

        {/* ── Transaction Limits ── */}
        <View style={styles.limitsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel} allowFontScaling={false}>
              TRANSACTION LIMITS
            </Text>
            <Pressable
              style={styles.textLinkBtn}
              onPress={handleUpgrade}
              className="active:opacity-pressed"
              accessibilityLabel="Upgrade transaction limits"
            >
              <Text style={styles.linkBtnText} allowFontScaling={false}>
                Upgrade
              </Text>
              <ChevronRightIcon size={13} color="#2563EB" />
            </Pressable>
          </View>
          <View style={[styles.limitsCard, isDark && styles.cardDark]}>
            <LimitRow
              label="Daily Limit"
              subtitle="Used $1,240 of $5,000"
              percent={25}
              remaining="Remaining: $3,760"
              max="Max: $5,000"
              gradientColors={['#2563EB', '#1D4ED8']}
              isDark={isDark}
            />
            <View style={[styles.inCardDivider, isDark && styles.inCardDividerDark]} />
            <LimitRow
              label="Monthly Limit"
              subtitle="Used $8,960 of $20,000"
              percent={45}
              remaining="Remaining: $11,040"
              max="Max: $20,000"
              gradientColors={['#7C3AED', '#5B21B6']}
              isDark={isDark}
            />
            <View style={[styles.kycTip, isDark && styles.kycTipDark]}>
              <InfoCircleIcon size={14} color="#2563EB" />
              <Text style={styles.kycTipText} allowFontScaling={false}>
                Upgrade to Full KYC for unlimited transfers
              </Text>
            </View>
          </View>
        </View>

        {/* ── Recent Transactions ── */}
        <View style={styles.txnsSection}>
          <View style={styles.sectionHeaderRow}>
            <Text
              style={[styles.txnsSectionTitle, isDark && styles.txnsSectionTitleDark]}
              allowFontScaling={false}
            >
              Recent Transactions
            </Text>
            <Pressable
              style={styles.textLinkBtn}
              onPress={handleSeeAll}
              className="active:opacity-pressed"
              accessibilityLabel="See all transactions"
            >
              <Text style={styles.linkBtnText} allowFontScaling={false}>
                See All
              </Text>
              <ChevronRightIcon size={14} color="#2563EB" />
            </Pressable>
          </View>
          <View style={[styles.limitsCard, isDark && styles.cardDark]}>
            {TRANSACTIONS.map((txn, idx) => (
              <TransactionRow
                key={txn.id}
                txn={txn}
                isLast={idx === TRANSACTIONS.length - 1}
                isDark={isDark}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default WalletOverviewScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 32,
  },

  // ── Header ──
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    marginBottom: 20,
  },
  subTitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  title: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    color: '#111827',
  },
  titleDark: { color: '#F8FAFC' },
  settingsBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingsBtnDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },

  // ── Total Balance Card ──
  // Shadow lives on the wrapper (required for iOS shadow + borderRadius).
  // Text content uses marginTop for vertical spacing — no position:absolute needed.
  balanceCardWrapper: {
    marginHorizontal: 24,
    borderRadius: 20,
    backgroundColor: '#111827',
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  balanceCardWrapperDark: {
    shadowOpacity: 0.35,
  },
  balanceCard: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 200,
    // paddingHorizontal: 22,
    // paddingTop: 20,
    // paddingBottom: 20,
    // justifyContent: 'space-between',
  },
  // Decorative overlay circles — position:absolute is acceptable for purely visual elements
  balanceCircle1: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.04)',
    top: -40,
    right: -30, // extends 30pt past right edge; clipped by overflow:hidden
  },
  balanceCircle2: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(37,99,235,0.12)',
    top: 110,
    left: -20,
  },
  // Label → amount → footer in normal flow, spaced with marginTop
  balanceLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.55)',
  },
  balanceAmount: {
    marginTop: 30,
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 34,
    lineHeight: 37.4,
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  balanceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceTrendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trendBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16,185,129,0.2)',
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  trendText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#34D399',
  },
  todayText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: 'rgba(255,255,255,0.4)',
  },
  dotsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  dotActive: {
    backgroundColor: '#60A5FA',
  },

  // ── Wallet Cards Scroll ──
  walletScroll: {
    marginTop: 20,
    flexShrink: 0,
  },
  walletScrollContent: {
    paddingHorizontal: H_SCROLL_PAD,
    paddingVertical: 8, // gives room for card shadows to render outside the card bounds
    alignItems: 'flex-start',
  },
  // Shadow wrapper: explicit size required for iOS shadow + borderRadius combo
  walletCardShadow: {
    width: WALLET_CARD_W,
    height: WALLET_CARD_H,
    borderRadius: WALLET_CARD_RADIUS,
    elevation: 6,
  },
  // absoluteFillObject pins the gradient to exact pixel bounds of the shadow wrapper,
  // eliminating any flex-rounding gap that caused the dark ring.
  walletCard: {
    // ...StyleSheet.absoluteFill,
    // width: WALLET_CARD_W + 20,
    height: WALLET_CARD_H,
    borderRadius: WALLET_CARD_RADIUS,
    overflow: 'hidden',
    // paddingTop: 16,
    // paddingHorizontal: ,
    // paddingBottom: 24,
    // padding:10,
    justifyContent: 'space-between',
  },
  // Purely decorative overlay — position:absolute acceptable here
  walletDecCircle: {
    position: 'absolute',
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.08)',
    top: -20,
    right: -20,
  },
  walletCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin:10
    // height: 33,
  },
  walletFlag: {
    fontSize: 22,
    lineHeight: 33,
  },
  walletCurrency: {
    fontFamily: 'JetBrainsMono-Bold',
    fontSize: 11,
    lineHeight: 16.5,
    color: 'rgba(255,255,255,0.7)',
    letterSpacing: 1.1,
  },
  walletAmount: {
    fontFamily: 'PlusJakartaSans-ExtraBold',
    fontSize: 20,
    lineHeight: 22,
    color: '#FFFFFF',
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  walletChange: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 11,
    lineHeight: 16.5,
  },
  walletChangePos: { color: '#34D399' },
  walletChangeNeg: { color: '#FCA5A5' },
  walletChangeNeutral: { color: 'rgba(255,255,255,0.5)' },

  // ── Add Wallet Card ──
  addWalletCard: {
    width: 90,
    height: WALLET_CARD_H,
    borderRadius: WALLET_CARD_RADIUS,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  addWalletCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  addWalletIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addWalletIconWrapDark: {
    backgroundColor: '#334155',
  },
  addWalletText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 11,
    lineHeight: 14.3,
    color: '#6B7280',
    textAlign: 'center',
  },

  // ── Quick Actions ──
  actionsPanel: {
    flexDirection: 'row',
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    height: 102,
    overflow: 'hidden',
  },
  actionsPanelDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionDivider: {
    width: 1,
    backgroundColor: '#F3F4F6',
  },
  actionDividerDark: {
    backgroundColor: '#334155',
  },
  actionIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 12,
    lineHeight: 18,
    color: '#374151',
  },
  actionLabelDark: { color: '#D1D5DB' },

  // ── Shared card / section ──
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textLinkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    minWidth: 44,
    minHeight: 44,
    justifyContent: 'flex-end',
  },
  linkBtnText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: '#2563EB',
  },
  limitsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  cardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },

  // ── Transaction Limits ──
  limitsSection: {
    marginHorizontal: 24,
    marginTop: 24,
    gap: 12,
  },
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
    letterSpacing: 0.77,
    textTransform: 'uppercase',
  },
  limitRow: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  limitRowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  limitLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
    flex: 1,
  },
  limitLabelDark: { color: '#D1D5DB' },
  limitSubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  limitPercent: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#111827',
    marginLeft: 8,
  },
  limitPercentDark: { color: '#F8FAFC' },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressTrackDark: { backgroundColor: '#374151' },
  progressFill: {
    height: 8,
    borderRadius: 4,
  },
  limitRowFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  limitMeta: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 16.5,
    color: '#9CA3AF',
  },
  inCardDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
  inCardDividerDark: { backgroundColor: '#334155' },
  kycTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#EFF6FF',
    marginHorizontal: 16,
    marginTop: 14,
    marginBottom: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingVertical: 10,
    borderRadius: 10,
  },
  kycTipDark: { backgroundColor: '#1e3a5f' },
  kycTipText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    lineHeight: 15.4,
    color: '#1D4ED8',
    flex: 1,
  },

  // ── Recent Transactions ──
  txnsSection: {
    marginHorizontal: 24,
    marginTop: 24,
    gap: 14,
  },
  txnsSectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
  },
  txnsSectionTitleDark: { color: '#F8FAFC' },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 68,
  },
  txnIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txnInfo: {
    flex: 1,
    gap: 2,
  },
  txnName: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  txnNameDark: { color: '#F8FAFC' },
  txnDate: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
  txnAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
  },
  txnAmountPos: { color: '#059669' },
  txnAmountNeut: { color: '#111827' },
  txnAmountNeutDark: { color: '#F8FAFC' },
  txnDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 70, // 16(px) + 42(icon) + 12(gap) = 70
  },
});
