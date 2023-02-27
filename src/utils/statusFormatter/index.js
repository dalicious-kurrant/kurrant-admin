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

export function scheduleFormatted2(data) {
  switch (data) {
    case '요청':
      return 0;
    case '승인':
      return 1;
    case '거절':
      return 2;
    case '대기':
      return 3;
    case '완료':
      return 4;
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
];
