import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ExchangeArrowsIcon = ({ size = 20, color = '#7C3AED' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M6.66667 2.5L3.33333 5.83333L6.66667 9.16667"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.33333 5.83333H16.6667"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.3333 17.5L16.6667 14.1667L13.3333 10.8333"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.6667 14.1667H3.33333"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ExchangeArrowsIcon;
