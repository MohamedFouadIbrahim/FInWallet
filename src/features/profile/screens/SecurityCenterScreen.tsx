import React, { useCallback, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import Svg, { Path, Rect, Circle } from 'react-native-svg';
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

const ShieldIcon = ({ color = '#2563EB', size = 20 }: { color?: string; size?: number }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C12 22 4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ShieldCheckIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 22C12 22 4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 12L11 14L15 10"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Rect
      x={3}
      y={11}
      width={18}
      height={11}
      rx={2}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7 11V7a5 5 0 0110 0v4"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const FingerprintIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2 13.5C2 9.36 5.36 6 9.5 6"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M22 13.5C22 7.15 16.85 2 10.5 2"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M5.6 18C5.2 16.7 5 15.4 5 14c0-2.5 2-4.5 4.5-4.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M9.5 9.5C12 9.5 14 11.5 14 14c0 3 .5 5.5 1.5 8"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
    <Path
      d="M18.4 16.5c.4-1 .6-2.3.6-3.5C19 7.7 14.8 3.5 9.5 3.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
    />
  </Svg>
);

const KeyIcon = ({ color = '#D97706' }: { color?: string }) => (
  <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
    <Circle
      cx={7.5}
      cy={15.5}
      r={4.5}
      stroke={color}
      strokeWidth={2}
    />
    <Path
      d="M11.5 14.5L15 11L21 5"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18 8l2 2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = () => (
  <Svg width={16} height={16} viewBox="0 0 16 16" fill="none">
    <Path
      d="M6 12L10 8L6 4"
      stroke="#D1D5DB"
      strokeWidth={1.33}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Sub-components ────────────────────────────────────────────────────────────

interface RowProps {
  iconBg: string;
  icon: React.ReactNode;
  label: string;
  sub: string;
  isLast?: boolean;
}

interface ActionRowProps extends RowProps {
  onPress: () => void;
}

interface ToggleRowProps extends RowProps {
  value: boolean;
  onToggle: (v: boolean) => void;
}

const ActionRow = ({ iconBg, icon, label, sub, isLast, onPress }: ActionRowProps) => (
  <>
    <Pressable style={styles.row} onPress={onPress} accessibilityRole="button">
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel} allowFontScaling={false}>{label}</Text>
        <Text style={styles.rowSub} allowFontScaling={false}>{sub}</Text>
      </View>
      <ChevronRightIcon />
    </Pressable>
    {!isLast && <View style={styles.divider} />}
  </>
);

const ToggleRow = ({ iconBg, icon, label, sub, isLast, value, onToggle }: ToggleRowProps) => (
  <>
    <View style={styles.row}>
      <View style={[styles.rowIcon, { backgroundColor: iconBg }]}>{icon}</View>
      <View style={styles.rowText}>
        <Text style={styles.rowLabel} allowFontScaling={false}>{label}</Text>
        <Text style={styles.rowSub} allowFontScaling={false}>{sub}</Text>
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

export default function SecurityCenterScreen() {
  const navigation = useNavigation<any>();

  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

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
          Security Center
        </Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Security Strength card ────────────────────────────────────── */}
        <View style={styles.strengthCard}>
          <View style={styles.strengthRow}>
            <View style={styles.strengthIconWrap}>
              <ShieldIcon color="#2563EB" size={20} />
            </View>
            <View style={styles.strengthText}>
              <Text style={styles.strengthTitle} allowFontScaling={false}>
                Security Strength
              </Text>
              <Text style={styles.strengthLevel} allowFontScaling={false}>
                Good
              </Text>
            </View>
          </View>

          {/* Progress bar — 75% fill */}
          <View style={styles.progressTrack}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.strengthNote} allowFontScaling={false}>
            Last password change: 14 days ago
          </Text>
        </View>

        {/* ── Authentication section ────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel} allowFontScaling={false}>
            AUTHENTICATION
          </Text>

          <View style={styles.sectionCard}>
            <ActionRow
              iconBg="#EFF6FF"
              icon={<LockIcon color="#2563EB" />}
              label="Change Login PIN"
              sub="Update your 6-digit login PIN"
              onPress={() => {}}
            />
            <ToggleRow
              iconBg="#F5F3FF"
              icon={<FingerprintIcon color="#7C3AED" />}
              label="Biometric Login"
              sub="Face ID / Fingerprint"
              value={biometricEnabled}
              onToggle={setBiometricEnabled}
            />
            <ActionRow
              iconBg="#FFFBEB"
              icon={<KeyIcon color="#D97706" />}
              label="Change Password"
              sub="Update your account password"
              onPress={() => {}}
            />
            <ToggleRow
              iconBg="#F0FDF4"
              icon={<ShieldCheckIcon color="#059669" />}
              label="Two-Factor Authentication"
              sub={twoFactorEnabled ? 'Enabled' : 'Disabled'}
              value={twoFactorEnabled}
              onToggle={setTwoFactorEnabled}
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
  // Strength card
  strengthCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
    gap: 12,
  },
  strengthRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 44,
  },
  strengthIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  strengthText: {
    flex: 1,
    gap: 2,
  },
  strengthTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#111827',
  },
  strengthLevel: {
    fontFamily: 'Inter24pt-SemiBold',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#2563EB',
  },
  progressTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F3F4F6',
    overflow: 'hidden',
  },
  progressFill: {
    width: '75%',
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2563EB',
  },
  strengthNote: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
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
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  // Row
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    height: 67,
  },
  rowIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  rowText: {
    flex: 1,
    gap: 2,
  },
  rowLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 14,
    lineHeight: 21,
    color: '#374151',
  },
  rowSub: {
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
