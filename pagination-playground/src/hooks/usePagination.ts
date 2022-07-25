// 필요한 props를 전달받아 items에 넣어 전달해주는 커스텀 훅.

interface Props {
  count: number;
  page: number;
  onPageChnage: (page: number) => void;
  disabled?: boolean;
  siblingCount?: number; // 현재 페이지 전후에 항상 표시되는 페이지 수
  boundaryCount?: number; // 시작과 끝에서 항상 표지되는 페이지의 수
}

const usePagination = ({
  count, page, onPageChnage, disabled, siblingCount = 1, boundaryCount = 1
}: Props) => {

  // 시작과 끝을 지정했을 때, 사이에 해당하는 값들을 배열로 반환해 준다.
  // ex) range(2,5) = [2,3,4,5]배열을 반환.
  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length: length }).map(((_, index) => index + start))
  }
  const startPage = 1;
  const endPage = count;

  // boundaryCount와 count중에 더 작은 값을 찾아 range의 두 번쨰 인자로 넣어줌.
  const startPages = range(startPage, Math.min(boundaryCount, count));
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count)

  const siblingStart = Math.max(Math.min(page + 1 - siblingCount, count - boundaryCount - siblingCount * 2 - 1), boundaryCount + 2);
  const siblingEnd = Math.min(
    Math.max(page + 1 + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : endPage * 1
  );

  const itemList = [
    'prev',
    ...startPages, // 항상 표시되는 시작 페이지
    ...(siblingStart > boundaryCount + 2 ? ['start-ellipsis'] : boundaryCount + 1 < count - boundaryCount ? [boundaryCount + 1] : []),
    ...range(siblingStart, siblingEnd),
    ...(siblingCount < count - boundaryCount - 1 ? ['end-ellipsis'] : count - boundaryCount > boundaryCount ? [count - boundaryCount] : []),
    ...endPages, // 항상 표시되는 마지막 페이지
    'next'
  ]

  const items = itemList.map((item, index) => (
    typeof item === 'number' ? {
      key: index,
      onClick: () => onPageChnage(item - 1),
      disabled,
      selected: item - 1 === page,
      item
    } : {
      key: index,
      onClick: () => onPageChnage(item === 'next' ? page + 1 : page - 1),
      disabled: disabled || item.indexOf('ellipsis') > -1 || (item === 'next' ? page > - count - 1 : page < 1),
      selected: false,
      item,
    }
  ))

  return { items };
}

export default usePagination;
