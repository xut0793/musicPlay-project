<template>
    <div id="discover" v-height="50">
        <ul class="disNav">
            <li>动态</li>
            <li class="active">附近</li>
            <li>好友</li>
        </ul>
       <div>
           <div class="infoBlock">
               <div class="user">
                   <img src="../../static/img/user.jpg" alt="">
                   <div class="info">
                        <div class="userInfo">
                            <span class="userName">抖腿抖到新街口</span>
                            <span class="location">0.05km</span>
                        </div>
                        <div class="icon">
                            <img src="../../static/img/male.png" alt="">
                            <img src="../../static/img/weibo.png" alt="">
                        </div>
                   </div>
               </div>
               <div class="remark">
                   <span>最近听：[天生]-李荣浩</span>
                   <span>11:39</span>
               </div>
           </div>
           <div class="infoBlock">
               <div class="user">
                   <img src="../../static/img/head.png" alt="">
                   <div class="info">
                        <div class="userInfo">
                            <span class="userName">她的城twelve</span>
                            <span class="location">0.05km</span>
                        </div>
                        <div class="icon">
                            <img src="../../static/img/female.png" alt="">
                            <img src="../../static/img/weibo.png" alt="">
                        </div>
                   </div>
               </div>
               <div class="remark">
                   <span>最近听：[开到荼蘼]-王菲</span>
                   <span>3月4日</span>
               </div>
           </div>
           <div class="infoBlock">
               <div class="user">
                   <img src="../../static/img/one.jpg" alt="">
                   <div class="info">
                        <div class="userInfo">
                            <span class="userName">黄彬Chris</span>
                            <span class="location">0.05km</span>
                        </div>
                        <div class="icon">
                            <img src="../../static/img/male.png" alt="">
                            <img src="../../static/img/wechat.png" alt="">
                        </div>
                   </div>
               </div>
               <div class="remark">
                   <span>最近听：[第三十四期]-康有为传</span>
                   <span>昨天08:19</span>
               </div>
           </div>
           <div class="infoBlock">
               <div class="user">
                   <img src="../../static/img/album3.jpg" alt="">
                   <div class="info">
                        <div class="userInfo">
                            <span class="userName">浅听风吟Erin</span>
                            <span class="location">0.05km</span>
                        </div>
                        <div class="icon">
                            <img src="../../static/img/male.png" alt="">
                            <img src="../../static/img/weibo.png" alt="">
                        </div>
                   </div>
               </div>
               <div class="remark">
                   <span>最近听：[为你成全]-万茜</span>
                   <span>10:12</span>
               </div>
           </div>
       </div>
    </div>
</template>
<script>
export default {
  directives: {
    height: {
      inserted: function(el, binding) {
        var winH =
          document.documentElement.clientHeight || document.body.clientHeight;
        if (binding.value == undefined) {
          el.style.height = winH + "px";
        } else if (typeof binding.value == "number") {
          el.style.height = winH - binding.value + "px";
        }
      }
    }
  }
};
</script>
<style scoped>
#discover {
  width: 100%;
  height: 100%;
  background-color: #f2f3f8;
  overflow-y: scroll;
  /* overflow-x: hidden; */
}
/*导航样式*/
.disNav {
  width: 100%;
  height: 30px;
  padding: 10px 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
}
.disNav > li {
  width: 30%;
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  font-weight: 500;
  color: #b8b9be;
  text-align: center;
  border-right: 1px solid #b8b9be;
}
.disNav > li:last-child {
  border-right: none;
}
.disNav > .active {
  color: #c20c0c;
}
/*附近信息块样式*/
.infoBlock {
  width: 100%;
  height: 150px;
  background-color: white;
  margin: 20px 0;
}
.infoBlock > .user {
  height: 80px;
  display: flex;
  padding: 15px 20px;
  border-bottom: 1px solid #b8b9be;
}
.infoBlock > .user > img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
}
.infoBlock > .user > .info {
  flex: 1;
  width: 300px;
}
.infoBlock .userInfo {
  height: 40px;
  line-height: 40px;
  display: flex;
  justify-content: space-between;
}
.infoBlock .userInfo > .userName {
  font-size: 16px;
  font-weight: bold;
  color: #39373a;
  text-indent: 1em;
}
.infoBlock .userInfo > .location {
  font-size: 18px;
  color: #b8b9be;
  position: relative;
}
.location::before {
  content: "";
  display: block;
  width: 25px;
  height: 25px;
  background: url("../../static/img/location.png") no-repeat;
  position: absolute;
  top: 5px;
  left: -30px;
}
.icon > img:first-child {
  width: 40px;
  height: 40px;
}
.icon > img:last-child {
  width: 25px;
  height: 25x;
}

.remark {
  width: 100%;
  height: 40px;
  color: #b8b9be;
  line-height: 40px;
  padding: 0 20px;
  font-size: 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
</style>


