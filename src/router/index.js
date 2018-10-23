import Vue from 'vue'
import Router from 'vue-router'
// import user from '../views/user.vue'
import musicIndex from '../views/music-index.vue'
import discover from '../views/discover.vue'
import radio from '../views/radio.vue'
// import play from '../views/play.vue'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: user
    // },
    {
      path: '/musicIndex',
      name: 'musicIndex',
      component: musicIndex
    },
    {
      path: '/discover',
      name: 'discover',
      component: discover
    },
    {
      path: '/radio',
      name: 'radio',
      component: radio
    },
    // {
    //   path: '/play',
    //   name: 'play',
    //   component: play
    // },
    {
      path: '*',
      redirect: '/musicIndex'
    }
  ]
})
