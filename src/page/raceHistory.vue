<template>
  <div class="raceHistory container_both">
    <header-fix :title="title" fixed>
      <i class="webapp webapp-back" @click.stop="goTestCenter" slot="left"></i>
    </header-fix>
    <ul class="container race-list" v-if="dataList.length">
      <li v-for="item in dataList" :key="item.toResult">
        <div><span
          class="list1">考试时间:{{item.start_date | dateformat}}</span><span>考试分数:<span>{{item.SCORE}}</span></span></div>
        <!--<div v-if="item.Reward < 3"><span class="list1">手机:{{item.userMobileNum}}</span></div>
            <div v-if="item.Reward < 3">奖励:<span class="reward">{{item.RewardInfo}}</span></div>
            <div v-if="item.Reward < 3"><span>奖励状态:</span><span v-if="item.Reward==1">奖励已发送</span><span v-if="item.Reward==2">未申请奖励<span @click="toResult(item.PAPER_PREF_ID)" class="btn">申请</span></span><span v-if="item.Reward==0">已申请奖励<span @click="toResult(item.PAPER_PREF_ID)" class="btn">修改</span></span></div>-->
      </li>
    </ul>
    <p class="no-data" v-if="!dataList.length">暂无数据</p>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { GetUserExamHistory } from '../service/getData'

  export default {
    data() {
      return {
        title: '历史测试记录',
        examId: 0,
        dataList: [],
        backType: this.$route.query.backLine,
        keyword: this.$route.query.keyword
      }
    },
    created() {
      this.examId = this.$route.query.examId
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted() {
      this.GetUserExamHistory()
    },
    methods: {
      async GetUserExamHistory() {
        let data = await GetUserExamHistory({ UserID: this.userInfo.UserId, ExamID: this.examId })
        // data = JSON.parse(data);
        this.dataList = data.ExamPaperList
        console.log(data)
      },
      toResult(id) {
        this.$router.push({ path: '/examResult', query: { examPaperId: id, examId: this.examId } })
      },
      goTestCenter() {
        if (this.backType == '1') {
          this.$router.push({ path: '/onlineexam', query: { type: '0' } })
        } else if (this.backType == '2') {
          this.$router.push({ path: '/onlineexam', query: { type: '1' } })
        } else if (this.backType == '3') {
          this.$router.push({ path: '/examSearch', query: { keyword: this.keyword, linkType: 1 } })
        } else if (this.backType == '4') {
          this.$router.push({ path: '/examSearch', query: { linkType: 3, examType: 1, keyword: this.keyword } })
        } else {
          this.$router.push({ path: '/examCenter' })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../style/mixin";
  .container_both {
    background: #fff;
  }
  .race-list {
    li {
      font-size: 14px;
      position: relative;
      div {
        min-height: toRem(60px);
        padding: 0 toRem(30px);
        line-height: toRem(60px);
        .list1 {
          display: inline-block;
          width: toRem(450px);
        }
        .reward {
          color: #3A7FB6;
        }
        .btn {
          display: inline-block;
          margin-left: toRem(10px);
          width: toRem(100px);
          height: toRem(40px);
          text-align: center;
          border-radius: toRem(6px);
          line-height: toRem(40px);
          background: #3A7FB6;
          color: #fff;
        }
      }
      &::after {
        content: '';
        display: block;
        height: toRem(10px);
        background: #EDF0F0;
      }
    }
  }
  .no-data {
    line-height: toRem(60px);
    text-align: center;
  }
</style>
