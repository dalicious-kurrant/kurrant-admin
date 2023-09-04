import {useGetMakersInformation} from '../../hooks/useMakers';
import {useAtom} from 'jotai';
import React, {useEffect} from 'react';
import {makersExelInfoAtom, makersInfoAtom} from 'utils/store';
import {BtnWrapper, PageWrapper} from '../../style/common.style';
import MakersExelTable from './components/MakersExelTable';
import MakersTable from './components/MakersTable';

// 메이커스 정보 페이지
const Makers = () => {
  const [makersInformation, setMakersInformation] = useAtom(makersInfoAtom);
  const [makersExelInfo, ] = useAtom(makersExelInfoAtom);
  const {data: makersInfoList} = useGetMakersInformation();

  useEffect(() => {
    setMakersInformation(makersInfoList);
  }, [makersInfoList, setMakersInformation]);

  return (
    <PageWrapper>
      <BtnWrapper></BtnWrapper>
      {makersInformation && (
        <MakersTable data={makersInformation} setData={setMakersInformation} />
      )}
      {makersExelInfo && <MakersExelTable data={makersExelInfo} />}
    </PageWrapper>
  );
};

export default Makers;
