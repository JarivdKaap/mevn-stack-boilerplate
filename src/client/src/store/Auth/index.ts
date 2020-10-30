import { Module, VuexModule, Mutation, Action } from 'vuex-module-decorators';
import axios from '@/axios';
import store from '@/store';

type userData = {
  name: string;
  email: string;
  role: string;
};

function getUserData(): userData {
  const userInfoLocalStorage = JSON.parse(localStorage.getItem('userInfo') as string) || {};

  const user = {
    name: userInfoLocalStorage.name || 'john doe',
    email: userInfoLocalStorage.email || 'johndoe@gmail.com',
    role: userInfoLocalStorage.role || 'public',
  };

  return user;
}

@Module({ namespaced: true })
export default class AuthModule extends VuexModule {
  activeUser: userData = getUserData();

  get isLoggedIn(): boolean {
    return this.activeUser.role != 'public';
  }

  get userRole(): string {
    return this.activeUser.role;
  }

  @Mutation
  setBearer(token: string) {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }

  @Mutation
  SET_USER_DATA(user: userData) {
    localStorage.setItem('userInfo', JSON.stringify(user));
    this.activeUser = {
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }

  @Mutation
  logout() {
    console.log('logout')
    localStorage.removeItem('userInfo');
    localStorage.removeItem('accessToken');
    this.activeUser = {
      name: '',
      email: '',
      role: 'public',
    };
  }

  @Action({ rawError: true })
  async login(payload: { email: string; password: string }): Promise<any> {
    const resp = await axios.post('/api/auth/signin', payload);
    if (!resp.data) {
      throw new Error('No user data provided');
    }
    localStorage.setItem('accessToken', resp.data.token);
    const user = resp.data.user;
    store.commit('auth/SET_USER_DATA', user);
    return resp;
  }

  @Action({ rawError: true })
  async signup(payload: { email: string; password: string }): Promise<any> {
    const resp = await axios.post('/api/auth/signup', payload);
    if (!resp.data) {
      throw new Error('No user data provided');
    }
    localStorage.setItem('accessToken', resp.data.token);
    const user = resp.data.user;
    store.commit('auth/SET_USER_DATA', user);
    return resp;
  }
}
