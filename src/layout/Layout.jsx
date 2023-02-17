import React from 'react';
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
  return (
    <Wrapper>
      {pathname !== '/' && <Header />}
      {pathname === '/main' ? <div style={{paddingTop: '90px'}} /> : <Common />}
      <Outlet />
    </Wrapper>
  );
};

export default Layout;
