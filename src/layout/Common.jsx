import React, {useCallback, useEffect, useRef} from 'react';
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
  deadlineAtom,
  exelUserAtom,
  saveItemAtom,
  statusOptionAtom,
  corporationAtom,
  exelCorporationAtom,
  completePlanAtom,
  exelCompletePlanAtom,
  makersInfoAtom,
  makersExelInfoAtom,
} from '../utils/store';

import {useAtom} from 'jotai';

import {
  corporationExelExport,
  corporationInfoExel,
  completePlanExel,
  planExel,
  planExelExport,
  productExel,
  productExelExport,
  spotExel,
  userExel,
  makersInfoExel,
  makersInfoExelExport,
} from '../utils/downloadExel/exel';
import {
  useAddExelProductData,
  useEditProductStatus,
} from '../hooks/useProductsList';
import {scheduleFormatted2} from 'utils/statusFormatter';
import {
  formattedDate,
  formattedFullDate,
  formattedTime,
} from 'utils/dateFormatter';
import {
  usePostCompleteCalendar,
  usePostPresetCalendar,
} from '../hooks/useCalendars';
import {useSaveUserData} from '../hooks/useUserData';
import {CustomerDataAtom} from 'pages/customer/Customer/store';
import {useSaveExelCorporation} from '../hooks/useCorporation';
import {useSaveMakersInformation} from 'hooks/useMakers';
import {SpotInfoDataAtom} from 'pages/customer/SpotInfo/store';
import saveSpotToDb from 'hooks/saveSpotToDb';

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

  const [startDate, setStartDate] = useAtom(deadlineAtom);
  const {mutateAsync: postPresetCalendar} = usePostPresetCalendar();
  const {mutateAsync: saveUserData} = useSaveUserData();

  // 스팟
  const [exelSpot, setExelSpot] = useAtom(exelSpotAtom);
  const [spotInfoData, setSpotInfoData] = useAtom(SpotInfoDataAtom);
  const [spot, setSpot] = useAtom(spotAtom);

  const [exelUser, setExelUser] = useAtom(exelUserAtom);
  const [user, setUser] = useAtom(CustomerDataAtom);
  const [, setExelStaticPlan] = useAtom(exelStaticAtom);
  const [product, setProduct] = useAtom(productAtom);
  const [completePlan, setCompletePlan] = useAtom(completePlanAtom);
  const [exelCompletePlan, setExelCompletePlan] = useAtom(exelCompletePlanAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [id] = useAtom(shopInfoDetailIdAtom);
  const [corporation, setCorporation] = useAtom(corporationAtom);
  const [exelCorporation, setExelCorporation] = useAtom(exelCorporationAtom);
  const [makersInformation, setMakersInformation] = useAtom(makersInfoAtom);
  const [makersExelInfo, setMakersExelInfo] = useAtom(makersExelInfoAtom);
  const {mutateAsync: productPost} = useAddExelProductData();
  const [reCommandPlan, setReCommandPlan] = useAtom(recommandPlanAtom);
  const [statusOption] = useAtom(statusOptionAtom);
  const {mutateAsync: editStatus} = useEditProductStatus();
  const {mutateAsync: corporationExel} = useSaveExelCorporation();
  const {mutateAsync: completePostCalendar} = usePostCompleteCalendar();
  const {mutateAsync: saveMakersInfo} = useSaveMakersInformation();
  // console.log(user, '9779');
  const onUploadFileButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current.click();
  }, []);

  useEffect(() => {
    console.log(exelSpot);
  }, [exelSpot]);

  const completePost = async () => {
    const reqArray = [];
    if (completePlan) {
      const req = completePlan.map(makers => {
        return makers.makersSchedules.map(client => {
          return client.foodSchedules.map(food => {
            const result = {
              serviceDate: makers.serviceDate,
              diningType: makers.diningType,
              groupName: makers.groupName,
              groupCapacity: makers.groupCapacity,
              deliveryTime: makers.deliveryTime,
              makersName: client.makersName,
              makersCapacity: client.makersCapacity,
              makersCount: client.makersCount,
              makersPickupTime: client.makersPickupTime,
              foodName: food.foodName,
              foodStatus: food.dailyFoodStatus,
              dailyFoodId: food.dailyFoodId || null,
              foodCapacity: food.foodCapacity,
              foodCount: food.foodCount,
            };
            reqArray.push(result);
          });
        });
      });
      await completePostCalendar(reqArray);
      alert('저장 되었습니다.');
      return window.location.reload();
    }
    if (exelCompletePlan) {
      const req = exelCompletePlan.map((makers, i) => {
        if (i !== 0) {
          const result = {
            serviceDate: formattedDate(makers.serviceDate, '-'),
            diningType: makers.diningType,
            groupName: makers.groupName,
            groupCapacity: makers.groupCapacity,
            deliveryTime: makers.deliveryTime,
            makersName: makers.makersName,
            makersCapacity: makers.makersCapacity,
            makersCount: makers.makersCount,
            makersPickupTime: makers.makersPickupTime,
            foodName: makers.foodName,
            foodStatus: makers.dailyFoodStatus,
            dailyFoodId: makers.dailyFoodId || null,
            foodCapacity: makers.foodCapacity,
            foodCount: makers.foodCount,
          };
          reqArray.push(result);
        }
      });

      await completePostCalendar(reqArray);
      alert('저장 되었습니다.');
      return window.location.reload();
    }
  };

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
    if (exelProduct) {
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
      alert('저장 되었습니다.');
      return window.location.reload();
    }

    if (exelCorporation) {
      exelCorporation.map((item, idx) => {
        if (idx !== 0) {
          const result = {
            id: item.id,
            code: item.code,
            name: item.name,
            zipCode: item.zipCode,
            address1: item.address1,
            address2: item.address2,
            location:
              (item.location === undefined || item.location === 'null') && null,
            diningTypes: [item.diningTypes],
            serviceDays: item.serviceDays,
            managerName: item.managerName,
            managerPhone: item.managerPhone,
            isMembershipSupport: item.isMembershipSupport,
            employeeCount: item.employeeCount,
            isSetting: item.isSetting,
            isGarbage: item.isGarbage,
            isHotStorage: item.isHotStorage,
          };

          reqArray.push(result);
        }
      });
      //console.log(reqArray, '00');
      await corporationExel(reqArray);
      alert('저장 되었습니다.');
      return window.location.reload();
    }
    if (makersExelInfo) {
      makersExelInfo.map((item, idx) => {
        if (idx !== 0) {
          const result = {
            id: item.id,
            code: item.code,
            name: item.name,
            companyName: item.companyName,
            ceo: item.ceo,
            ceoPhone: item.ceoPhone,
            managerName: item.managerName,
            managerPhone: item.managerPhone,
            diningTypes: item.diningTypes,
            dailyCapacity: item.dailyCapacity,
            serviceType: item.serviceType,
            serviceForm: item.serviceForm,
            isParentCompany: item.isParentCompany,
            parentCompanyId: item.parentCompanyId,
            zipCode: item.zipCode.toString(),
            address1: item.address1,
            address2: item.address2,
            location: item.location === undefined && null,
            companyRegistrationNumber:
              item.companyRegistrationNumber.toString(),
            contractStartDate: item.contractStartDate,
            contractEndDate: item.contractEndDate,
            isNutritionInformation: item.isNutritionInformation,
            openTime: item.openTime,
            closeTime: item.closeTime,
            bank: item.bank,
            depositHolder: item.depositHolder,
            accountNumber: item.accountNumber,
          };

          reqArray.push(result);
        }
      });
      console.log(reqArray, '00');
      await saveMakersInfo(reqArray);
      alert('저장 되었습니다.');
      return window.location.reload();
    }

    await postPresetCalendar({
      deadline: formattedFullDate(startDate, '-'),
      excelDataList: [...reqArray],
    });
    alert('저장 되었습니다.');
    return window.location.reload();
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
      setCompletePlan();
      setExelCompletePlan();
      setPlan();
      setSpot();
      setExelSpot();
      setExelUser();
      setUser();
      setReCommandPlan();
      setCorporation();
      setExelCorporation();
      setMakersInformation();
      setMakersExelInfo();
      const reader = new FileReader();
      reader.onload = e => {
        // console.log(e.target.result);
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
          console.log(json);
          setExelProduct(json);
        }
        if (sheetName === '식단 현황') {
          console.log(json);
          setExelCompletePlan(json);
        }

        if (sheetName === '기업 정보') {
          setExelCorporation(json);
          console.log(json, 'json');
        }
        if (sheetName === '메이커스 정보') {
          setMakersExelInfo(json);
          console.log(json, 'json');
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handlerSaveExelUser = async () => {
    const result = exelUser.map((v, i) => {
      console.log(v);
      if (i !== 0) {
        return {
          password: v.password || null,
          name: v.userName,
          email: v.email,
          phone: v.phone || null,
          role: v.role || null,
          status: v.status || null,
          groupName: v.groupName || null,
          point: v.point || 0,
          marketingAgree: v.marketingAgree || null,
          marketingAlarm: v.marketingAlarm || null,
          orderAlarm: v.orderAlarm || null,
        };
      }
    });
    const req = result.filter(element => {
      return element !== undefined && element !== null && element !== '';
    });
    await saveUserData(req);
    alert('저장 되었습니다.');
    return window.location.reload();
  };
  const handlerSaveUser = async () => {
    const result = user.map((v, i) => {
      return {
        password: v.password || null,
        name: v.userName,
        email: v.email,
        phone: v.phone || null,
        role: v.role || null,
        status: v.status || null,
        groupName: v.groupName || null,
        point: v.point,
        marketingAgree: v.marketingAgree || null,
        marketingAlarm: v.marketingAlarm || null,
        orderAlarm: v.orderAlarm || null,
      };
    });
    const req = result.filter(element => {
      return element !== undefined && element !== null && element !== '';
    });
    await saveUserData(req);
    alert('저장 되었습니다123 .');
    return window.location.reload();
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
    if (product && product?.length > 0) {
      return productExel(product);
    }
    if (exelProduct && exelProduct.length > 0) {
      return productExelExport(exelProduct, '상품 정보', '상품_정보.xlsx');
    }
    if (exelUser && exelUser.length > 0) {
      return planExelExport(exelUser, '유저 정보', '유저 정보.xlsx');
    }
    if (user && user.length > 0) {
      return userExel(user);
    }
    if (spot && spot.length > 0) {
      const exportSpot = spot.map((v, i) => {
        if (i !== 0) {
          return v;
        }
      });
      const req = exportSpot.filter(element => {
        return element !== undefined && element !== null && element !== '';
      });
      console.log(req);
      return spotExel(req);
    }
    if (completePlan && completePlan.length > 0) {
      const req = completePlan.filter(element => {
        return element !== undefined && element !== null && element !== '';
      });
      return completePlanExel(req);
    }
    if (
      corporation?.data &&
      corporation?.data?.items?.groupInfoList?.length > 0
    ) {
      return corporationInfoExel(corporation);
    }
    if (exelCorporation && exelCorporation.length > 0) {
      return corporationExelExport(
        exelCorporation,
        '기업 정보',
        '기업_정보.xlsx',
      );
    }

    if (makersInformation?.data && makersInformation?.data.length > 0) {
      return makersInfoExel(makersInformation);
    }

    if (makersExelInfo && makersExelInfo.length > 0) {
      return makersInfoExelExport(
        makersExelInfo,
        '메이커스 정보',
        '메이커스_정보.xlsx',
      );
    }
  };

  // 상품 정보 상태변경 저장
  const statusButton = async () => {
    await editStatus(statusOption);
    alert('상태변경 저장 완료.');
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
            content="저장"
            onClick={() => {
              if (
                plan ||
                exelPlan ||
                reCommandPlan ||
                exelProduct ||
                exelCorporation ||
                makersExelInfo
              ) {
                console.log('callPostCalendar');
                callPostCalendar();
              }
              // 스팟
              if (exelSpot) {
                console.log('exelSpot 엑셀 스팟 저장');
                saveSpotToDb(exelSpot);
              } else if (spotInfoData) {
                console.log('spotInfoData 스팟정보 데이터 저장');
                saveSpotToDb(spotInfoData);
              }

              //

              if (exelUser) {
                console.log('handlerSaveExelUser');
                handlerSaveExelUser();
              }
              if (user && user.length !== 0) {
                handlerSaveUser();
              }
              if (completePlan || exelCompletePlan) {
                console.log('completePost');
                completePost();
              }
              if (statusOption.length !== 0) {
                console.log('statusButton');
                statusButton();
              }
              console.log('아무것도 없음');
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
