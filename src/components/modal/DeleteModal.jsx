import React from 'react';
import {Button, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import {exelPlanAtom, exelSpotAtom, planAtom} from '../../utils/store';
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

const DeleteModal = ({active, onClose, chkData = [], setChkData}) => {
  const [, setExelPlan] = useAtom(exelPlanAtom);
  const [exelSpot, setExelSpot] = useAtom(exelSpotAtom);
  const [, setPlan] = useAtom(planAtom);
  return (
    <Modal onClose={onClose} open={active} size="mini">
      <Modal.Content image>
        <Modal.Description>
          <Content>
            <Line className="first">정말 삭제하시겠습니까?</Line>
            {chkData.length > 0 && (
              <Line>
                선택된 수 <Strong>{chkData.length}</Strong>
              </Line>
            )}
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
            if (exelSpot) {
              setExelSpot(
                exelSpot.filter(v => {
                  return !chkData.includes(v.id);
                }),
              );
            }

            setChkData([]);
            onClose();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default DeleteModal;
