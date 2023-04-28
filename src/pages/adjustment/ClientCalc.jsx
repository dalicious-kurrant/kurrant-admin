import {
  useMakersAdjustList,
  useSpotsAdjustList,
  useUpdateMakersAdjustStatus,
  useUpdateSpotsAdjustStatus,
} from 'hooks/useAdjustment';
import {useEffect, useState} from 'react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import {Dropdown, Table} from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import ExcelIcon from '../../asset/icons/excel.svg';
import PDFIcon from '../../asset/icons/pdfIcon.svg';
import {adjustReverseStatusFomatted} from 'utils/statusFormatter';
import {
  endMonthClientAtom,
  selectClientClientAtom,
  selectModifyClientAtom,
  selectStatusClientAtom,
  startMonthClientAtom,
} from 'utils/store';
import {useAtom} from 'jotai';
import withCommas from 'utils/withCommas';
import ClientFilter from './components/ClientFilter';

const ClientCalc = () => {
  const navigate = useNavigate();

  const {mutateAsync: updateStatus} = useUpdateSpotsAdjustStatus();
  const [startMonth, setStartMonth] = useAtom(startMonthClientAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthClientAtom);
  const [selectClient] = useAtom(selectClientClientAtom);
  const [selectStatus] = useAtom(selectStatusClientAtom);
  const [selectModify] = useAtom(selectModifyClientAtom);

  const start = startMonth?.split('-')[0] + startMonth?.split('-')[1];
  const end = endMonth?.split('-')[0] + endMonth?.split('-')[1];
  const {data: spotsAdjustList, refetch} = useSpotsAdjustList(
    start,
    end,
    selectClient,
    selectStatus,
    selectModify,
  );

  const totalData = spotsAdjustList?.data?.statusLists;

  const statusData = [
    {key: 1, text: '정산 신청 완료', value: 0},
    {key: 2, text: '거래명세서 확정 대기', value: 1},
    {key: 3, text: '정산금 입금 완료', value: 2},
    {key: 4, text: '추가 요청 처리 완료', value: 3},
    {key: 5, text: '거래명세서 확정', value: 4},
  ];

  // 디테일 페이지 이동
  const goToPage = (id, name) => {
    navigate('/calc/groupCalc/detail', {
      state: {
        makersId: id,
        name: name,
      },
    });
  };

  useEffect(() => {
    refetch();
  }, [refetch, startMonth, endMonth, selectClient, selectStatus, selectModify]);
  return (
    <PageWrapper>
      <div
        style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 24}}>
        <TotalWrap>
          {totalData?.map((el, idx) => {
            return (
              <TotalTextWrap key={idx}>
                <TotalTite>{el.status}</TotalTite>
                <TotalTite>{el.count}건</TotalTite>
              </TotalTextWrap>
            );
          })}
        </TotalWrap>
      </div>

      <ClientFilter />
      <Table celled style={{marginTop: 48}} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">스팟(고객사)</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">선금</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">담당자</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">전화번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">수정요청</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {spotsAdjustList?.data?.corporationResponses?.map(v => {
            return (
              <Table.Row key={v.id} style={{cursor: 'pointer'}}>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v?.year}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v?.month}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v?.corporationName}
                </Table.Cell>
                <Table.Cell
                  onClick={() => goToPage(v.id, v.corporationName)}
                  textAlign="center">
                  {withCommas(v.prepaidPrice ?? '0')}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {withCommas(v.price)}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v.managerName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.corporationName)}>
                  {v.phone}
                </Table.Cell>
                <Table.Cell>
                  <InputBlock>
                    <Dropdown
                      placeholder="상태"
                      fluid
                      selection
                      search
                      options={statusData}
                      value={adjustReverseStatusFomatted(v.paycheckStatus)}
                      onChange={async (e, data) => {
                        await updateStatus({
                          id: data.value,
                          status: [v.id],
                        });
                      }}
                    />
                  </InputBlock>
                </Table.Cell>
                <Table.Cell textAlign="center" style={{maxWidth: 130}}>
                  {v.hasRequest ? '있음' : '없음'}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.excelFile ? (
                    <Link to={v.excelFile}>
                      <InputImage alt="ExcelIcon" src={ExcelIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.pdfFile ? (
                    <Link to={v.pdfFile}>
                      <InputImage alt="PDFIcon" src={PDFIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
    </PageWrapper>
  );
};

export default ClientCalc;
const InputImage = styled.img`
  width: 40px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;

const InputBlock = styled.div`
  max-width: 180px;
  font-size: 14px;
`;

const TotalTite = styled.div`
  font-weight: 600;
  padding-bottom: 10px;

  :nth-child(1) {
    padding-right: 12px;
  }
`;

const TotalTextWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const TotalWrap = styled.div`
  min-width: 250px;
  min-height: 145px;
`;
