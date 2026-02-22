import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const FlashIcon = ({ size = 20, color = '#374151' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M10.8333 1.66667L2.5 11.6667H10L9.16667 18.3333L17.5 8.33333H10L10.8333 1.66667Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FlashIcon;
