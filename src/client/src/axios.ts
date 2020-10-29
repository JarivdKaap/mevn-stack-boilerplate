import axios from 'axios';
import router from '@/router';

const axiosObj = axios.create({
  headers: { Authorization: 'bearer ' + localStorage.getItem('accessToken') },
});

axiosObj.interceptors.request.use(function(config) {
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');

  return config;
});

axiosObj.interceptors.response.use(
  response => response,
  err => {
    if (err.response.status !== 401) {
      return Promise.reject(err);
    }

    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    if (router.app.$route.path !== '/') router.app.$router.push('/');
  },
);

export default axiosObj;
