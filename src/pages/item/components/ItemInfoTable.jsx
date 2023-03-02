import {useAtom} from 'jotai';
import {useNavigate} from 'react-router-dom';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {shopInfoDetailIdAtom, statusOptionAtom} from 'utils/store';
import withCommas from '../../../utils/withCommas';
import Select from 'react-select';

const ItemInfoTable = ({data, checked, checkItems, setCheckItems}) => {
  const navigate = useNavigate();
  const [, setId] = useAtom(shopInfoDetailIdAtom);
  const [statusOption, setStatusOption] = useAtom(statusOptionAtom);

  const goToPage = (foodId, makersId) => {
    setId(foodId);
    navigate('/shop/info/detail/' + foodId, {
      state: {
        foodId: foodId,
        makersId: makersId,
      },
    });
  };

  const checkboxList = data?.data?.map(el => el.foodId);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      data?.data?.forEach(el => idArray.push(el.foodId));

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
    <div>
      {/* <BtnWrapper>
        <Button color="blue" content="상태변경 저장" onClick={statusButton} />
      </BtnWrapper> */}
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
            <Table.HeaderCell textAlign="center">매장가격</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">매장할인률</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">이벤트할인률</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">최종가격</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 150}}>설명</div>
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              <div style={{width: 150}}>식사태그</div>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.map((el, idx) => {
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
                <Table.Cell>{el.foodName}</Table.Cell>
                <Table.Cell onClick={e => e.stopPropagation()} width={2}>
                  <Select
                    options={statusValue}
                    defaultValue={defaultValue}
                    onChange={e => {
                      const find = statusOption.findIndex(
                        v => v.foodId === el.foodId,
                      );
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
                  {/* {el.foodStatus} */}
                </Table.Cell>
                <Table.Cell textAlign="right">
                  {withCommas(el.defaultPrice)}
                </Table.Cell>
                <Table.Cell textAlign="right">{el.makersDiscount}</Table.Cell>
                <Table.Cell textAlign="right">{el.eventDiscount}</Table.Cell>
                <Table.Cell textAlign="right">
                  {withCommas(el.resultPrice)}
                </Table.Cell>
                <Table.Cell>{el.description}</Table.Cell>
                <Table.Cell>
                  {el.foodTags + (idx !== 0 ? `\u00A0` : '')}
                </Table.Cell>
              </TableRow>
            );
          })}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ItemInfoTable;

const TableRow = styled(Table.Row)`
  :hover {
    cursor: pointer;
    background-color: whitesmoke;
  }
`;
