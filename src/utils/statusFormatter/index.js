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
export function adjustStatusFomatted(data) {
  switch (data) {
    case 0:
      return '정산 신청 완료';
    case 1:
      return '거래명세서 확정 대기';
    case 2:
      return '정산금 입금 완료';
    default:
      return '정산 신청 완료';
  }
}
export function adjustReverseStatusFomatted(data) {
  switch (data) {
    case '정산 신청 완료':
      return 0;
    case '거래명세서 확정 대기':
      return 1;
    case '정산금 입금 완료':
      return 2;
    case '추가 요청 처리 완료':
      return 3;
    case '거래명세서 확정':
      return 4;
    default:
      return 0;
  }
}

export function orderStatusFomatted(data) {
  switch (data) {
    case '주문실패':
      return 4;
    case '결제완료':
      return 5;
    case '배송대기':
      return 6;
    case '취소':
      return 7;
    case '배송중':
      return 9;
    case '배송완료':
      return 10;
    case '수령완료':
      return 11;
    case '수동 환불':
      return 12;
    case '자동 환불':
      return 13;
    case '리뷰 작성 완료':
      return 14;
    default:
      return 0;
  }
}
export function adjustTextStatusFomatted(data) {
  switch (data) {
    case '정산 신청 완료':
      return '정산 신청 완료';
    case '거래명세서 확정 대기':
      return '거래명세서 확정 대기';
    case '정산금 입금 완료':
      return '정산금 입금 완료';
    default:
      return '정산 신청 완료';
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
export function diningReverseFormatted(data) {
  switch (data) {
    case '아침':
      return 1;
    case '점심':
      return 2;
    case '저녁':
      return 3;
    default:
      return 1;
  }
}
export function preFormatted(data) {
  switch (data) {
    case '조식비':
      return 1;
    case '중식비':
      return 2;
    case '석식비':
      return 3;
    case '배송비':
      return 4;
    case '멤버십':
      return 5;
    case '추가 주문':
      return 6;
    case '쓰레기 수거':
      return 7;
    case '온장고 사용':
      return 8;
    case '식사 세팅':
      return 9;
    default:
      return 1;
  }
}
export function preNumberFormatted(data) {
  switch (data) {
    case 1:
      return '조식비';
    case 2:
      return '중식비';
    case 3:
      return '석식비';
    case 4:
      return '배송비';
    case 5:
      return '멤버십';
    case 6:
      return '추가 주문';
    case 7:
      return '쓰레기 수거';
    case 8:
      return '온장고 사용';
    case 9:
      return '식사 세팅';
    default:
      return null;
  }
}
export const preData = [
  {value: 1 ,text:'조식비'},
  {value: 2 ,text:'중식비'},
  {value: 3 ,text:'석식비'},
  {value: 4 ,text:'배송비'},
  {value: 5 ,text:'멤버십'},
  {value: 6 ,text:'추가 주문'},
  {value: 7 ,text:'쓰레기 수거'},
  {value: 8 ,text:'온장고 사용'},
  {value: 9 ,text:'식사 세팅'},
]
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
export function groupTypeFormatted2(data) {
  switch (data) {
    case '기업':
      return 0;
    case '아파트':
      return 1;
    case '오픈스팟':
      return 2;
    default:
      return 3;
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
