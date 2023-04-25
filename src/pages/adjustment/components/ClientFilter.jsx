import {useSpotsList} from 'hooks/useAdjustment';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {Button, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedYearMonthDate} from 'utils/dateFormatter';
import {
  endMonthClientAtom,
  selectClientClientAtom,
  selectModifyClientAtom,
  selectStatusClientAtom,
  startMonthClientAtom,
} from 'utils/store';

const ClientFilter = () => {
  const day = new Date();
  const days = formattedYearMonthDate(day);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [startMonth, setStartMonth] = useAtom(startMonthClientAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthClientAtom);
  const [selectClient, setSelectClient] = useAtom(selectClientClientAtom);
  const [selectStatus, setSelectStatus] = useAtom(selectStatusClientAtom);
  const [selectModify, setSelectModify] = useAtom(selectModifyClientAtom);
  const {data: spotsList} = useSpotsList();

  const statusData = [
    {key: 0, text: '전체', value: 99},
    {key: 1, text: '정산 신청 완료', value: 0},
    {key: 2, text: '거래명세서 확정 대기', value: 1},
    {key: 3, text: '정산금 입금 완료', value: 2},
    {key: 4, text: '추가 요청 처리 완료', value: 3},
    {key: 5, text: '거래명세서 확정', value: 4},
  ];

  const modifyStatus = [
    {key: 0, text: '전체', value: 0},
    {key: 1, text: '수정요청 있음', value: true},
    {key: 2, text: '수정요청 없음', value: false},
  ];

  const resetFilter = () => {
    setStartMonth(days);
    setEndMonth(days);
    setSelectClient([]);
    setSelectStatus(null);
    setSelectModify(null);
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
        <div style={{alignItems: 'center', display: 'flex', marginRight: 24}}>
          -
        </div>
        <InputBlock>
          <InputBox
            placeholder="월"
            type="month"
            value={endMonth}
            onChange={e => setEndMonth(e.target.value)}
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
            value={selectClient}
            onChange={(e, data) => {
              setSelectClient(data.value);
            }}
          />
        )}
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="상태"
          fluid
          selection
          search
          options={statusData}
          value={selectStatus}
          onChange={(e, data) => {
            setSelectStatus(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="수정요청"
          fluid
          selection
          search
          options={modifyStatus}
          value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        />
      </InputBlock>

      <Button content="필터초기화" color="blue" onClick={resetFilter} />
    </Wrap>
  );
};

export default ClientFilter;
const InputBox = styled.input`
  display: flex;
  padding-top: 9px;
  padding-bottom: 9px;
  border: 1px solid #ccc;
  border-radius: 5px;
  //text-align: end;
  //padding-right: 8px;
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
