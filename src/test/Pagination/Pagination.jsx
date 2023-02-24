import styled from 'styled-components';

const Pagination = ({pageList, page}) => {
  // console.log(pageList);
  // console.log(page);

  return (
    <Container>
      <ButtonWrap>
        <Button id="">{'<<'}</Button>
        <Button>{'<'}</Button>

        {Array.isArray(pageList) &&
          !!pageList.length &&
          pageList.map((value, index) => {
            // console.log(page);
            // console.log(value);

            const selected = page === value ? true : false;
            // console.log(selected);
            return (
              <NumberButton key={index} id={value} selected={selected}>
                {value}
              </NumberButton>
            );
          })}

        <Button>{'>'}</Button>

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
  color: ${props => {
    console.log(props.theme.colors.blue[400]);

    return props.selected ? props.theme.colors.blue[400] : `black`;
  }};
  font-size: 1.8rem;
`;

const NumberButton = styled.button`
  color: ${props =>
    props.selected ? props.theme.colors.Blue04 : props.theme.colors.black};

  font-size: 1.8rem;
`;

const Wrap = styled.div`
  position: absolute;
  right: 2rem;
`;
