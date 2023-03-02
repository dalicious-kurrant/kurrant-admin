export const SpotInfoRegisterFieldsToOpen = {
  // id: '아이디',

  groupId: '스팟 아이디', // 1, 2, 3
  groupName: '스팟 이름',
  spotId: '상세스팟 아이디',
  spotName: '상세스팟 이름',
  zipCode: '우편번호', // 빈칸이면 안됨, 00000
  address1: '기본주소', // 빈칸 가능
  address2: '상세주소', // 빈칸 가능
  location: '위치', // 빈칸 가능
  diningType: '식타입', //  1,2,3, 복수선택 가능 스트링임
  breakfastDeliveryTime: '배송시아침', //  "00:00:00"형식 준수
  breakfastSupportPrice: '지원아침', // null가능number, 0 가능
  breakfastUseDays: '주문요일아침', //null가능 빈칸 가능 월, 수 금
  breakfastLastOrderTime: '아침주문마감시간',
  lunchDeliveryTime: '배송시간점심', // null가능"00:00:00"형식 준수
  lunchSupportPrice: '지원금점심', // null가능number 0가능
  lunchUseDays: '주문요일점심', //null가능 빈 칸 가능 "월, 화 수목금"
  lunchLastOrderTime: '점심주문마감시간',
  dinnerDeliveryTime: '배송시간저녁', // null 가능
  dinnerSupportPrice: '지원금저녁', // null 가능
  dinnerUseDays: '주문요일저녁', // null 가능
  dinnerLastOrderTime: '저녁주문마감시간',

  createdDateTime: '생성일',
  updatedDateTime: '수정일',
};

export const SpotInfoFieldsToOpen = {
  // id: '아이디',
  // groupId: '스팟 아이디', // 1, 2, 3
  groupName: '스팟 이름',
  // spotId: '상세스팟 아이디',
  spotName: '상세스팟 이름',
  zipCode: '우편번호', // 빈칸이면 안됨, 00000
  address1: '기본주소', // 빈칸 가능
  address2: '상세주소', // 빈칸 가능
  location: '위치', // 빈칸 가능
  diningType: '식타입', //  1,2,3, 복수선택 가능 스트링임
  breakfastDeliveryTime: '배송시아침', //  "00:00"형식 준수
  breakfastSupportPrice: '지원아침', // null가능number, 0 가능
  breakfastUseDays: '주문요일아침', //null가능 빈칸 가능 월, 수 금
  breakfastLastOrderTime: '아침주문마감시간', //  "00:00"형식 준수
  lunchDeliveryTime: '배송시간점심', // null가능"00:00:00"형식 준수
  lunchSupportPrice: '지원금점심', // null가능number 0가능
  lunchUseDays: '주문요일점심', //null가능 빈 칸 가능 "월, 화 수목금"
  lunchLastOrderTime: '점심주문마감시간',

  dinnerDeliveryTime: '배송시간저녁', // null 가능
  dinnerSupportPrice: '지원금저녁', // null 가능
  dinnerUseDays: '주문요일저녁', // null 가능
  dinnerLastOrderTime: '저녁주문마감시간',

  createdDateTime: '생성일', // '2023-03-01';
  updatedDateTime: '수정일', // '2023-03-02';
};

const inputType = {
  select: 'select',
  text: 'text',
  dependent: 'dependent',
};
export const SpotInfoFieldsData = [
  {
    fieldName: 'groupId',
    fieldNameKor: '스팟 이름',
    placeholder: '필수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    inputType: inputType.select,
    options: [
      {name: '달리셔스', value: '1'},
      {name: '위시티지이아파트', value: '2'},
      {name: '밀당PT 여의도', value: '3'},
    ],
  },
  // {
  //   fieldName: 'groupName',
  //   fieldNameKor: '스팟 이름',
  //   placeholder: '필수',
  //   maxCharLength: 40,
  //   flex: 1,
  //   width: undefined,
  // },
  {
    fieldName: 'spotId',
    fieldNameKor: '상세스팟 아이디',
    placeholder: '필수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 160,
  },
  {
    fieldName: 'spotName',
    fieldNameKor: '상세스팟 이름',
    placeholder: '필수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'zipCode',
    fieldNameKor: '우편번호',
    placeholder: '예) 00000',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 170,
  },
  {
    fieldName: 'address1',
    fieldNameKor: '기본주소',
    placeholder: '',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'address2',
    fieldNameKor: '상세주소',
    placeholder: '',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'location',
    fieldNameKor: '위치 ',
    placeholder: '',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'diningType',
    fieldNameKor: '식타입',
    placeholder: '아침, 점심, 저녁 복수선택',
    maxCharLength: 40,
    flex: 1,
    width: undefined,

    inputType: inputType.text,
    // inputType: inputType.select,
    // options: [
    //   {name: '아침', value: '아침'},
    //   {name: '점심', value: '점심'},
    //   {name: '저녁', value: '저녁'},
    // ],
    headerWidth: 400,
  },
  {
    fieldName: 'breakfastDeliveryTime',
    fieldNameKor: '배송시아침',
    placeholder: '예) 00:00:00',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 200,
  },
  {
    fieldName: 'breakfastSupportPrice',
    fieldNameKor: '지원아침',
    placeholder: '숫자 입력',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'breakfastUseDays',
    fieldNameKor: '주문요일아침',
    placeholder: '예) 월, 화, 수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 160,
  },
  {
    fieldName: 'breakfastLastOrderTime',
    fieldNameKor: '아침주문마감시간',
    placeholder: '예) 월, 화, 수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 160,
  },

  {
    fieldName: 'lunchDeliveryTime',
    fieldNameKor: '배송시간점심',
    placeholder: ' 예) 00:00:00 ',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 260,
  },
  {
    fieldName: 'lunchSupportPrice',
    fieldNameKor: '지원금점심',
    placeholder: '숫자 입력',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'lunchUseDays',
    fieldNameKor: '주문요일점심',
    placeholder: '예) 00:00:00',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 200,
  },
  {
    fieldName: 'lunchLastOrderTime',
    fieldNameKor: '점심주문마감시간',
    placeholder: '예) 00:00:00',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 200,
  },
  {
    fieldName: 'dinnerDeliveryTime',
    fieldNameKor: '배송시간저녁',
    placeholder: '예) 00:00:00',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
    headerWidth: 200,
  },
  {
    fieldName: 'dinnerSupportPrice',
    fieldNameKor: '지원금저녁',
    placeholder: '숫자 입력',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'dinnerUseDays',
    fieldNameKor: '주문요일저녁',
    placeholder: '월, 화, 수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'dinnerLastOrderTime',
    fieldNameKor: '저녁주문마감시간',
    placeholder: '월, 화, 수',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },

  // {
  //   fieldName: 'lastOrderTime',
  //   fieldNameKor: '주문마감시간',
  //   placeholder: '예) 00:00:00',
  //   maxCharLength: 40,
  //   flex: 1,
  //   width: undefined,
  //   headerWidth: 180,
  // },
  {
    fieldName: 'createdDateTime',
    fieldNameKor: '생성일',
    placeholder: '',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
  {
    fieldName: 'updatedDateTime',
    fieldNameKor: '수정일',
    placeholder: '',
    maxCharLength: 40,
    flex: 1,
    width: undefined,
  },
];
