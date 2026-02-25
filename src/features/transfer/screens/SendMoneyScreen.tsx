import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, G, Rect, Defs, ClipPath, Circle } from 'react-native-svg';

import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';
import { useTheme } from '@theme/useTheme';

// ── Types ─────────────────────────────────────────────────────────────────────

type TransferType = 'wallet' | 'bank' | 'contact' | 'international';

// ── Inline icons ──────────────────────────────────────────────────────────────

const CloseXIcon = ({ color = '#374151' }: { color?: string }) => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path
      d="M15 5L5 15"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 5L15 15"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const WalletUserIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path
      d="M17.4167 6.41667V3.66667C17.4167 3.42355 17.3201 3.19039 17.1482 3.01849C16.9763 2.84658 16.7431 2.75 16.5 2.75H4.58333C4.0971 2.75 3.63079 2.94315 3.28697 3.28697C2.94315 3.63079 2.75 4.0971 2.75 4.58333C2.75 5.06956 2.94315 5.53588 3.28697 5.8797C3.63079 6.22351 4.0971 6.41667 4.58333 6.41667H18.3333C18.5764 6.41667 18.8096 6.51324 18.9815 6.68515C19.1534 6.85706 19.25 7.09022 19.25 7.33333V11M19.25 11H16.5C16.0138 11 15.5475 11.1932 15.2036 11.537C14.8598 11.8808 14.6667 12.3471 14.6667 12.8333C14.6667 13.3196 14.8598 13.7859 15.2036 14.1297C15.5475 14.4735 16.0138 14.6667 16.5 14.6667H19.25C19.4931 14.6667 19.7263 14.5701 19.8982 14.3982C20.0701 14.2263 20.1667 13.9931 20.1667 13.75V11.9167C20.1667 11.6736 20.0701 11.4404 19.8982 11.2685C19.7263 11.0966 19.4931 11 19.25 11Z"
      stroke={color}
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2.75 4.58333V17.4167C2.75 17.9029 2.94315 18.3692 3.28697 18.713C3.63079 19.0568 4.0971 19.25 4.58333 19.25H18.3333C18.5764 19.25 18.8096 19.1534 18.9815 18.9815C19.1534 18.8096 19.25 18.5764 19.25 18.3333V14.6667"
      stroke={color}
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BankIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Defs>
      <ClipPath id="bankClip22">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#bankClip22)">
      <Path
        d="M5.5 20.1667V3.66667C5.5 3.18044 5.69315 2.71412 6.03697 2.3703C6.38079 2.02649 6.8471 1.83333 7.33333 1.83333H14.6667C15.1529 1.83333 15.6192 2.02649 15.963 2.3703C16.3068 2.71412 16.5 3.18044 16.5 3.66667V20.1667H5.5Z"
        stroke={color}
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M5.5 11H3.66667C3.18044 11 2.71412 11.1932 2.3703 11.537C2.02649 11.8808 1.83333 12.3471 1.83333 12.8333V18.3333C1.83333 18.8196 2.02649 19.2859 2.3703 19.6297C2.71412 19.9735 3.18044 20.1667 3.66667 20.1667H5.5"
        stroke={color}
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16.5 8.25H18.3333C18.8196 8.25 19.2859 8.44315 19.6297 8.78697C19.9735 9.13079 20.1667 9.5971 20.1667 10.0833V18.3333C20.1667 18.8196 19.9735 19.2859 19.6297 19.6297C19.2859 19.9735 18.8196 20.1667 18.3333 20.1667H16.5"
        stroke={color}
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M9.16667 5.5H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.16667 9.16667H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.16667 12.8333H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M9.16667 16.5H12.8333" stroke={color} strokeWidth={1.83333} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const ContactsIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path
      d="M14.6667 19.25V17.4167C14.6667 16.4442 14.2804 15.5116 13.5927 14.8239C12.9051 14.1363 11.9725 13.75 11 13.75H5.5C4.52754 13.75 3.59491 14.1363 2.90728 14.8239C2.21964 15.5116 1.83333 16.4442 1.83333 17.4167V19.25"
      stroke={color}
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.25 10.0833C10.275 10.0833 11.9167 8.44171 11.9167 6.41667C11.9167 4.39162 10.275 2.75 8.25 2.75C6.22496 2.75 4.58333 4.39162 4.58333 6.41667C4.58333 8.44171 6.22496 10.0833 8.25 10.0833Z"
      stroke={color}
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M20.1667 19.25V17.4167C20.1661 16.6043 19.8957 15.815 19.3979 15.173C18.9002 14.5309 18.2033 14.0723 17.4167 13.8692"
      stroke={color}
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.6667 2.86917C15.4554 3.07111 16.1545 3.52981 16.6537 4.17295C17.1529 4.81609 17.4239 5.60709 17.4239 6.42125C17.4239 7.23541 17.1529 8.02641 16.6537 8.66955C16.1545 9.31269 15.4554 9.77139 14.6667 9.97333"
      stroke={color}
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GlobeWhiteIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Defs>
      <ClipPath id="globeClip22">
        <Rect width={22} height={22} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#globeClip22)">
      <Path
        d="M11 20.1667C16.0626 20.1667 20.1667 16.0626 20.1667 11C20.1667 5.93739 16.0626 1.83333 11 1.83333C5.93739 1.83333 1.83333 5.93739 1.83333 11C1.83333 16.0626 5.93739 20.1667 11 20.1667Z"
        stroke="white"
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11 1.83333C8.64621 4.30481 7.33333 7.58701 7.33333 11C7.33333 14.413 8.64621 17.6952 11 20.1667C13.3538 17.6952 14.6667 14.413 14.6667 11C14.6667 7.58701 13.3538 4.30481 11 1.83333Z"
        stroke="white"
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.83333 11H20.1667"
        stroke="white"
        strokeWidth={1.83333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const RadioUnchecked = ({ color = '#D1D5DB' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Circle
      cx={11}
      cy={11}
      r={9.5}
      stroke={color}
      strokeWidth={1.5}
    />
  </Svg>
);

const RadioChecked = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Circle cx={11} cy={11} r={11} fill={color} />
    <Path
      d="M7.5 11L9.5 13L14.5 8.5"
      stroke="white"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Transfer option data ───────────────────────────────────────────────────────

interface TransferOption {
  type: TransferType;
  title: string;
  description: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  iconBg: string;
  icon: React.ReactNode;
}

const TRANSFER_OPTIONS: TransferOption[] = [
  {
    type: 'wallet',
    title: 'To Wallet User',
    description: 'Send instantly to any FinWallet user',
    badgeText: 'Instant · Free',
    badgeBg: '#D1FAE5',
    badgeColor: '#059669',
    iconBg: '#EFF6FF',
    icon: <WalletUserIcon />,
  },
  {
    type: 'bank',
    title: 'To Bank Account',
    description: 'Transfer directly to any bank account',
    badgeText: '1–2 days · $1.50 fee',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    iconBg: '#F5F3FF',
    icon: <BankIcon />,
  },
  {
    type: 'contact',
    title: 'To Contact',
    description: 'Send via phone number or email address',
    badgeText: 'Instant · $0.99 fee',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    iconBg: '#F0FDF4',
    icon: <ContactsIcon />,
  },
];

// ── TransferOptionCard ─────────────────────────────────────────────────────────

interface OptionCardProps {
  option: TransferOption;
  selected: boolean;
  onSelect: () => void;
  isDark: boolean;
}

function TransferOptionCard({ option, selected, onSelect, isDark }: OptionCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      accessibilityLabel={option.title}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[
        styles.optionCard,
        isDark ? styles.optionCardDark : styles.optionCardLight,
        selected && styles.optionCardSelected,
      ]}
    >
      {/* Icon container */}
      <View
        className="w-[46px] h-[46px] rounded-[14px] items-center justify-center shrink-0"
        style={{ backgroundColor: option.iconBg }}
      >
        {option.icon}
      </View>

      {/* Text content */}
      <View className="flex-1 gap-[4px]">
        <Text
          className="font-jakarta-semibold text-[15px] leading-[21px] text-neutral-900 dark:text-neutral-50"
          allowFontScaling={false}
        >
          {option.title}
        </Text>
        <Text
          className="font-inter-regular text-small leading-[18px] text-neutral-500 dark:text-neutral-400"
          allowFontScaling={false}
          numberOfLines={2}
        >
          {option.description}
        </Text>
        {/* Badge */}
        <View
          className="self-start px-[8px] h-[18px] rounded-full items-center justify-center mt-[2px]"
          style={{ backgroundColor: option.badgeBg }}
        >
          <Text
            className="font-inter-semibold text-[10px] leading-[15px]"
            style={{ color: option.badgeColor }}
            allowFontScaling={false}
          >
            {option.badgeText}
          </Text>
        </View>
      </View>

      {/* Radio indicator */}
      <View className="shrink-0">
        {selected ? <RadioChecked /> : <RadioUnchecked />}
      </View>
    </Pressable>
  );
}

// ── InternationalCard ──────────────────────────────────────────────────────────

interface IntlCardProps {
  selected: boolean;
  onSelect: () => void;
  isDark: boolean;
}

function InternationalCard({ selected, onSelect, isDark }: IntlCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      accessibilityLabel="International Transfer"
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={[
        styles.intlCard,
        isDark ? styles.intlCardDark : styles.intlCardLight,
        selected && styles.intlCardSelected,
      ]}
    >
      {/* Globe icon on blue bg */}
      <View className="w-[46px] h-[46px] rounded-[14px] items-center justify-center shrink-0 bg-[#2563EB]">
        <GlobeWhiteIcon />
      </View>

      {/* Text content */}
      <View className="flex-1 gap-[4px]">
        <Text
          className="font-jakarta-semibold text-[15px] leading-[21px] text-neutral-900 dark:text-neutral-50"
          allowFontScaling={false}
        >
          International Transfer
        </Text>
        <Text
          className="font-inter-regular text-small leading-[18px] text-neutral-500 dark:text-neutral-400"
          allowFontScaling={false}
          numberOfLines={2}
        >
          Send money globally to 150+ countries
        </Text>
        {/* Badge */}
        <View className="self-start px-[8px] h-[18px] rounded-full items-center justify-center mt-[2px] bg-[#EDE9FE]">
          <Text
            className="font-inter-semibold text-[10px] leading-[15px] text-[#7C3AED]"
            allowFontScaling={false}
          >
            1–3 days · 2.5% + $3.50
          </Text>
        </View>
      </View>

      {/* Radio indicator */}
      <View className="shrink-0">
        {selected ? <RadioChecked /> : <RadioUnchecked />}
      </View>
    </Pressable>
  );
}

// ── SendMoneyScreen ────────────────────────────────────────────────────────────

export default function SendMoneyScreen() {
  const navigation = useNavigation<any>();
  const { isDark } = useTheme();
  const [selected, setSelected] = useState<TransferType>('international');

  const handleSelect = useCallback((type: TransferType) => {
    setSelected(type);
  }, []);

  const handleContinue = useCallback(() => {
    // Navigate to the appropriate screen based on selection
    switch (selected) {
      case 'wallet':
        navigation.navigate('SendToWallet');
        break;
      case 'bank':
        navigation.navigate('SendToBank');
        break;
      case 'contact':
        navigation.navigate('SendToContact');
        break;
      case 'international':
        navigation.navigate('CountrySelect');
        break;
    }
  }, [selected, navigation]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']} >
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <View className="flex-row items-center px-xl h-[56px] gap-md" >
        <Pressable
          onPress={() => navigation.goBack()}
          accessibilityLabel="Close"
          style={styles.closeBtn}
        >
          <CloseXIcon color={isDark ? '#F9FAFB' : '#374151'} />
        </Pressable>
        <Text
          className="font-jakarta-bold text-h3 leading-[27px] text-neutral-900 dark:text-neutral-50"
          allowFontScaling={false}
        >
          Send Money
        </Text>
      </View>

      {/* ── Scrollable content ─────────────────────────────────────────── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        {/* Section label */}
        <Text
          className="font-inter-semibold text-[11px] leading-[16.5px] tracking-[0.8px] text-neutral-400 dark:text-neutral-500 px-xl mb-[14px] mt-[10px]"
          allowFontScaling={false}
        >
          TRANSFER TYPE
        </Text>

        {/* Option cards */}
        <View className="px-xl gap-[10px]">
          {TRANSFER_OPTIONS.map(option => (
            <TransferOptionCard
              key={option.type}
              option={option}
              selected={selected === option.type}
              onSelect={() => handleSelect(option.type)}
              isDark={isDark}
            />
          ))}
        </View>

        {/* OR divider */}
        <View className="flex-row items-center px-xl mt-xl gap-md">
          <View className="flex-1 h-divider bg-neutral-200 dark:bg-neutral-700" />
          <Text
            className="font-inter-semibold text-small leading-[16.5px] text-neutral-400 dark:text-neutral-500"
            allowFontScaling={false}
          >
            OR
          </Text>
          <View className="flex-1 h-divider bg-neutral-200 dark:bg-neutral-700" />
        </View>

        {/* International Transfer */}
        <View className="px-xl mt-xl">
          <InternationalCard
            selected={selected === 'international'}
            onSelect={() => handleSelect('international')}
            isDark={isDark}
          />
        </View>

        <View className="h-[24px]" />
        
      </ScrollView>


      {/* ── Footer CTA ─────────────────────────────────────────────────── */}
      <View
        className="px-xl  pt-[17px] pb-[10]"
        style={styles.footer}
      >
      <AppButton label="Continue" onPress={handleContinue} />
      </View>
    </ScreenWrapper>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 18,
  },
  optionCardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  optionCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  optionCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  intlCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderRadius: 16,
    borderWidth: 1.5,
    padding: 18,
  },
  intlCardLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  intlCardDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  intlCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  footer: {
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 8,
  },
});
