import React, { useCallback, useRef, useState } from 'react';
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
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import Svg, { Circle, Path, Rect } from 'react-native-svg';
import ScreenWrapper from '@components/layout/ScreenWrapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CARD_WIDTH = 310;
const CARD_HEIGHT = 196;
const CARD_SNAP = CARD_WIDTH + 12;
const CARD_SIDE_PADDING = (SCREEN_WIDTH - CARD_WIDTH) / 2;

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = ({ color = '#111827' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M12.5 15L7.5 10L12.5 5"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SettingsIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M9 11.25C10.2426 11.25 11.25 10.2426 11.25 9C11.25 7.75736 10.2426 6.75 9 6.75C7.75736 6.75 6.75 7.75736 6.75 9C6.75 10.2426 7.75736 11.25 9 11.25Z"
      stroke={color}
      strokeWidth={1.4}
    />
    <Path
      d="M14.55 11.025C14.4375 11.2875 14.4 11.5875 14.4375 11.8125L15.225 13.3875C15.3375 13.65 15.2625 13.9875 15.0375 14.1375L13.7625 14.925C13.5375 15.075 13.2375 15.0375 13.05 14.85L11.9625 13.7625C11.7375 13.5375 11.475 13.4625 11.2125 13.5375L10.875 13.65C10.6125 13.725 10.3875 13.9125 10.275 14.1375L9.7125 15.4125C9.6 15.675 9.3375 15.8625 9.0375 15.8625H7.4625C7.1625 15.8625 6.9 15.675 6.7875 15.4125L6.225 14.1375C6.1125 13.9125 5.8875 13.7625 5.625 13.6875L5.2875 13.575C5.025 13.5 4.7625 13.5375 4.5375 13.7625L3.45 14.85C3.2625 15.0375 2.9625 15.075 2.7375 14.925L1.4625 14.1375C1.2375 13.9875 1.1625 13.65 1.275 13.3875L2.0625 11.8125C2.1 11.5875 2.0625 11.2875 1.95 11.025L1.8375 10.6875C1.7625 10.425 1.575 10.2 1.35 10.0875L0.075 9.525C-0.1875 9.4125 -0.375 9.15 -0.375 8.85V7.275C-0.375 6.975 -0.1875 6.7125 0.075 6.6L1.35 6.0375C1.575 5.925 1.7625 5.7 1.8375 5.4375L1.95 5.1C2.0625 4.8375 2.1 4.5375 2.0625 4.3125L1.275 2.7375C1.1625 2.475 1.2375 2.1375 1.4625 1.9875L2.7375 1.2C2.9625 1.05 3.2625 1.0875 3.45 1.275L4.5375 2.3625C4.7625 2.5875 5.025 2.6625 5.2875 2.5875L5.625 2.475C5.8875 2.4 6.1125 2.2125 6.225 1.9875L6.7875 0.7125C6.9 0.45 7.1625 0.2625 7.4625 0.2625H9.0375C9.3375 0.2625 9.6 0.45 9.7125 0.7125L10.275 1.9875C10.3875 2.2125 10.6125 2.4 10.875 2.475L11.2125 2.5875C11.475 2.6625 11.7375 2.5875 11.9625 2.3625L13.05 1.275C13.2375 1.0875 13.5375 1.05 13.7625 1.2L15.0375 1.9875C15.2625 2.1375 15.3375 2.475 15.225 2.7375L14.4375 4.3125C14.4 4.5375 14.4375 4.8375 14.55 5.1L14.6625 5.4375C14.7375 5.7 14.925 5.925 15.15 6.0375L16.425 6.6C16.6875 6.7125 16.875 6.975 16.875 7.275V8.85C16.875 9.15 16.6875 9.4125 16.425 9.525L15.15 10.0875C14.925 10.2 14.7375 10.425 14.6625 10.6875L14.55 11.025Z"
      stroke={color}
      strokeWidth={1.4}
    />
  </Svg>
);

const CreditCardIcon = ({ color = 'rgba(255,255,255,0.7)' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Rect x={1.5} y={4} width={17} height={12} rx={2} stroke={color} strokeWidth={1.4} />
    <Path d="M1.5 8H18.5" stroke={color} strokeWidth={1.4} />
  </Svg>
);

const WifiIcon = ({ color = 'rgba(255,255,255,0.7)' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M3 7.5C6.86 4.17 13.14 4.17 17 7.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M5.5 10.5C7.9 8.5 12.1 8.5 14.5 10.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M8.5 13.5C9.4 12.83 10.6 12.83 11.5 13.5" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Circle cx={10} cy={16} r={1} fill={color} />
  </Svg>
);

const FlipIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M2.667 10.667L4 12l1.333-1.333M4 12V5.333a2.667 2.667 0 0 1 5.333 0v5.334a2.667 2.667 0 0 0 5.334 0V4"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const SmartphoneIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Rect x={3.5} y={1} width={9} height={14} rx={2} stroke={color} strokeWidth={1.4} />
    <Path d="M7 12.5H9" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </Svg>
);

const CopyIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Rect x={6} y={6} width={10} height={10} rx={2} stroke={color} strokeWidth={1.4} />
    <Path
      d="M6 12H4C3.44772 12 3 11.5523 3 11V4C3 3.44772 3.44772 3 4 3H11C11.5523 3 12 3.44772 12 4V6"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
  </Svg>
);

const ChevronRight = ({ color = '#9CA3AF' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 4L10 8L6 12"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Management item icons
const LockIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Rect x={3} y={9} width={14} height={10} rx={2} stroke={color} strokeWidth={1.4} />
    <Path
      d="M6 9V6C6 3.79086 7.79086 2 10 2C12.2091 2 14 3.79086 14 6V9"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
    />
    <Circle cx={10} cy={14} r={1.5} fill={color} />
  </Svg>
);

const SlidersIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M3 5H17" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M3 10H17" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M3 15H17" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Circle cx={7} cy={5} r={2} fill={color} />
    <Circle cx={13} cy={10} r={2} fill={color} />
    <Circle cx={7} cy={15} r={2} fill={color} />
  </Svg>
);

const PackageIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M17 13.8L10 17.5L3 13.8V6.2L10 2.5L17 6.2V13.8Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M10 17.5V10" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M3 6.2L10 10L17 6.2" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M6.5 4.35L13.5 8.05" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </Svg>
);

const ReceiptIcon = ({ color = '#D97706' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M4 3H16V17L13 15.5L10 17L7 15.5L4 17V3Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M7 7H13" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M7 10H13" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M7 13H11" stroke={color} strokeWidth={1.4} strokeLinecap="round" />
  </Svg>
);

const ShieldIcon = ({ color = '#EF4444' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2L17 5V10C17 14 13.5 17.5 10 18C6.5 17.5 3 14 3 10V5L10 2Z"
      stroke={color}
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M7.5 10L9 11.5L12.5 8" stroke={color} strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────

interface CardData {
  id: string;
  type: 'debit' | 'credit';
  label: string;
  gradient: [string, string];
  number: string;
  fullNumber: string;
  holder: string;
  expires: string;
  cvv: string;
  balance: number;
  network: 'visa' | 'mastercard';
}

interface ManagementItem {
  id: string;
  title: string;
  subtitle: string;
  iconBg: string;
  icon: React.ReactNode;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const CARDS: CardData[] = [
  {
    id: '1',
    type: 'debit',
    label: 'DEBIT CARD',
    gradient: ['#2563EB', '#1E3A8A'],
    number: '8294',
    fullNumber: '4532 7612 3456 8294',
    holder: 'ALEX CARTER',
    expires: '09/28',
    cvv: '847',
    balance: 5840.0,
    network: 'visa',
  },
  {
    id: '2',
    type: 'credit',
    label: 'CREDIT CARD',
    gradient: ['#7C3AED', '#5B21B6'],
    number: '4517',
    fullNumber: '5412 7534 9087 4517',
    holder: 'ALEX CARTER',
    expires: '03/27',
    cvv: '312',
    balance: 8500.0,
    network: 'mastercard',
  },
  {
    id: '3',
    type: 'debit',
    label: 'DEBIT CARD',
    gradient: ['#059669', '#047857'],
    number: '6103',
    fullNumber: '4916 3825 7401 6103',
    holder: 'ALEX CARTER',
    expires: '11/27',
    cvv: '559',
    balance: 3200.0,
    network: 'visa',
  },
];

const MANAGEMENT_ITEMS: ManagementItem[] = [
  {
    id: 'controls',
    title: 'Card Controls',
    subtitle: 'Freeze, report or replace',
    iconBg: '#EFF6FF',
    icon: <LockIcon />,
  },
  {
    id: 'limits',
    title: 'Spending Limits',
    subtitle: 'Set daily & monthly limits',
    iconBg: '#F5F3FF',
    icon: <SlidersIcon />,
  },
  {
    id: 'physical',
    title: 'Physical Card',
    subtitle: 'Order or track your card',
    iconBg: '#F0FDF4',
    icon: <PackageIcon />,
  },
  {
    id: 'transactions',
    title: 'Transactions',
    subtitle: 'View card activity',
    iconBg: '#FFFBEB',
    icon: <ReceiptIcon />,
  },
  {
    id: 'pin',
    title: 'PIN & Security',
    subtitle: 'Change or view your PIN',
    iconBg: '#FEF2F2',
    icon: <ShieldIcon />,
  },
];

// ── CardFront ──────────────────────────────────────────────────────────────────

function CardFront({ card }: { card: CardData }) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: card.gradient[0] },
      ]}
    >
      {/* Background gradient overlay */}
      <View style={[StyleSheet.absoluteFill, styles.cardGradientOverlay, { backgroundColor: card.gradient[1] }]} />
      {/* Decorative circles */}
      <View style={styles.cardCircle1} />
      <View style={styles.cardCircle2} />

      {/* Card type row */}
      <View className="flex-row items-center justify-between mb-auto">
        <View className="flex-row items-center gap-sm">
          <CreditCardIcon />
          <Text
            className="font-inter-semibold text-[12px] text-[rgba(255,255,255,0.7)] tracking-[1px]"
            allowFontScaling={false}
          >
            {card.label}
          </Text>
        </View>
        {/* NFC icon rotated 90° */}
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <WifiIcon />
        </View>
      </View>

      {/* Chip */}
      <View style={styles.chip} />

      {/* Card number */}
      <Text className="font-mono text-[16px] text-white tracking-[3px] mt-sm" allowFontScaling={false}>
        {`•••• •••• •••• ${card.number}`}
      </Text>

      {/* Bottom row */}
      <View className="flex-row items-end justify-between mt-sm">
        <View>
          <Text
            className="font-inter-regular text-[10px] text-[rgba(255,255,255,0.5)] uppercase"
            allowFontScaling={false}
          >
            CARD HOLDER
          </Text>
          <Text
            className="font-inter-semibold text-[13px] text-white tracking-[0.5px]"
            allowFontScaling={false}
          >
            {card.holder}
          </Text>
        </View>

        <View className="items-end">
          <Text
            className="font-inter-regular text-[10px] text-[rgba(255,255,255,0.5)]"
            allowFontScaling={false}
          >
            EXPIRES
          </Text>
          <Text className="font-mono font-bold text-[13px] text-white" allowFontScaling={false}>
            {card.expires}
          </Text>
        </View>

        {/* Network logo */}
        {card.network === 'visa' ? (
          <Text
            className="font-inter-semibold italic text-[18px] text-white tracking-[1px]"
            allowFontScaling={false}
          >
            VISA
          </Text>
        ) : (
          <View style={styles.mastercardWrap}>
            <View style={[styles.mastercardCircle, { backgroundColor: 'rgba(235,0,27,0.85)' }]} />
            <View style={[styles.mastercardCircle, styles.mastercardCircle2, { backgroundColor: 'rgba(255,159,0,0.85)' }]} />
          </View>
        )}
      </View>
    </View>
  );
}

// ── CardBack ───────────────────────────────────────────────────────────────────

function CardBack({ card }: { card: CardData }) {
  return (
    <View
      style={[
        styles.card,
        { backgroundColor: card.gradient[0] },
      ]}
    >
      <View style={[StyleSheet.absoluteFill, styles.cardGradientOverlay, { backgroundColor: card.gradient[1] }]} />
      <View style={styles.cardCircle1} />
      <View style={styles.cardCircle2} />

      {/* Magnetic stripe */}
      <View style={styles.magneticStripe} />

      {/* Signature strip + CVV */}
      <View style={styles.signatureStrip}>
        <View className="flex-1 justify-center pl-sm">
          <Text className="font-inter-regular text-[9px] text-[rgba(255,255,255,0.4)]" numberOfLines={2} allowFontScaling={false}>
            {'Authorized signatures not valid unless signed'}
          </Text>
        </View>
        <View className="bg-[rgba(255,255,255,0.9)] w-[48px] h-full items-center justify-center rounded-r-sm">
          <Text className="font-mono font-bold text-[14px] text-[#111827] tracking-[2px]" allowFontScaling={false}>
            {card.cvv}
          </Text>
        </View>
      </View>

      {/* Card number on back */}
      <View className="mt-sm">
        <Text
          className="font-inter-regular text-[10px] text-[rgba(255,255,255,0.5)] text-right"
          allowFontScaling={false}
        >
          CARD NUMBER
        </Text>
        <Text
          className="font-mono text-[14px] text-white tracking-[2px] text-right mt-xxs"
          allowFontScaling={false}
        >
          {card.fullNumber}
        </Text>
      </View>

      {/* Expiry on back */}
      {/* <View className="items-end mt-xs">
        <Text
          className="font-inter-regular text-[10px] text-[rgba(255,255,255,0.5)]"
          allowFontScaling={false}
        >
          EXPIRY
        </Text>
        <Text className="font-mono font-bold text-[13px] text-white" allowFontScaling={false}>
          {card.expires}
        </Text>
      </View> */}
    </View>
  );
}

// ── FlipCard ───────────────────────────────────────────────────────────────────

interface FlipCardProps {
  card: CardData;
  isFlipped: boolean;
}

function FlipCard({ card, isFlipped }: FlipCardProps) {
  const rotate = useSharedValue(isFlipped ? 180 : 0);

  React.useEffect(() => {
    rotate.value = withTiming(isFlipped ? 180 : 0, { duration: 480 });
  }, [isFlipped, rotate]);

  const frontStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(rotate.value, [0, 180], [0, 180])}deg` }],
    backfaceVisibility: 'hidden',
  }));

  const backStyle = useAnimatedStyle(() => ({
    transform: [{ perspective: 1000 }, { rotateY: `${interpolate(rotate.value, [0, 180], [180, 360])}deg` }],
    backfaceVisibility: 'hidden',
    position: 'absolute' as const,
    top: 0,
    left: 0,
  }));

  return (
    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
      <Animated.View style={frontStyle}>
        <CardFront card={card} />
      </Animated.View>
      <Animated.View style={backStyle}>
        <CardBack card={card} />
      </Animated.View>
    </View>
  );
}

// ── ManagementRow ──────────────────────────────────────────────────────────────

function ManagementRow({ item, isLast, onPress }: { item: ManagementItem; isLast: boolean; onPress?: () => void }) {
  return (
    <View>
      <Pressable
        className="flex-row items-center px-base gap-[14px] h-[70px] active:bg-neutral-50"
        accessibilityLabel={item.title}
        onPress={onPress}
      >
        <View
          className="w-[42px] h-[42px] rounded-[13px] items-center justify-center shrink-0"
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
        <ChevronRight />
      </Pressable>
      {!isLast && <View className="h-divider bg-[#F3F4F6] dark:bg-neutral-700 ml-[72px]" />}
    </View>
  );
}

// ── MyCardsScreen ──────────────────────────────────────────────────────────────

export default function MyCardsScreen() {
  const navigation = useNavigation<any>();
  const [activeIndex, setActiveIndex] = useState(2);
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const listRef = useRef<FlatList>(null);

  const activeCard = CARDS[activeIndex];

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
  ).current;

  const handleFlip = useCallback(() => {
    setFlippedCards(prev => ({
      ...prev,
      [activeCard.id]: !prev[activeCard.id],
    }));
  }, [activeCard.id]);

  const renderCard = useCallback(
    ({ item }: { item: CardData }) => (
      <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
        <FlipCard card={item} isFlipped={flippedCards[item.id] ?? false} />
      </View>
    ),
    [flippedCards],
  );

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl gap-base h-[56px]">
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center"
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          <BackIcon />
        </Pressable>
        <Text
          className="flex-1 font-jakarta-bold text-[18px] text-[#111827] dark:text-neutral-50 leading-[27px]"
          allowFontScaling={false}
        >
          My Cards
        </Text>
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center"
          accessibilityLabel="Card settings"
          style={{ minWidth: 44, minHeight: 44 }}
        >
          <SettingsIcon />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* ── Card Carousel ──────────────────────────────────────────────── */}
        <View className="mt-md gap-md">
          <FlatList
            ref={listRef}
            data={CARDS}
            horizontal
            pagingEnabled={false}
            showsHorizontalScrollIndicator={false}
            snapToInterval={CARD_SNAP}
            decelerationRate="fast"
            contentContainerStyle={{ paddingHorizontal: CARD_SIDE_PADDING, gap: 12 }}
            keyExtractor={item => item.id}
            renderItem={renderCard}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
            initialScrollIndex={2}
            getItemLayout={(_, index) => ({
              length: CARD_SNAP,
              offset: CARD_SNAP * index,
              index,
            })}
          />

          {/* Dots */}
          <View className="flex-row justify-center gap-[6px]">
            {CARDS.map((_, i) => (
              <View
                key={i}
                className="h-[6px] rounded-full"
                style={{
                  width: i === activeIndex ? 18 : 6,
                  backgroundColor: i === activeIndex ? '#2563EB' : '#D1D5DB',
                }}
              />
            ))}
          </View>
        </View>

        {/* ── Action Buttons ─────────────────────────────────────────────── */}
        <View className="flex-row px-xl mt-xl gap-[10px]">
          <Pressable
            className="flex-1 h-[44px] bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-md flex-row items-center justify-center gap-sm active:opacity-pressed"
            onPress={handleFlip}
            accessibilityLabel="Flip card"
          >
            <FlipIcon />
            <Text className="font-inter-semibold text-[13px] text-[#374151] dark:text-neutral-200" allowFontScaling={false}>
              Flip Card
            </Text>
          </Pressable>
          <Pressable
            className="flex-1 h-[44px] bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-md flex-row items-center justify-center gap-sm active:opacity-pressed"
            accessibilityLabel="Add to wallet"
          >
            <SmartphoneIcon />
            <Text className="font-inter-semibold text-[13px] text-[#374151] dark:text-neutral-200" allowFontScaling={false}>
              Add to Wallet
            </Text>
          </Pressable>
          <Pressable
            className="w-[44px] h-[44px] bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-md items-center justify-center active:opacity-pressed"
            accessibilityLabel="Copy card number"
          >
            <CopyIcon />
          </Pressable>
        </View>

        {/* ── Available Balance ───────────────────────────────────────────── */}
        <View className="px-xl mt-xl">
          <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg px-[21px] pt-[17px] pb-[4px]">
            <View className="flex-row items-center justify-between h-[61px]">
              <View>
                <Text className="font-inter-regular text-small leading-[18px] text-[#9CA3AF] dark:text-neutral-500" allowFontScaling={false}>
                  Available Balance
                </Text>
                <Text
                  className="font-jakarta-bold text-[26px] text-[#111827] dark:text-neutral-50 tracking-[-0.5px] leading-[39px]"
                  allowFontScaling={false}
                >
                  {`$${activeCard.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                </Text>
              </View>
              <View className="bg-info-50 rounded-full w-[56px] h-[36px] items-center justify-center">
                <Text className="font-inter-semibold text-caption text-info-600 uppercase" allowFontScaling={false}>
                  {activeCard.type}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ── Card Management ─────────────────────────────────────────────── */}
        <View className="px-xl mt-xl gap-[10px]">
          <Text
            className="font-inter-semibold text-caption text-[#9CA3AF] tracking-[0.5px] uppercase"
            allowFontScaling={false}
          >
            CARD MANAGEMENT
          </Text>
          <View className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg overflow-hidden">
            {MANAGEMENT_ITEMS.map((item, i) => (
              <ManagementRow
                key={item.id}
                item={item}
                isLast={i === MANAGEMENT_ITEMS.length - 1}
                onPress={() => {
                  if (item.id === 'controls') {
                    navigation.navigate('CardControls');
                  } else if (item.id === 'limits') {
                    navigation.navigate('SpendingLimits');
                  } else if (item.id === 'physical') {
                    navigation.navigate('PhysicalCard');
                  } else if (item.id === 'transactions') {
                    navigation.navigate('CardTransactions');
                  } else if (item.id === 'pin') {
                    navigation.navigate('CardPin');
                  }
                }}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
  cardGradientOverlay: {
    opacity: 0.6,
  },
  cardCircle1: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.06)',
    top: -30,
    right: 20,
  },
  cardCircle2: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255,255,255,0.04)',
    top: 136,
    left: -20,
  },
  chip: {
    width: 42,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212,168,75,0.5)',
    backgroundColor: '#D4A84B',
    marginTop: 24,
  },
  magneticStripe: {
    position: 'absolute',
    top: 28,
    left: 0,
    right: 0,
    height: 44,
    backgroundColor: '#1a1a2e',
  },
  signatureStrip: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    height: 36,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 84,
  },
  mastercardWrap: {
    width: 40,
    height: 24,
    position: 'relative',
  },
  mastercardCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mastercardCircle2: {
    left: 16,
  },
});
