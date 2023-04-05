export const makePaginationPagesArray = (page, totalPage) => {
  if (page < 1) {
    console.log(`페이지값이 1보다 작아요 . ${page}`);
  }

  if (page > totalPage) {
    console.log(
      '현재페이지가 총 페이지수를 넘어버리고 있습니다 값을 확인해 주세요',
    );
  }

  // 10으로 나눌떄 몫을 받아서 만들면되겠다
  // 몫

  // 20일떄 tens가 1이여야됨
  // 나머지는 10 19

  const tens = Math.floor((page - 1) / 10);
  // 20 -> 19 -> 1
  // 10 -> 9 -> 0
  // 1 -> 0 -> 0

  // 나머지
  // 10일때 10으로 카운트 되어야 함
  // ones가 10으로 카운트
  // page가 10의 배수일떄 + 1?

  // 나머지는 0부터 9

  const ones = page % 10;

  // 마지막이 121 이면  Math.floor(그수/10) 가 같을 때
  // Math.floor((page-1)/10) === Math.floor((totalPage-1)/10)
  let yo = [];

  if (Math.floor((page - 1) / 10) !== Math.floor((totalPage - 1) / 10)) {
    // 112 랑 121

    for (let i = 1; i < 11; i++) {
      yo.push(tens * 10 + i);
    }
  } else {
    // 121 랑 124

    for (let i = 1; i <= totalPage % 10; i++) {
      yo.push(tens * 10 + i);
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
