import {calculatePageButtons} from 'common/Pagination/Logics/PaginationLogics';

const usePagination = (totalLength, limit, page) => {
  const totalPage = Math.ceil(totalLength / limit);

  // let totalPageArray = [];
  // for (let i = 1; i <= totalPage; i++) {
  //   totalPageArray.push(i);
  // }

  const totalPageArray = calculatePageButtons(page, totalLength);

  return {totalPageArray};
};

export default usePagination;
