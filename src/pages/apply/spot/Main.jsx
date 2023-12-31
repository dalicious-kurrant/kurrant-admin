import {Button} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import {useState} from 'react';
import MySpotZone from './MySpotZone';
import ModalComponent from './components/Modal';
import {useDeleteMySpot} from 'hooks/useMySpot';
import {useAtom} from 'jotai';
import {
  checkListAtom,
  checkPrivateListAtom,
  checkShareListAtom,
} from 'utils/store';
import ShareSpotZone from './ShareSpotZone';
import PrivateSpotZone from './PrivateSpotZone';
import AddShareModal from './components/AddShareModal';
import PrivateSpotModal from './components/PrivateSpotModal';
import {useDeletePrivateStatus, useDeleteShareSpot} from 'hooks/useSpot';

const Main = () => {
  const [index, setIndex] = useState(0);
  const [checkItems] = useAtom(checkListAtom);
  const [checkShareItems] = useAtom(checkShareListAtom);
  const [checkPrivateItems] = useAtom(checkPrivateListAtom);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [showOpenModal1, setShowOpenModal1] = useState(false);
  const [showOpenModal2, setShowOpenModal2] = useState(false);
  const {mutateAsync: deleteMySpot} = useDeleteMySpot();
  const {mutateAsync: deleteShareSpot} = useDeleteShareSpot();
  const {mutateAsync: deletePrivateSpot} = useDeletePrivateStatus();

  // 0 : 공유스팟 , 1 : 프라이빗 , 2 : 마이스팟
  const deleteMySpotButton = async () => {
    if (checkShareItems.length !== 0) {
      if (index === 0) return await deleteShareSpot({ids: checkShareItems});
    }
    if (checkPrivateItems.length !== 0) {
      if (index === 1) return await deletePrivateSpot({ids: checkPrivateItems});
    }
    if (checkItems.length !== 0) {
      if (index === 2) return await deleteMySpot({ids: checkItems});
    }
  };
  const tab = [
    {
      id: 0,
      title: '공유 스팟',
      component: (
        <ShareSpotZone
          showOpenModal={showOpenModal}
          setShowOpenModal={setShowOpenModal}
        />
      ),
    },
    {
      id: 1,
      title: '프라이빗 스팟',
      component: (
        <PrivateSpotZone
          showOpenModal={showOpenModal1}
          setShowOpenModal={setShowOpenModal1}
        />
      ),
    },
    {
      id: 2,
      title: '마이 스팟 존',
      component: (
        <MySpotZone
          showOpenModal={showOpenModal2}
          setShowOpenModal={setShowOpenModal2}
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
            onClick={() => {
              if (index === 0) {
                setShowOpenModal(true);
              } else if (index === 1) {
                setShowOpenModal1(true);
              } else {
                setShowOpenModal2(true);
              }
            }}
          />
          <Button
            content="삭제하기"
            inverted
            color="red"
            size="small"
            onClick={() => {
              if (
                checkItems.length !== 0 ||
                checkShareItems?.length !== 0 ||
                checkPrivateItems?.length !== 0
              ) {
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
        <AddShareModal
          title="공유스팟 추가"
          button="추가"
          open={showOpenModal}
          setOpen={setShowOpenModal}
        />
      )}
      {showOpenModal1 && (
        <PrivateSpotModal
          title="프라이빗 스팟 추가"
          open={showOpenModal1}
          setOpen={setShowOpenModal1}
        />
      )}
      {showOpenModal2 && (
        <ModalComponent
          title="마이스팟 추가"
          button="추가"
          open={showOpenModal2}
          setOpen={setShowOpenModal2}
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
