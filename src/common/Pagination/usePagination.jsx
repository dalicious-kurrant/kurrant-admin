import {useEffect} from 'react';
import {useState} from 'react';
import {
  calculatePageButtons,
  calculatePageMove,
  calculateTotalPages,
} from './Logics/PaginationLogics';

const usePagination = dataTotalLength => {
  const [page, setPage] = useState(1);

  const [dataLimit, setDataLimit] = useState(1);
  const [pageList, setPageList] = useState([]);

  useEffect(() => {
    setPageList(
      calculatePageButtons(
        page,
        calculateTotalPages(dataTotalLength, dataLimit),
      ),
    );
  }, [page, dataTotalLength, dataLimit]);

  const handleButtonClick = e => {
    setPage(e.target.id);
  };

  const handleGoToEdge = e => {
    setPage(e.target.id);
  };
  const handleMove = e => {
    setPage(
      calculatePageMove(
        e.target.id,
        page,
        calculateTotalPages(dataTotalLength, dataLimit),
      ),
    );
  };

  return {
    page,
    setPage,
    dataLimit,
    setDataLimit,
    pageList,
    setPageList,
    handleButtonClick,
    handleGoToEdge,
    handleMove,
  };
};

export default usePagination;

// .dataTotalLength
