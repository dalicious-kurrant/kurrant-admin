import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layout/Layout';
import {MenuList} from './menu';
import LoginPage from '../pages/login/Login';
import ChainLoginPage from '../pages/chainLogin/Login';
import DashLoginPage from '../pages/dashLogin/Login';
import Success from '../pages/Success';
import ItemInfoDetail from '../pages/item/ItemInfoDetail';
import OrderDetail from '../pages/order/orderInfomation/OrderDetail';
import ScrollToTop from 'shared/ScrollToTop';
import Test from 'common/test/InputTest';
import Delivery from 'pages/Delivery';
import Download from 'pages/Download';
import MakersCalcDetail from 'pages/adjustment/components/MakersCalcDetail';
import ClientCalcDetail from 'pages/adjustment/components/ClientCalcDetail';
import BackLog from 'pages/backlog/Backlog';
import PrivateRoute from './PrivateRoute';
import ChainDelivery from 'pages/ChainDelivery';
import DashPrivateRoute from './DashPrivateRoute';
const MainRouter = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/success" element={<Success />} />
        <Route path="/dash" element={<DashPrivateRoute />} >
          <Route path="/dash" element={<Delivery />} />
        </Route>
        {/* <Route path="/dash/login" element={<DashLoginPage />} /> */}
        <Route path="/chain/login" element={<ChainLoginPage />} />
        <Route path="/chain" element={<PrivateRoute />} >
          <Route path="/chain/delivery" element={<ChainDelivery />} />
        </Route>
        <Route path="/download" element={<Download />} />
        {token !== null && (
          <Route path="/" element={<Layout />}>
            <Route path="/main" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/shop/info/:id" element={ <ItemInfoDetail />} />
            <Route path="/backlog" element={ <BackLog />} />
            <Route path="/order/info/detail/:code" element={<OrderDetail />} />
            <Route
              path="calc/makersCalc/detail"
              element={<MakersCalcDetail />}
            />
            <Route
              path="calc/groupCalc/detail"
              element={<ClientCalcDetail />}
            />
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
