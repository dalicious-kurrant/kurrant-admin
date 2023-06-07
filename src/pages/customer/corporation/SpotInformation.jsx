import {useEffect, useState} from 'react';
import {Button} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import Company from './corporationInfo/Company';
import MySpot from './mySpotZone/MySpotZone';
import styled from 'styled-components';
import Modal from './mySpotZone/components/Modal';
import {useAtom} from 'jotai';
import {adminCheckListAtom, indexAtom} from 'utils/store';
import {useDeleteMySpotAdmin} from 'hooks/useMySpotAdmin';

const SpotInformation = () => {
  const [index, setIndex] = useState(0);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [, setIndexState] = useAtom(indexAtom);
  const [checkItems] = useAtom(adminCheckListAtom);
  const {mutateAsync: deleteSpot} = useDeleteMySpotAdmin();
  const deleteButton = async () => {
    if (checkItems.length !== 0) {
      await deleteSpot(checkItems);
    }
  };

  useEffect(() => {
    setIndexState(index);
  }, [index, setIndexState]);

  const tab = [
    {
      id: 0,
      title: '공유/프라이빗 스팟',
      component: <Company />,
    },
    {
      id: 1,
      title: '마이 스팟 존',
      component: <MySpot />,
    },
  ];
  return (
    <PageWrapper>
      <ButtonWrap>
        <div>
          {tab.map(item => (
            <Button
              key={item.id}
              content={item.title}
              color={index === item.id ? 'facebook' : 'grey'}
              style={{cursor: 'pointer'}}
              onClick={() => setIndex(item.id)}
            />
          ))}
        </div>
        {index === 1 && (
          <div>
            <Button
              content="추가하기"
              inverted
              color="green"
              size="small"
              onClick={() => setShowOpenModal(true)}
            />
            <Button
              content="삭제하기"
              inverted
              color="red"
              size="small"
              onClick={deleteButton}
            />
          </div>
        )}
      </ButtonWrap>
      {tab
        .filter(item => index === item.id)
        .map(el => (
          <div key={el.id}>{el.component}</div>
        ))}
      {showOpenModal && (
        <Modal
          title="마이스팟 존 추가"
          button="추가"
          open={showOpenModal}
          setOpen={setShowOpenModal}
        />
      )}
    </PageWrapper>
  );
};
export default SpotInformation;
const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;
