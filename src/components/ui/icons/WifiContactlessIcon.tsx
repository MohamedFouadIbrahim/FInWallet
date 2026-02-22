import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const WifiContactlessIcon = ({ size = 16, color = '#FFFFFF' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M8 13.3333H8.00667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M1.33333 5.88C3.16674 4.24015 5.54023 3.33356 8 3.33356C10.4598 3.33356 12.8333 4.24015 14.6667 5.88"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M3.33333 8.57267C4.57953 7.35115 6.25498 6.66695 8 6.66695C9.74502 6.66695 11.4205 7.35115 12.6667 8.57267"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.66667 10.9527C6.28976 10.3419 7.12749 9.99981 8 9.99981C8.87251 9.99981 9.71024 10.3419 10.3333 10.9527"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default WifiContactlessIcon;
