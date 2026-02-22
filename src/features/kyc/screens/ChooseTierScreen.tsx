import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import AppButton from '@components/ui/AppButton';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import ArrowLeftIcon from '@components/ui/icons/ArrowLeftIcon';
import CrownIcon from '@components/ui/icons/CrownIcon';
import type { KYCStackParamList } from '@features/kyc/navigation/KYCNavigator';

type Props = NativeStackScreenProps<KYCStackParamList, 'ChooseTier'>;
type TierKey = 'basic' | 'intermediate' | 'full';

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const FlashIcon18 = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M3 10.5C2.85807 10.5005 2.71892 10.4607 2.59872 10.3852C2.47851 10.3098 2.38218 10.2018 2.32091 10.0737C2.25965 9.94572 2.23597 9.80294 2.25262 9.66199C2.26928 9.52105 2.32559 9.38772 2.415 9.2775L9.84 1.6275C9.8957 1.56321 9.97159 1.51977 10.0552 1.5043C10.1389 1.48883 10.2253 1.50226 10.3003 1.54238C10.3753 1.5825 10.4344 1.64692 10.468 1.72508C10.5016 1.80324 10.5076 1.89049 10.485 1.9725L9.045 6.4875C9.00254 6.60114 8.98828 6.72339 9.00344 6.84376C9.01861 6.96412 9.06275 7.07901 9.13207 7.17857C9.20139 7.27813 9.29383 7.35939 9.40146 7.41537C9.50908 7.47135 9.62868 7.50039 9.75 7.5H15C15.1419 7.49952 15.2811 7.53931 15.4013 7.61477C15.5215 7.69022 15.6178 7.79823 15.6791 7.92626C15.7404 8.05428 15.764 8.19706 15.7474 8.33801C15.7307 8.47895 15.6744 8.61228 15.585 8.7225L8.16 16.3725C8.1043 16.4368 8.02841 16.4802 7.94476 16.4957C7.86112 16.5112 7.77471 16.4977 7.6997 16.4576C7.6247 16.4175 7.56556 16.3531 7.532 16.2749C7.49844 16.1968 7.49244 16.1095 7.515 16.0275L8.955 11.5125C8.99746 11.3989 9.01172 11.2766 8.99656 11.1562C8.98139 11.0359 8.93726 10.921 8.86793 10.8214C8.79861 10.7219 8.70617 10.6406 8.59854 10.5846C8.49092 10.5286 8.37132 10.4996 8.25 10.5H3Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldCheckIcon18 = ({ color }: { color: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M15 9.75C15 13.5 12.375 15.375 9.255 16.4625C9.09162 16.5179 8.91415 16.5152 8.7525 16.455C5.625 15.375 3 13.5 3 9.75V4.5C3 4.30109 3.07902 4.11032 3.21967 3.96967C3.36032 3.82902 3.55109 3.75 3.75 3.75C5.25 3.75 7.125 2.85 8.43 1.71C8.58889 1.57425 8.79102 1.49966 9 1.49966C9.20898 1.49966 9.41111 1.57425 9.57 1.71C10.8825 2.8575 12.75 3.75 14.25 3.75C14.4489 3.75 14.6397 3.82902 14.7803 3.96967C14.921 4.11032 15 4.30109 15 4.5V9.75Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M6.75 9L8.25 10.5L11.25 7.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FeatureCheckIcon = ({ color }: { color: string }) => (
  <Svg width={11} height={11} viewBox="0 0 11 11" fill="none">
    <Path
      d="M5.5 10.0833C8.03131 10.0833 10.0833 8.03131 10.0833 5.5C10.0833 2.96869 8.03131 0.916667 5.5 0.916667C2.96869 0.916667 0.916667 2.96869 0.916667 5.5C0.916667 8.03131 2.96869 10.0833 5.5 10.0833Z"
      stroke={color}
      strokeWidth={0.916667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.125 5.5L5.04167 6.41667L6.875 4.58333"
      stroke={color}
      strokeWidth={0.916667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const RadioSelectedIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
      stroke="white"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 10L9.16667 11.6667L12.5 8.33333"
      stroke="white"
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const InfoCircleIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 14 14" fill="none">
    <Path
      d="M7 12.8333C10.2217 12.8333 12.8333 10.2217 12.8333 7C12.8333 3.77834 10.2217 1.16667 7 1.16667C3.77834 1.16667 1.16667 3.77834 1.16667 7C1.16667 10.2217 3.77834 12.8333 7 12.8333Z"
      stroke="#6B7280"
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 9.33333V7"
      stroke="#6B7280"
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 4.66667H7.00583"
      stroke="#6B7280"
      strokeWidth={1.16667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Tier config ───────────────────────────────────────────────────────────────

interface TierConfig {
  key: TierKey;
  title: string;
  description: string;
  badge?: string;
  iconBg: string;
  accentColor: string;
  selectedCardBg: string;
  limitDailyValue: string;
  limitMonthlyValue: string;
  features: string[];
  buttonLabel: string;
}

const TIERS: TierConfig[] = [
  {
    key: 'basic',
    title: 'Basic',
    description: 'Essential wallet features with standard limits.',
    iconBg: '#F3F4F6',
    accentColor: '#374151',
    selectedCardBg: '#F9FAFB',
    limitDailyValue: '$500',
    limitMonthlyValue: '$2,000',
    features: ['Send & Receive', 'QR Payments', 'Bill Payments'],
    buttonLabel: 'Continue with Basic',
  },
  {
    key: 'intermediate',
    title: 'Intermediate',
    description: 'Enhanced access with increased transaction limits.',
    badge: 'Recommended',
    iconBg: '#EFF6FF',
    accentColor: '#1D4ED8',
    selectedCardBg: '#EFF6FF',
    limitDailyValue: '$5,000',
    limitMonthlyValue: '$20,000',
    features: ['All Basic features', 'Bank Transfers', 'Investment Access'],
    buttonLabel: 'Continue with Intermediate',
  },
  {
    key: 'full',
    title: 'Full Verification',
    description: 'Unrestricted access to all FinWallet capabilities.',
    badge: 'Full Access',
    iconBg: '#FFFBEB',
    accentColor: '#D97706',
    selectedCardBg: '#FFFBEB',
    limitDailyValue: 'Unlimited',
    limitMonthlyValue: 'Unlimited',
    features: ['All Intermediate', 'Crypto Trading', 'Priority Support'],
    buttonLabel: 'Continue with Full Verification',
  },
];

function getTierIcon(key: TierKey) {
  switch (key) {
    case 'basic':
      return <FlashIcon18 color="#6B7280" />;
    case 'intermediate':
      return <ShieldCheckIcon18 color="#2563EB" />;
    case 'full':
      return <CrownIcon size={18} color="#D97706" />;
  }
}

function getFeatureIconColor(key: TierKey, isSelected: boolean): string {
  if (!isSelected) {
    return '#9CA3AF';
  }
  switch (key) {
    case 'basic':
      return '#374151';
    case 'intermediate':
      return '#2563EB';
    case 'full':
      return '#D97706';
  }
}

// ── TierCard component ────────────────────────────────────────────────────────

interface TierCardProps {
  tier: TierConfig;
  isSelected: boolean;
  onPress: () => void;
}

function TierCard({ tier, isSelected, onPress }: TierCardProps) {
  const featureIconColor = getFeatureIconColor(tier.key, isSelected);
  const featureTextColor = isSelected ? '#374151' : '#6B7280';

  return (
    <Pressable
      style={[
        styles.card,
        isSelected
          ? {
              backgroundColor: tier.selectedCardBg,
              borderColor: tier.accentColor,
              shadowColor: '#000',
              shadowOpacity: 0.06,
              shadowRadius: 8,
              shadowOffset: { width: 0, height: 4 },
              elevation: 3,
            }
          : styles.cardInactive,
      ]}
      onPress={onPress}
      accessibilityLabel={`Select ${tier.title} tier`}
    >
      {/* Row 1: Icon + title/desc + radio */}
      <View style={styles.cardRow1}>
        <View style={[styles.iconWrap, { backgroundColor: tier.iconBg }]}>
          {getTierIcon(tier.key)}
        </View>

        <View style={styles.cardTextBlock}>
          <View style={styles.titleRow}>
            <Text style={styles.tierTitle} allowFontScaling={false}>
              {tier.title}
            </Text>
            {tier.badge && (
              <View
                style={[
                  styles.badge,
                  isSelected
                    ? { backgroundColor: tier.accentColor }
                    : styles.badgeInactive,
                ]}
              >
                <Text
                  style={[
                    styles.badgeText,
                    { color: isSelected ? '#FFFFFF' : '#6B7280' },
                  ]}
                  allowFontScaling={false}
                >
                  {tier.badge}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.tierDesc} allowFontScaling={false}>
            {tier.description}
          </Text>
        </View>

        {/* Radio indicator */}
        <View
          style={[
            styles.radio,
            isSelected
              ? { backgroundColor: tier.accentColor }
              : styles.radioInactive,
          ]}
        >
          {isSelected && <RadioSelectedIcon />}
        </View>
      </View>

      {/* Row 2: Limits */}
      <View
        style={[
          styles.limitsRow,
          {
            backgroundColor: isSelected
              ? 'rgba(255,255,255,0.6)'
              : '#F9FAFB',
          },
        ]}
      >
        <View style={styles.limitCol}>
          <Text style={styles.limitLabel} allowFontScaling={false}>
            DAILY LIMIT
          </Text>
          <Text
            style={[
              styles.limitValue,
              { color: isSelected ? tier.accentColor : '#111827' },
            ]}
            allowFontScaling={false}
          >
            {tier.limitDailyValue}
          </Text>
        </View>
        <View style={styles.limitDivider} />
        <View style={styles.limitCol}>
          <Text style={styles.limitLabel} allowFontScaling={false}>
            MONTHLY LIMIT
          </Text>
          <Text
            style={[
              styles.limitValue,
              { color: isSelected ? tier.accentColor : '#111827' },
            ]}
            allowFontScaling={false}
          >
            {tier.limitMonthlyValue}
          </Text>
        </View>
      </View>

      {/* Row 3: Features */}
      <View style={styles.featuresRow}>
        {tier.features.map(f => (
          <View key={f} style={styles.featureItem}>
            <FeatureCheckIcon color={featureIconColor} />
            <Text
              style={[styles.featureText, { color: featureTextColor }]}
              allowFontScaling={false}
            >
              {f}
            </Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}

// ── Screen ────────────────────────────────────────────────────────────────────

export default function ChooseTierScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<TierKey>('intermediate');
  const activeTier = TIERS.find(t => t.key === selected)!;

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="h-header justify-center pl-xl">
          <Pressable
            className="w-10 h-10 rounded-md bg-neutral-100 items-center justify-center active:opacity-pressed"
            onPress={() => navigation.goBack()}
            accessibilityLabel="Go back"
          >
            <ArrowLeftIcon size={20} color="#111827" />
          </Pressable>
        </View>

        {/* Content */}
        <View className="px-xl">
          <Text
            className="font-jakarta-bold text-[26px] text-[#111827]"
            allowFontScaling={false}
          >
            Choose Your Tier
          </Text>
          <Text
            className="font-inter-regular text-[15px] text-[#6B7280] mt-2"
            style={styles.subtitle}
            allowFontScaling={false}
          >
            Select the verification level that suits your needs.
          </Text>

          {/* Tier cards */}
          <View style={styles.cardsContainer}>
            {TIERS.map(tier => (
              <TierCard
                key={tier.key}
                tier={tier}
                isSelected={selected === tier.key}
                onPress={() => setSelected(tier.key)}
              />
            ))}
          </View>

          {/* Learn more */}
          <Pressable
            style={styles.learnMoreBtn}
            className="active:opacity-pressed"
            accessibilityLabel="Learn more about verification tiers"
          >
            <InfoCircleIcon />
            <Text style={styles.learnMoreText} allowFontScaling={false}>
              Learn more about verification tiers
            </Text>
          </Pressable>

          {/* Continue */}
          <View style={styles.continueWrapper}>
            <AppButton
              label={activeTier.buttonLabel}
              onPress={() => console.log('KYC tier selected:', selected)}
            />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 0,
  },
  subtitle: {
    maxWidth: 296,
  },
  cardsContainer: {
    marginTop: 18,
    gap: 12,
  },
  // Card
  card: {
    borderWidth: 2,
    borderRadius: 16,
    paddingTop: 18,
    paddingHorizontal: 18,
    paddingBottom: 12,
    gap: 10,
  },
  cardInactive: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  // Card row 1
  cardRow1: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  cardTextBlock: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  tierTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#111827',
  },
  badge: {
    height: 19,
    borderRadius: 20,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeInactive: {
    backgroundColor: '#E5E7EB',
  },
  badgeText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    lineHeight: 15,
  },
  tierDesc: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
    marginTop: 2,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  radioInactive: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  // Limits row
  limitsRow: {
    height: 58,
    borderRadius: 10,
    paddingTop: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    gap: 8,
  },
  limitCol: {
    flex: 1,
    gap: 2,
  },
  limitLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 10,
    lineHeight: 15,
    color: '#9CA3AF',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },
  limitValue: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 14,
    lineHeight: 21,
  },
  limitDivider: {
    width: 1,
    height: 38,
    backgroundColor: '#E5E7EB',
  },
  // Features row
  featuresRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingBottom: 2,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featureText: {
    fontFamily: 'Inter-Regular',
    fontSize: 11,
    lineHeight: 16.5,
  },
  // Learn more
  learnMoreBtn: {
    height: 42,
    borderRadius: 10,
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    marginTop: 12,
  },
  learnMoreText: {
    fontFamily: 'Inter-Medium',
    fontSize: 13,
    color: '#2563EB',
  },
  // Continue button wrapper
  continueWrapper: {
    paddingTop: 16,
    paddingBottom: 40,
  },
});
