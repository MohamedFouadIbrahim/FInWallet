import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import Svg, { Path, Rect, Circle, Line, G, Defs, ClipPath } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ─────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M19 12H5M5 12L12 19M5 12L12 5"
      stroke="#111827"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const GlobeIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Defs>
      <ClipPath id="globe-pref-clip">
        <Rect width={24} height={24} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#globe-pref-clip)">
      <Circle cx={12} cy={12} r={10} stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M12 2C9.5 5.5 8 8.6 8 12s1.5 6.5 4 10c2.5-3.5 4-6.6 4-10s-1.5-6.5-4-10z" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M2 12h20" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    </G>
  </Svg>
);

const ChevronDownIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M6 9L12 15L18 9"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MonitorIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Rect x={2} y={3} width={20} height={14} rx={2} stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <Line x1={8} y1={21} x2={16} y2={21} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Line x1={12} y1={17} x2={12} y2={21} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const SunIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Circle cx={12} cy={12} r={4} stroke={color} strokeWidth={1.8} strokeLinecap="round" />
    <Path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2 12h2M20 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
  </Svg>
);

const MoonIcon = ({ color = '#6B7280' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const BellIcon = ({ color = '#D97706' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MailIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M22 6L12 13 2 6"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Types ─────────────────────────────────────────────────────────────────────

type ThemeOption = 'system' | 'light' | 'dark';

// ── Theme card ────────────────────────────────────────────────────────────────

interface ThemeCardProps {
  id: ThemeOption;
  label: string;
  sublabel: string;
  selected: boolean;
  icon: React.ReactNode;
  iconBg: string;
  onSelect: (id: ThemeOption) => void;
}

const ThemeCard = ({ id, label, sublabel, selected, icon, iconBg, onSelect }: ThemeCardProps) => (
  <Pressable
    style={[styles.themeCard, selected && styles.themeCardActive]}
    onPress={() => onSelect(id)}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
  >
    <View style={[styles.themeIconBox, { backgroundColor: iconBg }]}>
      {icon}
    </View>
    <Text
      style={[styles.themeLabel, selected && styles.themeLabelActive]}
      allowFontScaling={false}
    >
      {label}
    </Text>
    <Text
      style={[styles.themeSub, selected && styles.themeSubActive]}
      allowFontScaling={false}
    >
      {sublabel}
    </Text>
  </Pressable>
);

// ── Notification toggle row ───────────────────────────────────────────────────

interface NotifRowProps {
  iconBg: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  value: boolean;
  onToggle: (v: boolean) => void;
  isLast?: boolean;
}

const NotifRow = ({ iconBg, icon, label, sub, value, onToggle, isLast }: NotifRowProps) => (
  <>
    <View style={styles.notifRow}>
      <View style={[styles.notifIconWrap, { backgroundColor: iconBg }]}>
        {icon}
      </View>
      <View style={styles.notifText}>
        <Text style={styles.notifLabel} allowFontScaling={false}>{label}</Text>
        <Text style={styles.notifSub} allowFontScaling={false}>{sub}</Text>
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: '#E5E7EB', true: '#2563EB' }}
        thumbColor="#FFFFFF"
        ios_backgroundColor="#E5E7EB"
        style={styles.toggle}
      />
    </View>
    {!isLast && <View style={styles.divider} />}
  </>
);

// ── Screen ────────────────────────────────────────────────────────────────────

export default function SettingsScreen() {
  const navigation = useNavigation<any>();

  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('system');
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(true);

  const handleBack = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <View style={styles.header}>
        <Pressable
          style={styles.backBtn}
          onPress={handleBack}
          accessibilityLabel="Go back"
          accessibilityRole="button"
        >
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle} allowFontScaling={false}>
          Preferences
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── LANGUAGE ──────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            LANGUAGE
          </Text>
          <Pressable style={styles.languageRow} accessibilityRole="button">
            <View style={styles.languageIconWrap}>
              <GlobeIcon color="#2563EB" />
            </View>
            <Text style={styles.languageText} allowFontScaling={false}>
              English
            </Text>
            <ChevronDownIcon color="#9CA3AF" />
          </Pressable>
        </View>

        {/* ── THEME ─────────────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            THEME
          </Text>
          <View style={styles.themeRow}>
            <ThemeCard
              id="system"
              label="System"
              sublabel="Follow device"
              selected={selectedTheme === 'system'}
              iconBg={selectedTheme === 'system' ? '#DBEAFE' : '#F3F4F6'}
              icon={<MonitorIcon color={selectedTheme === 'system' ? '#2563EB' : '#6B7280'} />}
              onSelect={setSelectedTheme}
            />
            <ThemeCard
              id="light"
              label="Light"
              sublabel="Always light"
              selected={selectedTheme === 'light'}
              iconBg={selectedTheme === 'light' ? '#DBEAFE' : '#F3F4F6'}
              icon={<SunIcon color={selectedTheme === 'light' ? '#2563EB' : '#6B7280'} />}
              onSelect={setSelectedTheme}
            />
            <ThemeCard
              id="dark"
              label="Dark"
              sublabel="Always dark"
              selected={selectedTheme === 'dark'}
              iconBg={selectedTheme === 'dark' ? '#DBEAFE' : '#F3F4F6'}
              icon={<MoonIcon color={selectedTheme === 'dark' ? '#2563EB' : '#6B7280'} />}
              onSelect={setSelectedTheme}
            />
          </View>
        </View>

        {/* ── NOTIFICATIONS ─────────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            NOTIFICATIONS
          </Text>
          <View style={styles.notifCard}>
            <NotifRow
              iconBg="#FFFBEB"
              icon={<BellIcon color="#D97706" />}
              label="Push Notifications"
              sub="Transaction & security alerts"
              value={pushEnabled}
              onToggle={setPushEnabled}
            />
            <NotifRow
              iconBg="#F5F3FF"
              icon={<MailIcon color="#7C3AED" />}
              label="Email Notifications"
              sub="Statements & promotions"
              value={emailEnabled}
              onToggle={setEmailEnabled}
              isLast
            />
          </View>
        </View>
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
    gap: 16,
    paddingHorizontal: 24,
    height: 56,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
  },
  // Scroll
  scroll: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 40,
    gap: 24,
  },
  // Section
  section: {
    gap: 10,
  },
  sectionLabel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 11,
    lineHeight: 16.5,
    letterSpacing: 0.77,
    color: '#9CA3AF',
  },
  // Language
  languageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 64,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    paddingHorizontal: 17,
  },
  languageIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  languageText: {
    flex: 1,
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  // Theme cards
  themeRow: {
    flexDirection: 'row',
    gap: 10,
  },
  themeCard: {
    flex: 1,
    height: 117.5,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 17.5,
    gap: 6,
  },
  themeCardActive: {
    borderColor: '#2563EB',
    backgroundColor: '#EFF6FF',
  },
  themeIconBox: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
    textAlign: 'center',
  },
  themeLabelActive: {
    fontFamily: 'Inter24pt-SemiBold',
    color: '#2563EB',
  },
  themeSub: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 10,
    lineHeight: 15,
    color: '#9CA3AF',
    textAlign: 'center',
  },
  themeSubActive: {
    color: '#60A5FA',
  },
  // Notifications
  notifCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  notifRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 67,
  },
  notifIconWrap: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  notifText: {
    flex: 1,
    gap: 2,
  },
  notifLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  notifSub: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
  toggle: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    alignSelf: 'center',
  },
  divider: {
    height: 1,
    marginLeft: 62,
    backgroundColor: '#F3F4F6',
  },
});
