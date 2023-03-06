import {useLocation, useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import Input from '../../components/input/Input';
import styled from 'styled-components';
import {useEffect, useState} from 'react';
import withCommas from '../../utils/withCommas';
import HashTag from '../../components/hashTag/HashTag';
import {
  useEditProductDetail,
  useGetDetailProductsList,
} from '../../hooks/useProductsList';
import ItemDetailImage from './components/ItemDetailImage';
import {useAtom} from 'jotai';
import {productDataAtom} from 'utils/store';
import {Button, Label} from 'semantic-ui-react';

const ProductDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const foodId = location.state.foodId;
  const makersId = location.state.makersId;

  const {data: detailData} = useGetDetailProductsList(foodId, makersId);
  const {mutateAsync: editData} = useEditProductDetail();
  const listData = detailData?.data;
  const [clicked, setClicked] = useState([]);
  const [dataList, setDataList] = useAtom(productDataAtom); // 이미지
  const [sendForm, setSendForm] = useState([]);
  const [text, setText] = useState('');

  const form = useForm({
    mode: 'all',
  });
  const {
    formState: {errors},
    watch,
    setValue,
  } = form;

  // const foodName = watch('foodName');
  const foodPrice = watch('foodPrice');
  const discountRate = watch('discountRate');
  // const discountPrice = watch('discountPrice');
  const periodDiscountRate = watch('periodDiscountRate');
  // const periodDiscountPrice = watch('periodDiscountPrice');
  const membershipRate = watch('membershipRate');
  const customPrice = watch('customPrice');
  const morningCapacity = watch('morning');
  const lunchCapacity = watch('lunch');
  const dinnerCapacity = watch('dinner');

  const modifyButton = async () => {
    const formData = new FormData();

    if (sendForm) {
      for (let i = 0; i < sendForm.length; i++) {
        formData.append('files', sendForm[i]);
      }
    }

    //console.log(sendForm, '0000');
    const data = {
      foodId: listData?.foodId,
      defaultPrice: Number(foodPrice.replace(',', '')),
      makersDiscountRate: Number(discountRate),
      periodDiscountRate: Number(periodDiscountRate),
      customPrice: Number(customPrice.replace(',', '')),
      membershipDiscountRate: Number(membershipRate),
      foodTags: clicked,
      morningCapacity: morningCapacity,
      lunchCapacity: lunchCapacity,
      dinnerCapacity: dinnerCapacity,
      images: dataList?.foodImages,
      description: text,
    };

    const json = JSON.stringify(data);
    const blob = new Blob([json], {type: 'application/json'});
    formData.append('contents', blob);

    const config = {
      headers: {'Content-Type': 'multipart/form-data'},
    };

    await editData(formData, config);
    navigate(-1);
  };

  const deleteImage = dataUrl => {
    const newImageURL = dataList.foodImages.filter(el => el !== dataUrl);
    setDataList(prev => ({
      ...prev,
      foodImages: [...newImageURL],
    }));
  };

  const dscOnChange = e => {
    setText(e.target.value);
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
      'membershipPrice',
      withCommas(
        listData?.membershipDiscountPrice === 0
          ? '0'
          : listData?.membershipDiscountPrice,
      ),
    );
    setValue(
      'membershipRate',
      listData?.membershipDiscountRate === 0
        ? '0'
        : listData?.membershipDiscountRate,
    );
    setValue(
      'customPrice',
      withCommas(listData?.customPrice === 0 ? '0' : listData?.customPrice),
    );
    setClicked(listData?.foodTags);
    setValue(
      'morning',
      listData?.morningCapacity === 0 ? '0' : listData?.morningCapacity,
    );
    setValue(
      'lunch',
      listData?.lunchCapacity === 0 ? '0' : listData?.lunchCapacity,
    );
    setValue(
      'dinner',
      listData?.dinnerCapacity === 0 ? '0' : listData?.dinnerCapacity,
    );
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
    setDataList,
    detailData?.data,
    listData?.morningCapacity,
    listData?.lunchCapacity,
    listData?.dinnerCapacity,
    listData?.membershipDiscountPrice,
    listData?.membershipDiscountRate,
  ]);
  return (
    <Wrap>
      <Container>
        <div>
          <TagTitle>정기식 수정</TagTitle>
        </div>
        <InputWrap>
          <FormProvider {...form}>
            <div>
              <PriceWrap>
                <Input name="foodName" label="메뉴명" width="250px" readOnly />
                <Input name="foodPrice" label="매장가" />
                <Input name="membershipRate" label="멤버십 할인율" />
                <Input name="membershipPrice" label="멤버십 할인가" readOnly />
                <Input name="discountRate" label="매장 할인율" />
                <Input name="discountPrice" label="매장 할인가" readOnly />
                <Input name="periodDiscountRate" label="이벤트 할인율" />
                <Input
                  name="periodDiscountPrice"
                  label="이벤트 할인가"
                  readOnly
                />
                <Input name="customPrice" label="커스텀가" />
              </PriceWrap>
              <CapaWrap>
                <Input name="morning" label="아침식사 케파" />
                <Input name="lunch" label="점심식사 케파" />
                <Input name="dinner" label="저녁식사 케파" />
              </CapaWrap>
            </div>
          </FormProvider>
        </InputWrap>
        <div>
          <TagTitle>해시태그 등록</TagTitle>
          <HashTagWrap>
            <HashTag clicked={clicked} setClicked={setClicked} />
          </HashTagWrap>
        </div>
        <div>
          <TagTitle>이미지 등록 (최대 6장)</TagTitle>
          <Label content="기존 이미지" color="blue" />
          <ImageWrap>
            {dataList &&
              dataList?.foodImages.map((el, i) => {
                return (
                  <ImageBox key={el + i}>
                    <img src={el} alt="기존이미지" />

                    <DeleteButton
                      circular
                      icon="delete"
                      onClick={() => {
                        deleteImage(el);
                      }}
                    />
                  </ImageBox>
                );
              })}
          </ImageWrap>

          <ItemDetailImage
            setSendForm={setSendForm}
            sendForm={sendForm}
            length={dataList?.foodImages.length}
          />
        </div>
        <div>
          <TagTitle>메뉴 설명</TagTitle>
        </div>
        <Description
          defaultValue={listData?.description}
          onChange={e => dscOnChange(e)}
          key={listData?.description}
        />
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
  margin-top: 10px;
  flex-wrap: wrap;
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
  }
`;

const PriceWrap = styled.div`
  display: flex;
`;

const CapaWrap = styled.div`
  display: flex;
  margin-top: 24px;
`;

const DeleteButton = styled(Button)`
  position: absolute;
  right: 12px;
  top: 4px;
`;

const ImageBox = styled.div`
  position: relative;
`;

const Description = styled.textarea`
  width: 500px;
  height: 80px;
  outline: none;
  resize: none;
  padding: 4px 8px;
  border-color: ${({theme}) => theme.colors.grey[6]};
  border-radius: 4px;
`;
