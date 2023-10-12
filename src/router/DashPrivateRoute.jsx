import {Outlet} from 'react-router-dom';

const DashPrivateRoute = () => {
  // 토큰값이 만료에 따라 로그인 로그아웃
  // const login = getAccessToken();

  // const login = true;

  // if (!login) {
  //   return <Navigate to="/dash/login" replace={true} />;
  // }

  return <Outlet />;
};
export default DashPrivateRoute;
