/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import {Checkbox, Dropdown} from 'semantic-ui-react';
import {useCompanyList} from 'hooks/useCompany';
import {useEffect} from 'react';

const DropdownBox = ({
  selectType,
  setSelectType,
  selectStatus,
  setSelectStatus,
  selectSpots,
  setSelectSpots,
  checkValue,
  setCheckValue,
  editData,
}) => {
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

  const checkboxValue = value => {
    if (checkValue.includes(value)) {
      return setCheckValue(checkValue.filter(el => el !== value));
    }

    setCheckValue([...checkValue, value]);
  };

  useEffect(() => {
    if (editData) {
      function groupIds() {
        const matchedItems = spotArray.filter(item =>
          editData.groupNames?.includes(item.text),
        );
        return matchedItems.map(item => item.value);
      }

      const groupId = groupIds();
      setSelectType(editData.boardType);
      setSelectStatus(editData.isStatus);
      setSelectSpots(groupId);
      setCheckValue(editData.boardOption);
    }
  }, []);

  return (
    <DropdownWrap>
      <DropdownDiv>
        <Dropdown
          placeholder="타입"
          options={typeArray || []}
          selection
          value={selectType}
          onChange={(e, data) => {
            setSelectType(data.value);
          }}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          placeholder="상태"
          options={statusArray || []}
          selection
          value={selectStatus}
          onChange={(e, data) => setSelectStatus(data.value)}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          disabled={selectType === 0}
          placeholder="스팟"
          search
          multiple
          options={spotArray || []}
          selection
          value={selectSpots}
          onChange={(e, data) => {
            setSelectSpots(data.value);
          }}
        />
        <CheckboxWrap>
          <Checkbox
            label="팝업"
            checked={checkValue.includes(1)}
            onChange={(e, data) => checkboxValue(data.value)}
            value={1}
          />
          <Checkbox
            label="이벤트"
            checked={checkValue.includes(2)}
            style={{marginLeft: 12}}
            value={2}
            onChange={(e, data) => checkboxValue(data.value)}
          />
        </CheckboxWrap>
      </DropdownDiv>
    </DropdownWrap>
  );
};

export default DropdownBox;

const DropdownWrap = styled.div`
  display: flex;
  z-index: 999;
`;

const DropdownDiv = styled.div`
  margin-right: 12px;
  display: flex;
`;

const CheckboxWrap = styled.div`
  margin-left: 12px;
  align-items: center;
  display: flex;
`;
