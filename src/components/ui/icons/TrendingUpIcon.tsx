import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const TrendingUpIcon = ({ size = 24, color = '#2563EB' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <G>
      <Path
        d="M2.667 22.667L11.333 14L18 20.667L29.333 9.333"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M21.333 9.333H29.333"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M29.333 9.333V17.333"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default TrendingUpIcon;
