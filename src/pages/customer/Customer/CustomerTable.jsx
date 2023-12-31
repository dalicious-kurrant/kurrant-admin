import {useState} from 'react';
import {Button, Checkbox, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedFullDate, formattedWeekDate} from 'utils/dateFormatter';
import {TableWrapper} from '../../../style/common.style';
import {
  userStatusFormatted,
} from '../../../utils/statusFormatter';
import CostomerEditModal from './CustomerEditModal';
import Select from 'react-select';
import {useAtom} from 'jotai';
import {groupIdAtom, userIdAtom, userStateAtom} from 'utils/store';
import CustomerPoint from './CustomerPoint';
import { useAllUserExport, useAllUserList, useGetGroupAllList } from 'hooks/useOrderList';

const CustomerTable = ({
  testData,
  setTestData,
  userCheck,
  setUserCheck,
  allChk,
  setPage,
  setAllChk,
}) => {
  const [pointOpenModal, setPointOpenModal] = useState(false);
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [, setEditId] = useState();
  const [clickData, setClickData] = useState();
  const [, setUserOption] = useAtom(userStateAtom);
  const [, setNameOption] = useAtom(userIdAtom);
  const [, setSpotOption] = useAtom(groupIdAtom);
  const {data: allUserList} = useAllUserList();
  const { refetch:refetchExport ,isFetching:loadingExport} = useAllUserExport();
  const {data: groupAllList} = useGetGroupAllList();
  // const {data: spotList} = useGetSpotList();

  const showEditOpen = id => {
    setEditId(id);
    const data = testData.filter(v => v.id === id);
    setClickData(...data);
    setShowOpenModal(true);
  };
  const handleAllUserExport = async()=>{
    refetchExport();
  }
  const userArr = [
    {value: 0, label: '탈퇴'},
    {value: 1, label: '활성'},
    {value: 2, label: '탈퇴 요청'},
  ];

  const userNameArr = allUserList?.data?.map(el => {
    return {
      value: el.id,
      label: el.name,
    };
  });



  const spotArr = groupAllList?.data?.groups?.map(el => {
    return {
      value: el.groupId,
      label: el.groupName,
    };
  });

  const pointModal = () => {
    if (userCheck.length !== 0) {
      setPointOpenModal(true);
    }
  };

  return (
    <>
      <SelectWrap>
        <SelectBox
          placeholder="유저 상태"
          options={userArr}
          onChange={e => {
            //userFilter(e.value);

            // console.log('커스터머 테이블');
            // console.log(e);

            setUserOption(e.value.toString());
          }}
        />
        <SelectBox
          placeholder="유저 이름"
          options={userNameArr}
          onChange={e => {
            //userNameFilter(e.value);
            setPage(1)
            setNameOption(e.value);
          }}
        />
        <SelectBox
          placeholder="스팟 이름"
          options={spotArr}
          onChange={e => {
            //spotFilter(e.label);
            setPage(1)
            setSpotOption(e.value);
          }}
        />
        <Button
          content="필터 초기화"
          color="blue"
          onClick={() => window.location.reload()}
        />
        <Button
          content="포인트 관리"
          color="green"
          onClick={() => {
            pointModal();
          }}
        />
        <Button
          content="전체 유저 내보내기"
          color={loadingExport ? "grey" : "linkedin"}
          disabled={loadingExport}
          onClick={handleAllUserExport}
        />
      </SelectWrap>
      <TableWrapper>
        {clickData && (
          <CostomerEditModal
            open={showOpenModal}
            setOpen={setShowOpenModal}
            nowData={clickData}
            setNowData={setClickData}
            testData={testData}
            setTestData={setTestData}
          />
        )}

        <Table celled selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} textAlign="center">
                <Checkbox
                  checked={allChk}
                  onChange={(e, data) => {
                    setAllChk(data.checked);

                    if (data.checked) {
                      let check = [];
                      testData.map(v => {
                        check.push(v.id);
                        return undefined
                      });
                      setUserCheck(check);
                    } else {
                      setUserCheck([]);
                    }
                  }}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>유저 상태</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                이메일(필수)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                결제비밀번호
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">비밀번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                사용자 명(필수)
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">닉네임</Table.HeaderCell>
              <Table.HeaderCell>유저 타입</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">폰 번호</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">스팟이름</Table.HeaderCell>
              <Table.HeaderCell>보유 포인트</Table.HeaderCell>
              <Table.HeaderCell>미식가 타입</Table.HeaderCell>
              <Table.HeaderCell>맴버십 여부</Table.HeaderCell>
              <Table.HeaderCell>이메일 동의 여부</Table.HeaderCell>
              <Table.HeaderCell>이메일 동의/철회 날짜</Table.HeaderCell>
              <Table.HeaderCell>혜택 및 소식 알림</Table.HeaderCell>
              <Table.HeaderCell>주문 알림</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                마지막 로그인 날짜
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">생성일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">수정일</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                일반기업_이메일
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                구글_이메일
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                카카오_이메일
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                네이버_이메일
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                페이스북_이메일
              </Table.HeaderCell>
              <Table.HeaderCell textAlign="center">
                애플_이메일
              </Table.HeaderCell>
              {/* <Table.HeaderCell>음식 상태</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {testData?.length > 0 &&
              testData?.map((row, i) => {
                return (
                  <Table.Row
                    style={{
                      cursor: 'pointer',
                    }}
                    key={`${row.email}`}
                    onClick={e => {
                      e.stopPropagation();
                      showEditOpen(row.id);
                    }}>
                    <Table.Cell
                      style={{cursor: 'auto'}}
                      onClick={e => {
                        e.stopPropagation();
                      }}>
                      <FlexBox>
                        <Checkbox
                          checked={userCheck.includes(row.id) || allChk}
                          onChange={(e, data) => {
                            if (data.checked) {
                              setUserCheck([...userCheck, row.id]);
                            } else {
                              setUserCheck(userCheck.filter(v => v !== row.id));
                            }
                          }}
                        />
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{userStatusFormatted(row.status)}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.email}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexPwdBox>{row.paymentPassword}</FlexPwdBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexPwdBox>{row.password}</FlexPwdBox>
                    </Table.Cell>

                    <Table.Cell>
                      <FlexBox>{row.userName}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.nickname}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.role}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.phone}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox style={{justifyContent: 'flex-start'}}>
                        {row.groupName}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.point}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.gourmetType}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.isMembership ? 'O' : 'X'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.marketingAlarm ? 'O' : 'X'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.marketingAgreedDateTime
                          ? formattedWeekDate(row.marketingAgreedDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.marketingAgreed}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.userOrderAlarm}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.recentLoginDateTime
                          ? formattedFullDate(row.recentLoginDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.userCreatedDateTime
                          ? formattedFullDate(row.userCreatedDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>
                        {row.userUpdatedDateTime
                          ? formattedFullDate(row.userUpdatedDateTime)
                          : '-'}
                      </FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.generalEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.googleEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.kakaoEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.naverEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.facebookEmail || '-'}</FlexBox>
                    </Table.Cell>
                    <Table.Cell>
                      <FlexBox>{row.appleEmail || '-'}</FlexBox>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
          </Table.Body>
        </Table>
      </TableWrapper>
      {pointOpenModal && (
        <CustomerPoint
          open={pointOpenModal}
          setOpen={setPointOpenModal}
          userCheck={userCheck}
        />
      )}
    </>
  );
};

export default CustomerTable;

const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
`;
const FlexPwdBox = styled.div`
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SelectWrap = styled.div`
  display: flex;
  margin-bottom: 24px;
`;

const SelectBox = styled(Select)`
  width: 250px;
  margin-right: 50px;
`;
