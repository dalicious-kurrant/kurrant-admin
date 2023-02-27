import React, {useCallback, useRef} from 'react';
import {useLocation} from 'react-router';
import {MenuList} from '../router/menu';
import {Breadcrumb, Button} from 'semantic-ui-react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import {
  planAtom,
  exelPlanAtom,
  exelProductAtom,
  productAtom,
  exelStaticAtom,
  spotAtom,
  exelSpotAtom,
  shopInfoDetailIdAtom,
  recommandPlanAtom,
<<<<<<< HEAD
  deadlineAtom,
  exelUserAtom,
=======
  saveItemAtom,
>>>>>>> develop
} from '../utils/store';

import {useAtom} from 'jotai';

import {
  planExel,
  planExelExport,
  productExel,
  productExelExport,
} from '../utils/downloadExel/exel';
<<<<<<< HEAD
import {scheduleFormatted2} from 'utils/statusFormatter';
import {
  formattedDate,
  formattedFullDate,
  formattedTime,
} from 'utils/dateFormatter';
import {usePostPresetCalendar} from 'hooks/useCalendars';
import {useSaveUserData} from 'hooks/useUserData';
import {CustomerDataAtom} from 'pages/customer/Customer/store';
=======
import {useAddExelProductData} from 'hooks/useProductsList';
>>>>>>> develop

const makeSection = pathname => {
  const tempArray = pathname.split('/');

  const result = [];
  const parent = MenuList.find(v => v.url.includes(tempArray[1]));

  if (!parent) {
    return result;
  }

  result.push({
    key: parent.name,
    content: parent.name,
  });

  const child = parent.children?.find(v => v.url.includes(tempArray[2]));

  if (!child) {
    return result;
  }

  result.push({
    key: child.name,
    content: child.name,
    active: true,
  });

  return result;
};

const C = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    padding-top: 100px;
    min-width: 1440px;
  `,
  Bread: styled.div`
    z-index: -1;
  `,
  BtnWrapper: styled.div``,
};

const Common = () => {
  const {pathname} = useLocation();
  const inputRef = useRef();
  const [plan, setPlan] = useAtom(planAtom);
  const [exelPlan, setExelPlan] = useAtom(exelPlanAtom);
  const [spot, setSpot] = useAtom(spotAtom);
  const [startDate, setStartDate] = useAtom(deadlineAtom);
  const {mutateAsync: postPresetCalendar} = usePostPresetCalendar();
  const {mutateAsync: saveUserData} = useSaveUserData();
  const [exelSpot, setExelSpot] = useAtom(exelSpotAtom);
  const [exelUser, setExelUser] = useAtom(exelUserAtom);
  const [user, setUser] = useAtom(CustomerDataAtom);
  const [, setExelStaticPlan] = useAtom(exelStaticAtom);
  const [product, setProduct] = useAtom(productAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [id] = useAtom(shopInfoDetailIdAtom);
  const {mutateAsync: productPost} = useAddExelProductData();
  const [reCommandPlan, setReCommandPlan] = useAtom(recommandPlanAtom);

  const onUploadFileButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current.click();
  }, []);
<<<<<<< HEAD
  const callPostCalendar = async () => {
    const reqArray = [];
    if (plan) {
      const req = plan.map(makers => {
        return makers.clientSchedule.map(client => {
          return client.foodSchedule.map(food => {
            const result = {
              makersName: makers.makersName,
              makersScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
              serviceDate: makers.serviceDate,
              diningType: makers.diningType,
              makersCapacity: makers.makersCapacity,
              pickupTime: client.pickupTime,
              groupName: client.clientName,
              groupCapacity: client.clientCapacity,
              foodScheduleStatus: scheduleFormatted2(food.scheduleStatus),
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
            };
            reqArray.push(result);
          });
        });
      });
    }
    if (reCommandPlan) {
      reCommandPlan.map(makers => {
        return makers.clientSchedule.map(client => {
          return client.foodSchedule.map(food => {
            const result = {
              makersName: makers.makersName,
              makersScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
              serviceDate: makers.serviceDate,
              diningType: makers.diningType,
              makersCapacity: makers.makersCapacity,
              pickupTime: client.pickupTime,
              groupName: client.clientName,
              groupCapacity: client.clientCapacity,
              foodScheduleStatus: scheduleFormatted2(food.scheduleStatus),
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
            };
            reqArray.push(result);
          });
        });
      });
    }
    if (exelPlan) {
      exelPlan.map((makers, i) => {
        if (i !== 0) {
          const result = {
            makersName: makers.makersName,
            makersScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
            serviceDate: formattedDate(makers.serviceDate, '-'),
            diningType: makers.diningType,
            makersCapacity: makers.makersCapacity,
            pickupTime: formattedTime(makers.pickupTime),
            groupName: makers.clientName,
            groupCapacity: makers.clientCapacity,
            foodScheduleStatus: scheduleFormatted2(makers.scheduleStatus),
            foodName: makers.foodName,
            foodStatus: makers.foodStatus,
            foodCapacity: makers.foodCapacity,
          };
          reqArray.push(result);
        }
      });
    }
    console.log(reqArray);
    await postPresetCalendar({
      deadline: formattedFullDate(startDate, '-'),
      excelDataList: [...reqArray],
    });
=======

  const callProductExel = async () => {
    const reqArray = [];
    exelProduct.map((item, idx) => {
      console.log(item, '000');
      if (idx !== 0) {
        const result = {
          foodId: item.foodId,
          makersId: item.makersId,
          makersName: item.makersName,
          foodName: item.foodName,
          foodStatus: item.foodStatus,
          defaultPrice: item.defaultPrice,
          makersDiscount: item.makersDiscount,
          eventDiscount: item.eventDiscount,
          resultPrice: item.resultPrice,
          description: item.description,
          foodTags: item.foodTags.split(','),
        };

        reqArray.push(result);
      }
    });
    await productPost(reqArray);
>>>>>>> develop
    alert('저장 되었습니다.');
    window.location.reload();
  };
  const onUploadFile = async e => {
    if (!e.target.files) {
      return;
    }
    e.preventDefault();
    if (e.target.files) {
      setProduct();
      setExelProduct();
      setExelPlan();
      setExelStaticPlan();
      setPlan();
      setSpot();
      setExelSpot();
      setExelUser();
      setUser();
      setReCommandPlan();
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: 'array', cellDates: true});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        console.log(sheetName);
        // console.log(worksheet);

        if (sheetName === '메이커스 일정 관리') {
          setExelPlan(json);
          setExelStaticPlan(json);
        }
        if (sheetName === '고객 스팟 공지') {
          setExelSpot(json);
        }
        if (sheetName === '유저 정보') {
          console.log(json);
          setExelUser(json);
        }
        if (sheetName === '상품 정보') {
          setExelProduct(json);

          console.log(json, 'json');
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handlerSaveUser = async () => {
    const result = exelUser.map((v, i) => {
      if (i !== 0) {
        return {
          role:
            v.role === 'USER'
              ? '일반'
              : v.role === 'MANAGER'
              ? '관리자'
              : '일반',
          password: v.password,
          name: v.userName,
          email: v.email,
          phone: v.phone,
          userId: v.id,
        };
      }
    });
    const req = result.filter(element => {
      return element !== undefined && element !== null && element !== '';
    });
    await saveUserData({
      userList: req,
    });
    alert('저장 되었습니다.');
    window.location.reload();
  };
  const onDownloadFile = async () => {
    if (plan && plan.length > 0) {
      return planExel(plan);
    }
    if (exelPlan && exelPlan.length > 0) {
      return planExelExport(
        exelPlan,
        '메이커스 일정 관리',
        '메이커스 일정 관리.xlsx',
      );
    }
    if (reCommandPlan && reCommandPlan.length > 0) {
      return planExel(reCommandPlan);
    }
    if (exelSpot && exelSpot.length > 0) {
      return planExelExport(exelSpot, '고객 스팟 공지', '고객 스팟 공지.xlsx');
    }
    if (product?.data && product?.data?.length > 0) {
      return productExel(product);
    }
    if (exelProduct && exelProduct.length > 0) {
      return productExelExport(exelProduct, '상품 정보', '상품_정보.xlsx');
    }
    if (exelUser && exelUser.length > 0) {
      return planExelExport(exelUser, '유저 정보', '유저 정보.xlsx');
    }
    if (user && user.length > 0) {
      return planExelExport(user, '유저 정보', '유저 정보.xlsx');
    }
  };

  const noNeedButton =
    pathname !== '/sales/schedule' &&
    pathname !== '/order/info' &&
    pathname !== `/shop/info/detail/${id}`;

  return (
    <C.Wrapper>
      <C.Bread>
        <Breadcrumb icon="right angle" sections={makeSection(pathname)} />
      </C.Bread>
      {noNeedButton && (
        <C.BtnWrapper>
          <Button
            color="green"
            icon="save"
<<<<<<< HEAD
            content="저장"
            onClick={() => {
              if (plan || exelPlan || reCommandPlan) {
                callPostCalendar();
              }
              if (exelUser) {
                handlerSaveUser();
=======
            content="저장(미완)"
            onClick={() => {
              if (exelProduct) {
                callProductExel();
>>>>>>> develop
              }
            }}
          />
          {/* <Button icon="history" content="히스토리" /> */}
          <Button.Group>
            <Button
              color="blue"
              inverted
              icon="file excel outline"
              content="엑셀 불러오기"
              onClick={onUploadFileButtonClick}
            />
            <InputExcel type="file" ref={inputRef} onChange={onUploadFile} />
            <Button.Or />
            <Button
              color="blue"
              icon="share"
              content="엑셀 내보내기"
              onClick={onDownloadFile}
            />
          </Button.Group>
        </C.BtnWrapper>
      )}
    </C.Wrapper>
  );
};

export default Common;

const InputExcel = styled.input`
  display: none;
`;
