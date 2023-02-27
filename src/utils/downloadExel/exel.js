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
  XLSX.writeFile(workbook, '메이커스_일정_관리.xlsx');
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
