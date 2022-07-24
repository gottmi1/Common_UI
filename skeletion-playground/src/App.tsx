import styled from '@emotion/styled/macro';
import { useEffect, useState } from 'react';
import Skeleton from './components/Skeleton';

const Base = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(5,1fr);
  column-gap: 12px;
  row-gap: 24px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  border-radius: 4px;
`;

const ImageWrapper = styled.div`
width :100%;
`;

const Image = styled.img`
width:100%;
height: 100%;
object-fit: cover;
`;

const Info = styled.div`
  padding:  1rem;
  display: flex;
  flex-direction: column;
  flex: 1 1 0%;
`;

const Title = styled.h4`
margin : 0;
padding: 0;
font-size: 24px;
`;

const Description = styled.p`
  margin: 8 0 0 0;
  padding: 0;
  font-size: 16px;
`;

const Placeholder:React.FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Skeleton width={500} height={7050} />
      </ImageWrapper>
      <Info>
        <Skeleton width={1} rounded />
        <div  style={{height : '500px'}} />
        <Skeleton width={1} rounded />
      </Info>
    </Container>
  )
}

const Item: React.FC = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image src='https://images.pexels.com/photos/3756616/pexels-photo-3756616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
      </ImageWrapper>
      <Info>
        <Title>스켈레톤 123123123123123</Title>
        <Description>슼ㅋㅋ켈ㄹㄹㄹㄹ레ㅔㅔㅔㅔㅔ톤ㄴㄴㄴㄴ</Description>
      </Info>
    </Container>
  )
}

function App() {

  const [loading , setLoading] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    },2000)
  },[])

  return (
    <Base>
      {
        loading ? 
        Array.from({length:50}).map((_, idx) => (
          <Placeholder key={idx} />
        )) :
        Array.from({length:25}).map((_, idx) => (
          <Item key={idx} />
        ))
      }
    </Base>
  );
}

export default App;
