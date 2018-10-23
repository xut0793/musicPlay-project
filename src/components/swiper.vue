<template>
 <div>
    <swiper :options="swiperOption" ref="mySwiper">
        <!-- slides -->
        <swiper-slide v-for="(item,index) in imgArr" :key="index">
            <img :src="item.src" alt="">
        </swiper-slide>
        <!-- Optional controls -->
        <div class="swiper-pagination"  slot="pagination"></div>
    </swiper>
 </div>
</template>
 
<script>
import 'swiper/dist/css/swiper.min.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    components: {
        swiper,
        swiperSlide
    },
    data() {
      return {
        swiperOption: {
           //轮播图小圆点
            pagination: {
                el: '.swiper-pagination'
            },
            autoplay: true,
            loop: true
        }
      }
    },
    computed: {
        imgArr(){
            return this.$store.state.swiperImgArr
        }
    }
    
  }
</script>
<style scoped>
  img{
      display: block;
      width: 100%;
  }
</style>
