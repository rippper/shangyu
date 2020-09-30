<template>
    <div class="historyyearscore" :style="'height:' + height + 'px'">
        <header-fix :title="printYear + '历年学时查询'" fixed>
            <i class="webapp webapp-back" @click.stop="linkTo" slot="left"></i>
            <p slot="right" @click.stop="toggleNav">选择年份</p>
        </header-fix>
        <div class="hys_inner">
            <nav-slide :show="showSlide" @showChange="showChange">
                <div class="category" slot="left">
                    <ul>
                        <li v-for="(item, index) in timeList" :key="index" v-text="item" @click="chooseYear(item)"></li>
                    </ul>
                </div>
                <div class="hys_content" slot="right">
                    <div>
                        <mt-cell title="用户名" :value="userInfo.Username"></mt-cell>
                    </div>
                    <div class="hys_content_info">
                        <mt-cell title="课程学时" :value="userInfor.CourseCredit"></mt-cell>
                        <mt-cell title="考试学时" :value="userInfor.ExamCredit"></mt-cell>
                        <mt-cell title="总学时" :value="userInfor.TotalCredit"></mt-cell>
                        <mt-cell title="考核结果" :value="userInfor.PassFlag == 0 ? '未通过' : '通过'"></mt-cell>
                    </div>
                </div>
            </nav-slide>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import { Cell } from 'mint-ui'
import { mapState } from 'vuex'
import { getUserScoreByYear } from '../service/getData'
import { userAgent } from '../plugins/utils'

Vue.component(Cell.name, Cell)

export default {
    name: 'historyyearscore',
    data () {
        return {
            timeList: [],
            showSlide: false,
            year: '',
            printYear: '',
            userInfor: '',
            height: ''
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    mounted () {
        let platfrom = userAgent()
        if (platfrom.android) {
            this.height = window.innerHeight
        } else if (platfrom.ios) {
            this.height = window.innerHeight - 46
        }
        this.getDate()
        this.userInfor = this.userInfo
    },
    methods: {
        linkTo () {
            this.$router.push({ path: '/personalCenter' })
        },
        showChange(val) {
            this.showSlide = val
        },
        toggleNav() {
            this.showSlide = !this.showSlide
        },
        getDate () {
            let nowYear = new Date().getFullYear()
            let yearLength = nowYear - 2015
            for (let i = 1; i <= yearLength; i++) {
                this.timeList.push(2014 + i)
            }
        },
        chooseYear (Year) {
            this.printYear = Year + '年'
            this.year = Year
            this.render()
            this.toggleNav()
        },
        async render () {
            let msg = await getUserScoreByYear({
                UserID: this.userInfo.UserId,
                Year: this.year
            })
            this.userInfor = msg
        }
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.historyyearscore{
    width: 100vw;
    .category{
        ul{
            li{
                height: toRem(100px);
                line-height: toRem(100px);
                text-align: center;
                font-size: 0.4rem;
            }
        }    
    }
    .hys_inner{
        width: 100%;
        height: 100%;
        padding-top: toRem(92px);
        overflow-y: auto;
    }
}
.hys_content_info{
    margin-top: toRem(20px);

}
</style>