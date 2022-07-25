import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled/macro'
import {css} from '@emotion/react'
import {RiArrowLeftLine,RiArrowRightLine} from 'react-icons/ri'

const Base = styled.div``;

const Container = styled.div`
  position: relative;
`;

const ArrowButton = styled.button<{pos: 'Left' | 'Right'}>`
position: absolute;
top: 50%;
z-index: 1;
padding: 8px 12px;
font-size: 48px;
font-weight: bold;
background-color: transparent;
color: #fff;
border:  none;
margin: 0;
cursor: pointer;
${({pos}) => pos === 'Left' ? css`left: 0;` : css`right: 0;`};
`;

const CarouselList = styled.ul`
list-style: none;
margin: 0;
padding: 0;
display: flex;
overflow: hidden;
`;

const CarouselListItem = styled.li<({activeIndex : number})>`
  width: 100%;
  flex: 1 0 100%;
  transform: translateX(-${({activeIndex}) => activeIndex * 100 }%);
  transition: 200ms ease;
  > img {
    width: 100%;
    height: fit-content;
  }
`;

const NavButton = styled.button<{isActive?: boolean}>`
width: 4px;
height: 4px;
background-color: #000;
opacity: ${({isActive}) => isActive ? .3 : .1};
`;

const NavItem = styled.li`
display: inline-block;
`;

const Nav = styled.ul`
list-style: none;
padding: 0;
margin: 0;
display: flex;
justify-content: center;
${NavItem} + ${NavItem} {
  margin-left: 5px;
}
`;

const banners = ['https://via.placeholder.com/600/92c952','https://via.placeholder.com/600/718372','https://via.placeholder.com/600/102940'];

const Carousel: React.FC = () => {
  const [activeIndex,setActiveIndex] = useState<number>(0);
  const [isFocused , setIsFocused] = useState<boolean>(false);
  // 포커스 된 상태이면 캐러셀을 멈추기 위해 사용

  const handleNext = () => {
    setActiveIndex(prev => (prev + 1) % banners.length);
    // % banners.length하는 이유 : 마지막 이미지에서 넘겼을 때 처음 이미지가 나오도록(prev + 1 이 4가 됐을 때, banners의 length인 3으로 나눠서 나머지 1번 이미지로 감)
  }
  const handlePrev = () => {
    setActiveIndex(prev => (prev - 1 + banners.length) % banners.length);
    // 첫 이미지에서 이전 버튼을 누르면 마지막 배너로 이동하기 위함
  }

  const goTo = (idx :number) => {
    setActiveIndex(idx);
  }
  // NavItem(아래 동그라미)로 이동하는 기능

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if(!isFocused) {
      intervalId = setInterval(handleNext, 3000)
    }

    return () => {
      clearInterval(intervalId)
    }
  },[isFocused])

  return (
    // 주의... 당연히 미리 만들어서 호출하는 게 더 좋다.
    <Base onMouseEnter={() => setIsFocused(true)} onMouseLeave={() => setIsFocused(false)}>
      <Container>
        <ArrowButton pos="Left" onClick={handlePrev}>
          <RiArrowLeftLine />
        </ArrowButton>
        <CarouselList>
          {
            banners.map((banner,idx) => (
              <CarouselListItem activeIndex={activeIndex} key={idx}>
                <img src={banner} />
              </CarouselListItem>
            ))
          }
        </CarouselList>
        <ArrowButton pos="Right" onClick={handleNext}>
          <RiArrowRightLine />
        </ArrowButton>
      </Container>
      <Nav>
        {/*banners의 길이와 같은 길이를 가진 새로운 배열을 만든다.*/}
        {
        Array.from({length : banners.length}).map((_,idx) => (
          // map((_,idx) => {...}) 형식은 인덱스를 가져오는데 많이 쓰이는 것 같다.
          <NavItem key={idx} onClick={() => goTo(idx)}>
            <NavButton isActive={activeIndex === idx} />
          </NavItem>
        ))
        }
      </Nav>
    </Base>
  )
}

export default Carousel;