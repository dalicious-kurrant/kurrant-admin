import {recommendationApis} from 'api/recommendation';
import {useEffect, useRef, useState} from 'react';
import {GROUP_RECOMMENDATION_TITLE} from 'shared/recommendation-constants';
import ModelInfo from '../common/ModelInfo';
import PageHeader from '../common/PageHeader';
import GroupResultTable from './components/GroupResultTable';
import GroupTargetForm from './components/GroupTargetForm';

const {PageWrapper} = require('style/common.style');

const Group = () => {
  const [modelInfo, setModelInfo] = useState({});
  const [groups, setGroups] = useState([]);
  const [diningTypes, setDiningTypes] = useState([]);
  const [results, setResults] = useState([]);

  const requestParamsRef = useRef({});
  const getRequestParams = () => requestParamsRef.current;

  useEffect(() => {
    fetchModelInfo();

    async function fetchModelInfo() {
      const fetchedModelInfo = await recommendationApis.getModelInfo();
      setModelInfo(fetchedModelInfo);
      requestParamsRef.current = {version: fetchedModelInfo.version};
    }
  }, []);

  useEffect(() => {
    fetchGroups();
    fetchDiningTypes();

    async function fetchGroups() {
      const fetchedGroups = await recommendationApis.getGroups(
        getRequestParams(),
      );
      setGroups(fetchedGroups);
    }
    async function fetchDiningTypes() {
      const fetchedDiningTypes = await recommendationApis.getDiningTypes(
        getRequestParams(),
      );
      setDiningTypes(fetchedDiningTypes);
    }
  }, [modelInfo]);

  const submitTargetFormHandler = e => {
    e.preventDefault();
    setRequestParams();
    fetchGroupRecommendation();

    function setRequestParams() {
      requestParamsRef.current = {
        version: modelInfo.version,
        groups: [e.target.groups]
          .filter(element => element.checked)
          .map(element => element.value),
        diningTypes: [e.target.diningTypes]
          .filter(element => element.checked)
          .map(element => element.value),
      };
    }

    async function fetchGroupRecommendation() {
      const fetchedResult = await recommendationApis.getGroupsRecommendation(
        getRequestParams(),
      );
      setResults(fetchedResult);
      console.log(fetchedResult);
    }
  };

  const downloadHander = () => {};

  return (
    <PageWrapper>
      <PageHeader title={GROUP_RECOMMENDATION_TITLE} />
      <ModelInfo modelInfo={modelInfo} />
      <GroupTargetForm
        groups={groups}
        diningTypes={diningTypes}
        onSubmit={submitTargetFormHandler}
      />
      <GroupResultTable
        period={{from: modelInfo.startDate, to: modelInfo.endDate}}
        results={results}
        onClick={downloadHander}
      />
    </PageWrapper>
  );
};

export default Group;
