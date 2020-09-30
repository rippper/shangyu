/**
* 我的学时
*/
<template>
  <div class="my_credit" :style="'height:' + height + 'px'">
    <!--头部-->
    <header-fix title="我的学分" fixed>
      <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
    </header-fix>
    <div class="my_credit_list">
      <div class="cell_list_one">
        <mt-cell title="用户名" :value="userInfo.Username"></mt-cell>
        <mt-cell title="部门（单位）信息" :value="userInfo.Usergroup"></mt-cell>
        <mt-cell title="用户职务" :value="userInfo.UserZW"></mt-cell>
      </div>
      <div class="split"></div>
      <div class="cell_list_two">
        <mt-cell title="考试获得学分" :value="userInfo.ExamCredit"></mt-cell>
        <mt-cell title="课程获得学分" :value="userInfo.CourseCredit"></mt-cell>
        <!--<mt-cell title="培训获得学分" :value="userInfo.TrainningCredit"></mt-cell> -->
        <mt-cell title="获得总学分" :value="userInfo.TotalCredit"></mt-cell>
      </div>
      <div class="split"></div>
      <div class="cell_list_three">
        <!-- <mt-cell title="要求必修学分" :value="userInfo.NeedRequiredCredit"></mt-cell> -->
        <mt-cell title="要求总学分" :value="userInfo.NeedCredit"></mt-cell>
        <mt-cell title="考核结果" :value="userInfo.PassFlag == 1?'通过':'未通过'"></mt-cell>
        <mt-cell title="您的学分排名" :value="userInfo.ScoreRank"></mt-cell>
      </div>
    </div>
    
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Cell } from 'mint-ui'
  import { mapState, mapActions } from 'vuex'

  Vue.component(Cell.name, Cell)

  export default {
    data () {
      return {
        height: ''
      }
    },
    computed: {
      ...mapState(['userInfo', 'userAgent', 'appType']),
    },
    mounted () {
      if (this.userAgent.android) {
        this.height = window.innerHeight
      } else if (this.userAgent.ios && this.appType == 'app') {
        this.height = window.innerHeight - 46
      } else if (this.userAgent.ios && this.appType != 'app') {
        this.height = window.innerHeight
      }
      this.getUserInformation()
    },
    methods: {
      ...mapActions(['getUserInformation']),
      goBack () {
        this.$router.push('/personalCenter')
      },
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .my_credit {
    .cell_list_one, .cell_list_two, .cell_list_three {
      padding: 0 toRem(20px);
      background-color: $fill-base;
    }
    .cell_list_one{
      padding-top: toRem(98px);
    }
    .my_credit_list{
      width: 100%;
      height: 100%;
      overflow-y: auto;
    }
    .mint-cell-wrapper {
      padding: 0;
    }
    .split {
      display: block;
      width: 100%;
      height: toRem(20px);
      background-color: $fill-body;
    }
  }
</style>
