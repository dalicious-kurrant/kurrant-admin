import Input from 'components/input/Input';
import {useGetFilterList} from 'hooks/useMySpot';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';
import {Button, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';

import {
  MySpotCityAtom,
  MySpotCountyAtom,
  MySpotVillageAtom,
  MySpotZipcodeAtom,
  maxUserAtom,
  minUserAtom,
} from 'utils/store';

const Filter = ({click, setClick}) => {
  const form = useForm({
    mode: 'all',
  });
  const {watch, setValue} = form;

  const min = watch('min');
  const max = watch('max');

  const [cityList, setCityList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [zipcodeList, setZipcodeList] = useState([]);
  const [selectCity, setSelectCity] = useAtom(MySpotCityAtom);
  const [selectCounty, setSelectCounty] = useAtom(MySpotCountyAtom);
  const [selectVillage, setSelectVillage] = useAtom(MySpotVillageAtom);
  const [selectZipcode, setSelectZipcode] = useAtom(MySpotZipcodeAtom);

  const [, SetMinUser] = useAtom(minUserAtom);
  const [, SetMaxUser] = useAtom(maxUserAtom);

  const {data: filterData, refetch} = useGetFilterList(
    selectCity,
    selectCounty,
    selectVillage,
  );

  const userFilter = () => {
    if (max !== undefined && max !== '') {
      SetMinUser(min);
      SetMaxUser(max);
      setClick(false);
    }
  };

  const resetFilter = () => {
    setValue('min', '');
    setValue('max', '');
    setSelectCity([]);
    setSelectCounty([]);
    setSelectVillage([]);
    setSelectZipcode([]);
    SetMinUser('');
    SetMaxUser('');
  };

  useEffect(() => {
    setCityList(
      filterData?.data?.cityInfos?.map((v, i) => {
        return {key: v.id, text: v.name, value: v.id};
      }),
    );
    setCountyList(
      filterData?.data?.countyInfos?.map((v, i) => {
        return {key: v.id, text: v.name, value: v.id};
      }),
    );
    setVillageList(
      filterData?.data?.villageInfos?.map((v, i) => {
        return {key: v.id, text: v.name, value: v.id};
      }),
    );
    setZipcodeList(
      filterData?.data?.zipcodeInfos?.map((v, i) => {
        return {key: v.id, text: v.name, value: v.id};
      }),
    );
  }, [
    filterData?.data?.cityInfos,
    filterData?.data?.countyInfos,
    filterData?.data?.villageInfos,
    filterData?.data?.zipcodeInfos,
  ]);

  useEffect(() => {
    refetch();
  }, [refetch, selectCity, selectCounty, selectVillage]);
  return (
    <Wrap>
      <div
        style={{display: 'flex', justifyContent: 'flex-end', marginBottom: 12}}>
        <Button content="필터초기화" color="blue" onClick={resetFilter} />
      </div>
      <div style={{display: 'flex'}}>
        <InputBlock>
          <Dropdown
            placeholder="시/도"
            fluid
            selection
            search
            multiple
            options={cityList || []}
            value={selectCity}
            onChange={(e, data) => {
              setSelectCity(data.value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <Dropdown
            placeholder="군/구"
            fluid
            selection
            search
            multiple
            options={countyList || []}
            value={selectCounty}
            onChange={(e, data) => {
              setSelectCounty(data.value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <Dropdown
            placeholder="동/읍/리"
            fluid
            selection
            search
            multiple
            options={villageList || []}
            value={selectVillage}
            onChange={(e, data) => {
              setSelectVillage(data.value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <Dropdown
            placeholder="우편번호"
            fluid
            selection
            search
            multiple
            options={zipcodeList || []}
            value={selectZipcode}
            onChange={(e, data) => {
              setSelectZipcode(data.value);
            }}
          />
        </InputBlock>
        <InputBlock>
          <Box onClick={() => setClick(true)}>
            {max === undefined || max === '' ? (
              <PlaceHolderText>신청 유저 수</PlaceHolderText>
            ) : (
              <div>
                {min}
                {max !== undefined && max !== '' && ' ~ '}
                {max}
              </div>
            )}

            {!(min !== undefined || max !== undefined) && <Arrow>▾</Arrow>}
          </Box>
          {click && (
            <UserDrop>
              <FormProvider {...form}>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                  <div
                    style={{
                      display: 'flex',
                      width: '80%',
                      justifyContent: 'space-between',
                    }}>
                    <div>최소(명)</div>
                    <div> ~ </div> <div>최대(명)</div>
                  </div>
                </div>
                <InputWrap>
                  <Input width="80px" name="min" type="number" />

                  <Input width="80px" name="max" type="number" />
                </InputWrap>
                <ButtonWrap>
                  <Button
                    content="확인"
                    color="blue"
                    size="tiny"
                    onClick={userFilter}
                  />
                </ButtonWrap>
              </FormProvider>
            </UserDrop>
          )}
          {/* <Dropdown
          placeholder="신청 유저 수"
          fluid
          selection
          search
          //options={modifyStatus}
          //value={selectModify}
          onChange={(e, data) => {
            setSelectModify(data.value);
          }}
        /> */}
        </InputBlock>
      </div>
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
  flex-direction: column;
  width: 80%;
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
