import {useEffect} from 'react';
import {useState} from 'react';
import {
  calculatePageButtons,
  calculatePageMove,
  calculateTotalPages,
} from './Logics/PaginationLogics';

const usePagination = (totalLength, page, setPage, limit, setLimit) => {
  const [pagepage, setPagePage] = useState(1);

  const [dataLimitLimit, setDataLimitLimit] = useState(1);
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    // 페이지 번호 리스트 [1,2,3,4,5]

    setPageList(
      calculatePageButtons(
        pagepage,
        calculateTotalPages(totalLength, dataLimitLimit),
      ),
    );
  }, [pagepage, totalLength, dataLimitLimit]);

  const handleButtonClick = e => {
    setPagePage(e.target.id);
  };

  const handleGoToEdge = e => {
    setPagePage(e.target.id);
  };
  const handleMove = e => {
    setPagePage(
      calculatePageMove(
        e.target.id,
        pagepage,
        calculateTotalPages(totalLength, dataLimitLimit),
      ),
    );
  };

  return {
    page: pagepage,
    setPage: setPagePage,
    dataLimit: dataLimitLimit,
    setDataLimit: setDataLimitLimit,
    pageList,
    setPageList,
    handleButtonClick,
    handleGoToEdge,
    handleMove,
  };
};

export default usePagination;

// .dataTotalLength
