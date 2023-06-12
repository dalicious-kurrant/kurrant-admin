import {useDeleteSpotsAdjust, useGetOneSpotAdjust, useSpotsList} from 'hooks/useAdjustment';
import {useEffect, useState} from 'react';
import {Button, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedYearMonthDate} from 'utils/dateFormatter';

const ClientAdjustment = ({addData=false,deleteData=false}) => {
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [startMonth, setStartMonth] = useState(formattedYearMonthDate(new Date()));
  const [selectClient, setSelectClient] = useState([]);
  const [selectDelClient, setSelectDelClient] = useState([]);
  const {data: spotsList} = useSpotsList();
  const {mutateAsync:getSpotAdjust, isLoading: getSpotLoading}=useGetOneSpotAdjust();
  const {mutateAsync:delSpotAdjust, isLoading: delSpotLoading}=useDeleteSpotsAdjust();
  
  

  const addAdjustmentsOne = async() => {
    try {
      await getSpotAdjust({
        date:startMonth.replace("-",""),
        id:selectClient
      })
      setSelectClient([]);
      alert("정산 생성 완료");
    } catch (error) {
      alert("정산 생성 실패");
    }
    
  };
  const addAdjustments = async() => {
    try {
      await getSpotAdjust({
        date:startMonth.replace("-",""),
        id:null
      })
      setSelectClient([]);
      alert("정산 전체 생성 완료");
    } catch (error) {
      alert("정산 전체 생성 실패");
    }
  };
  const delAdjustmentsOne = async() => {
    try {
      await delSpotAdjust({
        date:startMonth.replace("-",""),
        id:selectDelClient
      })
      setSelectDelClient([]);
      alert("정산 삭제 완료");
    } catch (error) {
      alert("정산 삭제 실패");
    }
  };
  const delAdjustments = async() => {
    try {
      await delSpotAdjust({
        date:startMonth.replace("-",""),
        id:null
      })
      setSelectDelClient([]);
      alert("정산 삭제 완료");
    } catch (error) {
      alert("정산 삭제 실패");
    }
  };

  useEffect(() => {
    setGroupInfoList(
      spotsList?.data.map(v => {
        return {key: v.groupId, text: v.groupName, value: v.groupId};
      }),
    );
  }, [spotsList]);
  return (
    <Wrap>
      <div style={{display: 'flex'}}>
        <InputBlock>
          <InputBox
            placeholder="월"
            type="month"
            value={startMonth}
            onChange={e => setStartMonth(e.target.value)}
          />
        </InputBlock>
        
      </div>
      <InputBlock>
        {groupInfoList && (
          <Dropdown
            placeholder="스팟(고객사)"
            fluid
            selection
            search
            multiple
            options={groupInfoList}
            value={addData ? selectClient : selectDelClient}
            onChange={(e, data) => {
              if(addData)
              setSelectClient(data.value);
              if(deleteData)
              setSelectDelClient(data.value);
            }}
          />
        )}
      </InputBlock>
     

      {addData && <Button style={{marginRight:50}} disabled={getSpotLoading} content="등록" color="green" onClick={addAdjustmentsOne} />}
      {addData && <Button content="전체 등록" color="green" disabled={getSpotLoading} onClick={addAdjustments} />}
      {deleteData && <Button style={{marginRight:50}} disabled={delSpotLoading} content="삭제" color="youtube" onClick={delAdjustmentsOne} />}
      {deleteData && <Button content="전체 삭제" color="youtube" disabled={delSpotLoading} onClick={delAdjustments} />}
    </Wrap>
  );
};

export default ClientAdjustment;
const InputBox = styled.input`
  display: flex;
  padding-top: 9px;
  padding-bottom: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
  width: 100%;
`;

const InputBlock = styled.div`
  min-width: 200px;
  font-size: 14px;
  margin-right: 24px;
`;

const Wrap = styled.div`
  display: flex;
`;
