import {useMutation, useQuery, useQueryClient} from 'react-query';
import {productApis} from '../api/product';

export function useGetAllProductsList(limit, page, makersId) {
  return useQuery('allList', () => {
    return productApis.allProductsList(limit, page, makersId);
  });
}
export function useGetExportProductsList() {
  return useQuery('exportList', () => {
    return productApis.exportProductsList();
  });
}

export function useGetDetailProductsList(foodId, makersId) {
  return useQuery(
    'detailList',
    () => productApis.productDetailList(foodId, makersId),
    {
      staleTime: 0,
    },
  );
}

export function useEditProductDetail() {
  const queryClient = useQueryClient();
  return useMutation(
    (formData, config) => productApis.modifyProductDetail(formData, config),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('detailList');
      },
      onError: () => {
        alert('잘못된 데이터가 있습니다. 다시 시도해주세요');
      },
    },
  );
}
export function useAddProductKeyword() {
  const queryClient = useQueryClient();
  return useMutation(data => productApis.addProductKeyword(data), {
    onSuccess: data => {
      // console.log(data);
      // queryClient.invalidateQueries('detailList');
    },
    onError: () => {
      alert('잘못된 키워드 입력입니다 ');
    },
  });
}

export function useDeleteProductList() {
  return useMutation(data => {
    console.log(data, '2323');
    return productApis.deleteProduct(data);
  });
}

export function useEditProductStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => productApis.editProductStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('allList');
    },
  });
}

export function useAddExelProductData() {
  return useMutation(data => productApis.exelProductData(data), {
    onError: () => {
      alert('잘못된 데이터가 있습니다. 다시 시도해주세요');
    },
  });
}
