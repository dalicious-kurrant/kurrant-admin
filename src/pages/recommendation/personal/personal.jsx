import {useEffect, useRef, useState} from 'react';
import ModelInfo from '../common/ModelInfo';
import PageHeader from '../common/PageHeader';
import PersonalSourceForm from './components/PersonalSourceForm';
import PersonalTargetForm from './components/PersonalTargetForm';
import {PERSONAL_RECOMMENDATION_TITLE} from '../../../shared/recommendation-constants';
import FoodCards from './components/FoodCards';
import PersonalResultTable from './components/PersonalResultTable';
import * as XLSX from 'xlsx';
import {PageWrapper} from 'style/common.style';

const Personal = ({recommendationService: rs}) => {
  const [modelInfo, setModelInfo] = useState({});
  const [groups, setGroups] = useState([]);
  const [diningTypes, setDiningTypes] = useState([]);
  const [makers, setMakers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [results, setResults] = useState([]);

  const requestParamsRef = useRef({});
  const getRequestParams = () => requestParamsRef.current;

  useEffect(() => {
    fetchModelInfo();

    async function fetchModelInfo() {
      const fetchedModelInfo = await rs.getModelInfo();
      setModelInfo(fetchedModelInfo);
      requestParamsRef.current = {version: fetchedModelInfo.version};
    }
  }, [rs]);

  useEffect(() => {
    fetchGroups();
    fetchDiningTypes();

    async function fetchGroups() {
      const fetchedGroups = await rs.getGroups(getRequestParams());
      setGroups(fetchedGroups);
    }

    async function fetchDiningTypes() {
      const fetchedDiningTypes = await rs.getDiningTypes(getRequestParams());
      setDiningTypes(fetchedDiningTypes);
    }
  }, [rs, modelInfo]);

  const submitTargetFormHandler = e => {
    e.preventDefault();

    resetResults();
    setRequestParams();
    fetchSourceFormDataByTarget();

    function resetResults() {
      setResults([]);
    }

    function setRequestParams() {
      requestParamsRef.current = {
        version: modelInfo.version,
        date: e.target.date.value,
        group: e.target.group.value,
        diningType: e.target.diningType.value,
      };
    }

    async function fetchSourceFormDataByTarget() {
      const fetchedMakers = await rs.getMakers(getRequestParams());
      setMakers(fetchedMakers);

      const fetchedFoods = await rs.getFoods(getRequestParams());
      setFoods(fetchedFoods);
    }
  };

  const submitSourceFormHandler = e => {
    e.preventDefault();

    if (validate()) {
      return;
    }
    setRequestParams();
    fetchRecommendationResult();

    function validate() {
      if (!requestParamsRef.current.date) {
        alert('추천 대상을 선택 및 조회하세요.');
        return true;
      }
      return false;
    }

    function setRequestParams() {
      requestParamsRef.current = {
        version: modelInfo.version,
        date: requestParamsRef.current.date,
        group: requestParamsRef.current.group,
        diningType: requestParamsRef.current.diningType,
        makers: [...e.target.makers]
          .filter(element => element.checked)
          .map(element => element.value),
        foods: [...e.target.foods]
          .filter(element => element.checked)
          .map(element => element.value),
      };
    }

    async function fetchRecommendationResult() {
      const fetchedResult = await rs.getPersonalRecommendation(
        getRequestParams(),
      );
      setResults(fetchedResult);
    }
  };

  const checkedMakers = makers.filter(maker =>
    requestParamsRef.current.makers?.includes(maker.id.toString()),
  );

  const checkedFoods = foods.filter(food =>
    requestParamsRef.current.foods?.includes(food.id.toString()),
  );

  const downloadHandler = () => {
    if (validate()) {
      return;
    }
    const {data, filename} = generateData();
    console.log(filename, data);
    saveXlsx(data, filename);

    function validate() {
      if (
        !requestParamsRef.current.date ||
        !requestParamsRef.current.group ||
        !requestParamsRef.current.diningType
      ) {
        alert('추천 대상을 조회해 주세요.');
        return true;
      }

      if (checkedMakers.length === 0 || checkedFoods.length === 0) {
        alert('추천 메이커스 및 음식을 조회해 주세요.');
        return true;
      }
    }

    function generateData() {
      const header = [
        [
          'Date',
          'GroupId',
          'GroupName',
          'DiningTypeId',
          'DiningTypeName',
          'UserId',
          'UserName',
          'FoodId',
          'FoodName',
          'FoodPrice',
          'FoodScore',
          'Allergies',
          'MakerId',
          'MakerName',
        ],
      ];

      const date = requestParamsRef.current.date;
      const group = groups.find(
        group => group.id.toString() === requestParamsRef.current.group,
      );
      const diningType = diningTypes.find(
        diningType =>
          diningType.id.toString() === requestParamsRef.current.diningType,
      );

      const data = results.map(result => {
        const user = result.user;
        const food = {
          ...foods.find(food => food.id === result.food.id),
          ...result.food,
        };
        const maker = makers.find(maker => maker.id === food.maker.id);

        return [
          date,
          group.id,
          group.name,
          diningType.id,
          diningType.name,
          user.id,
          user.name,
          food.id,
          food.name,
          food.price,
          food.score,
          food.allergies.join(','),
          maker.id,
          maker.name,
        ];
      });

      return {
        filename: `${date}-${group.name}-${diningType.name}.xlsx`,
        data: [...header, ...data],
      };
    }

    function saveXlsx(data, filename) {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      XLSX.utils.book_append_sheet(workbook, worksheet, '개인별 추천 결과');
      XLSX.writeFile(workbook, filename);
    }
  };

  return (
    <PageWrapper>
      <PageHeader title={PERSONAL_RECOMMENDATION_TITLE} />
      <ModelInfo modelInfo={modelInfo} />
      <PersonalTargetForm
        startDate={modelInfo.startDate}
        endDate={modelInfo.endDate}
        groups={groups}
        diningTypes={diningTypes}
        onSubmit={submitTargetFormHandler}
      />
      <PersonalSourceForm
        makers={makers}
        foods={foods}
        onSubmit={submitSourceFormHandler}
      />
      <FoodCards makers={checkedMakers} foods={checkedFoods} />
      <PersonalResultTable results={results} onClick={downloadHandler} />
    </PageWrapper>
  );
};

export default Personal;
