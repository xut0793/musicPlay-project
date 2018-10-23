
<template>
    <div id="play" :style="{backgroundImage:`url(${CDbgImg})`}">
        <div class="headerPlay">
            <span class="iconfont icon-houtui1" @click="hidePlayPage"></span>
            <span>{{songActive ? songActive.musicName : "播放器"}}</span>
        </div>
        <div class="CDbox" v-if=" ! isShowLyric">
            <div class="cdbg" :class="[songActive && isPlay ? 'rotate' : '']">
                <img src="../../static/img/cd.png" alt="">
                <img :src="CDImg"/>
            </div>
            <div class="swith" :class="{'moveout': !isPlay}" >
                <img src="../../static/img/swith.png" alt="">
            </div>
        </div>
        <div class="lyricBox" v-if="isShowLyric">
            <ul>
                <li v-for="(item,index) in lyric" :key="index">{{item[1]}}</li>
            </ul>
        </div>
        <audio :src="songActive ? songActive.musicUrl : ''" autoplay @timeupdate="playing"></audio>
        <div class="setting">
            <span class="iconfont icon-xin1"></span>
            <span class="iconfont icon-icon--"></span>
            <span class="iconfont"
                    :class="[isShowLyric ? 'icon-zhuanjiguangpan' :'icon-BAI-pinglun']"
                    @click="showLyricOrCD"
            ></span>
            <span class="iconfont icon-more-vert"></span>
        </div>
        <div class="progressBar">
            <p>{{currentTime | formatTime}}</p>
            <div class="range">
                <span class="durRange" @click="selectPlayProgress"></span>
                <span class="curRange"></span>
            </div>
            <p>{{duration | formatTime}}</p>
        </div>
        <div class="controller">
            <span class="iconfont" 
                :class="[
                    {'icon-xunhuan': playMode === 'ListCycle'},
                    {'icon-singlecycle': playMode === 'singleCycle'},
                    {'icon-bofangye-caozuolan-suijibofang': playMode === 'random'}
                ]"
                @click="changePlayMode"
            ></span>
            <span class="iconfont icon-previous" @click="playPrev"></span>
            <span class="iconfont" :class="[isPlay ? 'icon-bofang' : 'icon-pause-20']" @click="playOrPause"></span>
            <span class="iconfont icon-next" @click="playNext"></span>
            <span class="iconfont icon-zhankaicaidan" @click="showPlayList"></span>
        </div>
        <div class="wrap-list" v-if="isShowPlayList">
            <div class="wrap" @click="hidePlayList"></div>
            <div class="playList">
                <div class="list" v-for="(item,index) in playList" :key="index" @click="playByPlayList(item,index)">
                    <span class="iconfont icon-bofang" v-if="index == curIndex"></span>
                    <span>{{index+1}}</span>
                    <span>{{item.musicName}}</span>
                    <span>{{item.musicSinger}}</span>
                </div>
            </div>
            <span class="iconfont icon-guanbi" @click="hidePlayList"></span>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            isShowPlayList: false,
            duration: 0,
            currentTime: 0,
            isPlay: true, //进入播放界面默认播放状态，所以初始化为true
            playMode: "ListCycle",
            isShowLyric: false,
            lyric: [],
        }
    },
    computed: {
        songActive(){return this.$store.state.songActive},
        CDImg(){return this.$store.state.CDImg},
        CDbgImg(){return this.$store.state.CDbgImg},
        playList(){return this.$store.state.playList},
        curIndex(){return this.$store.state.playListIndex},
    },
    watch: {    // 监听切歌时重新请求歌词。切歌都会改变当前歌曲的index，所以根据这个数据变化发起请求
        curIndex(){
            fetch(this.$store.state.songActive.musicLyric).then(res=>res.text())
            .then(data=>{this.lyric = this.parseLyric(data)})
        }
    },
    filters: {
        formatTime(t){
            if(t){
                let sec = Math.floor(t%60);
                let min = Math.floor(t/60);
                if(sec<10){sec = "0" + sec}
                if(min<10){min = "0" + min}
                return (min + ":" + sec);
            } else {
                return "00:00";
            }
        }
    },
    methods: {
        hidePlayPage(){this.$store.commit("isShowPlayPage",false)},
        showPlayList(){this.isShowPlayList = true},
        hidePlayList(){this.isShowPlayList = false},
        playing(){
            //播放时间和时长
            let audio = document.querySelector('audio');
            this.duration = audio.duration;
            this.currentTime = audio.currentTime;
            //进度条宽度变化
            let curRange = document.querySelector(".curRange");
            let durRange = document.querySelector('.durRange')
            curRange.style.width = audio.currentTime/audio.duration * durRange.offsetWidth + "px";
            //监控视频是否播放结束，若结束，根据播放模式playMode进行下一曲
            if(audio.ended){ //因为timeUpdata事件实实更新，所以时刻监控播放是否结束
                switch (this.playMode) {
                    case 'ListCycle':
                        this.$store.commit("playNext") //按列表顺序播放，跟下一首按钮一样的逻辑
                        break;
                    case 'singleCycle':
                        // audio.setAttribute("loop",true) //播放器audio设置属性loop 当前歌曲循环，这里不能用这个播放器自身的loop，因为设置当首歌结束，不执行，要下一次执行
                        this.$store.commit("changePlayListIndex",this.curIndex-1);
                        this.$store.commit("playNext")
                        audio.load();//因为单曲循环，数据没有改变，页面不会刷新，所以要人为重新加载。
                        break;
                    case 'random':
                        let randomNum = Math.floor(Math.random() * this.playList.length);
                        this.$store.commit("changePlayListIndex",randomNum); //随机播放，将随机播放的index传给仓库修改后，再按下一首的逻辑播放
                        this.$store.commit("playNext")
                        break;
                    default:
                        break;
                }
            }
            if(this.isShowLyric){//当歌词页显示时，再作如下动作，否则不执行，因为元素下树不存在，调用属性会报错
                let lis = document.querySelectorAll(".lyricBox>ul>li")
                let ul = document.querySelector(".lyricBox>ul")
                for(let i=0; i<this.lyric.length; i++){
                    if(audio.currentTime > this.lyric[i][0]){
                        //先让ul固定在.lyricBox中间位置，然后时间过了多少个li就上移多个li的宽度，然后到这首歌ended的状态后，也就不会再执行play()啦，所以不用设置上移的边界
                        ul.style.top = ul.parentElement.offsetHeight/2 - 30*(i+1)  + "px"
                        for(let j=i; j>=0;j--){lis[j].removeAttribute('class')}
                        lis[i].className = "cur"
                    }
                }
            }
        },
        playOrPause(){
            if(this.playList.length == 0){return}
            this.isPlay = ! this.isPlay;
            let audio = document.querySelector('audio');
            if(this.isPlay){audio.play()}
            else{audio.pause()}
        },
        playNext(){
            if(this.playList.length == 0){return} //避免没有歌曲播放时，点击按钮报错，因为仓库中palyNext方法请求的一些属性为空，所以相关属性没有定义
            this.$store.commit('playNext')
        },
        playPrev(){
            if(this.playList.length == 0){return}
            this.$store.commit('playPrev')
        },
        changePlayMode(){
            if(this.playMode === 'ListCycle'){
                this.playMode = 'random';
            }else if(this.playMode === 'random'){
                this.playMode = 'singleCycle';
            }else if(this.playMode === 'singleCycle'){
                this.playMode = 'ListCycle';
            }
        },
        selectPlayProgress(e){
            let temp = Math.ceil(e.offsetX / e.target.offsetWidth * this.duration);
            let audio = document.querySelector('audio');
            audio.currentTime = temp;
        },
        playByPlayList(item,index){
            let active = this.$store.state.recommendOrAlbum;
            this.$store.commit("showPlayPage",{item:item,index:index,is:true,active:active});
            this.isShowPlayList = false;
        },
        showLyricOrCD(){
            if( ! this.songActive){return}  //  如果没有播放歌曲直接进入播放界面，则不操作以下代码
            this.isShowLyric = ! this.isShowLyric;
            //这里也可以用veu-axios的get()去请求本地文件
            //this.$http.get(url).then()
            fetch(this.$store.state.songActive.musicLyric).then(res=>res.text())
            .then(data=>{this.lyric = this.parseLyric(data)})
            
        },
        parseLyric(lyric){
            let arr = [];
            let lines = lyric.split(/\n/);
            let rg = /\[\d{2}:\d{2}\.\d{2}\]/g; //匹配前面的时间形式[02:39.46]
            while (! rg.test(lines[0])) { // 删除歌词前面没有时间的内容
                lines.shift()
            };
            lines.pop(); //删除歌词最后一行没有内容
            //把时间解析成秒数，把时间和文字存入数组
            for(let i=0; i< lines.length; i++){
                let index = lines[i].indexOf("]");
                let timeStr = lines[i].substring(1,index);
                let txt = lines[i].substring(index+1);
                let time = Number.parseInt(timeStr.substring(0,2)) * 60 + Number.parseFloat(timeStr.substring(3))
                arr.push([time,txt])
            }
            return arr;
        }
    }
}
</script>
<style scoped>
/*整体背景颜色*/
    #play{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2; /*因为专辑页因为轮播图加了层叠，所以这里也要加层叠，并且要比专辑页大，才能在专辑页面之上显示*/
        width: 100%;
        height: 100%;
        background-color: #14277a;
        background-size: cover;
        overflow: hidden;
    }
    /*项部返回按钮和显示的文字*/
    .headerPlay{
        position: relative;
        height: 50px;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        letter-spacing:0.25em; 
        color: white;
    }
    .headerPlay > .icon-houtui1{
        position: absolute;
        top: 0;
        left: 5%;
        font-size: 26px;
        color: white;
    }
    /*中间内容区域，主要是cd图片,移到单独playCD组件中*/
     .CDbox{
        box-sizing: border-box;
        height:calc(100% - 300px);
        padding-top: 80px;
        position: relative;
    }
    .cdbg{
        width: 100%;
        text-align: center;
        position: relative;
        animation: rotate 8s linear infinite;
        animation-play-state:paused;
    }
    .rotate{
        animation-play-state:running;
    }
    @keyframes rotate {
        font{
            transform: rotate(0deg);
            transform-origin:center center;
            }
        to{
            transform: rotate(360deg);
            transform-origin:center center;
            }
    }
    .cdbg > img:first-child{
        width: 300px;
        height: 300px;
        border-radius: 50%;
    }
    .cdbg > img:last-child{
        width: 180px;
        height: 180px;
        border-radius: 50%;
        position: absolute;
        top: calc(50% - 90px);
        left: calc(50% - 90px);
    }
    .swith {
        position: absolute;
        top: 0;
        left: 33%;
        transition: all 1s;
        transform-origin: left top;
        transform: rotate(-10deg)
    }
    .swith > img{
        width: 110px;
        height: 165px;
    }
    .moveout{
        transform: rotate(-30deg)
    }
    /*歌词盒子*/
    .lyricBox{
        width: 100%;
        height: calc(100% - 300px);
        background-color: rgba(57, 38, 36, 0.3);
        overflow: hidden;
        position: relative;
    }
    .lyricBox ul{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .lyricBox> ul > li{
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-size: 16px;
        color: white;
    }
    .lyricBox > ul > .cur{
        color: red;
    }
    /*下方收藏设置按钮*/
    .setting{
        display: flex;
        justify-content: space-around;
        margin-bottom: 25px;
    }
    .setting > .iconfont{
        font-size: 36px;
        color: white;

    }
    .setting > .icon-xin1{
        font-size: 28px;
        line-height: 40px;
    }
    /*下方进度条设置*/
    .progressBar{
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 50px;
        padding: 0 5%;
    }
    .progressBar > p{
        font-size: 14px;
        text-align: center;
        color: rgba(255, 255, 255, 0.6);
        width: 50px;
    }
    .progressBar > .range{
        flex: 1;
        position: relative;;
    }
    .progressBar > .range > span{
        display: inline-block;
        height: 2px;
        position: absolute
    }
    .progressBar > .range > span:first-child{
        top: 0;
        left: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.6);
    }
     .progressBar > .range > span:last-child{
        top: 0;
        left: 0;
        /* width: 30%; */
        background-color: #c20c02;
    }
    /*播放控制设置*/
    .controller{
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: rgba(255, 255, 255, 0.6);
        height: 50px;
    }
    .controller > span:nth-child(1),
    .controller > .icon-zhankaicaidan{
        font-size: 30px;
    }
    .controller > .icon-previous,
    .controller > .icon-next{
        font-size: 40px;
    }
    .controller > span:nth-child(3){
        font-size: 50px;
    }
    /*播放歌曲列表设置*/
    .wrap-list{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    .wrap{
        width: 100%;
        height: calc(100% - 330px);
        background-color: rgba(36,45,57, 0.7);
    }
    .wrap-list > .icon-guanbi{
        color: white;
        height: 30px;
        font-size: 30px;
        text-align: center;
        display: block;
        width: 100%;
        background-color: #c20c0c;
    }
    .playList{
        width: 100%;
        height: 300px;
        background-color: white;
        overflow-y:scroll;
    }
    .playList > .list{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        border-bottom: 1px dashed gray;
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        text-indent: 1em;
    }
    .playList > .list > .iconfont{
        font-size: 26px;
    }
</style>
