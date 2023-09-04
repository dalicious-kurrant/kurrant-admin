import styled from 'styled-components';

const DataLimitSelect = ({currentValue, setLimit, options, setPage}) => {
  const handleChange = e => {
    const value = e.target.value;

    setLimit(value);

    setPage(1);
  };

  return (
    <Form>
      <Select onChange={handleChange} value={currentValue}>
        {options.map((val, index) => {
          return (
            <Option key={index} value={val}>
              {val}
            </Option>
          );
        })}
      </Select>
      <Label>개 씩 보이게 하기 </Label>
    </Form>
  );
};

export default DataLimitSelect;

const Form = styled.form``;
const Select = styled.select`
  font-size: 24px;
  margin-right: 0.6rem;
`;
const Option = styled.option`
  font-size: 24px;
`;
const Label = styled.label`
  font-size: 22px;
`;
