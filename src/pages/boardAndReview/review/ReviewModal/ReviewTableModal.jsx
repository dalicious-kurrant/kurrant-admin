import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {Button, Form, Modal} from 'semantic-ui-react';
import styled from 'styled-components';
import useReviewTableModal from './useReviewTableModal';
import ReadReview from './components/ReadReview';
import ReviewImage from './components/ReviewImage';
import useReviewModalMutation from './useReviewModalMutation';
import ShowCommentsReview from './components/ShowCommentsReview';
import ReviewImageModal from '../ReviewImageModal/ReviewImageModal';

const textSample =
  '리뷰 앱 피드백 정리 31. 작성한 리뷰 사진을 누르면 사진이 확대되게하기, 슬라이드로 다른 그림도 볼수 있게 하기 (체크)2. 작성한 리뷰 > 리뷰 관리 페이지 들어갈때도 포인트 적용되어야됨  (체크)3. 리뷰작성 > 클릭하면 상세화면으로 이동하기 구현하기 (체크)4. 500자 일떄 안됬음 -> 500일때 되어야함 501부터 되어야 됨 (체크)5. 그림이 없을때 글이 안 보이고 있음 (체크)6. Default Picture아예 없애기 (체크)7. 리뷰 작성 뒤로가기 누르면 아예 앱이 꺼져버림(또 잘 됨, 보니까 어느정도 시간이 지나야 이 버그가 생기는 것 같음, 구체적인 해결은 지금 못함)8. 먼저 쓴 게 제일 상단으로 위치하게끔 운영자, 메이커스 댓글 달리게 만들기 (지성님이랑 같이 봐야될듯, 서버에서 받아오는 날짜 데이터가 ‘2023-05-01’ 이런 형식으로 되어있다 이 형식에는 몇 시 몇 분 몇 초 까지는 나누지 않고 있기때문에 현재 이 데이터로 시간별 sorting하는 것은 안된다 ';

function ReviewTableModal({open, setOpen, reviewId}) {
  const [showImageModal, setShowImageModal] = useState(false);
  const {reviewDetail, reviewDetailRefetch} = useReviewTableModal([
    'getReviewDetail',
    reviewId,
  ]);

  useEffect(() => {
    console.log(reviewDetail);
  }, [reviewDetail]);

  // mutation code 따로 모으기

  const {
    reportReviewMutate,
    submitReviewMutate,
    editReviewMutate,
    deleteReviewMutate,
    deleteAdminCommentMutate,
  } = useReviewModalMutation();

  // 변수 나누기

  const onSubmit = () => {
    setOpen(false);
  };

  const handleReport = () => {
    if (window.confirm('이 리뷰를 신고하시겠습니까?')) {
      if (reviewDetail && reviewDetail?.isReport) {
        window.confirm('이미 신고된 리뷰입니다');
        return;
      }
      if (reviewDetail && reviewDetail?.isDelete) {
        window.confirm('이미 삭제된 리뷰입니다');
        return;
      }
      reportReviewMutate({id: reviewId});

      // window.location.reload();
    } else {
      return;
    }
  };
  const handleDelete = () => {
    if (window.confirm('이 리뷰를 삭제하시겠습니까?')) {
      //이미 삭제된 댓글이면 안보이게 하기
      if (reviewDetail && reviewDetail?.isDelete) {
        window.confirm('이미 삭제된 리뷰입니다');
      } else {
        deleteReviewMutate({id: reviewId});
      }
    } else {
      return;
    }
  };
  const handleSubmit = value => {
    // 수정 작성 구분하기

    if (
      reviewDetail &&
      reviewDetail.adminComment &&
      reviewDetail.adminComment.commentId
    ) {
      if (window.confirm('운영자 댓글을 수정하시겠습니까?')) {
        if (reviewDetail && reviewDetail?.isDelete) {
          window.confirm('이미 삭제된 리뷰입니다');
        } else {
          editReviewMutate({content: value, id: reviewId});
          setShowImageModal(false);
        }
      } else {
        return;
      }
    } else {
      // 작성

      if (window.confirm('운영자 댓글을 작성하시겠습니까?')) {
        if (reviewDetail && reviewDetail?.isDelete) {
          window.confirm('이미 삭제된 리뷰입니다');
        } else {
          submitReviewMutate({content: value, id: reviewId});
          setShowImageModal(false);
        }
      } else {
        return;
      }
    }
  };

  const handleAdminCommentDelete = () => {
    //지성님이 운영자 댓글을 하나씩 보내줄떄부터 작업해야됨
    if (window.confirm('운영자 댓글을 삭제하시겠습니까?')) {
      //이미 삭제된 댓글이면 안보이게 하기
      if (reviewDetail && reviewDetail?.isDelete) {
        window.confirm('이미 삭제된 리뷰입니다');
      } else {
        if (!reviewDetail?.adminComment) {
          window.confirm(
            `운영자 댓글이 존재하지 않습니다 ${reviewDetail?.adminComment}`,
          );
          return;
        }

        if (!reviewDetail?.adminComment?.commentId) {
          window.confirm(
            `운영자 댓글이 존재하지 않습니다 ${reviewDetail?.adminComment?.commentId}`,
          );
          return;
        }

        deleteAdminCommentMutate({id: reviewDetail?.adminComment?.commentId});
      }
    } else {
      return;
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      {/* 모달 */}
      {showImageModal && (
        <ReviewImageModal
          open={showImageModal}
          setOpen={setShowImageModal}
          imgArray={reviewDetail && reviewDetail.imageLocations}
        />
      )}
      <ModalModal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <ModalDescription>
          <Wrap5>
            {reviewDetail && reviewDetail?.isDelete && (
              <IsDeletedWrap>
                <IsDeleteNoficate>
                  삭제된 리뷰입니다 (리뷰 신고, 리뷰 삭제, 작성 및 수정이
                  불가합니다)
                </IsDeleteNoficate>
              </IsDeletedWrap>
            )}

            <Wrap2>
              <ReadReview
                content={reviewDetail && reviewDetail?.contentOrigin}
                buttonDisable={reviewDetail && reviewDetail?.isDelete}
                buttonName={'리뷰 신고'}
                title={'리뷰 본문(읽기만)'}
                onClickCallback={handleReport}
              />
              <ReadReview
                content={reviewDetail && reviewDetail?.content}
                buttonName={'리뷰 삭제'}
                buttonDisable={reviewDetail && reviewDetail?.isDelete}
                title={'리뷰 수정(읽기만)'}
                onClickCallback={handleDelete}
              />
            </Wrap2>
          </Wrap5>

          <Wrap3>
            <PhotosWrap>
              {reviewDetail &&
              reviewDetail.imageLocations &&
              reviewDetail.imageLocations.length > 0 ? (
                reviewDetail.imageLocations.map((v, i) => {
                  return (
                    <ReviewImage
                      key={i}
                      url={v}
                      setShowImageModal={setShowImageModal}
                    />
                  );
                })
              ) : (
                <NoPhotosWrap>
                  <NoPhotosSpan>등록된 사진은 없어요</NoPhotosSpan>
                </NoPhotosWrap>
              )}
            </PhotosWrap>
            <Wrap4>
              <ShowCommentsReview
                comment={
                  reviewDetail &&
                  reviewDetail?.makersComment &&
                  reviewDetail?.makersComment?.commentId &&
                  reviewDetail?.makersComment?.comment
                }
                buttonName={'작성 취소'}
                title={'사장님 댓글(마지막 댓글)'}
                onClickCallback={() => {
                  if (window.confirm('운영자 댓글작성을 취소하겠습니까?')) {
                    window.location.reload();
                  } else {
                    return;
                  }
                }}
              />

              <ReadReview
                content={
                  reviewDetail &&
                  reviewDetail?.adminComment &&
                  reviewDetail?.adminComment?.commentId &&
                  reviewDetail?.adminComment?.comment
                }
                buttonName={
                  reviewDetail &&
                  reviewDetail.adminComment &&
                  reviewDetail.adminComment.commentId
                    ? '댓글 수정'
                    : '댓글 작성'
                }
                buttonDisable={reviewDetail && reviewDetail?.isDelete}
                // placeholderMsg='댓글을 수정해주세요'
                button2Disable={reviewDetail && reviewDetail?.isDelete}
                buttonName2={'댓글 삭제'}
                disabled={false}
                title={'운영자 댓글(작성 / 수정가능)'}
                onClickCallback={value => {
                  handleSubmit(value);
                }}
                onClickCallback2={() => {
                  // 삭제
                  handleAdminCommentDelete();
                }}
                confirmButton2Color={'#ca2f2f'}
              />
            </Wrap4>
          </Wrap3>
        </ModalDescription>
      </ModalModal>
    </Form>
  );
}

export default ReviewTableModal;

const ModalModal = styled(Modal)`
  width: 1400px !important;
  height: 700px;
`;

const ModalDescription = styled(Modal.Description)`
  display: flex;
  height: 100%;
`;

const Wrap5 = styled.div`
  display: flex;
  flex-direction: column;
  flex: 3;
`;

const IsDeletedWrap = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;

  padding-top: 5px;
`;

const IsDeleteNoficate = styled.span`
  color: red;
  font-size: 16px;
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

  /* background-color: skyblue; */
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

const NoPhotosWrap = styled.div`
  height: 110px;
  padding: 24px 12px;
`;

const NoPhotosSpan = styled.span`
  font-size: 30px;
`;
