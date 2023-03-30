import {useEffect, useState} from 'react';
import {Button, Dropdown, Form} from 'semantic-ui-react';
import styled from 'styled-components';
import {useForm, useFormContext} from 'react-hook-form';
import ExcelIcon from '../../../asset/icons/excel.svg';
import PDFIcon from '../../../asset/icons/pdfIcon.svg';
import FileIcon from '../../../asset/icons/fileIcon.svg';
import {useSaveSpotsAdjust, useSpotsList} from 'hooks/useAdjustment';

const statusData = [
  {key: 0, text: '정산 신청 완료', value: 0},
  {key: 1, text: '거래명세서 확정 대기', value: 1},
  {key: 2, text: '정산금 입금 완료', value: 2},
];
const AddSpotAdjust = () => {
  const {register, handleSubmit, watch, resetField} = useFormContext();
  const {mutateAsync: saveSpotsAdjust} = useSaveSpotsAdjust();
  const {data: spotsList} = useSpotsList();
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [selectClient, setSelectClient] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const onSubmit = async datas => {
    const formData = new FormData();

    formData.append(
      'corporationXlsx',
      datas.corporationXlsx?.length > 0 && datas.corporationXlsx[0],
    );

    formData.append(
      'corporationPdf',
      datas.corporationPdf?.length > 0 && datas.corporationPdf[0],
    );

    const data = {
      year: Number(datas.month.split('-')[0]),
      month: Number(datas.month.split('-')[1]),
      corporationId: Number(selectClient),
      managerName: datas.managerName,
      phone: datas.phone,
      paycheckStatus: Number(selectStatus),
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], {type: 'application/json'});
    formData.append('paycheckDto', blob);
    for (let value of formData.values()) {
      console.log(value);
    }
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    setSelectClient(null);
    setSelectStatus(null);
    resetField('corporationXlsx');
    resetField('corporationPdf');
    resetField('managerName');
    resetField('phone');
    resetField('month');
    await saveSpotsAdjust(formData, config);
  };

  if (watch('makersXlsx')?.length > 0)
    console.log(watch('makersXlsx')[0]?.name);
  useEffect(() => {
    setGroupInfoList(
      spotsList?.data.map(v => {
        return {key: v.groupId, text: v.groupName, value: v.groupId};
      }),
    );
  }, [spotsList]);
  return (
    <UploadButton>
      <AddAdjustment onSubmit={handleSubmit(onSubmit)}>
        <InputBlock>
          {/* <InputLabel htmlFor="adjustMonth">월</InputLabel> */}
          <InputBox {...register('month')} placeholder="월" type="month" />
        </InputBlock>
        <InputBlock>
          {groupInfoList?.length > 0 && (
            <Dropdown
              placeholder="고객사 이름"
              fluid
              selection
              search
              options={groupInfoList}
              value={selectClient}
              onChange={(e, data) => {
                setSelectClient(data.value);
              }}
            />
          )}
        </InputBlock>
        <InputBlock>
          {/* <InputLabel htmlFor="managerName"></InputLabel> */}
          <InputBox
            {...register('managerName')}
            placeholder="담당자"
            type="text"
          />
        </InputBlock>
        <InputBlock>
          {/* <InputLabel htmlFor="nameOfPhone"></InputLabel> */}
          <InputBox {...register('phone')} placeholder="전화번호" type="text" />
        </InputBlock>
        <InputBlock>
          <Dropdown
            placeholder="상태"
            fluid
            selection
            search
            style={{fontSize: 13}}
            options={statusData}
            value={selectStatus}
            onChange={(e, data) => {
              setSelectStatus(data.value);
            }}
          />
        </InputBlock>
        <FileContainer>
          {watch('corporationXlsx')?.length > 0 && (
            <DelButton
              onClick={e => {
                resetField('corporationXlsx');
              }}>
              x
            </DelButton>
          )}
          <InputFileBlock>
            <InputLabel htmlFor="corporationXlsx">
              {watch('corporationXlsx')?.length > 0 ? (
                <InputImage alt="ExcelIcon" src={ExcelIcon} />
              ) : (
                <AddButton>엑셀 올리기</AddButton>
              )}
            </InputLabel>
            <InputBoxFile
              id="corporationXlsx"
              {...register('corporationXlsx')}
              type="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
          </InputFileBlock>
        </FileContainer>
        <FileContainer>
          {watch('corporationPdf')?.length > 0 && (
            <DelButton
              onClick={e => {
                resetField('corporationPdf');
              }}>
              x
            </DelButton>
          )}
          <InputFileBlock>
            <InputLabel htmlFor="corporationPdf">
              {watch('corporationPdf')?.length > 0 ? (
                <InputImage alt="PdfIcon" src={PDFIcon} />
              ) : (
                <AddButton>PDF 올리기</AddButton>
              )}
            </InputLabel>
            <InputBoxFile
              id="corporationPdf"
              {...register('corporationPdf')}
              type="file"
              accept="application/pdf"
            />
          </InputFileBlock>
        </FileContainer>
        <AddListButton type="submit">리스트 추가</AddListButton>
      </AddAdjustment>
    </UploadButton>
  );
};

export default AddSpotAdjust;

const UploadButton = styled.div`
  display: flex;
  padding: 20px;
  border: 1px solid black;
  border-radius: 15px;
  min-width: max-content;
  background-color: aliceblue;
`;
const InputBox = styled.input`
  display: flex;
  padding-top: 9px;
  padding-bottom: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: end;
  padding-right: 8px;
  width: 100%;
`;
const InputSelect = styled.select`
  display: flex;
  font-size: 13px;
  height: 35px;
  padding: 3px;
`;
const InputBoxFile = styled.input`
  display: none;
`;
const InputBlock = styled.div`
  min-width: 160px;
  font-size: 13px;
`;
const InputImage = styled.img`
  width: 30px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;
const InputLabel = styled.label`
  /* background-color: blanchedalmond; */
  font-size: 15px;
`;
const InputExcel = styled.div`
  justify-content: center;
  font-size: 13px;
  align-items: center;
`;
const FileContainer = styled.div`
  display: flex;
  position: relative;
`;
const AddButton = styled.div`
  display: flex;
  cursor: pointer;
  background-color: #4472c4;
  color: white;
  border-radius: 10px;
  font-size: 13px;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
`;
const InputFileBlock = styled.div`
  display: flex;
  justify-content: center;
  min-width: 80px;
  align-items: center;
`;
const DelButton = styled.div`
  border-radius: 50px;
  position: absolute;
  cursor: pointer;
  color: white;
  padding: 1px;
  padding-left: 5px;
  padding-right: 5px;
  background-color: gray;
  right: 0px;
`;
const AddListButton = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 15px;
  align-self: center;
  background-color: grey;
  white-space: nowrap;
  color: white;
  text-align: center;
  margin-left: 20px;
  font-size: 14px;
  font-weight: 600;
`;
const AddAdjustment = styled.form`
  display: flex;
  gap: 10px;
`;
