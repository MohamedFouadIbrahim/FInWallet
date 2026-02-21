import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ShieldCheckIcon = ({ size = 20, color = '#10B981' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M16.6667 10.8333C16.6667 15 13.75 17.0833 10.2833 18.2917C10.1018 18.3532 9.90461 18.3502 9.725 18.2833C6.25 17.0833 3.33333 15 3.33333 10.8333V5C3.33333 4.77899 3.42113 4.56703 3.57741 4.41074C3.73369 4.25446 3.94565 4.16667 4.16667 4.16667C5.83333 4.16667 7.91667 3.16667 9.36667 1.9C9.54321 1.74917 9.76779 1.66629 10 1.66629C10.2322 1.66629 10.4568 1.74917 10.6333 1.9C12.0917 3.175 14.1667 4.16667 15.8333 4.16667C16.0543 4.16667 16.2663 4.25446 16.4226 4.41074C16.5789 4.56703 16.6667 4.77899 16.6667 5V10.8333Z"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M7.5 10L9.16667 11.6667L12.5 8.33333"
      stroke={color}
      strokeWidth={1.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ShieldCheckIcon;
