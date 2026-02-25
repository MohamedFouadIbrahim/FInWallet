import React, { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

interface Props {
  size?: number;
  color?: string;
}

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

const ProcessingSpinnerIcon = ({ size = 44, color = '#2563EB' }: Props) => {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 900, easing: Easing.linear }),
      -1,
    );
    return () => cancelAnimation(rotation);
  }, [rotation]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <Animated.View style={animStyle}>
      <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
        <Path
          d="M38.5 22C38.4998 25.4844 37.3966 28.8793 35.3484 31.6982C33.3002 34.5171 30.4122 36.6152 27.0983 37.6918C23.7844 38.7684 20.2147 38.7683 16.9008 37.6915C13.587 36.6147 10.6991 34.5164 8.65107 31.6974C6.60303 28.8785 5.49997 25.4835 5.5 21.9991C5.50002 18.5147 6.60313 15.1197 8.65121 12.3007C10.6993 9.4818 13.5872 7.38358 16.9011 6.30681C20.2149 5.23003 23.7846 5.22998 27.0985 6.30667"
          stroke={color}
          strokeWidth={3.66667}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </Animated.View>
  );
};

export default ProcessingSpinnerIcon;
