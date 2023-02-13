import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Layout from '../layout/Layout';
import {MenuList} from './menu';

const MainRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
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
      </Routes>
    </Router>
  );
};

export default MainRouter;
