import {useMutation, useQuery, useQueryClient} from 'react-query';
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
  const queryClient = useQueryClient();
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
