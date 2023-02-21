export function scheduleFormatted(data) {
  switch (data) {
    case 0:
      return '대기';
    case 1:
      return '승인';
    case 2:
      return '거절';
    default:
      return '승인';
  }
}

export function scheduleFormatted2(data) {
  switch (data) {
    case '대기':
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
    key: '판매 대기',
    text: '판매 대기',
    value: '판매 대기',
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
    key: '판매 중지',
    text: '판매 중지',
    value: '판매 중지',
  },
];
