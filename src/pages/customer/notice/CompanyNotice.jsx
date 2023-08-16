import {useEffect, useState} from 'react';
import {Button, Pagination, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {useNavigate} from 'react-router-dom';
import {useAtom} from 'jotai';
import {
  noticeCompanyPageAtom,
  noticeCompanyPushFilterAtom,
  noticeCompanySpotFilterAtom,
  noticeCompanyStatusFilterAtom,
  noticeCompanyTypeFilterAtom,
} from 'utils/store';
import NoticeFilter from './components/NoticeFilter';
import {useAlramTalk, useClientNoticeLoad} from 'hooks/uesNotice';
import {clientboardTypeFomatted, statusFomatted} from 'utils/noticeType';

const CompanyNotice = () => {
  const [selectType, setSelectType] = useAtom(noticeCompanyTypeFilterAtom);
  const [selectStatus, setSelectStatus] = useAtom(
    noticeCompanyStatusFilterAtom,
  );
  const [selectSpots, setSelctSpots] = useAtom(noticeCompanySpotFilterAtom);
  const [selectPush, setSelectPush] = useAtom(noticeCompanyPushFilterAtom);

  const [page, setPage] = useAtom(noticeCompanyPageAtom);
  const [totalPage, setTotalPage] = useState(0);
  const {mutateAsync: sendAlram} = useAlramTalk();
  const {data: clientNoticeList, refetch} = useClientNoticeLoad(
    page,
    selectType,
    selectStatus,
    selectSpots,
    selectPush,
  );

  const navigate = useNavigate();

  const goToWritePage = () => {
    navigate('/customer/notice/write');
  };

  const goToModifyPage = el => {
    navigate('/customer/notice/write', {
      state: el,
    });
  };

  const FilterReset = () => {
    setSelectType(null);
    setSelectStatus(null);
    setSelctSpots([]);
    setSelectPush(null);
  };

  const sendTalkClick = async id => {
    await sendAlram({id: id});
  };

  useEffect(() => {
    if (clientNoticeList?.data) {
      setTotalPage(clientNoticeList?.data?.total);
    }
  }, [clientNoticeList?.data]);

  useEffect(() => {
    refetch();
  }, [page, refetch, selectType, selectStatus, selectSpots, selectPush]);
  return (
    <PageWrapper>
      <TopWrap>
        <NoticeFilter />
        <ButtonWrap>
          <Button
            content="필터 초기화"
            color="black"
            style={{marginRight: 12}}
            onClick={FilterReset}
          />
          <Button
            content="추가"
            color="green"
            onClick={() => {
              goToWritePage();
            }}
          />
        </ButtonWrap>
      </TopWrap>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">제목</Table.HeaderCell>
              {/* <Table.HeaderCell textAlign="center">내용</Table.HeaderCell> */}
              <Table.HeaderCell textAlign="center">스팟</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">생성날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                알림톡 전송
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {clientNoticeList?.data?.items?.length !== 0 ? (
              clientNoticeList?.data?.items?.map((el, idx) => {
                return (
                  <Table.Row
                    key={el.id}
                    style={{cursor: 'pointer'}}
                    onClick={() => goToModifyPage(el)}>
                    <Table.Cell textAlign="center">{el.id}</Table.Cell>
                    <Table.Cell textAlign="center">
                      {statusFomatted(el.isStatus)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {clientboardTypeFomatted(el.boardType)}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={5}>
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <TextoverView style={{width: 200}}>
                          {el.title}
                        </TextoverView>
                      </div>
                    </Table.Cell>
                    {/* <Table.Cell width={1}>
                      <TextoverView
                        dangerouslySetInnerHTML={{
                          __html: el.content,
                        }}></TextoverView>
                    </Table.Cell> */}
                    <Table.Cell textAlign="center" width={2}>
                      <TextoverView style={{width: 200}}>
                        {el.groupNames?.join(',')}
                      </TextoverView>
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.createDate}</Table.Cell>

                    <Table.Cell
                      textAlign="center"
                      width={2}
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <Button
                        onClick={() => sendTalkClick(el.id)}
                        disabled={el.isAlarmTalk}
                        content={el.isAlarmTalk ? '전송 완료' : '전송'}
                        size="tiny"
                        color="facebook"
                      />
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row>
                <Table.Cell colSpan={8} textAlign="center">
                  데이터가 없어요
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </TableWrapper>
      <PaginationWrap>
        <Pagination
          ellipsisItem={null}
          defaultActivePage={page}
          totalPages={totalPage}
          boundaryRange={1}
          onPageChange={(e, data) => {
            setPage(data.activePage);
          }}
        />
      </PaginationWrap>
    </PageWrapper>
  );
};

export default CompanyNotice;

const ButtonWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const TextoverView = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 350px;
  max-height: 23px;
  line-height: 23px;
`;

const TopWrap = styled.div`
  display: flex;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
`;
