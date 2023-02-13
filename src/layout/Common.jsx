import React from 'react';
import {useLocation} from 'react-router';
import {MenuList} from '../router/menu';
import {Breadcrumb, Button} from 'semantic-ui-react';
import styled from 'styled-components';

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
  return (
    <C.Wrapper>
      <C.Bread>
        <Breadcrumb icon="right angle" sections={makeSection(pathname)} />
      </C.Bread>
      <C.BtnWrapper>
        <Button color="green" icon="save" content="저장" />
        <Button icon="history" content="히스토리" />
        <Button.Group>
          <Button
            color="blue"
            inverted
            icon="file excel outline"
            content="엑셀 불러오기"
          />
          <Button.Or />
          <Button color="blue" icon="share" content="엑셀 내보내기" />
        </Button.Group>
      </C.BtnWrapper>
    </C.Wrapper>
  );
};

export default Common;
