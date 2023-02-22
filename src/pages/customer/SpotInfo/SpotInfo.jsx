import CRUDBundle from 'common/CRUD/Register/CRUDBundle';
import {makeInitialInput} from 'common/CRUD/Register/logics/RegisterLogics';
import Register from 'common/CRUD/Register/Register';

import {TableCheckboxStatusAtom} from 'common/Table/store';
import Table from 'common/Table/Table';

import {useAtom} from 'jotai';
import {useState} from 'react';

import {useLocation} from 'react-router';

import useModal from '../../../hooks/useModal';
import {
  BtnWrapper,
  PageWrapper,
  TableWrapper,
} from '../../../style/common.style';
import {SpotInfoFieldsData, SpotInfoFieldsToOpen} from './SpotInfoData';
import {checkedValue, idsToDelete, numberOfTrues} from './SpotInfoLogics';
import {SpotInfoDataAtom} from './store';
import useMutate from './useMutate';
import useSpotInfoQuery from './useSpotInfoQuery';

const SpotInfo = () => {
  const {onActive} = useModal();
  const [spotInfoData, setSpotInfoData] = useAtom(SpotInfoDataAtom);
  const {pathname} = useLocation();
  const [content, setContent] = useState({name: '', shortIntroduction: ''});
  const [showRegister, setShowRegister] = useState(false);
  const [checkboxStatus] = useAtom(TableCheckboxStatusAtom);
  const [dataToEdit, setDataToEdit] = useState({});

  const [registerStatus, setRegisterStatus] = useState('register');

  const {status, isLoading} = useSpotInfoQuery();

  const {deleteMutate, submitMutate, editMutate} = useMutate();

  const handleBundleClick = buttonStatus => {
    numberOfTrues({...checkboxStatus});

    if (buttonStatus === 'register') {
      setDataToEdit(makeInitialInput([...spotInfoData][0]));
      setRegisterStatus(buttonStatus);
      setShowRegister(true);
    } else if (buttonStatus === 'edit') {
      if (numberOfTrues({...checkboxStatus}) === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
      } else if (numberOfTrues({...checkboxStatus}) !== 1) {
        // console.log(numberOfTrues({...checkboxStatus}));

        window.confirm("체크박스가 '하나만' 선택되어 있는지 확인해주세요 ");
      } else if (numberOfTrues({...checkboxStatus}) === 1) {
        setDataToEdit(checkedValue(checkboxStatus, spotInfoData));
        setRegisterStatus(buttonStatus);
        setShowRegister(true);
      }
    } else if (buttonStatus === 'delete') {
      if (numberOfTrues === 0) {
        window.confirm(
          "아래의 기업 가입 리스트중에 체크박스를 눌러 수정할 기업을 '하나만' 선택해주세요.",
        );
        return;
      }

      if (window.confirm('삭제하시겠습니까?')) {
        idsToDelete({...checkboxStatus}).forEach(value => {
          deleteMutate(value);
        });
      } else {
        return;
      }
    }
  };

  const handleClose = () => {
    setShowRegister(false);
  };

  if (isLoading)
    return (
      <>
        {' '}
        <div>로딩중입니다..</div>{' '}
      </>
    );

  if (status === 'error')
    return (
      <div>
        에러가 났습니다 ㅠㅠ 근데 다시 새로고침해보면 데이터 다시 나올수도
        있어요
      </div>
    );

  return (
    <PageWrapper>
      <BtnWrapper>
        {/* <Button color="red" content="삭제" icon="delete" onClick={onActive} /> */}
      </BtnWrapper>

      <div>
        {/* {isCRUDAvaliable(pathname) && (
          
        )} */}
        <CRUDBundle
          handleBundleClick={handleBundleClick}
          showRegister={showRegister}
        />

        {showRegister && (
          <Register
            registerStatus={registerStatus}
            submitMutate={submitMutate}
            editMutate={editMutate}
            handleClose={handleClose}
            data={dataToEdit}
            fieldsToOpen={SpotInfoFieldsToOpen}
            fieldsData={SpotInfoFieldsData}
          />
        )}
      </div>

      <TableWrapper>
        {/* <Pagination
          dataTotalLength={dataTotalLength}
          page={page}
          setPage={setPage}
          dataLimit={dataLimit}
          setDataLimit={setDataLimit}
          pageList={pageList}
          handleButtonClick={handleButtonClick}
          handleGoToEdge={handleGoToEdge}
          handleMove={handleMove}
          selectOptionArray={[1, 2, 4, 10]}
        /> */}

        {/* {!!dataList && dataList.length !== 0 && (
          <Table tableFieldsInput={spotInfoFields} tableDataInput={dataList} />
        )} */}
        {!!spotInfoData && spotInfoData.length !== 0 && (
          <Table
            fieldsInput={SpotInfoFieldsToOpen}
            dataInput={spotInfoData}
            // isMemo={true}
            // handleChange={}
          />
        )}
      </TableWrapper>
    </PageWrapper>
  );
};

export default SpotInfo;
