/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import {Dropdown} from 'semantic-ui-react';
import {useGetMakersList} from 'hooks/useOrderList';
import {useEffect} from 'react';

const DropdownBox = ({
  selectType,
  setSelectType,
  selectStatus,
  setSelectStatus,
  selectMakers,
  setSelectMakers,
  editData,
}) => {
  const {data: makersList} = useGetMakersList();

  const typeArray = [
    {key: 0, text: '전체 공지', value: 0},
    {key: 1, text: '이벤트', value: 3},
    {key: 2, text: '메이커스 공지', value: 4},
    {key: 3, text: '정보 변경 승인', value: 6},
    {key: 4, text: '가격 변경 승인', value: 7},
    {key: 5, text: '정산 완료', value: 8},
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
  useEffect(() => {
    if (editData) {
      const matchedItems = makersArray?.filter(
        item => item.text === editData.makersName,
      );

      setSelectType(editData.boardType);
      setSelectStatus(editData.isStatus);
      setSelectMakers(matchedItems[0]?.value);
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
          placeholder="메이커스"
          search
          options={makersArray || []}
          selection
          value={selectMakers}
          onChange={(e, data) => {
            setSelectMakers(data.value);
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
