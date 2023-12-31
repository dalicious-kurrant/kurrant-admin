import {useCompanyList} from 'hooks/useCompany';
import {useAtom} from 'jotai';
import {Checkbox, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {
  checkValueAtom,
  noticePushFilterAtom,
  noticeSpotFilterAtom,
  noticeStatusFilterAtom,
  noticeTypeFilterAtom,
} from 'utils/store';

const NoticeFilter = () => {
  const [selectType, setSelectType] = useAtom(noticeTypeFilterAtom);
  const [selectStatus, setSelectStatus] = useAtom(noticeStatusFilterAtom);
  const [selectSpots, setSelectSpots] = useAtom(noticeSpotFilterAtom);
  const [selectPush, setSelectPush] = useAtom(noticePushFilterAtom);
  const [checkBoxValue, checkboxValue] = useAtom(checkValueAtom);
  const {data: companyList} = useCompanyList();
  const typeArray = [
    {key: 0, text: '전체 공지', value: 0},
    {key: 1, text: '스팟 공지', value: 1},
    // {key: 2, text: '팝업', value: 2},
    // {key: 3, text: '이벤트 공지', value: 3},
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

  const checkValue = value => {
    if (checkBoxValue.includes(value)) {
      return checkboxValue(checkBoxValue.filter(el => el !== value));
    }

    checkboxValue([...checkBoxValue, value]);
  };

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
          selection
          multiple
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
      <CheckboxWrap>
        <Checkbox
          label="팝업"
          checked={checkBoxValue.includes(1)}
          onChange={(e, data) => checkValue(data.value)}
          value={1}
        />
        <Checkbox
          label="이벤트"
          style={{marginLeft: 12}}
          checked={checkBoxValue.includes(2)}
          value={2}
          onChange={(e, data) => checkValue(data.value)}
        />
      </CheckboxWrap>
    </DropdownWrap>
  );
};

export default NoticeFilter;

const DropdownWrap = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownDiv = styled.div`
  margin-right: 12px;
`;
const CheckboxWrap = styled.div`
  margin-left: 12px;
  margin-right: 12px;

  display: flex;
`;
