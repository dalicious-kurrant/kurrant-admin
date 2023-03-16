export const calculateTotalPages = (dataLength, limit) => {
  let buttonCount;

  if (dataLength / limit - Math.floor(dataLength / limit) === 0) {
    buttonCount = Math.floor(dataLength / limit);
  } else {
    buttonCount = Math.floor(dataLength / limit) + 1;
  }

  return buttonCount;
};

export const calculatePageButtons = (pageNow, totalPages) => {
  if (pageNow <= 0 || totalPages <= 0) {
    console.log('에러: 현재페이지 아니면 총 페이지수가 음수 임');
    return [];
  }
  if (pageNow > totalPages) {
    console.log(
      '에러 : 현재 페이지수가 총 페이지수보다 더 큼;; 대입값을 확인해주시오      ',
    );
    return [];
  }

  const tens = Math.floor((pageNow - 1) / 10);
  const units = pageNow % 10;

  // startNum + units
  let pageButtons = [];

  for (let a = 1; a <= 10; a++) {
    let k = tens * 10 + a;
    if (k > totalPages) break;

    pageButtons.push(k);
  }

  // console.log(`pageNow: ` + pageNow);
  // console.log(`totalPages: ` + totalPages);

  return pageButtons;
};

export const calculatePageMove = (direction, page, lastPage) => {
  if (direction !== 'move-forward' && direction !== 'move-back') {
    // console.log('에러: 함수의 첫번째 파라메타 값이 이상합니다 ');
    return;
  }

  if (page < 1) {
    console.log('에러: 페이지 수가 1보다 작아서 계산이 안돼요!');
    return;
  }

  if (direction === 'move-forward') {
    const tens = Math.floor((page - 1) / 10);
    const result = (tens + 1) * 10 + 1;
    if (result > lastPage) {
      return lastPage;
    } else {
      return result;
    }
  } else if (direction === 'move-back') {
    if (page === 10) {
      return 1;
    }

    const tens = Math.floor((page - 1) / 10);
    const result = tens * 10;

    if (result < 10) {
      return 1;
    } else {
      return result;
    }
  }
};
