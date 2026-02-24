import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CheckCircleSuccessIcon = ({ size = 44, color = '#059669' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 44 44" fill="none">
    <Path
      d="M22 40.3333C32.1252 40.3333 40.3333 32.1252 40.3333 22C40.3333 11.8748 32.1252 3.66667 22 3.66667C11.8748 3.66667 3.66667 11.8748 3.66667 22C3.66667 32.1252 11.8748 40.3333 22 40.3333Z"
      stroke={color}
      strokeWidth={3.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.5 22L20.1667 25.6667L27.5 18.3333"
      stroke={color}
      strokeWidth={3.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CheckCircleSuccessIcon;
