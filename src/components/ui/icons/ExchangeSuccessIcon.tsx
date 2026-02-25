import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ExchangeSuccessIcon = ({ size = 36, color = '#059669' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
    <Path
      d="M18 33C26.2843 33 33 26.2843 33 18C33 9.71573 26.2843 3 18 3C9.71573 3 3 9.71573 3 18C3 26.2843 9.71573 33 18 33Z"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M13.5 18L16.5 21L22.5 15"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ExchangeSuccessIcon;
