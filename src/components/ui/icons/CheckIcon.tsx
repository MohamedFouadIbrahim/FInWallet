import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CheckIcon = ({ size = 14, color = '#FFFFFF' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <G>
      <Path
        d="M11.6667 3.5L5.25 9.91667L2.33333 7"
        stroke={color}
        strokeWidth={1.16667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default CheckIcon;
