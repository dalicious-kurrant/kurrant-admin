import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layout/Layout';
import {MenuList} from './menu';
import LoginPage from '../pages/login/Login';

const MainRouter = () => {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {token !== null && (
          <Route path="/" element={<Layout />}>
            <Route path="/main" element={<Home />} />
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
