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
  Table,
} from 'semantic-ui-react';
import styled from 'styled-components';
import {
  diningReverseFormatted,
  preNumberFormatted,
} from 'utils/statusFormatter';
import withCommas from 'utils/withCommas';

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
        minTime:
          dinigTypeNumber === 1
            ? nowData.morningMinTime
            : dinigTypeNumber === 2
            ? nowData.lunchMinTime
            : nowData.dinnerMinTime,
        maxTime:
          dinigTypeNumber === 1
            ? nowData.morningMaxTime
            : dinigTypeNumber === 2
            ? nowData.lunchMaxTime
            : nowData.dinnerMaxTime,
      };
    });
    const req = {
      id: nowData.id,
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
        size="fullscreen"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>메이커스 정보 변경</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
              <LineBox>
                  <Form.Field>
                    <FlexBox width={120}>
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
                    <FlexBox width={120}>
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
                    <FlexBox width={120}>
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
                              isParentCompany: data.checked
                                ? data.checked
                                : false,
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
                  <Form.Field>
                    <FlexBox width={150}>
                      <Label size="mini">영업요일</Label>
                      <Input
                        placeholder="영업요일"
                        defaultValue={nowData.serviceDays}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            serviceDays: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                
              </LineBox>
              <div style={{fontSize: 12, marginLeft: 50}}>
                <Table celled>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell textAlign="center"></Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        아침
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        점심
                      </Table.HeaderCell>
                      <Table.HeaderCell textAlign="center">
                        저녁
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    <Table.Row>
                      <Table.Cell textAlign="center">주문 마감 시간</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.morningLastOrderTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              morningLastOrderTime: data.value
                                ? data.value
                                : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.lunchLastOrderTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              lunchLastOrderTime: data.value
                                ? data.value
                                : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.dinnerLastOrderTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              dinnerLastOrderTime: data.value
                                ? data.value
                                : null,
                            });
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign="center">가능 케파</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.morningCapacity}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              morningCapacity: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.lunchCapacity}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              lunchCapacity: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.dinnerCapacity}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              dinnerCapacity: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign="center">시작</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.morningMinTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              morningMinTime: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.lunchMinTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              lunchMinTime: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.dinnerMinTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              dinnerMinTime: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      <Table.Cell textAlign="center">종료</Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.morningMaxTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              morningMaxTime: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.lunchMaxTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              lunchMaxTime: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={nowData.dinnerMaxTime}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              dinnerMaxTime: data.value ? data.value : null,
                            });
                          }}
                        />
                      </Table.Cell>
                    </Table.Row>
                  </Table.Body>
                </Table>
                <Form.Field>
                  <FlexBox width={450}>
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
              </div>
            </div>
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
  flex-direction: row;
  flex-wrap: wrap;
  width  : 70%;
  font-size: 12px;
  gap: 15px;
`;
