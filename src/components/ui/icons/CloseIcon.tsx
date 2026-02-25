import React from 'react';
import Svg, { Path, G } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CloseIcon = ({ size = 16, color = '#374151' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 16 16" fill="none">
    <G>
      <Path
        d="M12 4L4 12"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M4 4L12 12"
        stroke={color}
        strokeWidth={1.33333}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default CloseIcon;
