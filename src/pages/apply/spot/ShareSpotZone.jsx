/* eslint-disable react-hooks/exhaustive-deps */
import {Button, Pagination, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import * as XLSX from 'xlsx';
import {useAtom} from 'jotai';
import {
  MySpotCityAtom,
  MySpotCountyAtom,
  MySpotVillageAtom,
  MySpotZipcodeAtom,
  checkShareListAtom,
  maxUserAtom,
  minUserAtom,
  spotPageAtom,
} from 'utils/store';
import {useGetShareSpotList} from 'hooks/useSpot';
const TableHeaderData = [
  {id: 0, text: '신청시간'},
  {id: 1, text: '기존 주소 여부'},
  {id: 2, text: '주소(도로명)'},
  {id: 3, text: '상세주소'},
  {id: 4, text: '배송시간'},
  {id: 5, text: '외부인 출입 가능 여부'},
  {id: 6, text: '신청 유저 (id)'},
  {id: 7, text: '기타내용'},
];
const ShareSpotZone = () => {
  const [checkItems, setCheckItems] = useAtom(checkShareListAtom);
  const [page, setPage] = useAtom(spotPageAtom);
  
  const [totalPage, setTotalPage] = useState(0);

  const {data: shareSpotData, refetch: spotListRefetch} =
    useGetShareSpotList(page);
  const excelButton = async () => {
    const reqArrays = [];
    reqArrays.push([
      'createdDate',
      'groupId',
      'address1',
      'address2',
      'deliveryTime',
      'entranceOption',
      'userId',
      'memo',
    ]);
    reqArrays.push(TableHeaderData.map(v => v.text));
    shareSpotData?.data?.items.map(el => {
      const reqArray = [];
      reqArray.push(el.createdDate);
      reqArray.push(el.groupId);
      reqArray.push(el.address1);
      reqArray.push(el.address2);
      reqArray.push(el.deliveryTime);
      reqArray.push(el.entranceOption);
      reqArray.push(el.userId);
      reqArray.push(el.memo);
      reqArrays.push(reqArray);
      return reqArrays;
    });
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

    XLSX.utils.book_append_sheet(workbook, worksheet, '공유프라이빗 스팟 신청');
    XLSX.writeFile(workbook, '공유프라이빗 스팟 신청.xlsx');
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      shareSpotData?.data?.items?.forEach(el => idArray.push(el.id));

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  useEffect(() => {
    if (shareSpotData) {
      setTotalPage(shareSpotData?.data?.total);
    }
  }, [shareSpotData, shareSpotData?.data?.total]);

  useEffect(() => {
    spotListRefetch();
  }, [spotListRefetch, page]);
  return (
    <Wrap>
      <Button color="green" content="엑셀 내보내기" onClick={excelButton} />
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
      <div style={{width: '80%', marginTop: 24}}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                textAlign="center"
                onClick={e => {
                  e.stopPropagation();
                  handleAllCheck(e.target.checked);
                }}>
                <input type="checkbox" />
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">신청일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                기존 주소 여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                주소(도로명)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">상세주소</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">배송시간</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                외부인 출입 가능 여부
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                신청 유저 (id)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">기타내용</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {shareSpotData?.data?.items?.length === 0 ? (
              <Table.Row>
                <Table.Cell textAlign="center" colSpan={6}>
                  데이터가 없습니다.
                </Table.Cell>
              </Table.Row>
            ) : (

              shareSpotData?.data?.items.map((el, idx) => {
                return (
                  <Table.Row key={el.id}>
                    <Table.Cell
                      textAlign="center"
                      onClick={e => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={checkItems.includes(el.id) ? true : false}
                        onChange={e =>
                          handleSingleCheck(e.target.checked, el.id)
                        }
                      />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <div style={{whiteSpace: 'nowrap'}}>{el.createdDate}</div>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.groupId ? '있음' : '없음'}
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={4}>
                      <div style={{whiteSpace: 'nowrap'}}>{el.address1}</div>
                    </Table.Cell>
                    <Table.Cell textAlign="center" width={2}>
                      {el.address2}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.deliveryTime}
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      {el.entranceOption ? '가능' : '불가'}
                    </Table.Cell>
                    <Table.Cell textAlign="center">{el.userId}</Table.Cell>
                    <Table.Cell textAlign="center" width={3}>
                      <div style={{whiteSpace: 'nowrap'}}>{el.memo}</div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            )}
          </Table.Body>
        </Table>
      </div>
    </Wrap>
  );
};

export default ShareSpotZone;

const Wrap = styled.div`
  margin-top: 48px;
`;

const PaginationWrap = styled.div`
  display: flex;
  margin-top: 48px;
  justify-content: flex-end;
  width: 80%;
  //justify-content: flex-end;
`;
