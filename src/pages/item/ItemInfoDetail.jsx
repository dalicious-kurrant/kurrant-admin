import {useLocation, useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import Input from '../../components/input/Input';
import styled from 'styled-components';

import {useEffect, useState} from 'react';
import withCommas from '../../utils/withCommas';
import HashTag from '../../components/hashTag/HashTag';
import {useQueryClient} from 'react-query';
import {
  useEditProductDetail,
  useGetDetailProductsList,
} from '../../hooks/useProductsList';
import ItemDetailImage from './components/ItemDetailImage';
import {useAtom} from 'jotai';
import {productDataAtom} from 'utils/store';
import {Button} from 'semantic-ui-react';

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodId = location.state.foodId;
  const makersId = location.state.makersId;

  const queryClient = useQueryClient();
  const {data: detailData} = useGetDetailProductsList(foodId, makersId);
  const {mutateAsync: editData} = useEditProductDetail();
  const listData = detailData?.data;
  const [clicked, setClicked] = useState([]);
  const [dataList, setDataList] = useAtom(productDataAtom); // 이미지
  const [sendForm, setSendForm] = useState();

  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    setValue,
  } = form;

  const foodName = watch('foodName');
  const foodPrice = watch('foodPrice');
  const discountRate = watch('discountRate');
  const discountPrice = watch('discountPrice');
  const periodDiscountRate = watch('periodDiscountRate');
  const periodDiscountPrice = watch('periodDiscountPrice');
  const customPrice = watch('customPrice');

  const modifyButton = async () => {
    const formData = new FormData();

    if (sendForm) {
      for (let i = 0; i < sendForm.length; i++) {
        formData.append('files', sendForm[i]);
      }
    }
    const data = {
      foodId: listData?.foodId,
      defaultPrice: Number(foodPrice.replace(',', '')),
      makersDiscountRate: Number(discountRate),
      periodDiscountRate: Number(periodDiscountRate),
      customPrice: Number(customPrice.replace(',', '')),
      foodTags: clicked,
      capacity: 100, // 임시로 넣어둠
      images: dataList?.foodImages,
    };

    const json = JSON.stringify(data);
    const blob = new Blob([json], {type: 'application/json'});
    formData.append('contents', blob);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };

    await editData(formData, config);
    navigate(-1);
    //queryClient.invalidateQueries('productDetail');
  };

  const deleteImage = dataUrl => {
    const newImageURL = dataList.foodImages.filter(el => el !== dataUrl);

    setDataList(prev => ({
      ...prev,
      foodImages: [...newImageURL],
    }));
  };

  useEffect(() => {
    setValue('foodName', listData?.foodName);
    setValue('foodPrice', withCommas(listData?.foodPrice));
    setValue(
      'discountRate',
      listData?.makersDiscountRate === 0 ? '0' : listData?.makersDiscountRate,
    );
    setValue(
      'discountPrice',
      withCommas(
        listData?.makersDiscountPrice === 0
          ? '0'
          : listData?.makersDiscountPrice,
      ),
    );
    setValue(
      'periodDiscountRate',
      listData?.periodDiscountRate === 0 ? '0' : listData?.periodDiscountRate,
    );
    setValue(
      'periodDiscountPrice',
      withCommas(
        listData?.periodDiscountPrice === 0
          ? '0'
          : listData?.periodDiscountPrice,
      ),
    );
    setValue(
      'customPrice',
      withCommas(listData?.customPrice === 0 ? '0' : listData?.customPrice),
    );
    setClicked(listData?.foodTags);

    setDataList(detailData?.data);
  }, [
    listData?.customPrice,
    listData?.foodName,
    listData?.foodPrice,
    listData?.makersDiscountPrice,
    listData?.makersDiscountRate,
    listData?.periodDiscountPrice,
    listData?.periodDiscountRate,
    listData?.foodTags,
    setValue,
    listData?.foodImages,

    setDataList,
    detailData?.data,
  ]);
  return (
    <Wrap>
      <Container>
        <div>
          <TagTitle>정기식 수정</TagTitle>
        </div>
        <InputWrap>
          <FormProvider {...form}>
            <Input name="foodName" label="메뉴명" width="200px" readOnly />
            <Input name="foodPrice" label="매장가" />
            <Input name="discountRate" label="할인율" />
            <Input name="discountPrice" label="할인가" readOnly />
            <Input name="periodDiscountRate" label="기간할인율" />
            <Input name="periodDiscountPrice" label="기간할인가" readOnly />
            <Input name="customPrice" label="커스텀가" />
          </FormProvider>
        </InputWrap>
        <div>
          <TagTitle>해시태그 등록</TagTitle>
          <HashTagWrap>
            <HashTag clicked={clicked} setClicked={setClicked} />
          </HashTagWrap>
        </div>
        <div>
          <TagTitle>이미지 등록</TagTitle>

          <ImageWrap>
            {dataList &&
              dataList?.foodImages.map(el => {
                return (
                  <div key={el}>
                    <img src={el} alt="기존이미지" />
                    <Button
                      content="삭제"
                      onClick={() => {
                        deleteImage(el);
                      }}
                    />
                  </div>
                );
              })}
          </ImageWrap>

          <ItemDetailImage setSendForm={setSendForm} />
        </div>
        <ModifyButtonWrap>
          <ModifyButton onClick={modifyButton}>수정하기</ModifyButton>
        </ModifyButtonWrap>
      </Container>
    </Wrap>
  );
};

export default ProductDetailPage;

const Wrap = styled.div`
  flex-wrap: wrap;
  padding-top: 60px;
  padding-bottom: 100px;
`;

const Container = styled.div`
  width: 80%;
  margin: auto;
`;
const InputWrap = styled.div`
  display: flex;
`;

const TagTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: #f2994a;
  margin: 50px 0px;
`;

const HashTagWrap = styled.div`
  width: 100%;
  //padding-right: 40px;
`;
const ModifyButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 100px;
`;
const ModifyButton = styled.div`
  border: 0.5px solid #c8c8d2;
  background: linear-gradient(270deg, #0a0aa4 0%, #3d00e6 57.86%, #5a1eff 100%);
  border-radius: 8px;
  padding: 12px 48px;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;

const ImageWrap = styled.div`
  display: flex;

  img {
    width: 200px;
    height: 200px;
    object-fit: cover;
  }
`;
