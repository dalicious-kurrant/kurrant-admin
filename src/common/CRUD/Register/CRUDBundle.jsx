import styled from 'styled-components';
import {Button} from 'semantic-ui-react';

const CRUDBundle = ({
  handleBundleClick,
  showRegister,
  sendFinal,
  sendDelete,
  checkboxStatus,
}) => {
  const handleClick = e => {
    if (e.target.id === 'register' || e.target.id === 'edit') {
      if (showRegister) {
        window.confirm("'닫기'버튼을 누른후에 시도해주세요");
        return;
      }
    }

    handleBundleClick(e.target.id);
  };

  const handleSend = () => {
    sendFinal();
  };

  const handleDelete = () => {
    sendDelete();
  };

  return (
    <Container>
      <Wrap>
        <Button.Group>
          <BtnWrap>
            <Button id="register" color="green" inverted onClick={handleClick}>
              추가 열기
            </Button>
          </BtnWrap>

          <BtnWrap>
            <Button id="edit" color="blue" inverted onClick={handleClick}>
              수정 열기
            </Button>
          </BtnWrap>
          <BtnWrap>
            <Button id="delete" inverted color="red" onClick={handleDelete}>
              삭제하기
            </Button>
          </BtnWrap>
        </Button.Group>
        <Wrap2>
          <Button.Group>
            <FinalSendButton
              checkboxstatus={checkboxStatus}
              onClick={handleSend}
              // disabled={!Object.values(checkboxStatus).includes(true)}
            >
              최종적용하기
            </FinalSendButton>
          </Button.Group>
        </Wrap2>
      </Wrap>
    </Container>
  );
};

export default CRUDBundle;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 20px;

  /* border: 1px solid black; */
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrap2 = styled.div`
  margin: 0.2rem;
`;

const BtnWrap = styled.div`
  margin: 0.4rem 0.2rem;
`;

const FinalSendButton = styled(Button)`
  /* opacity: ${({checkboxstatus}) => {
    if (!Object.values(checkboxstatus).includes(true)) {
      return 0.5;
    } else {
      return 1;
    }
  }}; */
`;
