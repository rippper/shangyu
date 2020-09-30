/**
* 排行傍
*/
<template>
  <div class="rankList" :style="'height:' + height + 'px'">
    <!--头部-->
    <header-fix title="排行榜" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="rankList_inner">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1">学习排名</mt-tab-item>
        <mt-tab-item id="2">课程排名</mt-tab-item>
        <mt-tab-item id="3">单位排名</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <div class="listitem_formtitle">
            <div class="listitem_formtitle_item">排名</div>
            <div class="listitem_formtitle_item">学员</div>
            <div class="listitem_formtitle_item">学分</div>
          </div>
          <div class="listitem_form">
            <table class="table">
              <tbody class="fixed_rank_content">
              <tr v-for="(item,index) in studentData" :key="item.index">
                <td v-if="index<3" class="rank"
                    :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
                <td v-if="index>=3" class="rank">{{item.index}}</td>
                <td class="student">{{item.name}}</td>
                <td class="credit">{{item.value}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="noDataBg" v-if="noDataBg1"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="listitem_formtitle">
            <div class="listitem_formtitle_item">排名</div>
            <div class="listitem_formtitle_item">课程</div>
            <div class="listitem_formtitle_item">播放次数</div>
          </div>
          <div class="listitem_form">
            <table class="table">
              <tbody class="fixed_rank_content">
              <tr v-for="(item,index) in courseData" :key="item.index">
                <td v-if="index<3" class="rank"
                    :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
                <td v-if="index>=3" class="rank">{{item.index}}</td>
                <td class="student">{{item.name}}</td>
                <td class="credit">{{item.value}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="noDataBg" v-if="noDataBg2"></div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="listitem_formtitle">
            <div class="listitem_formtitle_item">排名</div>
            <div class="listitem_formtitle_item">单位</div>
            <div class="listitem_formtitle_item">学分</div>
          </div>
          <div class="listitem_form">
            <table class="table">
              <tbody class="fixed_rank_content">
              <tr v-for="(item,index) in groupData" :key="item.index">
                <td v-if="index<3" class="rank"
                    :class="{'rank_bg_one':index==0,'rank_bg_two':index==1,'rank_bg_three':index==2,}"></td>
                <td v-if="index>=3" class="rank">{{item.index}}</td>
                <td class="student">{{item.name}}</td>
                <td class="credit">{{item.value}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="noDataBg" v-if="noDataBg3"></div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Navbar, TabItem, TabContainer, TabContainerItem } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { GetRankInfoList } from '../service/getData'
  import { mapState } from 'vuex'

  Vue.component(Navbar.name, Navbar)
  Vue.component(TabItem.name, TabItem)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  export default {
    mixins: [goBack],
    data () {
      return {
        selected: '1',
        studentData: [],
        courseData: [],
        groupData: [],
        noDataBg1: false,
        noDataBg2: false,
        noDataBg3: false,
        showSlide: false,
        height: ''
      }
    },
    computed: {
      ...mapState(['userAgent', 'appType'])
    },
    mounted () {
      if (this.userAgent.android) {
        this.height = window.innerHeight
      } else if (this.userAgent.ios && this.appType == 'app') {
          this.height = window.innerHeight - 46
      } else if (this.userAgent.ios && this.appType != 'app') {
          this.height = window.innerHeight
      }
      this.getRankList('1')
      this.getRankList('2')
      this.getRankList('3')
    },
    methods: {
      showChange(val) {
        this.showSlide = val
      },
      toggleNav() {
        this.showSlide = !this.showSlide
      },
      //排行榜
      async getRankList (RankType) {
        let data = await GetRankInfoList({RankType})
        // if (data.Type == 1) {
          if (RankType == '1') {
            this.studentData = data.RankInfoList;
            if (data.RankInfoList.length == 0) {
              this.noDataBg1 = true
            }
          } else if (RankType == '2') {
            this.courseData = data.RankInfoList
            if (data.RankInfoList.length == 0) {
              this.noDataBg2 = true
            }
          } else if (RankType == '3') {
            this.groupData = data.RankInfoList
            if (data.RankInfoList.length == 0) {
              this.noDataBg3 = true
            }
          }
        // }
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .rankList {
    padding-top: toRem(180px);
    width: 100vw;
    background: #fff;
    overflow: hidden;
    position: relative;
    .rankList_inner{
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .mint-tab-container{
      height: 100%;
      .mint-tab-container-wrap{
        height: 100%;
      }
    }
    .mint-navbar {
      position: absolute;
      top: toRem(92px);
      left: 0;
      width: 100%;
      z-index: 10;
    }
    .table{
      width: 100%;
      height: 100%;
    }
    .fixed_rank_title {
      width: 100%;
      
      position: absolute;
      top: toRem(-2px);
      z-index: 99;
    }
    .fixed_rank_content{
      width: 100%;
      z-index: 10;
    }
    .listitem_formtitle{
      width: 100%;
      height: toRem(75px);
      display: flex;
      position: absolute;
      top: toRem(-1px);
      z-index: 100;
      .listitem_formtitle_item{
        flex: 1;
        height: toRem(75px);
        line-height: toRem(75px);
        text-align: center;
        color: #fff;
        background-color: $brand-primary;
      }
    }
    .listitem_form{
      width: 100%;
      height: 100%;
      padding-top: toRem(75px);
      overflow: auto;
      position: relative;
      
    }
    .table {
      width: 100%;
      text-align: center;
      background-color: $fill-base;
      th, td {
        text-align: center;
      }
      th {
        line-height: toRem(75px);
        text-align: center;
        font-size: 14px;
        color: $color-text-reverse;
      }
      td {
        line-height: toRem(70px);
        font-size: 14px;
      }
      .rank {
        width: toRem(225px);
      }
      .student {
        width: toRem(302px);
        line-height: toRem(55px);
        padding: toRem(10px) 0;
        @include ellipsis_two(2);
      }
      .sm_height {
        line-height: toRem(40px);
      }
      .credit {
        width: toRem(225px);
      }
    }
  }
</style>
