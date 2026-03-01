import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
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

const ShieldCheckIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10 2L17 5V10C17 14 13.5 17.5 10 18C6.5 17.5 3 14 3 10V5L10 2Z"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 10L9 11.5L12.5 8"
      stroke="rgba(255,255,255,0.6)"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MapPinIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M15 7.5C15 11.2448 10.8457 15.1447 9.45075 16.3492C9.32079 16.447 9.1626 16.4998 9 16.4998C8.8374 16.4998 8.67921 16.447 8.54925 16.3492C7.15425 15.1447 3 11.2448 3 7.5C3 5.9087 3.63214 4.38258 4.75736 3.25736C5.88258 2.13214 7.4087 1.5 9 1.5C10.5913 1.5 12.1174 2.13214 13.2426 3.25736C14.3679 4.38258 15 5.9087 15 7.5Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 9.75C10.2426 9.75 11.25 8.74264 11.25 7.5C11.25 6.25736 10.2426 5.25 9 5.25C7.75736 5.25 6.75 6.25736 6.75 7.5C6.75 8.74264 7.75736 9.75 9 9.75Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Blue checkmark for selected address
const CheckCircleBlueIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Defs>
      <ClipPath id="cc1">
        <Rect width={20} height={20} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#cc1)">
      <Path
        d="M18.1675 8.33333C18.5481 10.2011 18.2768 12.1429 17.399 13.8348C16.5212 15.5268 15.0899 16.8667 13.3438 17.6311C11.5976 18.3955 9.64219 18.5382 7.80358 18.0353C5.96498 17.5325 4.35433 16.4145 3.24023 14.8679C2.12613 13.3212 1.57594 11.4394 1.68139 9.53616C1.78684 7.63295 2.54157 5.82341 3.81971 4.40931C5.09785 2.99521 6.82215 2.06203 8.70505 1.76538C10.588 1.46873 12.5157 1.82655 14.1667 2.77917"
        stroke="#2563EB"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M7.5 9.16667L10 11.6667L18.3333 3.33333"
        stroke="#2563EB"
        strokeWidth={1.67}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

// Green checkmark for completed timeline steps
const CheckCircleGreenIcon = ({ size = 18 }: { size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 18 18" fill="none">
    <Defs>
      <ClipPath id="ccg">
        <Rect width={18} height={18} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#ccg)">
      <Path
        d="M16.3508 7.5C16.6933 9.18097 16.4492 10.9286 15.6591 12.4513C14.8691 13.9741 13.5809 15.18 12.0094 15.868C10.4379 16.5559 8.67797 16.6843 7.02322 16.2318C5.36848 15.7792 3.91889 14.773 2.91621 13.3811C1.91352 11.9891 1.41834 10.2954 1.51325 8.58254C1.60815 6.86965 2.28741 5.24107 3.43774 3.96838C4.58807 2.69569 6.13994 1.85582 7.83455 1.58884C9.52916 1.32186 11.2641 1.6439 12.75 2.50125"
        stroke="#059669"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M6.75 8.25L9 10.5L16.5 3"
        stroke="#059669"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

// Truck/delivery icon (blue, for Dispatched)
const TruckIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M9.33333 12V4C9.33333 3.64638 9.19286 3.30724 8.94281 3.05719C8.69276 2.80714 8.35362 2.66667 8 2.66667H2.66667C2.31304 2.66667 1.97391 2.80714 1.72386 3.05719C1.47381 3.30724 1.33333 3.64638 1.33333 4V11.3333C1.33333 11.5101 1.40357 11.6797 1.5286 11.8047C1.65362 11.9298 1.82319 12 2 12H3.33333"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 12H6"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12.6667 12H14C14.1768 12 14.3464 11.9298 14.4714 11.8047C14.5964 11.6797 14.6667 11.5101 14.6667 11.3333V8.9C14.6664 8.74871 14.6147 8.60201 14.52 8.484L12.2 5.584C12.1376 5.50592 12.0585 5.44285 11.9685 5.39947C11.8785 5.35608 11.7799 5.33348 11.68 5.33333H9.33333"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.3333 13.3333C12.0697 13.3333 12.6667 12.7364 12.6667 12C12.6667 11.2636 12.0697 10.6667 11.3333 10.6667C10.597 10.6667 10 11.2636 10 12C10 12.7364 10.597 13.3333 11.3333 13.3333Z"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.66667 13.3333C5.40305 13.3333 6 12.7364 6 12C6 11.2636 5.40305 10.6667 4.66667 10.6667C3.93029 10.6667 3.33333 11.2636 3.33333 12C3.33333 12.7364 3.93029 13.3333 4.66667 13.3333Z"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// House icon (gray, for Delivered step)
const HouseIcon = ({ color = '#D1D5DB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M10 14V8.66667C10 8.48986 9.92976 8.32029 9.80474 8.19526C9.67971 8.07024 9.51014 8 9.33333 8H6.66667C6.48986 8 6.32029 8.07024 6.19526 8.19526C6.07024 8.32029 6 8.48986 6 8.66667V14"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 6.66667C1.99995 6.47271 2.04222 6.28108 2.12386 6.10514C2.20549 5.92921 2.32453 5.7732 2.47267 5.648L7.13933 1.64867C7.37999 1.44527 7.6849 1.33368 8 1.33368C8.3151 1.33368 8.62001 1.44527 8.86067 1.64867L13.5273 5.648C13.6755 5.7732 13.7945 5.92921 13.8761 6.10514C13.9578 6.28108 14 6.47271 14 6.66667V12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V6.66667Z"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Print icon (green checkmark already used for Printing step)
const PrintIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M4 5V2.66667C4 2.48986 4.07024 2.32029 4.19526 2.19526C4.32029 2.07024 4.48986 2 4.66667 2H11.3333C11.5101 2 11.6797 2.07024 11.8047 2.19526C11.9298 2.32029 12 2.48986 12 2.66667V5"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 10.6667H2.66667C2.48986 10.6667 2.32029 10.5964 2.19526 10.4714C2.07024 10.3464 2 10.1768 2 10V6.66667C2 6.48986 2.07024 6.32029 2.19526 6.19526C2.32029 6.07024 2.48986 6 2.66667 6H13.3333C13.5101 6 13.6797 6.07024 13.8047 6.19526C13.9298 6.32029 14 6.48986 14 6.66667V10C14 10.1768 13.9298 10.3464 13.8047 10.4714C13.6797 10.5964 13.5101 10.6667 13.3333 10.6667H12"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4 8.66667H12V13.3333C12 13.5101 11.9298 13.6797 11.8047 13.8047C11.6797 13.9298 11.5101 14 11.3333 14H4.66667C4.48986 14 4.32029 13.9298 4.19526 13.8047C4.07024 13.6797 4 13.5101 4 13.3333V8.66667Z"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// Package/box icon (green, for Ordered step)
const PackageIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M13.6 11.04L8 14L2.4 11.04V5.12L8 2L13.6 5.12V11.04Z"
      stroke={color}
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path d="M8 14V8" stroke={color} strokeWidth={1.33} strokeLinecap="round" />
    <Path d="M2.4 5.12L8 8L13.6 5.12" stroke={color} strokeWidth={1.33} strokeLinecap="round" />
    <Path d="M5.2 3.48L10.8 6.44" stroke={color} strokeWidth={1.33} strokeLinecap="round" />
  </Svg>
);

// NFC / contactless icon for card
const NfcIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M3 7.5C6.86 4.17 13.14 4.17 17 7.5" stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M5.5 10.5C7.9 8.5 12.1 8.5 14.5 10.5" stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} strokeLinecap="round" />
    <Path d="M8.5 13.5C9.4 12.83 10.6 12.83 11.5 13.5" stroke="rgba(255,255,255,0.5)" strokeWidth={1.4} strokeLinecap="round" />
    <Circle cx={10} cy={16} r={1} fill="rgba(255,255,255,0.5)" />
  </Svg>
);

// ── Types ──────────────────────────────────────────────────────────────────────

interface Address {
  id: string;
  label: string;
  line1: string;
  line2: string;
}

type StepStatus = 'done' | 'active' | 'pending';

interface TimelineStep {
  id: string;
  title: string;
  date: string;
  status: StepStatus;
}

// ── Data ───────────────────────────────────────────────────────────────────────

const ADDRESSES: Address[] = [
  {
    id: 'home',
    label: 'Home',
    line1: '123 Main Street',
    line2: 'New York, NY 10001',
  },
  {
    id: 'office',
    label: 'Office',
    line1: '456 Park Avenue',
    line2: 'New York, NY 10022',
  },
];

const TIMELINE_STEPS: TimelineStep[] = [
  { id: 'ordered', title: 'Ordered', date: 'Jan 15, 2024', status: 'done' },
  { id: 'printing', title: 'Printing', date: 'Jan 18, 2024', status: 'done' },
  { id: 'dispatched', title: 'Dispatched', date: 'Jan 22, 2024', status: 'active' },
  { id: 'delivered', title: 'Delivered', date: 'Est. Mar 1', status: 'pending' },
];

// ── PhysicalCard preview ───────────────────────────────────────────────────────

function PhysicalCardPreview() {
  return (
    <View style={styles.cardPreview}>
      {/* Top row: FinWallet PREMIUM + NFC */}
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-[6px]">
          <ShieldCheckIcon />
          <Text
            className="font-inter-semibold text-[11px] tracking-[1.2px] uppercase"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            allowFontScaling={false}
          >
            FinWallet PREMIUM
          </Text>
        </View>
        <View style={{ transform: [{ rotate: '90deg' }] }}>
          <NfcIcon />
        </View>
      </View>

      {/* Chip */}
      <View style={styles.chip} />

      {/* Card number */}
      <Text
        className="font-mono text-[16px] text-white tracking-[3px] mt-[10px]"
        allowFontScaling={false}
      >
        {'•••• •••• •••• 8294'}
      </Text>

      {/* Bottom row: name + VISA */}
      <View className="flex-row items-end justify-between mt-[10px]">
        <View>
          <Text
            style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, fontFamily: 'Inter-Regular', letterSpacing: 0.5 }}
            allowFontScaling={false}
          >
            CARD HOLDER
          </Text>
          <Text
            className="font-inter-semibold text-[13px] text-white tracking-[0.5px] mt-[2px]"
            allowFontScaling={false}
          >
            ALEX CARTER
          </Text>
        </View>
        <Text
          className="font-inter-semibold italic text-[18px] text-white tracking-[1px]"
          allowFontScaling={false}
        >
          VISA
        </Text>
      </View>
    </View>
  );
}

// ── AddressCard ────────────────────────────────────────────────────────────────

interface AddressCardProps {
  address: Address;
  selected: boolean;
  onSelect: () => void;
}

function AddressCard({ address, selected, onSelect }: AddressCardProps) {
  return (
    <Pressable
      onPress={onSelect}
      accessibilityLabel={`Select ${address.label} address`}
      style={[
        styles.addressCard,
        selected && styles.addressCardSelected,
      ]}
    >
      {/* Icon */}
      <View
        style={[
          styles.addressIconWrap,
          { backgroundColor: selected ? '#EFF6FF' : '#F3F4F6' },
        ]}
      >
        <MapPinIcon color={selected ? '#2563EB' : '#9CA3AF'} />
      </View>

      {/* Text */}
      <View className="flex-1 gap-[2px]">
        <Text
          className="font-inter-semibold text-[14px] leading-[21px]"
          style={{ color: selected ? '#2563EB' : '#111827' }}
          allowFontScaling={false}
        >
          {address.label}
        </Text>
        <Text
          className="font-inter-regular text-[12px] leading-[18px] text-neutral-500"
          allowFontScaling={false}
        >
          {address.line1}
        </Text>
        <Text
          className="font-inter-regular text-[12px] leading-[18px] text-neutral-500"
          allowFontScaling={false}
        >
          {address.line2}
        </Text>
      </View>

      {/* Check */}
      {selected && (
        <View className="self-center">
          <CheckCircleBlueIcon />
        </View>
      )}
    </Pressable>
  );
}

// ── TimelineStep ──────────────────────────────────────────────────────────────

interface TimelineStepProps {
  step: TimelineStep;
  isLast: boolean;
}

function StepIcon({ step }: { step: TimelineStep }) {
  if (step.status === 'done') {
    return (
      <View style={[styles.stepCircle, styles.stepCircleDone]}>
        <CheckCircleGreenIcon size={16} />
      </View>
    );
  }
  if (step.status === 'active') {
    return (
      <View style={[styles.stepCircle, styles.stepCircleActive]}>
        <TruckIcon color="#2563EB" />
      </View>
    );
  }
  // pending
  return (
    <View style={[styles.stepCircle, styles.stepCirclePending]}>
      <HouseIcon color="#9CA3AF" />
    </View>
  );
}

function TimelineStepRow({ step, isLast }: TimelineStepProps) {
  const isActive = step.status === 'active';
  const isPending = step.status === 'pending';

  return (
    <View className="flex-row">
      {/* Left column: icon + connector */}
      <View className="items-center" style={{ width: 44 }}>
        <StepIcon step={step} />
        {!isLast && (
          <View
            style={[
              styles.connector,
              { backgroundColor: isPending ? '#E5E7EB' : '#D1FAE5' },
            ]}
          />
        )}
      </View>

      {/* Right column: text */}
      <View className="flex-1 pb-[24px] pl-[14px]">
        <View className="flex-row items-center gap-[8px] mt-[2px]">
          <Text
            className="font-inter-semibold text-[14px] leading-[21px]"
            style={{ color: isPending ? '#9CA3AF' : '#111827' }}
            allowFontScaling={false}
          >
            {step.title}
          </Text>
          {isActive && (
            <View style={styles.currentBadge}>
              <Text
                className="font-inter-semibold text-[10px] text-white"
                allowFontScaling={false}
              >
                Current
              </Text>
            </View>
          )}
        </View>
        <Text
          className="font-inter-regular text-[12px] leading-[18px] mt-[2px]"
          style={{ color: isPending ? '#9CA3AF' : '#6B7280' }}
          allowFontScaling={false}
        >
          {step.date}
        </Text>
      </View>
    </View>
  );
}

// ── PhysicalCardScreen ─────────────────────────────────────────────────────────

export default function PhysicalCardScreen() {
  const navigation = useNavigation<any>();
  const [selectedAddress, setSelectedAddress] = useState('home');

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
          Physical Card
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        {/* ── Card Preview ─────────────────────────────────────────────── */}
        <View className="px-xl mt-lg">
          <PhysicalCardPreview />
        </View>

        {/* ── Delivery Address ─────────────────────────────────────────── */}
        <View className="px-xl mt-xl">
          <Text
            className="font-inter-semibold text-caption text-[#9CA3AF] tracking-[0.5px] uppercase mb-[12px]"
            allowFontScaling={false}
          >
            DELIVERY ADDRESS
          </Text>
          <View className="gap-[10px]">
            {ADDRESSES.map(addr => (
              <AddressCard
                key={addr.id}
                address={addr}
                selected={selectedAddress === addr.id}
                onSelect={() => setSelectedAddress(addr.id)}
              />
            ))}
          </View>
        </View>

        {/* ── Current Status ───────────────────────────────────────────── */}
        <View className="px-xl mt-xl">
          <Text
            className="font-inter-semibold text-caption text-[#9CA3AF] tracking-[0.5px] uppercase mb-[16px]"
            allowFontScaling={false}
          >
            CURRENT STATUS
          </Text>
          <View
            className="bg-white dark:bg-neutral-800 border border-[#E5E7EB] dark:border-neutral-700 rounded-lg p-[20px]"
          >
            {TIMELINE_STEPS.map((step, i) => (
              <TimelineStepRow
                key={step.id}
                step={step}
                isLast={i === TIMELINE_STEPS.length - 1}
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
  cardPreview: {
    width: '100%',
    height: 196,
    borderRadius: 20,
    padding: 24,
    backgroundColor: '#0F2044',
    shadowColor: '#0F2044',
    shadowOpacity: 0.35,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    overflow: 'hidden',
  },
  chip: {
    width: 42,
    height: 30,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'rgba(212,168,75,0.5)',
    backgroundColor: '#D4A84B',
    marginTop: 20,
  },
  addressCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  addressCardSelected: {
    borderColor: '#2563EB',
    backgroundColor: '#F8FBFF',
  },
  addressIconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  stepCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleDone: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  stepCircleActive: {
    backgroundColor: '#EFF6FF',
    borderWidth: 1.5,
    borderColor: '#2563EB',
  },
  stepCirclePending: {
    backgroundColor: '#F9FAFB',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 20,
    borderRadius: 1,
    marginVertical: 4,
  },
  currentBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
    backgroundColor: '#2563EB',
  },
});
