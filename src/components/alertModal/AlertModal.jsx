import styled, {css, keyframes} from 'styled-components';

const AlertModal = ({
  open,
  message,
  setAlertModalOpen,
  actionDisabled=false,
  actionMessage,
  action,
  agreeMessage,
  cancelMessage,
  label,
}) => {
  return (
    <Wrap open={open}>
      {open && (
        <Section>
          <div>
            <Message>{message}</Message>
            <ActionBtn>
              {!actionMessage ? (
                <Button onClick={setAlertModalOpen}>{agreeMessage}</Button>
              ) : (
                <LabelWrap>
                  {label && <Label>{label}</Label>}
                  <ButtonWrap>
                    <CancelButton onClick={setAlertModalOpen}>
                      {cancelMessage}
                    </CancelButton>
                    <ActionButton status={actionDisabled} disabled={actionDisabled} onClick={action}>
                      {actionMessage}
                    </ActionButton>
                  </ButtonWrap>
                </LabelWrap>
              )}
            </ActionBtn>
          </div>
        </Section>
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  ${props =>
    props.open &&
    css`
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.3);
      display: flex;
      align-items: center;
      ''animation: ${ModalBgShow} 0.3s;
    `}

  p {
    font-size: 16px;
    text-align: center;
  }
`;

const ModalShow = keyframes`
   from {
      opacity: 0;
      margin-bottom: -50px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  `;

const ModalBgShow = keyframes`
   from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `;

const Section = styled.section`
  height: 180px;
  width: 320px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  border: 1px solid #c8c8d2;
  background-color: white;
  animation: ${ModalShow} 0.3s;
  overflow: hidden;
`;

const ActionBtn = styled.div`
  margin-top: 24px;
  display: flex;
  gap: 10px;

  justify-content: center;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #c8c8d2;
  background-color: white;
  border-radius: 4px;
  padding: 8px 18px;
  cursor: pointer;
  /* &:hover {
    background-color: #c8c8d2;
  } */
`;

const ButtonWrap = styled.div`
  display: flex;
`;

const LabelWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.span`
  margin-bottom: 14px;
`;

const CancelButton = styled(Button)``;

const ActionButton = styled(Button)`
  background-color: ${({status})=> !status ? '#db2828' : '#ccc'};
  border: none;
  color: white;
  margin-left: 10px;
`;

const Message = styled.p`
  font-weight: 600;
`;
export default AlertModal;
