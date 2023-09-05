import {useState} from 'react';
import {Dropdown, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {FormProvider, useForm} from 'react-hook-form';
import ExcelIcon from '../../asset/icons/excel.svg';
import PDFIcon from '../../asset/icons/pdfIcon.svg';
import {Link} from 'react-router-dom';
import AddSpotAdjust from './components/AddSpotAdjust';
import {
  useDeleteSpotsAdjust,
  useSpotsAdjustList,
  useUpdateSpotsAdjustStatus,
} from 'hooks/useAdjustment';
import EditSpotModal from './components/EditSpotModal';
import {adjustReverseStatusFomatted} from 'utils/statusFormatter';
import {useConfirm} from 'hooks/useConfirm';
const statusData = [
  {key: 0, text: '정산 신청 완료', value: 0},
  {key: 1, text: '거래명세서 확정 대기', value: 1},
  {key: 2, text: '정산금 입금 완료', value: 2},
];

const SpotAdjustment = () => {
  const forms = useForm();
  const [checkItems, setCheckItems] = useState([]);
  const {data: spotsAdjustList} = useSpotsAdjustList();
  const {mutateAsync: updateStatus} = useUpdateSpotsAdjustStatus();
  const confirmDelete = useConfirm(
    '삭제하시겠습니까?',
    async () => await deleteAdjustSpot({data: checkItems}),
    () => {},
  );
  const {mutateAsync: deleteAdjustSpot} = useDeleteSpotsAdjust();
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [, setEditId] = useState();
  const [clickData, setClickData] = useState();
  const showEditOpen = id => {
    setEditId(id);
    console.log(spotsAdjustList?.data);
    const data = spotsAdjustList?.data?.filter(v => v.id === id);
    console.log(data);
    setClickData(...data);
    setShowOpenModal(true);
  };
  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      spotsAdjustList?.data?.map(el => idArray.push(el.id));
      console.log(idArray);

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
    <MakersAdjustContainer>
      <Title>고객사 정산 페이지</Title>
      <FormProvider {...forms}>
        <AddSpotAdjust />
      </FormProvider>
      <ButtonContainer>
        <DeleteButton onClick={confirmDelete}>삭제</DeleteButton>
      </ButtonContainer>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1} textAlign="center">
              <input
                type="checkbox"
                onChange={e => handleAllCheck(e.target.checked)}
              />
            </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">년도</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">월</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">스팟(고객사)</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">담당자</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">전화번호 </Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {spotsAdjustList?.data?.map(v => {
            return (
              <Table.Row key={v.id}>
                <Table.Cell width={1} textAlign="center">
                  <input
                    checked={checkItems.includes(v.id) ? true : false}
                    type="checkbox"
                    onChange={e => handleSingleCheck(e.target.checked, v.id)}
                  />
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v?.year}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v?.month}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v?.corporationName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v.managerName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v.phone}
                </Table.Cell>
                <Table.Cell textAlign="center" style={{maxWidth: 130}}>
                  <InputBlock>
                    <Dropdown
                      placeholder="상태"
                      fluid
                      selection
                      search
                      options={statusData}
                      value={adjustReverseStatusFomatted(v.paycheckStatus)}
                      onChange={async (e, data) => {
                        await updateStatus({
                          id: data.value,
                          status: [v.id],
                        });
                      }}
                    />
                  </InputBlock>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.excelFile ? (
                    <Link to={v.excelFile}>
                      <InputImage alt="ExcelIcon" src={ExcelIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  {v.pdfFile ? (
                    <Link to={v.pdfFile}>
                      <InputImage alt="PDFIcon" src={PDFIcon} />
                    </Link>
                  ) : (
                    '-'
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table>
      {clickData && (
        <EditSpotModal
          open={showOpenModal}
          setOpen={setShowOpenModal}
          nowData={clickData}
          setNowData={setClickData}
          testData={spotsAdjustList?.data}
        />
      )}
    </MakersAdjustContainer>
  );
};

export default SpotAdjustment;

const MakersAdjustContainer = styled.div`
  max-width: 1300px;
  margin: 0px auto;
  padding-bottom: 100px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding-bottom: 20px;
  margin-top: 24px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;
`;
const DeleteButton = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
  width: 80px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  font-weight: 600;
  border-radius: 10px;
`;
const InputImage = styled.img`
  width: 40px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;
const InputBlock = styled.div`
  max-width: 180px;
  font-size: 14px;
`;
