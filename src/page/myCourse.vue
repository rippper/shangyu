/**
* 我的课程
*/
<template>
  <div class="my_course" :style="'height:' + height + 'px'">
    <header-fix title="正在学习的课程" fixed>
      <!-- <mb-tab slot="title" v-model="tabType">
        <mb-tab-item id="0">未完成</mb-tab-item>
        <mb-tab-item id="1">已完成</mb-tab-item>
      </mb-tab> -->
      <router-link slot="right" :to="{ path: '/courseSearch', query: { Type: 'studying' } }"><i class="webapp webapp-search"></i></router-link> 
    </header-fix>
    <div class="my_course_container">
      <div class="my_course_list" v-if="tabType === '0'" v-infinite-scroll="getMyUnFinishCourse"
              infinite-scroll-disabled="loading"
              infinite-scroll-immediate-check="immediate"
              infinite-scroll-distance="10">
        <course-list :course-data="courseUnFinishData"
                    :no-data-bg="noUfDataBg"
                    :no-data="noUfData"
                    :show-upload-btn="true"
                    my-course>
        </course-list>
      </div>
    </div>
    <bottom-bar selected="2"></bottom-bar>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Indicator, TabContainer, TabContainerItem, InfiniteScroll } from 'mint-ui'
  import { goBack } from '../service/mixins'
  import { getUserCourseInfo } from '../service/getData'
  import { bottomBar } from '../components'

  Vue.component(TabContainer.name, TabContainer)
  Vue.component(TabContainerItem.name, TabContainerItem)
  Vue.use(InfiniteScroll)
  export default {
    mixins: [goBack],
    data () {
      return {
        tabType: '0',
        courseFinishData: [],
        courseUnFinishData: [],
        noFDataBg: false,
        noFData: false,
        noUfDataBg: false,
        noUfData: false,
        loading: false,
        immediate: false,
        unFinishPage: 1,
        finishPage: 1,
        startX: 0,
        endX: 0,
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
      this.getMyUnFinishCourse()
      var element = this.$el
      element.addEventListener('touchstart', (event) => {
        if (this.prevent) event.preventDefault()
        if (this.stopPropagation) event.stopPropagation()
        // this.doOnTouchStart(event);
      })

      element.addEventListener('touchmove', (event) => {
        if (this.prevent) event.preventDefault()
        if (this.stopPropagation) event.stopPropagation()
        // this.doOnTouchMove(event);
      })

      element.addEventListener('touchend', (event) => {
        if (this.prevent) event.preventDefault()
        if (this.stopPropagation) event.stopPropagation()
        // this.doOnTouchEnd(event);
      })
    },
    methods: {
      //已完成课程
      async getMyFinishCourse () {
        this.noFData = false
        this.noFDataBg = false
        this.loading = true
        Indicator.open()
        let data = await getUserCourseInfo({UserID: this.userInfo.UserId, Finish: 1, Page: this.finishPage})
        console.log(data)
        Indicator.close()
        let list = []
        if (Array.isArray(data.UserCourseInfoList)) {
          list = data.UserCourseInfoList
        }
        if (list.length == 0 && this.finishPage > 1) {
          this.noFData = true
          return
        }
        if (list.length == 0 && this.finishPage == 1) {
          this.noFDataBg = true
          return
        }
        this.courseFinishData = this.courseFinishData.concat(list)
        console.log(this.courseFinishData)
        this.loading = false
        this.finishPage += 1
      },
      //未完成课程
      async getMyUnFinishCourse () {
        this.noUfData = false
        this.noUfDataBg = false
        this.loading = true
        Indicator.open()
        let data = await getUserCourseInfo({UserID: this.userInfo.UserId,Finish: 0, Page: this.unFinishPage})
        Indicator.close()
        let list = []
        if (Array.isArray(data.UserCourseInfoList)) {
          list = data.UserCourseInfoList
        }
        if (list.length == 0 && this.unFinishPage > 1) {
          this.noUfData = true
          return
        }
        if (list.length == 0 && this.unFinishPage == 1) {
          this.noUfDataBg = true
          return
        }
        this.courseUnFinishData = this.courseUnFinishData.concat(list)
        this.loading = false
        this.unFinishPage += 1
      },
      doOnTouchStart (event) {
        /*let touches=event.touches;
        let targetTouches=event.targetTouches;
        let changeTouches=event.changeTouches;*/
        let pageX = event.targetTouches[0].pageX
        //let pageY = event.targetTouches[0].pageY
        this.startX = pageX
        //console.log("TouchStart" + pageX, pageY);
      },
      doOnTouchMove (event) {
        // let pageX = event.targetTouches[0].pageX
        // let pageY = event.targetTouches[0].pageY
        // console.log("TouchMove" + pageX, pageY);
      },
      doOnTouchEnd (event) {
        let pageX = event.changedTouches[0].pageX
        // let pageY = event.changedTouches[0].pageY
        this.endX = pageX
        // console.log("TouchEnd" + pageX, pageY);
        //左滑
        if (this.endX < this.startX - 20) {
          this.tabType = '1'
        }
        //右滑
        if (this.endX > this.startX + 20) {
          this.tabType = '0'
        }
      },
    },
    components: {
      bottomBar
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
@import '../style/mixin.scss';
.my_course{
  width: 100%;
  position: relative;
  .my_course_container{
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .my_course_list{
      padding: toRem(92px) 0 toRem(145px);
    }
  }
}
</style>
