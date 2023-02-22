import styled from 'styled-components';
import React, {useEffect, useState} from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
// import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
// import {planAtom} from '../../utils/store';
import {useAtom} from 'jotai';
import {BtnWrapper, PageWrapper, TableWrapper} from 'style/common.style';
import {exelSpotAtom, planAtom, spotAtom} from 'utils/store';
import useModal from 'hooks/useModal';
import useSpotInfoQuery from './useSpotInfoQuery';
import {spotInfoMockData} from 'data/spotInfo/spotInfoMockData';
import {spotInfoFields} from 'data/spotInfo/spotInfoData';
import {formattedTime, formattedWeekDate} from 'utils/dateFormatter';

const SpotInfoExcelPage = () => {
  const {onActive, chkData, setChkData} = useModal();
  const [plan, setPlan] = useAtom(exelSpotAtom);
  const [key, setKey] = useState();

  const {
    data_getSpotInfoJSON,
    status_getSpotInfoJSON,
    isLoading_getSpotInfoJSON,
  } = useSpotInfoQuery();

  // useEffect(() => {
  //   const req = [];
  //   req.push(spotInfoFields);
  //   req.push(...spotInfoMockData);
  //   setPlan(req);
  //   // console.log(SpotInfoObjectSample);
  // }, [setPlan]);
  if (isLoading_getSpotInfoJSON)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status_getSpotInfoJSON === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return <Container></Container>;
};

export default SpotInfoExcelPage;

const Container = styled.section``;

const FlexBox = styled.div`
  display: flex;
  white-space: nowrap;
`;
