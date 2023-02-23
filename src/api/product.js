import instance from '../shared/axios';

export const productApis = {
  allProductsList: async () => await instance.get('/foods/all'),
  productDetailList: async (foodId, makersId) =>
    await instance.get(`foods?foodId=${foodId}&makersId=${makersId}`),
  modifyProductDetail: async data => await instance.put('foods', data),
  deleteProduct: async data => await instance.delete('/foods', data),
  imageUpload: async (formData, config) =>
    await instance.post('admins/files/images', formData, config),
  editProductStatus: async data => await instance.post('foods/status', data),
};
