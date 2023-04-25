import {useUpdateMakersDetail} from 'hooks/useMakers';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Header,
  Form,
  Modal,
  Input,
  Label,
  Checkbox,
  TextArea,
} from 'semantic-ui-react';
import styled from 'styled-components';
import {diningReverseFormatted} from 'utils/statusFormatter';

function MakersEditModal({
  open,
  setOpen,
  nowData,
  setNowData,
  testData,
  setTestData,
}) {

  const {mutateAsync: updateMakers} = useUpdateMakersDetail();
  const onSubmit = async () => {
    const dining = nowData.diningTypes.map((v, i) => {
      const dinigTypeNumber = diningReverseFormatted(v);
      return {
        diningType: dinigTypeNumber,
        lastOrderTime:
          dinigTypeNumber === 1
            ? nowData.morningLastOrderTime
            : dinigTypeNumber === 2
            ? nowData.lunchLastOrderTime
            : nowData.dinnerLastOrderTime,
        capacity:
          dinigTypeNumber === 1
            ? Number(nowData.morningCapacity) || 0
            : dinigTypeNumber === 2
            ? Number(nowData.lunchCapacity) || 0
            : Number(nowData.dinnerCapacity) || 0,
      };
    });
    const req = {
      makersId: nowData.id,
      code: nowData.code,
      name: nowData.name,
      companyName: nowData.companyName,
      ceo: nowData.ceo,
      ceoPhone: nowData.ceoPhone,
      managerName: nowData.managerName,
      managerPhone: nowData.managerPhone,
      dailyCapacity: nowData.dailyCapacity,
      serviceType: nowData.serviceType,
      serviceForm: nowData.serviceForm,
      isParentCompany: nowData.isParentCompany,
      parentCompanyId: nowData.parentCompanyId,
      zipCode: nowData.zipCode,
      address1: nowData.address1,
      address2: nowData.address2,
      location: nowData.location,
      companyRegistrationNumber: nowData.companyRegistrationNumber,
      contractStartDate: nowData.contractStartDate,
      contractEndDate: nowData.contractEndDate,
      isNutritionInformation: nowData.isNutritionInformation,
      openTime: nowData.openTime,
      closeTime: nowData.closeTime,
      fee: nowData.fee,
      bank: nowData.bank,
      depositHolder: nowData.depositHolder,
      accountNumber: nowData.accountNumber,
      diningTypes: dining,
      memo: nowData.memo,
    };
    try {
      await updateMakers(req);
      setOpen(false);
    } catch (error) {
      alert(error.toString());
    }

  };
  return (
    <Form onSubmit={onSubmit}>
      <Modal
        size="large"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>메이커스 정보 변경</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <LineBox>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">메이커스 이름</Label>
                  <Input
                    placeholder="메이커스 이름"
                    defaultValue={nowData.name}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        name: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">메이커스 코드</Label>
                  <Input
                    placeholder="ex) AAAAAA"
                    defaultValue={nowData.code}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        code: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox>
                  <Label size="mini">법인명</Label>
                  <Input
                    placeholder="법인명"
                    defaultValue={nowData.companyName}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        companyName: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">사업자대표</Label>
                  <Input
                    placeholder="사업자대표"
                    defaultValue={nowData.ceo}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        ceo: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">대표자 전화번호</Label>
                  <Input
                    placeholder="대표자 전화번호"
                    defaultValue={nowData.ceoPhone}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        ceoPhone: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">담당자 이름</Label>
                  <Input
                    placeholder="담당자 이름"
                    defaultValue={nowData.managerName}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        managerName: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">담당자 전화번호</Label>
                  <Input
                    placeholder="담당자 전화번호"
                    defaultValue={nowData.managerPhone}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        managerPhone: data.value ? data.value : '',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={120}>
                  <Label size="mini">서비스</Label>
                  <Input
                    placeholder="서비스 업종"
                    defaultValue={nowData.serviceForm}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        serviceForm: data.value ? data.value : null,
                      });
                    }}
                  />
                  <Input
                    placeholder="서비스 형태"
                    defaultValue={nowData.serviceType}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        serviceType: data.value ? data.value : '기타',
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">일일최대수량</Label>
                  <Input
                    placeholder="일일최대수량"
                    defaultValue={nowData.dailyCapacity}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        dailyCapacity: data.value ? data.value : 0,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={120}>
                  <Label size="mini">가능 다이닝타입</Label>
                  <Input
                    placeholder="가능 다이닝타입"
                    defaultValue={nowData.diningTypes.join(',')}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        diningTypes: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">아침 주문가능시간</Label>
                  <Input
                    placeholder="아침 주문가능시간"
                    defaultValue={nowData.morningLastOrderTime}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        morningLastOrderTime: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">점심 주문가능시간</Label>
                  <Input
                    placeholder="점심 주문가능시간"
                    defaultValue={nowData.lunchLastOrderTime}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        lunchLastOrderTime: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">저녁 주문가능시간</Label>
                  <Input
                    placeholder="저녁 주문가능시간"
                    defaultValue={nowData.dinnerLastOrderTime}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        dinnerLastOrderTime: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>

              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">아침 가능케파</Label>
                  <Input
                    placeholder="아침 가능케파"
                    defaultValue={nowData.morningCapacity}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        morningCapacity: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>

              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">점심 가능케파</Label>
                  <Input
                    placeholder="점심 가능케파"
                    defaultValue={nowData.lunchCapacity}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        lunchCapacity: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">저녁 가능케파</Label>
                  <Input
                    placeholder="저녁 가능케파"
                    defaultValue={nowData.dinnerCapacity}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        dinnerCapacity: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={250}>
                  <Label size="mini">모회사</Label>
                  <FlexBox2 width={250}>
                    <Input
                      placeholder="모회사 ID"
                      defaultValue={nowData.parentCompanyId}
                      onChange={(e, data) => {
                        setNowData({
                          ...nowData,
                          parentCompanyId: data.value ? data.value : null,
                        });
                      }}
                    />
                    <Checkbox
                      style={{paddingTop: 7, fontSize: 12}}
                      label={'모회사 여부'}
                      checked={nowData.isParentCompany}
                      onChange={(e, data) => {
                        setNowData({
                          ...nowData,
                          isParentCompany: data.checked ? data.checked : false,
                        });
                      }}
                    />
                  </FlexBox2>
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={200}>
                  <Label size="mini">기본주소</Label>
                  <Input
                    placeholder="기본주소"
                    defaultValue={nowData.address1}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        address1: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={200}>
                  <Label size="mini">상세주소</Label>
                  <Input
                    placeholder="상세주소"
                    defaultValue={nowData.address2}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        address2: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">우편번호</Label>
                  <Input
                    placeholder="우편번호"
                    defaultValue={nowData.zipCode}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        zipCode: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">위치</Label>
                  <Input
                    placeholder="위치"
                    defaultValue={nowData.location}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        location: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">사업자 등록번호</Label>
                  <Input
                    placeholder="사업자 등록번호"
                    defaultValue={nowData.companyRegistrationNumber}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        companyRegistrationNumber: data.value
                          ? data.value
                          : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>

              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">계약 시작날짜</Label>
                  <Input
                    placeholder="계약 시작날짜"
                    defaultValue={nowData.contractStartDate}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        contractStartDate: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">계약 종료날짜</Label>
                  <Input
                    placeholder="계약 종료날짜"
                    defaultValue={nowData.contractEndDate}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        contractEndDate: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={160}>
                  <Label size="mini">
                    외식영양정보{'\n'}
                    표시 대상 여부
                  </Label>
                  <Checkbox
                    style={{paddingTop: 7, fontSize: 12}}
                    label={'외식영양정보 표시 대상 여부'}
                    checked={nowData.isNutritionInformation}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        isNutritionInformation: data.checked
                          ? data.checked
                          : false,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">영업 시작시간</Label>
                  <Input
                    placeholder="영업 시작시간"
                    defaultValue={nowData.openTime}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        openTime: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">영업 종료시간</Label>
                  <Input
                    placeholder="영업 종료시간"
                    defaultValue={nowData.closeTime}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        closeTime: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">사용료</Label>
                  <Input
                    placeholder="사용료"
                    defaultValue={nowData.fee}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        fee: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={100}>
                  <Label size="mini">은행</Label>
                  <Input
                    placeholder="은행"
                    defaultValue={nowData.bank}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        bank: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">예금주 명</Label>
                  <Input
                    placeholder="예금주 명"
                    defaultValue={nowData.depositHolder}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        depositHolder: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
              <Form.Field>
                <FlexBox width={150}>
                  <Label size="mini">계좌번호</Label>
                  <Input
                    placeholder="계좌번호"
                    defaultValue={nowData.accountNumber}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        accountNumber: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
              </Form.Field>
            </LineBox>
            <LineBox>
              <Form.Field>
                <FlexBox width={500}>
                  <Label size="mini">메모</Label>
                  <TextArea
                    style={{
                      resize: 'none',
                      border: '1px solid #eee',
                      borderRadius: 5,
                      padding: 15,
                    }}
                    rows={5}
                    placeholder="메모"
                    defaultValue={nowData.memo}
                    onChange={(e, data) => {
                      setNowData({
                        ...nowData,
                        memo: data.value ? data.value : null,
                      });
                    }}
                  />
                </FlexBox>
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

export default MakersEditModal;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const FlexBox2 = styled.div`
  display: flex;
  gap: 10px;
  width: ${({width}) => (width ? `${width}px` : '100px')};
`;
const LineBox = styled.div`
  display: flex;
  font-size: 12px;
  gap: 20px;
`;
