<template>
    <div class="home" :style="'height:' + height + 'px'">
        <indexSearch></indexSearch>
        <div class="homeinner">
            <div class="h_bannerImgPart">
                <img src="../assets/sy_indexImg.jpg" alt>
            </div>
            <div class="h_tableList">
                <ul>
                    <li>
                        <router-link to="/courseCenter">
                            <div>
                                <div>
                                    <img src="../assets/sy_course.png" alt>
                                    <p>课程中心</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/costomTraining">
                            <div>
                                <div>
                                    <img src="../assets/sy_training.png" alt>
                                    <p>定制培训</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/communityCenter">
                            <div>
                                <div>
                                    <img src="../assets/sy_news.png" alt>
                                    <p>通知公告</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ path: '/newsDetails', query: { ref: 'http://www.sygj.org.cn:80/article/padarticle.aspx?id=216', type: '学习帮助' } }">
                            <div>
                                <div>
                                    <img src="../assets/sy_exam.png" alt>
                                    <p>学习帮助</p>
                                </div>
                            </div>
                        </router-link>
                    </li>
                </ul>
            </div>
            <indexImgList title="专题学习" :specialStudy="specialStudy" :linkPath="{ path: '/specialTask' }"></indexImgList>
            <indexImgList ref="news_course" title="最新课程" :specialStudy="specialCourse" :linkPath="{ path: '/courseCenter', query: { id: 45, title: '最新课程' } }"></indexImgList>
            <div class="h_courselist">
                <div class="hcl_title">
                    <div class="hcl_title_left">热门课程</div>
                    <div class="hcl_title_right">
                        <router-link :to="{ path: '/courseCenter', query: { title: '热门课程' } }">查看更多</router-link>
                    </div>
                </div>
                <div class="hcl_content">
                    <ul>
                        <li v-for="(item, index) in hotCourseList" :key="index">
                            <a href="javascript:;" @click="addCourse(item)">
                                <div class="hcl_imgbox">
                                    <img :src="item.Course_img ? item.Course_img : require('../assets/sy_nopic.png')" v-if="!item.imgWorry" @error="worryImg(index)" >
                                    <img src="../assets/noCourse.png" v-else>
                                </div>
                                <p class="hcl_content_title" v-text="item.Course_Name"></p>
                                <div class="hcl_content_infotype">
                                    <div class="hcl_cit_time">学时: <span v-text="item.Credit_hour"></span></div>
                                    <div class="hcl_cit_type">讲师: <span v-text="item.Teachername">视频</span></div>
                                </div>
                                <div class="hcl_content_coursetype">
                                    <div class="hcl_cct_selecttype">
                                        <img src="../assets/sy_select.png" alt v-if="item.selectIdentifier !== '未选'">
                                        <img src="../assets/sy_noselect.png" alt v-else>
                                    </div>
                                    <div class="hcl_cct_watch">
                                        <img src="../assets/sy_watch.png" alt>
                                        <span v-text="item.ClickCount"></span>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <bottomBar selected="1"></bottomBar>
    </div>
</template>

<script>
import { indexSearch, indexImgList, bottomBar } from '../components'
import { getZTChannelInfoList, getCourseInfoList, UpdateUserCourse } from '../service/getData'
import { mapState, mapActions, mapMutations } from 'vuex'
import { toPlay } from '../service/mixins'
import { wordLimit } from '../plugins/utils'

export default {
    mixins: [toPlay],
    name: 'Home',
    data () {
        return {
            specialStudy: [
                {
                    Course_img: require('../assets/sy_specialstudy02.png'),
                    Course_Name: '',
                    typeId: 0,
                    Watcher: false
                },
                {
                    Course_img: require('../assets/sy_specialstudy01.png'),
                    Course_Name: '',
                    typeId: 0,
                    Watcher: false
                },
                {
                    Course_img: require('../assets/sy_specialstudy03.png'),
                    Course_Name: '',
                    typeId: 0,
                    Watcher: false
                }
            ],
            specialCourse: [],
            hotCourseList: [],
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
        this.render()
    },
    methods: {
        ...mapActions(['saveCourseInfo']),
        ...mapMutations(['GET_USERAGENT']),
        worryImg (index) {
            this.$set(this.hotCourseList[index], 'imgWorry', true)
        },
        async render () {
            let ztinfo = await getZTChannelInfoList({})
            this.specialStudy.forEach((item, index) => {
                item.Course_Name = wordLimit(ztinfo.ChannelInfoList[index].Channel_name, 24)
                item.typeId = ztinfo.ChannelInfoList[index].Channel_id
            })
            let newsCourse = await getCourseInfoList({
                channelName: '最新课程',
                Page: 1,
                PageCount: 6,
                index: 1,
                UserID: this.userInfo.UserId
            })
            newsCourse.CourseInfoList.forEach((item, index) => {
                item.Watcher = true
                item.Course_Name = wordLimit(item.Course_Name, 24)
                this.$set(this.specialCourse, index, item)
            })
            let hotCourse = await getCourseInfoList({
                channelName: '热门课程',
                page: 1,
                PageCount: 4,
                index: 1,
                UserID: this.userInfo.UserId
            })
            hotCourse.CourseInfoList.forEach(item => {
                item.imgWorry = false
            })
            this.hotCourseList = hotCourse.CourseInfoList
        },
        async addCourse(item) {
            let res = { result: '1' }
            if (item.IsSelect != '1') {
                res = await UpdateUserCourse({ UserID: this.userInfo.UserId, CourseNumber: item.Course_Number || item.CourseNumber })
            }
            if (res.result == 1) {
                this.playCourse(item)
            }
        },
        playCourse(item) {
            this.saveCourseInfo(item)
            this.toPlay(item.CourseType, item.Course_Number)
        },
    },
    components: {
        indexSearch,
        indexImgList,
        bottomBar
    }
}
</script>

<style lang="scss">
 @import "../style/mixin";
 .home{
    width: 100%;
    max-width: 10rem;
    max-height: 100vh;
    overflow: hidden;
    margin: 0 auto;
    background: #fff;
    position: relative;
    .homeinner{
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
    .h_bannerImgPart{
        width: 100%;
        height: toRem(360px);
        img{
            width: 100%;
            height: toRem(360px);
        }
    }
    .h_tableList{
        width: 100%;
        height: toRem(275px);
        ul{
            height: toRem(275px);
            padding: 0 toRem(31px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            li{
                text-align: center;
                a{
                    display: inline-block;
                }
                img{
                    width: toRem(104px);
                    height: toRem(104px);
                }
                p{
                    margin-top: toRem(25px);
                    font-size: 0.35rem;
                    text-align: center;
                    font-weight: 500;
                }
            }
        }
    }
    .h_courselist{
        width: 100%;
        box-sizing: border-box;
        &::after{
            content: '';
            display: block;
            width: 100%;
            height: toRem(168px);
        }
        .hcl_title{
            height: toRem(75px);
            padding: 0 toRem(29px);
            display: flex;
            justify-content: space-between;
            align-items: center;
            .hcl_title_left{
                font-size: 0.6rem;
                font-weight: bolder;
            }
            .hcl_title_right{
                a{
                    font-size: 0.35rem;
                    color: $brand-primary;
                }
            }
        }
        .hcl_content{
            width: toRem(726px);
            margin: toRem(15px) auto 0;
            ul{
                height: 13rem;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-around;
                li{
                    width: toRem(325px);
                    margin-bottom: toRem(60px);
                    a{
                        display: block-inline;
                    }
                    .hcl_imgbox{
                        img{
                            width: toRem(325px);
                            height: toRem(220px);
                            border-radius: toRem(15px);
                        }
                    }
                    .hcl_content_title{
                        height: toRem(70px);
                        font-size: 0.35rem;
                        font-weight: bold;
                        margin: toRem(20px) 0 toRem(5px);
                        @include ellipsis_two(2);
                    }
                    .hcl_content_infotype{
                        margin-bottom: toRem(15px);
                        display: flex;
                        justify-content: space-between;
                        color: #acacac;
                        .hcl_cit_time{
                            font-size: 0.35rem;
                        }
                        .hcl_cit_type{
                            font-size: 0.35rem;
                        }
                    }
                    .hcl_content_coursetype{
                        display: flex;
                        justify-content: space-between;
                        .hcl_cct_selecttype{
                            img{
                                width: toRem(60px);
                                height: toRem(36px);
                            }
                        }
                        .hcl_cct_watch{
                            img{
                                width: toRem(36px);
                                height: toRem(24px);
                            }
                            font-size: 0.35rem;
                            color: #acacac;
                        }
                    }
                }
            }
        }
    }
 }
</style>