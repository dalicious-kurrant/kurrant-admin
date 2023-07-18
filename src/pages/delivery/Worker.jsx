import {useAddDriver, useDeleteDirver, useGetDriver} from 'hooks/useDelivery';
import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Table} from 'semantic-ui-react';
import styled from 'styled-components';

function Worker() {
  const [checkItems, setCheckItems] = useState([]);
  const {mutateAsync: addDriver} = useAddDriver();
  const {mutateAsync: deleteDriver} = useDeleteDirver();
  const {data: getDriverList} = useGetDriver();
  const {
    register,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    try {
      await addDriver([data]);
      setValue('name', '');
      setValue('code', '');
    } catch (error) {
      alert(error.toString());
    }
  };
  const handleDeleteDriver = async () => {
    try {
      await deleteDriver({idList: checkItems});
      alert('삭제되었습니다.\n아이디 : ' + checkItems.join(', '));
      setCheckItems([]);
    } catch (error) {
      alert(error.toString());
    }
  };
  const handleAllCheck = checked => {
    if (checked) {
      // const idArray = [];
      const idArray = getDriverList?.data.map(v => {
        return v.id;
      });
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
    <Wrap>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AddDeliveryWorker>
          <ButtonWrap>
            <Button type="submit" color="green" inverted>
              추가
            </Button>
          </ButtonWrap>
          <AddTableWrap>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>이름</Table.HeaderCell>
                  <Table.HeaderCell>코드</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <AddInput
                      type="text"
                      id="name"
                      {...register('name', {required: true})}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <AddInput
                      type="text"
                      id="code"
                      {...register('code', {required: true})}
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
            {errors.name && <span>이름을 입력해주세요.</span>}
            {errors.code && (
              <span>8자리 영문 대소문자와 숫자로 된 코드를 입력해주세요.</span>
            )}
          </AddTableWrap>
        </AddDeliveryWorker>
      </form>

      <ContentsTableWrap>
        <Button color="red" inverted onClick={handleDeleteDriver}>
          삭제
        </Button>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>
                <input
                  checked={
                    (getDriverList?.data &&
                      checkItems.length === getDriverList.data.length) ||
                    false
                  }
                  type="checkbox"
                  onChange={e => handleAllCheck(e.target.checked)}
                />
              </Table.HeaderCell>
              <Table.HeaderCell>ID</Table.HeaderCell>
              <Table.HeaderCell>이름</Table.HeaderCell>
              <Table.HeaderCell>코드</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {getDriverList?.data.map(v => {
              return (
                <Table.Row key={v.id}>
                  <Table.Cell>
                    <input
                      checked={checkItems.includes(v.id)}
                      type="checkbox"
                      onChange={e => handleSingleCheck(e.target.checked, v.id)}
                    />
                  </Table.Cell>
                  <Table.Cell>{v.id}</Table.Cell>
                  <Table.Cell>{v.name}</Table.Cell>
                  <Table.Cell>{v.code}</Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </ContentsTableWrap>
    </Wrap>
  );
}

export default Worker;
const Wrap = styled.div`
  display: flex;
  padding-top: 60px;
  padding-right: 120px;
  width: 100%;
  align-items: flex-end;
  flex-direction: column;
`;
const AddDeliveryWorker = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 50px;
`;
const AddTableWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;
const ContentsTableWrap = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
  width: 65%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;
const AddInput = styled.input`
  border: none;
  outline: none;
`;
