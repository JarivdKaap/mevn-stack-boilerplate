import Vue from 'vue';
import router from '@/router';
import store from '@/store';

const rules = [
  {name: 'isPublic', roles: ['public', 'user', 'admin']},
  {name: 'isUser', roles: ['user', 'admin']},
  {name: 'isAdmin', roles: ['admin']},
];

const unauthorizedRoute = '/';

router.beforeEach(async (to, from, next) => {
  const routeRule = to.meta.rule as string;
  if (!routeRule || routeRule == 'isPublic') {
    console.log('')
    next();
  }

  if (!store.getters['auth/isLoggedIn']) {
    return next(unauthorizedRoute);
  }

  const role = rules.find(r => r.name == routeRule);
  if(!role) {
    return next(unauthorizedRoute);
  }

  if (!role.roles.includes(store.getters['auth/userRole'])) {
    return next(unauthorizedRoute);
  }

  next();
});
