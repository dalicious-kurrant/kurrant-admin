import {atomWithReset} from 'jotai/utils';
import {formattedWeekDate} from './dateFormatter';

export const exelPlanAtom = atomWithReset();
export const exelStaticAtom = atomWithReset();
export const planAtom = atomWithReset();
export const recommandPlanAtom = atomWithReset();
export const exelSpotAtom = atomWithReset();
export const spotAtom = atomWithReset();
export const productAtom = atomWithReset();
export const exelProductAtom = atomWithReset();
export const shopInfoDetailIdAtom = atomWithReset('');
export const productDataAtom = atomWithReset();

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
