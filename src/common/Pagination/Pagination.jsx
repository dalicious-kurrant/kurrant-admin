import styled from 'styled-components';

import DataLimitSelect from 'common/Pagination/Childs/DataLimitSelect';
import {calculateTotalPages} from 'common/Pagination/Logics/PaginationLogics';

const Pagination = ({
  dataTotalLength,
  page,
  setPage,
  dataLimit,
  setDataLimit,
  pageList,

  handleButtonClick,
  handleGoToEdge,
  handleMove,
  selectOptionArray,
}) => {
  return (
    <Container>
      <ButtonWrap>
        <Button id={1} onClick={handleGoToEdge}>
          {'<<'}
        </Button>
        <Button id="move-back" onClick={handleMove}>
          {'<'}
        </Button>

        {Array.isArray(pageList) &&
          !!pageList.length &&
          pageList.map((value, index) => {
            let selected = false;

            if (value == page) {
              selected = true;
            }

            return (
              <Button
                key={index}
                selected={selected}
                id={value}
                onClick={handleButtonClick}>
                {value}
              </Button>
            );
          })}

        <Button id="move-forward" onClick={handleMove}>
          {'>'}
        </Button>

        <Button
          id={calculateTotalPages(dataTotalLength, dataLimit)}
          onClick={handleGoToEdge}>
          {'>>'}
        </Button>
      </ButtonWrap>
      <Wrap>
        <DataLimitSelect
          currentValue={dataLimit}
          setDataLimit={setDataLimit}
          setPage={setPage}
          options={selectOptionArray}
        />
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
  color: ${props =>
    props.selected ? props.theme.colors.Blue04 : props.theme.colors.black};
  font-size: 1.8rem;
`;

const Wrap = styled.div`
  position: absolute;
  right: 2rem;
`;
