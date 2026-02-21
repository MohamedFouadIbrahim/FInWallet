import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const MailIcon = ({ size = 16, color = '#111827' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <G>
      <Path
        d="M13.3333 2.66667H2.66667C1.93029 2.66667 1.33333 3.26362 1.33333 4V12C1.33333 12.7364 1.93029 13.3333 2.66667 13.3333H13.3333C14.0697 13.3333 14.6667 12.7364 14.6667 12V4C14.6667 3.26362 14.0697 2.66667 13.3333 2.66667Z"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M14.6667 4.66667L8.68667 8.46667C8.48085 8.59562 8.24288 8.66401 8 8.66401C7.75712 8.66401 7.51915 8.59562 7.31333 8.46667L1.33333 4.66667"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default MailIcon;
