import {useGetMakersInfomation} from '../../hooks/useMakers';
import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import {Table} from 'semantic-ui-react';
import {makersExelInfoAtom, makersInfoAtom} from 'utils/store';
import {BtnWrapper, PageWrapper, TableWrapper} from '../../style/common.style';
import MakersExelTable from './components/MakersExelTable';
import MakersTable from './components/MakersTable';

// 메이커스 정보 페이지
const Makers = () => {
  const [makersInformation, setMakersInformation] = useAtom(makersInfoAtom);
  const [makersExelInfo, setMakersExelInfo] = useAtom(makersExelInfoAtom);
  const {data: makersInfoList} = useGetMakersInfomation();
  console.log(makersInfoList);
  useEffect(() => {
    setMakersInformation(makersInfoList);
  }, [makersInfoList, setMakersInformation]);

  return (
    <PageWrapper>
      <BtnWrapper></BtnWrapper>
      {makersInformation && <MakersTable data={makersInfoList} />}
      {makersExelInfo && <MakersExelTable data={makersExelInfo} />}
    </PageWrapper>
  );
};

export default Makers;
