<template>
    <div class="myFinishCourse" :style="'height:' + height + 'px'">
        <header-fix title="已完成的课程" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
            <router-link slot="right" :to="{ path: '/courseSearch', query: { Type: 'finish' } }"><i class="webapp webapp-search"></i></router-link>
        </header-fix>
        <div class="mfc_inner">
            <div
                class="mfc_innerList" 
                v-infinite-scroll="getMyFinishCourse"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-distance="10"
            >
            <course-list :course-data="courseFinishData"
                         :no-data-bg="noFDataBg"
                         :no-data="noFData"
                         my-course>
            </course-list>
          </div>
        </div>
    </div>
</template>

<script>
import { headerFix } from '../components'
import { mapState } from 'vuex'
import { goBack } from '../service/mixins'
import { getUserCourseInfo } from '../service/getData'
import { Indicator } from 'mint-ui'

export default {
    mixins: [goBack],
    name: 'myFinishCourse',
    data () {
        return {
            courseFinishData: [],
            noFData: false,
            noFDataBg: false,
            loading: false,
            finishPage: 1,
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
        this.getMyFinishCourse()
    },
    methods: {
        async getMyFinishCourse () {
            this.noFData = false
            this.noFDataBg = false
            this.loading = true
            Indicator.open()
            let data = await getUserCourseInfo({UserID: this.userInfo.UserId, Finish: 1, Page: this.finishPage})
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
            this.loading = false
            this.finishPage += 1
        },
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
  .myFinishCourse{
      width: 100%;
      overflow: hidden;
      .mfc_inner{
          width: 100%;
          height: 100%;
          overflow-y: auto;
          .mfc_innerList{
              padding-top: toRem(98px);
          }
      }
  }
</style>