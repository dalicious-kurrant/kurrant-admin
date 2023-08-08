import EditorBox from 'pages/announcement/components/EditorBox';
import {PageWrapper} from 'style/common.style';
import DropdownBox from './Dropdown';
import {useState} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import {useCientNoticePost, useClientNoticeModify} from 'hooks/uesNotice';

const CompanyNoticeWrite = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [selectSpots, setSelectSpots] = useState([]);
  const {mutateAsync: addNotice} = useCientNoticePost();
  const {mutateAsync: modifyNotice} = useClientNoticeModify();

  const goBack = () => {
    navigate(-1);
  };

  const addNoticeHandle = async (title, content) => {
    const data = {
      title: title,
      content: content,
      groupIds: selectSpots,
      boardType: selectType,
      isStatus: selectStatus,
    };

    if (route.state) {
      const modiData = {
        data: data,
        id: route.state.id,
      };
      console.log(modiData);
      await modifyNotice(modiData);
    } else {
      console.log(data);
      await addNotice(data);
    }
    goBack();
  };
  return (
    <PageWrapper>
      <DropdownBox
        editData={route.state}
        selectType={selectType}
        setSelectType={setSelectType}
        selectStatus={selectStatus}
        setSelectStatus={setSelectStatus}
        selectSpots={selectSpots}
        setSelectSpots={setSelectSpots}
      />
      <EditorBox addButton={addNoticeHandle} editData={route.state} />
    </PageWrapper>
  );
};
export default CompanyNoticeWrite;
