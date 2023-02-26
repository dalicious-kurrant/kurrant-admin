import {useEffect} from 'react';
import {useState} from 'react';

import styled from 'styled-components';
import useLocationHooks from './hooks/useLocationHooks';
import {
  handleSubmitLogic,
  makeInitialInput,
  tellAlertLogic,
} from './logics/RegisterLogics';
import TextInput from './TextInput';
import {Button} from 'semantic-ui-react';
import SelectInput from './SelectInput';

const Register = ({
  fieldsToOpen,
  registerStatus,
  submitMutate,
  handleClose,
  data,
  fieldsData,
  editMutate,
}) => {
  // 현재 location측정
  // useLocationHooks(handleClose);

  const [input, setInput] = useState(makeInitialInput(data));

  useEffect(() => {
    if (registerStatus === 'edit') {
      setInput(data);
    }
  }, [registerStatus]);

  const [submitStatus, setSubmitStatus] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    handleSubmitLogic(
      input,
      fieldsData,
      registerStatus,
      setSubmitStatus,
      submitMutate,
      editMutate,
      handleClose,
    );

    const initialInput = makeInitialInput(data);
    setInput(initialInput);
  };

  const handleCloseBtn = () => {
    handleClose();
  };

  const tellAlert = statusName => {
    return tellAlertLogic(statusName);
  };

  return (
    <Container>
      <TitleButtonWrap>
        <H2>
          리스트
          {registerStatus === 'register' ? ' 추가 입력란' : ' 수정 기입란'}
        </H2>
        <Button onClick={handleCloseBtn}> 닫기 </Button>
      </TitleButtonWrap>

      <Form onSubmit={handleSubmit}>
        <InputWrap>
          {fieldsData.map((value, index) => {
            if (value.inputType === 'select') {
              return (
                <SelectInput
                  key={index}
                  fieldsToOpen={fieldsToOpen}
                  registerStatus={registerStatus}
                  input={input}
                  name={value.fieldName}
                  setInput={setInput}
                  placeholder={value.placeholder}
                  options={value.options}
                />
              );
            } else {
              return (
                <TextInput
                  fieldsToOpen={fieldsToOpen}
                  registerStatus={registerStatus}
                  key={index}
                  input={input}
                  setInput={setInput}
                  required
                  name={value.fieldName}
                  placeholder={value.placeholder}
                  maxCharLength={value.maxCharLength}
                  flex={value.flex}
                />
              );
            }
          })}
        </InputWrap>

        {tellAlert(submitStatus)}

        <Button.Group>
          <BtnWrap>
            <Button>
              {registerStatus === 'register'
                ? '아래 리스트에 추가'
                : '해당 정보 수정'}
              하기
            </Button>
          </BtnWrap>
        </Button.Group>
      </Form>
    </Container>
  );
};

export default Register;

const Container = styled.div`
  flex: 1;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  /* display: flex; */
`;

const H2 = styled.h2`
  font-size: 1.7rem;
  font-weight: 500;

  margin-bottom: 1rem;
`;
const TitleButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 1rem 1rem;
`;

const InputWrap = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
`;

const SubmitButton = styled.button`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

const BtnWrap = styled.div`
  margin-top: 1rem;
`;
