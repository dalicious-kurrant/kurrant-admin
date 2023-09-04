import styled from 'styled-components';
import Filter from './components/Filter';
import {TableWrapper} from 'style/common.style';
import {Button, Dropdown, Pagination, Table} from 'semantic-ui-react';
import {useEffect, useState} from 'react';
import ModalComponent from './components/Modal';
import {
  useChangeStstusMySpotAdmin,
  useLoadMySpotAdmin,
} from 'hooks/useMySpotAdmin';
import {useAtom} from 'jotai';
import {
  MySpotCityAdminAtom,
  MySpotCountyAdminAtom,
  MySpotNameAdminAtom,
  MySpotStatusAdminAtom,
  MySpotVillageAdminAtom,
  MySpotZipcodeAdminAtom,
  adminCheckListAtom,
  spotPageAdminAtom,
} from 'utils/store';
import {formattedDateType} from 'utils/dateFormatter';

const MySpotZone = () => {
  const [nowData, setNowData] = useState();
  const [page, setPage] = useAtom(spotPageAdminAtom);
  const [totalPage, setTotalPage] = useState(0);
  const [showModifyOpenModal, setShowModifyOpenModal] = useState(false);
  const [checkItems, setCheckItems] = useAtom(adminCheckListAtom);
  const [selectName] = useAtom(MySpotNameAdminAtom);
  const [selectCity] = useAtom(MySpotCityAdminAtom);
  const [selectCounty] = useAtom(MySpotCountyAdminAtom);
  const [selectVillage] = useAtom(MySpotVillageAdminAtom);
  const [selectZipcode] = useAtom(MySpotZipcodeAdminAtom);
  const [selectStatus] = useAtom(MySpotStatusAdminAtom);
  const [changeStatus, setChangeStatus] = useState();
  const [changeDate, setChangeDate] = useState();
  const {mutateAsync: changeStatusData} = useChangeStstusMySpotAdmin();
  const {data: mySpotAdminList, refetch} = useLoadMySpotAdmin(
    page,
    selectName,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
    selectStatus,
  );

  const statusData = [
    {key: 1, text: '오픈', value: 1},
    {key: 2, text: '중지', value: 2},
  ];
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
      mySpotAdminList?.data?.items?.forEach(el => idArray.push(el.id));

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const getStartDate = e => {
    setChangeDate(e.target.value);
  };

  const statusChangeButton = async () => {
    const data = {
      ids: checkItems,
      status: changeStatus,
      startDate: changeDate,
    };

    if (changeStatus === 1 && (changeDate === '' || changeDate === undefined)) {
      alert(`"오픈" 으로 상태 변경 시${`\n`}"날짜" 를 필수로 선택해 주세요`);
    } else if (
      changeStatus === 2 &&
      (changeDate === '' || changeDate === undefined)
    ) {
      alert(`"중지" 으로 상태 변경 시${`\n`}"날짜" 를 필수로 선택해 주세요`);
    } else {
      await changeStatusData(data);
      alert(`정상적으로 변경 됐습니다.`);
      setChangeStatus([]);
      setCheckItems([]);
    }
  };

  useEffect(() => {
    if (mySpotAdminList) {
      setTotalPage(mySpotAdminList?.data?.total);
    }
  }, [mySpotAdminList, mySpotAdminList?.data?.total]);

  useEffect(() => {
    refetch();
  }, [
    refetch,
    page,
    selectName,
    selectCity,
    selectCounty,
    selectVillage,
    selectZipcode,
    selectStatus,
  ]);
  return (
    <Wrap>
      <Filter />
      <ChangeStatusWrap>
        <InputBlock>
          <Dropdown
            placeholder="상태 변경 결과"
            fluid
            selection
            search
            options={statusData}
            value={changeStatus}
            onChange={(e, data) => {
              setChangeStatus(data.value);
            }}
          />
        </InputBlock>
        <DateInput
          type="date"
          //defaultValue={changeDate}
          onChange={e => getStartDate(e)}
        />
        <Button
          content="일괄 상태 변경"
          color="green"
          onClick={statusChangeButton}
        />
      </ChangeStatusWrap>
      <div style={{marginTop: 24}}>
        <TableWrapper>
          <Pagination
            ellipsisItem={null}
            defaultActivePage={page}
            totalPages={totalPage}
            boundaryRange={1}
            onPageChange={(e, data) => {
              setPage(data.activePage);
            }}
          />
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
                <Table.HeaderCell textAlign="center">스팟 ID</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  마이스팟 존 이름
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">시/도</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">시/군/구</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">동/읍/리</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">우편번호</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  오픈 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  중지 날짜
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  식사 타입
                </Table.HeaderCell>

                <Table.HeaderCell textAlign="center">
                  아침 시간
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  점심 시간
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  저녁 시간
                </Table.HeaderCell>
                <Table.HeaderCell textAlign="center">
                  이용자 수
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {mySpotAdminList?.data?.items?.length === 0 ? (
                <Table.Row>
                  <Table.Cell textAlign="center" colSpan={15}>
                    데이터가 없습니다.
                  </Table.Cell>
                </Table.Row>
              ) : (
                mySpotAdminList?.data?.items.map((el, idx) => {
                  const type = el.diningType.map(v => formattedDateType(v));

                  const status =
                    el.status === 0
                      ? '오픈 대기'
                      : el.status === 1
                      ? '오픈'
                      : '중지';

                  return (
                    <Table.Row
                      style={{cursor: 'pointer'}}
                      key={el.id}
                      onClick={() => {
                        setShowModifyOpenModal(true);
                        setNowData(el);
                      }}>
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
                      <Table.Cell textAlign="center">{el.id}</Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.name}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.city}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell> {el.counties.join(',')}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.villages.join(',')}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.zipcodes.join(',')}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{status}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.openDate}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.closeDate}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{type.join(',')}</InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>
                          {el.breakfastDeliveryTime !== null &&
                            el.breakfastDeliveryTime.join(',')}
                        </InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>
                          {el.lunchDeliveryTime !== null &&
                            el.lunchDeliveryTime.join(',')}
                        </InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>
                          {el.dinnerDeliveryTime !== null &&
                            el.dinnerDeliveryTime.join(',')}
                        </InnerCell>
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <InnerCell>{el.userCount}</InnerCell>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              )}
            </Table.Body>
          </Table>
        </TableWrapper>
      </div>
      {showModifyOpenModal && (
        <ModalComponent
          data={nowData}
          title={'마이스팟 존 정보 변경'}
          button={'수정'}
          open={showModifyOpenModal}
          setOpen={setShowModifyOpenModal}
        />
      )}
    </Wrap>
  );
};

export default MySpotZone;

const Wrap = styled.div`
  margin-top: 24px;
`;

const InnerCell = styled.div`
  white-space: nowrap;
`;
const InputBlock = styled.div`
  min-width: 180px;
  font-size: 14px;
  margin-right: 24px;
`;
const DateInput = styled.input`
  padding: 4px;
  width: 200px;
  border-radius: 4px;
  border: 1px solid ${({theme}) => theme.colors.grey[5]};
  margin-right: 24px;
`;

const ChangeStatusWrap = styled.div`
  display: flex;
  margin-top: 12px;
`;
