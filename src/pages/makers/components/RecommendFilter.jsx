import {useCompanyList} from 'hooks/useCompany';
import {
  useGetRecommendMakersList,
  useGetRecommendMakersName,
} from 'hooks/useRecommendMakers';
import {useAtom} from 'jotai';
import {useState} from 'react';
import {Button, Checkbox, Dropdown} from 'semantic-ui-react';
import styled from 'styled-components';
import {recommendMakersStatus, statusArray} from 'utils/statusFormatter';
import {
  recommendMakersAtom,
  recommendSpotAtom,
  recommendStatusAtom,
} from 'utils/store';

const RecommendFilter = () => {
  const [selectStatus, setSelectStatus] = useAtom(recommendStatusAtom);
  const [selectMakers, setSelectMakers] = useAtom(recommendMakersAtom);
  const [selectSpots, setSelectSpots] = useAtom(recommendSpotAtom);
  const {data: makersList} = useGetRecommendMakersName();

  const {data: companyList} = useCompanyList();
  const makersArray = makersList?.data?.map(el => {
    return {
      key: el.kakaoStoreId,
      value: el.kakaoStoreId,
      text: el.name,
    };
  });

  const spotArray = companyList?.data?.map((el, idx) => {
    return {
      key: idx,
      text: el.groupName,
      value: el.groupId,
    };
  });

  const filterReset = () => {
    setSelectStatus(null);
    setSelectMakers(null);
    setSelectSpots(null);
  };

  return (
    <DropdownWrap>
      <DropdownDiv>
        <Dropdown
          placeholder="상태"
          selection
          options={recommendMakersStatus}
          value={selectStatus}
          onChange={(e, data) => setSelectStatus(data.value)}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          placeholder="메이커스"
          selection
          options={makersArray || []}
          value={selectMakers}
          onChange={(e, data) => {
            setSelectMakers(data.value);
          }}
        />
      </DropdownDiv>
      <DropdownDiv>
        <Dropdown
          placeholder="고객사"
          selection
          options={spotArray || []}
          value={selectSpots}
          onChange={(e, data) => {
            setSelectSpots(data.value);
          }}
        />
      </DropdownDiv>
      <Button content="필터초기화" color="blue" onClick={filterReset} />
    </DropdownWrap>
  );
};

export default RecommendFilter;

const DropdownWrap = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownDiv = styled.div`
  margin-right: 12px;
`;
const CheckboxWrap = styled.div`
  margin-left: 12px;
  margin-right: 12px;

  display: flex;
`;
