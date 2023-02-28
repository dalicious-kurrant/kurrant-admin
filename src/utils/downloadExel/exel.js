import {formattedDate} from 'utils/dateFormatter';
import * as XLSX from 'xlsx';
import {scheduleFormatted} from '../statusFormatter';

export function planExel(plan) {
  const reqArrays = [];
  reqArrays.push([
    'makersName',
    'scheduleStatus',
    'serviceDate',
    'diningType',
    'makersCapacity',
    'pickupTime',
    'clientName',
    'clientCapacity',
    'leftClientCapacity',
    'scheduleStatus',
    'foodName',
    'foodStatus',
    'foodCapacity',
    'leftFoodCapacity',
  ]);
  reqArrays.push([
    '메이커스',
    '상태',
    '날짜',
    '다이닝타입',
    '메이커스 케파',
    '픽업시간',
    '고객사',
    '고객사 케파',
    '주문가능수량',
    '음식 승인',
    '상품',
    '음식 상태',
    'Food 케파',
    '주문가능수량',
  ]);
  plan.map(makers => {
    return makers.clientSchedule.map(client => {
      return client.foodSchedule.map(food => {
        const reqArray = [];
        reqArray.push(makers.makersName);
        reqArray.push(scheduleFormatted(makers.scheduleStatus));
        reqArray.push(makers.serviceDate);
        reqArray.push(makers.diningType);
        reqArray.push(makers.makersCapacity);
        reqArray.push(client.pickupTime);
        reqArray.push(client.clientName);
        reqArray.push(client.clientCapacity);
        reqArray.push(client.clientCapacity);
        reqArray.push(scheduleFormatted(food.scheduleStatus));
        reqArray.push(food.foodName);
        reqArray.push(food.foodStatus);
        reqArray.push(food.foodCapacity);
        reqArray.push(food.foodCapacity);
        reqArrays.push(reqArray);
        return reqArrays;
      });
    });
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '메이커스 일정 관리');
  XLSX.writeFile(workbook, '메이커스 일정 관리.xlsx');
}
export function planExelExport(plan, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(plan, {cellDates: true});

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}

// 상품 정보 엑셀

export function productExel(product) {
  const reqArrays = [];
  reqArrays.push([
    'foodId',
    'makersId',
    'makersName',
    'foodName',
    'foodStatus',
    'defaultPrice',
    'makersDiscount',
    'eventDiscount',
    'resultPrice',
    'description',
    'foodTags',
  ]);
  reqArrays.push([
    'ID',
    '메이커스ID',
    '메이커스이름',
    '식품이름',
    '판매상태',
    '매장가격',
    '매장할인률',
    '이벤트할인률',
    '최종가격',
    '설명',
    '식사 태그',
  ]);
  product?.data?.map(el => {
    const reqArray = [];
    reqArray.push(el.foodId);
    reqArray.push(el.makersId);
    reqArray.push(el.makersName);
    reqArray.push(el.foodName);
    reqArray.push(el.foodStatus);
    reqArray.push(el.defaultPrice);
    reqArray.push(el.makersDiscount);
    reqArray.push(el.eventDiscount);
    reqArray.push(el.resultPrice);
    reqArray.push(el.description);
    reqArray.push(el.foodTags.join(','));
    reqArrays.push(reqArray);
    return reqArrays;
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '상품 정보');
  XLSX.writeFile(workbook, '상품_정보.xlsx');
}

export function productExelExport(product, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(product, {cellDates: true});

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}

// 기업 정보 엑셀

export function corporationInfoExel(corporation) {
  const reqArrays = [];
  reqArrays.push([
    'id',
    'code',
    'name',
    'zipCode',
    'address1',
    'address2',
    'location',
    'diningTypes',
    'serviceDays',
    'managerName',
    'isMembershipSupport',
    'employeeCount',
    'isSetting',
    'isGarbage',
    'isHotStorage',
    'createdDateTime',
    'updatedDateTime',
  ]);
  reqArrays.push([
    '그룹ID',
    '기업코드',
    '이름',
    '우편번호',
    '기본주소',
    '상세주소',
    '위치',
    '식사 타입',
    '식사 요일',
    '담당자',
    '담당자 전화번호',
    '기업멤버십 지원여부',
    '사원수',
    '식사 세팅 지원 서비스',
    '쓰레기 수거 서비스',
    '온장고 대여 서비스',
    '생성일',
    '수정일',
  ]);

  corporation?.data?.items?.groupInfoList?.map(el => {
    const diningType =
      el.diningTypes === 1 ? '아침' : el.diningTypes === 2 ? '점심' : '저녁';
    const membership = el.isMembershipSupport ? '지원' : '미지원';
    const setting = el.isSetting ? '사용' : '미사용';
    const garbage = el.isGarbage ? '사용' : '미사용';
    const hotStorage = el.isHotStorage ? '사용' : '미사용';
    const reqArray = [];
    reqArray.push(el.id);
    reqArray.push(el.code);
    reqArray.push(el.name);
    reqArray.push(el.zipCode);
    reqArray.push(el.address1);
    reqArray.push(el.address2);
    reqArray.push(el.location);
    reqArray.push(diningType);
    reqArray.push(el.serviceDays);
    reqArray.push(el.managerName);
    reqArray.push(el.managerPhone);
    reqArray.push(membership);
    reqArray.push(el.employeeCount);
    reqArray.push(setting);
    reqArray.push(garbage);
    reqArray.push(hotStorage);
    reqArray.push(formattedDate(el.createdDateTime, '년월일'));
    reqArray.push(formattedDate(el.updatedDateTime, '년월일'));
    reqArrays.push(reqArray);

    return reqArrays;
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '기업 정보');
  XLSX.writeFile(workbook, '기업_정보.xlsx');
}

export function corporationExelExport(corporation, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(corporation, {cellDates: true});

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}
