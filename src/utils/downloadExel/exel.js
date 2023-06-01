import {formattedDate, formattedTime} from 'utils/dateFormatter';
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
export function completePlanExel(plan) {
  const reqArrays = [];
  reqArrays.push([
    'serviceDate',
    'diningType',
    'groupName',
    'groupCapacity',
    'deliveryTime',
    'makersName',
    'makersCapacity',
    'makersCount',
    'makersPickupTime',
    'foodName',
    'dailyFoodStatus',
    'foodCapacity',
    'foodCount',
    'dailyFoodId',
  ]);
  reqArrays.push([
    '날짜',
    '다이닝타입',
    '고객사 이름',
    '고객사 식수',
    '배송 시간',
    '메이커스',
    '메이커스 케파',
    '주문가능 수량',
    '메이커스 픽업 시간',
    '상품',
    '음식 상태',
    '음식 케파',
    '주문가능 수량',
    '데일리푸드 ID (추가시 빈값)',
  ]);
  plan.map(makers => {
    return makers.makersSchedules.map(client => {
      return client.foodSchedules.map(food => {
        const reqArray = [];
        reqArray.push(makers.serviceDate);
        reqArray.push(makers.diningType);
        reqArray.push(makers.groupName);
        reqArray.push(makers.groupCapacity);
        reqArray.push(makers.deliveryTime);
        reqArray.push(client.makersName);
        reqArray.push(client.makersCapacity);
        reqArray.push(client.makersCount);
        reqArray.push(client.makersPickupTime);
        reqArray.push(food.foodName);
        reqArray.push(food.dailyFoodStatus);
        reqArray.push(food.foodCapacity);
        reqArray.push(food.foodCount);
        reqArray.push(food.dailyFoodId);
        reqArrays.push(reqArray);
        return reqArrays;
      });
    });
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '식단 현황');
  XLSX.writeFile(workbook, '식단 현황.xlsx');
}
export function planExelExport(plan, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(plan, {cellDates: true});

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}

// 상품 정보 엑셀

export function productExel(product) {
  console.log(product);
  const reqArrays = [];
  reqArrays.push([
    'foodId',
    'makersId',
    'makersName',
    'foodName',
    'foodStatus',
    'supplyPrice',
    'defaultPrice',
    'membershipDiscount',
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
    '공급가',
    '매장가격',
    '멤버십할인률',
    '매장할인률',
    '이벤트할인률',
    '최종가격',
    '설명',
    '식사 태그',
  ]);

  product?.map(el => {
    const reqArray = [];
    reqArray.push(el.foodId);
    reqArray.push(el.makersId);
    reqArray.push(el.makersName);
    reqArray.push(el.foodName);
    reqArray.push(el.foodStatus);
    reqArray.push(el.supplyPrice ?? 0);
    reqArray.push(el.defaultPrice);
    reqArray.push(el.membershipDiscount);
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
export function userExel(user) {
  const reqArrays = [];
  reqArrays.push([
    'status',
    'email',
    'paymentPassword',
    'password',
    'userName',
    'role',
    'phone',
    'groupName',
    'point',
    'gourmetType',
    'isMembership',
    'marketingAgreed',
    'marketingAgreedDateTime',
    'marketingAlarm',
    'userOrderAlarm',
    'recentLoginDateTime',
    'userCreatedDateTime',
    'userUpdatedDateTime',
    'generalEmail',
    'kakaoEmail',
    'naverEmail',
    'facebookEmail',
    'appleEmail',
  ]);
  reqArrays.push([
    '유저 상태',
    '이메일',
    '결제 비밀번호',
    '비밀번호',
    '사용자 명',
    '유저 타입',
    '폰 번호',
    '그룹이름',
    '보유 포인트',
    '미식가 타입',
    '맴버십 여부',
    '이메일 동의 여부',
    '이메일 동의/철회 날짜',
    '혜택 및 소식 알림',
    '주문 알림',
    '마지막 로그인 날짜',
    '생성일',
    '수정일',
    '일반기업_이메일',
    '카카오_이메일',
    '네이버_이메일',
    '페이스북_이메일',
    '애플_이메일',
  ]);

  user?.map(el => {
    const reqArray = [];
    reqArray.push(el.status);
    reqArray.push(el.email);
    reqArray.push(el.paymentPassword);
    reqArray.push(el.password);
    reqArray.push(el.userName);
    reqArray.push(el.role);
    reqArray.push(el.phone);
    reqArray.push(el.groupName);
    reqArray.push(el.point);
    reqArray.push(el.gourmetType);
    reqArray.push(el.isMembership);
    reqArray.push(el.marketingAgreed);
    reqArray.push(el.marketingAgreedDateTime);
    reqArray.push(el.marketingAlarm);
    reqArray.push(el.userOrderAlarm);
    reqArray.push(el.recentLoginDateTime);
    reqArray.push(el.userCreatedDateTime);
    reqArray.push(el.userUpdatedDateTime);
    reqArray.push(el.generalEmail);
    reqArray.push(el.kakaoEmail);
    reqArray.push(el.naverEmail);
    reqArray.push(el.facebookEmail);
    reqArray.push(el.appleEmail);
    reqArrays.push(reqArray);
    return reqArrays;
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '유저 정보');
  XLSX.writeFile(workbook, '유저 정보.xlsx');
}
export function spotExel(spot, spotInfoRequiredFields) {
  const reqArrays = [];
  const spotInfoFieldsEng = Object.keys(spotInfoRequiredFields);
  const spotInfoFieldsKor = Object.values(spotInfoRequiredFields);

  reqArrays.push(spotInfoFieldsEng);
  reqArrays.push(spotInfoFieldsKor);

  console.log(spot);
  spot?.map(el => {
    const reqArray = [];
    spotInfoFieldsEng.forEach(v => {
      reqArray.push(el[v]);
    });

    reqArrays.push(reqArray);
    return reqArrays;
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '상세 스팟 정보');
  XLSX.writeFile(workbook, '상세 스팟 정보.xlsx');
}

export function productExelExport(product, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(product, {cellDates: true});

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}

// 스팟 정보 엑셀

export function corporationInfoExel(corporation) {
  const reqArrays = [];
  reqArrays.push([
    'id',
    'isActive',
    'groupType',
    'code',
    'name',
    'zipCode',
    'address1',
    'address2',
    'location',
    'diningTypes',
    'supportDays',
    'notSupportDays',
    'serviceDays',
    'managerId',
    'managerName',
    'managerPhone',
    'isMembershipSupport',
    'membershipEndDate',
    'morningSupportPrice',
    'lunchSupportPrice',
    'dinnerSupportPrice',
    'employeeCount',
    'isSetting',
    'isGarbage',
    'isHotStorage',
    'minimumSpend',
    'maximumSpend',
  ]);
  reqArrays.push([
    '그룹ID',
    '활성여부',
    '스팟타입',
    '기업코드',
    '이름',
    '우편번호',
    '기본주소',
    '상세주소',
    '위치',
    '식사 타입',
    '지원급 적용O',
    '지원급 적용X',
    '식사 요일',
    '담당자 ID',
    '담당자',
    '담당자 전화번호',
    '기업멤버십 지원여부',
    '멤버십 종료 날짜',
    '아침 지원금',
    '점심 지원금',
    '저녁 지원금',
    '사원수',
    '식사 세팅 지원 서비스',
    '쓰레기 수거 서비스',
    '온장고 대여 서비스',
    '최소 구매 가능 금액',
    '최대 구매 가능 금액',
  ]);

  corporation?.map(el => {
    const diningType = el.diningTypes.map(v =>
      v === 1 ? '아침' : v === 2 ? '점심' : '저녁',
    );

    const membership = el.isMembershipSupport ? '지원' : '미지원';
    const isActive = el.isActive ? '활성' : '비활성';
    const setting = el.isSetting ? '사용' : '미사용';
    const garbage = el.isGarbage ? '사용' : '미사용';
    const hotStorage = el.isHotStorage ? '사용' : '미사용';
    const reqArray = [];
    reqArray.push(el.id);
    reqArray.push(isActive);
    reqArray.push(el.groupType);
    reqArray.push(el.code);
    reqArray.push(el.name);
    reqArray.push(el.zipCode);
    reqArray.push(el.address1);
    reqArray.push(el.address2);
    reqArray.push(el.location);
    reqArray.push(diningType.join(','));    
    reqArray.push(el.supportDays);
    reqArray.push(el.notSupportDays);
    reqArray.push(el.serviceDays);
    reqArray.push(el.managerId);
    reqArray.push(el.managerName);
    reqArray.push(el.managerPhone);
    reqArray.push(membership);
    reqArray.push(el.membershipEndDate);
    reqArray.push(el.morningSupportPrice);
    reqArray.push(el.lunchSupportPrice);
    reqArray.push(el.dinnerSupportPrice);
    reqArray.push(el.employeeCount);
    reqArray.push(setting);
    reqArray.push(garbage);
    reqArray.push(hotStorage);
    reqArray.push(el.minimumSpend);
    reqArray.push(el.maximumSpend);

    reqArrays.push(reqArray);

    return reqArrays;
  });
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '스팟 정보');
  XLSX.writeFile(workbook, '스팟 정보.xlsx');
}

export function corporationExelExport(corporation, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(corporation, {cellDates: true});

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}

// 메이커스 정보
export function makersInfoExel(makersInformation) {
  const reqArrays = [];
  reqArrays.push([
    'id',
    'isActive',
    'code',
    'name',
    'companyName',
    'ceo',
    'ceoPhone',
    'managerName',
    'managerPhone',
    'dailyCapacity',
    'serviceDays',
    'diningTypes',
    'morningLastOrderTime',
    'morningCapa',
    'morningMinTime',
    'morningMaxTime',
    'lunchLastOrderTime',
    'lunchCapa',
    'lunchMinTime',
    'lunchMaxTime',
    'dinnerLastOrderTime',
    'dinnerCapa',
    'dinnerMinTime',
    'dinnerMaxTime',
    'dailyCapacity',
    'serviceType',
    'serviceForm',
    'isParentCompany',
    'parentCompanyId',
    'zipCode',
    'address1',
    'address2',
    'location',
    'companyRegistrationNumber',
    'contractStartDate',
    'contractEndDate',
    'isNutritionInformation',
    'openTime',
    'closeTime',
    'fee',
    'bank',
    'depositHolder',
    'accountNumber',
  ]);
  reqArrays.push([
    'ID',
    '활성여부',
    '메이커스 코드',
    '메이커스 이름',
    '법인명',
    '사업자대표',
    '대표자 전화번호',
    '담당자 이름',
    '담당자 전화번호',
    '일일 최대 수량',
    '영업 요일',
    '가능 다이닝타입',
    '아침 주문가능시간',
    '아침가능 케파',
    '아침 시작',
    '아침 종료',
    '점심 주문가능시간',
    '점심가능 케파',
    '점심 시작',
    '점심 종료',
    '저녁 주문가능시간',
    '저녁가능 케파',
    '저녁 시작',
    '저녁 종료',
    '일일최대수량',
    '서비스 업종',
    '서비스 형태',
    '모회사 여부',
    '모회사 ID',
    '우편번호',
    '기본주소',
    '상세주소',
    '위치',
    '사업자 등록번호',
    '계약 시작날짜',
    '계약 종료날짜',
    '외식영양정보 표시 대상 여부',
    '영업 시작시간',
    '영업 종료시간',
    '사용료',
    '은행',
    '예금주 명',
    '계좌번호',
  ]);

  makersInformation?.data?.map(el => {
    console.log(el, '9999');
    const isActive = el.isActive ? '활성' : '비활성';
    const reqArray = [];
    reqArray.push(el.id);
    reqArray.push(isActive);
    reqArray.push(el.code);
    reqArray.push(el.name);
    reqArray.push(el.companyName);
    reqArray.push(el.ceo);
    reqArray.push(el.ceoPhone);
    reqArray.push(el.managerName);
    reqArray.push(el.managerPhone);
    reqArray.push(el.dailyCapacity);
    reqArray.push(el.serviceDays);
    reqArray.push(el.diningTypes.join(','));
    reqArray.push(el.morningLastOrderTime);
    reqArray.push(el.morningCapacity);
    reqArray.push(el.morningMinTime);
    reqArray.push(el.morningMaxTime);
    reqArray.push(el.lunchLastOrderTime);
    reqArray.push(el.lunchCapacity);
    reqArray.push(el.lunchMinTime);
    reqArray.push(el.lunchMaxTime);
    reqArray.push(el.dinnerLastOrderTime);
    reqArray.push(el.dinnerCapacity);
    reqArray.push(el.dinnerMinTime);
    reqArray.push(el.dinnerMaxTime);
    reqArray.push(el.dailyCapacity);
    reqArray.push(el.serviceType);
    reqArray.push(el.serviceForm);
    reqArray.push(el.isParentCompany);
    reqArray.push(el.parentCompanyId);
    reqArray.push(el.zipCode);
    reqArray.push(el.address1);
    reqArray.push(el.address2);
    reqArray.push(el.location);
    reqArray.push(el.companyRegistrationNumber);
    reqArray.push(el.contractStartDate);
    reqArray.push(el.contractEndDate);
    reqArray.push(el.isNutritionInformation);
    reqArray.push(el.openTime);
    reqArray.push(el.closeTime);
    reqArray.push(el.fee);
    reqArray.push(el.bank);
    reqArray.push(el.depositHolder);
    reqArray.push(el.accountNumber);

    reqArrays.push(reqArray);
    return reqArrays;
  });
  console.log(reqArrays);
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.aoa_to_sheet(reqArrays);

  XLSX.utils.book_append_sheet(workbook, worksheet, '메이커스 정보');
  XLSX.writeFile(workbook, '메이커스_정보.xlsx');
}

export function makersInfoExelExport(makersInformation, sheetName, fileName) {
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(makersInformation, {
    cellDates: true,
  });

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
}
