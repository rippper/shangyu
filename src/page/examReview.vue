<template>
  <div class="exam" :style="'height:' + height + 'px'">
    <!--头部-->
    <header-fix :title="examTitle" fixed>
      <i class="webapp webapp-back" @click.stop="goExamResult" slot="left"></i>
    </header-fix>
    <div class="exam_inner">
      <div class="exam_content" v-for="(list,index) in exam" :key="index">
        <transition :name="transitionName">
          <div v-if="itemNum == index + 1">
            <p class="exam_name">
              <span class="red" v-if="list.ThemeType==0">【判断题】</span>
              <span class="red" v-else-if="list.ThemeType==1">【单选题】</span>
              <span class="red" v-else-if="list.ThemeType==2">【多选题】</span>
              <span class="red" v-else-if="list.ThemeType==4">【简答题】</span>
              <span class="red" v-else>【其它】</span>
              <span class="topic_name">{{index + 1 + '.' + list.ThemeTitle}}</span>
              <span class="red">({{Math.round(Number(list.ThemeScore))}}分)</span>
              <br/>
              <span>正确答案： {{list.THEME_SOLUTION}}</span>
              <br>
              <span>您的答案： {{list.Answer=='N'?'':list.Answer}}</span>
            </p>
            <div class="exam_list">
              <div v-if="list.ThemeType == 0">
                <mb-radio :options="judgeItem" v-model="list.THEME_SOLUTION" :is-disabled="true"></mb-radio>
              </div>
              <div v-else-if="list.ThemeType == 1">
                <mb-radio :options="list.ItemString" v-model="list.THEME_SOLUTION" :is-disabled="true"></mb-radio>
              </div>
              <div v-else-if="list.ThemeType == 2">
                <mb-checklist :options="list.ItemString" v-model="list.THEME_SOLUTION" :is-disabled="true"></mb-checklist>
              </div>
              <div v-else-if="list.ThemeType == 4">
                <textarea class="answerInput"
                          v-model="list.THEME_SOLUTION"
                          rows="15"
                          readonly
                          placeholder="在此处出入答案内容">
                </textarea>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </div>
    <div class="exam_footer">
      <mt-button v-if="itemNum>1" class="prev" type="primary" plain @click.native='preItem'>上一题</mt-button>
      <div v-else style="width: 2rem;margin-left: 0.4rem">&nbsp;</div>
      <span class="er_itemNum"><span>试题</span> （{{itemNum}}/{{allItem}}）</span>
      <mt-button v-if="itemNum<allItem" type="primary" class="next" @click.native="nextItem">下一题</mt-button>
      <mt-button v-else type="primary" class="next" @click.native="goExamResult">返回</mt-button>
    </div>
  </div>
</template>
<script>
  import {Button, Popup} from 'mint-ui';
  import Vue from 'vue';
  import {mapState} from 'vuex';
  import {GetExamWrongTheme} from '../service/getData';

  Vue.component(Button.name, Button);
  Vue.component(Popup.name, Popup);
  export default {
    data() {
      return {
        exam: [],
        examTitle: '',//标题
        examId: '',
        examPaperId: '',
        reward: '',
        itemData: null, //当前显示题目data
        transitionName: 'slide-left',
        judgeItem: [
          {
            ThemeItemFlag: 'A',
            ThemeItemTitle: '正确'
          },
          {
            ThemeItemFlag: 'B',
            ThemeItemTitle: '错误'
          }
        ], //单选item
        itemNum: 1,//第几题
        allItem: 0,
        startDate: '',//考试开始时间
        height: ''
      };
    },
    created() {
      this.examId = this.$route.query.examId;
      this.examPaperId = this.$route.query.examPaperId;
    },
    mounted() {
      if (this.userAgent.android) {
        this.height = window.innerHeight
      } else if (this.userAgent.ios && this.appType == 'app') {
          this.height = window.innerHeight - 46
      } else if (this.userAgent.ios && this.appType != 'app') {
          this.height = window.innerHeight
      }
      this.getExamWrongTheme();
    },
    props: [],
    computed: {
      ...mapState(['userInfo', 'userAgent', 'appType'])
    },
    methods: {
      agreeToExam() {
        this.startDate = new Date();
        this.countDown();
      },
      disagree() {
        this.$router.go(-1);
      },
      async getExamWrongTheme() {
        let data = await GetExamWrongTheme({examPaperId: this.examPaperId});
        this.exam = [];
        if (Array.isArray(data.ThemeString)) {
          this.exam = data.ThemeString;
        }
        this.examTitle = data.ExamTitle;
        this.allItem = data.totalCount;
        this.itemData = data.ThemeString[0];
      },
      //点击下一题
      nextItem() {
        this.transitionName = 'slide-left';
        this.$nextTick(() => {
          this.itemNum++;
        });
      },
      //点击上一题
      preItem() {
        if (this.itemNum > 1) {
          this.transitionName = 'slide-right';
          // 需要先更新transitionName, 否则在第一次切换时会出现仍然是slide-left
          this.$nextTick(() => {
            this.itemNum--;
          });
        } else {
          this.itemNum = 1;
        }
      },
      // 返回结果页
      goExamResult() {
        this.$router.push({path: '/examResult', query: {examId: this.examId, examPaperId: this.examPaperId}});
      }
    },
    beforeDestroy() {
    },
    watch: {
      itemNum: function(val) {
        this.itemData = this.exam[val - 1];
      }
    }
  };
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../style/mixin';

  .exam {
    background: url(../assets/exam-bg.png) no-repeat center;
    background-size: 100% 99vh;
    font-size: 15px;
    overflow: hidden;
    position: relative;
    .exam_inner{
      width: 100%;
      height: 100%;
      padding: toRem(92px) 0 toRem(110px);
      overflow-y: auto;
      position: relative;
    }
    .exam_header {
      padding: 0 toRem(30px);
      border-bottom: 1px solid $border-color-base;
      text-align: center;
      line-height: toRem(62px);

      img {
        width: toRem(29px);
      }
    }

    .exam_content {
      position: absolute;
      left: 0;
      right: 0;
      padding: 0 toRem(40px) toRem(105px) toRem(40px);

      .exam_name {
        padding: toRem(30px) 0 toRem(100px) 0;

        .red {
          color: $brand-primary;
        }
      }

      .topic_name {
        line-height: toRem(50px);
      }

      .exam_list {
        .answerInput {
          width: 100%;
          padding: toRem(10px);
          resize: none;
          border: 1px solid $border-color-base;
          @include borderRadius(10px);
          font-size: 14px;
        }
      }
    }

    .exam_footer {
      height: toRem(110px);
      position: absolute;
      width: 100%;
      bottom: 0;
      text-align: center;
      left: 0;
      display: flex;
      align-items: center;
      background: rgba(255,255,255,0.8);
      /*line-height: 73px;*/
      @include flex();

      .mint-button {
        @include wh(150px, 73px);
        padding: 0;
      }

      .prev {
        margin-left: toRem(30px);
      }

      .er_itemNum {
        line-height: toRem(73px);

        span {
          color: $color-text-secondary;
          font-size: 14px;
        }
      }

      .next {
        margin-right: toRem(30px);
      }
    }
  }
</style>
