import React from 'react'
import usePagination from '../hooks/usePagination';
import styled from '@emotion/styled/macro';
import {GrFormPrevious,GrFormNext} from 'react-icons/gr'
import {AiOutlineEllipsis} from 'react-icons/ai'

interface Props {
  count: number;
  page: number;
  onPageChnage: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number; // 현재 페이지 전후에 항상 표시되는 페이지 수
  boundaryCount?: number; // 시작과 끝에서 항상 표지되는 페이지의 수
}

const Navigation = styled.nav``;

const Button = styled.button<{selected?: boolean}>`
color : ${({selected}) => selected ? '$fff' : '#000'};
border: 0;
margin: 0;
padding: 8px 12px;
font-size: 16px;
font-weight: normal;
background-color: ${({selected}) => selected ? '#36dafa' : '#fff'};
cursor: pointer;
border-radius: 100%;
width: 48px;
height: 48px;
&:hover {
  background-color: #ccc;
  color : #fff
}
&:active {
  opacity: .8;
}
`;

const Item = styled.li``;

const ItemList = styled.ul`
margin: 0;
padding:0;
display: flex;
list-style: none;
${Item} + ${Item} {
  margin-left: 8px;
}
`;

const Pagination:React.FC<Props> = ({
  count, page, onPageChnage, disabled, siblingCount , boundaryCount
}) => {
  const getLabel = (item :number |string) => {
    if (typeof item === 'number') return item;
    else if (item.indexOf('prev') > -1)  return <GrFormPrevious />;
    else if (item.indexOf('next') > -1) return <GrFormNext />    
  }

  const {items} = usePagination({
    count, page, onPageChnage, disabled, siblingCount , boundaryCount
  });
  return (
    <Navigation>
      <ItemList>
        {
          items.map((props) => (
            <Item key={props.key}>
              <Button disabled={props.disabled} selected={props.selected} onClick={props.onClick}>{getLabel(props.item)}</Button>
            </Item>
          ))
        }
      </ItemList>
    </Navigation>
  )
}

export default Pagination