import {useMutation, useQuery} from 'react-query';
import {productApis} from '../api/product';

export function useGetAllProductsList() {
  return useQuery('allList', () => {
    return productApis.allProductsList();
  });
}

export function useGetDetailProductsList(foodId, makersId) {
  return useQuery('detailList', () => {
    return productApis.productDetailList(foodId, makersId);
  });
}

export function useEditProductDetail() {
  return useMutation(data => {
    return productApis.modifyProductDetail(data);
  });
}
