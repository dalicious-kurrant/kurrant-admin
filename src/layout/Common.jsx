import React, {useCallback, useRef} from 'react';
import {useLocation} from 'react-router';
import {MenuList} from '../router/menu';
import {Breadcrumb, Button} from 'semantic-ui-react';
import styled from 'styled-components';
import * as XLSX from 'xlsx';
import {
  planAtom,
  exelPlanAtom,
  exelProductAtom,
  productAtom,
  exelStaticAtom,
  spotAtom,
  exelSpotAtom,
  shopInfoDetailIdAtom,
  recommandPlanAtom,
} from '../utils/store';

import {useAtom} from 'jotai';

import {
  planExel,
  planExelExport,
  productExel,
  productExelExport,
} from '../utils/downloadExel/exel';

const makeSection = pathname => {
  const tempArray = pathname.split('/');

  const result = [];
  const parent = MenuList.find(v => v.url.includes(tempArray[1]));

  if (!parent) {
    return result;
  }

  result.push({
    key: parent.name,
    content: parent.name,
  });

  const child = parent.children?.find(v => v.url.includes(tempArray[2]));

  if (!child) {
    return result;
  }

  result.push({
    key: child.name,
    content: child.name,
    active: true,
  });

  return result;
};

const C = {
  Wrapper: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    padding-top: 100px;
    min-width: 1440px;
  `,
  Bread: styled.div`
    z-index: -1;
  `,
  BtnWrapper: styled.div``,
};

const Common = () => {
  const {pathname} = useLocation();
  const inputRef = useRef();
  const [plan, setPlan] = useAtom(planAtom);
  const [exelPlan, setExelPlan] = useAtom(exelPlanAtom);
  const [spot, setSpot] = useAtom(spotAtom);
  const [exelSpot, setExelSpot] = useAtom(exelSpotAtom);
  const [, setExelStaticPlan] = useAtom(exelStaticAtom);
  const [product, setProduct] = useAtom(productAtom);
  const [exelProduct, setExelProduct] = useAtom(exelProductAtom);
  const [id] = useAtom(shopInfoDetailIdAtom);

  const [reCommandPlan, setReCommandPlan] = useAtom(recommandPlanAtom);
  const onUploadFileButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.value = '';
    inputRef.current.click();
  }, []);

  const onUploadFile = async e => {
    if (!e.target.files) {
      return;
    }
    e.preventDefault();
    if (e.target.files) {
      setProduct();
      setExelProduct();
      setExelPlan();
      setExelStaticPlan();
      setPlan();
      setSpot();
      setExelSpot();
      setReCommandPlan();
      const reader = new FileReader();
      reader.onload = e => {
        console.log(e.target.result);
        const data = e.target.result;
        const workbook = XLSX.read(data, {type: 'array', cellDates: true});
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        console.log(sheetName);
        // console.log(worksheet);

        if (sheetName === '메이커스 일정 관리') {
          setExelPlan(json);
          setExelStaticPlan(json);
        }
        if (sheetName === '고객 스팟 공지') {
          // console.log(typeof json);
          console.log(json);
          // localStorage.setItem('sponInfo', JSON.stringify(json));
          setExelSpot(json);
        }
        if (sheetName === '상품 정보') {
          setExelProduct(json);
          console.log(json, 'json');
        }
      };
      reader.readAsArrayBuffer(e.target.files[0]);
    }
  };

  const onDownloadFile = async () => {
    if (plan && plan.length > 0) {
      return planExel(plan);
    }
    if (exelPlan && exelPlan.length > 0) {
      return planExelExport(
        exelPlan,
        '메이커스 일정 관리',
        '메이커스_일정_관리.xlsx',
      );
    }
    if (reCommandPlan && reCommandPlan.length > 0) {
      return planExel(reCommandPlan);
    }
    if (exelSpot && exelSpot.length > 0) {
      return planExelExport(exelSpot, '고객 스팟 공지', '고객_스팟_공지.xlsx');
    }
    if (product?.data && product?.data?.length > 0) {
      return productExel(product);
    }
    if (exelProduct && exelProduct.length > 0) {
      return productExelExport(exelProduct);
    }
  };

  const noNeedButton =
    pathname !== '/sales/schedule' &&
    pathname !== '/order/info' &&
    pathname !== `/shop/info/detail/${id}`;

  return (
    <C.Wrapper>
      <C.Bread>
        <Breadcrumb icon="right angle" sections={makeSection(pathname)} />
      </C.Bread>
      {noNeedButton && (
        <C.BtnWrapper>
          <Button color="green" icon="save" content="저장(미완)" />
          {/* <Button icon="history" content="히스토리" /> */}
          <Button.Group>
            <Button
              color="blue"
              inverted
              icon="file excel outline"
              content="엑셀 불러오기"
              onClick={onUploadFileButtonClick}
            />
            <InputExcel type="file" ref={inputRef} onChange={onUploadFile} />
            <Button.Or />
            <Button
              color="blue"
              icon="share"
              content="엑셀 내보내기"
              onClick={onDownloadFile}
            />
          </Button.Group>
        </C.BtnWrapper>
      )}
    </C.Wrapper>
  );
};

export default Common;

const InputExcel = styled.input`
  display: none;
`;
