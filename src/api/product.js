import instance from '../shared/axios';

export const productApis = {
  allProductsList: async (limit, page) =>
    await instance.get(`/foods/all?limit=${limit}&page=${page}`),
  productDetailList: async (foodId, makersId) =>
    await instance.get(`foods?foodId=${foodId}&makersId=${makersId}`),
  modifyProductDetail: async (formData, config) =>
    await instance.put('foods', formData, config),
  deleteProduct: async data => await instance.delete('/foods', data),
  imageUpload: async (formData, config) =>
    await instance.post('admins/files/images', formData, config), // 안쓰는듯
  editProductStatus: async data => await instance.post('foods/status', data),
  exelProductData: async data => await instance.post('foods/mass', data),
};
