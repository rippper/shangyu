<template>
    <div class="onlineExam container_top">
        <header-fix fixed>
            <i class="webapp webapp-back" @click.stop="toHome" slot="left"></i>
            <mb-tab slot="title" v-model="tabType">
                <mb-tab-item id="0">未参加</mb-tab-item>
                <mb-tab-item id="1">已完成</mb-tab-item>
            </mb-tab>
            <router-link slot="right" :to="{ path: '/examSearch', query: { linkType: 1 } }"><i class="webapp webapp-search"></i></router-link> 
        </header-fix>
        <div class="my_exam_container">
            <mt-tab-container v-model="tabType">
                <mt-tab-container-item id="0">
                    <section v-if="tabType === '0'" v-infinite-scroll="getMyUnFinishExam"
                    infinite-scroll-disabled="loading"
                    infinite-scroll-immediate-check="immediate"
                    infinite-scroll-distance="10">
                    <exam-list 
                        :exam-data="unFinishExamData"
                        :no-data-bg="unFinishNoDataBg"
                        :no-data="unFinishNoData"
                        @refreshExamList="refreshUnExamList"
                        :backLine="'1'">
                    </exam-list>
                    </section>
                </mt-tab-container-item>
                <mt-tab-container-item id="1">
                    <section v-if="tabType === '1'" v-infinite-scroll="getMyFinishExam"
                   infinite-scroll-disabled="loading"
                   infinite-scroll-immediate-check="immediate"
                   infinite-scroll-distance="10">
                    <exam-list 
                        :exam-data="finishExamData"
                        :no-data-bg="finishNoDataBg"
                        :no-data="finishNoData"
                        @refreshExamList="refreshExamList"
                        :backLine="'2'">
                    </exam-list>
                    </section>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { headerFix } from '../components';
import { GetExamListAPI2 } from '../service/getData';
import { Indicator, TabContainer, TabContainerItem } from 'mint-ui';
import { mapState } from 'vuex';

Vue.component(TabContainer.name, TabContainer)
Vue.component(TabContainerItem.name, TabContainerItem)

export default {
    name: 'onlineExam',
    data () {
        return {
            tabType: this.$route.query.type || '0',
            unFinishExamData: [],
            unFinishNoDataBg: false,
            unFinishNoData: false,
            unFinishPage: 0,
            finishExamData: [],
            finishNoDataBg: false,
            finishNoData: false,
            finishPage: 0,
            loading: false,
            
        }
    },
    mounted () {
        this.getMyUnFinishExam()
        this.getMyFinishExam()
    },
    methods: {
        refreshUnExamList () {
            this.unFinishPage = 0
            this.unFinishExamData = []
            this.getUnFinishExamList()
        },
        refreshExamList () {
            this.finishPage = 0
            this.finishExamData = []
            this.getMyFinishExam()
        },
        toHome () {
            this.$router.push({ path: '/home' })
        },
        async getMyUnFinishExam () {
            this.unFinishNoData = false
            this.unFinishNoDataBg = false
            this.loading = true
            Indicator.open()
            let data = await GetExamListAPI2({
                Page: this.unFinishPage, 
                UserID: this.userInfo.UserId, 
                finish: 0
            })
            Indicator.close()
            let list = []
            if (Array.isArray(data.ExamInfoList)) {
                list = data.ExamInfoList
            }
            if (list.length == 0 && this.unFinishPage > 0) {
                this.unFinishNoData = true
                return
            }
            if (list.length == 0 && this.unFinishPage == 0) {
                this.unFinishNoDataBg = true
                return
            }
            this.unFinishExamData = this.unFinishExamData.concat(list)
            this.loading = false
            this.unFinishPage += 1
        },
        async getMyFinishExam () {
            this.finishNoData = false
            this.finishNoDataBg = false
            this.loading = true
            Indicator.open()
            let data = await GetExamListAPI2({
                Page: this.finishPage, 
                UserID: this.userInfo.UserId, 
                finish: 1
            })
            Indicator.close()
            let list = []
            if (Array.isArray(data.ExamInfoList)) {
                list = data.ExamInfoList
            }

            if (list.length == 0 && this.finishPage > 0) {
                this.finishNoData = true
                return
            }
            if (list.length == 0 && this.finishPage == 0) {
                this.finishNoDataBg = true
                return
            }
            this.finishExamData = this.finishExamData.concat(list)
            this.loading = false
            this.finishPage += 1
        }
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

</style>