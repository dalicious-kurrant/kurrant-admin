import {calculatePageButtons} from 'common/Pagination/Logics/PaginationLogics';
import {calculateTotalPages} from './PaginationLogics';

const usePagination = (totalLength, limit, page) => {
  // const totalPage = Math.ceil(totalLength / limit);

  const totalPageByLimit = calculateTotalPages(totalLength, limit);

  const totalPageArray = calculatePageButtons(page, totalPageByLimit);

  return {totalPageArray, totalPageByLimit};
};

export default usePagination;
