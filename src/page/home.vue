<template>
    <div class="home">
        <indexSearch></indexSearch>
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
                    <router-link to="/onlineExam">
                        <div>
                            <div>
                                <img src="../assets/sy_exam.png" alt>
                                <p>在线考试</p>
                            </div>
                        </div>
                    </router-link>
                </li>
                <li>
                    <router-link to="/specialTask">
                        <div>
                            <div>
                                <img src="../assets/sy_training.png" alt>
                                <p>专题培训</p>
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
                                <img :src="item.Course_img ? item.Course_img : require('../assets/sy_nopic.png')" alt>
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
        <bottomBar selected="1"></bottomBar>
    </div>
</template>

<script>
import { indexSearch, indexImgList, bottomBar } from '../components'
import { getZTChannelInfoList, getCourseInfoList, UpdateUserCourse } from '../service/getData'
import { mapState, mapActions } from 'vuex'
import { toPlay } from '../service/mixins'

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
            hotCourseList: []
        }
    },
    created () {
        this.render()
    },
    methods: {
        ...mapActions(['saveCourseInfo']),
        async render () {
            let ztinfo = await getZTChannelInfoList({})
            this.specialStudy.forEach((item, index) => {
                item.Course_Name = ztinfo.ChannelInfoList[index].Channel_name
                item.typeId = ztinfo.ChannelInfoList[index].Channel_id
            })
            let newsCourse = await getCourseInfoList({
                channelName: '最新课程',
                Page: 1,
                PageCount: 6,
                UserID: this.userInfo.UserId
            })
            newsCourse.CourseInfoList.forEach((item, index) => {
                item.Watcher = true
                this.$set(this.specialCourse, index, item)
            })
            this.$refs.news_course.culWidth()
            let hotCourse = await getCourseInfoList({
                channelName: '热门课程',
                page: 1,
                PageCount: 4,
                UserID: this.userInfo.UserId
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
            console.log(item)
            this.toPlay(item.CourseType, item.Course_Number)
        },
    },
    computed: {
        ...mapState(['userInfo'])
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
    padding-bottom: toRem(98px);
    margin: 0 auto;
    background: #fff;
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
                        height: toRem(81px);
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