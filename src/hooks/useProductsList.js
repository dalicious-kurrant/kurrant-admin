import {useMutation, useQuery, useQueryClient} from 'react-query';
import {productApis} from '../api/product';

export function useGetAllProductsList(limit, page) {
  return useQuery('allList', () => {
    return productApis.allProductsList(limit, page);
  });
}

export function useGetDetailProductsList(foodId, makersId) {
  return useQuery('detailList', () => {
    return productApis.productDetailList(foodId, makersId);
  });
}

export function useEditProductDetail() {
  return useMutation(
    (formData, config) => productApis.modifyProductDetail(formData, config),
    {
      onSuccess: res => {
        console.log(res, '998');
      },
    },
  );
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
  return useMutation(data => {
    return productApis.exelProductData(data);
  });
}
