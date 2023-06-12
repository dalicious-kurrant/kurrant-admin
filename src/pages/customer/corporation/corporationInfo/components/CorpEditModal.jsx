import {useUpdateSpotDetail} from 'hooks/useCorporation';
import React from 'react';
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
import {
  groupTypeFormatted,
  groupTypeFormatted2,
  preNumberFormatted,
} from 'utils/statusFormatter';
import withCommas from 'utils/withCommas';
const data = [
  {
      "diningType": 2,
      "deliveryTimes": "12:00,12:30,13:00,13:30",
      "membershipBenefitTime": "0일전 10:00",
      "lastOrderTime": "0일전 10:00",
      "serviceDays": "월, 화, 수, 목, 금",
      "supportPriceByDays": [
          {
              "serviceDay": "금",
              "supportPrice": 10000
          },
          {
              "serviceDay": "목",
              "supportPrice": 10000
          },
          {
              "serviceDay": "수",
              "supportPrice": 10000
          },
          {
              "serviceDay": "월",
              "supportPrice": 10000
          },
          {
              "serviceDay": "화",
              "supportPrice": 10000
          }
      ]
  }
]
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
      memo: nowData.memo,
      prepaidCategoryList: nowData.prepaidCategoryList,
    };

    try {
      await updateSpotDetail(req);
      setNowData();
      setClickId();
      refetch();
      setOpen(false);
    } catch (error) {
      alert(error.toString());
    }
  };
  console.log(nowData)
  const supportPrice = nowData?.mealInfos?.map((v)=>{
    return v.supportPriceByDays !== null && v.supportPriceByDays.map((price)=>{
      return {diningType:v.diningType, serviceDay:price.serviceDay, supportPrice:price.supportPrice}
    })
  });
  const morningFilter = nowData?.mealInfos?.filter((v)=>v.diningType===1);
  const lunchFilter = nowData?.mealInfos?.filter((v)=>v.diningType===2);
  const dinnerFilter = nowData?.mealInfos?.filter((v)=>v.diningType===3);
  const morningData = morningFilter?.length > 0 ? morningFilter[0]: null;
  const lunchData = lunchFilter?.length > 0 ? lunchFilter[0]: null;
  const dinnerData =dinnerFilter?.length > 0 ? dinnerFilter[0]: null;
  // console.log(supportPrice)
  // const supportPrice = [
  //   [
  //     {diningType: 2, serviceDay: '월', supportPrice: 3000},
  //     {diningType: 2, serviceDay: '화', supportPrice: 5000},
  //     {diningType: 2, serviceDay: '수', supportPrice: 2000},
  //     {diningType: 2, serviceDay: '목', supportPrice: 10000},
  //     {diningType: 2, serviceDay: '금', supportPrice: 12000},
  //   ],
  // ];
  const supportPrices = supportPrice.flat();
  return (
    <Form onSubmit={onSubmit}>
      <Modal
        style={{width:'auto'}}
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
                  <Form.Field>
                    <FlexBox width={250}>
                      <LabelCheckBox>
                        <Label size="mini">멤버십 종료 날짜</Label>
                      </LabelCheckBox>
                      <Input
                        style={{width: 200}}
                        placeholder="멤버십 종료 날짜"
                        defaultValue={nowData.membershipEndDate}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            membershipEndDate: data.value ? data.value : null,
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
                    <FlexBox width={250}>
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
                    <FlexBox width={250}>
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
                              minPrice: data.value ? Number(data.value) : null,
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
                              maxPrice: data.value ? Number(data.value) : null,
                            });
                          }}
                        />
                      </FlexBox>
                    </Form.Field>
                  </FlexCheckBox>
                </LineBox>
                <LineBox>
                  <Form.Field>
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">아침 주문 요일</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="아침 주문 요일"
                        defaultValue={morningData?.serviceDays}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">아침 주문 마감시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="아침 주문 마감시간"
                        defaultValue={morningData?.lastOrderTime}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
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
                        <Label size="mini">점심 주문 요일</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="점심 주문 요일"
                        defaultValue={lunchData?.serviceDays}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">점심 주문 마감시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="점심 주문 마감시간"
                        defaultValue={lunchData?.lastOrderTime}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
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
                        <Label size="mini">져녁 주문 요일</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="져녁 주문 요일"
                        defaultValue={dinnerData?.serviceDays}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">져녁 주문 마감시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="져녁 주문 마감시간"
                        defaultValue={dinnerData?.lastOrderTime}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
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
                        <Label size="mini">아침 배송시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="아침 배송시간"
                        defaultValue={morningData?.deliveryTimes}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">아침멤버십마감시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="아침멤버십마감시간"
                        defaultValue={morningData?.membershipBenefitTime}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
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
                        <Label size="mini">점심 배송시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="점심 배송시간"
                        defaultValue={lunchData?.deliveryTimes}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">점심멤버십마감시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="점심멤버십마감시간"
                        defaultValue={lunchData?.membershipBenefitTime}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
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
                        <Label size="mini">져녁 배송시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="져녁 배송시간"
                        defaultValue={dinnerData?.deliveryTimes}
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
                    <FlexBox width={300}>
                      <LabelBox>
                        <Label size="mini">져녁멤버십마감시간</Label>
                      </LabelBox>
                      <Input
                        style={{width: 300}}
                        placeholder="져녁멤버십마감시간"
                        defaultValue={dinnerData?.membershipBenefitTime}
                        onChange={(e, data) => {
                          setNowData({
                            ...nowData,
                            spotName: data.value ? data.value : null,
                          });
                        }}
                      />
                    </FlexBox>
                  </Form.Field>
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
              {supportPrice[0] && <div style={{marginRight: 20}}>
                <LineBox>
                  <Form.Field>
                    <div>
                      <LabelCheckBox style={{width: 70}}>
                        <Label size="mini">지원금</Label>
                      </LabelCheckBox>
                      <Table celled>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell textAlign="center">
                              지원 요일
                            </Table.HeaderCell>
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
                          {nowData?.serviceDays?.split(',')?.map(v => {
                            const morningSupport = supportPrices.filter(
                              m => m.diningType === 1,
                            );
                            const lunchSupport = supportPrices.filter(
                              m => m.diningType === 2,
                            );
                            const dinnerSupport = supportPrices.filter(
                              m => m.diningType === 3,
                            );
                            console.log(morningSupport)
                            return (
                              <Table.Row key={v}>
                                <Table.Cell textAlign="center">
                                  {v?.trim()}
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input
                                    style={{width: 65}}
                                    placeholder="아침 지원금"
                                    defaultValue={
                                      morningSupport?.length > 0
                                        ? morningSupport?.find(
                                            p => p.serviceDay === v?.trim(),
                                          )?.supportPrice
                                        : 0
                                    }
                                    onChange={(e, data) => {
                                      setNowData({
                                        ...nowData,
                                        maxPrice: data.value
                                          ? Number(data.value)
                                          : null,
                                      });
                                    }}
                                  />
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input
                                    style={{width: 65}}
                                    placeholder="점심 지원금"
                                    defaultValue={
                                      lunchSupport?.length > 0
                                        ? lunchSupport?.find(
                                            p => p.serviceDay === v?.trim(),
                                          )?.supportPrice
                                        : 0
                                    }
                                    onChange={(e, data) => {
                                      setNowData({
                                        ...nowData,
                                        maxPrice: data.value
                                          ? Number(data.value)
                                          : null,
                                      });
                                    }}
                                  />
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input
                                    style={{width: 65}}
                                    placeholder="저녁 지원금"
                                    defaultValue={
                                      dinnerSupport?.length > 0
                                        ? dinnerSupport?.find(
                                            p => p.serviceDay === v?.trim(),
                                          )?.supportPrice
                                        : 0
                                    }
                                    onChange={(e, data) => {
                                      setNowData({
                                        ...nowData,
                                        maxPrice: data.value
                                          ? Number(data.value)
                                          : null,
                                      });
                                    }}
                                  />
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
                        </Table.Body>
                      </Table>
                    </div>
                  </Form.Field>
                </LineBox>
              </div>}
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
                            isPrepaid: data.checked ? data.checked : false,
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
                          {nowData?.prepaidCategoryList?.map(v => {
                            return (
                              <Table.Row key={v.code}>
                                <Table.Cell textAlign="center">
                                  {preNumberFormatted(v.code)}
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input
                                    style={{width: 50}}
                                    value={withCommas(v.count)}
                                    onChange={(e, data) => {
                                      const priceData =
                                        nowData.categoryPrices.find(f => {
                                          return f.code === v.code;
                                        });
                                      console.log(priceData, 'price');
                                      setNowData({
                                        ...nowData,
                                        prepaidCategoryList:
                                          nowData.prepaidCategoryList.map(
                                            change => {
                                              if (change.code === v.code) {
                                                return {
                                                  ...change,
                                                  count: Number(
                                                    data.value.replace(',', ''),
                                                  ),
                                                };
                                              }
                                              return change;
                                            },
                                          ),
                                      });
                                    }}
                                  />
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                  <Input
                                    style={{width: 100}}
                                    value={v.totalPrice}
                                    onChange={(e, data) => {
                                      console.log(data.value);
                                      setNowData({
                                        ...nowData,
                                        prepaidCategoryList:
                                          nowData.prepaidCategoryList.map(
                                            change => {
                                              if (change.code === v.code) {
                                                return {
                                                  ...change,
                                                  totalPrice: Number(
                                                    data.value.replace(',', ''),
                                                  ),
                                                };
                                              }
                                              return change;
                                            },
                                          ),
                                      });
                                    }}
                                  />
                                </Table.Cell>
                              </Table.Row>
                            );
                          })}
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
  margin-bottom: 5px;
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
