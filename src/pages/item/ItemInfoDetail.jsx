import {useLocation, useNavigate} from 'react-router-dom';
import {FormProvider, useForm} from 'react-hook-form';
import Input from '../../components/input/Input';
import styled from 'styled-components';
import {useEffect, useRef, useState} from 'react';
import withCommas from '../../utils/withCommas';
import HashTag from '../../components/hashTag/HashTag';
import {
  useAddProductKeyword,
  useEditProductDetail,
  useGetDetailProductsList,
} from '../../hooks/useProductsList';
import ItemDetailImage from './components/ItemDetailImage';
import {useAtom} from 'jotai';
import {productDataAtom} from 'utils/store';
import {Button, Label} from 'semantic-ui-react';
import ItemKeyword from './ItemKeyword';

const ProductDetailPage = () => {
  const morningRef = useRef(null);
  const lunchRef = useRef(null);
  const dinnerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const foodId = location.state.foodId;
  const makersId = location.state.makersId;

  const {data: detailData} = useGetDetailProductsList(foodId, makersId);
  const {mutateAsync: editData} = useEditProductDetail();

  const {mutateAsync: addKeyword} = useAddProductKeyword();

  useEffect(() => {
    addKeyword({
      foodId: 1,
      names: ['키워드1', '키워드2'],
    });
  }, [addKeyword]);

  const listData = detailData?.data;
  const [clicked, setClicked] = useState([]);
  const [dataList, setDataList] = useAtom(productDataAtom); // 이미지
  const [sendForm, setSendForm] = useState([]);
  const [text, setText] = useState('');
  const [morningTime, setMorningTime] = useState();
  const [lunchTime, setLunchTime] = useState();
  const [dinnerTime, setDinnerTime] = useState();

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
  const supplyPrice = watch('supplyPrice');
  const discountRate = watch('discountRate');
  // const discountPrice = watch('discountPrice');
  const periodDiscountRate = watch('periodDiscountRate');
  // const periodDiscountPrice = watch('periodDiscountPrice');
  const membershipRate = watch('membershipRate');
  const customPrice = watch('customPrice');
  const morningCapacity = watch('morning');
  const lunchCapacity = watch('lunch');
  const dinnerCapacity = watch('dinner');
  const morningEndTime = watch('morningEnd');
  const lunchEndTime = watch('lunchEnd');
  const dinnerEndTime = watch('dinnerEnd');

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
      supplyPrice: Number(supplyPrice.replace(',', '')),
      makersDiscountRate: Number(discountRate),
      periodDiscountRate: Number(periodDiscountRate),
      customPrice: Number(customPrice.replace(',', '')),
      membershipDiscountRate: Number(membershipRate),
      foodTags: clicked,
      morningCapacity: morningCapacity,
      lunchCapacity: lunchCapacity,
      dinnerCapacity: dinnerCapacity,
      morningLastOrderTime:
        (morningEndTime === undefined ||
          morningEndTime === false ||
          morningEndTime.trim() === '') &&
        morningTime === undefined
          ? null
          : morningEndTime + '일전 ' + morningTime,
      lunchLastOrderTime:
        (lunchEndTime === undefined ||
          lunchEndTime === false ||
          lunchEndTime.trim() === '') &&
        lunchTime === undefined
          ? null
          : lunchEndTime + '일전 ' + lunchTime,
      dinnerLastOrderTime:
        (dinnerEndTime === undefined ||
          dinnerEndTime === false ||
          dinnerEndTime.trim() === '') &&
        dinnerTime === undefined
          ? null
          : dinnerEndTime + '일전 ' + dinnerTime,
      images: dataList?.foodImages,
      description: text,
    };
    console.log(data, '0888');
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

  const morningClearTime = () => {
    setMorningTime((morningRef.current.value = undefined));
    setValue('morningEnd', '');
  };
  const lunchClearTime = () => {
    setLunchTime((lunchRef.current.value = undefined));
    setValue('lunchEnd', '');
  };
  const dinnerClearTime = () => {
    setDinnerTime((dinnerRef.current.value = undefined));
    setValue('dinnerEnd', '');
  };

  useEffect(() => {
    setValue('foodName', listData?.foodName);
    setValue('foodPrice', withCommas(listData?.foodPrice));
    setValue(
      'supplyPrice',
      withCommas(listData?.supplyPrice === 0 ? '0' : listData?.supplyPrice),
    );
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
    setValue(
      'morningEnd',
      listData?.morningLastOrderTime !== '정보 없음' &&
        listData?.morningLastOrderTime.split('일전')[0],
    );
    setValue(
      'lunchEnd',
      listData?.lunchLastOrderTime !== '정보 없음' &&
        listData?.lunchLastOrderTime.split('일전')[0],
    );
    setValue(
      'dinnerEnd',
      listData?.dinnerLastOrderTime !== '정보 없음' &&
        listData?.dinnerLastOrderTime.split('일전')[0],
    );
    setMorningTime(
      listData?.morningLastOrderTime?.split('일전')[1]?.split(' ')[1],
    );
    setLunchTime(listData?.lunchLastOrderTime?.split('일전')[1]?.split(' ')[1]);
    setDinnerTime(
      listData?.dinnerLastOrderTime?.split('일전')[1]?.split(' ')[1],
    );
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
    listData?.supplyPrice,
    listData?.morningLastOrderTime,
    listData?.lunchLastOrderTime,
    listData?.dinnerLastOrderTime,
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
                <Input name="supplyPrice" label="공급가" />
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
              <EndTimeWrap>
                <EndTimeContents>
                  <DayEndTime>
                    <Input
                      name="morningEnd"
                      label="아침 주문 마감 시간"
                      width="50px"
                    />
                    <OrderEndTimeText>일 전</OrderEndTimeText>
                  </DayEndTime>
                  <TimeWrap>
                    <ResetTime>
                      <Label
                        content="시간초기화"
                        color="green"
                        size="tiny"
                        onClick={morningClearTime}
                        style={{cursor: 'pointer'}}
                      />
                    </ResetTime>
                    <TimeInput
                      ref={morningRef}
                      type="time"
                      key={listData?.morningLastOrderTime}
                      defaultValue={
                        listData?.morningLastOrderTime
                          ?.split('일전')[1]
                          ?.split(' ')[1]
                      }
                      onChange={e => setMorningTime(e.target.value)}
                    />
                  </TimeWrap>
                </EndTimeContents>
                <EndTimeContents>
                  <DayEndTime>
                    <Input
                      name="lunchEnd"
                      label="점심 주문 마감 시간"
                      width="50px"
                    />
                    <OrderEndTimeText>일 전</OrderEndTimeText>
                  </DayEndTime>
                  <TimeWrap>
                    <ResetTime>
                      <Label
                        content="시간초기화"
                        color="green"
                        size="tiny"
                        onClick={lunchClearTime}
                        style={{cursor: 'pointer'}}
                      />
                    </ResetTime>
                    <TimeInput
                      ref={lunchRef}
                      type="time"
                      key={listData?.lunchLastOrderTime}
                      defaultValue={
                        listData?.lunchLastOrderTime
                          ?.split('일전')[1]
                          ?.split(' ')[1]
                      }
                      onChange={e => setLunchTime(e.target.value)}
                    />
                  </TimeWrap>
                </EndTimeContents>
                <EndTimeContents>
                  <DayEndTime>
                    <Input
                      name="dinnerEnd"
                      label="저녁 주문 마감 시간"
                      width="50px"
                    />
                    <OrderEndTimeText>일 전</OrderEndTimeText>
                  </DayEndTime>
                  <TimeWrap>
                    <ResetTime>
                      <Label
                        content="시간초기화"
                        color="green"
                        size="tiny"
                        onClick={dinnerClearTime}
                        style={{cursor: 'pointer'}}
                      />
                    </ResetTime>
                    <TimeInput
                      ref={dinnerRef}
                      type="time"
                      key={listData?.dinnerLastOrderTime}
                      defaultValue={
                        listData?.dinnerLastOrderTime
                          ?.split('일전')[1]
                          ?.split(' ')[1]
                      }
                      onChange={e => setDinnerTime(e.target.value)}
                    />
                  </TimeWrap>
                </EndTimeContents>
              </EndTimeWrap>
            </div>
          </FormProvider>
        </InputWrap>
        <div>
          <TagTitle>해시태그 등록</TagTitle>
          <HashTagWrap>
            <HashTag clicked={clicked} setClicked={setClicked} />
          </HashTagWrap>
        </div>
        <div>{/* <ItemKeyword /> */}</div>
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

const TimeInput = styled.input`
  border: 0.5px solid #c8c8d2;
  border-radius: 4px;
  width: 150px;
  height: 30px;
`;

const EndTimeContents = styled.div`
  display: flex;
  align-items: flex-end;
  margin-top: 12px;
  margin-right: 24px;
`;

const DayEndTime = styled.div`
  display: flex;
  align-items: flex-end;
`;

const EndTimeWrap = styled.div`
  display: flex;
`;

const OrderEndTimeText = styled.div`
  margin-left: -60px;
  margin-right: 10px;
`;

const ResetTime = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

const TimeWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
