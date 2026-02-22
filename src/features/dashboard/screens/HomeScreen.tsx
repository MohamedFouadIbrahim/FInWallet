import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type ViewToken,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// ── Inline icons ──────────────────────────────────────────────────────────────

const SearchIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.75 15.75L12.4875 12.4875"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M14.25 12V7.5C14.25 4.6005 12.0495 2.25 9 2.25C5.9505 2.25 3.75 4.6005 3.75 7.5V12L2.25 13.5H15.75L14.25 12Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10.5 15.75C10.5 16.5784 9.82843 17.25 9 17.25C8.17157 17.25 7.5 16.5784 7.5 15.75"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeIcon = ({ color = 'rgba(255,255,255,0.72)' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 3.75C5.25 3.75 2.25 9 2.25 9C2.25 9 5.25 14.25 9 14.25C12.75 14.25 15.75 9 15.75 9C15.75 9 12.75 3.75 9 3.75Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TrendUpIcon = () => (
  <Svg width={12} height={12} viewBox="0 0 12 12" fill="none">
    <Path
      d="M1.5 8.5L4.5 5.5L6.5 7.5L10.5 3.5"
      stroke="#34D399"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8 3.5H10.5V6"
      stroke="#34D399"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const PlusIcon = ({ color = 'white' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 3.33334V12.6667M3.33334 8H12.6667"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const SendActionIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M7 17L17 7M17 7H8M17 7V16"
      stroke="#2563EB"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ReceiveActionIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M17 7L7 17M7 17H16M7 17V8"
      stroke="#059669"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const QRActionIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Rect x={3} y={3} width={7} height={7} rx={1} stroke="#7C3AED" strokeWidth={1.6} />
    <Rect x={14} y={3} width={7} height={7} rx={1} stroke="#7C3AED" strokeWidth={1.6} />
    <Rect x={3} y={14} width={7} height={7} rx={1} stroke="#7C3AED" strokeWidth={1.6} />
    <Path d="M14 14H17M17 14V17M17 17H20M14 17V20M20 17V20" stroke="#7C3AED" strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

const BillsActionIcon = () => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M14 3V7H18"
      stroke="#D97706"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 21H6C4.89543 21 4 20.1046 4 19V5C4 3.89543 4.89543 3 6 3H14L20 9V19C20 20.1046 19.1046 21 18 21Z"
      stroke="#D97706"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M9 13H15M9 17H12" stroke="#D97706" strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

const ArrowRightSmallIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path
      d="M3 7H11M11 7L7.5 3.5M11 7L7.5 10.5"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Transaction category icons
const CoffeeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 9H14V15C14 15.5523 13.5523 16 13 16H5C4.44772 16 4 15.5523 4 15V9Z"
      stroke="#7C3AED"
      strokeWidth={1.4}
    />
    <Path
      d="M14 10H15.5C16.3284 10 17 10.6716 17 11.5V11.5C17 12.3284 16.3284 13 15.5 13H14"
      stroke="#7C3AED"
      strokeWidth={1.4}
    />
    <Path d="M7 7V4M10 7V4" stroke="#7C3AED" strokeWidth={1.4} strokeLinecap="round" />
  </Svg>
);

const HomeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M3 8.5L10 3L17 8.5V17C17 17.5523 16.5523 18 16 18H13V13H7V18H4C3.44772 18 3 17.5523 3 17V8.5Z"
      stroke="#EF4444"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const TransferIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M5 12L9 8L13 12M13 8L9 12"
      stroke="#059669"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M17 6L14 3L11 6M14 3V13" stroke="#059669" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M3 14L6 17L9 14M6 17V7" stroke="#059669" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ShoppingIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M3 4H4.5L6 12H14L15.5 7H5.5"
      stroke="#D97706"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={7} cy={15} r={1} fill="#D97706" />
    <Circle cx={13} cy={15} r={1} fill="#D97706" />
  </Svg>
);

// Promo card icons
const GiftIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Path
      d="M5 13H23V22C23 22.5523 22.5523 23 22 23H6C5.44772 23 5 22.5523 5 22V13Z"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.6}
    />
    <Path
      d="M3 8H25V13H3V8Z"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.6}
    />
    <Path d="M14 8V23" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6} />
    <Path
      d="M14 8C14 8 11 5 14 4C17 3 14 8 14 8Z"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <Path
      d="M14 8C14 8 17 5 14 4C11 3 14 8 14 8Z"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

const PersonAddIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Path
      d="M18 19C18 16.2386 15.3137 14 12 14C8.68629 14 6 16.2386 6 19"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
    <Circle cx={12} cy={9} r={4} stroke="rgba(255,255,255,0.9)" strokeWidth={1.6} />
    <Path d="M21 12V18M18 15H24" stroke="rgba(255,255,255,0.9)" strokeWidth={1.6} strokeLinecap="round" />
  </Svg>
);

const CryptoIcon = () => (
  <Svg width={28} height={28} viewBox="0 0 28 28" fill="none">
    <Circle cx={14} cy={14} r={10} stroke="rgba(255,255,255,0.9)" strokeWidth={1.6} />
    <Path
      d="M11 10H15.5C16.8807 10 18 11.1193 18 12.5V12.5C18 13.8807 16.8807 15 15.5 15H11V10Z"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.4}
    />
    <Path
      d="M11 15H16C17.1046 15 18 15.8954 18 17V17C18 18.1046 17.1046 19 16 19H11V15Z"
      stroke="rgba(255,255,255,0.9)"
      strokeWidth={1.4}
    />
    <Path d="M13 10V8.5M15 10V8.5M13 19V20.5M15 19V20.5" stroke="rgba(255,255,255,0.9)" strokeWidth={1.4} strokeLinecap="round" />
  </Svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

interface Transaction {
  id: string;
  title: string;
  subtitle: string;
  amount: string;
  isCredit: boolean;
  iconBg: string;
  icon: React.ReactNode;
}

interface PromoCard {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  gradient: [string, string];
  icon: React.ReactNode;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const TRANSACTIONS: Transaction[] = [
  {
    id: '1',
    title: 'Starbucks',
    subtitle: 'Today, 9:41 AM',
    amount: '-$6.50',
    isCredit: false,
    iconBg: '#F5F3FF',
    icon: <CoffeeIcon />,
  },
  {
    id: '2',
    title: 'Rent Payment',
    subtitle: 'Today, 8:00 AM',
    amount: '-$1,200.00',
    isCredit: false,
    iconBg: '#FEF2F2',
    icon: <HomeIcon />,
  },
  {
    id: '3',
    title: 'Transfer from John',
    subtitle: 'Yesterday, 6:30 PM',
    amount: '+$500.00',
    isCredit: true,
    iconBg: '#F0FDF4',
    icon: <TransferIcon />,
  },
  {
    id: '4',
    title: 'Amazon',
    subtitle: 'Yesterday, 2:15 PM',
    amount: '-$45.99',
    isCredit: false,
    iconBg: '#FFFBEB',
    icon: <ShoppingIcon />,
  },
];

const PROMO_CARDS: PromoCard[] = [
  {
    id: '1',
    badge: 'Limited Time',
    title: '5% Cashback',
    subtitle: 'On all online payments this week',
    gradient: ['#059669', '#047857'],
    icon: <GiftIcon />,
  },
  {
    id: '2',
    badge: 'New',
    title: 'Refer & Earn',
    subtitle: 'Get $20 for every friend you invite',
    gradient: ['#7C3AED', '#5B21B6'],
    icon: <PersonAddIcon />,
  },
  {
    id: '3',
    badge: 'Live',
    title: 'Crypto Wallet',
    subtitle: 'Trade BTC, ETH & more instantly',
    gradient: ['#F59E0B', '#D97706'],
    icon: <CryptoIcon />,
  },
];

// Weekly spending data (0-1 normalized heights)
const WEEKLY_DATA = [
  { day: 'Mo', height: 0.45, isToday: false },
  { day: 'Tu', height: 0.68, isToday: false },
  { day: 'We', height: 0.57, isToday: false },
  { day: 'Th', height: 0.92, isToday: false },
  { day: 'Fr', height: 0.79, isToday: false },
  { day: 'Sa', height: 0.59, isToday: false },
  { day: 'Su', height: 1.0, isToday: true },
];

// ── PromoCarouselCard ─────────────────────────────────────────────────────────

interface PromoCardProps {
  card: PromoCard;
}

function PromoCarouselCard({ card }: PromoCardProps) {
  return (
    <View
      style={[
        styles.promoCard,
        { backgroundColor: card.gradient[0] },
      ]}
    >
      {/* Decorative circle */}
      <View style={styles.promoCircle} />
      {/* Badge */}
      <View style={styles.promoBadge}>
        <Text style={styles.promoBadgeText} allowFontScaling={false}>
          {card.badge}
        </Text>
      </View>
      {/* Bottom row */}
      <View style={styles.promoBottom}>
        <View style={styles.promoTextWrap}>
          <Text style={styles.promoTitle} allowFontScaling={false}>
            {card.title}
          </Text>
          <Text style={styles.promoSubtitle} allowFontScaling={false}>
            {card.subtitle}
          </Text>
        </View>
        {card.icon}
      </View>
    </View>
  );
}

// ── TransactionRow ─────────────────────────────────────────────────────────────

function TransactionRow({
  item,
  isLast,
}: {
  item: Transaction;
  isLast: boolean;
}) {
  return (
    <View style={styles.txRowWrap}>
      <View style={styles.txRow}>
        <View style={[styles.txIconWrap, { backgroundColor: item.iconBg }]}>
          {item.icon}
        </View>
        <View style={styles.txInfo}>
          <Text style={styles.txTitle} allowFontScaling={false}>
            {item.title}
          </Text>
          <Text style={styles.txSubtitle} allowFontScaling={false}>
            {item.subtitle}
          </Text>
        </View>
        <Text
          style={[
            styles.txAmount,
            { color: item.isCredit ? '#059669' : '#111827' },
          ]}
          allowFontScaling={false}
        >
          {item.amount}
        </Text>
      </View>
      {!isLast && <View style={styles.txDivider} />}
    </View>
  );
}

// ── HomeScreen ────────────────────────────────────────────────────────────────

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [activePromo, setActivePromo] = useState(0);
  const promoRef = useRef<FlatList>(null);

  const onPromoViewableChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setActivePromo(viewableItems[0].index ?? 0);
      }
    },
  ).current;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Header ───────────────────────────────────────────────────── */}
        <View style={styles.header}>
          {/* Avatar */}
          <View style={styles.avatar}>
            <Text style={styles.avatarText} allowFontScaling={false}>
              AC
            </Text>
          </View>
          {/* Greeting */}
          <View style={styles.greetingBlock}>
            <Text style={styles.greetingHi} allowFontScaling={false}>
              Good Morning 👋
            </Text>
            <Text style={styles.greetingName} allowFontScaling={false}>
              Alex Carter
            </Text>
          </View>
          {/* Actions */}
          <View style={styles.headerActions}>
            <Pressable
              style={styles.headerBtn}
              onPress={() => navigation.navigate('Search')}
              accessibilityLabel="Search"
            >
              <SearchIcon />
            </Pressable>
            <Pressable
              style={styles.headerBtn}
              onPress={() => {}}
              accessibilityLabel="Notifications"
            >
              <BellIcon />
              <View style={styles.notifDot} />
            </Pressable>
          </View>
        </View>

        {/* ── Balance card ─────────────────────────────────────────────── */}
        <View style={styles.balanceCardWrap}>
          <View style={styles.balanceCard}>
            {/* Decorative circles */}
            <View style={styles.deco1} />
            <View style={styles.deco2} />
            {/* Top row */}
            <View style={styles.balanceTopRow}>
              <Text style={styles.balanceLabel} allowFontScaling={false}>
                Total Balance
              </Text>
              <Pressable accessibilityLabel="Toggle balance visibility">
                <EyeIcon />
              </Pressable>
            </View>
            {/* Amount */}
            <Text style={styles.balanceAmount} allowFontScaling={false}>
              $12,485.50
            </Text>
            {/* Change row */}
            <View style={styles.changeRow}>
              <View style={styles.changeBadge}>
                <TrendUpIcon />
                <Text style={styles.changeText} allowFontScaling={false}>
                  +$240.00 (2.5%)
                </Text>
              </View>
              <Text style={styles.changeVs} allowFontScaling={false}>
                vs yesterday
              </Text>
            </View>
            {/* Top-up button */}
            <Pressable
              style={styles.topUpBtn}
              className="active:opacity-pressed"
              accessibilityLabel="Top Up Wallet"
            >
              <PlusIcon />
              <Text style={styles.topUpText} allowFontScaling={false}>
                Top Up Wallet
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ── Quick actions ─────────────────────────────────────────────── */}
        <View style={styles.quickActions}>
          {[
            {
              label: 'Send',
              iconBg: '#EFF6FF',
              borderColor: 'rgba(37,99,235,0.1)',
              icon: <SendActionIcon />,
            },
            {
              label: 'Receive',
              iconBg: '#F0FDF4',
              borderColor: 'rgba(5,150,105,0.1)',
              icon: <ReceiveActionIcon />,
            },
            {
              label: 'Scan QR',
              iconBg: '#F5F3FF',
              borderColor: 'rgba(124,58,237,0.1)',
              icon: <QRActionIcon />,
            },
            {
              label: 'Bills',
              iconBg: '#FFFBEB',
              borderColor: 'rgba(245,158,11,0.1)',
              icon: <BillsActionIcon />,
            },
          ].map(action => (
            <Pressable
              key={action.label}
              style={styles.actionBtn}
              className="active:opacity-pressed"
              accessibilityLabel={action.label}
            >
              <View
                style={[
                  styles.actionIconWrap,
                  {
                    backgroundColor: action.iconBg,
                    borderColor: action.borderColor,
                  },
                ]}
              >
                {action.icon}
              </View>
              <Text style={styles.actionLabel} allowFontScaling={false}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Promo carousel ───────────────────────────────────────────── */}
        <View style={styles.promoSection}>
          <FlatList
            ref={promoRef}
            data={PROMO_CARDS}
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH - 48 + 12}
            decelerationRate="fast"
            contentContainerStyle={styles.promoList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <PromoCarouselCard card={item} />}
            onViewableItemsChanged={onPromoViewableChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />
          {/* Dots */}
          <View style={styles.promoDots}>
            {PROMO_CARDS.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.promoDot,
                  i === activePromo
                    ? styles.promoDotActive
                    : styles.promoDotInactive,
                ]}
              />
            ))}
          </View>
        </View>

        {/* ── Recent transactions ──────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle} allowFontScaling={false}>
              Recent Transactions
            </Text>
            <Pressable
              style={styles.seeAllBtn}
              className="active:opacity-pressed"
              accessibilityLabel="See all transactions"
            >
              <Text style={styles.seeAllText} allowFontScaling={false}>
                See All
              </Text>
              <ArrowRightSmallIcon />
            </Pressable>
          </View>
          <View style={styles.txCard}>
            {TRANSACTIONS.map((tx, i) => (
              <TransactionRow
                key={tx.id}
                item={tx}
                isLast={i === TRANSACTIONS.length - 1}
              />
            ))}
          </View>
        </View>

        {/* ── Weekly spending ──────────────────────────────────────────── */}
        <View style={styles.section}>
          <View style={styles.spendCard}>
            <View style={styles.spendHeader}>
              <View>
                <Text style={styles.spendTitle} allowFontScaling={false}>
                  Weekly Spending
                </Text>
                <Text style={styles.spendSubtitle} allowFontScaling={false}>
                  $755.49 spent this week
                </Text>
              </View>
              <View style={styles.weekBadge}>
                <Text style={styles.weekBadgeText} allowFontScaling={false}>
                  This Week
                </Text>
              </View>
            </View>

            {/* Bar chart */}
            <View style={styles.chartWrap}>
              {WEEKLY_DATA.map(item => (
                <View key={item.day} style={styles.barCol}>
                  <View style={styles.barTrack}>
                    <View
                      style={[
                        styles.bar,
                        {
                          height: `${item.height * 100}%` as any,
                          backgroundColor: item.isToday
                            ? '#2563EB'
                            : '#DBEAFE',
                        },
                      ]}
                    />
                  </View>
                  <Text style={styles.barLabel} allowFontScaling={false}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#2563EB' }]} />
                <Text style={styles.legendText} allowFontScaling={false}>
                  Today
                </Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#DBEAFE' }]} />
                <Text style={styles.legendText} allowFontScaling={false}>
                  Past days
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomPad} />
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const CARD_WIDTH = SCREEN_WIDTH - 48;

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 16,
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 4,
    height: 64,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    // Gradient via background (approximated)
    backgroundColor: '#2563EB',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    color: '#FFFFFF',
  },
  greetingBlock: {
    flex: 1,
    marginLeft: 12,
  },
  greetingHi: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
  },
  greetingName: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 17,
    color: '#111827',
    lineHeight: 25.5,
    marginTop: -2,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  notifDot: {
    position: 'absolute',
    top: 9,
    right: 9,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  // Balance card
  balanceCardWrap: {
    paddingHorizontal: 24,
    marginTop: 12,
  },
  balanceCard: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
    backgroundColor: '#2563EB',
    shadowColor: '#2563EB',
    shadowOpacity: 0.32,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  deco1: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -48,
    right: 14,
  },
  deco2: {
    position: 'absolute',
    width: 112,
    height: 112,
    borderRadius: 56,
    backgroundColor: 'rgba(255,255,255,0.04)',
    bottom: -14,
    left: -28,
  },
  balanceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.72)',
    lineHeight: 19.5,
  },
  balanceAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 38,
    color: '#FFFFFF',
    lineHeight: 42,
    letterSpacing: -0.5,
    marginTop: 16,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  changeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(16,185,129,0.22)',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 24,
  },
  changeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    color: '#34D399',
    lineHeight: 16.5,
  },
  changeVs: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 16.5,
  },
  topUpBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 42,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.28)',
    backgroundColor: 'rgba(255,255,255,0.16)',
    marginTop: 24,
    gap: 8,
  },
  topUpText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
    lineHeight: 21,
  },
  // Quick actions
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24,
  },
  actionBtn: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  actionIconWrap: {
    width: 56,
    height: 56,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  actionLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    color: '#374151',
    lineHeight: 18,
  },
  // Promo carousel
  promoSection: {
    marginTop: 24,
    gap: 10,
  },
  promoList: {
    paddingHorizontal: 24,
    gap: 12,
  },
  promoCard: {
    width: CARD_WIDTH,
    height: 127,
    borderRadius: 18,
    padding: 18,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  promoCircle: {
    position: 'absolute',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -24,
    right: 16,
  },
  promoBadge: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderRadius: 20,
    paddingHorizontal: 9,
    height: 21,
    alignSelf: 'flex-start',
    justifyContent: 'center',
  },
  promoBadgeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 10,
    color: '#FFFFFF',
    lineHeight: 15,
  },
  promoBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  promoTextWrap: {
    flex: 1,
    gap: 4,
  },
  promoTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 19,
    color: '#FFFFFF',
    lineHeight: 22.8,
  },
  promoSubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    color: 'rgba(255,255,255,0.78)',
    lineHeight: 16.8,
    maxWidth: 148,
  },
  promoDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  promoDot: {
    height: 6,
    borderRadius: 3,
  },
  promoDotActive: {
    width: 16,
    backgroundColor: '#2563EB',
  },
  promoDotInactive: {
    width: 6,
    backgroundColor: '#D1D5DB',
  },
  // Section
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
    gap: 14,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    color: '#111827',
    lineHeight: 24,
  },
  seeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    color: '#2563EB',
    lineHeight: 19.5,
  },
  // Transactions card
  txCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  txRowWrap: {
    position: 'relative',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 12,
    height: 72,
  },
  txIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  txInfo: {
    flex: 1,
    gap: 2,
  },
  txTitle: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 14,
    color: '#111827',
    lineHeight: 21,
  },
  txSubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    color: '#9CA3AF',
    lineHeight: 18,
  },
  txAmount: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
  },
  txDivider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 72,
  },
  // Weekly spending
  spendCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    padding: 17,
    gap: 4,
  },
  spendHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  spendTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    color: '#111827',
    lineHeight: 22.5,
  },
  spendSubtitle: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 18,
    marginTop: 2,
  },
  weekBadge: {
    backgroundColor: '#EFF6FF',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekBadgeText: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    color: '#2563EB',
    lineHeight: 16.5,
  },
  // Bar chart
  chartWrap: {
    flexDirection: 'row',
    height: 80,
    gap: 4,
    alignItems: 'flex-end',
    paddingTop: 8,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    height: '100%',
  },
  barTrack: {
    flex: 1,
    width: '80%',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '100%',
    borderRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    color: '#9CA3AF',
    lineHeight: 16,
  },
  // Legend
  legend: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 3,
  },
  legendText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 11,
    color: '#6B7280',
    lineHeight: 16.5,
  },
  bottomPad: {
    height: 8,
  },
});
