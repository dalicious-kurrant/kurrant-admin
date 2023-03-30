import {useEffect, useState} from 'react';
import {Button, Dropdown, Form, Table} from 'semantic-ui-react';
import styled from 'styled-components';
import {FormProvider, useForm} from 'react-hook-form';
import ExcelIcon from '../../asset/icons/excel.svg';
import PDFIcon from '../../asset/icons/pdfIcon.svg';
import AddMakersAdjust from './components/AddMakersAdjust';
import {Link} from 'react-router-dom';
import EditSpotModal from './components/EditSpotModal';
import {
  adjustReverseStatusFomatted,
  adjustStatusFomatted,
  adjustTextStatusFomatted,
} from 'utils/statusFormatter';
import {
  useMakersAdjustList,
  useMakersList,
  useUpdateMakersAdjustStatus,
} from 'hooks/useAdjustment';
import EditMakersModal from './components/EditMakersModal';
const test = [
  {
    id: 0,
    year: 2023,
    month: 7,
    makersName: '모모유부 역삼점',
    accountHolder: '장경태',
    nameOfBank: '신한',
    accountNumber: '110-334-529061',
    paycheckStatus: 0,
  },
  {
    id: 1,
    year: 2023,
    month: 7,
    makersName: '모모유부 강남점',
    accountHolder: '장경태',
    nameOfBank: '신한',
    accountNumber: '110-334-529061',
    paycheckStatus: 0,
  },
];
const statusData = [
  {key: 0, text: '정산 신청 완료', value: 0},
  {key: 1, text: '거래명세서 확정 대기', value: 1},
  {key: 2, text: '정산금 입금 완료', value: 2},
];
const MakersAdjustment = () => {
  const form = useForm();
  const [checkItems, setCheckItems] = useState([]);
  const {data: makersAdjustList} = useMakersAdjustList();
  const {mutateAsync: updateStatus} = useUpdateMakersAdjustStatus();

  const [selectStatus, setSelectStatus] = useState();
  const [showOpenModal, setShowOpenModal] = useState(false);
  const [editId, setEditId] = useState();
  const [clickData, setClickData] = useState();
  const showEditOpen = id => {
    setEditId(id);
    console.log(makersAdjustList?.data);
    const data = makersAdjustList?.data?.filter(v => v.id === id);
    console.log(data);
    setClickData(...data);
    setShowOpenModal(true);
  };
  const handleAllCheck = checked => {
    if (checked) {
      const idArray = [];
      makersAdjustList?.data?.map(el => idArray.push(el.id));
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
      <Title>메이커스 정산 페이지</Title>
      <FormProvider {...form}>
        <AddMakersAdjust />
      </FormProvider>
      <ButtonContainer>
        <DeleteButton onClick={() => {}}>삭제</DeleteButton>
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
            <Table.HeaderCell textAlign="center">메이커스</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">예금주</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">계좌번호</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">상태</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">엑셀</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">PDF</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {makersAdjustList?.data?.map(v => {
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
                  {v?.makersName}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v.accountHolder}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  style={{cursor: 'pointer'}}
                  onClick={e => {
                    e.stopPropagation();
                    showEditOpen(v.id);
                  }}>
                  {v.accountNumber}
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
                        console.log(data.value);
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
        <EditMakersModal
          open={showOpenModal}
          setOpen={setShowOpenModal}
          nowData={clickData}
          setNowData={setClickData}
          testData={makersAdjustList?.data}
        />
      )}
    </MakersAdjustContainer>
  );
};

export default MakersAdjustment;

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
