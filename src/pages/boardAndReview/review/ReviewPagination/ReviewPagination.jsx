import {useEffect} from 'react';
import styled from 'styled-components';

import DataLimitSelect from './DataLimitSelect';
import {
  calculatePageMove,
  makePaginationPagesArray,
} from './reviewPaginationLogics';

const ReviewPagination = ({
  page,
  setPage,
  limit,
  setLimit,
  totalPage, // lastPage 제일 마지막 페이지
  selectOptionArray,
}) => {
  const handleNumberButtonClick = e => {
    e.preventDefault();
    const id = e.target.id;

    setPage(parseInt(id));
  };

  const handleButtonClick = e => {
    e.preventDefault();
    const direction = e.target.id;

    if (page + 10 > totalPage) {
      setPage(totalPage);
    }

    if (page < 1) {
      return;
    }

    setPage(calculatePageMove(direction, page, totalPage));

    if (direction === 'first') {
      setPage(1);
    } else if (direction === 'last') {
      setPage(totalPage);
    }
  };

  // pageListArr 만들기

  // 말그대로 리스트만 만들어주면 됨

  // 현재 page가 1이면 1~10 까지 보여주기, 11이면 11~20

  const pageListArr = makePaginationPagesArray(page, totalPage);

  return (
    <Container>
      <ButtonWrap>
        <Button
          id="first"
          onClick={e => {
            handleButtonClick(e);
          }}>
          {'<<'}
        </Button>
        <Button
          id="move-back"
          onClick={e => {
            handleButtonClick(e);
          }}>
          {'<'}
        </Button>

        {Array.isArray(pageListArr) &&
          !!pageListArr.length &&
          pageListArr.map((value, index) => {
            const selected = page === value ? true : false;

            return (
              <NumberButton
                key={index}
                id={value}
                selected={selected}
                onClick={handleNumberButtonClick}>
                {value}
              </NumberButton>
            );
          })}

        <Button
          id="move-forward"
          onClick={e => {
            handleButtonClick(e);
          }}>
          {'>'}
        </Button>

        <Button
          id="last"
          onClick={e => {
            handleButtonClick(e);
          }}>
          {'>>'}
        </Button>
      </ButtonWrap>
      <Wrap>
        <DataLimitSelect
          currentValue={limit}
          setLimit={setLimit}
          setPage={setPage}
          options={selectOptionArray}
        />
      </Wrap>
    </Container>
  );
};

export default ReviewPagination;

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 4rem;
  align-items: center;
  position: relative;

  margin-bottom: 2rem;
`;

const ButtonWrap = styled.div`
  > button {
    background-color: transparent;
  }
`;
const Button = styled.button`
  font-size: 24px;
`;

const NumberButton = styled.button`
  color: ${props =>
    props.selected ? `${props.theme.colors.blue[400]}` : `black`};

  font-size: 24px;
`;

const Wrap = styled.div`
  position: absolute;
  right: 42px;
`;
