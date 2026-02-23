import React, { useCallback, useEffect, useState } from 'react';
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, G, Rect, Defs, ClipPath } from 'react-native-svg';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

// ── Icons ─────────────────────────────────────────────────────────────────────


const FlashOffIcon = () => (
  <Svg width={18} height={18} viewBox="0 0 18 18" fill="none">
    <Defs>
      <ClipPath id="flash-clip">
        <Rect width={18} height={18} fill="white" />
      </ClipPath>
    </Defs>
    <G clipPath="url(#flash-clip)">
      <Path
        d="M7.88475 3.642L9.84 1.6275C9.8957 1.56321 9.97159 1.51977 10.0552 1.5043C10.1389 1.48883 10.2253 1.50226 10.3003 1.54238C10.3753 1.5825 10.4344 1.64692 10.468 1.72508C10.5016 1.80324 10.5076 1.89049 10.485 1.9725L9.45225 5.21025"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M11.742 7.5H15C15.1419 7.49952 15.2811 7.53931 15.4013 7.61477C15.5215 7.69022 15.6178 7.79823 15.6791 7.92626C15.7404 8.05428 15.764 8.19706 15.7474 8.33801C15.7307 8.47895 15.6744 8.61228 15.585 8.7225L14.295 10.0522"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M12.2047 12.2048L8.16 16.3725C8.1043 16.4368 8.02841 16.4802 7.94476 16.4957C7.86112 16.5112 7.77471 16.4977 7.6997 16.4576C7.6247 16.4175 7.56556 16.3531 7.532 16.2749C7.49844 16.1968 7.49244 16.1095 7.515 16.0275L8.955 11.5125C8.99746 11.3989 9.01172 11.2766 8.99656 11.1562C8.98139 11.0359 8.93725 10.921 8.86793 10.8214C8.79861 10.7219 8.70617 10.6406 8.59854 10.5846C8.49092 10.5286 8.37132 10.4996 8.25 10.5H3C2.85807 10.5005 2.71892 10.4607 2.59872 10.3852C2.47851 10.3098 2.38218 10.2018 2.32091 10.0737C2.25965 9.94572 2.23597 9.80294 2.25262 9.66199C2.26928 9.52105 2.32559 9.38772 2.415 9.2775L5.79525 5.79525"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M1.5 1.5L16.5 16.5"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

const GalleryIcon = () => (
  <Svg width={22} height={22} viewBox="0 0 22 22" fill="none">
    <Path
      d="M17.4167 2.75H4.58333C3.57081 2.75 2.75 3.57081 2.75 4.58333V17.4167C2.75 18.4292 3.57081 19.25 4.58333 19.25H17.4167C18.4292 19.25 19.25 18.4292 19.25 17.4167V4.58333C19.25 3.57081 18.4292 2.75 17.4167 2.75Z"
      stroke="white"
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M8.25 10.0833C9.26252 10.0833 10.0833 9.26252 10.0833 8.25C10.0833 7.23748 9.26252 6.41667 8.25 6.41667C7.23748 6.41667 6.41667 7.23748 6.41667 8.25C6.41667 9.26252 7.23748 10.0833 8.25 10.0833Z"
      stroke="white"
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M19.25 13.75L16.4212 10.9212C16.0774 10.5775 15.6111 10.3844 15.125 10.3844C14.6389 10.3844 14.1726 10.5775 13.8288 10.9212L5.5 19.25"
      stroke="white"
      strokeWidth={1.83333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

// ── Constants ─────────────────────────────────────────────────────────────────

const VIEWFINDER_SIZE = 240;
const CORNER_SIZE     = 36;
const INNER_OFFSET    = 12;
const INNER_SIZE      = VIEWFINDER_SIZE - INNER_OFFSET * 2; // 216
const SCAN_TRAVEL     = INNER_SIZE - 2; // scan line height is 2px

type ScanMode = 'qr' | 'barcode';

// ── Corner bracket ────────────────────────────────────────────────────────────

interface CornerProps {
  position: 'tl' | 'tr' | 'bl' | 'br';
}

const Corner = ({ position }: CornerProps) => {
  const isTop    = position === 'tl' || position === 'tr';
  const isLeft   = position === 'tl' || position === 'bl';

  return (
    <View
      style={[
        styles.corner,
        isTop    ? { top: 0 }               : { bottom: 0 },
        isLeft   ? { left: 0 }              : { right: 0 },
        isTop    ? { borderTopWidth: 3 }    : { borderBottomWidth: 3 },
        isLeft   ? { borderLeftWidth: 3 }   : { borderRightWidth: 3 },
        isTop && isLeft   ? { borderTopLeftRadius: 12 }     : null,
        isTop && !isLeft  ? { borderTopRightRadius: 12 }    : null,
        !isTop && isLeft  ? { borderBottomLeftRadius: 12 }  : null,
        !isTop && !isLeft ? { borderBottomRightRadius: 12 } : null,
      ]}
    />
  );
};

// ── Main screen ───────────────────────────────────────────────────────────────

const QRScannerScreen = () => {
  const [mode, setMode]       = useState<ScanMode>('qr');
  const [flash, setFlash]     = useState(false);

  // Scan line animation — travels top-to-bottom and back
  const scanY = useSharedValue(0);

  useEffect(() => {
    scanY.value = withRepeat(
      withTiming(SCAN_TRAVEL, {
        duration: 2200,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      true,
    );
  }, [scanY]);

  const scanLineStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: scanY.value }],
  }));

  const handleGallery = useCallback(() => {}, []);
  const handleCapture = useCallback(() => {}, []);
  const handleFlash   = useCallback(() => setFlash(f => !f), []);

  return (
    <View style={styles.root}>
      <StatusBar barStyle="light-content" backgroundColor="#0A0A0A" />
      <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <View style={styles.header}>
          {/* Spacer keeps title centred */}
          <View style={styles.emptyHeaderBtn} />

          <Text style={styles.headerTitle} allowFontScaling={false}>
            Scan QR Code
          </Text>

          <Pressable
            style={[styles.headerBtn, flash && styles.headerBtnActive]}
            onPress={handleFlash}
            accessibilityLabel={flash ? 'Turn flash off' : 'Turn flash on'}
            hitSlop={8}
          >
            <FlashOffIcon />
          </Pressable>
        </View>

        {/* ── Camera area ─────────────────────────────────────────────────── */}
        <View style={styles.cameraArea}>

          {/* Viewfinder frame */}
          <View style={styles.viewfinder}>
            {/* Semi-transparent inner fill */}
            <View style={styles.innerFill} />

            {/* Corner brackets */}
            <Corner position="tl" />
            <Corner position="tr" />
            <Corner position="bl" />
            <Corner position="br" />

            {/* Animated scan line */}
            <Animated.View
              style={[styles.scanLineWrap, scanLineStyle]}
              pointerEvents="none"
            >
              <LinearGradient
                colors={['rgba(0,0,0,0)', '#2563EB', 'rgba(0,0,0,0)']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.scanLine}
              />
            </Animated.View>
          </View>

          {/* Instruction */}
          <Text style={styles.instruction} allowFontScaling={false}>
            {'Position the QR code\nwithin the frame to scan'}
          </Text>

          {/* Mode toggle */}
          <View style={styles.modeRow}>
            {(['qr', 'barcode'] as ScanMode[]).map(m => {
              const isActive = mode === m;
              return (
                <Pressable
                  key={m}
                  style={[styles.modePill, isActive ? styles.modePillActive : styles.modePillInactive]}
                  onPress={() => setMode(m)}
                  accessibilityLabel={m === 'qr' ? 'QR Code mode' : 'Barcode mode'}
                >
                  <Text
                    style={[styles.modePillText, isActive ? styles.modePillTextActive : styles.modePillTextInactive]}
                    allowFontScaling={false}
                  >
                    {m === 'qr' ? 'QR Code' : 'Barcode'}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* ── Bottom controls ──────────────────────────────────────────────── */}
        <View style={styles.bottomBar}>
          {/* Gallery */}
          <Pressable
            style={styles.galleryBtn}
            onPress={handleGallery}
            accessibilityLabel="Pick from gallery"
          >
            <View style={styles.galleryIconWrap}>
              <GalleryIcon />
            </View>
            <Text style={styles.galleryLabel} allowFontScaling={false}>
              From Gallery
            </Text>
          </Pressable>

          {/* Capture shutter */}
          <Pressable
            style={styles.shutterRing}
            onPress={handleCapture}
            accessibilityLabel="Capture"
          >
            <LinearGradient
              colors={['#2563EB', '#1D4ED8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.shutterInner}
            />
          </Pressable>

          {/* Spacer to balance the row */}
          <View style={styles.shutterSpacer} />
        </View>

      </SafeAreaView>
    </View>
  );
};

export default QRScannerScreen;

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#0A0A0A',
  },
  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    height: 40,
    marginTop: 4,
  },
  headerBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyHeaderBtn: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBtnActive: {
    backgroundColor: 'rgba(37,99,235,0.3)',
  },
  headerTitle: {
    fontFamily: 'PlusJakartaSans-Bold',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  // Camera / scanner area
  cameraArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 28,
  },
  // Viewfinder
  viewfinder: {
    width: VIEWFINDER_SIZE,
    height: VIEWFINDER_SIZE,
    position: 'relative',
  },
  innerFill: {
    position: 'absolute',
    top: INNER_OFFSET,
    left: INNER_OFFSET,
    width: INNER_SIZE,
    height: INNER_SIZE,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 4,
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
    borderColor: '#2563EB',
  },
  scanLineWrap: {
    position: 'absolute',
    top: INNER_OFFSET,
    left: INNER_OFFSET,
    width: INNER_SIZE,
  },
  scanLine: {
    height: 2,
    width: '100%',
    borderRadius: 1,
    opacity: 0.86,
  },
  // Instruction
  instruction: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 15,
    lineHeight: 22.5,
    color: 'rgba(255,255,255,0.7)',
    textAlign: 'center',
  },
  // Mode toggle
  modeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  modePill: {
    height: 32,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modePillInactive: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  modePillActive: {
    backgroundColor: 'rgba(37,99,235,0.25)',
    borderWidth: 1,
    borderColor: 'rgba(37,99,235,0.5)',
  },
  modePillText: {
    fontFamily: 'Inter24pt-Medium',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.7)',
  },
  modePillTextInactive: {
    color: 'rgba(255,255,255,0.7)',
  },
  modePillTextActive: {
    color: '#60A5FA',
  },
  // Bottom controls
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 48,
    height: 154,
    paddingBottom: 16,
  },
  galleryBtn: {
    alignItems: 'center',
    gap: 8,
    width: 72,
  },
  galleryIconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  galleryLabel: {
    fontFamily: 'Inter24pt-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
  },
  shutterRing: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
  },
  shutterSpacer: {
    width: 72,
    height: 52,
  },
});
