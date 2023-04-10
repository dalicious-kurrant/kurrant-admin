import {useMutation, useQueryClient} from 'react-query';
import instance from 'shared/axios';

const useReviewModalMutation = () => {
  const queryClient = useQueryClient();

  // 리뷰신고

  const {mutate: reportReviewMutate} = useMutation(
    async data => {
      const response = await instance.patch(`reviews/report`, data);

      return response;
    },
    {
      onSuccess: () => {
        console.log('리뷰 신고 success');
        queryClient.invalidateQueries(['getReviewDetail']);
        queryClient.invalidateQueries(['getReviewList']);
        window.confirm('리뷰 신고가 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('리뷰 신고 실패');
      },
    },
  );

  // 리뷰 삭제
  const {mutate: deleteReviewMutate} = useMutation(
    async data => {
      const response = await instance.patch(`reviews/delete`, data);

      return response;
    },
    {
      onSuccess: () => {
        console.log('리뷰 삭제 success');
        // queryClient.invalidateQueries(['getReviewDetail']);
        queryClient.invalidateQueries('getReviewDetail');
        queryClient.invalidateQueries(['getReviewList']);
        window.confirm('리뷰 삭제가 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('리뷰 삭제 실패');
      },
    },
  );

  // 운영팀 댓글 작성

  const {mutate: submitReviewMutate} = useMutation(
    async data => {
      console.log(data);

      const response = await instance.post(
        `reviews/comment?reviewId=${data.id}`,
        data,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('운영자 댓글 작성 success');

        queryClient.invalidateQueries('getReviewDetail');
        queryClient.invalidateQueries(['getReviewList']);
        window.confirm('운영자 리뷰 작성이 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('운영자 댓글 작성 실패');
      },
    },
  );
  // 운영팀 댓글 수정

  const {mutate: editReviewMutate} = useMutation(
    async data => {
      console.log(data);

      const response = await instance.patch(
        `reviews/comment?commentId=${data.id}`,
        data.content,
      );
      return response;
    },
    {
      onSuccess: () => {
        console.log('운영자 댓글 수정 success');

        queryClient.invalidateQueries('getReviewDetail');
        queryClient.invalidateQueries(['getReviewList']);
        window.confirm('운영자 리뷰 수정이 정상적으로 이루워졌습니다');
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('운영자 댓글 수정 실패');
      },
    },
  );

  // 운영팀 댓글 삭제
  const {mutate: deleteAdminCommentMutate} = useMutation(
    async data => {
      console.log(data);
      const response = await instance.patch(`reviews/comment/delete`, data);

      return response;
    },
    {
      onSuccess: () => {
        console.log('운영자 리뷰 삭제 success');
        // queryClient.invalidateQueries('getReviewDetail');

        window.confirm('운영자 리뷰 삭제가 정상적으로 이루워졌습니다');

        queryClient.invalidateQueries('getReviewDetail');
        queryClient.invalidateQueries(['getReviewList']);
      },
      onError: err => {
        console.log('이런 ㅜㅜ 에러가 떳군요, 어서 코드를 확인해보셔요');
        console.log(err);
        window.confirm('운영자 리뷰 삭제 실패');
      },
    },
  );

  return {
    reportReviewMutate,
    submitReviewMutate,
    editReviewMutate,
    deleteReviewMutate,

    deleteAdminCommentMutate,
  };
};
export default useReviewModalMutation;
