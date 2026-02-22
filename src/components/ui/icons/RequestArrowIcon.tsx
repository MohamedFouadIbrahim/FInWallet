import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

/** Arrow pointing down-left — used for "Request" action */
const RequestArrowIcon = ({ size = 16, color = '#FFFFFF' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <Path
      d="M11.3333 4.66667L4.66667 11.3333"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M11.3333 11.3333H4.66667V4.66667"
      stroke={color}
      strokeWidth={1.33333}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default RequestArrowIcon;
