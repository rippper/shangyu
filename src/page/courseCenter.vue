/**
* 课程中心
*/
<template>
  <div class="courseCenter" :style="'height:' + height + 'px'">
    <header-fix :title="courseTitle" fixed>
      <div slot="left">
        <i class="webapp webapp-back" @click.stop="goBack"></i>
        <a @click="toggleNav">
          <i class="webapp webapp-category"></i>
        </a>
      </div>
      <router-link slot="right" to="/courseSearch"><i class="webapp webapp-search"></i></router-link>
    </header-fix>
    <div class="cc_listcontent">
      <nav-slide :show="showSlide" @showChange="showChange">
        <div slot="left" class="category">
          <tree :data="courseCategory" :on-select="searchCourse" :selected-id="channelId"></tree>
        </div>
        <div slot="right">
          <section v-if="!skeInit" v-infinite-scroll="getCourseList"
                  infinite-scroll-immediate-check="immediate"
                  infinite-scroll-disabled="loading"
                  infinite-scroll-distance="10">
            <course-list :course-data="courseData" :no-data-bg="noDataBg" :no-data="noData"/>
          </section>
          <skeleton-item v-else v-for="i in 10" :key="i"/>
        </div>
      </nav-slide>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import { Indicator, InfiniteScroll, MessageBox } from 'mint-ui'
  import {
    getChannelInfoList,
    getCourseInfoList
  } from '../service/getData'
  import { goBack } from '../service/mixins'
  import { setStore } from "../plugins/utils";
  import { bottomBar } from '../components'

  Vue.use(InfiniteScroll)
  Vue.component(MessageBox.name, MessageBox)
  export default {
    mixins: [goBack],
    data() {
      return {
        courseTitle: '课程中心',
        showSlide: false,
        courseCategory: [],
        channelId: 0,
        courseData: [],
        loading: false,
        immediate: false,
        page: 1,
        noData: false,
        noDataBg: false,
        skeInit: true,
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
      this.channelId = this.$route.query.id || ''
      this.courseTitle = this.$route.query.title || '课程中心'
      this.getChannelInfoList()
      this.getCourseList()
      this.uploadProgress()
    },
    methods: {
      toggleNav() {
        this.showSlide = !this.showSlide
      },
      showChange(val) {
        this.showSlide = val
      },
      //课程分类
      async getChannelInfoList() {
        let data = await getChannelInfoList()
        let arr = data.ChannelInfoList.filter((e) => {
          return e.Parent_ID == 0
        }).map((item, index) => {
          return item
        })
        // console.log(arr);
        data.ChannelInfoList.filter((e) => {
          return e.Parent_ID != 0
        }).forEach((item, index) => {
          let i = 0
          arr.forEach((obj, pos) => {
            if (obj.Channel_id == item.Parent_ID) {
              i = pos
              if (i >= 0) {
                if (!arr[i].Nodes) {
                  arr[i].Nodes = []
                }
                arr[i].Nodes.push(item)
              }
            }
          })
        })
        this.courseCategory = arr;
        // console.log(this.courseCategory)
      },
      //课程列表
      async getCourseList() {
        this.noData = false
        this.noDataBg = false
        this.loading = true
        !this.skeInit && Indicator.open()
        let data = await getCourseInfoList({
          channelName: this.courseTitle,
          Page: this.page,
          PageCount: 10,
          UserID: this.userInfo.UserId
        })
        Indicator.close()
        /* 课程 */
        let list = [];
        if (Array.isArray(data.CourseInfoList)) {
          list = data.CourseInfoList
          this.page += 1
        }
        if (list.length == 0 && this.page > 1) {
          this.noData = true
          return
        }
        if (list.length == 0 && this.page == 1) {
          this.noDataBg = true
          this.skeInit = false
          return
        }
        this.courseData = this.courseData.concat(list)
        this.loading = false
        this.skeInit = false
      },
      /*搜索课程*/
      searchCourse(data) {
        this.page = 1
        this.channelId = data.Channel_id
        this.courseTitle = data.Channel_name
        this.showSlide = false
        this.courseData = []
        this.skeInit = true
        document.body.scrollTop = 0
        this.getCourseList()
      },
      // 上传缓存的进度
      uploadProgress() {
        setStore('jyaiccProgress', '')
        // let singleStore = getStore('singleProgress') || {}
        // let singleLen = Object.keys(singleStore).length
        // let aiccStore = getStore('jyaiccProgress') || {}
        // let aiccLen = Object.keys(aiccStore).length
        // if (aiccLen > 0) {
        //   for (let key in aiccStore) {
        //     let progressStack = aiccStore[key];
        //     for (let i = 0; i < progressStack.length; i++) {
        //       let params = progressStack[i]
        //       console.log(params)
        //       try {
        //         let data = await getSyncUserStudyData(params)
        //         if (data == 'ok') {
        //           progressStack.splice(i, 1)
        //         } else {
        //           Toast({ message: "提交缓存进度失败", position: 'bottom' })
        //         }
        //       } catch (e) {
        //         Toast({ message: "提交缓存进度失败", position: 'bottom' })
        //       }
        //     }
        //     if (progressStack.length == 0) {
        //       delete aiccStore[key]
        //     } else {
        //       aiccStore[key] = progressStack;
        //     }
        //   }
        //   setStore('jyaiccProgress', aiccStore)
        // }
        // if (singleLen > 0) {
        //   for (let key in singleStore) {
        //     let progressStack = singleStore[key]
        //     for (let i = 0; i < progressStack.length; i++) {
        //       let params = progressStack[i]
        //       console.log(params)
        //       try {
        //         let data = await singleUploadTimeNode(params)
        //         if (data.split(',')[0] == 'true') {
        //           progressStack.splice(i, 1)
        //         } else {
        //           Toast({ message: "提交缓存进度失败", position: 'bottom' })
        //         }
        //       } catch (e) {
        //         Toast({ message: "提交缓存进度失败", position: 'bottom' })
        //       }
        //     }
        //     if (progressStack.length == 0) {
        //       delete singleStore[key]
        //     } else {
        //       singleStore[key] = progressStack
        //     }
        //   }
        //   setStore('singleProgress', singleStore)
        // }
      }
    },
    components: {
      bottomBar
    },
    beforeRouteLeave(to, from, next) {
      MessageBox.close()
      next()
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../style/mixin";

  .courseCenter {
    width: 100vw;
    overflow: hidden;
    .cc_listcontent{
      width: 100%;
      height: 100%;
      padding-top: toRem(92px);
      overflow-y: auto;
    }
  }
</style>
