<template>
    <div class="myFinishCourse container_top">
        <header-fix title="已完成的课程" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <div>
            <section v-infinite-scroll="getMyFinishCourse"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-distance="10">
            <course-list :course-data="courseFinishData"
                         :no-data-bg="noFDataBg"
                         :no-data="noFData"
                         my-course>
            </course-list>
          </section>
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
        }
    },
    mounted () {
        this.getMyFinishCourse()
    },
    methods: {
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
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
  .myFinishCourse{

  }

</style>