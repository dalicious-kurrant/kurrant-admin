import useModal from '../../hooks/useModal';
import React, {useState} from 'react';
import {Button, Table, Checkbox} from 'semantic-ui-react';
import {PageWrapper, BtnWrapper, TableWrapper} from '../../style/common.style';
import SelectBox from '../../components/selectBox/SelectBox';
import styled from 'styled-components';
import {formattedWeekDate} from '../../utils/dateFormatter';

// 주문 정보 페이지
const Order = () => {
  const {onActive} = useModal();
  const day = new Date();
  const days = formattedWeekDate(day);
  const [date, setDate] = useState(days);
  const [selecteOption, setSelecteOption] = useState('');
  const [selecteOption2, setSelecteOption2] = useState('');
  const [selecteOption3, setSelecteOption3] = useState('');
  const test = [
    {
      id: 1,
      text: '고객사1',
    },
    {
      id: 2,
      text: '고객사2',
    },
  ];
  return (
    <PageWrapper>
      <div>
        <input type="date" defaultValue={date} />
        <span>~</span>
        <input type="date" defaultValue={date} />
      </div>
      <SelectBoxWrapper>
        <SelectBoxWrap>
          <SelectBox
            options={test}
            selectedOption={selecteOption}
            setSelectedOption={setSelecteOption}
            width={200}
            labelName="고객사"
            defualtValue="고객사 선택"
          />
        </SelectBoxWrap>
        {/* <SelectBoxWrap>
          <SelectBox
            options={['스팟1', '스팟2']}
            selectedOption={selecteOption2}
            setSelectedOption={setSelecteOption2}
            width={200}
            labelName="스팟"
            defualtValue="스팟 선택"
          />
        </SelectBoxWrap>
        <SelectBoxWrap>
          <SelectBox
            options={['메이커스1', '메이커스2']}
            selectedOption={selecteOption3}
            setSelectedOption={setSelecteOption3}
            width={200}
            labelName="메이커스"
            defualtValue="메이커스 선택"
          />
        </SelectBoxWrap> */}
      </SelectBoxWrapper>

      <BtnWrapper>
        <Button color="red" content="삭제" icon="delete" onClick={onActive} />
      </BtnWrapper>
      <TableWrapper>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={1} textAlign="center">
                <Checkbox />
              </Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>그룹 ID</Table.HeaderCell>
              <Table.HeaderCell>그룹 이름</Table.HeaderCell>
              <Table.HeaderCell>스팟 ID</Table.HeaderCell>
              <Table.HeaderCell>스팟 이름</Table.HeaderCell>
              <Table.HeaderCell>유저 이름</Table.HeaderCell>
              <Table.HeaderCell>유저 ID</Table.HeaderCell>
              <Table.HeaderCell>유저 전화번호</Table.HeaderCell>
              <Table.HeaderCell>식사타입</Table.HeaderCell>
              <Table.HeaderCell>배송시간</Table.HeaderCell>
              <Table.HeaderCell>메이커스 이름</Table.HeaderCell>
              <Table.HeaderCell>상품 이름</Table.HeaderCell>
              <Table.HeaderCell>수량</Table.HeaderCell>
              <Table.HeaderCell>오더아이템 번호</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            <Table.Row>
              <Table.Cell textAlign="center">
                <Checkbox />
              </Table.Cell>
              <Table.Cell>13</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
              <Table.Cell>Unknown</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </TableWrapper>
    </PageWrapper>
  );
};

export default Order;

const SelectBoxWrap = styled.div`
  margin: 30px 0px;
`;

const SelectBoxWrapper = styled.div`
  display: flex;
`;
