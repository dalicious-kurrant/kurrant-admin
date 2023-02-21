import * as XLSX from 'xlsx';

export function planExel(plan) {
  const reqArrays = [];
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
        reqArray.push(makers.scheduleStatus);
        reqArray.push(makers.serviceDate);
        reqArray.push(makers.diningType);
        reqArray.push(makers.makersCapacity);
        reqArray.push(makers.deadline);
        reqArray.push(client.pickupTime);
        reqArray.push(client.clientName);
        reqArray.push(client.clientCapacity);
        reqArray.push(food.foodName);
        reqArray.push(food.foodStatus);
        reqArray.push(food.foodCapacity);
        reqArray.push(food.scheduleStatus);
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

export function productExel(product) {
  const reqArrays = [];
  reqArrays.push([
    'ID',
    '메이커스 이름',
    '식품이름',
    '매장가격',
    '매장할인율',
    '이벤트할인율',
    '최종가격',
    '설명',
    '식사 태그',
  ]);

  product.map(makers => {
    return makers.clientSchedule.map(client => {
      return client.foodSchedule.map(food => {
        const reqArray = [];
        reqArray.push(makers.scheduleStatus);
        reqArray.push(makers.serviceDate);
        reqArray.push(makers.diningType);
        reqArray.push(makers.makersCapacity);
        reqArray.push(makers.deadline);
        reqArray.push(client.pickupTime);
        reqArray.push(client.clientName);
        reqArray.push(client.clientCapacity);
        reqArray.push(food.foodName);
        reqArray.push(food.foodStatus);
        reqArray.push(food.foodCapacity);
        reqArray.push(food.scheduleStatus);
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
