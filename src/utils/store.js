import {atomWithReset} from 'jotai/utils';
import {
  formattedWeekDateZ,
  formattedYearMonthDate,
} from './dateFormatter';

//일정관리 아톰
export const exelPlanAtom = atomWithReset();
export const exelCompletePlanAtom = atomWithReset();
export const exelStaticAtom = atomWithReset();
export const planAtom = atomWithReset();
export const planExportAtom = atomWithReset();
export const recommandPlanAtom = atomWithReset();
export const completePlanAtom = atomWithReset();
export const deadlineAtom = atomWithReset(new Date());

export const exelUserAtom = atomWithReset();

export const exelSpotAtom = atomWithReset();
export const spotAtom = atomWithReset();
export const productAtom = atomWithReset();
export const exportProductAtom = atomWithReset();
export const productPageAtom = atomWithReset(1);
export const exelProductAtom = atomWithReset();
export const shopInfoDetailIdAtom = atomWithReset('');
export const productDataAtom = atomWithReset();

export const corporationAtom = atomWithReset();
export const corporationExportAtom = atomWithReset();
export const exelCorporationAtom = atomWithReset();

//order

const day = new Date();
const days = formattedWeekDateZ(day);
export const startDateAtom = atomWithReset(days);
export const endDateAtom = atomWithReset(days);
export const startOrderDateAtom = atomWithReset(days);
export const endOrderDateAtom = atomWithReset(days);
export const groupOptionAtom = atomWithReset('');
export const groupTypeOptionAtom = atomWithReset('');
export const userOptionAtom = atomWithReset('');
export const makersOptionAtom = atomWithReset('');
export const spotOptionAtom = atomWithReset('');
export const diningTypeOptionAtom = atomWithReset('');
export const orderStatusAtom = atomWithReset('');
export const statusOptionAtom = atomWithReset([]);
export const groupInfoAtom = atomWithReset('');
export const spotListAtom = atomWithReset([]);
export const userListAtom = atomWithReset([]);
export const diningListAtom = atomWithReset([]);
export const groupFilterAtom = atomWithReset('');
export const groupTypeFilterAtom = atomWithReset('');

// 기업정보
export const corpNameOptionAtom = atomWithReset('');

// 메이커스 정보
export const makersInfoAtom = atomWithReset();
export const makersExelInfoAtom = atomWithReset();

// 상품정보
export const makersNameAtom = atomWithReset('');

// 유저 정보
export const userStateAtom = atomWithReset('');
export const groupIdAtom = atomWithReset('');
export const userIdAtom = atomWithReset('');

// 오더번호
export const orderNumberAtom = atomWithReset();

// 추가 주문

export const extraOrderStartDateAtom = atomWithReset(days);
export const extraOrderEndDateAtom = atomWithReset(days);
export const extraHistoryStartDateAtom = atomWithReset(days);
export const extraHistoryEndDateAtom = atomWithReset(days);
export const extraListDataAtom = atomWithReset();
export const extraOrderGroupOptionAtom = atomWithReset();

// 메이커스 정산

export const startMonthAtom = atomWithReset(formattedYearMonthDate(day));
export const endMonthAtom = atomWithReset(formattedYearMonthDate(day));
export const selectClientAtom = atomWithReset([]);
export const selectStatusAtom = atomWithReset();
export const selectModifyAtom = atomWithReset();

// 고객사 정산

export const startMonthClientAtom = atomWithReset(formattedYearMonthDate(day));
export const endMonthClientAtom = atomWithReset(formattedYearMonthDate(day));
export const selectClientClientAtom = atomWithReset([]);
export const selectStatusClientAtom = atomWithReset();
export const selectModifyClientAtom = atomWithReset();
export const corpDataAtom = atomWithReset();

// 마이스팟
export const indexAtom = atomWithReset();
export const checkListAtom = atomWithReset([]);
export const checkShareListAtom = atomWithReset([]);
export const checkPrivateListAtom = atomWithReset([]);
export const spotPageAtom = atomWithReset(1);

export const MySpotCityAtom = atomWithReset([]);
export const MySpotCountyAtom = atomWithReset([]);
export const MySpotVillageAtom = atomWithReset([]);
export const MySpotZipcodeAtom = atomWithReset([]);

export const minUserAtom = atomWithReset('');
export const maxUserAtom = atomWithReset('');

// 마이 스팟 관리

export const adminCheckListAtom = atomWithReset([]);

export const spotPageAdminAtom = atomWithReset(1);
export const MySpotNameAdminAtom = atomWithReset([]);
export const MySpotCityAdminAtom = atomWithReset([]);
export const MySpotCountyAdminAtom = atomWithReset([]);
export const MySpotVillageAdminAtom = atomWithReset([]);
export const MySpotZipcodeAdminAtom = atomWithReset([]);
export const MySpotStatusAdminAtom = atomWithReset([]);

// 공지사항

export const noticeTypeFilterAtom = atomWithReset(null);
export const noticeStatusFilterAtom = atomWithReset(null);
export const noticeSpotFilterAtom = atomWithReset([]);
export const noticePushFilterAtom = atomWithReset(null);
export const noticePageAtom = atomWithReset(1);
export const checkValueAtom = atomWithReset([]);

// 메이커스 공지사항
export const noticeMakersTypeFilterAtom = atomWithReset(null);
export const noticeMakersStatusFilterAtom = atomWithReset(null);
export const noticeMakersFilterAtom = atomWithReset(null);
export const noticeMakersPushFilterAtom = atomWithReset(null);
export const noticeMakersPageAtom = atomWithReset(1);

// 고객사 공지사항
export const noticeCompanyTypeFilterAtom = atomWithReset(null);
export const noticeCompanyStatusFilterAtom = atomWithReset(null);
export const noticeCompanySpotFilterAtom = atomWithReset([]);
export const noticeCompanyPushFilterAtom = atomWithReset(null);
export const noticeCompanyPageAtom = atomWithReset(1);

export const userPageAtom = atomWithReset(0);
