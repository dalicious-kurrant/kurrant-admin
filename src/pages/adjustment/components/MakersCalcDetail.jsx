import {
  useAddMakersIssue,
  useMakersAdjustListDetail,
} from 'hooks/useAdjustment';
import {useLocation} from 'react-router-dom';
import {Button, Header, Table} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import withCommas from 'utils/withCommas';
import OrderData from './OrderData';
import DefaultTable from './DefaultTable';
import logo from '../../../asset/image/logo.png';
import {useEffect, useInsertionEffect, useState} from 'react';
import IssueModal from './IssueModal';
import MakersDetailTable from './MakersDetailTable';

const MakersCalcDetail = () => {
  const location = useLocation();
  const id = location.state.makersId;
  const makersName = location.state.name;

  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {data: adjustData} = useMakersAdjustListDetail(id);
  const {mutateAsync: updateIssue, isSuccess} = useAddMakersIssue();
  const [paycheckAdds, setPayChecks] = useState([]);
  const list = adjustData?.data;

  const updateButton = async () => {
    // const updateData = paycheckAdds?.filter(
    //   el => !list?.paycheckAdds.includes(el),
    // );
    const data = {
      id: id,
      data: paycheckAdds,
    };
    if (paycheckAdds.length !== 0) {
      setLoading(true);
      await updateIssue(data);
      setPayChecks([]);
      setLoading(false);
      alert('업데이트 완료');
    }
  };

  // useEffect(() => {
  //   setPayChecks(list?.paycheckAdds);
  // }, [list?.paycheckAdds]);
  return (
    <PageWrapper>
      <MakersDetailTable data={adjustData?.data?.makersPaycheckInfo} />
      <ButtonWrap>
        <Button
          content="추가이슈 생성"
          size="small"
          color="blue"
          onClick={() => setOpenModal(true)}
        />
        <Button
          content="업데이트"
          size="small"
          color="blue"
          onClick={() => {
            updateButton();
          }}
          disabled={loading}
        />
      </ButtonWrap>
      <Wrap>
        <Header as="h2" style={{marginBottom: 48}}>
          거래명세서
        </Header>
        <div
          style={{
            justifyContent: 'space-between',
            display: 'flex',
          }}>
          <Box>
            <Title>수신</Title>
            <TitleContent>{makersName}</TitleContent>
          </Box>

          <Box>
            <div>{adjustData?.data?.transactionInfoDefault?.yearMonth}</div>
          </Box>
        </div>
        <Border style={{marginBottom: 32}} />
        <Title>공급자</Title>

        <DefaultTable data={adjustData?.data?.transactionInfoDefault} />
        <OrderData list={adjustData?.data} />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">사유</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">금액</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list?.paycheckAdds?.length === 0 && paycheckAdds?.length === 0 ? (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan="3">
                  없음
                </Table.Cell>
              </Table.Row>
            ) : (
              list?.paycheckAdds?.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center">{el.issueDate}</Table.Cell>
                    <Table.Cell textAlign="center">{el.memo}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {withCommas(el.price)}
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
            {paycheckAdds?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">{el.issueDate}</Table.Cell>
                  <Table.Cell textAlign="center">{el.memo}</Table.Cell>
                  <Table.Cell textAlign="center">
                    {withCommas(el.price)}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
        <TotalPriceWrap>
          <TotalWrap>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Title>매출 총액</Title>
              <div>{withCommas(list?.foodsPrice)}</div>
            </Box>
            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Title>수수료({list?.commission}%)</Title>
              <div>{withCommas(list?.commissionPrice)}</div>
            </Box>

            <Box style={{display: 'flex', justifyContent: 'space-between'}}>
              <Title>정산 금액</Title>
              <div>{withCommas(list?.totalPrice)}</div>
            </Box>
          </TotalWrap>
        </TotalPriceWrap>
        <Border />
        <ImageWrap>
          <Statement>
            <Title>위와 같이 명세서 제출합니다.</Title>
          </Statement>
          <Image src={logo} alt="" />
        </ImageWrap>
      </Wrap>
      <Wrap style={{marginTop: 12}}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                colSpan={6}
                style={{
                  backgroundColor: '#bdbac1',
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                메이커스 메모
              </Table.HeaderCell>
            </Table.Row>
            <Table.Row>
              <Table.HeaderCell
                width={4}
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                등록날짜
              </Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                style={{
                  paddingTop: 6,
                  paddingBottom: 6,
                }}>
                내용
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">20222222</Table.Cell>
              <Table.Cell>우동 빠졌음</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Wrap>
      <Wrap>
        <Title style={{marginTop: 24}}> 메모</Title>
        {/* <div>{list?.paycheckMemo}</div> */}
        <MemoWrap></MemoWrap>
        <MemoButtonWrap>
          <Button content="메모작성" color="green" size="mini" />
        </MemoButtonWrap>
      </Wrap>

      {openModal && (
        <IssueModal
          open={openModal}
          setOpen={setOpenModal}
          setModifyData={setPayChecks}
        />
      )}
    </PageWrapper>
  );
};

export default MakersCalcDetail;

const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;

const Wrap = styled.div`
  width: 70%;
`;
const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const Border = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
  margin: 24px 0px;
`;

const TitleContent = styled.div`
  color: ${({theme}) => theme.colors.grey[4]};
`;

const TotalPriceWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TotalWrap = styled.div``;

const Image = styled.img`
  width: 140px;
`;

const ImageWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Statement = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

const MemoWrap = styled.div`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  min-height: 100px;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;

const MemoButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
