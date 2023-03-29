// import {useState} from 'react';
// import {Button, Checkbox, Dropdown, Table} from 'semantic-ui-react';
// import styled from 'styled-components';
// import {formattedFullDate, formattedWeekDate} from 'utils/dateFormatter';
// import {TableWrapper} from '../../../style/common.style';
// import {
//   foodStatusData,
//   scheduleFormatted,
//   userStatusFormatted,
// } from '../../../utils/statusFormatter';
// import CostomerEditModal from './CustomerEditModal';
// import Select from 'react-select';
// import {useGetSpotList} from 'hooks/useSpot';
// import {useAtom} from 'jotai';
// import {groupIdAtom, uerIdAtom, userIdAtom, userStateAtom} from 'utils/store';

// const ReviewTable = ({
//   testData,
//   setTestData,
//   userCheck,
//   setUserCheck,
//   allChk,
//   setAllChk,
// }) => {
//   const [showOpenModal, setShowOpenModal] = useState(false);
//   const [editId, setEditId] = useState();
//   const [clickData, setClickData] = useState();
//   const [userOption, setUserOption] = useAtom(userStateAtom);
//   const [nameOption, setNameOption] = useAtom(userIdAtom);
//   const [spotOption, setSpotOption] = useAtom(groupIdAtom);
//   const [option, setOption] = useState(testData);
//   const {data: spotList} = useGetSpotList();

//   const showEditOpen = id => {
//     setEditId(id);
//     const data = testData.filter(v => v.id === id);
//     setClickData(...data);
//     setShowOpenModal(true);
//   };

//   const userArr = [
//     {value: 0, label: '탈퇴'},
//     {value: 1, label: '활성'},
//     {value: 2, label: '탈퇴 요청'},
//   ];

//   const userNameArr = testData?.map(el => {
//     return {
//       value: el.id,
//       label: el.userName,
//     };
//   });

//   const set = spotList?.data?.reduce((acc, v) => {
//     return acc.find(x => x.groupId === v.groupId) ? acc : [...acc, v];
//   }, []);

//   const spotArr = set?.map(el => {
//     return {
//       value: el.groupId,
//       label: el.groupName,
//     };
//   });

//   const userFilter = e => {
//     const data = testData.filter(el => el.status === e);

//     setOption(data);
//   };

//   const userNameFilter = e => {
//     const data = testData.filter(el => el.id === e);

//     setOption(data);
//   };

//   const spotFilter = e => {
//     const data = testData.filter(
//       el => el.groupName && el.groupName.split(', ')?.includes(e),
//     );
//     setOption(data);
//   };

//   return (
//     <>
//       <SelectWrap>
//         <SelectBox
//           placeholder="유저 상태"
//           options={userArr}
//           onChange={e => {
//             //userFilter(e.value);
//             setUserOption(e.value.toString());
//           }}
//         />
//         <SelectBox
//           placeholder="유저 이름"
//           options={userNameArr}
//           onChange={e => {
//             //userNameFilter(e.value);
//             setNameOption(e.value);
//           }}
//         />
//         <SelectBox
//           placeholder="스팟 이름"
//           options={spotArr}
//           onChange={e => {
//             //spotFilter(e.label);
//             setSpotOption(e.value);
//           }}
//         />
//         <Button
//           content="필터 초기화"
//           color="blue"
//           onClick={() => window.location.reload()}
//         />
//       </SelectWrap>
//       <TableWrapper>
//         {clickData && (
//           <CostomerEditModal
//             open={showOpenModal}
//             setOpen={setShowOpenModal}
//             nowData={clickData}
//             setNowData={setClickData}
//             testData={testData}
//             setTestData={setTestData}
//           />
//         )}

//         <Table celled selectable>
//           <Table.Header>
//             <Table.Row>
//               <Table.HeaderCell width={1} textAlign="center">
//                 <Checkbox
//                   checked={allChk}
//                   onChange={(e, data) => {
//                     setAllChk(data.checked);

//                     if (data.checked) {
//                       let check = [];
//                       testData.map(v => {
//                         check.push(v.id);
//                       });
//                       setUserCheck(check);
//                     } else {
//                       setUserCheck([]);
//                     }
//                   }}
//                 />
//               </Table.HeaderCell>
//               <Table.HeaderCell>유저 상태</Table.HeaderCell>
//               <Table.HeaderCell>이메일(필수)</Table.HeaderCell>
//               <Table.HeaderCell>비밀번호</Table.HeaderCell>
//               <Table.HeaderCell>사용자 명(필수)</Table.HeaderCell>
//               <Table.HeaderCell>유저 타입</Table.HeaderCell>
//               <Table.HeaderCell>폰 번호</Table.HeaderCell>
//               <Table.HeaderCell textAlign="center">스팟이름</Table.HeaderCell>
//               <Table.HeaderCell>보유 포인트</Table.HeaderCell>
//               <Table.HeaderCell>미식가 타입</Table.HeaderCell>
//               <Table.HeaderCell>맴버십 여부</Table.HeaderCell>
//               <Table.HeaderCell>이메일 동의 여부</Table.HeaderCell>
//               <Table.HeaderCell>이메일 동의/철회 날짜</Table.HeaderCell>
//               <Table.HeaderCell>혜택 및 소식 알림</Table.HeaderCell>
//               <Table.HeaderCell>주문 알림</Table.HeaderCell>
//               <Table.HeaderCell>마지막 로그인 날짜</Table.HeaderCell>
//               <Table.HeaderCell>생성일</Table.HeaderCell>
//               <Table.HeaderCell>수정일</Table.HeaderCell>
//               <Table.HeaderCell>일반기업_이메일</Table.HeaderCell>
//               <Table.HeaderCell>카카오_이메일</Table.HeaderCell>
//               <Table.HeaderCell>네이버_이메일</Table.HeaderCell>
//               <Table.HeaderCell>페이스북_이메일</Table.HeaderCell>
//               <Table.HeaderCell>애플_이메일</Table.HeaderCell>
//               {/* <Table.HeaderCell>음식 상태</Table.HeaderCell> */}
//             </Table.Row>
//           </Table.Header>

//           <Table.Body>
//             {testData?.length > 0 &&
//               testData?.map((row, i) => {
//                 return (
//                   <Table.Row
//                     style={{
//                       cursor: 'pointer',
//                     }}
//                     key={`${row.email}`}
//                     onClick={e => {
//                       e.stopPropagation();
//                       showEditOpen(row.id);
//                     }}>
//                     <Table.Cell
//                       style={{cursor: 'auto'}}
//                       onClick={e => {
//                         e.stopPropagation();
//                       }}>
//                       <FlexBox>
//                         <Checkbox
//                           checked={userCheck.includes(row.id) || allChk}
//                           onChange={(e, data) => {
//                             if (data.checked) {
//                               setUserCheck([...userCheck, row.id]);
//                             } else {
//                               setUserCheck(userCheck.filter(v => v !== row.id));
//                             }
//                           }}
//                         />
//                       </FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{userStatusFormatted(row.status)}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.email}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexPwdBox>{row.password}</FlexPwdBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.userName}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.role}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.phone}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.groupName}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.point}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.gourmetType}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.isMembership ? 'O' : 'X'}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.marketingAlarm ? 'O' : 'X'}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>
//                         {row.marketingAgreedDateTime
//                           ? formattedWeekDate(row.marketingAgreedDateTime)
//                           : '-'}
//                       </FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.marketingAgreed}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.userOrderAlarm}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>
//                         {row.recentLoginDateTime
//                           ? formattedFullDate(row.recentLoginDateTime)
//                           : '-'}
//                       </FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>
//                         {row.userCreatedDateTime
//                           ? formattedFullDate(row.userCreatedDateTime)
//                           : '-'}
//                       </FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>
//                         {row.userUpdatedDateTime
//                           ? formattedFullDate(row.userUpdatedDateTime)
//                           : '-'}
//                       </FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.generalEmail || '-'}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.kakaoEmail || '-'}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.naverEmail || '-'}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.facebookEmail || '-'}</FlexBox>
//                     </Table.Cell>
//                     <Table.Cell>
//                       <FlexBox>{row.appleEmail || '-'}</FlexBox>
//                     </Table.Cell>
//                   </Table.Row>
//                 );
//               })}
//           </Table.Body>
//         </Table>
//       </TableWrapper>
//     </>
//   );
// };

// export default ReviewTable;

// const FlexBox = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   white-space: nowrap;
// `;
// const FlexPwdBox = styled.div`
//   width: 100px;
//   overflow: hidden;
//   text-overflow: ellipsis;
// `;
// const DropdownBox = styled.div`
//   width: 150px;
// `;

// const SelectWrap = styled.div`
//   display: flex;
//   margin-bottom: 24px;
// `;

// const SelectBox = styled(Select)`
//   width: 250px;
//   margin-right: 50px;
// `;
