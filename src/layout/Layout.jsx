import React, {useState} from 'react';
import styled from 'styled-components';
import {Outlet, useLocation} from 'react-router-dom';
import {Breadcrumb, Button} from 'semantic-ui-react';
import Header from '../components/Header';
import Common from './Common';
import {MenuList} from 'router/menu';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
`;
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
const Layout = () => {
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
  const {pathname} = useLocation();
  const [openMenu, setOpenMenu] = useState();
  return (
    <Wrapper
      onClick={() => {
        setOpenMenu(false);
      }}>
      {pathname !== '/' && (
        <Header openMenu={openMenu} setOpenMenu={setOpenMenu} />
      )}
      {pathname === '/main' ||
      pathname === '/calc/makers' ||
      pathname === '/board/notification' ||
      pathname === '/calc/group' ||
      pathname === '/delivery/information' ||
      pathname === '/delivery/worker' ? (
        <C.Wrapper>
          <C.Bread>
            <Breadcrumb icon="right angle" sections={makeSection(pathname)} />
          </C.Bread>
          {/* <div style={{paddingTop: '90px'}} /> */}
        </C.Wrapper>
      ) : (
        <Common />
      )}
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
