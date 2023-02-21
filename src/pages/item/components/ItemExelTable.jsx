import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Table} from 'semantic-ui-react';
import {TableWrapper} from '../../../style/common.style';
import withCommas from '../../../utils/withCommas';

const ItemExelTable = ({data, checked, checkItems, setCheckItems}) => {
  console.log(data, '0-?');
  const navigate = useNavigate();
  const [key, setKey] = useState();

  useEffect(() => {
    if (data) setKey(Object.keys(data[0]));
  }, [data]);

  const goToPage = (foodId, makersId) => {
    navigate('/shop/info/detail/' + foodId, {
      state: {
        foodId: foodId,
        makersId: makersId,
      },
    });
  };

  const checkboxList = data?.map(el => el.foodId);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      data?.forEach(el => idArray.push(el.foodId));

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

  return (
    <TableWrapper>
      <Table celled>
        {data.map((el, i) => {
          const HeaderData = Object.values(el);
          if (i === 0) {
            return (
              <Table.Header key={el.makerName + i}>
                <Table.Row>
                  <Table.HeaderCell>
                    <input
                      checked={
                        checkItems?.length === checkboxList?.length
                          ? true
                          : false
                      }
                      type="checkbox"
                      onChange={e => handleAllCheck(e.target.checked)}
                    />
                  </Table.HeaderCell>
                  {HeaderData.map((h, i) => {
                    return (
                      <Table.HeaderCell key={h + i} textAlign="center">
                        {h}
                      </Table.HeaderCell>
                    );
                  })}
                </Table.Row>
              </Table.Header>
            );
          } else {
            return (
              <Table.Body key={el.makersName + i}>
                <Table.Row>
                  <Table.Cell>
                    <input
                      checked={checkItems.includes(el.foodId) ? true : false}
                      type="checkbox"
                      onClick={e => checked(e, el.foodId)}
                      onChange={e =>
                        handleSingleCheck(e.target.checked, el.foodId)
                      }
                    />
                  </Table.Cell>
                  {key &&
                    key.map((k, i) => {
                      if (k === 'foodId') {
                        return (
                          <Table.Cell key={k + i} textAlign="center">
                            {el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'makersName') {
                        return (
                          <Table.Cell key={k + i} width={2}>
                            {el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'foodName') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'defaultPrice') {
                        return (
                          <Table.Cell key={k + i} textAlign="right">
                            {withCommas(el[k])}
                          </Table.Cell>
                        );
                      }
                      if (k === 'foodStatus') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'makersDiscount') {
                        return (
                          <Table.Cell key={k + i} textAlign="right">
                            {el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'eventDiscount') {
                        return (
                          <Table.Cell key={k + i} textAlign="right">
                            {el[k]}
                          </Table.Cell>
                        );
                      }
                      if (k === 'resultPrice') {
                        return (
                          <Table.Cell key={k + i} textAlign="right">
                            {withCommas(el[k])}
                          </Table.Cell>
                        );
                      }
                      if (k === 'description') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      if (k === 'foodTags') {
                        return <Table.Cell key={k + i}>{el[k]}</Table.Cell>;
                      }
                      return (
                        <Table.Cell key={k + i}>
                          <div>{el[k]}</div>
                        </Table.Cell>
                      );
                    })}
                </Table.Row>
              </Table.Body>
            );
          }
        })}
      </Table>
    </TableWrapper>
  );
};

export default ItemExelTable;
