import IssueModal from 'pages/adjustment/components/IssueModal';
import {useEffect, useState} from 'react';
import {Button, Pagination, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';

import {useNavigate} from 'react-router-dom';
import NoticeFilter from './components/NoticeFilter';
import {useAtom} from 'jotai';
import {
  noticePageAtom,
  noticePushFilterAtom,
  noticeSpotFilterAtom,
  noticeStatusFilterAtom,
  noticeTypeFilterAtom,
} from 'utils/store';
import {useAppNoticeLoad, useAppNoticePushAlram} from 'hooks/uesNotice';
import {boardTypeFomatted, statusFomatted} from 'utils/noticeType';

const Announcement = () => {
  const [selectType, setSelectType] = useAtom(noticeTypeFilterAtom);
  const [selectStatus, setSelectStatus] = useAtom(noticeStatusFilterAtom);
  const [selectSpots, setSelectSpots] = useAtom(noticeSpotFilterAtom);
  const [selectPush, setSelectPush] = useAtom(noticePushFilterAtom);
  const [success, setSuccess] = useState(true);

  const [page, setPage] = useAtom(noticePageAtom);
  const [totalPage, setTotalPage] = useState(0);
  const {data: appNoticeList, refetch} = useAppNoticeLoad(
    page,
    selectType,
    selectStatus,
    selectSpots,
    selectPush,
  );
  const {mutateAsync: pushAlram} = useAppNoticePushAlram();

  const navigate = useNavigate();

  const goToPage = () => {
    navigate('/board/notice/write', {});
  };

  const goToModifyPage = el => {
    navigate('/board/notice/write', {
      state: el,
    });
  };

  const FilterReset = () => {
    setSelectType(null);
    setSelectStatus(null);
    setSelectSpots([]);
    setSelectPush(null);
  };

  const sendAlram = async (id, status) => {
    if (status) {
      await pushAlram({id: id});
    } else {
      alert(`상태값을 '활성' 으로 변경해주세요`);
    }
  };

  useEffect(() => {
    if (appNoticeList?.data) {
      setTotalPage(appNoticeList?.data?.total);
    }
  }, [appNoticeList?.data]);

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
              goToPage();
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
              <Table.HeaderCell textAlign="center">알림 전송</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {appNoticeList?.data?.items?.length !== 0 ? (
              appNoticeList?.data?.items?.map((el, idx) => {
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
                      {boardTypeFomatted(el.boardType)}
                    </Table.Cell>
                    <Table.Cell width={5} textAlign="center">
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
                        disabled={el.isPushAlarm}
                        content={el.isPushAlarm ? '전송 완료' : '전송'}
                        size="tiny"
                        color="facebook"
                        onClick={() => sendAlram(el.id, el.isStatus)}
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

export default Announcement;

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
  margin-top: 24px;
`;
