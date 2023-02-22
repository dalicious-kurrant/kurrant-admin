import axios from 'axios';
import Pagination from 'common/Pagination/Pagination';
import usePagination from 'common/Pagination/usePagination';
import Table from 'common/Table/Table';
import {spotInfoFields} from 'data/spotInfo/spotInfoData';
import {useAtom} from 'jotai';
import {useQuery} from 'react-query';
import {Button} from 'semantic-ui-react';

import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';
import {SpotInfoDataAtom} from './store';
import useSpotInfoQuery from './useSpotInfoQuery';

const SpotInfo = () => {
  const {onActive} = useModal();
  const [spotInfoData, setSpotInfoData] = useAtom(SpotInfoDataAtom);

  const {status, isLoading} = useSpotInfoQuery();

  // const {
  //   page,
  //   setPage,
  //   dataLimit,
  //   setDataLimit,
  //   pageList,
  //   handleButtonClick,
  //   handleGoToEdge,
  //   handleMove,
  // } = usePagination(dataTotalLength);

  // const {
  //   data: dataList,
  //   status,
  //   isLoading,
  // } = useQuery(['getSpotInfo', page, dataLimit], async ({queryKey}) => {
  //   //   } = useQuery(['getSpotInfo', 1, 4], async ({queryKey}) => {
  //   const response = await axios.get(
  //     // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
  //     `${process.env.REACT_APP_JSON_SERVER_SPOT_INFO}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
  //     // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
  //   );

  //   // console.log(response.data);
  //   return response.data;
  // });

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        {/* <Pagination
          dataTotalLength={dataTotalLength}
          page={page}
          setPage={setPage}
          dataLimit={dataLimit}
          setDataLimit={setDataLimit}
          pageList={pageList}
          handleButtonClick={handleButtonClick}
          handleGoToEdge={handleGoToEdge}
          handleMove={handleMove}
          selectOptionArray={[1, 2, 4, 10]}
        /> */}

        {/* {!!dataList && dataList.length !== 0 && (
          <Table tableFieldsInput={spotInfoFields} tableDataInput={dataList} />
        )} */}
        {!!spotInfoData && spotInfoData.length !== 0 && (
          <Table
            tableFieldsInput={spotInfoFields}
            tableDataInput={spotInfoData}
          />
        )}
      </TableWrapper>
    </PageWrapper>
  );
};

export default SpotInfo;
