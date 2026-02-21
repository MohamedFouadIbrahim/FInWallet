import React, { useCallback, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewToken,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import GlobeIcon from '@components/ui/icons/GlobeIcon';
import ShieldIcon from '@components/ui/icons/ShieldIcon';
import TrendingUpIcon from '@components/ui/icons/TrendingUpIcon';
import ScreenWrapper from '@components/layout/ScreenWrapper';
import { useTheme } from '@theme/useTheme';
import type { OnboardingStackParamList } from '@features/onboarding/navigation/OnboardingNavigator';

import PaginationDots from '@features/onboarding/components/PaginationDots';

type Props = NativeStackScreenProps<OnboardingStackParamList, 'Welcome'>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface WalkthroughSlide {
  icon: React.ReactElement;
  image: string;
  headline: string;
  description: string;
}

const slides: WalkthroughSlide[] = [
  {
    icon: <ShieldIcon size={32} color="#2563EB" />,
    image:
      'https://images.unsplash.com/photo-1726064855971-f12e80d59680?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBwYXltZW50JTIwc2VjdXJlJTIwZGlnaXRhbHxlbnwxfHx8fDE3NzE0MzA0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    headline: 'Fast & Secure Payments',
    description:
      'Send and receive money instantly with bank-grade encryption. Your transactions are protected with advanced security protocols.',
  },
  {
    icon: <GlobeIcon size={32} color="#2563EB" />,
    image:
      'https://images.unsplash.com/photo-1763047360803-4f0432c73b11?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnbG9iYWwlMjBjdXJyZW5jeSUyMGV4Y2hhbmdlJTIwZmluYW5jZXxlbnwxfHx8fDE3NzE0MzA0MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    headline: 'Multi-Currency Wallet',
    description:
      'Hold, exchange, and manage multiple currencies in one place. Competitive rates for seamless international transfers.',
  },
  {
    icon: <TrendingUpIcon size={32} color="#2563EB" />,
    image:
      'https://images.unsplash.com/photo-1763038311036-6d18805537e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5hbmNpYWwlMjBhbmFseXRpY3MlMjBjaGFydCUyMGluc2lnaHRzfGVufDF8fHx8MTc3MTQzMDQxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    headline: 'Smart Spending Insights',
    description:
      'Track your spending patterns with intelligent analytics. Get personalized tips to save more and spend wisely.',
  },
];

export default function WelcomeScreen({ navigation }: Props) {
  const { isDark } = useTheme();

  const flatListRef = useRef<FlatList<WalkthroughSlide>>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      const index = viewableItems[0]?.index;
      if (index != null) {
        activeIndexRef.current = index;
        setActiveIndex(index);
      }
    },
    [],
  );

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const handleContinue = () => {
    const next = activeIndexRef.current + 1;
    if (next < slides.length) {
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
    } else {
      navigation.navigate('ChooseLanguage');
    }
  };

  const renderSlide: ListRenderItem<WalkthroughSlide> = useCallback(
    ({ item }) => (
      <View style={{ width: SCREEN_WIDTH }} className="pt-4xl px-xl">
        {/* ── Hero Image Card ── */}
        <View
          className="w-full rounded-lg overflow-hidden"
          style={[styles.imageCard, isDark && styles.imageCardDark]}
        >
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="cover"
          />

          {/* Subtle blue gradient tint overlay */}
          <View style={styles.gradientOverlay} pointerEvents="none" />

          {/* Icon badge */}
          <View
            className="absolute bottom-[16px] right-[16px] w-avatar-lg h-avatar-lg rounded-lg items-center justify-center"
            style={[
              styles.badge,
              {
                backgroundColor: isDark
                  ? 'rgba(30,41,59,0.95)'
                  : 'rgba(255,255,255,0.95)',
              },
            ]}
          >
            {item.icon}
          </View>
        </View>

        {/* ── Text Content ── */}
        <View className="items-center gap-md py-2xl">
          <Text
            className="text-h1 font-jakarta-bold text-neutral-900 dark:text-neutral-50 text-center"
            allowFontScaling={false}
          >
            {item.headline}
          </Text>
          <Text className="text-body-lg font-inter-regular text-neutral-500 dark:text-neutral-400 text-center">
            {item.description}
          </Text>
        </View>
      </View>
    ),
    [isDark],
  );

  return (
    <ScreenWrapper>
      {/* ── Slides ── */}
      <FlatList
        ref={flatListRef}
        data={slides}
        keyExtractor={(_, i) => String(i)}
        renderItem={renderSlide}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.list}
      />

      {/* ── Bottom Controls ── */}
      <View className="items-center gap-xl px-xl pb-xl">
        <PaginationDots total={slides.length} activeIndex={activeIndex} />

        <Pressable
          className="w-full h-btn bg-info-600 rounded-md items-center justify-center active:opacity-pressed"
          onPress={handleContinue}
          accessibilityLabel={
            activeIndex === slides.length - 1
              ? 'Get started'
              : 'Continue to next slide'
          }
        >
          <Text
            className="text-body-lg font-inter-semibold text-white"
            allowFontScaling={false}
          >
            {activeIndex === slides.length - 1 ? 'Get Started' : 'Continue'}
          </Text>
        </Pressable>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  imageCard: {
    height: 280,
    shadowColor: '#2563EB',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  imageCardDark: {
    shadowOpacity: 0.2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(37, 99, 235, 0.08)',
  },
  badge: {
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});
