import {useGetMakersList} from 'hooks/useOrderList';
import {useAtom} from 'jotai';

import {Dropdown} from 'semantic-ui-react';

import styled from 'styled-components';
import {
  noticeMakersFilterAtom,
  noticeMakersPushFilterAtom,
  noticeMakersStatusFilterAtom,
  noticeMakersTypeFilterAtom,
} from 'utils/store';

const NoticeFilter = () => {
  const [selectType, setSelectType] = useAtom(noticeMakersTypeFilterAtom);
  const [selectStatus, setSelectStatus] = useAtom(noticeMakersStatusFilterAtom);
  const [selectMakers, setSelectMakers] = useAtom(noticeMakersFilterAtom);
  const [selectPush, setSelectPush] = useAtom(noticeMakersPushFilterAtom);
  const {data: makersList} = useGetMakersList();

  const typeArray = [
    {key: 0, text: '전체 공지', value: 0},
    {key: 1, text: '메이커스 공지', value: 4},
    {key: 2, text: '정보 변경 승인', value: 6},
    {key: 3, text: '가격 변경 승인', value: 7},
    {key: 4, text: '정산 완료', value: 8},
  ];

  const statusArray = [
    {key: 0, text: '활성', value: true},
    {key: 1, text: '비활성', value: false},
  ];

  const makersArray = makersList?.data?.map((el, idx) => {
    return {
      key: idx,
      text: el.makersName,
      value: el.makersId,
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
          placeholder="메이커스"
          selection
          options={makersArray || []}
          value={selectMakers}
          onChange={(e, data) => {
            setSelectMakers(data.value);
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
