import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import CheckIcon from '@components/ui/icons/CheckIcon';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import type { OnboardingStackParamList } from '@features/onboarding/navigation/OnboardingNavigator';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'ChooseLanguage'>;

interface Language {
  id: string;
  flag: string;
  name: string;
  nativeName: string;
}

const LANGUAGES: Language[] = [
  { id: 'en', flag: '🇺🇸', name: 'English', nativeName: 'English' },
  { id: 'ar', flag: '🇸🇦', name: 'Arabic', nativeName: 'العربية' },
  { id: 'fr', flag: '🇫🇷', name: 'French', nativeName: 'Français' },
];

export default function ChooseLanguageScreen({ navigation }: Props) {
  const { isDark } = useTheme();
  const [selectedId, setSelectedId] = useState('en');

  return (
    <ScreenWrapper>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text
            className="text-neutral-900 dark:text-neutral-50 font-jakarta-bold"
            style={styles.title}
            allowFontScaling={false}
          >
            Choose Your Language
          </Text>
          <Text
            className="text-neutral-500 dark:text-neutral-400 font-inter-regular"
            style={styles.subtitle}
          >
            Select your preferred language to personalize your experience.
          </Text>
        </View>

        {/* ── Language List ── */}
        <View style={styles.list}>
          {LANGUAGES.map(lang => {
            const isSelected = lang.id === selectedId;
            return (
              <Pressable
                key={lang.id}
                onPress={() => setSelectedId(lang.id)}
                accessibilityLabel={`Select ${lang.name}`}
                accessibilityRole="radio"
                accessibilityState={{ selected: isSelected }}
                style={[
                  styles.item,
                  isSelected
                    ? isDark
                      ? styles.itemSelectedDark
                      : styles.itemSelected
                    : isDark
                      ? styles.itemUnselectedDark
                      : styles.itemUnselected,
                ]}
              >
                {/* Flag emoji */}
                <Text style={styles.flag}>{lang.flag}</Text>

                {/* Name + native name */}
                <View style={styles.labelContainer}>
                  <Text
                    className="text-neutral-900 dark:text-neutral-50 font-inter-semibold"
                    style={styles.langName}
                    allowFontScaling={false}
                  >
                    {lang.name}
                  </Text>
                  <Text
                    className="text-neutral-400 dark:text-neutral-500 font-inter-regular"
                    style={styles.nativeName}
                  >
                    {lang.nativeName}
                  </Text>
                </View>

                {/* Selection indicator */}
                <View
                  style={[
                    styles.indicator,
                    isSelected
                      ? styles.indicatorSelected
                      : [
                          styles.indicatorUnselected,
                          isDark && styles.indicatorUnselectedDark,
                        ],
                  ]}
                >
                  {isSelected && <CheckIcon size={14} color="#FFFFFF" />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* ── Continue Button ── */}
        <Pressable
          style={styles.continueBtn}
          className="active:opacity-pressed"
          accessibilityLabel="Continue"
          onPress={() => navigation.navigate('GetStarted')}
        >
          <Text
            className="text-white font-inter-semibold"
            style={styles.continueBtnText}
            allowFontScaling={false}
          >
            Continue
          </Text>
        </Pressable>
      </ScrollView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 40,
    gap: 40,
    flexGrow: 1,
  },
  header: {
    gap: 8,
  },
  title: {
    fontSize: 28,
    lineHeight: 35,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 25.6,
    maxWidth: 255,
  },
  list: {
    gap: 12,
  },
  item: {
    height: 78,
    borderRadius: 12,
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    gap: 16,
  },
  itemSelected: {
    backgroundColor: '#EFF6FF',
    borderColor: '#2563EB',
  },
  itemSelectedDark: {
    backgroundColor: 'rgba(37, 99, 235, 0.15)',
    borderColor: '#2563EB',
  },
  itemUnselected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
  },
  itemUnselectedDark: {
    backgroundColor: '#1E293B',
    borderColor: '#334155',
  },
  flag: {
    fontSize: 28,
    lineHeight: 42,
    width: 28,
    textAlign: 'center',
  },
  labelContainer: {
    flex: 1,
  },
  langName: {
    fontSize: 16,
    lineHeight: 22.4,
  },
  nativeName: {
    fontSize: 14,
    lineHeight: 19.6,
  },
  indicator: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicatorSelected: {
    backgroundColor: '#2563EB',
  },
  indicatorUnselected: {
    borderWidth: 2,
    borderColor: '#D1D5DB',
  },
  indicatorUnselectedDark: {
    borderColor: '#4B5563',
  },
  continueBtn: {
    height: 52,
    borderRadius: 12,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueBtnText: {
    fontSize: 16,
    lineHeight: 22.857,
  },
});
