import styled from 'styled-components';
import Login from '../../components/dashLogin/Login';
import LoginHeader from '../../components/dashLogin/LoginHeader';
import CloseIcon from '../../assets/svg/closeIcon.svg';
const LoginPage = ({setOpen}) => {
  return (
    <Container>
       <ContainerDim onClick={()=>setOpen(false)}/>
      <Wrap>
        <CloseBox>
        <CloseButtonImg
            onClick={() => {
              setOpen(false);
            }}
            src={CloseIcon}
          />
        </CloseBox>
        <LoginHeader />
        <Login/>
      </Wrap>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const ContainerDim = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #000000bb;
`;

const Wrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  border-radius: 24px;
  align-items: center;
  background-color: white;
  width: 360px;
  height: 500px;
`;

const CloseBox = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;

`
const CloseButtonImg =styled.img`
  cursor: pointer;
  width: 20px;
  height: 20px;
`
