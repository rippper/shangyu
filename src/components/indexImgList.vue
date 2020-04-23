<template>
    <div class="indexImgList">
        <div class="iil_title">
            <div class="iil_titlelabel" v-text="title"></div>
            <div class="iil_titlelinkout">
                <router-link :to="linkPath">查看更多</router-link>
            </div>
        </div>
        <div class="iil_list">
            <div class="iil_list_inner">
                <ul ref="illList">
                    <li v-for="(item, index) in specialStudy" :key="index" @click="linkTo(item)">
                        <div>
                            <img :src="item.Course_img ? item.Course_img : require('../assets/sy_nopic.png') " alt>
                        </div>
                        <p class="ill_title" v-text="item.Course_Name"></p>
                        <p class="ill_watcherperson" v-if="item.Watcher">浏览量: <span v-text="item.ClickCount"></span></p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { UpdateUserCourse } from '../service/getData'
import { mapActions, mapState } from 'vuex'
import { toPlay } from '../service/mixins'

export default {
    mixins: [toPlay],
    name: 'indexImgList',
    props: {
        title: String,
        specialStudy: Array,
        linkPath: Object
    },
    mounted () {
        this.culWidth()
    },
    methods: {
        ...mapActions(['saveCourseInfo']),
        culWidth () {
            this.$refs.illList.style.width = (this.specialStudy.length * 320 + (this.specialStudy.length - 1) * 20 + 58) / 75 + 'rem'
        },
        linkTo (item) {
            if (item.Watcher) {
                this.addCourse(item)
            } else {
                this.$router.push({ path: '/courseCenter', query: { title: item.Course_Name } })
            }
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
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
}
</script>

<style lang="scss">
@import "../style/mixin";
.indexImgList{
    width: 100%;
    .iil_title{
        height: toRem(75px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        .iil_titlelabel{
            padding-left: toRem(31px);
            font-size: 0.6rem;
            font-weight: bolder;
        }
        .iil_titlelinkout{
            padding-right: toRem(31px);
            a{
                font-size: 0.35rem;
                color: $brand-primary;
            }
        }
    }
    .iil_list{
        width: 100%;
        height: toRem(365px);
        overflow: hidden;
    }
    .iil_list_inner{
        width: 100%;
        height: toRem(390px);
        overflow: auto;
        ul{
            padding: toRem(15px) toRem(29px) 0;
            display: flex;
            justify-content: space-between;
            li{
                img{
                    width: toRem(320px);
                    height: toRem(212px);
                    border-radius: toRem(15px);
                }
                .ill_title{
                    width: toRem(320px);
                    height: toRem(80px);
                    line-height: toRem(80px);
                    font-weight: bolder;
                    font-size: 0.45rem;
                    @include ellipsis_two(1);
                }
                .ill_watcherperson{
                    font-size: 0.35rem;
                    color: #ababab;
                }
            }
        }
    }
}
</style>