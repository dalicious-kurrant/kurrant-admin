import React from 'react';
import Diet from '../pages/order/Diet';
import Order from '../pages/order/orderInfomation/Order';
import Makers from '../pages/makers/Makers';
import Spot from '../pages/customer/Spot';
import Customer from '../pages/customer/Customer';
import Company from '../pages/customer/Company';
import CompanyList from '../pages/customer/CompanyList';
import Apartment from '../pages/customer/Apartment';
import ItemInfo from '../pages/item/ItemInfo';
import Plans from '../pages/makers/Plans';
import Schedule from '../pages/salesSchedule/Schedule';
import SpotInfo from 'pages/customer/SpotInfo/SpotInfo';
import SpotInfoExcel from 'pages/customer/SpotInfo/SpotInfoExcel';

export const MenuList = [
  {
    name: '주문',
    url: '/order',
    children: [
      {
        name: '주문 정보',
        url: '/info',
        component: <Order />,
      },
      {
        name: '식단 정보',
        url: '/diet',
        component: <Diet />,
      },
    ],
  },
  {
    name: '고객',
    url: '/customer',
    children: [
      {
        name: '유저 정보',
        url: '/info',
        component: <Customer />,
      },
      {
        name: '기업 정보',
        url: '/company',
        component: <Company />,
      },
      {
        name: '기업 가입리스트',
        url: '/company-list',
        component: <CompanyList />,
      },
      {
        name: '스팟 정보',
        url: '/spot',
        component: <SpotInfoExcel />,
        // component: <SpotInfo />,
        // component: <Spot />,
      },
      {
        name: '아파트 정보',
        url: '/apartment',
        component: <Apartment />,
      },
    ],
  },
  {
    name: '메이커스',
    url: '/makers',
    children: [
      {
        name: '메이커스 정보',
        url: '/info',
        component: <Makers />,
      },
      {
        name: '메이커스 정보 변경',
        url: '/modify',
      },
      {
        name: '원산지 휴무일',
        url: '/holiday',
      },
      {
        name: '메이커스 변경 요청',
        url: '/apply',
      },
      {
        name: '메이커스 일정',
        url: '/plans',
        component: <Plans />,
      },
    ],
  },
  {
    name: '상품',
    url: '/shop',
    children: [
      {
        name: '상품 정보',
        url: '/info',
        component: <ItemInfo />,
      },
      {
        name: '상품 등록요청',
        url: '/register',
      },
      {
        name: '상품정보 변경요청',
        url: '/modify',
      },
      {
        name: '카테고리 관리',
        url: '/category',
      },
    ],
  },
  {
    name: '신청',
    url: '/apply',
    children: [
      {
        name: '메이커스 신청',
        url: '/makers',
      },
      {
        name: '스팟 신청',
        url: '/spot',
      },
      {
        name: '정기식사 신청',
        url: '/diet',
      },
      {
        name: '케이터링 신청',
        url: '/catering',
      },
    ],
  },
  {
    name: '게시판&리뷰',
    url: '/board',
    children: [
      {
        name: '리뷰 및 신고',
        url: '/review',
      },
      {
        name: '컨텐츠 관리',
        url: '/contents',
      },
      {
        name: '공지사항',
        url: '/notice',
      },
      {
        name: '푸쉬알림',
        url: '/notification',
      },
      {
        name: '이용 가이드',
        url: '/guide',
      },
    ],
  },
  {
    name: '정산',
    url: '/calc',
    children: [
      {
        name: '정산 조회',
        url: '/info',
      },
      {
        name: '메이커스 정산',
        url: '/makers',
      },
      {
        name: '수수료 관리',
        url: '/charge',
      },
      {
        name: '정산 수정 요청',
        url: '/modify',
      },
      {
        name: '정산 이슈',
        url: '/issue',
      },
    ],
  },
  {
    name: '판매일정',
    url: '/sales',
    children: [
      {
        name: '판매일정/내역',
        url: '/schedule',
        component: <Schedule />,
      },
    ],
  },
];
