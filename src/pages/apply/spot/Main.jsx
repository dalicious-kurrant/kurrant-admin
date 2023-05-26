import {useMakersAdjustListDetail} from 'hooks/useAdjustment';
import {useLocation} from 'react-router-dom';
import {Button} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import {useState} from 'react';
import MySpotZone from './MySpotZone';
import ModalComponent from './components/Modal';
import {useDeleteMySpot} from 'hooks/useMySpot';
import {useAtom} from 'jotai';
import {checkListAtom} from 'utils/store';

const Main = () => {
  const [index, setIndex] = useState(1);
  const [checkItems] = useAtom(checkListAtom);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const {mutateAsync: deleteMySpot} = useDeleteMySpot();

  const deleteMySpotButton = async () => {
    if (checkItems.length !== 0) {
      await deleteMySpot(checkItems);
    }
  };
  const tab = [
    {
      id: 0,
      title: '공유/프라이빗 스팟',
    },
    {
      id: 1,
      title: '마이 스팟 존',
      component: (
        <MySpotZone
          showOpenModal={showOpenModal}
          setShowOpenModal={setShowOpenModal}
        />
      ),
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
            onClick={() => {
              if (checkItems.length !== 0) {
                if (window.confirm('정말로 삭제하시겠어요?'))
                  deleteMySpotButton();
              } else {
                alert('삭제할 데이터를 선택해주세요');
              }
            }}
          />
        </div>
      </ButtonWrap>
      {tab
        .filter(item => index === item.id)
        .map(el => (
          <div key={el.id}>{el.component}</div>
        ))}

      {showOpenModal && (
        <ModalComponent
          title="마이스팟 추가"
          button="추가"
          open={showOpenModal}
          setOpen={setShowOpenModal}
        />
      )}
    </PageWrapper>
  );
};

export default Main;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;