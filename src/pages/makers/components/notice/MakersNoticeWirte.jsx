import EditorBox from 'pages/announcement/components/EditorBox';
import {PageWrapper} from 'style/common.style';
import DropdownBox from './Dropdown';
import {useState} from 'react';

import {useLocation, useNavigate} from 'react-router-dom';
import {useMakersNoticeModify, useMakersNoticePost} from 'hooks/uesNotice';

const MakersNoticeWrite = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [selectMakers, setSelectMakers] = useState(null);

  const {mutateAsync: noticePost} = useMakersNoticePost();
  const {mutateAsync: modifyPost} = useMakersNoticeModify();

  const goBack = () => {
    navigate(-1);
  };
  const addNoticeHandle = async (title, content) => {
    const data = {
      title: title,
      content: content,
      makersId: selectMakers,
      boardType: selectType,
      isStatus: selectStatus,
    };

    if (route.state) {
      const modiData = {
        data: data,
        id: route.state.id,
      };
      console.log(modiData);
      await modifyPost(modiData);
    } else {
      await noticePost(data);
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
        selectMakers={selectMakers}
        setSelectMakers={setSelectMakers}
      />
      <EditorBox editData={route.state} addButton={addNoticeHandle} />
    </PageWrapper>
  );
};
export default MakersNoticeWrite;
