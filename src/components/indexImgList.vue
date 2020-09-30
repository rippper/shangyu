<template>
    <div class="indexImgList">
        <div class="iil_title">
            <div class="iil_titlelabel" v-text="title"></div>
            <div class="iil_titlelinkout">
                <router-link :to="linkPath">查看更多</router-link>
            </div>
        </div>
        <div class="iil_list">
            <mt-swipe :auto="3000">
                <mt-swipe-item v-for="(item, index) in specialStudy" :key="index">
                    <div class="iil_l_inner">
                        <div class="ill_l_inner_imgbox">
                            <img :src="item.Course_img ? item.Course_img : require('../assets/sy_nopic.png') " alt @click="linkTo(item)">
                        </div>
                        <p v-text="item.Course_Name"></p>
                    </div>
                </mt-swipe-item>
            </mt-swipe>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import { UpdateUserCourse } from '../service/getData'
import { mapActions, mapState } from 'vuex'
import { toPlay } from '../service/mixins'
import { Swipe, SwipeItem } from 'mint-ui'

Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

export default {
    mixins: [toPlay],
    name: 'indexImgList',
    props: {
        title: String,
        specialStudy: Array,
        linkPath: Object
    },
    methods: {
        ...mapActions(['saveCourseInfo']),
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
        width: toRem(690px);
        height: toRem(460px);
        margin: 0 auto;
        overflow: hidden;
        .mint-swipe{
            height: toRem(460px);
            .mint-swipe-item{
                .iil_l_inner{
                    width: toRem(690px);
                    height: toRem(460px);
                    position: relative;
                }
                .ill_l_inner_imgbox{
                    width: 100%;
                    height:toRem(380px);
                }
                img{
                    width: 100%;
                    height:toRem(380px);
                    border-radius: toRem(15px);
                }
                p{
                    height: toRem(80px);
                    line-height: toRem(80px);
                    font-size: 0.4rem;
                    font-weight: bold;
                }
            }
            .mint-swipe-indicators{
                // position: relative;
                bottom: toRem(90px);
            }
        }
    }
}
</style>