import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import ScreenWrapper from '@components/layout/ScreenWrapper';

// ── Icons ──────────────────────────────────────────────────────────────────────

const BackIcon = () => (
  <Svg width={20} height={20} viewBox="0 0 20 20" fill="none">
    <Path d="M10 15.8333L4.16667 10L10 4.16667" stroke="#374151" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M15.8333 10H4.16667" stroke="#374151" strokeWidth={1.67} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ShieldIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
    <Path
      d="M30 19.5C30 27 24.75 30.75 18.51 32.925C18.1832 33.0357 17.8283 33.0304 17.505 32.91C11.25 30.75 6 27 6 19.5V9C6 8.60218 6.15804 8.22064 6.43934 7.93934C6.72064 7.65804 7.10218 7.5 7.5 7.5C10.5 7.5 14.25 5.7 16.86 3.42C17.1778 3.1485 17.582 2.99933 18 2.99933C18.418 2.99933 18.8222 3.1485 19.14 3.42C21.765 5.715 25.5 7.5 28.5 7.5C28.8978 7.5 29.2794 7.65804 29.5607 7.93934C29.842 8.22064 30 8.60218 30 9V19.5Z"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const KeyIcon = ({ color = '#2563EB' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.586 17.414C2.2109 17.789 2.00011 18.2976 2 18.828V21C2 21.2652 2.10536 21.5196 2.29289 21.7071C2.48043 21.8946 2.73478 22 3 22H6C6.26522 22 6.51957 21.8946 6.70711 21.7071C6.89464 21.5196 7 21.2652 7 21V20C7 19.7348 7.10536 19.4804 7.29289 19.2929C7.48043 19.1054 7.73478 19 8 19H9C9.26522 19 9.51957 18.8946 9.70711 18.7071C9.89464 18.5196 10 18.2652 10 18V17C10 16.7348 10.1054 16.4804 10.2929 16.2929C10.4804 16.1054 10.7348 16 11 16H11.172C11.7024 15.9999 12.211 15.7891 12.586 15.414L13.4 14.6C14.7898 15.0841 16.3028 15.0823 17.6915 14.5948C19.0801 14.1072 20.2622 13.1628 21.0444 11.9161C21.8265 10.6694 22.1624 9.19417 21.9971 7.73174C21.8318 6.2693 21.1751 4.90625 20.1344 3.86557C19.0937 2.82489 17.7307 2.16818 16.2683 2.00289C14.8058 1.83759 13.3306 2.1735 12.0839 2.95564C10.8372 3.73779 9.89279 4.91987 9.40525 6.30852C8.91771 7.69717 8.91585 9.21016 9.4 10.6L2.586 17.414Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 8C16.7761 8 17 7.77614 17 7.5C17 7.22386 16.7761 7 16.5 7C16.2239 7 16 7.22386 16 7.5C16 7.77614 16.2239 8 16.5 8Z"
      fill={color}
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const EyeIcon = ({ color = '#7C3AED' }: { color?: string }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
    <Path
      d="M2.062 12.348C1.97866 12.1235 1.97866 11.8765 2.062 11.652C2.8737 9.68385 4.25152 8.00104 6.02077 6.8169C7.79003 5.63276 9.87104 5.00062 12 5.00062C14.129 5.00062 16.21 5.63276 17.9792 6.8169C19.7485 8.00104 21.1263 9.68385 21.938 11.652C22.0213 11.8765 22.0213 12.1235 21.938 12.348C21.1263 14.3161 19.7485 15.999 17.9792 17.1831C16.21 18.3672 14.129 18.9994 12 18.9994C9.87104 18.9994 7.79003 18.3672 6.02077 17.1831C4.25152 15.999 2.8737 14.3161 2.062 12.348Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const LockIcon = ({ color = '#059669' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path
      d="M14.25 8.25H3.75C2.92157 8.25 2.25 8.92157 2.25 9.75V15C2.25 15.8284 2.92157 16.5 3.75 16.5H14.25C15.0784 16.5 15.75 15.8284 15.75 15V9.75C15.75 8.92157 15.0784 8.25 14.25 8.25Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.25 8.25V5.25C5.25 4.25544 5.64509 3.30161 6.34835 2.59835C7.05161 1.89509 8.00544 1.5 9 1.5C9.99456 1.5 10.9484 1.89509 11.6517 2.59835C12.3549 3.30161 12.75 4.25544 12.75 5.25V8.25"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const ChevronRightIcon = ({ color = '#D1D5DB' }: { color?: string }) => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Path d="M7 4L12 9L7 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const CheckCircleIcon = () => (
  <Svg width={44} height={44} viewBox="0 0 44 44" fill="none">
    <Path
      d="M39.9685 18.3333C40.8058 22.4424 40.2091 26.7143 38.2779 30.4366C36.3467 34.159 33.1978 37.1068 29.3563 38.7884C25.5147 40.4701 21.2128 40.7839 17.1679 39.6777C13.1229 38.5714 9.57952 36.1119 7.12851 32.7093C4.6775 29.3066 3.46706 25.1666 3.69905 20.9795C3.93104 16.7925 5.59145 12.8115 8.40336 9.70048C11.2153 6.58946 15.0087 4.53646 19.1511 3.88383C23.2935 3.23121 27.5344 4.01841 31.1667 6.11417"
      stroke="#059669"
      strokeWidth={3.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 20.1667L22 25.6667L40.3333 7.33333"
      stroke="#059669"
      strokeWidth={3.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── PIN Dot Display ────────────────────────────────────────────────────────────

function PinDots({ value }: { value: string }) {
  return (
    <View style={styles.pinDots}>
      {Array.from({ length: 4 }).map((_, i) => {
        const filled = i < value.length;
        return (
          <View
            key={i}
            style={[
              styles.pinDot,
              filled ? styles.pinDotFilled : styles.pinDotEmpty,
            ]}
          />
        );
      })}
    </View>
  );
}

// ── Change PIN Modal ───────────────────────────────────────────────────────────

type PinStep = 'current' | 'new' | 'confirm' | 'success';

function ChangePinModal({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<PinStep>('current');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [error, setError] = useState('');
  const inputRef = useRef<TextInput>(null);
  // Ref to avoid stale closure in setTimeout
  const newPinRef = useRef('');

  useEffect(() => {
    newPinRef.current = newPin;
  }, [newPin]);

  // Auto-focus the system keyboard on each step
  useEffect(() => {
    if (!visible || step === 'success') return;
    const t = setTimeout(() => inputRef.current?.focus(), 150);
    return () => clearTimeout(t);
  }, [visible, step]);

  const resetAndClose = useCallback(() => {
    setStep('current');
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setError('');
    onClose();
  }, [onClose]);

  const activePin =
    step === 'current' ? currentPin :
    step === 'new' ? newPin : confirmPin;

  const handleChange = useCallback((text: string) => {
    const digits = text.replace(/[^0-9]/g, '').slice(0, 4);
    setError('');

    if (step === 'current') { setCurrentPin(digits); }
    else if (step === 'new') { setNewPin(digits); }
    else if (step === 'confirm') { setConfirmPin(digits); }

    if (digits.length === 4) {
      setTimeout(() => {
        if (step === 'current') {
          setCurrentPin('');
          setStep('new');
        } else if (step === 'new') {
          setConfirmPin('');
          setStep('confirm');
        } else if (step === 'confirm') {
          if (digits === newPinRef.current) {
            setStep('success');
          } else {
            setError('PINs do not match. Try again.');
            setConfirmPin('');
          }
        }
      }, 120);
    }
  }, [step]);

  const stepTitle =
    step === 'current' ? 'Enter Current PIN' :
    step === 'new' ? 'Enter New PIN' :
    step === 'confirm' ? 'Confirm New PIN' : '';

  const stepSubtitle =
    step === 'current' ? 'Enter your existing 4-digit PIN' :
    step === 'new' ? 'Choose a secure 4-digit PIN' :
    step === 'confirm' ? 'Re-enter your new PIN to confirm' : '';

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={resetAndClose}
    >
      <View style={styles.modalContainer}>
        {/* Handle bar */}
        <View style={styles.handleBar} />

        {step === 'success' ? (
          /* ── Success state ── */
          <View style={styles.successWrap}>
            <View style={styles.successIconWrap}>
              <CheckCircleIcon />
            </View>
            <Text style={styles.successTitle} allowFontScaling={false}>
              PIN Changed!
            </Text>
            <Text style={styles.successSubtitle} allowFontScaling={false}>
              Your card PIN has been updated successfully. Use your new PIN for future transactions.
            </Text>
            <Pressable
              style={styles.doneButton}
              onPress={resetAndClose}
              accessibilityLabel="Done"
            >
              <Text style={styles.doneButtonText} allowFontScaling={false}>
                Done
              </Text>
            </Pressable>
          </View>
        ) : (
          /* ── PIN entry steps ── */
          <>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Pressable
                style={styles.modalCloseBtn}
                onPress={resetAndClose}
                accessibilityLabel="Cancel"
              >
                <Text style={styles.modalCloseText} allowFontScaling={false}>
                  Cancel
                </Text>
              </Pressable>
            </View>

            {/* Step indicator */}
            <View style={styles.stepDots}>
              {(['current', 'new', 'confirm'] as PinStep[]).map(s => (
                <View
                  key={s}
                  style={[
                    styles.stepDot,
                    step === s && styles.stepDotActive,
                    (step === 'new' && s === 'current') ||
                    (step === 'confirm' && s !== 'confirm')
                      ? styles.stepDotDone
                      : null,
                  ]}
                />
              ))}
            </View>

            {/* Title */}
            <Text style={styles.pinStepTitle} allowFontScaling={false}>
              {stepTitle}
            </Text>
            <Text style={styles.pinStepSubtitle} allowFontScaling={false}>
              {stepSubtitle}
            </Text>

            {/* PIN dots — tap to bring up keyboard */}
            <Pressable
              onPress={() => inputRef.current?.focus()}
              accessibilityLabel="PIN entry"
            >
              <PinDots value={activePin} />
            </Pressable>

            {/* Hidden TextInput — drives system keyboard */}
            <TextInput
              ref={inputRef}
              value={activePin}
              onChangeText={handleChange}
              keyboardType="number-pad"
              maxLength={4}
              caretHidden
              style={styles.hiddenInput}
            />

            {/* Error */}
            {error ? (
              <Text style={styles.errorText} allowFontScaling={false}>
                {error}
              </Text>
            ) : (
              <View style={{ height: 20 }} />
            )}
          </>
        )}
      </View>
    </Modal>
  );
}

// ── CardPinScreen ──────────────────────────────────────────────────────────────

export default function CardPinScreen() {
  const navigation = useNavigation<any>();
  const [changePinVisible, setChangePinVisible] = useState(false);

  return (
    <>
      <ScreenWrapper edges={['top', 'left', 'right']}>
        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View className="flex-row items-center px-xl h-[56px] gap-[16px]">
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
            PIN &amp; Security
          </Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Hero ──────────────────────────────────────────────────────── */}
          <View style={styles.hero}>
            <View style={styles.shieldWrap}>
              <ShieldIcon color="#2563EB" />
            </View>
            <Text style={styles.heroTitle} allowFontScaling={false}>
              Card PIN Security
            </Text>
            <Text style={styles.heroSubtitle} allowFontScaling={false}>
              {'Manage your card PIN securely. Your PIN is encrypted and never stored in plain text.'}
            </Text>
          </View>

          {/* ── Action Card ───────────────────────────────────────────────── */}
          <View style={styles.actionCard}>
            {/* Change PIN */}
            <Pressable
              className="flex-row items-center px-4 gap-[14px] h-[72px] active:bg-neutral-50"
              onPress={() => setChangePinVisible(true)}
              accessibilityLabel="Change PIN"
            >
              <View
                className="w-[48px] h-[48px] rounded-2xl items-center justify-center shrink-0"
                style={{ backgroundColor: '#EFF6FF' }}
              >
                <KeyIcon color="#2563EB" />
              </View>
              <View className="flex-1 gap-[2px]">
                <Text style={styles.actionTitle} allowFontScaling={false}>
                  Change PIN
                </Text>
                <Text style={styles.actionSubtitle} allowFontScaling={false}>
                  Update your 4-digit card PIN
                </Text>
              </View>
              <ChevronRightIcon />
            </Pressable>

            {/* Divider */}
            <View style={styles.divider} />

            {/* View PIN */}
            <Pressable
              className="flex-row items-center px-4 gap-[14px] h-[72px] active:bg-neutral-50"
              onPress={() => navigation.navigate('ViewPin')}
              accessibilityLabel="View PIN"
            >
              <View
                className="w-[48px] h-[48px] rounded-2xl items-center justify-center shrink-0"
                style={{ backgroundColor: '#F5F3FF' }}
              >
                <EyeIcon color="#7C3AED" />
              </View>
              <View className="flex-1 gap-[2px]">
                <Text style={styles.actionTitle} allowFontScaling={false}>
                  View PIN
                </Text>
                <Text style={styles.actionSubtitle} allowFontScaling={false}>
                  Hold to reveal your card PIN
                </Text>
              </View>
              <ChevronRightIcon />
            </Pressable>
          </View>

          {/* ── Security Notice ───────────────────────────────────────────── */}
          <View style={styles.securityBanner}>
            <View style={{ marginTop: 1 }}>
              <LockIcon color="#059669" />
            </View>
            <Text style={styles.securityText} allowFontScaling={false}>
              {'Your PIN is protected with end-to-end encryption. We recommend changing your PIN every 90 days for maximum security.'}
            </Text>
          </View>
        </ScrollView>
      </ScreenWrapper>

      {/* ── Change PIN Modal ─────────────────────────────────────────────── */}
      <ChangePinModal
        visible={changePinVisible}
        onClose={() => setChangePinVisible(false)}
      />
    </>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  scrollContent: {
    paddingTop: 8,
    paddingBottom: 40,
    paddingHorizontal: 24,
    gap: 20,
  },

  // Hero
  hero: {
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 4,
    gap: 8,
  },
  shieldWrap: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: '#EFF6FF',
    borderWidth: 1,
    borderColor: '#BFDBFE',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  heroTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 18,
    lineHeight: 27,
    color: '#111827',
    textAlign: 'center',
  },
  heroSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  // Action card
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 16,
    overflow: 'hidden',
  },
  actionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#111827',
  },
  actionSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginLeft: 78,
  },

  // Security banner
  securityBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: '#F0FDF4',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    borderRadius: 14,
    paddingHorizontal: 17,
    paddingVertical: 15,
  },
  securityText: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#065F46',
  },

  // Modal
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 12,
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#E5E7EB',
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
  },
  modalCloseBtn: {
    padding: 8,
  },
  modalCloseText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: '#2563EB',
  },

  // Step indicator
  stepDots: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  stepDotActive: {
    width: 24,
    backgroundColor: '#2563EB',
  },
  stepDotDone: {
    backgroundColor: '#93C5FD',
  },

  // PIN step
  pinStepTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    color: '#111827',
    textAlign: 'center',
  },
  pinStepSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 32,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: '#EF4444',
    textAlign: 'center',
    marginBottom: 4,
  },

  // PIN dots display
  pinDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 8,
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  pinDotFilled: {
    backgroundColor: '#2563EB',
  },
  pinDotEmpty: {
    backgroundColor: '#E5E7EB',
  },

  // Hidden system keyboard input
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
  },

  // Success
  successWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    gap: 16,
    paddingBottom: 40,
  },
  successIconWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F0FDF4',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  successTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 22,
    lineHeight: 33,
    color: '#111827',
    textAlign: 'center',
  },
  successSubtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 21,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  doneButton: {
    marginTop: 8,
    backgroundColor: '#2563EB',
    borderRadius: 14,
    height: 52,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});
