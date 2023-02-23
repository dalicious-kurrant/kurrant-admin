import {useAtom} from 'jotai';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {productImageAtom} from 'utils/store';
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

export function useDeleteProductList() {
  return useMutation(data => {
    console.log(data, '2323');
    return productApis.deleteProduct(data);
  });
}

export function useImageUpload() {
  const [imgData, setImgData] = useAtom(productImageAtom);
  return useMutation(
    (formData, config) => productApis.imageUpload(formData, config),
    {
      onSuccess: res => {
        setImgData(res.data);
        console.log(res, '0000');
      },
    },
  );
}

export function useEditProductStatus() {
  const queryClient = useQueryClient();
  return useMutation(data => productApis.editProductStatus(data), {
    onSuccess: () => {
      queryClient.invalidateQueries('allList');
    },
  });
}
