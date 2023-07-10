import axios from 'axios';

const token = localStorage.getItem('chain-token');

const baseURL =
  process.env.REACT_APP_NODE_ENV === 'prod'
    ? process.env.REACT_APP_BASE_URL + '/' + process.env.REACT_APP_API_VERSION
    : process.env.REACT_APP_LOCAL_URL + '/' + process.env.REACT_APP_API_VERSION;

const chainInstance = axios.create({baseURL});

// const setToken = config => {
//   config.headers['Authorization'] = `Bearer ${token}`;
//   return config;
// };

// if (token) {
//   chainInstance.interceptors.request.use(setToken);
// }

chainInstance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const {response} = error;

    if (response.status === 403) {
      // localStorage.removeItem('chain-token');

      // alert('로그인이 만료되어 로그아웃 됩니다.');
      // window.location.replace('/chain/delivery');
    }
    return Promise.reject(error);
  },
);

export default chainInstance;
