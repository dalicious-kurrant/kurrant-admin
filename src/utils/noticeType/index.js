export function boardTypeFomatted(data) {
  switch (data) {
    case 0:
      return '전체 공지';
    case 1:
      return '스팟 공지';
    case 2:
      return '팝업';
    case 3:
      return '이벤트 공지';
    default:
      return '전체 공지';
  }
}
export function statusFomatted(data) {
  switch (data) {
    case true:
      return '활성';
    case false:
      return '비활성';

    default:
      return '활성';
  }
}

export function makersboardTypeFomatted(data) {
  switch (data) {
    case 0:
      return '전체 공지';
    case 4:
      return '메이커스 공지';
    case 6:
      return '정보 변경 승인';
    case 7:
      return '가격 변경 승인';
    case 8:
      return '정산 완료';
    default:
      return '전체 공지';
  }
}

export function clientboardTypeFomatted(data) {
  switch (data) {
    case 0:
      return '전체 공지';
    case 5:
      return '고객 공지';
    case 6:
      return '정보 변경 승인';
    case 7:
      return '가격 변경 승인';
    case 8:
      return '정산 완료';
    default:
      return '전체 공지';
  }
}
