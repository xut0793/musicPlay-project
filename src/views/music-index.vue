<template>
    <div id="musicIndex" v-height='50'>
       <swiper></swiper>
       <div>
           <div class="albumTitle">推荐专辑</div>
           <div class="album">
                <figure v-for="(item,index) in album" :key="index" @click="showAlbumPage(item)">
                    <img :src="item.albumImg" alt="">
                    <figcaption>{{item.albumTitle}}</figcaption> 
                </figure>
           </div>
       </div>
       <div>
           <div class="recommendTitle">热歌精选</div>
           <ul>
               <li class="recommend" v-for="(item,index) in recommend" :key="index" @click="playRecommend(item,index)">
                   <span>{{index+1}}</span>
                   <div>
                       <p>{{item.musicName}}</p>
                       <p>{{item.musicSinger}}</p>
                   </div>
                    <!-- v-if判断要限定是否专辑还是单曲，不然专辑和单曲里同序号的列表都出现播放状态图标 -->
                   <span class="iconfont icon-bofang" v-if="index == curIndex && recommendOrAlbum == 'recommend'"></span>
               </li>
           </ul>
       </div>
    </div>
</template>
<script>
import swiper from '../components/swiper'
export default {
    components: {
        swiper
    },
    computed: {
        album: function(){return this.$store.state.mapList.album},
        recommend: function(){return this.$store.state.mapList.recommend},
        curIndex: function(){return this.$store.state.playListIndex},
        recommendOrAlbum(){return this.$store.state.recommendOrAlbum}

    },
    methods: {
        showAlbumPage(item){
            this.$store.commit("ShowAlbumPage",{is:true,item:item})
        },
        playRecommend(item,index){
            this.$store.commit("showPlayPage",{item:item,index:index,active:"recommend",is:true})
            // this.$router.push("play")
        }
    },
    created: function(){
        this.$store.dispatch('getData')
    },
    //自定义一个指令，让除头部header固定外，其它页面区域可以滚动
    directives: {
        height: {
            inserted: function (el,binding) {
                var winH=document.documentElement.clientHeight||document.body.clientHeight;
                if(binding.value == undefined){
                    el.style.height = winH + "px"
                }else if(typeof binding.value == 'number'){
                    el.style.height = winH - binding.value + "px"
                }
    }
        }
    }
}
</script>
<style scoped>
    #musicIndex{
        overflow-y:scroll;
    }
    /* 标题设置*/
    .albumTitle,.recommendTitle{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
    }
    .albumTitle::before,.recommendTitle::before{
        content: "| ";
        color: #c20c0c;
        font-size: 18px;
        font-weight: bolder;
        margin-left: 6px;
    }
     /* 专辑推荐*/
    .album{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
    }
    .album figure{
        display: table;
    }
    .album img{
        width: 100px;
    }
    .album figcaption{
        font-size: 14px;
        font-weight: bold;
        text-align: center;
        margin: 10px 0;
    }
    /* 热歌精选*/
    .recommend{
        width: 100%;
        height: 50px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between
    }
    .recommend > span:first-child{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
    .recommend > span:last-child{
        float: right;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 26px;
    }
    .recommend > div{
        flex: 1;
    }
    .recommend > div > p:first-child{
        font-size: 14px;
        font-weight: bold;
        color: #3b3c3d;
        height: 25px;
        line-height:25px;
    }
    .recommend > div > p:last-child{
        font-size: 14px;
        color: #888;
        height: 25px;
        line-height:25px;
    }
</style>
