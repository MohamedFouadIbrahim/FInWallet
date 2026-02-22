import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

/** Arrow pointing up-right — used for "Send Money" action */
const SendArrowIcon = ({ size = 16, color = '#FFFFFF' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M4.66667 4.66667H11.3333V11.3333"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M4.66667 11.3333L11.3333 4.66667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default SendArrowIcon;
