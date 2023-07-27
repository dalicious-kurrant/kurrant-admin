import styled from 'styled-components';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

const CustomerTasteTextInput = ({
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
      setInput({...input, [name]: value, id: Date.now().toString()});
    } else if (registerStatus === 'edit') {
      setInput({...input, [name]: value});
    } else {
      console.log(registerStatus);
    }

    // console.log({...input, [name]: value, id: Date.now().toString()});
  };

  return (
    <>
      <Container flex={flex} width={width}>
        <TitleWrap style={headerWidth ? {width: headerWidth} : undefined}>
          {/* <Title>{fieldsToOpen[name]}</Title> */}
          <Title>{fieldName}</Title>
        </TitleWrap>

        <TextInputInput
          type={inputType}
          maxLength={maxCharLength}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          width={width}
          flex={flex}
          defaultValue={defaultValue ? defaultValue : undefined}
          // value={input[name]}
          value={handleFalsyValueToBlank(input[name])}
        />
      </Container>
    </>
  );
};

export default CustomerTasteTextInput;

const Container = styled.div`
  ${({flex}) => {
    if (flex) return `flex:${flex};`;
  }}

  ${({width}) => {
    if (width) return `width:${width};`;
  }}
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

  &::placeholder {
    color: ${props => props.theme.colors.grey[5]};
  }

  padding: 0 1rem;
  height: 3rem;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;
