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

// ── Computed layout constant ───────────────────────────────────────────────────

const CARD_WIDTH = SCREEN_WIDTH - 48;

// ── PromoCarouselCard ─────────────────────────────────────────────────────────

interface PromoCardProps {
  card: PromoCard;
}

function PromoCarouselCard({ card }: PromoCardProps) {
  return (
    <View
      className="h-[127px] rounded-[18px] p-[18px] overflow-hidden justify-between"
      style={{ width: CARD_WIDTH, backgroundColor: card.gradient[0] }}
    >
      {/* Decorative circle */}
      <View className="absolute w-[88px] h-[88px] rounded-full bg-[rgba(255,255,255,0.1)] -top-[24px] right-base" />
      {/* Badge */}
      <View className="bg-[rgba(255,255,255,0.22)] rounded-full px-[9px] h-[21px] self-start justify-center">
        <Text className="font-inter-semibold text-[10px] text-white leading-[15px]" allowFontScaling={false}>
          {card.badge}
        </Text>
      </View>
      {/* Bottom row */}
      <View className="flex-row items-end justify-between">
        <View className="flex-1 gap-xs">
          <Text className="font-jakarta-bold text-[19px] text-white leading-[22.8px]" allowFontScaling={false}>
            {card.title}
          </Text>
          <Text
            className="font-inter-regular text-small text-[rgba(255,255,255,0.78)] leading-[16.8px]"
            style={{ maxWidth: 148 }}
            allowFontScaling={false}
          >
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
    <View className="relative">
      <View className="flex-row items-center px-base gap-md h-[72px]">
        <View
          className="w-[44px] h-[44px] rounded-[14px] items-center justify-center shrink-0"
          style={{ backgroundColor: item.iconBg }}
        >
          {item.icon}
        </View>
        <View className="flex-1 gap-[2px]">
          <Text className="font-inter-semibold text-body leading-[21px] text-[#111827] dark:text-neutral-50" allowFontScaling={false}>
            {item.title}
          </Text>
          <Text className="font-inter-regular text-small leading-[18px] text-[#9CA3AF] dark:text-neutral-500" allowFontScaling={false}>
            {item.subtitle}
          </Text>
        </View>
        <Text
          className="font-jakarta-bold text-[15px] leading-[22.5px]"
          style={{ color: item.isCredit ? '#059669' : '#111827' }}
          allowFontScaling={false}
        >
          {item.amount}
        </Text>
      </View>
      {!isLast && <View className="h-divider bg-[#F3F4F6] ml-[72px]" />}
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
        contentContainerStyle={{ paddingBottom: 16 }}
      >
        {/* ── Header ───────────────────────────────────────────────────── */}
        <View className="flex-row items-center px-xl pt-[10px] pb-xs h-[64px]">
          {/* Avatar */}
          <View className="w-[44px] h-[44px] rounded-[14px] items-center justify-center bg-info-600">
            <Text className="font-jakarta-bold text-[15px] text-white" allowFontScaling={false}>
              AC
            </Text>
          </View>
          {/* Greeting */}
          <View className="flex-1 ml-md">
            <Text className="font-inter-regular text-small leading-[18px] text-[#6B7280]" allowFontScaling={false}>
              Good Morning 👋
            </Text>
            <Text className="font-jakarta-bold text-[17px] text-[#111827] leading-[25.5px] -mt-[2px]" allowFontScaling={false}>
              Alex Carter
            </Text>
          </View>
          {/* Actions */}
          <View className="flex-row gap-sm">
            <Pressable
              className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center relative"
              onPress={() => navigation.navigate('Search')}
              accessibilityLabel="Search"
            >
              <SearchIcon />
            </Pressable>
            <Pressable
              className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center relative"
              onPress={() => {}}
              accessibilityLabel="Notifications"
            >
              <BellIcon />
              <View className="absolute top-[9px] right-[9px] w-[8px] h-[8px] rounded-full bg-error-500 border-2 border-white" />
            </Pressable>
          </View>
        </View>

        {/* ── Balance card ─────────────────────────────────────────────── */}
        <View className="px-xl mt-md">
          <View
            className="rounded-2xl p-xl overflow-hidden bg-info-600"
            style={styles.balanceCard}
          >
            {/* Decorative circles */}
            <View className="absolute w-[168px] h-[168px] rounded-full bg-[rgba(255,255,255,0.06)] -top-[48px] right-[14px]" />
            <View className="absolute w-[112px] h-[112px] rounded-full bg-[rgba(255,255,255,0.04)] -bottom-[14px] -left-[28px]" />
            {/* Top row */}
            <View className="flex-row items-center justify-between">
              <Text className="font-inter-medium text-[13px] text-[rgba(255,255,255,0.72)] leading-[19.5px]" allowFontScaling={false}>
                Total Balance
              </Text>
              <Pressable accessibilityLabel="Toggle balance visibility">
                <EyeIcon />
              </Pressable>
            </View>
            {/* Amount */}
            <Text className="font-jakarta-bold text-[38px] text-white leading-[42px] tracking-[-0.5px] mt-base" allowFontScaling={false}>
              $12,485.50
            </Text>
            {/* Change row */}
            <View className="flex-row items-center gap-sm mt-base">
              <View className="flex-row items-center gap-xs bg-[rgba(16,185,129,0.22)] rounded-full px-[10px] h-[24px]">
                <TrendUpIcon />
                <Text className="font-inter-semibold text-caption leading-[16.5px] text-success-400" allowFontScaling={false}>
                  +$240.00 (2.5%)
                </Text>
              </View>
              <Text className="font-inter-regular text-caption leading-[16.5px] text-[rgba(255,255,255,0.5)]" allowFontScaling={false}>
                vs yesterday
              </Text>
            </View>
            {/* Top-up button */}
            <Pressable
              className="flex-row items-center justify-center h-[42px] rounded-md border border-[rgba(255,255,255,0.28)] bg-[rgba(255,255,255,0.16)] mt-xl gap-sm active:opacity-pressed"
              accessibilityLabel="Top Up Wallet"
            >
              <PlusIcon />
              <Text className="font-inter-semibold text-body leading-[21px] text-white" allowFontScaling={false}>
                Top Up Wallet
              </Text>
            </Pressable>
          </View>
        </View>

        {/* ── Quick actions ─────────────────────────────────────────────── */}
        <View className="flex-row justify-between px-xl mt-xl">
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
              className="flex-1 items-center gap-sm active:opacity-pressed"
              accessibilityLabel={action.label}
              onPress={
                action.label === 'Send'
                  ? () => navigation.navigate('SendMoney')
                  : action.label === 'Receive'
                    ? () => navigation.navigate('ReceiveMoney')
                    : undefined
              }
            >
              <View
                className="w-[56px] h-[56px] rounded-[18px] border items-center justify-center"
                style={[
                  styles.actionIconWrap,
                  { backgroundColor: action.iconBg, borderColor: action.borderColor },
                ]}
              >
                {action.icon}
              </View>
              <Text className="font-inter-medium text-small leading-[18px] text-[#374151]" allowFontScaling={false}>
                {action.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* ── Promo carousel ───────────────────────────────────────────── */}
        <View className="mt-xl gap-[10px]">
          <FlatList
            ref={promoRef}
            data={PROMO_CARDS}
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={SCREEN_WIDTH - 48 + 12}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: 24, gap: 12 }}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <PromoCarouselCard card={item} />}
            onViewableItemsChanged={onPromoViewableChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />
          {/* Dots */}
          <View className="flex-row justify-center gap-[5px]">
            {PROMO_CARDS.map((_, i) => (
              <View
                key={i}
                className="h-[6px] rounded-full"
                style={{
                  width: i === activePromo ? 16 : 6,
                  backgroundColor: i === activePromo ? '#2563EB' : '#D1D5DB',
                }}
              />
            ))}
          </View>
        </View>

        {/* ── Recent transactions ──────────────────────────────────────── */}
        <View className="px-xl mt-xl gap-[14px]">
          <View className="flex-row items-center justify-between">
            <Text className="font-jakarta-bold text-h4 leading-[24px] text-[#111827] dark:text-neutral-50" allowFontScaling={false}>
              Recent Transactions
            </Text>
            <Pressable
              className="flex-row items-center gap-[2px] active:opacity-pressed"
              accessibilityLabel="See all transactions"
            >
              <Text className="font-inter-medium text-[13px] leading-[19.5px] text-info-600" allowFontScaling={false}>
                See All
              </Text>
              <ArrowRightSmallIcon />
            </Pressable>
          </View>
          <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg overflow-hidden">
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
        <View className="px-xl mt-xl gap-[14px]">
          <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg p-[17px] gap-xs">
            <View className="flex-row items-start justify-between mb-sm">
              <View>
                <Text className="font-jakarta-bold text-[15px] text-[#111827] dark:text-neutral-50 leading-[22.5px]" allowFontScaling={false}>
                  Weekly Spending
                </Text>
                <Text className="font-inter-regular text-small leading-[18px] text-[#6B7280] dark:text-neutral-400 mt-xxs" allowFontScaling={false}>
                  $755.49 spent this week
                </Text>
              </View>
              <View className="bg-info-50 rounded-full px-[10px] h-[32px] items-center justify-center">
                <Text className="font-inter-semibold text-caption leading-[16.5px] text-info-600" allowFontScaling={false}>
                  This Week
                </Text>
              </View>
            </View>

            {/* Bar chart */}
            <View className="flex-row h-[80px] gap-xs items-end pt-sm">
              {WEEKLY_DATA.map(item => (
                <View key={item.day} className="flex-1 items-center gap-xs h-full">
                  <View className="flex-1 w-[80%] justify-end">
                    <View
                      className="w-full rounded-xs"
                      style={{
                        minHeight: 4,
                        height: `${item.height * 100}%` as any,
                        backgroundColor: item.isToday ? '#2563EB' : '#DBEAFE',
                      }}
                    />
                  </View>
                  <Text className="font-inter-regular text-caption leading-[16px] text-[#9CA3AF] dark:text-neutral-500" allowFontScaling={false}>
                    {item.day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Legend */}
            <View className="flex-row gap-base justify-end mt-sm">
              <View className="flex-row items-center gap-[5px]">
                <View className="w-[10px] h-[10px] rounded-[3px]" style={{ backgroundColor: '#2563EB' }} />
                <Text className="font-inter-regular text-caption leading-[16.5px] text-[#6B7280] dark:text-neutral-400" allowFontScaling={false}>
                  Today
                </Text>
              </View>
              <View className="flex-row items-center gap-[5px]">
                <View className="w-[10px] h-[10px] rounded-[3px]" style={{ backgroundColor: '#DBEAFE' }} />
                <Text className="font-inter-regular text-caption leading-[16.5px] text-[#6B7280] dark:text-neutral-400" allowFontScaling={false}>
                  Past days
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View className="h-sm" />
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles — shadows only (not supported by NativeWind on React Native) ────────

const styles = StyleSheet.create({
  balanceCard: {
    shadowColor: '#2563EB',
    shadowOpacity: 0.32,
    shadowRadius: 40,
    shadowOffset: { width: 0, height: 16 },
    elevation: 12,
  },
  actionIconWrap: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
});
