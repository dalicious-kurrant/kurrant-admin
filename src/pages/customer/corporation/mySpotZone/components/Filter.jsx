import Input from 'components/input/Input';
import {useMakersList} from 'hooks/useAdjustment';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {FormProvider, useForm, useFormContext} from 'react-hook-form';
import {Button, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {formattedYearMonthDate} from 'utils/dateFormatter';
import {
  endMonthAtom,
  selectClientAtom,
  selectModifyAtom,
  selectStatusAtom,
  startMonthAtom,
} from 'utils/store';

const Filter = ({click, setClick}) => {
  const statusData = [
    {key: 0, text: '오픈 대기', value: 0},
    {key: 1, text: '오픈', value: 1},
  ];

  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const min = watch('min');
  const max = watch('max');
  console.log(min);
  const [groupInfoList, setGroupInfoList] = useState([]);
  const [startMonth, setStartMonth] = useAtom(startMonthAtom);
  const [endMonth, setEndMonth] = useAtom(endMonthAtom);
  const [selectClient, setSelectClient] = useAtom(selectClientAtom);
  const [selectStatus, setSelectStatus] = useAtom(selectStatusAtom);
  const [selectModify, setSelectModify] = useAtom(selectModifyAtom);

  const userFilter = () => {
    setClick(false);
  };
  const resetFilter = () => {
    setSelectClient([]);
    setSelectStatus(null);
    setSelectModify(null);
  };

  //   useEffect(() => {
  //     setGroupInfoList(
  //       makersList?.data.map(v => {
  //         return {key: v.makersId, text: v.makersName, value: v.makersId};
  //       }),
  //     );
  //   }, [makersList]);
  return (
    <Wrap>
      <InputBlock>
        <Dropdown
          placeholder="마이 스팟 존 이름"
          fluid
          selection
          search
          //options={modifyStatus}
          //value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="시/도"
          fluid
          selection
          search
          multiple
          options={groupInfoList}
          //value={selectClient}
          onChange={(e, data) => {
            setSelectClient(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="군/구"
          fluid
          selection
          search
          //options={statusData}
          //value={selectStatus}
          onChange={(e, data) => {
            setSelectStatus(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="동/읍/리"
          fluid
          selection
          search
          //options={modifyStatus}
          //value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="우편번호"
          fluid
          selection
          search
          //options={modifyStatus}
          //value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="상태"
          fluid
          selection
          search
          options={statusData}
          //value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        />
      </InputBlock>

      <Button content="필터초기화" color="blue" onClick={resetFilter} />
    </Wrap>
  );
};

export default Filter;
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
  //justify-content: space-between;
`;

const Box = styled.div`
  width: 198px;
  height: 38px;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 4px;
  padding: 8px 14px;
  position: relative;
  box-sizing: border-box;
`;

const PlaceHolderText = styled.span`
  color: rgba(191, 191, 191, 0.87);
`;

const UserDrop = styled.div`
  z-index: 2;
  position: absolute;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 4px;
  padding: 12px 0px;

  background-color: white;
  width: 198px;
`;

const InputWrap = styled.div`
  display: flex;
  justify-content: center;

  padding-left: 8px;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 12px;
`;

const Arrow = styled.div`
  position: absolute;
  bottom: 10px;
  right: 11px;
`;
