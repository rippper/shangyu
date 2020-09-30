/**
* 个人中心
*/
<template>
  <div class="personalCenter" :style="'height:' + height + 'px'">
    <div class="personalCenter_inner">
      <div class="person_top">
        <img src="../assets/person_cener_avatar.png" alt="">
        <div class="my_info">
          <h4>{{userInfo.Username}}</h4>
          <p>
            学分：{{userInfo.TotalCredit}}
            <span class="shuxian">|</span>
            排行：{{userInfo.ScoreRank}}
            <!--<span class="shuxian">|</span>
            学习币：{{userInfo.Cion}}-->
          </p>
        </div>
      </div>
      <div class="cell_list_one">
        <mt-cell title="已完成的课程" is-link to="/myFinishCourse">
          <i slot="icon" class="webapp webapp-kecheng" style="color: #ce76a4;"></i>
        </mt-cell>
        <mt-cell title="已完成的考试" is-link to="/myExam">
          <i slot="icon" class="webapp webapp-kecheng" style="color: #e95c2c;"></i>
        </mt-cell>
        <mt-cell title="我的学分" is-link to="/myCredit">
          <i slot="icon" class="webapp webapp-kecheng" style="color: #00ce6a;"></i>
        </mt-cell>
        <mt-cell title="学习排行" is-link to="/rankList">
          <i slot="icon" class="webapp webapp-kecheng" style="color: #00ce6a;"></i>
        </mt-cell>
        <mt-cell title="学习档案" is-link to="/historyYearScore">
          <i slot="icon" class="webapp webapp-kecheng" style="color: #00ce6a;"></i>
        </mt-cell>
      </div>
      <div class="cell_list_between"></div>
      <div class="cell_list_three">
        <router-link :to="{ path: '/newsDetails', query: { ref: '', type: '管理规定' } }">
          <mt-cell title="管理规定">
            <i slot="icon" class="webapp webapp-information" style="color: #ec80c6;"></i>
          </mt-cell>
        </router-link>
        <router-link :to="{ path: '/newsDetails', query: { ref: 'http://www.sygj.org.cn/article/padarticle.aspx?id=35', type: '联系我们' } }">
          <mt-cell title="联系我们">
            <i slot="icon" class="webapp webapp-set" style="color: #ec80c6;"></i>
          </mt-cell>
        </router-link>
      </div>
      <div class="exit" v-show="appType != 'app'">
        <mt-button v-if="userAgent.weixin" @click.native="exit" type="primary" size="large">解除微信绑定</mt-button>
        <mt-button v-else @click.native="exit" type="primary" size="large">安全退出</mt-button>
      </div>
    </div>
    <bottomBar selected="4"></bottomBar>
  </div>
</template>
<script>
  import {Button, Cell, MessageBox} from 'mint-ui';
  import Vue from 'vue';
  import {mapActions, mapState} from 'vuex';
  import { getMac } from '../plugins/utils';
  import {GetUserRaceRank, UpdateLoginStatus} from '../service/getData';
  import { bottomBar } from '../components'

  Vue.component(Cell.name, Cell);
  Vue.component(Button.name, Button);
  export default {
    data() {
      return {
        isCeshi: false,
        rankData: {},
        height: ''
      };
    },
    computed: {
      ...mapState(['userInfo', 'userAgent', 'appType']),
    },
    mounted() {
      if (this.userAgent.android) {
        this.height = window.innerHeight
      } else if (this.userAgent.ios && this.appType == 'app') {
          this.height = window.innerHeight - 46
      } else if (this.userAgent.ios && this.appType != 'app') {
          this.height = window.innerHeight
      }
      this.isCeshi = /^ceshi[1-5]$/.test(this.userInfo.UserId);
    },
    methods: {

      ...mapActions(['saveUserInfo']),
      async exit() {
        let Mac = getMac();
        await UpdateLoginStatus({UserID: this.userInfo.UserId, Mac});
        this.saveUserInfo({});
        this.$router.push({path: '/login'});
      },
      async getRankData() {
        let data = await GetUserRaceRank({UserID: this.userInfo.UserId});
        this.rankData = data;
        if (data.result == 0) {
          MessageBox.alert(data.resultMessage);
        } else {
          this.$router.push({path: '/userRaceRank'});
        }
      },
    },
    components: {
      bottomBar
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .personalCenter {
    width: 100%;
    overflow: hidden;
    position: relative;
    background-color: $fill-body;
    .personalCenter_inner{
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .person_top {
      width: 10rem;
      height: toRem(390px);
      padding: 0 toRem(36px);
      background: url("../assets/person_center_bg.png") no-repeat center;
      background-size: 10rem toRem(390px);
      @include flex(flex-start);
      align-items: center;

      img {
        @include square(128px);
        margin-top: toRem(65px);
      }

      .my_info {
        padding-left: toRem(20px);
        color: $color-text-reverse;
        margin-top: toRem(65px);

        h4 {
          font-size: 16px;
          color: $color-text-reverse;
          margin-bottom: toRem(30px);
        }

        p {
          font-size: 14px;
        }

        .shuxian {
          margin: 0 toRem(15px);
        }
      }
    }

    .cell_list_one, .cell_list_two, .cell_list_three {
      padding: 0 toRem(30px);
      background-color: $fill-base;
    }
    .cell_list_between{
      width: 100%;
      height: toRem(20px);
    }
    .cell_list_two {
      margin: toRem(30px) 0;
    }

    .exit {
      padding: toRem(50px) toRem(30px) toRem(178px) toRem(30px);
    }

    .webapp {
      font-size: toRem(32px);
    }
  }
</style>
