import {PageWrapper} from 'style/common.style';
import RecommendFilter from './components/RecommendFilter';
import {Dropdown, Pagination, Table, TableHeader} from 'semantic-ui-react';
import {
  useGetRecommendMakersList,
  useModifyRecommendStatus,
} from 'hooks/useRecommendMakers';
import {useEffect, useState} from 'react';
import {recommendMakersStatus, statusArray} from 'utils/statusFormatter';
import {
  recommendMakersAtom,
  recommendSpotAtom,
  recommendStatusAtom,
} from 'utils/store';
import {useAtom} from 'jotai';
import styled from 'styled-components';

const RecommnedMakers = () => {
  const [selectStatus] = useAtom(recommendStatusAtom);
  const [selectMakers] = useAtom(recommendMakersAtom);
  const [selectSpots] = useAtom(recommendSpotAtom);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const {data: recommendList, refetch} = useGetRecommendMakersList(
    page,
    selectStatus,
    selectMakers,
    selectSpots,
  );
  const {mutateAsync: modifyStatus} = useModifyRecommendStatus();

  const modifyStatusButton = async (id, status) => {
    const data = {
      id: id,
      status: status,
    };
    await modifyStatus(data);
  };
  useEffect(() => {
    if (recommendList?.data) {
      setTotalPage(recommendList?.data?.total);
    }
  }, [recommendList?.data]);

  useEffect(() => {
    refetch();
  }, [refetch, page, selectStatus, selectMakers, selectSpots]);
  return (
    <PageWrapper>
      <RecommendFilter />
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
      <Table celled>
        <TableHeader>
          <Table.Row>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스 명</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">주소</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">전화번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">추천 고객사</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">추천 수</Table.HeaderCell>
          </Table.Row>
        </TableHeader>
        <Table.Body>
          {recommendList?.data?.items?.length === 0 ? (
            <Table.Row>
              <Table.Cell textAlign="center" colSpan={6}>
                데이터가 없습니다.
              </Table.Cell>
            </Table.Row>
          ) : (
            recommendList?.data?.items.map((el, idx) => {
              return (
                <Table.Row key={el.id}>
                  <Table.Cell textAlign="center" width={1}>
                    <Dropdown
                      selection
                      defaultValue={
                        recommendMakersStatus.filter(
                          v => v.value === el.status,
                        )[0]?.value
                      }
                      options={recommendMakersStatus}
                      onChange={(e, data) => {
                        modifyStatusButton(el.id, data.value);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>{el.name}</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>{el.address}</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>{el.phone}</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>{el.groupName}</InnerCell>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <InnerCell>{el.count}</InnerCell>
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table>
    </PageWrapper>
  );
};
export default RecommnedMakers;
const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;

const InnerCell = styled.div`
  white-space: nowrap;
`;
