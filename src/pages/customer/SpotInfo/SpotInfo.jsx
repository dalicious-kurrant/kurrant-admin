import axios from 'axios';
import usePagination from 'common/Pagination/usePagination';
import {useQuery} from 'react-query';
import {Button} from 'semantic-ui-react';

import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';

const SpotInfo = () => {
  const {onActive} = useModal();

  const {data: dataTotalLength} = useQuery(['getSpotInfoLength'], async () => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
      // `${process.env.REACT_APP_TEST_SERVER_URL}/members?code=AAAAAA`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );

    return response.data.length;
  });

  const {
    page,
    setPage,
    dataLimit,
    setDataLimit,
    pageList,
    handleButtonClick,
    handleGoToEdge,
    handleMove,
  } = usePagination(dataTotalLength);

  const {
    data: dataList,
    status,
    isLoading,
  } = useQuery(['getSpotInfo', page, dataLimit], async ({queryKey}) => {
    const response = await axios.get(
      // `${process.env.REACT_APP_SERVER_URL}/v1/client/members`,
      `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}?_page=${queryKey[1]}&_limit=${queryKey[2]}`,
      // `${process.env.REACT_APP_JSON_SERVER_USER_STATUS}`,
    );
    return response.data;
  });

  //   if (isLoading)
  //     return (
  //       <>
  //         {' '}
  //         <div>로딩중입니다..</div>{' '}
  //       </>
  //     );

  //   if (status === 'error')
  //     return (
  //       <div>
  //         에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
  //         있어요
  //       </div>
  //     );

  return (
    <PageWrapper>
      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper></TableWrapper>
    </PageWrapper>
  );
};

export default SpotInfo;
