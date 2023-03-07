import {atomWithReset} from 'jotai/utils';
import {formattedWeekDate} from './dateFormatter';

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
export const exelProductAtom = atomWithReset();
export const shopInfoDetailIdAtom = atomWithReset('');
export const productDataAtom = atomWithReset();

export const corporationAtom = atomWithReset();
export const corporationExportAtom = atomWithReset();
export const exelCorporationAtom = atomWithReset();

//order

const day = new Date();
const days = formattedWeekDate(day);
export const startDateAtom = atomWithReset(days);
export const endDateAtom = atomWithReset(days);
export const groupOptionAtom = atomWithReset('');
export const userOptionAtom = atomWithReset('');
export const makersOptionAtom = atomWithReset('');
export const spotOptionAtom = atomWithReset('');
export const diningTypeOptionAtom = atomWithReset('');
export const statusOptionAtom = atomWithReset([]);

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
