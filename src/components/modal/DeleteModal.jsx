import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import {exelPlanAtom, planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
const Content = styled.div`
  text-align: center;
`;

const Strong = styled.strong`
  font-weight: bold;
`;

const Line = styled.p`
  font-size: 18px;
  &.first {
    margin-bottom: 20px;
  }
`;


const DeleteModal = ({active, onClose}) => {
  const [, setExelPlan] = useAtom(exelPlanAtom);
  const [, setPlan] = useAtom(planAtom);
  return (
    <Modal onClose={onClose} open={active} size="mini">
      <Modal.Content image>
        <Modal.Description>
          <Content>
            <Line className="first">정말 삭제하시겠습니까?</Line>
            {/* <Line>
              선택된 수 <Strong>{`" 3 "`}</Strong>
            </Line> */}
          </Content>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" content="취소" onClick={onClose} />
        <Button
          content="삭제"
          icon="delete"
          negative
          onClick={() => {
            setExelPlan();
            setPlan();
            onClose();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
