import {useGetCorporationInfo} from 'hooks/useCorporation';
import {useAtom} from 'jotai';
import React, {useEffect, useState} from 'react';
import {
  corpNameOptionAtom,
  corporationAtom,
  exelCorporationAtom,
} from 'utils/store';

import CorpExelTable from './components/CorpExelTable';

import CorpTable from './components/CorpTable';

const Company = () => {
  const [page, setPage] = useState(1);
  const [nameOption, setNameOption] = useAtom(corpNameOptionAtom);
  const [corporation, setCorporation] = useAtom(corporationAtom);
  const [exelCorporation, setExelCorporation] = useAtom(exelCorporationAtom);

  const name = nameOption && `&groupId=${nameOption}`;
  const {
    data: corpList,
    isSuccess,
    refetch,
  } = useGetCorporationInfo(2000, page, name && name);
  console.log(corpList);
  useEffect(() => {
    setCorporation(corpList);
  }, [corpList, setCorporation]);

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
