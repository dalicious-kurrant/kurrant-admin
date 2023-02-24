import styled from 'styled-components';
import {calculatePageMove} from './PaginationLogics';

const Pagination = ({pageList, page, setPage, setLimit, lastPage}) => {
  // console.log(pageList);
  // console.log(page);

  const handleNumberButtonClick = e => {
    e.preventDefault();
    const id = e.target.id;

    setPage(parseInt(id));
  };

  const handleButtonClick = e => {
    e.preventDefault();
    const id = e.target.id;

    console.log(calculatePageMove(id, page, lastPage));
  };

  return (
    <Container>
      <ButtonWrap>
        <Button id="">{'<<'}</Button>
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

        <Button>{'>>'}</Button>
      </ButtonWrap>
      <Wrap>
        {/* <DataLimitSelect
          currentValue={dataLimit}
          setDataLimit={setDataLimit}
          setPage={setPage}
          options={selectOptionArray}
        /> */}
      </Wrap>
    </Container>
  );
};

export default Pagination;

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
