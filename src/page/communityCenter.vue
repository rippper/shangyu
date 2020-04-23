<template>
    <div class="communityCenter container_top">
        <header-fix title="通知公告" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <div class="cc_communitylist">
            <ul
                v-if="canShow"
                v-infinite-scroll="getMyNotices"
                infinite-scroll-disabled="loading"
                infinite-scroll-immediate-check="immediate"
                infinite-scroll-distance="10"
            >
                <!-- <li class="cc_listItem">
                    <router-link :to="{ path: '/newsDetails', query: { ref: specialArt[0] ? specialArt[0].articleContent : '' } }">
                        <p class="cc_cl_title">
                            <span class="cc_cl_studyprocess">学习流程</span><span v-text="specialArt[0] ? specialArt[0].Articletitle : ''"></span>
                        </p>
                        <div class="cc_cl_content">
                            <div>
                                作者：<span v-text="specialArt[0] ? specialArt[0].ArticleAuthor : ''"></span>
                            </div>
                            <div v-text="specialArt[0] ? specialArt[0].Articlecreatedate : ''"></div>
                        </div>
                    </router-link>
                </li>
                <li class="cc_listItem">
                    <router-link :to="{ path: '/newsDetails', query: { ref: specialArt[1] ? specialArt[1].articleContent : '' } }">
                        <p class="cc_cl_title">
                            <span class="cc_cl_managerule">管理规定</span><span v-text="specialArt[1] ? specialArt[1].Articletitle : ''"></span>
                        </p>
                        <div class="cc_cl_content">
                            <div>
                                作者：<span v-text="specialArt[1] ? specialArt[1].ArticleAuthor : ''"></span>
                            </div>
                            <div v-text="specialArt[1] ? specialArt[1].Articlecreatedate : ''"></div>
                        </div>
                    </router-link>
                </li> -->
                <li class="cc_listItem" v-for="(item, index) in noticesList" :key="index">
                    <router-link :to="{ path: '/newsDetails', query: { ref: item.NoticeContent } }">
                        <p class="cc_cl_title"><span class="cc_cl_notice">通知公告</span><span v-text="item.Noticetitle"></span></p>
                        <div class="cc_cl_content">
                            <div>
                                作者：<span v-text="item.NoticeAuthor"></span>
                            </div>
                            <div v-text="item.Noticecreatedate.substr(0,10)"></div>
                        </div>
                    </router-link>
                </li>
                <li class="cc_nomore" v-show="showAll">
                    没有更多东西了...
                </li>
            </ul>
            <skeleArtItem v-for="i in 10" :key="i" v-else></skeleArtItem>
        </div>
        <!-- <div class="cc_connectus">
            <router-link :to="{ path: '/newsDetails', query: { ref: specialArt[2] ? specialArt[2].articleContent : '' } }">
                <div>
                    <img src="../assets/bianji.png" alt>
                </div>
                <p>联系我们</p>
            </router-link>
        </div> -->
    </div>
</template>

<script>
import { headerFix, skeleArtItem } from '../components'
import { goBack } from '../service/mixins'
import { getNoticeInfoList, getArticleTopList } from '../service/getData'
export default {
    mixins: [goBack],
    name: 'communityCenter',
    data () {
        return {
            noticesList: [],
            totalCount: 0,
            Page: 1,
            PageCount: 10,
            specialArt: [],
            showAll: false,
            canShow: false
        }
    },
    mounted () {
        this.render()
    },
    methods: {
        async render () {
            let data = await getNoticeInfoList({
                Page: this.Page,
                PageCount: this.PageCount
            })
            let topArt = await getArticleTopList({})
            this.totalCount = data.totalCount
            this.specialArt = topArt.articleInfoList
            console.log(topArt)
            this.noticesList = data.NoticeInfoList
            if (this.noticesList.length == this.totalCount) {
                this.showAll = true
            }
            this.canShow = true
        },
        async getMyNotices () {
            if (this.noticesList.length < this.totalCount) {
                this.Page = ++this.Page
                let data = await getNoticeInfoList({
                    Page: this.Page,
                    PageCount: this.PageCount
                })
                this.noticesList = [...this.noticesList, ...data.NoticeInfoList]
            } else {
                this.showAll = true
            }
        }
    },
    components: {
        headerFix,
        skeleArtItem
    }
}
</script>

<style lang="scss">
@import "../style/mixin";
.communityCenter{
    max-width: 10rem;
    margin: 0 auto;
    background: #fff;
    position: relative;
    .cc_communitylist{
        ul{
            .cc_listItem{
                width: toRem(690px);
                height: toRem(200px);
                padding-top: toRem(16px);
                margin: 0 auto;
                border-bottom: 1px solid #e6e6e6;
                .cc_cl_title{
                    height: toRem(90px);
                    line-height: toRem(45px);
                    font-size: 0.45rem;
                    font-weight: bold;
                    @include ellipsis_two(2);
                }
                .cc_cl_content{
                    margin-top: toRem(32px);
                    display: flex;
                    justify-content: space-between;
                    color: #999;
                }
                .cc_cl_studyprocess, .cc_cl_managerule, .cc_cl_notice{
                    width: toRem(130px);
                    height: toRem(45px);
                    margin-right: toRem(21px);
                    line-height: toRem(45px);
                    text-align: center;
                    border-radius: toRem(3px);
                    display: inline-block;
                    color: #fff;
                    font-size: 0.3rem;
                }
                .cc_cl_studyprocess{
                    background: linear-gradient(to right, #ebd588, #f4ae04);
                }
                .cc_cl_managerule{
                    background: linear-gradient(to right, #5cb1f9, #1781ed);
                }
                .cc_cl_notice{
                    background: linear-gradient(to right, #ff7108, #b40511);
                }
            }
            .cc_nomore{
                width: toRem(690px);
                height: toRem(60px);
                line-height: toRem(60px);
                color: #a0a0a0;
                margin: 0 auto;
                text-align: center;
            }
        }
    }
    .cc_connectus{
        width: toRem(117px);
        height: toRem(117px);
        padding-top: toRem(15px);
        border-radius: toRem(117px);
        text-align: center;
        position: fixed;
        right: toRem(21px);
        bottom: toRem(311px);
        background: linear-gradient(to right, #ff7108, #b40511);
        img{
            width: toRem(31px);
            height: toRem(31px);
        }
        p{
            color: #fff;
            font-size: 0.35rem;
        }
    }
}
</style>