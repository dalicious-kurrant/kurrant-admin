import {useGetAdminFilterList} from 'hooks/useMySpotAdmin';
import {useAtom} from 'jotai';
import {useEffect, useState} from 'react';

import {Button, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';

import {
  MySpotCityAdminAtom,
  MySpotCountyAdminAtom,
  MySpotNameAdminAtom,
  MySpotStatusAdminAtom,
  MySpotVillageAdminAtom,
  MySpotZipcodeAdminAtom,
} from 'utils/store';

const Filter = ({click, setClick}) => {
  const statusData = [
    {key: 0, text: '오픈 대기', value: 0},
    {key: 1, text: '오픈', value: 1},
    {key: 2, text: '정지', value: 3},
  ];

  const [nameList, setNameList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [countyList, setCountyList] = useState([]);
  const [villageList, setVillageList] = useState([]);
  const [zipcodeList, setZipcodeList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [selectName, setSelectName] = useAtom(MySpotNameAdminAtom);
  const [selectCity, setSelectCity] = useAtom(MySpotCityAdminAtom);
  const [selectCounty, setSelectCounty] = useAtom(MySpotCountyAdminAtom);
  const [selectVillage, setSelectVillage] = useAtom(MySpotVillageAdminAtom);
  const [selectZipcode, setSelectZipcode] = useAtom(MySpotZipcodeAdminAtom);
  const [selectStatus, setSelectStatus] = useAtom(MySpotStatusAdminAtom);
  const {data: filterData, refetch} = useGetAdminFilterList(
    selectCity,
    selectCounty,
    selectVillage,
  );

  const resetFilter = () => {
    setSelectName([]);
    setSelectCity([]);
    setSelectCounty([]);
    setSelectVillage([]);
    setSelectZipcode([]);
    setSelectStatus([]);
  };

  useEffect(() => {
    setNameList(
      filterData?.data?.name?.map((v, i) => {
        return {key: v.id, text: v.name, value: v.id};
      }),
    );
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
    setStatusList(
      filterData?.data?.status?.map((v, i) => {
        return {key: v.code, text: v.status, value: v.code};
      }),
    );
  }, [
    filterData?.data?.cityInfos,
    filterData?.data?.countyInfos,
    filterData?.data?.name,
    filterData?.data?.status,
    filterData?.data?.villageInfos,
    filterData?.data?.zipcodeInfos,
  ]);
  useEffect(() => {
    refetch();
  }, [refetch, selectCity, selectCounty, selectVillage]);
  return (
    <Wrap>
      <InputBlock>
        <Dropdown
          placeholder="마이 스팟 존 이름"
          fluid
          selection
          search
          multiple
          options={nameList || []}
          value={selectName}
          onChange={(e, data) => {
            setSelectName(data.value);
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
          options={cityList || []}
          value={selectCity}
          onChange={(e, data) => {
            setSelectCity(data.value);
          }}
        />
      </InputBlock>
      <InputBlock>
        <Dropdown
          placeholder="시/군/구"
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
        <Dropdown
          placeholder="상태"
          fluid
          selection
          search
          multiple
          options={statusList || []}
          value={selectStatus}
          onChange={(e, data) => {
            setSelectStatus(data.value);
          }}
        />
      </InputBlock>

      <Button content="필터초기화" color="blue" onClick={resetFilter} />
    </Wrap>
  );
};

export default Filter;

const InputBlock = styled.div`
  min-width: 200px;
  font-size: 14px;
  margin-right: 24px;
`;

const Wrap = styled.div`
  display: flex;
  //justify-content: space-between;
`;
