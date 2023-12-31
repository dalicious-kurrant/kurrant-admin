import {Button, Header, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import DefaultTable from './DefaultTable';
import {useEffect, useState} from 'react';
import {
  useAddSpotIssue,
  useAddSpotMemo,
  useGetSpotInvoice,
} from 'hooks/useAdjustment';
import IssueModal from './IssueModal';
import logo from '../../../asset/image/logo.png';
import InvoiceTable from './InvoiceTable';
import {useAtom} from 'jotai';
import {corpDataAtom} from 'utils/store';

const Invoice = ({groupName, id}) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [, setCorpData] = useAtom(corpDataAtom);
  const [paycheckAdds, setPayChecks] = useState([]);
  const {mutateAsync: updateIssue} = useAddSpotIssue();
  const {mutateAsync: addSpotMemo} = useAddSpotMemo();
  const {data: spotInvoice} = useGetSpotInvoice(id);

  const updateButton = async () => {
    const data = {
      id: id,
      data: paycheckAdds,
    };
    if (data.data.length !== 0) {
      setLoading(true);
      await updateIssue(data);
      setPayChecks([]);
      setLoading(false);
      alert('추가이슈 업데이트 완료');
    }
  };

  const addMemo = async () => {
    const data = {
      id: id,
      memo: text.trim(),
    };

    if (data.memo.trim() !== '') {
      await addSpotMemo(data);
      setText('');
    }
  };

  useEffect(() => {
    setCorpData(spotInvoice?.data?.corporationResponse);
  }, [setCorpData, spotInvoice?.data?.corporationResponse]);
  return (
    <div>
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
            <TitleContent>{groupName}</TitleContent>
          </Box>

          <Box>
            <div>{spotInvoice?.data?.transactionInfoDefault?.yearMonth}</div>
          </Box>
        </div>
        <Border style={{marginBottom: 32}} />
        <Title>공급자</Title>

        <DefaultTable data={spotInvoice?.data?.transactionInfoDefault} />
        <InvoiceTable data={spotInvoice?.data} paycheckAdds={paycheckAdds} />
        <ImageWrap>
          <Statement>
            <Title>위와 같이 명세서 제출합니다.</Title>
          </Statement>
          <Image src={logo} alt="" />
        </ImageWrap>
      </Wrap>
      <Wrap>
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
                고객사 메모
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
                작성자
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
            {spotInvoice?.data?.memoResDtos?.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan={3} textAlign="center">
                  메모 없음
                </Table.Cell>
              </Table.Row>
            ) : (
              spotInvoice?.data?.memoResDtos?.map((el, idx) => {
                return (
                  <Table.Row key={idx}>
                    <Table.Cell textAlign="center" width={3}>
                      {el.createdDateTime}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.writer}</Table.Cell>
                    <Table.Cell>{el.memo}</Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </Wrap>
      <Wrap>
        <Title style={{marginTop: 24}}> 메모</Title>
        {/* <div>{list?.paycheckMemo}</div> */}
        <MemoWrap value={text} onChange={e => setText(e.target.value)} />
        <MemoButtonWrap>
          <Button
            content="메모작성"
            color="green"
            size="mini"
            onClick={addMemo}
          />
        </MemoButtonWrap>
      </Wrap>
      {openModal && (
        <IssueModal
          open={openModal}
          setOpen={setOpenModal}
          setModifyData={setPayChecks}
        />
      )}
    </div>
  );
};

export default Invoice;

const Wrap = styled.div`
  width: 70%;
`;

const Box = styled.div`
  display: flex;
  padding-bottom: 12px;
`;

const Image = styled.img`
  width: 140px;
`;
const ImageWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const TitleContent = styled.div`
  color: ${({theme}) => theme.colors.grey[4]};
`;
const Title = styled.div`
  font-weight: 600;
  margin-right: 24px;
`;
const Border = styled.div`
  border-bottom: 1px solid ${({theme}) => theme.colors.grey[7]};
  margin: 24px 0px;
`;

const Statement = styled.div`
  flex-direction: column;
  justify-content: center;
  display: flex;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 70%;
`;

const MemoWrap = styled.input`
  border: 1px solid ${({theme}) => theme.colors.grey[7]};
  min-height: 100px;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
  width: 100%;
  outline: none;
`;

const MemoButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
