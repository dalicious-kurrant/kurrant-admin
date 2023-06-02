import {useState} from 'react';
import styled from 'styled-components';

const ItemKeywordInput = ({title, disabled, value}) => {
  const [input, setInput] = useState('');

  const handleChange = e => {
    console.log(e.target.value);
  };

  return (
    <Container>
      <Title>{title}</Title>

      <Input disabled={disabled} value={value} onChange={handleChange} />
    </Container>
  );
};
export default ItemKeywordInput;

const Container = styled.div``;

const Title = styled.span``;

const Input = styled.input``;
