import {useUpdateMakersDetail} from 'hooks/useMakers';
import React, { useState } from 'react';
import {
  Button,
  Form,
  Modal,
  Input,
  Label,
  Checkbox,
  TextArea,
  Table,
} from 'semantic-ui-react';
import styled from 'styled-components';
import ImageUploader from './ImageUploader';

function MakersEditModal({
  open,
  setOpen,
  nowData,
  setnowData,
  selectedImages,
  setSelectedImages,
}) {
  const {mutateAsync: updateMakers} = useUpdateMakersDetail();
  const morningDining = nowData.diningTypes.find((dining)=>dining.diningType === 1)
  const lunchDining = nowData.diningTypes.find((dining)=>dining.diningType === 2)
  const dinnerDining = nowData.diningTypes.find((dining)=>dining.diningType === 3)
  const [data,setData] = useState(nowData);
  const onSubmit = async () => {
    const req = new FormData(); 
    if (selectedImages?.length > 0) {
      for (let i = 0; i < selectedImages?.length; i++) {
        console.log(typeof selectedImages[i],selectedImages[i])
        if(typeof selectedImages[i] === 'object')
          req.append('files', selectedImages[i]);
      }
    }
    const json = JSON.stringify(data);
    const blob = new Blob([json], {type: 'application/json'});
    req.append('updateMakersReqDto', blob);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };
    try {
      await updateMakers(req,config);
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
                        defaultValue={data.name}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            name: d.value ? d.value : '',
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
                        defaultValue={data.code}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            code: d.value ? d.value : null,
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
                        defaultValue={data.companyName}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            companyName: d.value ? d.value : null,
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
                        defaultValue={data.diningTypes.map((dining)=>dining.diningType ).join(',')}
                        onChange={(e, d) => {
                          const diningType = d.value.split(",").map((dining)=>Number(dining));
                          const update = diningType.map((type)=>{
                            const isDining = data.diningTypes.find((di)=> di.diningType=== type)
                            const isNowDining = nowData.diningTypes.find((di)=> di.diningType=== type)
                            console.log(isDining,isNowDining)
                            if(isDining){
                              return {
                                ...isDining
                              }
                            }
                            if(isNowDining){
                              return{
                                ...isNowDining
                              }
                            }
                            return {
                              "lastOrderTime": null,
                              "diningType": type,
                              "capacity": null,
                              "minTime": null,
                              "maxTime": null
                            }
                          })
                        
                          setData({
                            ...data,
                            diningTypes: update,
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
                        defaultValue={data.location}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            location: d.value ? d.value : null,
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
                        defaultValue={data.dailyCapacity}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            dailyCapacity: d.value ? d.value : 0,
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
                        defaultValue={data.ceo}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            ceo: d.value ? d.value : null,
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
                        defaultValue={data.ceoPhone}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            ceoPhone: d.value ? d.value : null,
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
                        defaultValue={data.managerName}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            managerName: d.value ? d.value : '',
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
                        defaultValue={data.managerPhone}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            managerPhone: d.value ? d.value : '',
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
                        defaultValue={data.serviceForm}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            serviceForm: d.value ? d.value : null,
                          });
                        }}
                      />
                      <Input
                        placeholder="서비스 형태"
                        defaultValue={data.serviceType}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            serviceType: d.value ? d.value : '기타',
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
                          defaultValue={data.parentCompanyId}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              parentCompanyId: d.value ? d.value : null,
                            });
                          }}
                        />
                        <Checkbox
                          style={{paddingTop: 7, fontSize: 12}}
                          label={'모회사 여부'}
                          checked={data.isParentCompany}
                          onChange={(e, d) => {
                            setData({
                              ...data,
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
                        defaultValue={data.address1}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            address1: d.value ? d.value : null,
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
                        defaultValue={data.address2}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            address2: d.value ? d.value : null,
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
                        defaultValue={data.zipCode}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            zipCode: d.value ? d.value : null,
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
                        defaultValue={data.companyRegistrationNumber}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            companyRegistrationNumber: d.value
                              ? d.value
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
                        defaultValue={data.contractStartDate}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            contractStartDate: d.value ? d.value : null,
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
                        defaultValue={data.contractEndDate}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            contractEndDate: d.value ? d.value : null,
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
                        checked={data.isNutritionInformation}
                        onChange={(e, d) => {
                          setData({
                            ...data,
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
                        defaultValue={data.openTime}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            openTime: d.value ? d.value : null,
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
                        defaultValue={data.closeTime}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            closeTime: d.value ? d.value : null,
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
                        defaultValue={data.fee}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            fee: d.value ? d.value : null,
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
                        defaultValue={data.bank}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            bank: d.value ? d.value : null,
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
                        defaultValue={data.depositHolder}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            depositHolder: d.value ? d.value : null,
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
                        defaultValue={data.accountNumber}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            accountNumber: d.value ? d.value : null,
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
                        defaultValue={data.serviceDays}
                        onChange={(e, d) => {
                          setData({
                            ...data,
                            serviceDays: d.value ? d.value : null,
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
                          defaultValue={morningDining?.lastOrderTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===1 ){
                                  return {...dining,lastOrderTime:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={lunchDining?.lastOrderTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===2 ){
                                  return {...dining,lastOrderTime:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={dinnerDining?.lastOrderTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===3 ){
                                  return {...dining,lastOrderTime:d?.value}
                                }
                                return dining
                              })
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
                          defaultValue={morningDining?.capacity || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===1 ){
                                  return {...dining,capacity:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={lunchDining?.capacity || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===2 ){
                                  return {...dining,capacity:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={dinnerDining?.capacity || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===3 ){
                                  return {...dining,capacity:d?.value}
                                }
                                return dining
                              })
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
                          defaultValue={morningDining?.minTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===1 ){
                                  return {...dining,minTime:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={lunchDining?.minTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===2 ){
                                  return {...dining,minTime:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={dinnerDining?.minTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===3 ){
                                  return {...dining,minTime:d?.value}
                                }
                                return dining
                              })
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
                          defaultValue={morningDining?.maxTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===1 ){
                                  return {...dining,maxTime:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={lunchDining?.maxTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===2 ){
                                  return {...dining,maxTime:d?.value}
                                }
                                return dining
                              })
                            });
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell textAlign="center">
                        <Input
                          style={{width: 90}}
                          defaultValue={dinnerDining?.maxTime || '-'}
                          onChange={(e, d) => {
                            setData({
                              ...data,
                              diningTypes: data.diningTypes.map((dining)=>{
                                if(dining.diningType ===3 ){
                                  return {...dining,maxTime:d?.value}
                                }
                                return dining
                              })
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
                      defaultValue={data.memo}
                      onChange={(e, d) => {
                        setData({
                          ...data,
                          memo: d.value ? d.value : null,
                        });
                      }}
                    />
                  </FlexBox>
                  
                </Form.Field>
              
              </div>
             
            </div>
          </Modal.Description>
          <ImageUploader selectedImages={selectedImages} setSelectedImages={setSelectedImages} setData={setData}/>
          {/* <MakersImageModal imageSrc={["https://admin.dalicious.co/img/makersintroimg.png","https://admin.dalicious.co/img/kurrantmembership.png","https://admin.dalicious.co/img/makersintroimg.png","https://admin.dalicious.co/img/kurrantmembership.png","https://admin.dalicious.co/img/makersintroimg.png","https://admin.dalicious.co/img/kurrantmembership.png"]} /> */}
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
