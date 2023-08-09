export const makePaginationPagesArray = (page, totalPage) => {
  if (page < 1) {
    console.log(`페이지값이 1보다 작아요 . ${page}`);
    return;
  }

  if (page > totalPage) {
    console.log(
      '현재페이지가 총 페이지수를 넘어버리고 있습니다 값을 확인해 주세요',
    );
    return;
  }

  // 10으로 나눌떄 몫을 받아서 만들면되겠다
  // 몫

  // 20일떄 tens가 1이여야됨
  // 나머지는 10 19

  const tens = Math.floor((page - 1) / 10);
  // 20 -> 19 -> 1
  // 10 -> 9 -> 0
  // 1 -> 0 -> 0

  // 마지막이 121 이면  Math.floor(그수/10) 가 같을 때
  // Math.floor((page-1)/10) === Math.floor((totalPage-1)/10)
  let yo = [];

  if (totalPage === 10) return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  if (Math.floor((page - 1) / 10) !== Math.floor((totalPage - 1) / 10)) {
    // 예) (112, 121)

    for (let i = 1; i < 11; i++) {
      yo.push(tens * 10 + i);
    }
  } else {
    // 예)  (121, 124), (121, 130), (2, 10)

    if (totalPage % 10 === 0) {
      // (121, 130), (2,10)일때랑
      // totalPage의 1의 자리가 0일때
      for (let i = 1; i <= (totalPage - 1) % 10; i++) {
        yo.push(tens * 10 + i);
      }
      yo.push(totalPage);
    } else {
      // (121, 131)이랑 구분
      // totalPage의 1의 자리가 0이 아닐때
      for (let i = 1; i <= totalPage % 10; i++) {
        yo.push(tens * 10 + i);
      }
    }
  }

  return yo;
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
