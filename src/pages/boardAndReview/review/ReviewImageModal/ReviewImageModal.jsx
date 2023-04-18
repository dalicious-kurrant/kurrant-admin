import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import RightArrow from '../../../../assets/svg/RightArrow.svg';
import LeftArrow from '../../../../assets/svg/LeftArrow.svg';
import X from '../../../../assets/svg/X.svg';
import ReviewImageModalImage from './ReviewImageModalImage';

const textSample =
  '리뷰 앱 피드백 정리 31. 작성한 리뷰 사진을 누르면 사진이 확대되게하기, 슬라이드로 다른 그림도 볼수 있게 하기 (체크)2. 작성한 리뷰 > 리뷰 관리 페이지 들어갈때도 포인트 적용되어야됨  (체크)3. 리뷰작성 > 클릭하면 상세화면으로 이동하기 구현하기 (체크)4. 500자 일떄 안됬음 -> 500일때 되어야함 501부터 되어야 됨 (체크)5. 그림이 없을때 글이 안 보이고 있음 (체크)6. Default Picture아예 없애기 (체크)7. 리뷰 작성 뒤로가기 누르면 아예 앱이 꺼져버림(또 잘 됨, 보니까 어느정도 시간이 지나야 이 버그가 생기는 것 같음, 구체적인 해결은 지금 못함)8. 먼저 쓴 게 제일 상단으로 위치하게끔 운영자, 메이커스 댓글 달리게 만들기 (지성님이랑 같이 봐야될듯, 서버에서 받아오는 날짜 데이터가 ‘2023-05-01’ 이런 형식으로 되어있다 이 형식에는 몇 시 몇 분 몇 초 까지는 나누지 않고 있기때문에 현재 이 데이터로 시간별 sorting하는 것은 안된다 ';

function ReviewImageModal({open, setOpen, imgArray}) {
  // 버튼을 누름에 따라 이미지가 이동한다

  const [urlNow, setUrlNow] = useState(0);

  useEffect(() => {
    console.log(imgArray);
  }, [imgArray]);

  useEffect(() => {
    console.log(urlNow);
  }, [urlNow]);

  return (
    <ModalModal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}>
      <ModalDescription>
        <XButtonWrap>
          <XButtonImg
            onClick={() => {
              setOpen(false);
            }}
            src={X}
            alt="죄측버튼"
          />
        </XButtonWrap>

        <ArrowWrap
          onClick={() => {
            // 0 이하면 안 움직이고 blur처리 된다
            if (urlNow < 1) {
              //   setUrlNow(0);
              return;
            } else {
              setUrlNow(prevVal => prevVal - 1);
            }
          }}>
          <ArrowImgLeft src={LeftArrow} alt="죄측버튼" isLimit={urlNow === 0} />
        </ArrowWrap>

        <Wrapper>
          <ReviewImageModalImage url={imgArray[urlNow]} />
        </Wrapper>

        <ArrowWrap
          onClick={() => {
            // 6 이상이면 안 움직이고 blur처리 된다
            if (urlNow >= imgArray.length - 1) {
              //   setUrlNow(6);
              return;
            } else {
              setUrlNow(prevVal => prevVal + 1);
            }
          }}>
          <ArrowImgRight
            src={RightArrow}
            alt="우측버튼"
            isLimit={urlNow >= imgArray.length - 1}
          />
        </ArrowWrap>
      </ModalDescription>
    </ModalModal>
  );
}

export default ReviewImageModal;

const ModalModal = styled(Modal)`
  width: 1100px !important;
  height: 600px;
`;

const ModalDescription = styled(Modal.Description)`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Wrapper = styled.div`
  width: 900px;
  height: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ArrowWrap = styled.div``;

const ArrowImgLeft = styled.img`
  width: 30px;
  ${({isLimit}) => {
    if (isLimit) {
      return `opacity: 0.2;`;
    }
  }}
`;
const ArrowImgRight = styled.img`
  width: 30px;
  ${({isLimit}) => {
    if (isLimit) {
      return `opacity: 0.2;`;
    }
  }}
`;

const XButtonWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const XButtonImg = styled.img``;
