import {PageWrapper} from 'style/common.style';
import DropdownBox from './Dropdown';
import EditorBox from './EditorBox';
import {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAppNoticeModify, useAppNoticePost} from 'hooks/uesNotice';

const AppNoticeWrite = () => {
  const route = useLocation();
  const navigate = useNavigate();
  const [selectType, setSelectType] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [selectSpots, setSelectSpots] = useState([]);
  const [checkValue, setCheckValue] = useState([]);
  const {mutateAsync: addNotice} = useAppNoticePost();
  const {mutateAsync: modifyNotice} = useAppNoticeModify();

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
      boardOption: checkValue,
    };

    if (route.state) {
      const modiData = {
        data: data,
        id: route.state.id,
      };
      // console.log(modiData);
      await modifyNotice(modiData);
    } else {
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
        checkValue={checkValue}
        setCheckValue={setCheckValue}
      />
      <EditorBox
        editData={route.state}
        addButton={addNoticeHandle}
        selectType={selectType}
        selectSpots={selectSpots}
        from={'app'}
      />
    </PageWrapper>
  );
};
export default AppNoticeWrite;
