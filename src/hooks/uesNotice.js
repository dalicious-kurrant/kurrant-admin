import {noticeApis} from 'api/notice';
import {useMutation, useQuery, useQueryClient} from 'react-query';

// app 공지사항 등록
export function useAppNoticePost() {
  const queryClient = useQueryClient();
  return useMutation(data => noticeApis.appNoticePost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('appNoticeList');
    },
  });
}

// app 공지사항 조회
export function useAppNoticeLoad(
  page,
  selectType,
  selectStatus,
  selectSpots,
  selectPush,
  checkBoxValue,
) {
  return useQuery('appNoticeList', () => {
    return noticeApis.appNoticeGet(
      page,
      selectType,
      selectStatus,
      selectSpots,
      selectPush,
      checkBoxValue,
    );
  });
}

// app 공지사항 수정
export function useAppNoticeModify() {
  const queryClient = useQueryClient();
  return useMutation(data => noticeApis.appNoticeModify(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('appNoticeList');
    },
  });
}

// app 공지사항 푸시알림 전송
export function useAppNoticePushAlram() {
  const queryClient = useQueryClient();
  return useMutation(id => noticeApis.appNoticePush(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('appNoticeList');
    },
  });
}

// makers 공지사항 조회
export function useMakersNoticeLoad(
  page,
  selectType,
  selectStatus,
  selectMakers,
  selectPush,
) {
  return useQuery('makersNoticeList', () => {
    return noticeApis.makersNoticeGet(
      page,
      selectType,
      selectStatus,
      selectMakers,
      selectPush,
    );
  });
}

// makers 공지사항 등록
export function useMakersNoticePost() {
  const queryClient = useQueryClient();
  return useMutation(data => noticeApis.makersNoticePost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('makersNoticeList');
    },
  });
}

// makers 공지사항 수정
export function useMakersNoticeModify() {
  const queryClient = useQueryClient();
  return useMutation(data => noticeApis.makersNoticeModify(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('makersNoticeList');
    },
  });
}
// client 공지사항 등록
export function useCientNoticePost() {
  const queryClient = useQueryClient();
  return useMutation(data => noticeApis.clientNoticePost(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('clientNoticeList');
    },
  });
}

// client 공지사항 조회
export function useClientNoticeLoad(
  page,
  selectType,
  selectStatus,
  selectSpots,
  selectPush,
) {
  return useQuery('clientNoticeList', () => {
    return noticeApis.clientNoticeGet(
      page,
      selectType,
      selectStatus,
      selectSpots,
      selectPush,
    );
  });
}

// client 공지사항 수정
export function useClientNoticeModify() {
  const queryClient = useQueryClient();
  return useMutation(data => noticeApis.clientNoticeModify(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('clientNoticeList');
    },
  });
}

// 알림톡
export function useAlramTalk() {
  const queryClient = useQueryClient();
  return useMutation(id => noticeApis.alramTalk(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('clientNoticeList');
      queryClient.invalidateQueries('makersNoticeList');
    },
  });
}
