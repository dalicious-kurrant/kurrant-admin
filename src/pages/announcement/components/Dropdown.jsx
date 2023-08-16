import styled from 'styled-components';
import {Dropdown} from 'semantic-ui-react';
import {useCompanyList} from 'hooks/useCompany';
import {useEffect} from 'react';

const DropdownBox = ({
  selectType,
  setSelectType,
  selectStatus,
  setSelectStatus,
  selectSpots,
  setSelectSpots,
  editData,
}) => {
  const {data: companyList} = useCompanyList();

  const typeArray = [
    {key: 0, text: '전체 공지', value: 0},
    {key: 1, text: '스팟 공지', value: 1},
    {key: 2, text: '팝업', value: 2},
    {key: 3, text: '이벤트 공지', value: 3},
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
`;
