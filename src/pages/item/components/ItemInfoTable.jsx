import {useAtom} from 'jotai';
import {useNavigate} from 'react-router-dom';
import {Button, Table} from 'semantic-ui-react';
import styled, {css} from 'styled-components';
import {
  makersNameAtom,
  shopInfoDetailIdAtom,
  statusOptionAtom,
} from 'utils/store';
import withCommas from '../../../utils/withCommas';
import Select from 'react-select';
import {useState} from 'react';
import {PageWrapper} from 'style/common.style';
import {foodStatusFomatted} from 'utils/statusFormatter';

const ItemInfoTable = ({
  isShow,
  data,
  setData,
  checked,
  checkItems,
  setCheckItems,
}) => {
  const navigate = useNavigate();
  const [, setId] = useAtom(shopInfoDetailIdAtom);
  const [option, setOption] = useAtom(makersNameAtom);
  const [statusOption, setStatusOption] = useAtom(statusOptionAtom);

  const goToPage = (foodId, makersId) => {
    setId(foodId);
    navigate('/shop/info/' + foodId, {
      state: {
        foodId: foodId,
        makersId: makersId,
      },
    });
  };

  const makersArr = data?.makersInfoList?.map(el => {
    return {
      value: el.makersId,
      label: el.makersName,
    };
  });

  const checkboxList = data?.foodList?.map(el => el.foodId);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      data?.foodList?.forEach(el => idArray.push(el.foodId));

      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems(prev => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter(el => el !== id));
    }
  };

  const statusValue = [
    {value: 0, label: '판매대기'},
    {value: 1, label: '판매중'},
    {value: 2, label: '판매중지'},
  ];

  return (
    <Container isShow={isShow}>
      {/* <BtnWrapper>
        <Button color="blue" content="상태변경 저장" onClick={statusButton} />
      </BtnWrapper> */}
      <div>
        <SelectBox
          placeholder="메이커스별 조회"
          options={makersArr}
          onChange={e => setOption(e.value)}
        />
      </div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell textAlign="center">
              <input
                checked={
                  checkItems?.length === checkboxList?.length ? true : false
                }
                type="checkbox"
                onChange={e => handleAllCheck(e.target.checked)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스ID</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              메이커스 이름
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">식품 이름</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">공급가</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">매장가격</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">멤버십할인률</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">매장할인률</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">이벤트할인률</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">최종가격</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">설명</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">식사태그</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.foodList?.map((el, idx) => {
            const defaultValue = statusValue.filter(
              v => v.label === el.foodStatus,
            );

            return (
              <TableRow
                onClick={() => goToPage(el.foodId, el.makersId)}
                key={idx}>
                <Table.Cell
                  textAlign="center"
                  onClick={e => e.stopPropagation()}>
                  <input
                    checked={checkItems.includes(el.foodId) ? true : false}
                    type="checkbox"
                    onClick={e => checked(e, el.foodId)}
                    onChange={e =>
                      handleSingleCheck(e.target.checked, el.foodId)
                    }
                  />
                </Table.Cell>
                <Table.Cell textAlign="center">{el.foodId}</Table.Cell>
                <Table.Cell textAlign="center">{el.makersId}</Table.Cell>
                <Table.Cell>{el.makersName}</Table.Cell>
                <Table.Cell>
                  <div style={{width: 200}}>{el.foodName}</div>
                </Table.Cell>
                <Table.Cell onClick={e => e.stopPropagation()}>
                  <div style={{whiteSpace: 'nowrap', width: 150}}>
                    <Select
                      options={statusValue}
                      value={defaultValue}
                      onChange={e => {
                        setData({
                          ...data,
                          foodList: data.foodList.map(v => {
                            if (v.foodId === el.foodId)
                              return {
                                ...v,
                                foodStatus: foodStatusFomatted(e.value),
                              };
                            return v;
                          }),
                        });
                        const find = statusOption.findIndex(
                          v => v.foodId === el.foodId,
                        );
                        console.log(find);
                        // find에 같은 id가 있으면 새로운 value로 변경
                        if (find !== -1) {
                          statusOption[find] = {
                            ...statusOption[find],
                            foodStatus: e.value,
                          };
                          setStatusOption([...statusOption]);
                        } else {
                          // 없으면 새로 추가
                          setStatusOption([
                            ...statusOption,
                            {foodId: el.foodId, foodStatus: e.value},
                          ]);
                        }
                      }}
                    />
                  </div>
                  {/* {el.foodStatus} */}
                </Table.Cell>
                <Table.Cell>
                  {withCommas(el.supplyPrice === 0 ? '0' : el.supplyPrice)}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {withCommas(el.defaultPrice)}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {el.membershipDiscount}
                </Table.Cell>
                <Table.Cell textAlign="right">{el.makersDiscount}</Table.Cell>
                <Table.Cell textAlign="right">{el.eventDiscount}</Table.Cell>
                <Table.Cell textAlign="right">
                  {withCommas(el.resultPrice)}
                </Table.Cell>
                <Table.Cell>
                  <div style={{width: 180}}>{el.description}</div>
                </Table.Cell>
                <Table.Cell>
                  <div style={{width: 150}}>
                    {' '}
                    {el.foodTags + (idx !== 0 ? `\u00A0` : '')}
                  </div>
                </Table.Cell>
              </TableRow>
            );
          })}
        </Table.Body>
      </Table>
    </Container>
  );
};

export default ItemInfoTable;

const Container = styled.div`
  ${({isShow}) => {
    if (!isShow) {
      return css`
        display: none;
      `;
    }
  }}
`;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;

const SelectBox = styled(Select)`
  width: 250px;
`;
