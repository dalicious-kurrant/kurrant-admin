import {atomWithReset} from 'jotai/utils';

//일정관리 아톰
export const exelPlanAtom = atomWithReset();
export const exelStaticAtom = atomWithReset();
export const planAtom = atomWithReset();
export const recommandPlanAtom = atomWithReset();
export const deadlineAtom = atomWithReset(new Date());

export const exelUserAtom = atomWithReset();

export const exelSpotAtom = atomWithReset();
export const spotAtom = atomWithReset();
export const productAtom = atomWithReset();
export const exelProductAtom = atomWithReset();
export const shopInfoDetailIdAtom = atomWithReset('');
export const productDataAtom = atomWithReset();
