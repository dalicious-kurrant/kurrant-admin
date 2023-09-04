import {useEffect, useState} from 'react';
import {Button, Dropdown, Pagination, Table} from 'semantic-ui-react';
import {PageWrapper} from 'style/common.style';
import styled from 'styled-components';
import ModalComponent from './components/Modal';
import {registerMakersStatusData} from 'utils/statusFormatter';
import {
  useApplyMakersList,
  useDeleteApplyMakers,
  useModifyStatus,
} from 'hooks/useApplyMakers';

const RegisterMakers = () => {
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [checkItems, setCheckItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const {data: makersList} = useApplyMakersList(page);
  const {mutateAsync: modifyStatsu} = useModifyStatus();
  const {mutateAsync: deleteApplyMakers} = useDeleteApplyMakers();

  const list = makersList?.data?.items;

  const checkboxList = list?.map(el => el.id);

  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      list?.forEach(el => idArray.push(el.id));

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

  const modifyStatusButton = async (id, status) => {
    await modifyStatsu({id: id, status: status});
  };

  const deleteApplyMakersButton = async () => {
    await deleteApplyMakers({ids: checkItems});
  };

  useEffect(() => {
    if (makersList?.data) {
      setTotalPage(makersList?.data?.total);
    }
  }, [makersList?.data]);

  return (
    <PageWrapper style={{width: '80%'}}>
      <ButtonWrap>
        <Button
          content="추가"
          inverted
          color="green"
          size="small"
          onClick={() => {
            setShowOpenModal(true);
          }}
        />
        <Button
          content="삭제"
          inverted
          color="red"
          size="small"
          onClick={() => {
            if (checkItems.length !== 0) {
              if (window.confirm('정말로 삭제하시겠어요?'))
                deleteApplyMakersButton();
            } else {
              alert('삭제할 데이터를 선택해주세요');
            }
          }}
        />
      </ButtonWrap>
      <PaginationWrap>
        <Pagination
          ellipsisItem={null}
          defaultActivePage={page}
          totalPages={totalPage}
          boundaryRange={1}
          onPageChange={(e, data) => {
            setPage(data.activePage);
          }}
        />
      </PaginationWrap>
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
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메이커스명</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">주소</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메인 상품</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">이름</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">전화번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">메모</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {list?.length !== 0 ? (
            list?.map((el, idx) => {
              return (
                <Table.Row key={idx}>
                  <Table.Cell textAlign="center">
                    <input
                      type="checkbox"
                      checked={checkItems.includes(el.id) ? true : false}
                      onChange={e => handleSingleCheck(e.target.checked, el.id)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center" width={2}>
                    <Dropdown
                      placeholder="상태"
                      fluid
                      selection
                      value={el.progressStatus}
                      options={registerMakersStatusData}
                      onChange={(e, data) => {
                        modifyStatusButton(el.id, data.value);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.makersName}</Table.Cell>
                  <Table.Cell textAlign="center" width={4}>
                    {el.address}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.mainProduct}</Table.Cell>
                  <Table.Cell textAlign="center" width={2}>
                    {el.name}
                  </Table.Cell>
                  <Table.Cell textAlign="center">{el.phone}</Table.Cell>
                  <Table.Cell textAlign="center">{el.memo}</Table.Cell>
                </Table.Row>
              );
            })
          ) : (
            <Table.Row>
              <Table.Cell colspan={8} textAlign="center">
                내용이 없습니다.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
      {showOpenModal && (
        <ModalComponent open={showOpenModal} setOpen={setShowOpenModal} />
      )}
    </PageWrapper>
  );
};

export default RegisterMakers;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const PaginationWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 24px;
`;
