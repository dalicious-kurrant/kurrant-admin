import {useEffect} from 'react';
import styled from 'styled-components';
import {calculatePageMove} from './PaginationLogics';
import DataLimitSelect from './DataLimitSelect';

const ReviewPagination = ({
  pageList, // pageList [1,2,3,4,5,6,7,8,9,10] 이런거
  page,
  setPage,
  limit,
  setLimit,
  lastPage, // lastPage 제일 마지막 페이지
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

    if (page + 10 > lastPage) {
      setPage(lastPage);
    }

    if (page < 1) {
      return;
    }

    setPage(calculatePageMove(direction, page, lastPage));

    if (direction === 'first') {
      setPage(1);
    } else if (direction === 'last') {
      setPage(lastPage);
    }
  };

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

        {Array.isArray(pageList) &&
          !!pageList.length &&
          pageList.map((value, index) => {
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
  font-size: 1.8rem;
`;

const NumberButton = styled.button`
  color: ${props =>
    props.selected ? `${props.theme.colors.blue[400]}` : `black`};

  font-size: 1.8rem;
`;

const Wrap = styled.div`
  position: absolute;
  right: 2rem;
`;
