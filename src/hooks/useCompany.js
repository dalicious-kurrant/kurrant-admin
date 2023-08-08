import {companyApis} from 'api/company';
import {useQuery} from 'react-query';

export function useCompanyList() {
  return useQuery('companyList', () => {
    return companyApis.companyList();
  });
}
