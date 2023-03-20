export function scheduleFormatted(data) {
  switch (data) {
    case 0:
      return '요청';
    case 1:
      return '승인';
    case 2:
      return '거절';
    case 3:
      return '대기';
    case 4:
      return '완료';
    default:
      return '승인';
  }
}
export function foodStatusFomatted(data) {
  switch (data) {
    case 0:
      return '판매대기';
    case 1:
      return '판매중';
    case 2:
      return '판매중지';
    default:
      return '승인';
  }
}
export function diningFormatted(data) {
  switch (data) {
    case 1:
      return '아침';
    case 2:
      return '점심';
    case 3:
      return '저녁';
    default:
      return '아침';
  }
}
export function userStatusFormatted(data) {
  switch (data) {
    case 0:
      return '탈퇴';
    case 1:
      return '활성';
    case 2:
      return '탈퇴 요청';
    default:
      return '비인가';
  }
}
export function groupTypeFormatted(data) {
  switch (data) {
    case 0:
      return '기업';
    case 1:
      return '아파트';
    case 2:
      return '오픈스팟';
    default:
      return '비인가';
  }
}

export function scheduleFormatted2(data) {
  switch (data) {
    case '요청':
      return 0;
    case '승인':
      return 1;
    case '거절':
      return 2;

    default:
      return 1;
  }
}

export const foodStatusData = [
  {
    key: '판매대기',
    text: '판매대기',
    value: '판매대기',
  },
  {
    key: '판매중',
    text: '판매중',
    value: '판매중',
  },
  {
    key: '품절',
    text: '품절',
    value: '품절',
  },
  {
    key: '취소불가품',
    text: '취소불가품',
    value: '취소불가품',
  },
  {
    key: '판매중지',
    text: '판매중지',
    value: '판매중지',
  },
  {
    key: '등록대기',
    text: '등록대기',
    value: '등록대기',
  },
  {
    key: '주문마감',
    text: '주문마감',
    value: '주문마감',
  },
];
export const foodCompleteStatusData = [
  {
    key: '판매대기',
    text: '판매대기',
    value: 0,
  },
  {
    key: '판매중',
    text: '판매중',
    value: 1,
  },
  {
    key: '품절',
    text: '품절',
    value: 2,
  },
  {
    key: '취소불가품',
    text: '취소불가품',
    value: 3,
  },
  {
    key: '판매중지',
    text: '판매중지',
    value: 4,
  },
  {
    key: '등록대기',
    text: '등록대기',
    value: 5,
  },
  {
    key: '주문마감',
    text: '주문마감',
    value: 6,
  },
];
