import axios from 'axios';

const token = localStorage.getItem('dash-token');

const baseURL =
  process.env.REACT_APP_NODE_ENV === 'prod'
    ? process.env.REACT_APP_BASE_URL + '/' + process.env.REACT_APP_API_VERSION
    : process.env.REACT_APP_LOCAL_URL + '/' + process.env.REACT_APP_API_VERSION;

const instance = axios.create({baseURL});

const setToken = config => {
  console.log(token)
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
};

if (token) {
  instance.interceptors.request.use(setToken);
}

instance.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const {response} = error;

    if (response.status === 403) {
      // localStorage.removeItem('dash-token');
    }
    return Promise.reject(error);
  },
);

export default instance;
