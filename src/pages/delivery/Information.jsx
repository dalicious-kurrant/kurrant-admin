import DateRangePicker from 'components/DateRangePicker/DateRangePicker';
import {useGetDriver, useGetDriverDelivery, useUpdateDriverDelivery} from 'hooks/useDelivery';
import React, {useEffect, useState} from 'react';
import {
  Button,
  Dropdown,
  Table,
  TableHeader,
  TableHeaderCell,
} from 'semantic-ui-react';
import {TableWrapper} from 'style/common.style';
import styled from 'styled-components';
import {formattedDate, formattedDateZ} from 'utils/dateFormatter';

function Information() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7)),
  );
  const [dataStartDate, setDataStartDate] = useState(new Date());
  const [dataEndDate, setDataEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 7)),
  );

  const [selectClient, setSelectClient] = useState([]);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [deliveryData, setDeliveryData] = useState();
  const [updateDeliveryData, setUpdateDeliveryData] = useState([]);
    
  const {data: getDriverDelivery, refetch:refetchDriverDelivery} = useGetDriverDelivery(formattedDateZ(startDate,"-"),formattedDateZ(endDate,"-"));
  const {data: getDriverList} = useGetDriver();
  const {mutateAsync :updateDriverDelivery} = useUpdateDriverDelivery();

  const handleSaveData = async() => {
    const isMakersName = updateDeliveryData.find((v)=>v.makersNames?.length <=0)
    if(isMakersName){
      alert("메이커스가 비어있습니다.")
      return;
    }
    const saveData = updateDeliveryData.map(save => {
      return {
        id: save.id,
        deliveryDate: save.deliveryDate, // 예시: 새로운 데이터의 날짜
        diningType: save.diningType, // 예시: 새로운 데이터의 식사 유형
        deliveryTime: save.deliveryTime, // 예시: 새로운 데이터의 배송 시간
        groupName: save.groupName, // 예시: 새로운 데이터의 장소 이름
        makersNames: save.makersNames, // 예시: 새로운 데이터의 만든 사람 목록
        driver: save.driver,
      };
    });
    console.log(saveData)
    await updateDriverDelivery(saveData)
    
  };
  useEffect(() => {
    if (getDriverList?.data) {
      setGroupInfoList([
        {key: "null", text: "배송기사", value: null},...getDriverList?.data.map(v => {
          return {key: v.code, text: v.name, value: v.name};
        })]
      );
    }
  }, [getDriverList?.data]);
  useEffect(()=>{
    console.log(deliveryData)
    if(getDriverDelivery?.data){
      setDeliveryData(getDriverDelivery?.data)
    }
  },[getDriverDelivery?.data])
  return (
    <Wrap>
      <CheckDeliveryInfoDate>
        <DateRangePicker
          startDate={formattedDateZ(startDate,'-')}
          setStartDate={setStartDate}
          endDate={formattedDateZ(endDate,'-')}
          setEndDate={setEndDate}
        />
        <Button color="twitter" onClick={()=>refetchDriverDelivery()}>조회</Button>
        <RightItems>
          <Button color="green" onClick={() => handleSaveData()}>
            저장
          </Button>
        </RightItems>
      </CheckDeliveryInfoDate>
      {/* <CheckDeliveryInfoDate>
        <DateRangePicker
          startDate={formattedDateZ(dataStartDate)}
          setStartDate={setDataStartDate}
          endDate={formattedDateZ(dataEndDate)}
          setEndDate={setDataEndDate}
        />
        <Button color="twitter">데이터 불러오기</Button>
      </CheckDeliveryInfoDate> */}
      <TableWrapper>
        <Table style={{marginTop: 50}} celled>
          <TableHeader>
            <Table.Row>
              <TableHeaderCell textAlign="center">추가</TableHeaderCell>
              <TableHeaderCell textAlign="center">날짜</TableHeaderCell>
              <TableHeaderCell textAlign="center">다이닝타입</TableHeaderCell>
              <TableHeaderCell textAlign="center">베송시간</TableHeaderCell>
              <TableHeaderCell textAlign="center">고객사</TableHeaderCell>
              <TableHeaderCell textAlign="center">
                메이커스리스트
              </TableHeaderCell>
              <TableHeaderCell textAlign="center">배송기사</TableHeaderCell>
              <TableHeaderCell textAlign="center">삭제</TableHeaderCell>
            </Table.Row>
          </TableHeader>
          <Table.Body>
            {deliveryData?.length>0 && deliveryData.map((v, i) => {
              const handleButtonClick = index => {
                const getId = deliveryData.filter((data)=>{
                  return (v.id.includes('temp') && data.id?.length > 0 && data.id.includes(v.id.split("_")[0])) || false
                })
                
                const getNotTempId = deliveryData.filter((data)=>{
                  return !data?.id?.includes('temp')
                })
                const maxObjArr = getId?.length > 0  ? getId.reduce((prev, value) => {
                  return Number(prev.id.split("_")[1]) >= Number(value.id.split("_")[1]) ? prev : value;
                }) : getNotTempId.reduce((prev, value) => {
                  return Number(prev.id.split("_")[1]) >= Number(value.id.split("_")[1]) ? prev : value;
                });
                
                const nextId = getId?.length > 0 ? maxObjArr.id.split("_")[0]+"_"+(Number(maxObjArr.id.split("_")[1])+1) : Number(maxObjArr.id)+1
                const newData = {
                  id: nextId.toString(),
                  deliveryDate: v.deliveryDate,
                  diningType: v.diningType, 
                  deliveryTime: v.deliveryTime,
                  groupName: v.groupName, 
                  makersNames: v.makersNames|| [], 
                  driver: v.driver,
                  isAdd: true, 
                };
                const newDataArray = [...deliveryData];
                newDataArray.splice(index + 1, 0, newData);
                if(!updateDeliveryData.find((find)=>find.id ===v.id)){
                  setUpdateDeliveryData([...updateDeliveryData,v])
                }
                setDeliveryData(newDataArray);
              };
              const handleDeleteButtonClick = () => {
                setUpdateDeliveryData(updateDeliveryData.filter(up =>up.id!==v.id))
                setDeliveryData(deliveryData.filter(del => del.id !== v.id));
              };
              return (
                <Table.Row key={v.id}>
                  <Table.Cell>
                    <Button
                      color="blue"
                      type="button"
                      circular
                      floated="left"
                      compact
                      size="tiny"
                      onClick={() => handleButtonClick(i)}>
                      +
                    </Button>
                  </Table.Cell>
                  <Table.Cell>{v.deliveryDate}</Table.Cell>
                  <Table.Cell>{v.diningType}</Table.Cell>
                  <Table.Cell>{v.deliveryTime}</Table.Cell>
                  <Table.Cell>{v.groupName}</Table.Cell>
                  <Table.Cell>
                    <AddInput
                      type="text"
                      value={v.makersNames?.length> 0 &&  v.makersNames.join(',')}
                      onChange={data => {
                        if(!updateDeliveryData.find((find)=>find.id ===v.id)){
                          setUpdateDeliveryData([...updateDeliveryData,{...v, makersNames: data.target.value.split(',')}])
                        }else{
                          console.log(data.target.value?.length > 0 ? data.target.value.split(',') : [])
                          const updateData = updateDeliveryData.map((update)=>{
                            if (update.id === v.id) {
                              return {...update, makersNames: data.target.value?.length > 0 ? data.target.value.split(',') : []};
                            }
                            return update;
                          })
                          setUpdateDeliveryData(updateData)
                        }
                        setDeliveryData(
                          deliveryData.map(makers => {
                            if (makers.id === v.id) {
                              return {...makers, makersNames: data.target.value.split(',')|| []};
                            }
                            return makers;
                          }),
                        );
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <Dropdown
                      placeholder="배송기사"
                      fluid
                      selection
                      search
                      options={groupInfoList}
                      value={v.driver}
                      onChange={(e, data) => {
                        if(!updateDeliveryData.find((find)=>find.id ===v.id)){
                          setUpdateDeliveryData([...updateDeliveryData,{...v, driver: data.value}])
                        }else{
                          const updateData = updateDeliveryData.map((update)=>{
                            if (update.id === v.id) {
                              return {...update, driver: data.value};
                            }
                            return update;
                          })
                          setUpdateDeliveryData(updateData)
                        }
                        setDeliveryData(
                          deliveryData.map(driver => {
                            if (driver.id === v.id) {
                              return {...driver, driver: data.value};
                            }
                            return driver;
                          }),
                        );
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    {v.isAdd && (
                      <Button
                        style={{alignSelf: 'center', justifySelf: 'center'}}
                        color="red"
                        type="button"
                        circular
                        floated="left"
                        compact
                        size="tiny"
                        onClick={() => handleDeleteButtonClick()}>
                        -
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </TableWrapper>
    </Wrap>
  );
}

export default Information;

const Wrap = styled.div`
  padding: 50px;
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const CheckDeliveryInfoDate = styled.div`
  display: flex;
  padding-top: 20px;
  gap: 15px;
`;
const RightItems = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  justify-self: flex-end;
`;
const AddInput = styled.input`
  border: 1px solid #ccc;
  padding: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 7px;

  &:focus {
    outline: 2px solid #aaa;
  }
  flex: 1;
  width: 100%;
`;
