import {useUpdateSpotsAdjust} from 'hooks/useAdjustment';
import React, {useRef, useState} from 'react';
import {
  Button,
  Form,
  Modal,
  Input,
  Label,
  Dropdown,
} from 'semantic-ui-react';
import styled from 'styled-components';

import ExcelIcon from '../../../asset/icons/excel.svg';
import PDFIcon from '../../../asset/icons/pdfIcon.svg';
import {adjustTextStatusFomatted} from 'utils/statusFormatter';
const statusData = [
  {key: 0, text: '정산 신청 완료', value: '정산 신청 완료'},
  {key: 1, text: '거래명세서 확정 대기', value: '거래명세서 확정 대기'},
  {key: 2, text: '정산금 입금 완료', value: '정산금 입금 완료'},
];

function EditSpotModal({open, setOpen, nowData, setNowData}) {
  const [xlsx, setXlsx] = useState(nowData.excelFile);
  const [pdf, setPdf] = useState(nowData.pdfFile);
  const {mutateAsync: updateSpotsAdjust} = useUpdateSpotsAdjust();
  const pdfRef = useRef();
  const excelRef = useRef();
  console.log(nowData);
  const onSubmit = async () => {
    const formData = new FormData();
    console.log(xlsx, 'xlsx');
    console.log(pdf, 'pdf');
    formData.append('corporationXlsx', xlsx && xlsx);
    formData.append('corporationPdf', pdf && pdf);

    // formData.append(
    //   'makersPdf',
    //   datas.makersPdf?.length > 0 && datas.makersPdf[0],
    // );

    const json = JSON.stringify(nowData);
    const blob = new Blob([json], {type: 'application/json'});
    formData.append('paycheckDto', blob);
    for (let value of formData.values()) {
      console.log(value);
    }
    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    await updateSpotsAdjust(formData, config);
    setOpen(false);
  };
  return (
    <Form onSubmit={onSubmit}>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>고객사 정산 정보 변경</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label>년도</Label>
                  <Input
                    placeholder="년도"
                    defaultValue={nowData.year}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        year: data.value ? data.value : 2023,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label>월</Label>
                  <Input
                    placeholder="월"
                    defaultValue={nowData.month}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        month: data.value ? data.value : 1,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label>스팟(고객사) 이름</Label>
                  <Input
                    placeholder="스팟(고객사) 이름"
                    defaultValue={nowData.corporationName}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        corporationName: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label>담당자</Label>
                  <Input
                    placeholder="담당자"
                    defaultValue={nowData.managerName}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        managerName: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label>전화번호</Label>
                  <Input
                    placeholder="전화번호"
                    defaultValue={nowData.phone}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        phone: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label>정산 상태</Label>
                  <Dropdown
                    placeholder="정산 상태"
                    fluid
                    selection
                    search
                    defaultValue={adjustTextStatusFomatted(
                      nowData.paycheckStatus,
                    )}
                    options={statusData}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        paycheckStatus: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>

            <LineBox>
              <Form.Field>
                <FlexBox2>
                  <Label>엑셀</Label>
                  <FileContainer>
                    {xlsx && (
                      <DelButton
                        onClick={e => {
                          excelRef.current.value = '';
                          setXlsx();
                          setNowData({
                            ...nowData,
                            excelFile: null,
                          });
                        }}>
                        x
                      </DelButton>
                    )}
                    <InputFileBlock>
                      <InputLabel htmlFor="spotsModalXlsx">
                        {xlsx ? (
                          <InputImage alt="ExcelIcon" src={ExcelIcon} />
                        ) : (
                          <AddButton>엑셀 올리기</AddButton>
                        )}
                      </InputLabel>
                      <InputBoxFile
                        ref={excelRef}
                        id="spotsModalXlsx"
                        name="spotsModalXlsx"
                        type="file"
                        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        onChange={(e, data) => {
                          console.log(e.target.files[0]);
                          setXlsx(e.target.files[0]);
                        }}
                      />
                    </InputFileBlock>
                  </FileContainer>
                </FlexBox2>
              </Form.Field>
              <Form.Field>
                <FlexBox2>
                  <Label>PDF</Label>
                  <FileContainer>
                    {pdf && (
                      <DelButton
                        onClick={e => {
                          pdfRef.current.value = '';
                          setPdf();
                          setNowData({
                            ...nowData,
                            pdfFile: null,
                          });
                        }}>
                        x
                      </DelButton>
                    )}
                    <InputFileBlock>
                      <InputLabel htmlFor="spotsModalPdf">
                        {pdf ? (
                          <InputImage alt="PdfIcon" src={PDFIcon} />
                        ) : (
                          <AddButton>PDF 올리기</AddButton>
                        )}
                      </InputLabel>
                      <InputBoxFile
                        ref={pdfRef}
                        id="spotsModalPdf"
                        type="file"
                        accept="application/pdf"
                        onChange={(e, data) => {
                          console.log(e.target.files[0]);
                          setPdf(e.target.files[0]);
                        }}
                      />
                    </InputFileBlock>
                  </FileContainer>
                </FlexBox2>
              </Form.Field>
            </LineBox>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button
            type="submit"
            content="수정"
            labelPosition="right"
            icon="checkmark"
            positive
            onClick={onSubmit}
          />
        </Modal.Actions>
      </Modal>
    </Form>
  );
}

export default EditSpotModal;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const FlexBox2 = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 10px;
  width: ${({width}) => (width ? `${width}px` : '100px')};
  height: 100px;
`;
const LineBox = styled.div`
  display: flex;
  gap: 20px;
`;
const InputBoxFile = styled.input`
  display: none;
`;
const InputImage = styled.img`
  width: 50px;
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;
const InputLabel = styled.label`
  /* background-color: blanchedalmond; */
  font-size: 15px;
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

const FileContainer = styled.div`
  margin-top: 10px;
  display: flex;
  width: 80px;
  position: relative;
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
