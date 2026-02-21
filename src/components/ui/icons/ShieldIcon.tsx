import React from 'react';
import Svg, { G, Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ShieldIcon = ({ size = 24, color = '#2563EB' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
    <G>
      <Path
        d="M26.6667 17.3333C26.6667 24 22 27.3333 16.4533 29.2667C16.1629 29.3651 15.8474 29.3604 15.56 29.2533C10 27.3333 5.33333 24 5.33333 17.3333V8C5.33333 7.64638 5.47381 7.30724 5.72386 7.05719C5.97391 6.80714 6.31304 6.66667 6.66667 6.66667C9.33333 6.66667 12.6667 5.06667 14.9867 3.04C15.2691 2.79866 15.6285 2.66607 16 2.66607C16.3715 2.66607 16.7309 2.79866 17.0133 3.04C19.3467 5.08 22.6667 6.66667 25.3333 6.66667C25.687 6.66667 26.0261 6.80714 26.2761 7.05719C26.5262 7.30724 26.6667 7.64638 26.6667 8V17.3333Z"
        stroke={color}
        strokeWidth={2.66667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </G>
  </Svg>
);

export default ShieldIcon;
