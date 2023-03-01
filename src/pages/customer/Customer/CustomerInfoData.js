export const CustomerFieldsToOpen = {
  // id: '아이디이이',
  // userId: '아이디',
  email: '이메일',
  password: '비밀번호',
  userName: '사용자 명',
  role: '유저타입',
  phone: '폰 번호',

  groupName: '그룹이름',
  point: '보유 포인트',
  gourmetType: '미식가 타입',
  isMembership: '멤버십 여부',
  userEmailAgreed: '이메일 동의여부',
  userEmailAgreedDateTime: '이메일 동의 / 철회 날짜',
  userOrderAlarm: '주문 알림',
  recentLoginDateTime: '마지막 로그인 날짜',
  userCreatedDateTime: '생성일',
  userUpdatedDateTime: '수정일',
  generalEmail: '일반기업_이메일',
  kakaoEmail: '카카오_이메일',
  naverEmail: '네이버_이메일',
  facebookEmail: '페이스북_이메일',
  appleEmail: '애플_이메일',
};

export const CustomerFieldsFilterList = [
  {
    fieldName: 'role',
    filterType: 'select',
    selectList: ['일반', '관리자', '게스트'],
  },
  {fieldName: 'email', filterType: 'text'},
];

const inputType = {
  select: 'select',
  text: 'text',
};

export const CustomerFieldsDataForRegister = [
  // {
  //   fieldName: 'userId',
  //   fieldNameKor: '아이디',
  //   placeholder: '',
  //   maxCharLength: 20,
  //   flex: 1,

  //   width: undefined,
  // },

  {
    fieldName: 'email',
    fieldNameKor: '이메일',
    placeholder: '',
    maxCharLength: 30,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'password',
    fieldNameKor: '비밀번호',
    placeholder: '',
    maxCharLength: 30,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
    showCharLength: 10,
  },

  {
    fieldName: 'userName',
    fieldNameKor: '사용자 명',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  // {
  //   fieldName: 'role',
  //   fieldNameKor: '유저타입(0: 일반, 1: 관리자)',
  //   placeholder: "'일반'아니면 '관리자'로 입력 ",
  //   maxCharLength: 20,
  //   flex: 1,
  //   width: undefined,
  // },
  {
    fieldName: 'role',
    fieldNameKor: '유저타입',
    placeholder: "'일반'아니면 '관리자'로 입력 ",
    maxCharLength: 20,
    flex: 2,
    width: undefined,
    inputType: inputType.select,
    options: [
      {name: '일반', value: '일반'},
      {name: '관리자', value: '관리자'},
    ],
  },

  {
    fieldName: 'phone',
    fieldNameKor: '폰 번호',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'groupName',
    fieldNameKor: '그룹이름',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'point',
    fieldNameKor: '보유 포인트',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'gourmetType',
    fieldNameKor: '미식가 타입',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'isMembership',
    fieldNameKor: '멤버십 여부',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'userEmailAgreed',
    fieldNameKor: '이메일 동의여부',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'userEmailAgreedDateTime',
    fieldNameKor: '이메일 동의 / 철회 날짜',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'userOrderAlarm',
    fieldNameKor: '주문 알림',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'recentLoginDateTime',
    fieldNameKor: '마지막 로그인 날짜',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'userCreatedDateTime',
    fieldNameKor: '생성일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'userUpdatedDateTime',
    fieldNameKor: '수정일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'generalEmail',
    fieldNameKor: '일반기업_이메일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'kakaoEmail',
    fieldNameKor: '카카오_이메일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'naverEmail',
    fieldNameKor: '네이버_이메일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'facebookEmail',
    fieldNameKor: '페이스북_이메일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },

  {
    fieldName: 'appleEmail',
    fieldNameKor: '애플_이메일',
    placeholder: '',
    maxCharLength: 20,
    flex: 1,
    width: undefined,
    inputType: inputType.text,
  },
];

export const CustomerMockData = [
  {
    userId: 'num',
    password: 'str',
    userName: 'str',
    role: 'str',
    phone: 'str',
    email: 'str',
    groupName: 'str',
    point: 'num',
    gourmetType: 'str',
    isMembership: 'Boolean',
    userEmailAgreed: 'str',
    userEmailAgreedDateTime: 'str',
    userOrderAlarm: 'str',
    recentLoginDateTime: 'str',
    userCreatedDateTime: 'str',
    userUpdatedDateTime: 'str',
    generalEmail: 'str',
    kakaoEmail: 'str',
    naverEmail: 'str',
    facebookEmail: 'str',
    appleEmail: 'str',
  },
  {
    userId: 'num2',
    password: 'str',
    userName: 'str',
    role: 'str',
    phone: 'str',
    email: 'str',
    groupName: 'str',
    point: 'num',
    gourmetType: 'str',
    isMembership: 'Boolean',
    userEmailAgreed: 'str',
    userEmailAgreedDateTime: 'str',
    userOrderAlarm: 'str',
    recentLoginDateTime: 'str',
    userCreatedDateTime: 'str',
    userUpdatedDateTime: 'str',
    generalEmail: 'str',
    kakaoEmail: 'str',
    naverEmail: 'str',
    facebookEmail: 'str',
    appleEmail: 'str',
  },
];
