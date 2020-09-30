/**
* 考试搜索
*/
<template>
  <div class="examSearch container_top">
    <!--头部-->
    <header-fix title="搜索" fixed>
      <i class="webapp webapp-back" @click.stop="toLink" slot="left"></i>
    </header-fix>
    <search v-model="keyword" :search="clickSearch">
      <section v-infinite-scroll="getExamList"
               infinite-scroll-immediate-check="immediate"
               infinite-scroll-disabled="loading"
               infinite-scroll-distance="10">
        <exam-list :exam-data="examData"
                   :no-data-bg="noDataBg"
                   :no-data="noData"
                   :backLine="passType == 1 ? 4 : 3"
                   :searchInfo="keyword"
                   >
        </exam-list>
      </section>
    </search>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Indicator, InfiniteScroll } from 'mint-ui'
  import { GetExamList } from '../service/getData'
  import { goBack } from '../service/mixins'
  import { mapState } from 'vuex'

  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        keyword: this.$route.query.keyword || '',
        oldKeyword: '',
        typeId: 0,
        examType: 'All',
        examData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
        linkType: this.$route.query.linkType,
        passType: this.$route.query.examType || 0
      }
    },
    computed: {
      ...mapState(['userInfo'])
    },
    mounted () {
      if (this.keyword != '') {
        this.getExamList()
      }
    },
    methods: {
      //考试列表
      toLink () {
        if (this.linkType == 1) {
          this.$router.push({ path: '/onlineExam' })
        } else if (this.linkType == 2) {
          this.$router.push({ path: '/examCenter' })
        } else if (this.linkType == 3) {
          this.$router.push({ path: '/myExam' })
        }
      },
      async getExamList () {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        this.oldKeyword = this.keyword //记录搜索keyword
        Indicator.open()
        let data = await GetExamList({
          Keyword: this.keyword,
          UserID: this.userInfo.UserId,
          ExamType: this.examType,
          TypeId: this.typeId,
          Page: this.page,
          finish: this.passType
        })
        Indicator.close()
        if (data.totalCount) {
          let list = data.ExamInfoList
          if (list.length == 0 && this.page > 1) {
            this.noData = true
            return
          }
          if (list.length == 0 && this.page == 1) {
            this.noDataBg = true
            return
          }
          this.examData = this.examData.concat(list)
          this.loading = false
          this.page += 1
        }
      },

      clickSearch () {
        if (this.keyword != this.oldKeyword && !!this.keyword) {
          this.examData = []
          this.page = 1
          this.getExamList()
        }
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  // .examSearch {
  //   height: 100vh;
  //   overflow: hidden;
  //   background-color: $fill-body;
  // }
</style>
