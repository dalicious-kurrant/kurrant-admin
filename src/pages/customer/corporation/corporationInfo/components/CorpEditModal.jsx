import {useUpdateSpotDetail} from 'hooks/useCorporation';
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
import {diningFormatted, groupTypeFormatted, groupTypeFormatted2, preNumberFormatted} from 'utils/statusFormatter';
import withCommas from 'utils/withCommas';

function CorpEditModal({
  open,
  setOpen,
  nowData,
  refetch,
  setNowData,
  setClickId,
  testData,
  setTestData,
}) {
  const {mutateAsync: updateSpotDetail} = useUpdateSpotDetail();
  console.log(nowData);
  // console.log(nowData.userOrderAlarm);

  const onSubmit = async () => {
    const req = {
      spotId: nowData.spotId,
      code: nowData.code,
      spotName: nowData.spotName,
      managerName: nowData.managerName,
      managerId: nowData.managerId,
      employeeCount: nowData.employeeCount,
      managerPhone: nowData.managerPhone,
      spotType: nowData.spotType,
      diningTypes: nowData.diningTypes,
      serviceDays: nowData.serviceDays,
      supportDays: nowData.supportDays,
      notSupportDays: nowData.notSupportDays,
      zipCode: nowData.zipCode,
      isMembershipSupport: nowData.isMembershipSupport,
      address1: nowData.address1,
      address2: nowData.address2,
      breakfastSupportPrice: nowData.breakfastSupportPrice || 0,
      lunchSupportPrice: nowData.lunchSupportPrice || 0,
      dinnerSupportPrice: nowData.dinnerSupportPrice || 0,
      location: nowData.location,
      minPrice: nowData.minPrice,
      maxPrice: nowData.maxPrice,
      isSetting: nowData.isSetting,
      isGarbage: nowData.isGarbage,
      isHotStorage: nowData.isHotStorage,
      isPrepaid: nowData.isPrepaid,
      memo:nowData.memo,
      prepaidCategoryList:nowData.prepaidCategoryList,
    };
    console.log(req);
    try {
      await updateSpotDetail(req);
      setNowData();
      setClickId();
      refetch();
      setOpen(false)

    } catch (error) {
      alert(error.toString());
    }
  };
  return (
    <Form onSubmit={onSubmit}>
      <Modal
        style={{width: 'auto'}}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}>
        <Modal.Header>기업 정보 변경</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <div style={{display: 'flex'}}>
              <div style={{width: 860}}>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={130}>
                      <LabelBox>
                        <Label size="mini">그룹 ID</Label>
                      </LabelBox>
                      <Input
                        style={{width: 50}}
                        placeholder="그룹 ID"
                        defaultValue={nowData.spotId}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            id: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                  <Form.Field>
                    <FlexBox width={150}>
                      <LabelBox>
                        <Label size="mini">기업 코드</Label>
                      </LabelBox>
                      <Input
                        style={{width: 80}}
                        placeholder="기업 코드"
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
                    <FlexBox width={250}>
                      <LabelBox>
                        <Label size="mini">담당자</Label>
                      </LabelBox>
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
                  <Form.Field>
                    <FlexBox width={250}>
                      <LabelBox>
                        <Label size="mini">담당자 번호</Label>
                      </LabelBox>
                      <Input
                        placeholder="담당자 번호"
                        defaultValue={nowData.managerPhone}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            managerPhone: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">스팟 타입</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
                        placeholder="스팟 타입"
                        defaultValue={groupTypeFormatted(nowData.spotType)}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotType: data.value
                              ? groupTypeFormatted2(data.value)
                              : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                  <Form.Field>
                    <FlexBox width={250}>
                      <LabelBox>
                        <Label size="mini">담당자 ID</Label>
                      </LabelBox>
                      <Input
                        placeholder="담당자 ID"
                        defaultValue={nowData.managerId}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            managerId: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                  <Form.Field>
                    <FlexBox width={250}>
                      <LabelBox>
                        <Label size="mini">사원수</Label>
                      </LabelBox>
                      <Input
                        placeholder="사원수"
                        defaultValue={nowData.employeeCount}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            employeeCount: data.value
                              ? Number(data.value)
                              : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">이름</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
                        placeholder="이름"
                        defaultValue={nowData.spotName}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                  <Form.Field>
                    <FlexBox width={250}>
                      <LabelBox>
                        <Label size="mini">식사타입</Label>
                      </LabelBox>
                      <Input
                        placeholder="식사타입"
                        defaultValue={nowData.diningTypes}
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
                    <FlexBox width={250}>
                      <LabelBox>
                        <Label size="mini">식사요일</Label>
                      </LabelBox>
                      <Input
                        placeholder="식사요일"
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
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">우편번호</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
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
                    <FlexBox width={250}>
                      <LabelCheckBox>
                        <Label size="mini">기업 멤버십 지원 여부</Label>
                      </LabelCheckBox>
                      <Checkbox
                        style={{
                          fontSize: 12,
                        }}
                        checked={nowData.isMembershipSupport}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            isMembershipSupport: data.checked
                              ? data.checked
                              : false,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">기본주소</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">아침 지원금</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
                        placeholder="아침 지원금"
                        defaultValue={nowData.breakfastSupportPrice}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            breakfastSupportPrice: data.value
                              ? Number(data.value)
                              : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                  <Form.Field>
                    <FlexBox width={200}>
                      <LabelBox>
                        <Label size="mini">지원금O</Label>
                      </LabelBox>
                      <Input
                       style={{width: 130}}
                        placeholder="지원금O"
                        defaultValue={nowData.supportDays}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            supportDays: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">상세주소</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">점심 지원금</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
                        placeholder="점심 지원금"
                        defaultValue={nowData.lunchSupportPrice}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            lunchSupportPrice: data.value
                              ? Number(data.value)
                              : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                  <Form.Field>
                    <FlexBox width={200}>
                      <LabelBox>
                        <Label size="mini">지원금X</Label>
                      </LabelBox>
                      <Input
                       style={{width: 130}}
                        placeholder="지원금X"
                        defaultValue={nowData.notSupportDays}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            notSupportDays: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">위치</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">저녁 지원금</Label>
                      </LabelBox>
                      <Input
                        style={{width: 450}}
                        placeholder="저녁 지원금"
                        defaultValue={nowData.dinnerSupportPrice}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            dinnerSupportPrice: data.value
                              ? Number(data.value)
                              : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexCheckBox width={300}>
                      <FlexBox>
                        <LabelCheckBox>
                          <Label size="mini">식사세팅 지원 서비스</Label>
                        </LabelCheckBox>
                        <Checkbox
                          style={{
                            fontSize: 12,
                          }}
                          checked={nowData.isSetting}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              isSetting: data.checked ? data.checked : false,
                            });
                          }}
                        />
                      </FlexBox>
                      <FlexBox>
                        <LabelCheckBox>
                          <Label size="mini">쓰레기 지원 서비스</Label>
                        </LabelCheckBox>
                        <Checkbox
                          style={{
                            fontSize: 12,
                          }}
                          checked={nowData.isGarbage}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              isGarbage: data.checked ? data.checked : false,
                            });
                          }}
                        />
                      </FlexBox>
                      <FlexBox>
                        <LabelCheckBox>
                          <Label size="mini">온장고 대여 서비스</Label>
                        </LabelCheckBox>
                        <Checkbox
                          style={{
                            fontSize: 12,
                          }}
                          checked={nowData.isHotStorage}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              isHotStorage: data.checked ? data.checked : false,
                            });
                          }}
                        />
                      </FlexBox>
                    </FlexCheckBox>
                  </Form.Field>
                  <FlexCheckBox width={350}>
                    <Form.Field>
                      <FlexBox width={350}>
                        <LabelBox>
                          <Label size="mini">최소 구매 가능 금액</Label>
                        </LabelBox>
                        <Input
                          style={{width: 350}}
                          placeholder="최소 구매 가능 금액"
                          defaultValue={nowData.minPrice}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              minPrice: data.value
                                ? Number(data.value)
                                : null,
                            });
                          }}
                        />
                      </FlexBox>
                    </Form.Field>
                    <Form.Field>
                      <FlexBox width={350}>
                        <LabelBox>
                          <Label size="mini">최대 구매 가능 금액</Label>
                        </LabelBox>
                        <Input
                          style={{width: 350}}
                          placeholder="최대 구매 가능 금액"
                          defaultValue={nowData.maxPrice}
                          onChange={(e, data) => {
                            setNowData({
                              ...nowData,
                              maxPrice: data.value
                                ? Number(data.value)
                                : null,
                            });
                          }}
                        />
                      </FlexBox>
                    </Form.Field>
                  </FlexCheckBox>
                </LineBox>
                <Form.Field>
                  <LabelBox>
                    <Label size="mini">메모</Label>
                  </LabelBox>
                  <FlexBox width={1000}>
                    <TextArea
                      style={{
                        width: 700,
                        fontSize: 13,
                        resize: 'none',
                        border: '1px solid #eee',
                        borderRadius: 5,
                        padding: 15,
                        marginTop: 10,
                      }}
                      rows={4}
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
                <LineBox></LineBox>
              </div>
              <div>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={250}>
                      <LabelCheckBox style={{width: 70}}>
                        <Label size="mini">정산 선불</Label>
                      </LabelCheckBox>
                      <Checkbox
                        style={{
                          fontSize: 12,
                        }}
                        checked={nowData.isPrepaid || false}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            isPrepaid: data.checked
                              ? data.checked
                              : false
                          });
                        }}
                      />
                    </FlexBox>
                    <div>
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell textAlign="center">
                              항목
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">
                              예상 수량
                            </Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">
                              총 금액
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        
                        <Table.Body>
                          {nowData?.prepaidCategoryList?.map((v)=>{
                            return (
                              <Table.Row key={v.code}>
                                <Table.Cell textAlign="center">{preNumberFormatted(v.code)}</Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input 
                                    style={{width: 50}} 
                                    value={withCommas(v.count)} 
                                    onChange={(e, data) => {
                                      const priceData = nowData.categoryPrices.find((f)=>{
                                        return f.code ===v.code
                                      })
                                      console.log(priceData,"price")
                                      setNowData({
                                        ...nowData,
                                        prepaidCategoryList: nowData.prepaidCategoryList.map((change)=>{
                                          if(change.code === v.code){
                                            return {...change, count:Number(data.value.replace(',',''))}
                                          }
                                          return change;
                                        }),
                                      });
                                    }} 
                                  />
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input style={{width: 100}} value={v.totalPrice} onChange={(e, data) => {
                                      console.log(data.value)
                                      setNowData({
                                        ...nowData,
                                        prepaidCategoryList: nowData.prepaidCategoryList.map((change)=>{
                                          if(change.code === v.code){
                                            return {...change, totalPrice:Number(data.value.replace(',',''))}
                                          }
                                          return change;
                                        }),
                                      });
                                    }}  />
                                </Table.Cell>
                              </Table.Row>
                            )
                          }) }
                        </Table.Body>
                      </Table>
                    </div>
                  </Form.Field>
                </LineBox>
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

export default CorpEditModal;

const FlexBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const FlexCheckBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 10px;
  width: ${({width}) => (width ? `${width}px` : '300px')};
`;
const LabelBox = styled.div`
  align-items: center;
  justify-content: flex-start;
  display: flex;
  width: 150px;
  margin-right: 5px;
`;
const LabelCheckBox = styled.div`
  align-items: center;
  justify-content: flex-start;
  width: 120px;
  display: flex;
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
