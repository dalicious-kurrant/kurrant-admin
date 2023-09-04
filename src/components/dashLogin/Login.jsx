import {useState} from 'react';
import styled from 'styled-components';
import instance from '../../shared/axios';

const Login = () => {
  const [loginCheck, setLoginCheck] = useState(false);
  const initialInput = { code: ''};
  const [input, setInput] = useState(initialInput);

  const validation =  input.code !== '';

  const handleChange = e => {
    e.preventDefault();
    const {id, value} = e.target;

    setInput({...input, [id]: value});
  };

  const handleOnKeyPress = e => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await instance.post('delivery/login', input);
      console.log(res);
      if (res.statusCode === 200) {
        const accessToken = res.data.accessToken;
        const name = res.data.name
        localStorage.setItem('dash-token', accessToken);
        localStorage.setItem('dash-name', name);
        window.location.reload();
      }
    } catch (err) {
      if (err.response.status === 401 || err.response.status === 400) {
        setLoginCheck(true);
      }
    }
  };

  return (
    <Form>
      {/* <Input
        type="text"
        required
        id="username"
        onChange={handleChange}
        placeholder="이름"
        value={input['username']}
        status={loginCheck}
      /> */}
      <Input
        type="code"
        required
        id="code"
        onChange={handleChange}
        placeholder="코드"
        value={input['code']}
        status={loginCheck}
        onKeyPress={handleOnKeyPress}
      />
      {loginCheck && <Error>아이디, 비밀번호가 올바르지 않습니다.</Error>}
      <LoginButton disabled={!validation} onClick={handleSubmit}>
        로그인
      </LoginButton>
    </Form>
  );
};

export default Login;

const Form = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Input = styled.input`
  width: 90%;
  background-color: ${({theme}) => theme.colors.grey[0]};
  height: 56px;
  padding: 0 18px;
  font-size: 16px;
  border: 0.5px solid
    ${({theme, status}) => (status ? '#eb5757' : theme.colors.grey[6])};
  border-radius: 8px;
  margin-bottom: 10px;
  outline: none;

  ::placeholder {
    color: ${({theme}) => theme.colors.grey[6]};
  }
`;

const LoginButton = styled.button`
  width: 90%;
  height: 56px;
  border-radius: 8px;
  margin-top: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  //color: ${({disabled}) => !disabled && 'white'};
  background: ${({theme, disabled}) =>
    disabled ? theme.colors.grey[6] : theme.colors.yellow[500]};
  border: none;
  font-weight: 600;
`;

const Error = styled.span`
  color: #eb5757;
`;
