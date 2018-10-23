<template>
    <div id="albumPage">
       <div id="header-album" :style="{backgroundImage:`url(${albumActive.albumbg})`}">
            <div class="header-album-title">
                <span class="iconfont icon-houtui1" @click="hideAlbumPage"></span>
                <span>{{albumActive.albumTitle}}</span>
            </div>
            <div class="header-album-info">
                <img :src="albumActive.albumImg" alt="">
                <div>
                    <div class="albumName">
                        <span>专辑：</span>
                        <span>{{albumActive.albumTitle}}</span>
                    </div>
                    <div class="albumSinger">
                        <img :src="albumActive.albumImg" alt="">
                        <span>歌手：</span>
                        <span>{{albumActive.albumSinger}}</span>
                    </div>
                </div>
            </div>
            <div class="header-album-btn">
                <span class="iconfont icon-yuleyinleshoucang"></span>
                <span class="iconfont icon-icon--"></span>
                <span class="iconfont icon-BAI-pinglun"></span>
                <span class="iconfont icon-fenxiang1"></span>
            </div>
       </div>
       <div class="songList" v-for="(item,index) in albumActive.albumList" :key="index" @click="playAlbum(item,index)">
            <span>{{index+1}}</span>
            <div>
                <p>{{item.musicName}}</p>
                <p>{{item.musicSinger}}</p>
            </div>
            <!-- v-if判断要限定是否专辑还是单曲，不然专辑和单曲里同序号的列表都出现播放状态图标 -->
            <span class="iconfont icon-bofang" v-if="index == curIndex && recommendOrAlbum == 'album'"></span>
       </div>
    </div>
</template>
<script>
export default {
    methods: {
        hideAlbumPage(){
            this.$store.commit("hideAlbumPage",false)
        },
        playAlbum(item,index){
            this.$store.commit("showPlayPage",{item:item,index:index,active:"album",is:true})
            // this.$router.push("play")
        }
    },
    computed: {
        albumActive(){return this.$store.state.albumActive},
        curIndex(){return this.$store.state.playListIndex},
        recommendOrAlbum(){return this.$store.state.recommendOrAlbum}
    }
}
</script>
<style scoped>
    #albumPage{
        position: absolute;
        top: 0px;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1; /*如果这里不加层叠顺序，整个页面会被首页轮播图盖住*/
        background-color: white;
        overflow: hidden;
    }
    /*头部标题*/
    #header-album{
        background-size: cover;
    }
    .header-album-title{
        position: relative;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        letter-spacing:0.25em; 
        color: white;
    }
    .header-album-title > .iconfont{
        position: absolute;
        top: 0;
        left: 5%;
        font-size: 26px;
        font-weight: bold;
        color: white;
    }
    /*头部按钮*/
    .header-album-info{
        padding: 5% 3%;
        overflow: hidden;
        font-size: 16px;
        color:white;
    }
    .header-album-info > img{
        width: 36%;
        float: left;
    }
    .header-album-info > div{
        float: left;
        padding-left: 3%
    }
    .header-album-info .albumName{
        height: 30px;
        line-height: 30px;
        margin: 3px 0;
    }
    .header-album-info .albumSinger{
        height: 30px;
        line-height: 30px;
    }
    .header-album-info .albumSinger > img{
        border-radius: 50%;
        width: 30px;
        height: 30px;
    }
    /*头部按钮*/
    .header-album-btn{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
    }
    .header-album-btn > .iconfont{
        font-size: 36px;
        color: white;

    }
    .header-album-btn > .icon-yuleyinleshoucang,
    .header-album-btn > .icon-fenxiang1{
        font-size: 30px;
    }
    /*歌曲列表*/
    .songList{
        width: 100%;
        height: 50px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between
    }
    .songList > span:first-child{
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        font-weight: bold;
    }
    .songList > span:last-child{
        float: right;
        width: 50px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 26px;
    }
    .songList > div{
        flex: 1;
    }
    .songList > div > p:first-child{
        font-size: 14px;
        font-weight: bold;
        color: #3b3c3d;
        height: 25px;
        line-height:25px;
    }
    .songList > div > p:last-child{
        font-size: 14px;
        color: #888;
        height: 25px;
        line-height:25px;
    }
</style>


