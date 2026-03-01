import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  PanResponder,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 15.8333L4.16667 10L10 4.16667"
      stroke="#374151"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M15.8333 10H4.16667"
      stroke="#374151"
      strokeWidth={1.67}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const CartIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Defs>
      <ClipPath id="cart-clip">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#cart-clip)">
      <Path
        d="M6.66667 18.3333C7.1269 18.3333 7.5 17.9602 7.5 17.5C7.5 17.0398 7.1269 16.6667 6.66667 16.6667C6.20643 16.6667 5.83333 17.0398 5.83333 17.5C5.83333 17.9602 6.20643 18.3333 6.66667 18.3333Z"
        stroke="#2563EB"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M15.8333 18.3333C16.2936 18.3333 16.6667 17.9602 16.6667 17.5C16.6667 17.0398 16.2936 16.6667 15.8333 16.6667C15.3731 16.6667 15 17.0398 15 17.5C15 17.9602 15.3731 18.3333 15.8333 18.3333Z"
        stroke="#2563EB"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.70833 1.70833H3.375L5.59167 12.0583C5.67298 12.4374 5.88389 12.7762 6.18809 13.0165C6.49229 13.2569 6.87076 13.3836 7.25833 13.375H15.4083C15.7876 13.3744 16.1554 13.2444 16.4509 13.0065C16.7463 12.7687 16.9518 12.4371 17.0333 12.0667L18.4083 5.875H4.26667"
        stroke="#2563EB"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const BankIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M2.5 18.3333H17.5" stroke="#059669" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M5 15V9.16667" stroke="#059669" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M8.33333 15V9.16667" stroke="#059669" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11.6667 15V9.16667" stroke="#059669" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15 15V9.16667" stroke="#059669" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M10 1.66667L16.6667 5.83333H3.33333L10 1.66667Z" stroke="#059669" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const GlobeIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Defs>
      <ClipPath id="globe-clip">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#globe-clip)">
      <Path
        d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
        stroke="#7C3AED"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M10 1.66667C7.8602 3.91346 6.66667 6.89728 6.66667 10C6.66667 13.1027 7.8602 16.0865 10 18.3333C12.1398 16.0865 13.3333 13.1027 13.3333 10C13.3333 6.89728 12.1398 3.91346 10 1.66667Z"
        stroke="#7C3AED"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M1.66667 10H18.3333" stroke="#7C3AED" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

// ── Limit Slider ───────────────────────────────────────────────────────────────

interface SliderProps {
  value: number;
  min: number;
  max: number;
  step: number;
  trackColor: string;
  onChange: (v: number) => void;
}

const LimitSlider = React.memo(({ value, min, max, step, trackColor, onChange }: SliderProps) => {
  const trackRef = useRef<View>(null);
  const layoutRef = useRef({ pageX: 0, width: 1 });
  const onChangeRef = useRef(onChange);
  useEffect(() => { onChangeRef.current = onChange; }, [onChange]);

  const measureTrack = useCallback(() => {
    trackRef.current?.measure((_fx, _fy, w, _h, px) => {
      layoutRef.current = { pageX: px, width: w > 0 ? w : 1 };
    });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        layoutRef.current.pageX === 0 && measureTrack();
        const { pageX, width } = layoutRef.current;
        const pct = Math.max(0, Math.min(1, (evt.nativeEvent.pageX - pageX) / width));
        const raw = min + pct * (max - min);
        onChangeRef.current(Math.max(min, Math.min(max, Math.round(raw / step) * step)));
      },
      onPanResponderMove: evt => {
        const { pageX, width } = layoutRef.current;
        const pct = Math.max(0, Math.min(1, (evt.nativeEvent.pageX - pageX) / width));
        const raw = min + pct * (max - min);
        onChangeRef.current(Math.max(min, Math.min(max, Math.round(raw / step) * step)));
      },
    }),
  ).current;

  const fillFlex = Math.max(0.0001, (value - min) / (max - min));
  const remainFlex = Math.max(0.0001, 1 - fillFlex);

  return (
    <View
      ref={trackRef}
      onLayout={measureTrack}
      {...panResponder.panHandlers}
      style={styles.sliderTrack}
      hitSlop={{ top: 14, bottom: 14 }}
    >
      <View style={[styles.sliderFill, { flex: fillFlex, backgroundColor: trackColor }]} />
      <View style={{ flex: remainFlex }} />
    </View>
  );
});

// ── Limit Card ─────────────────────────────────────────────────────────────────

interface LimitCardProps {
  title: string;
  subtitle: string;
  value: number;
  min: number;
  max: number;
  step: number;
  minLabel: string;
  maxLabel: string;
  trackColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  onChange: (v: number) => void;
}

const LimitCard = React.memo(({
  title,
  subtitle,
  value,
  min,
  max,
  step,
  minLabel,
  maxLabel,
  trackColor,
  badgeBg,
  badgeBorder,
  badgeText,
  onChange,
}: LimitCardProps) => {
  const formatted = `$${value.toLocaleString()}`;

  return (
    <View
      className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg px-[20px] pt-[20px] pb-[18px]"
      style={styles.card}
    >
      {/* Header row */}
      <View className="flex-row items-center justify-between mb-[20px]">
        <View>
          <Text
            className="font-jakarta-bold text-[15px] text-[#111827] dark:text-neutral-50 leading-[22.5px]"
            allowFontScaling={false}
          >
            {title}
          </Text>
          <Text
            className="font-inter-regular text-[12px] text-[#9CA3AF] dark:text-neutral-500 leading-[18px]"
            allowFontScaling={false}
          >
            {subtitle}
          </Text>
        </View>
        <View style={[styles.valueBadge, { backgroundColor: badgeBg, borderColor: badgeBorder }]}>
          <Text
            style={{ color: badgeText }}
            className="font-jakarta-bold text-[16px] leading-[24px]"
            allowFontScaling={false}
          >
            {formatted}
          </Text>
        </View>
      </View>

      {/* Slider */}
      <LimitSlider
        value={value}
        min={min}
        max={max}
        step={step}
        trackColor={trackColor}
        onChange={onChange}
      />

      {/* Min / Max labels */}
      <View className="flex-row justify-between mt-[10px]">
        <Text className="font-inter-regular text-[11px] text-[#9CA3AF]" allowFontScaling={false}>
          {minLabel}
        </Text>
        <Text className="font-inter-regular text-[11px] text-[#9CA3AF]" allowFontScaling={false}>
          {maxLabel}
        </Text>
      </View>
    </View>
  );
});

// ── Control Row ────────────────────────────────────────────────────────────────

interface ControlRowProps {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  subtitle: string;
  enabled: boolean;
  onToggle: (v: boolean) => void;
  showDivider?: boolean;
}

const ControlRow = React.memo(({
  icon,
  iconBg,
  title,
  subtitle,
  enabled,
  onToggle,
  showDivider = true,
}: ControlRowProps) => (
  <View>
    <View className="flex-row items-center px-base h-[70px]">
      <View
        className="w-[42px] h-[42px] rounded-[13px] items-center justify-center shrink-0"
        style={{ backgroundColor: iconBg }}
      >
        {icon}
      </View>
      <View className="flex-1 ml-[14px]">
        <Text
          className="font-inter-semibold text-[14px] leading-[21px] text-[#111827] dark:text-neutral-50"
          allowFontScaling={false}
        >
          {title}
        </Text>
        <Text
          className="font-inter-regular text-[12px] leading-[18px] text-[#9CA3AF] dark:text-neutral-500"
          allowFontScaling={false}
        >
          {subtitle}
        </Text>
      </View>
      <Switch
        value={enabled}
        onValueChange={onToggle}
        trackColor={{ false: '#D1D5DB', true: '#2563EB' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#D1D5DB"
        style={{ alignSelf: 'center' }}
      />
    </View>
    {showDivider && (
      <View className="h-divider bg-[#F3F4F6] dark:bg-neutral-700 ml-[72px]" />
    )}
  </View>
));

// ── SpendingLimitsScreen ───────────────────────────────────────────────────────

export default function SpendingLimitsScreen() {
  const navigation = useNavigation<any>();

  const [dailyLimit, setDailyLimit] = useState(2500);
  const [monthlyLimit, setMonthlyLimit] = useState(10000);
  const [onlinePurchases, setOnlinePurchases] = useState(true);
  const [atmWithdrawals, setAtmWithdrawals] = useState(true);
  const [internationalPayments, setInternationalPayments] = useState(false);

  const handleSave = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ───────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl gap-base h-[56px]">
        <Pressable
          className="w-[40px] h-[40px] rounded-md bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 items-center justify-center"
          style={{ minWidth: 44, minHeight: 44 }}
          onPress={() => navigation.goBack()}
          accessibilityLabel="Go back"
        >
          <BackIcon />
        </Pressable>
        <Text
          className="flex-1 font-jakarta-bold text-[18px] text-[#111827] dark:text-neutral-50 leading-[27px]"
          allowFontScaling={false}
        >
          Set Transaction Limits
        </Text>
        <View className="w-[40px]" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 16 }}>
        <View className="px-xl gap-[18px] mt-sm">

          {/* ── Daily Limit ─────────────────────────────────────────── */}
          <LimitCard
            title="Daily Limit"
            subtitle="Maximum spend per day"
            value={dailyLimit}
            min={100}
            max={10000}
            step={100}
            minLabel="$100"
            maxLabel="$10,000"
            trackColor="#2563EB"
            badgeBg="#EFF6FF"
            badgeBorder="#BFDBFE"
            badgeText="#2563EB"
            onChange={setDailyLimit}
          />

          {/* ── Monthly Limit ───────────────────────────────────────── */}
          <LimitCard
            title="Monthly Limit"
            subtitle="Maximum spend per month"
            value={monthlyLimit}
            min={500}
            max={50000}
            step={500}
            minLabel="$500"
            maxLabel="$50,000"
            trackColor="#7C3AED"
            badgeBg="#F5F3FF"
            badgeBorder="#DDD6FE"
            badgeText="#7C3AED"
            onChange={setMonthlyLimit}
          />

          {/* ── Payment Controls ────────────────────────────────────── */}
          <View className="gap-[10px]">
            <Text
              className="font-inter-semibold text-[11px] text-[#9CA3AF] tracking-[0.5px] uppercase"
              allowFontScaling={false}
            >
              PAYMENT CONTROLS
            </Text>

            <View
              className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-lg overflow-hidden"
              style={styles.card}
            >
              <ControlRow
                icon={<CartIcon />}
                iconBg="#EFF6FF"
                title="Online Purchases"
                subtitle="E-commerce & digital payments"
                enabled={onlinePurchases}
                onToggle={setOnlinePurchases}
              />
              <ControlRow
                icon={<BankIcon />}
                iconBg="#F0FDF4"
                title="ATM Withdrawals"
                subtitle="Cash withdrawals worldwide"
                enabled={atmWithdrawals}
                onToggle={setAtmWithdrawals}
              />
              <ControlRow
                icon={<GlobeIcon />}
                iconBg="#F5F3FF"
                title="International Payments"
                subtitle="Cross-border transactions"
                enabled={internationalPayments}
                onToggle={setInternationalPayments}
                showDivider={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Save Changes ─────────────────────────────────────────────── */}
      <View
        className=" px-xl"
        style={styles.footer}
      >
        <Pressable
          className="bg-[#2563EB] h-btn rounded-[14px] items-center justify-center active:opacity-80"
          onPress={handleSave}
          accessibilityLabel="Save transaction limit changes"
        >
          <Text className="font-inter-semibold text-[16px] text-white" allowFontScaling={false}>
            Save Changes
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ──────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  valueBadge: {
    height: 39,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  sliderFill: {
    borderRadius: 4,
  },
  footer: {
    paddingTop: 17,
    paddingBottom: 24,
  },
});
