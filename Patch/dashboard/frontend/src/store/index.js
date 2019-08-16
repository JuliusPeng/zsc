import Vue from 'vue';
import Vuex from 'vuex';

import logColor from './modules/logColor';
import lang from './modules/lang';
Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const store = new Vuex.Store({
  modules: {
    logColor,
    lang
  },
  strict: debug,
  // plugins: debug ? [createLogger()] : [],
  state() {
    return {
      activeIndex: '1'
    };
});

// if (module.hot) {
//   // ʹ action �� mutation ��Ϊ��������ģ��
//   module.hot.accept(['./getters', './mutations', './actions'], () => {
//     // ��ȡ���º��ģ��

//     // for 'export default {...}'
//     // ��Ϊ babel 6 ��ģ������ʽ���⣬������Ҫ���� `.default`
//     // ������ģ��
//     store.hotUpdate({
//       getters: require('./getters').default,
//       mutations: require('./mutations').default,
//       actions: require('./actions').default
//     });

//     // for 'export const xxx = {...}'
//     // store.hotUpdate({
//     //   getters: require('./getters').getters,
//     //   mutations: require('./mutations').mutations,
//     //   actions: require('./actions').actions
//     // })

//     // for 'export const xxx = ...'
//     // store.hotUpdate({
//     //   getters: require('./getters'),
//     //   mutations: require('./mutations'),
//     //   actions: require('./actions')
//     // })
//   });
// }

export default store;
