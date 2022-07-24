import React, { useMemo } from 'react'
import styled from '@emotion/styled/macro';
import { keyframes,css } from '@emotion/react'

interface Props {
  width?: number;
  height?: number;
  circle?: boolean;
  rounded?: boolean;
  count?: number;
  unit?: string;
  animation?: boolean;
  color?: string;
  style?: React.CSSProperties;
}

const pulseKeyFrame = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.4;
}
100% {
  opacity: 0;
}
`
const pulseAnimation = css`
  animation: ${pulseKeyFrame} 1.5s ease-in-out infinite;
`

const Base = styled.span<Props>`
  ${({color}) => color && `background-color : ${color}`};
  ${({rounded}) => rounded && 'border-radius : 8px'};
  ${({circle}) => circle && 'border-radius: 50%'};
  ${({width,height}) => (width||height) && 'display : block'};
  ${({animation}) => animation && pulseAnimation};
  width: ${({width,unit}) => width && unit && `${width}${unit}` };
  height: ${({height,unit}) => height && unit && `${height}${unit}` };
`;

const Content = styled.span`
  opacity: 0;
`;

const Skeleton: React.FC<Props> = ({
  animation: ture,width,height,circle,rounded,count,unit = 'px',color = '#F4F4F4',style
}) => {
  const content = useMemo(() => [...Array({length : count})].map(() => '-').join(''),[count])
  // count숫자 만큼의 길이를 가진 array를 생성하고, -으로 join함 
  // count가 4일 때 = '----' 6일때 '------' 단순히 글자의 길이를 채우기 위함.

  return (
    <Base>
      <Content>{content}</Content>
    </Base>
  )

}

export default Skeleton;