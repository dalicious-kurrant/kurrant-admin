import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layout/Layout';
import {MenuList} from './menu';
import LoginPage from '../pages/login/Login';
import Success from '../pages/Success';
import ItemInfoDetail from '../pages/item/ItemInfoDetail';
import OrderDetail from '../pages/order/orderInfomation/OrderDetail';
import ScrollToTop from 'shared/ScrollToTop';
import Test from 'common/test/InputTest';
import Delivery from 'pages/Delivery';
const MainRouter = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dash" element={<Delivery />} />
        {token !== null && (
          <Route path="/" element={<Layout />}>
            <Route path="/main" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/order/info/detail/:code" element={<OrderDetail />} />
            {MenuList.map(v => (
              <Route key={v.url} path={v.url}>
                {v.children?.map(b => (
                  <Route
                    key={b.url}
                    path={`${v.url}${b.url}`}
                    element={b.component}
                  />
                ))}
              </Route>
            ))}
          </Route>
        )}
      </Routes>
    </Router>
  );
};

export default MainRouter;
