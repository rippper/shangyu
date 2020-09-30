/**
* 在线测试
*/
<template>
  <div class="examCenter" :style="'height:' + height + 'px'">
    <header-fix :title="examTitle" fixed>
      <!--<a slot="left" @click="toggleNav">
        <i class="webapp webapp-category"></i>
      </a>-->
      <router-link slot="right" :to="{ path: '/examSearch', query: { linkType: 2 } }"><i class="webapp webapp-search"></i></router-link> 
        <!-- <router-link class="pull-right" to="/examSearch">
          <i class="webapp webapp-search"></i>
        </router-link> -->
        <!--<a class="filter" @click="toggleFilter">
          <span>筛选</span>
          <i v-if="showFilter" class="webapp webapp-less"></i>
          <i v-if="!showFilter" class="webapp webapp-moreunfold"></i>
        </a>-->
    </header-fix>
    <div class="container">
      <div  class="container_inner"
            v-infinite-scroll="getUnFinishExamList"
            infinite-scroll-immediate-check="immediate"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
        <exam-list :exam-data="unFinishExamData"
                    :no-data-bg="unFinishNoDataBg"
                    :no-data="unFinishNoData"
                    @refreshExamList="refreshExamList">
        </exam-list>
      </div>
    </div>
    <bottomBar selected="3"></bottomBar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Indicator, InfiniteScroll, Navbar, TabContainer, TabContainerItem } from 'mint-ui'
  import { GetExamListAPI2 } from '../service/getData'

  Vue.use(InfiniteScroll)
  Vue.component(Navbar.name, Navbar)
  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  export default {
    data () {
      return {
        examTitle: '未完成的考试',
        tabIndex: "1",
        /*showFilter: false, //是否显示筛选
        showSlide: false, //是否显示滑动
        examType: 'All', //筛选type
        examCategory: [],
        typeId: 0, //考试typeId*/
        finishExamData: [], //考试列表数据
        unFinishExamData: [], //考试列表数据
        loading: false,
        immediate: false,
        unFinishPage: 1,
        finishPage: 1,
        unFinishNoData: false,
        finishNoData: false,
        unFinishNoDataBg: false,
        finishNoDataBg: false,
        height: ''
      }
    },
    computed: {
      ...mapState(['userInfo', 'userAgent', 'appType'])
    },
    mounted () {
      if (this.userAgent.android) {
        this.height = window.innerHeight
      } else if (this.userAgent.ios && this.appType == 'app') {
          this.height = window.innerHeight - 46
      } else if (this.userAgent.ios && this.appType != 'app') {
          this.height = window.innerHeight
      }
      /*this.getExamCategory()*/
      // this.getFinishExamList()
      this.getUnFinishExamList()
    },
    methods: {
      /*toggleNav () {
        this.showSlide = !this.showSlide
        this.showFilter = false
      },*/
      /*showChange (val) {
        this.showSlide = val
        this.showFilter = false
      },
      toggleFilter () {
        this.showFilter = !this.showFilter
        this.showSlide = false
      },*/
      //考试分类
      /*async getExamCategory () {
        let data = await GetExamType()
        if (data.Type == 1) {
          let list = data.Data.List
          let category = list.map((item, index) => {
            return {Name: item.Name, Id: item.Id, ParentId: item.ParentId, Nodes: null}
          })
          this.examCategory = category
        }
      },*/
      //考试列表
      /*async getFinishExamList () {
        this.finishNoData = false
        this.finishNoDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetExamListAPI2({Page: this.finishPage, UserID: this.userInfo.UserId, finish: 1})
        Indicator.close()
        let list = []
        if (Array.isArray(data.ExamInfoList)) {
          list = data.ExamInfoList
        }
        if (list.length == 0 && this.finishPage > 0) {
          this.finishNoData = true
          return
        }
        if (list.length == 0 && this.finishPage == 0) {
          this.finishNoDataBg = true
          return
        }
        this.finishExamData = this.finishExamData.concat(list)
        this.loading = false
        this.finishPage += 1
      },*/
      async getUnFinishExamList () {
        this.unFinishNoData = false
        this.unFinishNoDataBg = false
        this.loading = true
        Indicator.open()
        let data = await GetExamListAPI2({Page: this.unFinishPage, UserID: this.userInfo.UserId, finish: 0})
        Indicator.close()
        let list = []
        if (Array.isArray(data.ExamInfoList)) {
          list = data.ExamInfoList
        }
        if (list.length == 0 && this.unFinishPage > 0) {
          this.unFinishNoData = true
          return
        }
        if (list.length == 0 && this.unFinishPage == 0) {
          this.unFinishNoDataBg = true
          return
        }
        this.unFinishExamData = this.unFinishExamData.concat(list)
        this.loading = false
        this.unFinishPage += 1
      },
      refreshExamList () {
        this.unFinishPage = 0
        this.unFinishExamData = []
        this.getUnFinishExamList()
      }
      /*//点击分类搜索
      searchExam (data) {
        this.page = 1
        this.typeId = data.Id
        this.examTitle = data.Name
        this.showSlide = false
        this.showFilter = false
        this.examData = []
        this.getExamList()
      },*/
      /*//点击筛选搜索
      filterExam (type) {
        this.page = 1
        this.showFilter = false
        this.showSlide = false
        this.examType = type
        this.examData = []
        this.getExamList()
      }*/
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .examCenter {
    width: 100vw;
    position: relative;
    .container{
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .container_inner{
      padding: toRem(92px) 0 toRem(145px);
    }
    .filter {
      @extend %pull-right;
      color: $color-text-reverse;
      font-size: 14px;
      margin-right: toRem(10px);
      width: toRem(110px);
      height: toRem(92px);
      @include flex();
      align-items: center;
      .webapp {
        font-size: 20px;
      }
    }
    .filter_layer {
      position: absolute;
      top: toRem(92px);
      left: 0;
      right: 0;
      height: 100vh;
      background-color: rgba(0, 0, 0, .4);
      z-index: 50;
    }
    .filter_list {
      position: absolute;
      max-height: 0;
      overflow: hidden;
      left: 0;
      right: 0;
      top: toRem(92px);
      z-index: 100;
      background-color: $fill-base;
      font-size: 15px;
      transition: max-height ease 0.5s;
      &.show {
        max-height: toRem(430px);
      }
    }
    .filter_item {
      @include ht-lineHt(86px);
      padding: 0 toRem(30px);
      span {
        margin-left: toRem(30px);
      }
      img {
        width: toRem(28px);
      }
      .webapp-selected {
        @extend %pull-right;
        font-size: 25px;
        color: $brand-primary;
      }
      &.filter_title {
        background-color: $fill-grey;
        padding: 0;
        color: $color-text-thirdly;
        span {
          margin-left: toRem(30px);
        }
      }
    }
    .tree_title .tran_line {
      background-color: $brand-primary;
    }
  }
</style>
