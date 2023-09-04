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
  deadlineAtom,
  exelUserAtom,
  statusOptionAtom,
  corporationAtom,
  exelCorporationAtom,
  completePlanAtom,
  exelCompletePlanAtom,
  makersInfoAtom,
  makersExelInfoAtom,
  exportProductAtom,
  planExportAtom,
  corporationExportAtom,
  orderNumberAtom,
  indexAtom,
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
import {
  deliveryFeeOptionReverseFormatted,
  diningReverseFormatted,
  groupTypeFormatted2,
  scheduleFormatted2,
} from 'utils/statusFormatter';
import {
  formattedDate,
  formattedFullDate,
  formattedTime,
  formattedWeekDate,
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
import {saveSpotToDb} from 'pages/customer/SpotInfo/SpotInfoLogics';
import useSpotInfoExelForceQuery from 'pages/customer/SpotInfo/useSpotInfoExelForceQuery';

import {TableDeleteListAtom} from 'common/Table/store';
import {SpotInfoTotalRequiredFields} from 'pages/customer/SpotInfo/SpotInfoData';

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
  const [planExport, setPlanExport] = useAtom(planExportAtom);
  const [exelPlan, setExelPlan] = useAtom(exelPlanAtom);

  const [startDate, ] = useAtom(deadlineAtom);
  const {mutateAsync: postPresetCalendar} = usePostPresetCalendar();
  const {mutateAsync: saveUserData} = useSaveUserData();

  // 스팟
  const [indexStatus] = useAtom(indexAtom);
  const [exelSpot, setExelSpot] = useAtom(exelSpotAtom);
  const [spotInfoData, ] = useAtom(SpotInfoDataAtom);
  const [spot, setSpot] = useAtom(spotAtom);

  const [exelUser, setExelUser] = useAtom(exelUserAtom);
  const [user, setUser] = useAtom(CustomerDataAtom);
  const [, setExelStaticPlan] = useAtom(exelStaticAtom);
  const [, setProduct] = useAtom(productAtom);
  const [exportProduct, setExportProduct] = useAtom(exportProductAtom);
  const [completePlan, setCompletePlan] = useAtom(completePlanAtom);
  const [exelCompletePlan, setExelCompletePlan] = useAtom(exelCompletePlanAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [id] = useAtom(shopInfoDetailIdAtom);
  const [orderNumber] = useAtom(orderNumberAtom);
  const [, setCorporation] = useAtom(corporationAtom);
  const [exelCorporation, setExelCorporation] = useAtom(exelCorporationAtom);
  const [makersInformation, setMakersInformation] = useAtom(makersInfoAtom);
  const [makersExelInfo, setMakersExelInfo] = useAtom(makersExelInfoAtom);
  const [corporationExport, setCorporationExport] = useAtom(
    corporationExportAtom,
  );
  const {mutateAsync: productPost} = useAddExelProductData();
  const [reCommandPlan, setReCommandPlan] = useAtom(recommandPlanAtom);
  const [statusOption] = useAtom(statusOptionAtom);
  const {mutateAsync: editStatus} = useEditProductStatus();
  const {mutateAsync: corporationExel} = useSaveExelCorporation();
  const {mutateAsync: completePostCalendar} = usePostCompleteCalendar();
  const {mutateAsync: saveMakersInfo} = useSaveMakersInformation();

  const {sendExcelForceMutate} = useSpotInfoExelForceQuery();
  const [tableDeleteList, ] = useAtom(TableDeleteListAtom);

  const onUploadFileButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current.click();
  }, []);

  const completePost = async () => {
    const reqArray = [];
    if (completePlan) {
      try {
        await completePostCalendar(reqArray);
        alert('저장 되었습니다.');
        return window.location.reload();
      } catch (error) {
        alert(`저장을 실패 했습니다.\n${error.toString()}`);
        return window.location.reload();
      }
    }
    if (exelCompletePlan) {
      try {
        await completePostCalendar(reqArray);
        alert('저장 되었습니다.');
        return window.location.reload();
      } catch (error) {
        alert(`저장을 실패 했습니다.\n${error.toString()}`);
        return window.location.reload();
      }
    }
  };

  const callPostCalendar = async () => {
    const reqArray = [];
    if (plan) {
    }

    if (reCommandPlan) {
      reCommandPlan.map(makers => {
        return makers.clientSchedule.map(client => {
          return client.foodSchedule.map(food => {
            const result = {
              makersName: makers.makersName,
              makersScheduleStatus: makers.scheduleStatus,
              serviceDate: makers.serviceDate,
              diningType: makers.diningType,
              makersCapacity: makers.makersCapacity,
              pickupTime: client.pickupTime,
              groupName: client.clientName,
              groupCapacity: client.clientCapacity,
              foodScheduleStatus: food.scheduleStatus,
              foodName: food.foodName,
              foodStatus: food.foodStatus,
              foodCapacity: food.foodCapacity,
            };
            reqArray.push(result);
            return undefined
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
        return undefined
      });
    }
    if (exelProduct) {
      exelProduct.map((item, idx) => {
        if (idx !== 0) {
          const result = {
            foodId: item.foodId,
            makersId: item.makersId,
            makersName: item.makersName,
            foodGroupId: item.foodGroupId,
            foodGroup: item.foodGroup,
            foodName: item.foodName,
            foodStatus: item.foodStatus,
            supplyPrice: item.supplyPrice,
            defaultPrice: item.defaultPrice,
            membershipDiscount: item.membershipDiscount,
            makersDiscount: item.makersDiscount,
            eventDiscount: item.eventDiscount,
            resultPrice: item.resultPrice,
            description: item.description,
            foodTags: item.foodTags.split(','),
          };

          reqArray.push(result);
        }
        return undefined
      });
      try {
        await productPost(reqArray);
        alert('저장 되었습니다.');
        return window.location.reload();
      } catch (error) {
        alert(`저장을 실패 했습니다.\n${error.toString()}`);
        return window.location.reload();
      }
    }

    if (exelCorporation) {
      const week = ['월', '화', '수', '목', '금', '토', '일'];
      exelCorporation.map((item, idx) => {
        if (idx !== 0) {
          // console.log(item.dinnerSupportPrice);
          const orderServiceDays =
            item.orderServiceDays && item.orderServiceDays.split('/');
          const lastOrderTime =
            item.lastOrderTime && item.lastOrderTime.split('/');
          const membershipBenefitTime =
            item.membershipBenefitTime && item.membershipBenefitTime.split('/');
          const deliveryTime =
            item.deliveryTime && item.deliveryTime.split('/');
          const morningSupportPrice =
            item.morningSupportPrice && item.morningSupportPrice.split(',');
          const lunchSupportPrice =
            item.lunchSupportPrice && item.lunchSupportPrice.split(',');
          const dinnerSupportPrice =
            item.dinnerSupportPrice && item.dinnerSupportPrice.split(',');
          const mealInfos = orderServiceDays
            ?.map((order, i) => {
              if (order !== '') {
                let supportPriceByDays = [];
                if (i === 0 && morningSupportPrice?.length > 0) {
                  supportPriceByDays = morningSupportPrice?.map((m, mi) => {
                    return {
                      serviceDay: week[mi],
                      supportPrice: m,
                    };
                  });
                }
                if (i === 1 && lunchSupportPrice?.length > 0) {
                  supportPriceByDays = lunchSupportPrice?.map((m, mi) => {
                    return {
                      serviceDay: week[mi],
                      supportPrice: m,
                    };
                  });
                }
                if (i === 2 && dinnerSupportPrice?.length > 0) {
                  supportPriceByDays = dinnerSupportPrice?.map((m, mi) => {
                    return {
                      serviceDay: week[mi],
                      supportPrice: m,
                    };
                  });
                }
                const pushData = {
                  diningType: i + 1,
                  deliveryTimes: deliveryTime[i],
                  membershipBenefitTime: membershipBenefitTime[i],
                  lastOrderTime: lastOrderTime[i],
                  serviceDays: order,
                  supportPriceByDays: supportPriceByDays,
                };
                return pushData;
              }
              return undefined
            })
            .filter(meal => meal);
          const result = {
            id: item.id,
            code: item.code,
            groupType: groupTypeFormatted2(item.groupType),
            name: item.name,
            isActive: item.isActive || false,
            zipCode: item.zipCode,
            address1: item.address1,
            address2: item.address2,
            location: item.location || null,
            mealInfos: mealInfos,
            deliveryFeeOption:
              deliveryFeeOptionReverseFormatted(item.deliveryFeeOption) || 0,
            diningTypes: item.diningTypes
              .split(',')
              .map(v => diningReverseFormatted(v)),
            serviceDays: item.serviceDays,
            managerId: item.managerId,
            managerName: item.managerName,
            managerPhone: item.managerPhone,
            isMembershipSupport: item.isMembershipSupport,
            employeeCount: item.employeeCount,
            isSetting: item.isSetting,
            isGarbage: item.isGarbage,
            isHotStorage: item.isHotStorage,
            minimumSpend: item.minimumSpend,
            maximumSpend: item.maximumSpend,
          };
          // console.log(result);
          // console.log(JSON.stringify(result));
          reqArray.push(result);
        }
        return undefined
      });
      // console.log(reqArray, '00');
      try {
        await corporationExel(reqArray);
        alert('저장 되었습니다.');
        return window.location.reload();
      } catch (error) {
        alert(`저장을 실패 했습니다.\n${error.toString()}`);
        return window.location.reload();
      }
    }
    if (makersExelInfo) {
      makersExelInfo.map((item, idx) => {
        if (idx !== 0) {
          const nutrition = item.isNutritionInformation ? 1 : 0;

          const typeArr = [];
          if (item.morningCapa) {
            typeArr.push({
              diningType: 1,
              lastOrderTime: item.morningLastOrderTime,
              capacity: item.morningCapa,
              minTime:
                typeof item.morningMinTime === typeof new Date()
                  ? formattedTime(item.morningMinTime)
                  : item.morningMinTime,
              maxTime:
                typeof item.morningMaxTime === typeof new Date()
                  ? formattedTime(item.morningMaxTime)
                  : item.morningMaxTime,
            });
          }
          if (item.lunchCapa) {
            typeArr.push({
              diningType: 2,
              lastOrderTime: item.lunchLastOrderTime,
              capacity: item.lunchCapa,
              minTime:
                typeof item.lunchMaxTime === typeof new Date()
                  ? formattedTime(item.lunchMaxTime)
                  : item.lunchMaxTime,
              maxTime:
                typeof item.lunchMaxTime === typeof new Date()
                  ? formattedTime(item.lunchMaxTime)
                  : item.lunchMaxTime,
            });
          }
          if (item.dinnerCapa) {
            typeArr.push({
              diningType: 3,
              lastOrderTime: item.dinnerLastOrderTime,
              capacity: item.dinnerCapa,
              minTime:
                typeof item.dinnerMinTime === typeof new Date()
                  ? formattedTime(item.dinnerMinTime)
                  : item.dinnerMinTime,
              maxTime:
                typeof item.dinnerMaxTime === typeof new Date()
                  ? formattedTime(item.dinnerMaxTime)
                  : item.dinnerMaxTime,
            });
          }

          const result = {
            id: item.id,
            isActive:
              item.isActive === '활성여부'
                ? item.isActive
                : '활성'
                ? true
                : false,
            code: item.code,
            name: item.name,
            companyName: item.companyName,
            ceo: item.ceo,
            ceoPhone: item.ceoPhone,
            managerName: item.managerName,
            managerPhone: item.managerPhone,
            serviceDays: item.serviceDays,
            diningTypes: typeArr,
            dailyCapacity: item.dailyCapacity,
            serviceType: item.serviceType,
            serviceForm: item.serviceForm,
            isParentCompany: item.isParentCompany,
            parentCompanyId: item.parentCompanyId || null,
            zipCode: item.zipCode.toString(),
            address1: item.address1,
            address2: item.address2,
            location: item.location || null,
            companyRegistrationNumber:
              item.companyRegistrationNumber?.toString(),
            contractStartDate: item.contractStartDate,
            contractEndDate: item.contractEndDate,
            isNutritionInformation: nutrition,
            openTime: item.openTime,
            closeTime: item.closeTime,
            fee: item.fee,
            bank: item.bank,
            depositHolder: item.depositHolder,
            accountNumber: item.accountNumber,
          };

          reqArray.push(result);
        }
        return undefined
      });
      console.log(reqArray, '00');
      try {
        await saveMakersInfo({saveMakersRequestDto: reqArray});
        alert('저장 되었습니다.');
        return window.location.reload();
      } catch (error) {
        alert(`저장을 실패 했습니다.\n${error.toString()}`);
        return window.location.reload();
      }
    }
    try {
      await postPresetCalendar({
        deadline: formattedFullDate(startDate, '-'),
        excelDataList: [...reqArray],
      });
      alert('저장 되었습니다.');
      return window.location.reload();
    } catch (error) {
      alert(`저장을 실패 했습니다.\n${error.toString()}`);
      return window.location.reload();
    }
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
      setPlanExport();
      setExportProduct();
      setCorporationExport();
      const reader = new FileReader();
      reader.onload = e => {
        const data = e.target.result;
        const workbook = XLSX.read(data, {
          type: 'binary',
          cellDates: true,
          cellText: true,
        });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        if (sheetName === '메이커스 일정 관리') {
          setExelPlan(
            json.map((v, i) => {
              if (i === 0) {
                return v;
              }
              if (v.serviceDate) {
                return {
                  ...v,
                  serviceDate: formattedWeekDate(v.serviceDate),
                };
              }

              return v;
            }),
          );
          setExelStaticPlan(json);
        }
        if (sheetName === '상세 스팟 정보') {
          setExelSpot(
            json.map((v, i) => {
              if (i === 0) {
                return v;
              }
              return {
                ...v,
                breakfastDeliveryTime:
                  v.breakfastDeliveryTime &&
                  formattedTime(v.breakfastDeliveryTime),
                dinnerDeliveryTime:
                  v.dinnerDeliveryTime && formattedTime(v.dinnerDeliveryTime),
                lunchDeliveryTime:
                  v.lunchDeliveryTime && formattedTime(v.lunchDeliveryTime),
                createdDateTime:
                  v.createdDateTime && formattedWeekDate(v.createdDateTime),
                updatedDateTime:
                  v.updatedDateTime && formattedWeekDate(v.updatedDateTime),
              };
            }),
          );
        }
        if (sheetName === '유저 정보') {
          setExelUser(
            json.map((v, i) => {
              console.log(v, '1');
              if (i === 0) {
                return v;
              }
              if (
                v.marketingAgreedDateTime ||
                v.userCreatedDateTime ||
                v.recentLoginDateTime ||
                v.userUpdatedDateTime
              ) {
                return {
                  ...v,
                  marketingAgreedDateTime:
                    v.marketingAgreedDateTime &&
                    formattedWeekDate(v.marketingAgreedDateTime),
                  userCreatedDateTime:
                    v.userCreatedDateTime &&
                    formattedFullDate(v.userCreatedDateTime),
                  recentLoginDateTime:
                    v.recentLoginDateTime &&
                    formattedFullDate(v.recentLoginDateTime),
                  userUpdatedDateTime:
                    v.userUpdatedDateTime &&
                    formattedFullDate(v.userUpdatedDateTime),
                };
              }

              return v;
            }),
          );
        }
        if (sheetName === '상품 정보') {
          console.log(json);
          setExelProduct(json);
        }
        if (sheetName === '식단 현황') {
          setExelCompletePlan(
            json.map((v, i) => {
              if (i === 0) {
                return v;
              }
              if (
                typeof v.serviceDate === 'object' ||
                typeof v.makersPickupTime === typeof new Date() ||
                typeof v.deliveryTime === typeof new Date()
              ) {
                return {
                  ...v,
                  serviceDate: formattedWeekDate(v.serviceDate),
                  makersPickupTime:
                    typeof v.makersPickupTime === 'object'
                      ? formattedTime(v.makersPickupTime)
                      : v.makersPickupTime,
                  deliveryTime:
                    typeof v.deliveryTime === 'object'
                      ? formattedTime(v.deliveryTime)
                      : v.deliveryTime,
                };
              }

              return v;
            }),
          );
        }

        if (sheetName === '스팟 정보') {
          const exelSpotData = json.map((v, i) => {
            if (i === 0) {
              return v;
            }
            const isMembershipSupport =
              v.isMembershipSupport === '지원' ? true : false;
            const isSetting = v.isSetting === '사용' ? true : false;
            const isGarbage = v.isGarbage === '사용' ? true : false;
            const isHotStorage = v.isHotStorage === '사용' ? true : false;
            const isActive = v.isActive === '활성' ? true : false;

            return {
              ...v,
              isActive: isActive,
              isMembershipSupport: isMembershipSupport,
              isSetting: isSetting,
              isGarbage: isGarbage,
              isHotStorage: isHotStorage,
            };
          });
          setExelCorporation(exelSpotData);
          // console.log(json, 'json');
        }
        if (sheetName === '메이커스 정보') {
          setMakersExelInfo(
            json.map((v, i) => {
              if (
                (v.contractStartDate ||
                  v.contractEndDate ||
                  v.openTime ||
                  v.closeTime) &&
                i !== 0
              ) {
                return {
                  ...v,
                  contractStartDate:
                    v.contractStartDate &&
                    formattedWeekDate(v.contractStartDate),
                  contractEndDate:
                    v.contractEndDate && formattedWeekDate(v.contractEndDate),
                  openTime: v.openTime && formattedTime(v.openTime),
                  closeTime: v.closeTime && formattedTime(v.closeTime),
                };
              }
              if (v.isActive === '활성여부') {
                return {
                  ...v,
                  isActive: v.isActive,
                };
              }
              if (v.isActive === '활성') {
                return {
                  ...v,
                  isActive: true,
                };
              }
              return {
                ...v,
                isActive: false,
              };
            }),
          );
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };
  const handlerSaveExelUser = async () => {
    const result = exelUser.map((v, i) => {
      if (i !== 0) {
        return {
          password: v.password || null,
          paymentPassword: v.paymentPassword || null,
          name: v.userName,
          nickname: v.nickname,
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
      return undefined
    });
    const req = result.filter(element => {
      return element !== undefined && element !== null && element !== '';
    });
    await saveUserData(req);
    alert('저장 되었습니다.');
    return window.location.reload();
  };
  const handlerSaveUser = async () => {
    const result = user.map((v) => {
      return {
        password: v.password || null,
        paymentPassword: v.paymentPassword || null,
        name: v.userName,
        nickname: v.nickname,
        email: v.email,
        phone: v.phone || null,
        role: v.role || null,
        status: v.status,
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
    if (planExport && planExport.length > 0) {
      return planExel(planExport);
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
      return planExelExport(exelSpot, '상세 스팟 정보', '상세 스팟 정보.xlsx');
    }
    // if (product?.foodList && product?.foodList?.length > 0) {
    //   return productExel(product);
    // }
    if (exportProduct && exportProduct?.length > 0) {
      return productExel(exportProduct);
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
      const req = spot.filter(element => {
        return element !== undefined && element !== null && element !== '';
      });
      // 스팟 여기
      return spotExel(req, SpotInfoTotalRequiredFields);
      // return spotExel(req);
    }
    if (completePlan && completePlan.length > 0) {
      const req = completePlan.filter(element => {
        return element !== undefined && element !== null && element !== '';
      });
      return completePlanExel(req);
    }
    if (corporationExport && corporationExport?.length > 0) {
      console.log(corporationExport);
      return corporationInfoExel(corporationExport);
    }
    if (exelCorporation && exelCorporation.length > 0) {
      return corporationExelExport(
        exelCorporation,
        '스팟 정보',
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
    pathname !== `/shop/info/${id}` &&
    pathname !== `/order/info/detail/${orderNumber}` &&
    pathname !== `/calc/point` &&
    pathname !== `/order/additionalOrder` &&
    pathname !== '/board/review' &&
    pathname !== '/calc/makersCalc' &&
    pathname !== '/calc/makersCalc/detail' &&
    pathname !== '/calc/groupCalc' &&
    pathname !== '/calc/groupCalc/detail' &&
    pathname !== '/apply/spot' &&
    indexStatus !== 1 &&
    pathname !== '/backlog' &&
    pathname !== '/recommendation/makers' &&
    pathname !== '/shop/foodGroup' &&
    pathname !== '/board/notice' &&
    pathname !== '/board/notice/write' &&
    pathname !== '/makers/notice' &&
    pathname !== '/makers/notice/write' &&
    pathname !== '/customer/notice' &&
    pathname !== '/customer/notice/write' &&
    pathname !== '/others/customerTaste' &&
    pathname !== '/apply/makers';

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
              if (exelSpot && exelSpot.length) {
                console.log('exelSpot 엑셀 스팟 저장');

                let exelSpotFirstRowRemoved = [];

                exelSpot.forEach((v, i) => {
                  if (i === 0) {
                  } else {
                    exelSpotFirstRowRemoved.push(v);
                  }
                });

                const injectNull = exelSpotFirstRowRemoved.map(v => {
                  Object.keys(SpotInfoTotalRequiredFields).forEach(k => {
                    if (!Object.keys(v).includes(k)) {
                      v[k] = null;
                    }
                  });

                  return v;
                });

                saveSpotToDb(injectNull, sendExcelForceMutate, tableDeleteList);
              } else if (spotInfoData && spotInfoData.length) {
                // 상세스팟 아이디 자둥추가

                const injectSpotId = [...spotInfoData].map(v => {
                  if (!v['spotId']) {
                    v['spotId'] = Date.now();
                  }
                  return v;
                });

                saveSpotToDb(
                  injectSpotId,
                  sendExcelForceMutate,
                  tableDeleteList,
                );
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
              // console.log('아무것도 없음');
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
