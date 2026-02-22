import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const ScanFaceIcon = ({ size = 20, color = '#FFFFFF' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <Path
      d="M1.66667 6.66667V4.16667C1.66667 3.72464 1.84226 3.30072 2.15482 2.98816C2.46738 2.67559 2.8913 2.5 3.33333 2.5H5.83333"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M14.1667 2.5H16.6667C17.1087 2.5 17.5326 2.67559 17.8452 2.98816C18.1577 3.30072 18.3333 3.72464 18.3333 4.16667V6.66667"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.3333 13.3333V15.8333C18.3333 16.2754 18.1577 16.6993 17.8452 17.0118C17.5326 17.3244 17.1087 17.5 16.6667 17.5H14.1667"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5.83333 17.5H3.33333C2.8913 17.5 2.46738 17.3244 2.15482 17.0118C1.84226 16.6993 1.66667 16.2754 1.66667 15.8333V13.3333"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx={7.5} cy={8.33333} r={0.833333} fill={color} />
    <Circle cx={12.5} cy={8.33333} r={0.833333} fill={color} />
    <Path
      d="M7.5 12.5C7.5 12.5 8.33333 13.75 10 13.75C11.6667 13.75 12.5 12.5 12.5 12.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M10 5.83333V7.5"
      stroke={color}
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default ScanFaceIcon;
