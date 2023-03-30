import React, {useState} from 'react';
import styled from 'styled-components';
import {Outlet, useLocation} from 'react-router-dom';
import Header from '../components/Header';
import Common from './Common';

const Wrapper = styled.main`
  width: 100%;
  min-height: 100vh;
`;

const Layout = () => {
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
      pathname === '/calc/group' ? (
        <div style={{paddingTop: '90px'}} />
      ) : (
        <Common />
      )}
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
