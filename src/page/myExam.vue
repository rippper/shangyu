<template>
    <div class="myexam" :style="'height:' + height + 'px'">
        <headerFix title="已完成的考试" fixed>
            <i class="webapp webapp-back" @click.stop="turnBack" slot="left"></i>
            <router-link slot="right" :to="{ path: '/examSearch', query: { linkType: 3, examType: 1 } }"><i class="webapp webapp-search"></i></router-link>
        </headerFix>
        <div class="em_examlist">
            <ul
                v-infinite-scroll="getMyFinishExam"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-distance="10"
            >
                <li class="em_el_listItem" v-for="(item, index) in examList" :key="index">
                    <div class="em_el_examicon">
                        <img src="../assets/sy_myexamicon.png" alt>
                    </div>
                    <div class="em_el_examinfo">
                        <p class="em_el_ei_title" v-text="item.ExamTitle"></p>
                        <p class="em_el_ei_content">学时: <span v-text="item.Credit_hour"></span></p>
                        <p class="em_el_ei_content">结束时间: <span v-text="item.START_DATE.substr(0,10) + ' -- ' + item.END_DATE.substr(0,10)"></span></p>
                    </div>
                </li>
                <li class="em_el_endMessage" v-if="showAll">没有更多东西了...</li>
            </ul>
        </div>
    </div>
</template>

<script>
import { headerFix } from '../components';
import { GetExamList } from '../service/getData';
import { mapState } from 'vuex';

export default {
    name: 'myexam',
    data () {
        return {
            examList: [],
            Page: 1,
            PageCount: 10,
            totalCount: 0,
            showAll: false,
            loading: false,
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
        turnBack () {
            this.$router.push({ path: '/personalCenter' })
        },
        getMyFinishExam () {
            if (this.examList.length < this.totalCount) {
                this.Page = ++this.Page
                this.render()
            }
        },
        async render () {
            this.loading = true
            let data = await GetExamList({
                UserID: this.userInfo.UserId,
                Page: this.Page,
                PageCount: this.PageCount,
                finish: 1
            })
            this.totalCount = data.totalCount
            this.examList = [...this.examList, ...data.ExamInfoList]
            this.loading = false
            if (this.examList.length == this.totalCount) {
                this.showAll = true
            }
        }
    },
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
    .myexam{
        max-width: 10rem;
        margin: 0 auto;
        background: #fff;
        .em_examlist{
            width: 100%;
            height: 100%;
            overflow-y: auto;
            ul{
                width: 100%;
                padding-top: toRem(98px);
                .em_el_listItem{
                    width: toRem(690px);
                    height: toRem(204px);
                    padding: toRem(30px) 0 0;
                    margin: 0 auto;
                    display: flex;
                    .em_el_examicon{
                        padding-right: toRem(22px);
                        img{
                            width: toRem(27px);
                            height: toRem(32px);
                            position: relative;
                            top: toRem(3px);
                        }
                    }
                    .em_el_examinfo{
                        border-bottom: 1px solid #e6e6e6;
                        .em_el_ei_title{
                            height: toRem(82px);
                            font-size: 0.4rem;
                            font-weight: bold;
                            @include ellipsis_two;
                        }
                        .em_el_ei_content{
                            font-size: 0.35rem;
                            color: #a0a0a0;
                        }
                    }
                }
                .em_el_endMessage{
                    width: toRem(690px);
                    height: toRem(60px);
                    line-height: toRem(60px);
                    color: #a0a0a0;
                    margin: 0 auto;
                    text-align: center;
                }
            }
        }
    }
</style>