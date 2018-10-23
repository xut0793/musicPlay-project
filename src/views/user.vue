<template>
    <div id="user">
        <div class="user-main">
            <div class="user-main-header">
                <img src="../../static/img/user.jpg" alt="">
                <div>
                    <span class="iconfont icon-guanbi" @click="hideUserPage"></span>
                    <span>爱前端</span>
                    <span>Lv6</span>
                    <span>代码要像音乐一样优雅...</span>
                </div>
            </div>
            <div class="user-main-content">
                <ul>
                    <li class="iconfont icon-yuleyinleshoucang">发现音乐</li>
                    <li class="iconfont icon-addfile">我的音乐</li>
                    <li class="iconfont icon-pengyou">我的朋友</li>
                    <hr>
                    <li class="iconfont icon-fenxiang1">分享</li>
                    <li class="iconfont icon-BAI-pinglun">评论</li>
                    <li class="iconfont icon-icon--">下载</li>
                    <li class="iconfont icon-shezhi">设置</li>

                </ul>
            </div>
        </div>
        <div class="mask" @click="hideUserPage"></div>
    </div>
</template>
<script>
export default {
    methods: {
        hideUserPage(){this.$store.commit("showUserPage",false)}
    }
}
</script>
<style scoped>
    #user{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 98;
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
    }
    .mask{
        width: 30%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .user-main{
        flex: 1;
        height: 100%;
        background-color: white;
    }
    .user-main-header{
        height: 30%;
        margin-bottom: 20px;
    }
    .user-main-header > img{
        width: 100%;
        height: 100%;
    }
    .user-main-header > div{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(36,45,57, 0.7);
        width: 70%;
        height: 30%;
    }
    .user-main-header > div > span:nth-child(1){
        position: absolute;
        top: 10%;
        right: 10%;
        font-size: 30px;
        color: white;
    }
    .user-main-header > div > span:nth-child(2){
        position: absolute;
        top: 60%;
        left: 0;
        font-size: 20px;
        color: white;
        text-indent: 1em;
    }
    .user-main-header > div > span:nth-child(3){
        position: absolute;
        top: 60%;
        left: 100px;
        display: inline-block;
        width: 40px;
        height: 20px;
        border-radius: 8px;
        background-color: orange;
        color: white;
        font-size: 18px;
        text-align: center;
    }
    .user-main-header > div > span:last-child{
        position: absolute;
        top: 75%;
        left: 0;
        text-indent: 1em;
        font-size: 14px;
        color: gold;
    }
    /*内容区样式*/
    .user-main-content .iconfont{
        width:100%;
        height: 50px;
        line-height: 50px;
        font-size: 18px;
        text-indent: 1em;
    }
    .user-main-content .iconfont::before{
        margin-right: 1em;
        font-size: 24px;
        font-weight: bolder;
    }
    .user-main-content li:first-child{
        color: red;
    }
</style>
