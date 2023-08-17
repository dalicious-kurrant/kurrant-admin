import {useEffect, useState} from 'react';
import {Button, Pagination, Table} from 'semantic-ui-react';
import {PageWrapper, TableWrapper} from 'style/common.style';
import styled from 'styled-components';

import {useNavigate} from 'react-router-dom';

import {useAtom} from 'jotai';
import {
  noticeMakersFilterAtom,
  noticeMakersPageAtom,
  noticeMakersPushFilterAtom,
  noticeMakersStatusFilterAtom,
  noticeMakersTypeFilterAtom,
} from 'utils/store';
import NoticeFilter from './components/notice/NoticeFilter';
import {useAlramTalk, useMakersNoticeLoad} from 'hooks/uesNotice';
import {makersboardTypeFomatted, statusFomatted} from 'utils/noticeType';

const MakersNotice = () => {
  const [selectType, setSelectType] = useAtom(noticeMakersTypeFilterAtom);
  const [selectStatus, setSelectStatus] = useAtom(noticeMakersStatusFilterAtom);
  const [selectMakers, setSelectMakers] = useAtom(noticeMakersFilterAtom);
  const [selectPush, setSelectPush] = useAtom(noticeMakersPushFilterAtom);

  const [page, setPage] = useAtom(noticeMakersPageAtom);
  const [totalPage, setTotalPage] = useState(0);
  const {mutateAsync: sendAlram} = useAlramTalk();
  const {data: makersNoticeList, refetch} = useMakersNoticeLoad(
    page,
    selectType,
    selectStatus,
    selectMakers,
    selectPush,
  );

  const navigate = useNavigate();

  const goToWritePage = () => {
    navigate('/makers/notice/write');
  };

  const goToModifyPage = el => {
    navigate('/makers/notice/write', {
      state: el,
    });
  };

  const sendTalkClick = async (id, status) => {
    if (status) {
      await sendAlram({id: id});
    } else {
      alert(`상태값을 '활성' 으로 변경해주세요`);
    }
  };

  const FilterReset = () => {
    setSelectType(null);
    setSelectStatus(null);
    setSelectMakers(null);
    setSelectPush(null);
  };
  useEffect(() => {
    if (makersNoticeList?.data) {
      setTotalPage(makersNoticeList?.data?.total);
    }
  }, [makersNoticeList?.data]);

  useEffect(() => {
    refetch();
  }, [page, refetch, selectType, selectStatus, selectMakers, selectPush]);
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
              <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">생성날짜</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                알림톡 전송
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {makersNoticeList?.data?.items?.length !== 0 ? (
              makersNoticeList?.data?.items?.map((el, idx) => {
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
                      {makersboardTypeFomatted(el.boardType)}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <div style={{display: 'flex', justifyContent: 'center'}}>
                        <TextoverView>{el.title}</TextoverView>
                      </div>
                    </Table.Cell>

                    <Table.Cell textAlign="center" width={2}>
                      {el.makersName}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {el.createDate}
                    </Table.Cell>
                    <Table.Cell
                      textAlign="center"
                      width={2}
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <Button
                        onClick={() => sendTalkClick(el.id, el.isStatus)}
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

export default MakersNotice;

const ButtonWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const TextoverView = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 350px;

  /* max-height: 23px;
  line-height: 23px; */
`;

const TopWrap = styled.div`
  display: flex;
`;

const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
