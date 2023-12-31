import {
  useGetCorporationInfo,
  useGetExportCorporationInfo,
} from 'hooks/useCorporation';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {
  corpNameOptionAtom,
  corporationAtom,
  corporationExportAtom,
  exelCorporationAtom,
} from 'utils/store';

import CorpExelTable from './components/CorpExelTable';

import CorpTable from './components/CorpTable';

const Company = () => {
  const [page, setPage] = useState(1);
  const [nameOption, setNameOption] = useAtom(corpNameOptionAtom);
  const [corporation, setCorporation] = useAtom(corporationAtom);
  const [, setCorporationExport] = useAtom(
    corporationExportAtom,
  );
  const [exelCorporation] = useAtom(exelCorporationAtom);

  const name = nameOption && `&groupId=${nameOption}`;
  const {
    data: corpList,
    isSuccess,
    refetch,
  } = useGetCorporationInfo(2000, page, name && name);
  
  const {data: corpExportList} = useGetExportCorporationInfo();
  // console.log(corpList);
  useEffect(() => {
    setCorporation(corpList);
    setCorporationExport(corpExportList?.data.filter(v=>v));
  }, [corpExportList?.data, corpList, setCorporation, setCorporationExport]);

  useEffect(() => {
    refetch();
  }, [refetch, nameOption, page]);

  return (
    <div>
      {corporation && (
        <CorpTable
          data={corpList}
          isSuccess={isSuccess}
          setNameOption={setNameOption}
          nameOption={nameOption}
          refetch={refetch}
          setPage={setPage}
          page={page}
          name={name}
        />
      )}
      {exelCorporation && <CorpExelTable data={exelCorporation} />}
    </div>
  );
};

export default Company;
