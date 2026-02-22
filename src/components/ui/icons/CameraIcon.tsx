import React from 'react';
import Svg, { Path, Rect, Circle } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const CameraIcon = ({ size = 20, color = '#FFFFFF' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M13.3333 3.33333L14.9167 5H17.5C17.942 5 18.366 5.17559 18.6785 5.48816C18.9911 5.80072 19.1667 6.22464 19.1667 6.66667V15.8333C19.1667 16.2754 18.9911 16.6993 18.6785 17.0118C18.366 17.3244 17.942 17.5 17.5 17.5H2.5C2.05797 17.5 1.63405 17.3244 1.32149 17.0118C1.00893 16.6993 0.833332 16.2754 0.833332 15.8333V6.66667C0.833332 6.22464 1.00893 5.80072 1.32149 5.48816C1.63405 5.17559 2.05797 5 2.5 5H5.08333L6.66667 3.33333H13.3333Z"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx={10}
      cy={11.25}
      r={3.33333}
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default CameraIcon;
