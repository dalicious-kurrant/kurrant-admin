import React from 'react';
import Order from '../pages/order/orderInfomation/Order';
import Makers from '../pages/makers/Makers';

import CompanyList from '../pages/customer/CompanyList';
import Apartment from '../pages/customer/Apartment';
import ItemInfo from '../pages/item/ItemInfo';
import Plans from '../pages/makers/Plans';
import SpotInfo from '../pages/customer/SpotInfo/SpotInfo';
import Schedule from '../pages/salesSchedule/Schedule';
import CompletePlans from '../pages/makers/CompletePlans';
import CustomerCustom from 'pages/customer/Customer/CustomerCustom';
import Group from '../pages/recommendation/group/Group';
import Personal from '../pages/recommendation/personal';
import Learning from '../pages/recommendation/learning/Learning';
import ReviewPage from 'pages/boardAndReview/review/ReviewPage';
import Point from 'pages/calculation/point/Point';
import AdditionalOrder from 'pages/order/additionalOrder/AdditionalOrder';
import Notification from 'pages/notification/Notification';
import MakersCalc from 'pages/adjustment/MakersCalc';
import ClientCalc from 'pages/adjustment/ClientCalc';
import Main from 'pages/apply/spot/Main';
import SpotInformation from 'pages/customer/corporation/SpotInformation';
import RecommendationMakersPage from 'pages/recommendation/makers/RecommendationMakersPage';
import FoodGroupPage from 'pages/shop/foodGroup/FoodGroupPage';
import Announcement from 'pages/announcement/Announcement';
import MakersNotice from 'pages/makers/MakersNotice';
import CompanyNotice from 'pages/customer/notice/CompanyNotice';
import Worker from 'pages/delivery/Worker';
import Information from 'pages/delivery/Information';
import CustomerTastePage from 'pages/customerTaste/CustomerTastePage';
import RegisterMakers from 'pages/apply/makers/RegisterMakers';
import RecommnedMakers from 'pages/makers/RecommendMakers';

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
        name: '식단 현황',
        url: '/completeplans',
        component: <CompletePlans />,
      },
      {
        name: '주문 추가',
        url: '/additionalOrder',
        component: <AdditionalOrder />,
      },
    ],
  },
  {
    name: '배송',
    url: '/delivery',
    children: [
      {
        name: '배송기사 정보',
        url: '/worker',
        component: <Worker />,
      },
      {
        name: '배송기사 배송정보',
        url: '/information',
        component: <Information />,
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
        component: <CustomerCustom />,
        // component: <></>,
      },
      {
        name: '스팟 정보',
        url: '/spotInformation',
        component: <SpotInformation />,
      },
      {
        name: '기업 가입리스트 (진행중)',
        url: '/company-list',
        component: <CompanyList />,
      },
      {
        name: '상세 스팟 정보',
        url: '/spot',
        component: <SpotInfo />,
        // component: <Spot />,
      },
      {
        name: '아파트 정보 (진행중)',
        url: '/apartment',
        component: <Apartment />,
      },
      {
        name: '고객사 공지사항',
        url: '/notice',
        component: <CompanyNotice />,
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
        name: '메이커스 정보 변경 (진행중)',
        url: '/modify',
      },
      {
        name: '원산지 휴무일',
        url: '/holiday',
      },
      {
        name: '메이커스 변경 요청 (진행중)',
        url: '/apply',
      },
      {
        name: '메이커스 일정 요청',
        url: '/plans',
        component: <Plans />,
      },
      {
        name: '메이커스 공지사항',
        url: '/notice',
        component: <MakersNotice />,
      },
      {
        name: '메이커스 추천',
        url: '/recommend',
        component: <RecommnedMakers />,
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
        name: '상품 그룹',
        url: '/foodGroup',
        component: <FoodGroupPage />,
      },

      // {
      //   name: '상품 상세 정보',
      //   url: '/info/:id',
      //   component: <ItemInfoDetail />,
      // },
      {
        name: '상품 등록요청 (진행중)',
        url: '/register',
      },
      {
        name: '상품정보 변경요청 (진행중)',
        url: '/modify',
      },
      {
        name: '카테고리 관리 (진행중)',
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
        component: <RegisterMakers />,
      },
      {
        name: '스팟 신청',
        url: '/spot',
        component: <Main />,
      },
      {
        name: '정기식사 신청 (진행중)',
        url: '/diet',
      },
      {
        name: '케이터링 신청 (진행중)',
        url: '/catering',
      },
    ],
  },
  {
    name: '게시판&리뷰 ',
    url: '/board',
    children: [
      {
        name: '리뷰관리',
        url: '/review',
        component: <ReviewPage />,
      },
      {
        name: '컨텐츠 관리 (진행중)',
        url: '/contents',
      },
      {
        name: '공지사항',
        url: '/notice',
        component: <Announcement />,
      },
      {
        name: '푸쉬알림',
        url: '/notification',
        component: <Notification />,
      },
      {
        name: '이용 가이드 (진행중)',
        url: '/guide',
      },
    ],
  },
  {
    name: '정산',
    url: '/calc',
    children: [
      {
        name: '고객사 정산',
        url: '/groupCalc',
        component: <ClientCalc />,
      },

      {
        name: '메이커스 정산',
        url: '/makersCalc',
        component: <MakersCalc />,
      },
      {
        name: '수수료 관리 (진행중)',
        url: '/charge',
      },
      {
        name: '정산 수정 요청 (진행중)',
        url: '/modify',
      },
      {
        name: '정산 이슈 (진행중)',
        url: '/issue',
      },
      {
        name: '포인트 관리',
        url: '/point',
        component: <Point />,
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
  {
    name: '추천시스템',
    url: '/recommendation',
    children: [
      {
        name: '고객사별 음식 추천',
        url: '/makers',
        component: <RecommendationMakersPage />,
      },
      {
        name: '그룹별 추천 메이커 및 음식 (진행중)',
        url: '/group',
        component: <Group />,
      },
      {
        name: '개인별 추천 음식 (진행중)',
        url: '/personal',
        component: <Personal />,
      },
      {
        name: '모델 학습 (진행중)',
        url: '/learning',
        component: <Learning />,
      },
    ],
  },
  {
    name: '기타 설정 데이터',
    url: '/others',
    children: [
      {
        name: '식사 취향 테스트 데이터',
        url: '/customerTaste',
        component: <CustomerTastePage />,
      },
    ],
  },
];
