import {
  useMakersAdjustList,
  useUpdateMakersAdjustStatus,
} from 'hooks/useAdjustment';
import {useEffect, useState} from 'react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import MakersFilter from './components/MakersFilter';
import {Dropdown, Table} from 'semantic-ui-react';
import {Link, useNavigate} from 'react-router-dom';
import ExcelIcon from '../../asset/icons/excel.svg';
import PDFIcon from '../../asset/icons/pdfIcon.svg';
import {adjustReverseStatusFomatted} from 'utils/statusFormatter';
import {
  endMonthAtom,
  selectClientAtom,
  selectModifyAtom,
  selectStatusAtom,
  startMonthAtom,
} from 'utils/store';
import {useAtom} from 'jotai';
import withCommas from 'utils/withCommas';

const MakersCalc = () => {
  const navigate = useNavigate();

  const {mutateAsync: updateStatus} = useUpdateMakersAdjustStatus();
  const [startMonth, setStartMonth] = useAtom(startMonthAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthAtom);
  const [selectClient] = useAtom(selectClientAtom);
  const [selectStatus] = useAtom(selectStatusAtom);
  const [selectModify] = useAtom(selectModifyAtom);

  const start = startMonth?.split('-')[0] + startMonth?.split('-')[1];
  const end = endMonth?.split('-')[0] + endMonth?.split('-')[1];

  const {data: makersAdjustList, refetch} = useMakersAdjustList(
    start,
    end,
    selectClient,
    selectStatus,
    selectModify,
  );

  const totalData = makersAdjustList?.data?.paycheckPrice;

  const statusData = [
    {key: 0, text: '정산 신청 완료', value: 0},
    {key: 1, text: '거래명세서 확정 대기', value: 1},
    {key: 2, text: '정산금 입금 완료', value: 2},
    {key: 3, text: '추가 요청 처리 완료', value: 3},
    {key: 4, text: '거래명세서 확정', value: 4},
  ];

  // 디테일 페이지 이동
  const goToPage = (id, name) => {
    navigate('/calc/makersCalc/detail', {
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
          <TotalTextWrap>
            <TotalTite>총액({totalData?.totalCount}개)</TotalTite>
            <TotalTite>
              {withCommas(
                totalData?.totalPrice === 0 ? '0' : totalData?.totalPrice,
              )}
              원
            </TotalTite>
          </TotalTextWrap>
          <TotalTextWrap>
            <TotalTite>완료 금액({totalData?.completeCount}개)</TotalTite>
            <TotalTite>
              {withCommas(
                totalData?.completePrice === 0 ? '0' : totalData?.completePrice,
              )}
              원
            </TotalTite>
          </TotalTextWrap>
          <TotalTextWrap>
            <TotalTite>남은 금액({totalData?.leftCount}개)</TotalTite>
            <TotalTite>
              {withCommas(
                totalData?.leftPrice === 0 ? '0' : totalData?.leftPrice,
              )}
              원
            </TotalTite>
          </TotalTextWrap>
        </TotalWrap>
      </div>

      <MakersFilter />
      <Table celled style={{marginTop: 48}} striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">예금주</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">은행명</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">계좌번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center" width={2}>
              상태
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">수정요청</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {makersAdjustList?.data?.makersLists?.map(v => {
            // console.log(v);
            return (
              <Table.Row key={v.makersName} style={{cursor: 'pointer'}}>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v?.year}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v?.month}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v?.makersName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {withCommas(v?.totalPrice)}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v.accountHolder}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v.nameOfBank}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() => goToPage(v.id, v.makersName)}>
                  {v.accountNumber}
                </Table.Cell>
                <Table.Cell
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
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

export default MakersCalc;
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
`;
