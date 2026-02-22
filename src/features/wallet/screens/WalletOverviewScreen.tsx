import React, { useCallback } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  useWindowDimensions,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import PlusIcon from '@components/ui/icons/PlusIcon';
import WifiContactlessIcon from '@components/ui/icons/WifiContactlessIcon';
import SendArrowIcon from '@components/ui/icons/SendArrowIcon';
import RequestArrowIcon from '@components/ui/icons/RequestArrowIcon';
import DotsHorizontalIcon from '@components/ui/icons/DotsHorizontalIcon';

// ── Constants ─────────────────────────────────────────────────────────────────

const CARD_PADDING_H = 24;
const CARD_GAP = 16;
// Card is 300/390 of the design width — computed from screen below

// ── Data ──────────────────────────────────────────────────────────────────────

interface CardData {
  id: string;
  type: string;
  lastFour: string;
  holder: string;
  expires: string;
  gradientColors: string[];
  shadowBg: string;
}

interface Transaction {
  id: string;
  name: string;
  date: string;
  amount: string;
  positive: boolean;
}

const CARDS: CardData[] = [
  {
    id: '1',
    type: 'VISA',
    lastFour: '4829',
    holder: 'Alex Carter',
    expires: '12/27',
    gradientColors: ['#2563EB', '#1E3A8A'],
    shadowBg: '#1E3A8A',
  },
  {
    id: '2',
    type: 'MC',
    lastFour: '7731',
    holder: 'Alex Carter',
    expires: '09/26',
    gradientColors: ['#7C3AED', '#4C1D95'],
    shadowBg: '#4C1D95',
  },
];

const TRANSACTIONS: Transaction[] = [
  { id: '1', name: 'Top Up', date: 'Today', amount: '+$500.00', positive: true },
  { id: '2', name: 'Starbucks', date: 'Today', amount: '-$6.50', positive: false },
  { id: '3', name: 'Amazon', date: 'Yesterday', amount: '-$45.99', positive: false },
];

// ── WalletCard ────────────────────────────────────────────────────────────────

interface WalletCardProps {
  card: CardData;
  cardWidth: number;
  style?: StyleProp<ViewStyle>;
}

const CARD_HEIGHT = 172;
const CARD_RADIUS = 20;

const WalletCard = ({ card, cardWidth, style }: WalletCardProps) => (
  // Outer View: shadow only (no overflow — shadow must NOT be on a view with overflow:hidden on iOS)
  <View
    style={[
      {
        width: cardWidth,
        height: CARD_HEIGHT,
        borderRadius: CARD_RADIUS,
        backgroundColor: card.shadowBg,
        shadowColor: '#000',
        shadowOpacity: 0.16,
        shadowRadius: 32,
        shadowOffset: { width: 0, height: 12 },
        elevation: 8,
      },
      style,
    ]}
  >
    {/* Inner gradient: clip only (no shadow, no padding — padding goes on child View) */}
    <LinearGradient
      colors={card.gradientColors}
      start={{ x: 0.314, y: 0.036 }}
      end={{ x: 0.686, y: 0.964 }}
      style={{
        width: cardWidth,
        height: CARD_HEIGHT,
        borderRadius: CARD_RADIUS,
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle — clipped by overflow:hidden above */}
      <View
        style={{
          position: 'absolute',
          width: 120,
          height: 120,
          borderRadius: 60,
          backgroundColor: 'rgba(255,255,255,0.08)',
          top: -32,
          left: cardWidth - 88, // 212/300 ratio scaled
        }}
      />

      {/* All card content lives inside a padded View */}
      <View style={styles.cardBody}>
        {/* Top row */}
        <View style={styles.cardTopRow}>
          <View style={styles.contactlessWrap}>
            <WifiContactlessIcon size={16} color="white" />
          </View>
          <Text style={styles.cardTypeText} allowFontScaling={false}>
            {card.type}
          </Text>
        </View>

        {/* Card number */}
        <Text style={styles.cardNumberText} allowFontScaling={false}>
          {`\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 ${card.lastFour}`}
        </Text>

        {/* Bottom row */}
        <View style={styles.cardBottomRow}>
          <View>
            <Text style={styles.cardLabelText} allowFontScaling={false}>
              Card Holder
            </Text>
            <Text style={styles.cardValueText} allowFontScaling={false}>
              {card.holder}
            </Text>
          </View>
          <View>
            <Text style={styles.cardLabelText} allowFontScaling={false}>
              Expires
            </Text>
            <Text style={styles.cardValueText} allowFontScaling={false}>
              {card.expires}
            </Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  </View>
);

// ── TransactionRow ────────────────────────────────────────────────────────────

interface TransactionRowProps {
  transaction: Transaction;
  isLast: boolean;
  isDark: boolean;
}

const TransactionRow = ({ transaction, isLast, isDark }: TransactionRowProps) => (
  <View>
    <View style={styles.txnRow}>
      <View>
        <Text
          style={[styles.txnName, isDark && styles.txnNameDark]}
          allowFontScaling={false}
        >
          {transaction.name}
        </Text>
        <Text style={styles.txnDate} allowFontScaling={false}>
          {transaction.date}
        </Text>
      </View>
      <Text
        style={[
          styles.txnAmount,
          transaction.positive
            ? styles.txnAmountPos
            : isDark
              ? styles.txnAmountNeutDark
              : styles.txnAmountNeut,
        ]}
        allowFontScaling={false}
      >
        {transaction.amount}
      </Text>
    </View>
    {!isLast && <View style={styles.txnDivider} />}
  </View>
);

// ── Main Screen ───────────────────────────────────────────────────────────────

const WalletOverviewScreen = () => {
  const { isDark } = useTheme();
  const { width: screenWidth } = useWindowDimensions();

  // Scale card width proportionally from the 390pt Figma base
  const cardWidth = Math.round(screenWidth * (300 / 390));

  const handleAddCard = useCallback(() => {}, []);
  const handleSendMoney = useCallback(() => {}, []);
  const handleRequest = useCallback(() => {}, []);
  const handleMoreActivity = useCallback(() => {}, []);

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
            <Text style={styles.headerSub} allowFontScaling={false}>
              My Cards
            </Text>
            <Text
              style={[styles.headerTitle, isDark && styles.headerTitleDark]}
              allowFontScaling={false}
            >
              Wallet
            </Text>
          </View>

          <Pressable
            style={styles.addCardBtn}
            onPress={handleAddCard}
            className="active:opacity-pressed"
            accessibilityLabel="Add new card"
          >
            <PlusIcon size={15} color="white" />
            <Text style={styles.addCardText} allowFontScaling={false}>
              Add Card
            </Text>
          </Pressable>
        </View>

        {/* ── Card Carousel ── */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={cardWidth + CARD_GAP}
          decelerationRate="fast"
          // paddingRight makes the second card peek from the right edge
          contentContainerStyle={{
            paddingLeft: CARD_PADDING_H,
            paddingRight: CARD_PADDING_H,
          }}
          style={styles.cardsScroll}
        >
          {CARDS.map((card, index) => (
            <WalletCard
              key={card.id}
              card={card}
              cardWidth={cardWidth}
              style={index < CARDS.length - 1 ? { marginRight: CARD_GAP } : undefined}
            />
          ))}
        </ScrollView>

        {/* ── Quick Actions ── */}
        <View style={[styles.actionsPanel, isDark && styles.actionsPanelDark]}>
          <Pressable
            style={[
              styles.actionBtn,
              { backgroundColor: isDark ? '#1e3a5f' : '#EFF6FF' },
            ]}
            onPress={handleSendMoney}
            className="active:opacity-pressed"
            accessibilityLabel="Send money"
          >
            <View style={styles.actionIconBlue}>
              <SendArrowIcon size={16} color="white" />
            </View>
            <Text
              style={[styles.actionLabel, isDark && styles.actionLabelDark]}
              allowFontScaling={false}
            >
              {'Send\nMoney'}
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.actionBtn,
              { backgroundColor: isDark ? '#14352a' : '#F0FDF4' },
            ]}
            onPress={handleRequest}
            className="active:opacity-pressed"
            accessibilityLabel="Request money"
          >
            <View style={styles.actionIconGreen}>
              <RequestArrowIcon size={16} color="white" />
            </View>
            <Text
              style={[styles.actionLabel, isDark && styles.actionLabelDark]}
              allowFontScaling={false}
            >
              Request
            </Text>
          </Pressable>
        </View>

        {/* ── Recent Activity ── */}
        <View style={styles.activitySection}>
          <View style={styles.activityHeader}>
            <Text
              style={[styles.activityTitle, isDark && styles.activityTitleDark]}
              allowFontScaling={false}
            >
              Recent Activity
            </Text>
            <Pressable
              style={styles.moreBtn}
              onPress={handleMoreActivity}
              accessibilityLabel="More activity options"
            >
              <DotsHorizontalIcon size={18} color="#9CA3AF" />
            </Pressable>
          </View>

          <View style={[styles.activityCard, isDark && styles.activityCardDark]}>
            {TRANSACTIONS.map((txn, index) => (
              <TransactionRow
                key={txn.id}
                transaction={txn}
                isLast={index === TRANSACTIONS.length - 1}
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

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    marginBottom: 24,
  },
  headerSub: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    color: '#111827',
  },
  headerTitleDark: {
    color: '#F8FAFC',
  },
  addCardBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 36,
  },
  addCardText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#FFFFFF',
  },

  // Card carousel
  cardsScroll: {
    height: 180, // card 172 + 8 for shadow to peek
    flexShrink: 0,
  },

  // Card internals (layout lives inside the gradient via cardBody)
  cardBody: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  contactlessWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTypeText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#FFFFFF',
    letterSpacing: 0.54,
  },
  cardNumberText: {
    fontFamily: 'JetBrainsMono-Medium',
    fontSize: 16,
    lineHeight: 24,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 2.4,
    marginBottom: 16,
  },
  cardBottomRow: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  cardLabelText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: 'rgba(255,255,255,0.55)',
  },
  cardValueText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#FFFFFF',
    marginTop: 2,
  },

  // Quick actions
  actionsPanel: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginHorizontal: 24,
    marginTop: 28,
    padding: 17,
  },
  actionsPanelDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  actionBtn: {
    flex: 1,
    height: 66,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  actionIconBlue: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIconGreen: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#059669',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
    textAlign: 'center',
  },
  actionLabelDark: {
    color: '#F8FAFC',
  },

  // Recent Activity
  activitySection: {
    marginHorizontal: 24,
    marginTop: 24,
    gap: 14,
  },
  activityHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  activityTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#111827',
  },
  activityTitleDark: {
    color: '#F8FAFC',
  },
  moreBtn: {
    padding: 4,
    minWidth: 44,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  activityCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  txnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 69,
  },
  txnName: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  txnNameDark: {
    color: '#F8FAFC',
  },
  txnDate: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
    marginTop: 2,
  },
  txnAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  txnAmountPos: {
    color: '#059669',
  },
  txnAmountNeut: {
    color: '#111827',
  },
  txnAmountNeutDark: {
    color: '#F8FAFC',
  },
  txnDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginHorizontal: 16,
  },
});
