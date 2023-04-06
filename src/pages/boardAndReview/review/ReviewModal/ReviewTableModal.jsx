import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import useReviewTableModal from './useReviewTableModal';
import ReadReview from './components/ReadReview';
import ReviewImage from './components/ReviewImage';

const textSample =
  '리뷰 앱 피드백 정리 31. 작성한 리뷰 사진을 누르면 사진이 확대되게하기, 슬라이드로 다른 그림도 볼수 있게 하기 (체크)2. 작성한 리뷰 > 리뷰 관리 페이지 들어갈때도 포인트 적용되어야됨  (체크)3. 리뷰작성 > 클릭하면 상세화면으로 이동하기 구현하기 (체크)4. 500자 일떄 안됬음 -> 500일때 되어야함 501부터 되어야 됨 (체크)5. 그림이 없을때 글이 안 보이고 있음 (체크)6. Default Picture아예 없애기 (체크)7. 리뷰 작성 뒤로가기 누르면 아예 앱이 꺼져버림(또 잘 됨, 보니까 어느정도 시간이 지나야 이 버그가 생기는 것 같음, 구체적인 해결은 지금 못함)8. 먼저 쓴 게 제일 상단으로 위치하게끔 운영자, 메이커스 댓글 달리게 만들기 (지성님이랑 같이 봐야될듯, 서버에서 받아오는 날짜 데이터가 ‘2023-05-01’ 이런 형식으로 되어있다 이 형식에는 몇 시 몇 분 몇 초 까지는 나누지 않고 있기때문에 현재 이 데이터로 시간별 sorting하는 것은 안된다 ';

function ReviewTableModal({open, setOpen, reviewId}) {
  const {reviewDetail, reviewDetailRefetch} = useReviewTableModal([
    'getReviewDetail',
    reviewId,
  ]);

  useEffect(() => {
    console.log(reviewDetail);
  }, [reviewDetail]);

  const onSubmit = () => {
    setOpen(false);
  };

  return (
    <Form onSubmit={onSubmit}>
      <ModalModal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        {/* <ModalContent>
          <ModalDescription>
            <Wrap2></Wrap2>

            <Wrap3></Wrap3>
          </ModalDescription>
        </ModalContent> */}

        <ModalDescription>
          <Wrap2>
            <ReadReview content={textSample} buttonName={'신고'} />
            <ReadReview content={textSample} buttonName={'삭제'} />
          </Wrap2>

          <Wrap3>
            <PhotosWrap>
              {reviewDetail &&
                reviewDetail.imageLocations &&
                reviewDetail.imageLocations.length > 0 &&
                reviewDetail.imageLocations.map((v, i) => {
                  return <ReviewImage url={v} />;
                })}
            </PhotosWrap>
            <Wrap4>
              <ReadReview content={textSample} buttonName={'취소'} />
              <ReadReview content={textSample} buttonName={'저장'} />
            </Wrap4>
          </Wrap3>
        </ModalDescription>
      </ModalModal>
    </Form>
  );
}

export default ReviewTableModal;

const ModalModal = styled(Modal)`
  /* width: 90vw !important;
  height: 90vh; */
  width: 1400px !important;
  height: 700px;
`;

// const ModalContent = styled(Modal.Content)`
//   width: 100%;
//   height: 100%;
// `;

const ModalDescription = styled(Modal.Description)`
  display: flex;
  height: 100%;
`;

const Wrap2 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  height: 100%;
`;
const Wrap3 = styled.div`
  flex: 4;
  height: 100%;

  background-color: skyblue;
  display: flex;
  flex-direction: column;
`;

const Wrap4 = styled.div`
  display: flex;
  flex-direction: row;
  flex: 3;
  height: 100%;
`;

const PhotosWrap = styled.div`
  /* flex: 1; */

  /* height: 300px; */
  display: flex;
  align-items: center;
  padding-left: 10px;
`;
