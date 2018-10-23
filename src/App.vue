<template>
  <div id="indexPage">
    <div id="headerNav">
      <div class="iconfont icon-caidan" @click="showUserPage"></div>
      <!-- <div><router-link to="/user" class="iconfont icon-caidan" ></router-link></div> -->
      <div><router-link to="/musicIndex" class="iconfont icon-music" :class="{cur:this.$route.name === 'musicIndex'}"></router-link></div>
      <div><router-link to="/discover" class="iconfont icon-pengyou" :class="{cur:this.$route.name ==='discover'}"></router-link></div>
      <div><router-link to="/radio" class="iconfont icon-diantai" :class="{cur:this.$route.name === 'radio'}"></router-link></div>
      <!-- <div><router-link to="/play" class="iconfont icon-zhuanjiguangpan"></router-link></div> -->
      <div class="iconfont icon-zhuanjiguangpan" @click="showPlayPage"></div>
    </div>
    <transition name="route">
      <router-view></router-view>
    </transition>
    <transition name="fade">
      <user v-if="isShowUserPage"></user>
    </transition>
    <transition name="play">
      <play v-show="isShowPlayPage"></play>
    </transition>
    <transition name="fade">
      <album-page v-if="isShowAlbumPage"></album-page>
    </transition>
  </div>
</template>

<script>
import albumPage from './components/albumPage'
import user from './views/user'
import play from './views/play'
export default {
  components: {
    albumPage,
    user,
    play
  },
  computed: {
    //从仓库获取是否显示专辑页面的条件
    isShowAlbumPage(){return this.$store.state.isShowAlbumPage},
    isShowUserPage(){return this.$store.state.isShowUserPage},
    isShowPlayPage(){return this.$store.state.isShowPlayPage}
  },
  methods: {
    showUserPage(){this.$store.commit("showUserPage",true)},
    showPlayPage(){this.$store.commit("isShowPlayPage",true)}
  }
}
</script>

<style scoped>
  #headerNav{
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 50px;
    background-color:#c20c0c;
  }
  #headerNav > div{
    width: 20%;
  }
  .iconfont{
    width: 100%;
    height: 50px;
    font-size: 26px;
    color: white;
    display: block;
    text-align: center;
    line-height: 50px;
  }
  .cur{
    background-color:#9b0909;
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s ease;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-300px);
    opacity: 0;
  }
  .route-enter-active, .route-leave-active {
    transition: all .3s ease;
  }
  .route-enter {
    transform: translateX(-300px);
    opacity: 0;
  }
  .route-leave-to {
    transform: translateX(300px);
    opacity: 0;
  }
  .play-enter-active, .play-leave-active {
    transition: all .3s ease;
  }
  .play-enter {
    transform: translateX(300px);
    opacity: 0;
  }
  .play-leave-to {
    transform: translateX(300px);
    opacity: 0;
  }

</style>
