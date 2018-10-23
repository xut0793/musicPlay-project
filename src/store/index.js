import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state:{
        //音乐首页musicIndex中轮播图数据
        swiperImgArr:[
            {src : '../../static/img/banner1.jpg'},
            {src : '../../static/img/banner3.jpg'},
            {src : '../../static/img/banner2.jpg'},
        ],
        //音乐首页musicIndex中专辑和热歌数据
        mapList: [],
        //是否显示相关页面，默认不显示，当单击专辑区域时显示，更改为true
        isShowAlbumPage: false,
        isShowUserPage: false,
        isShowPlayPage: false,
        //专辑页面激活页数据
        albumActive: null,
        //当前播放歌曲数据
        playList: [],
        playListIndex: 0,
        songActive: null,
        //播放页面CD中间的显示的图片数据
        CDImg: null,
        CDbgImg: null,
        //播放页面当前是播放热歌还是专辑判断
        recommendOrAlbum: "",
        
    },
    mutations: {
        //actions传上来添加数据的方法
        getData(state,payload){
           state.mapList = payload.mapList;
        },
        showUserPage(state,payload){
            state.isShowUserPage = payload
        },
        //请求显示或关闭专辑页面组件的方法
        hideAlbumPage(state,payload){ //专辑页面返回不带albumActive,如果直接用下面的方法，会导致albumActive为空，播放页面的列表请求为报错，albumist属性未定义
            state.isShowAlbumPage = payload;
        },
        ShowAlbumPage(state,payload){
            state.isShowAlbumPage = payload.is;
            state.albumActive = payload.item;
        },
        //直接通过按钮首页光盘按钮进入时
        isShowPlayPage(state,payload){
            state.isShowPlayPage = payload;
        },
        //通过点击歌曲进入播放页面时
        showPlayPage(state,payload){
            state.isShowPlayPage = payload.is;
            state.songActive = payload.item;
            state.playListIndex = payload.index;
            state.recommendOrAlbum = payload.active;
            if(payload.active == "album"){
                state.CDImg = state.albumActive.albumImg;
                state.CDbgImg = state.albumActive.playerbg;
                state.playList = state.albumActive.albumList;
            }
            else if (payload.active == "recommend"){
                state.CDImg = state.songActive.singerImg;
                state.CDbgImg = state.songActive.playerbg;
                state.playList = state.mapList.recommend;

            }
        },
        //播放下一首
        playNext(state){
            state.playListIndex ++ ;
            if(state.playListIndex >= state.playList.length){state.playListIndex = 0}
            state.songActive = state.playList[state.playListIndex];
            //如果当前播放专辑，则页面的CD图片因为专辑没变，所以切歌时不用更改CD图片
            //如果当前播放单曲，则每一个单曲的CD图片不一样，所以切歌时需要重新改变CD图片
            if(state.recommendOrAlbum =="recommend"){
                state.CDImg = state.songActive.singerImg;
                state.CDbgImg = state.songActive.playerbg;
            }
        },
        //播放上一首
        playPrev(state){
            state.playListIndex --;
            if(state.playListIndex < 0 ){state.playListIndex = state.playList.length-1}
            state.songActive = state.playList[state.playListIndex];
            state.musicUrl = state.songActive.musicUrl;
            if(state.recommendOrAlbum =="recommend"){
                state.CDImg = state.songActive.singerImg;
                state.CDbgImg = state.songActive.playerbg;
            }
        },
        changePlayListIndex(state,payload){
            state.playListIndex = payload;
        }
    },
    actions: {
        //音乐首乐musicIndex组件created时触发加载数据的异步方法
        getData({commit}){
            Vue.axios.get("../../static/data.json").then((res) => {
                commit('getData',res.data);
            })
        }
    }
})