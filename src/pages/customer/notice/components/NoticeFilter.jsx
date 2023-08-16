import {useCompanyList} from 'hooks/useCompany';
import {useGetMakersList} from 'hooks/useOrderList';
import {useAtom} from 'jotai';

import {Dropdown} from 'semantic-ui-react';

import styled from 'styled-components';
import {
  noticeCompanyPushFilterAtom,
  noticeCompanySpotFilterAtom,
  noticeCompanyStatusFilterAtom,
  noticeCompanyTypeFilterAtom,
} from 'utils/store';

const NoticeFilter = () => {
  const [selectType, setSelectType] = useAtom(noticeCompanyTypeFilterAtom);
  const [selectStatus, setSelectStatus] = useAtom(
    noticeCompanyStatusFilterAtom,
  );
  const [selectSpots, setSelectSpots] = useAtom(noticeCompanySpotFilterAtom);
  const [selectPush, setSelectPush] = useAtom(noticeCompanyPushFilterAtom);
  const {data: companyList} = useCompanyList();

  const typeArray = [
    {key: 0, text: '전체 공지', value: 0},
    {key: 1, text: '이벤트', value: 3},
    {key: 2, text: '고객사 공지', value: 5},
    {key: 3, text: '정보 변경 승인', value: 6},
    {key: 4, text: '가격 변경 승인', value: 7},
    {key: 5, text: '정산완료', value: 8},
  ];

  const statusArray = [
    {key: 0, text: '활성', value: true},
    {key: 1, text: '비활성', value: false},
  ];

  const spotArray = companyList?.data?.map((el, idx) => {
    return {
      key: idx,
      text: el.groupName,
      value: el.groupId,
    };
  });

  const pushStaus = [
    {key: 0, text: '전송', value: true},
    {key: 1, text: '미전송', value: false},
  ];
  return (
    <DropdownWrap>
      <DropdownDiv>
        <Dropdown
          placeholder="상태"
          selection
          options={statusArray || []}
          value={selectStatus}
          onChange={(e, data) => setSelectStatus(data.value)}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          placeholder="타입"
          selection
          options={typeArray || []}
          value={selectType}
          onChange={(e, data) => {
            setSelectType(data.value);
          }}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          placeholder="스팟"
          multiple
          selection
          options={spotArray || []}
          value={selectSpots}
          onChange={(e, data) => {
            setSelectSpots(data.value);
          }}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          placeholder="푸시알림 전송여부"
          selection
          options={pushStaus || []}
          value={selectPush}
          onChange={(e, data) => {
            setSelectPush(data.value);
          }}
        />
      </DropdownDiv>
    </DropdownWrap>
  );
};

export default NoticeFilter;

const DropdownWrap = styled.div`
  display: flex;
`;

const DropdownDiv = styled.div`
  margin-right: 12px;
`;
