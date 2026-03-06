import React, { useCallback, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import AppButton from '@components/ui/AppButton';

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

const CameraIcon = () => (
  <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
    <Path
      d="M23 19C23 19.5304 22.7893 20.0391 22.4142 20.4142C22.0391 20.7893 21.5304 21 21 21H3C2.46957 21 1.96086 20.7893 1.58579 20.4142C1.21071 20.0391 1 19.5304 1 19V8C1 7.46957 1.21071 6.96086 1.58579 6.58579C1.96086 6.21071 2.46957 6 3 6H7L9 3H15L17 6H21C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8V19Z"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 17C14.2091 17 16 15.2091 16 13C16 10.7909 14.2091 9 12 9C9.79086 9 8 10.7909 8 13C8 15.2091 9.79086 17 12 17Z"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Field component ───────────────────────────────────────────────────────────

interface FieldProps {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  autoCapitalize?: 'none' | 'words';
}

const Field = ({ label, value, onChangeText, keyboardType = 'default', autoCapitalize = 'words' }: FieldProps) => (
  <View style={styles.fieldWrap}>
    <Text style={styles.fieldLabel} allowFontScaling={false}>
      {label}
    </Text>
    <TextInput
      style={styles.fieldInput}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      allowFontScaling={false}
      placeholderTextColor="#9CA3AF"
    />
  </View>
);

// ── Screen ────────────────────────────────────────────────────────────────────

export default function EditProfileScreen() {
  const navigation = useNavigation<any>();

  const [firstName, setFirstName] = useState('Alex');
  const [lastName, setLastName] = useState('Carter');
  const [email, setEmail] = useState('alex.carter@email.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');

  const handleBack   = useCallback(() => navigation.goBack(), [navigation]);
  const handleSave   = useCallback(() => navigation.goBack(), [navigation]);
  const handleCancel = useCallback(() => navigation.goBack(), [navigation]);

  return (
    <ScreenWrapper edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* ── Header ──────────────────────────────────────────────────────── */}
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
            Edit Profile
          </Text>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Avatar ────────────────────────────────────────────────────── */}
          <View style={styles.avatarSection}>
            <View style={styles.avatarWrap}>
              <LinearGradient
                colors={['#2563EB', '#7C3AED']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatar}
              >
                <Text style={styles.avatarText} allowFontScaling={false}>
                  AC
                </Text>
              </LinearGradient>

              <Pressable
                style={styles.cameraBtn}
                accessibilityLabel="Change photo"
                accessibilityRole="button"
              >
                <CameraIcon />
              </Pressable>
            </View>

            <Text style={styles.tapText} allowFontScaling={false}>
              Tap to change photo
            </Text>
          </View>

          {/* ── Form ──────────────────────────────────────────────────────── */}
          <View style={styles.form}>
            <Field
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
            />
            <Field
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Field
              label="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <Field
              label="Phone Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
              autoCapitalize="none"
            />
          </View>

          {/* ── Actions ───────────────────────────────────────────────────── */}
          <View style={styles.actions}>
            <AppButton
              label="Save Changes"
              onPress={handleSave}
              style={styles.saveBtn}
            />
            <AppButton
              label="Cancel"
              variant="secondary"
              onPress={handleCancel}
              style={styles.cancelBtn}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
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
  },
  scrollContent: {
    paddingBottom: 40,
  },
  // Avatar
  avatarSection: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 8,
    gap: 10,
  },
  avatarWrap: {
    width: 88,
    height: 88,
    position: 'relative',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 28,
    lineHeight: 42,
    color: '#FFFFFF',
  },
  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: '#2563EB',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tapText: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#9CA3AF',
  },
  // Form
  form: {
    paddingHorizontal: 24,
    paddingTop: 24,
    gap: 16,
  },
  fieldWrap: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#374151',
  },
  fieldInput: {
    height: 48,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontFamily: 'Inter24pt-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#111827',
  },
  // Actions
  actions: {
    paddingHorizontal: 24,
    paddingTop: 32,
    gap: 12,
  },
  saveBtn: {
    borderRadius: 14,
    height: 52,
  },
  cancelBtn: {
    backgroundColor: '#F3F4F6',
    borderWidth: 0,
    borderRadius: 14,
    height: 48,
  },
});
