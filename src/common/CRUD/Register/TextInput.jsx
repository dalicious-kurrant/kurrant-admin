import styled from 'styled-components';
import {handleFalsyValueToBlank} from 'utils/valueHandlingLogics';

const TextInput = ({
  fieldsToOpen,
  registerStatus,
  input,
  name,
  setInput,
  placeholder,
  width = '100%',
  flex = 1,
  maxCharLength = 36,
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
  };

  return (
    <>
      <Container flex={flex} width={width}>
        <TitleWrap>
          <Title>{fieldsToOpen[name]}</Title>
        </TitleWrap>

        <TextInputInput
          type="text"
          maxLength={maxCharLength}
          name={name}
          onChange={handleChange}
          placeholder={placeholder}
          width={width}
          flex={flex}
          // value={input[name]}
          value={handleFalsyValueToBlank(input[name])}
        />
      </Container>
    </>
  );
};

export default TextInput;

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
`;

const TitleWrap = styled.div`
  background-color: ${props => props.theme.colors.grey[8]};
  padding: 0 1rem;
  height: 3rem;
  font-size: 1.2rem;
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
