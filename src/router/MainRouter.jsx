import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layout/Layout';
import {MenuList} from './menu';
import LoginPage from '../pages/login/Login';
import ItemInfoDetail from '../pages/item/ItemInfoDetail';
import OrderDetail from '../pages/order/orderInfomation/OrderDetail';
const MainRouter = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {token === null && (
          <Route path="/" element={<Layout />}>
            <Route path="/main" element={<Home />} />
            <Route path="/shop/info/detail/:id" element={<ItemInfoDetail />} />
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
