import styled from 'styled-components';

const NumberInput = ({
  fieldsToOpen,
  fieldName,
  registerStatus,
  input,
  inputType = 'text',
  name,
  setInput,
  placeholder,
  width = '100%',
  flex = 1,
  headerWidth = undefined,
  maxCharLength = 36,
  defaultValue = undefined,
}) => {
  const handleChange = e => {
    e.preventDefault();
    const {name, value} = e.target;

    if (registerStatus === 'register') {
      setInput({
        ...input,
        [name]: parseInt(value) || 0,
        id: Date.now().toString(),
      });
    } else if (registerStatus === 'edit') {
      setInput({...input, [name]: parseInt(value)});
    } else {
      console.log(registerStatus);
    }

    // console.log(value);
    // console.log({...input, [name]: parseInt(value), id: Date.now().toString()});
    // console.log(parseInt(value));
  };

  // 일단 ""을 숫자로 시작해줘야 할 듯

  //   useEffect(() => {
  //     if (registerStatus === 'register') {
  //       setInput({
  //         ...input,
  //         [name]: 0,
  //         id: Date.now().toString(),
  //       });
  //     } else if (registerStatus === 'edit') {
  //       setInput({...input, [name]: 0});
  //     } else {
  //       console.log(registerStatus);
  //     }
  //   }, []);

  return (
    <>
      <Container flex={flex} width={width}>
        <TitleWrap style={headerWidth ? {width: headerWidth} : undefined}>
          {/* <Title>{fieldsToOpen[name]}</Title> */}
          <Title>{fieldName}</Title>
        </TitleWrap>

        <TextInputInput
          //   type={inputType}
          maxLength={maxCharLength}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          width={width}
          flex={flex}
          //   defaultValue={defaultValue ? defaultValue : undefined}
          value={typeof input[name] === 'number' ? input[name] : undefined}
          //   value={input[name]}
          //   value={handleFalsyValueToBlank(input[name])}
        />
      </Container>
    </>
  );
};

export default NumberInput;

const Container = styled.div`
  ${({flex}) => {
    if (flex) {
      return `flex:${flex};`;
    }
  }}

  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}

  width: 12rem;
`;

const TitleWrap = styled.div`
  background-color: ${props => props.theme.colors.grey[8]};
  padding: 0 1rem;
  height: 3rem;
  font-size: 1.2rem;
  /* width: 5rem; */
  /* text-align: center; */
  display: flex;
  align-items: center;
  /* border: 1px solid black; */
  border: 1px solid ${props => props.theme.colors.Grey07};
`;
const Title = styled.span`
  display: inline-block;
`;

const TextInputInput = styled.input`
  border: 1px solid ${props => props.theme.colors.Grey07};
  ${({width}) => {
    if (width) {
      return `width:${width};`;
    }
  }}

  height: 5.8rem;

  &::placeholder {
    color: ${props => props.theme.colors.grey[5]};
  }

  padding: 0 1rem;
  height: 3rem;
  font-size: 1.4rem;

  &:focus {
    outline: none;
  }
`;
