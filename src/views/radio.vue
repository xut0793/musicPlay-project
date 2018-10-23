<template>
    <div id="radioPage" v-height='50'>
        <ul class="radioNav">
            <li class="active">推荐</li>
            <li>潮流电台</li>
            <li>主播电台</li>
            <li>收听排行榜</li>
        </ul>
        <div class="radioTitle">个性化推荐</div>
        <div class="recommendList">
            <img src="../../static/img/user.jpg" alt="">
            <div>
                <p>私人FM</p>
                <p>放松下来，享受你的专属推荐</p>
            </div>
            <span> > </span>
        </div>
        <div class="recommendList">
            <img src="../../static/music/album/我要的幸福/album1.jpg" alt="">
            <div>
                <p>每日歌曲推荐</p>
                <p>根据你的口味生成，每天更新</p>
            </div>
            <span> > </span>
        </div>
        <div class="recommendList">
            <img src="../../static/music/album/我要的幸福2/一个方向.jpg" alt="">
            <div>
                <p>入耳便爱上的英文歌</p>
                <p>根据你喜欢的单曲《下一个天亮》推荐</p>
            </div>
        </div>
        <div class="recommendList">
            <img src="../../static/music/album/album3/album3.jpg" alt="">
            <div>
                <p>安静看书的背景音乐</p>
                <p>根据你可能的喜欢的单曲《煎熬》推荐</p>
            </div>
        </div>
        <div class="recommendList">
            <img src="../../static/music/album/album3/album3.jpg" alt="">
            <div>
                <p>安静看书的背景音乐</p>
                <p>根据你可能的喜欢的单曲《煎熬》推荐</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
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
    #radioPage{
        width: 100%;
        height: 100%;
        background-color: #F2F3F8;
        overflow-y: scroll;
        overflow-x: hidden;
    }
    /*导航样式*/
    .radioNav{
        width: 100%;
        height: 50px;
        background-color: white;
        display: flex;
        justify-content: space-around;
    }
    .radioNav > li{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        font-weight: 500;
    }
    .active{
        color: #c20c0c;
        border-bottom: 3px solid  #c20c0c;
    }

    /*标题样式*/
    .radioTitle{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        font-weight: bold;
        margin: 15px 0;
    }
    .radioTitle::before{
        content: "| ";
        color: #c20c0c;
        font-size: 18px;
        font-weight: bolder;
        margin-left: 6px;
    }

    /*内容条目样式*/
    .recommendList{
        width: 100%;
        height: 100px;
        border-bottom: 1px solid rgba(195,196,201, 1);
        padding: 10px 10px;
        display: flex;
    }
    .recommendList > img{
        width: 100px;
        height: 100px;
    }
    .recommendList > div > p{
        width: 80%;
        height: 50px;
        line-height: 50px;
        text-indent: 1em;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
    }
    .recommendList > div > p:first-child{
        font-size: 20px;
        color: #1B1C20;
    }
    .recommendList > div > p:last-child{
        font-size: 16px;
        color: #B8B9BE;
    }
    .recommendList > span{
        font-size: 20px;
        font-weight: bolder;
        color: #B8B9BE;
        text-align: center;
        width: 10px;
        height: 100px;
        line-height: 100px;
    }
</style>
