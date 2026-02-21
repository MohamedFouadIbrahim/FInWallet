import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const GlobeIcon = ({ size = 24, color = '#2563EB' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <G>
      <Path
        d="M16 29.3333C23.3638 29.3333 29.3333 23.3638 29.3333 16C29.3333 8.6362 23.3638 2.66667 16 2.66667C8.6362 2.66667 2.66667 8.6362 2.66667 16C2.66667 23.3638 8.6362 29.3333 16 29.3333Z"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M16 2.66667C12.5763 6.26154 10.6667 11.0357 10.6667 16C10.6667 20.9643 12.5763 25.7385 16 29.3333C19.4237 25.7385 21.3333 20.9643 21.3333 16C21.3333 11.0357 19.4237 6.26154 16 2.66667Z"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M2.66667 16H29.3333"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default GlobeIcon;
