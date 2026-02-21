import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface Props {
  size?: number;
  color?: string;
}

const FaceIdIcon = ({ size = 56, color = '#2563EB' }: Props) => (
  <Svg width={size} height={size} viewBox="0 0 56 56" fill="none">
    <Path
      d="M7 16.3333V11.6667C7 10.429 7.49167 9.24201 8.36684 8.36684C9.24201 7.49167 10.429 7 11.6667 7H16.3333"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M39.6667 7H44.3333C45.571 7 46.758 7.49167 47.6332 8.36684C48.5083 9.24201 49 10.429 49 11.6667V16.3333"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M49 39.6667V44.3333C49 45.571 48.5083 46.758 47.6332 47.6332C46.758 48.5083 45.571 49 44.3333 49H39.6667"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M16.3333 49H11.6667C10.429 49 9.24201 48.5083 8.36684 47.6332C7.49167 46.758 7 45.571 7 44.3333V39.6667"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M18.6667 32.6667C18.6667 32.6667 22.1667 37.3333 28 37.3333C33.8333 37.3333 37.3333 32.6667 37.3333 32.6667"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M21 21H21.0233"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M35 21H35.0233"
      stroke={color}
      strokeWidth={4.66667}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default FaceIdIcon;
