"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _App = _interopRequireDefault(require("../App.vue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*路由*/
var Home = function Home(r) {
  return require.ensure([], function () {
    return r(require('../page/home.vue'));
  }, 'home');
};

var Login = function Login(r) {
  return require.ensure([], function () {
    return r(require('../page/login.vue'));
  }, 'login');
};

var Error = function Error(r) {
  return require.ensure([], function () {
    return r(require('../page/error.vue'));
  }, 'error');
};

var CourseCenter = function CourseCenter(r) {
  return require.ensure([], function () {
    return r(require('../page/courseCenter.vue'));
  }, 'courseCenter');
};

var CourseSearch = function CourseSearch(r) {
  return require.ensure([], function () {
    return r(require('../page/courseSearch.vue'));
  }, 'courseSearch');
};

var ExamCenter = function ExamCenter(r) {
  return require.ensure([], function () {
    return r(require('../page/examCenter.vue'));
  }, 'examCenter');
};

var Exam = function Exam(r) {
  return require.ensure([], function () {
    return r(require('../page/exam.vue'));
  }, 'exam');
};

var ExamResult = function ExamResult(r) {
  return require.ensure([], function () {
    return r(require('../page/examResult.vue'));
  }, 'examResult');
};

var ExamSearch = function ExamSearch(r) {
  return require.ensure([], function () {
    return r(require('../page/examSearch.vue'));
  }, 'examSearch');
};

var PersonalCenter = function PersonalCenter(r) {
  return require.ensure([], function () {
    return r(require('../page/personalCenter.vue'));
  }, 'personalCenter');
};

var Message = function Message(r) {
  return require.ensure([], function () {
    return r(require('../page/message.vue'));
  }, 'message');
};

var MessageDetail = function MessageDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/messageDetail.vue'));
  }, 'messageDetail');
};

var History = function History(r) {
  return require.ensure([], function () {
    return r(require('../page/history.vue'));
  }, 'history');
};

var MyCourse = function MyCourse(r) {
  return require.ensure([], function () {
    return r(require('../page/myCourse.vue'));
  }, 'myCourse');
};

var MyExam = function MyExam(r) {
  return require.ensure([], function () {
    return r(require('../page/myExam'));
  }, 'myExam');
};

var NewsCenter = function NewsCenter(r) {
  return require.ensure([], function () {
    return r(require('../page/newsCenter.vue'));
  }, 'newsCenter');
};

var NewsSearch = function NewsSearch(r) {
  return require.ensure([], function () {
    return r(require('../page/newsSearch.vue'));
  }, 'newsSearch');
};

var NewsDetails = function NewsDetails(r) {
  return require.ensure([], function () {
    return r(require('../page/newsDetails.vue'));
  }, 'newsDetails');
};

var RankList = function RankList(r) {
  return require.ensure([], function () {
    return r(require('../page/rankList.vue'));
  }, 'rankList');
};

var ClassGarden = function ClassGarden(r) {
  return require.ensure([], function () {
    return r(require('../page/classGarden.vue'));
  }, 'classGarden');
};

var ClassSearch = function ClassSearch(r) {
  return require.ensure([], function () {
    return r(require('../page/classSearch.vue'));
  }, 'classSearch');
};

var ClassDetail = function ClassDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/classDetail.vue'));
  }, 'classDetail');
};

var SignDetail = function SignDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/signDetail.vue'));
  }, 'signDetail');
};

var Ebook = function Ebook(r) {
  return require.ensure([], function () {
    return r(require('../page/ebook.vue'));
  }, 'ebook');
};

var EbookSearch = function EbookSearch(r) {
  return require.ensure([], function () {
    return r(require('../page/ebookSearch.vue'));
  }, 'ebookSearch');
};

var EbookChapterList = function EbookChapterList(r) {
  return require.ensure([], function () {
    return r(require('../page/ebookChapterList.vue'));
  }, 'ebookChapterList');
};

var EbookDetail = function EbookDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/ebookDetail.vue'));
  }, 'ebookDetail');
};

var MyCredit = function MyCredit(r) {
  return require.ensure([], function () {
    return r(require('../page/myCredit.vue'));
  }, 'myCredit');
};

var Advise = function Advise(r) {
  return require.ensure([], function () {
    return r(require('../page/advise.vue'));
  }, 'advise');
};

var Setting = function Setting(r) {
  return require.ensure([], function () {
    return r(require('../page/setting.vue'));
  }, 'setting');
};

var UserInfoEdit = function UserInfoEdit(r) {
  return require.ensure([], function () {
    return r(require('../page/userInfoEdit.vue'));
  }, 'userInfoEdit');
};

var ChangeMobile = function ChangeMobile(r) {
  return require.ensure([], function () {
    return r(require('../page/changeMobile.vue'));
  }, 'changeMobile');
};

var ChangePwd = function ChangePwd(r) {
  return require.ensure([], function () {
    return r(require('../page/changePwd.vue'));
  }, 'changePwd');
};

var Register = function Register(r) {
  return require.ensure([], function () {
    return r(require('../page/register.vue'));
  }, 'register');
};

var Communication = function Communication(r) {
  return require.ensure([], function () {
    return r(require('../page/communication.vue'));
  }, 'communication');
};

var AddCommunication = function AddCommunication(r) {
  return require.ensure([], function () {
    return r(require('../page/addCommunication.vue'));
  }, 'addCommunication');
};

var PlayMp4 = function PlayMp4(r) {
  return require.ensure([], function () {
    return r(require('../page/playMp4.vue'));
  }, 'playMp4');
};

var PlayJYAicc = function PlayJYAicc(r) {
  return require.ensure([], function () {
    return r(require('../page/playJYAicc.vue'));
  }, 'playJYAicc');
};

var PlayH5 = function PlayH5(r) {
  return require.ensure([], function () {
    return r(require('../page/playH5.vue'));
  }, 'playH5');
};

var Notice = function Notice(r) {
  return require.ensure([], function () {
    return r(require('../page/notice.vue'));
  }, 'notice');
};

var Notification = function Notification(r) {
  return require.ensure([], function () {
    return r(require('../page/notification.vue'));
  }, 'notification');
};

var OpenApp = function OpenApp(r) {
  return require.ensure([], function () {
    return r(require('../page/openApp.vue'));
  }, 'openApp');
};

var OnlineExam = function OnlineExam(r) {
  return require.ensure([], function () {
    return r(require('../page/onlineExam.vue'));
  }, 'onlineExam');
};

var MyFinishCourse = function MyFinishCourse(r) {
  return require.ensure([], function () {
    return r(require('../page/myFinishCourse.vue'));
  }, 'myFinishCourse');
};

var MyCollect = function MyCollect(r) {
  return require.ensure([], function () {
    return r(require('../page/myCollect.vue'));
  }, 'myCollect');
};

var HistoryYearScore = function HistoryYearScore(r) {
  return require.ensure([], function () {
    return r(require('../page/historyYearScore.vue'));
  }, 'historyYearScore');
};

var LearningPortfolio = function LearningPortfolio(r) {
  return require.ensure([], function () {
    return r(require('../page/learningPortfolio.vue'));
  }, 'learningPortfolio');
};

var ExamHistory = function ExamHistory(r) {
  return require.ensure([], function () {
    return r(require('../page/examHistory.vue'));
  }, 'examHistory');
};

var ResultShow = function ResultShow(r) {
  return require.ensure([], function () {
    return r(require('../page/resultShow.vue'));
  }, 'resultShow');
};

var ResultShowDetail = function ResultShowDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/resultShowDetail.vue'));
  }, 'resultShowDetail');
};

var ResultShowSearch = function ResultShowSearch(r) {
  return require.ensure([], function () {
    return r(require('../page/resultShowSearch.vue'));
  }, 'resultShowSearch');
};

var NotesDetail = function NotesDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/notesDetail.vue'));
  }, 'notesDetail');
};

var NoticeDetail = function NoticeDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/noticeDetail.vue'));
  }, 'noticeDetail');
};

var TrainDetail = function TrainDetail(r) {
  return require.ensure([], function () {
    return r(require('../page/trainDetail.vue'));
  }, 'trainDetail');
};

var RaceHistory = function RaceHistory(r) {
  return require.ensure([], function () {
    return r(require('../page/raceHistory.vue'));
  }, 'raceHistory');
};

var ExamReview = function ExamReview(r) {
  return require.ensure([], function () {
    return r(require('../page/examReview.vue'));
  }, 'examReview');
};

var UploadProgress = function UploadProgress(r) {
  return require.ensure([], function () {
    return r(require('../page/uploadProgress.vue'));
  }, 'uploadProgress');
};

var PdfReader = function PdfReader(r) {
  return require.ensure([], function () {
    return r(require('../page/pdfReader.vue'));
  }, 'pdfReader');
};

var PdfList = function PdfList(r) {
  return require.ensure([], function () {
    return r(require('../page/pdfList.vue'));
  }, 'pdfList');
};

var UserRaceRank = function UserRaceRank(r) {
  return require.ensure([], function () {
    return r(require('../page/userRaceRank.vue'));
  }, 'userRaceRank');
};

var ExamGuide = function ExamGuide(r) {
  return require.ensure([], function () {
    return r(require('../page/examGuide.vue'));
  }, 'examGuide');
};

var SpecialTask = function SpecialTask(r) {
  return require.ensure([], function () {
    return r(require('../page/specialTask.vue'));
  }, 'specialTask');
};

var CommunityCenter = function CommunityCenter(r) {
  return require.ensure([], function () {
    return r(require('../page/communityCenter.vue'));
  }, 'communityCenter');
};

var CostomTraining = function CostomTraining(r) {
  return require.ensure([], function () {
    return r(require('../page/costomTraining.vue'));
  }, 'costomTraining');
};

var routes = [{
  path: '/',
  component: _App["default"],
  children: [{
    path: '',
    redirect: '/login',
    meta: {
      title: '登录'
    }
  }, //登陆
  {
    name: 'home',
    path: '/home',
    component: Home,
    meta: {
      title: '首页'
    }
  }, // 首页
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      title: '登录'
    }
  }, {
    name: 'onlineExam',
    path: '/onlineExam',
    component: OnlineExam,
    meta: {
      title: '在线考试'
    }
  }, {
    name: 'myFinishCourse',
    path: '/myFinishCourse',
    component: MyFinishCourse,
    meta: {
      title: '已完成的课程'
    }
  }, //课程中心
  {
    name: 'courseCenter',
    path: '/courseCenter',
    component: CourseCenter,
    meta: {
      title: '课程中心'
    }
  }, //课程搜索
  {
    name: 'courseSearch',
    path: '/courseSearch',
    component: CourseSearch,
    meta: {
      title: '课程搜索'
    }
  }, //在线测试
  {
    name: 'examCenter',
    path: '/examCenter',
    component: ExamCenter,
    meta: {
      title: '未完成的考试'
    }
  }, //考试
  {
    name: 'exam',
    path: '/exam',
    component: Exam,
    meta: {
      title: '知识测试'
    }
  }, //考试结果
  {
    name: 'examResult',
    path: '/examResult',
    component: ExamResult,
    meta: {
      title: '测试结果'
    }
  }, //搜索考试
  {
    name: 'examSearch',
    path: '/examSearch',
    component: ExamSearch,
    meta: {
      title: '搜索考试'
    }
  }, //个人中心
  {
    name: 'personalCenter',
    path: '/personalCenter',
    component: PersonalCenter,
    meta: {
      title: '个人中心'
    }
  }, // 历年学时数据查询
  {
    name: 'historyYearScore',
    path: '/HistoryYearScore',
    component: HistoryYearScore,
    meta: {
      title: '学时记录'
    }
  }, //消息中心
  {
    name: 'message',
    path: '/message',
    component: Message,
    meta: {
      title: '消息中心'
    }
  }, //通知内容
  {
    name: 'messageDetail',
    path: '/messageDetail',
    component: MessageDetail,
    meta: {
      title: '通知内容'
    }
  }, //历史记录
  {
    name: 'history',
    path: '/history',
    component: History,
    meta: {
      title: '历史记录'
    }
  }, //我的课程
  {
    name: 'myCourse',
    path: '/myCourse',
    component: MyCourse,
    meta: {
      title: '正在学习的课程'
    }
  }, //我的考试
  {
    name: 'MyExam',
    path: '/MyExam',
    component: MyExam,
    meta: {
      title: '已完成的考试'
    }
  }, //新闻中心
  {
    name: 'newsCenter',
    path: '/newsCenter',
    component: NewsCenter,
    meta: {
      title: '新闻中心'
    }
  }, //新闻搜索
  {
    name: 'newsSearch',
    path: '/newsSearch',
    component: NewsSearch,
    meta: {
      title: '新闻搜索'
    }
  }, //新闻详情
  {
    name: 'newsDetails',
    path: '/newsDetails',
    component: NewsDetails,
    meta: {
      title: '新闻详情'
    }
  }, //站内信
  {
    name: 'notice',
    path: '/notice',
    component: Notice,
    meta: {
      title: '站内信'
    }
  }, //通知公告
  {
    name: 'notification',
    path: '/notification',
    component: Notification,
    meta: {
      title: '通知公告'
    }
  }, // notification
  //排行榜
  {
    name: 'rankList',
    path: '/rankList',
    component: RankList,
    meta: {
      title: '排行榜'
    }
  }, //班级园地
  {
    name: 'classGarden',
    path: '/classGarden',
    component: ClassGarden,
    meta: {
      title: '班级园地'
    }
  }, //班级搜索
  {
    name: 'classSearch',
    path: '/classSearch',
    component: ClassSearch,
    meta: {
      title: '班级搜索'
    }
  }, //班级详情
  {
    name: 'classDetail',
    path: '/classDetail',
    component: ClassDetail,
    meta: {
      title: '班级详情'
    }
  }, //签到详情
  {
    name: 'signDetail',
    path: '/signDetail',
    component: SignDetail,
    meta: {
      title: '签到详情'
    }
  }, //电子书
  {
    name: 'ebook',
    path: '/ebook',
    component: Ebook,
    meta: {
      title: '电子书'
    }
  }, //电子书搜索
  {
    name: 'ebookSearch',
    path: '/ebookSearch',
    component: EbookSearch,
    meta: {
      title: '电子书搜索'
    }
  }, //电子书章节
  {
    name: 'ebookChapterList',
    path: '/ebookChapterList',
    component: EbookChapterList,
    meta: {
      title: '电子书章节'
    }
  }, //电子书章节内容
  {
    name: 'ebookDetail',
    path: 'ebookDetail',
    component: EbookDetail,
    meta: {
      title: '内容'
    }
  }, //我的学分
  {
    name: 'myCredit',
    path: 'myCredit',
    component: MyCredit,
    meta: {
      title: '我的学分'
    }
  }, //反馈中心
  {
    name: 'advise',
    path: 'advise',
    component: Advise,
    meta: {
      title: '反馈中心'
    }
  }, //设置中心
  {
    name: 'setting',
    path: 'setting',
    component: Setting,
    meta: {
      title: '设置'
    }
  }, //个人信息修改
  {
    name: 'userInfoEdit',
    path: 'userInfoEdit',
    component: UserInfoEdit,
    meta: {
      title: '个人信息修改'
    }
  }, //修改手机号码
  {
    name: 'changeMobile',
    path: 'changeMobile',
    component: ChangeMobile,
    meta: {
      title: '修改手机号码'
    }
  }, //修改密码
  {
    name: 'changePwd',
    path: 'changePwd',
    component: ChangePwd,
    meta: {
      title: '修改密码'
    }
  }, //注册
  {
    name: 'register',
    path: 'register',
    component: Register,
    meta: {
      title: '注册'
    }
  }, //交流评论
  {
    name: 'addCommunication',
    path: 'addCommunication',
    component: AddCommunication,
    meta: {
      title: '交流评论'
    }
  }, //添加评论
  {
    name: 'communication',
    path: 'communication',
    component: Communication,
    meta: {
      title: '添加评论'
    }
  }, //mp4播放
  {
    name: 'playMp4',
    path: 'playMp4',
    component: PlayMp4,
    meta: {
      title: '课程播放'
    }
  }, //JYAicc播放页
  {
    name: 'playJYAicc',
    path: 'playJYAicc',
    component: PlayJYAicc,
    meta: {
      title: '精英课程播放'
    }
  }, //h5播放
  {
    name: 'playH5',
    path: 'playH5',
    component: PlayH5,
    meta: {
      title: 'h5课程播放'
    }
  }, //打开app
  {
    name: 'openApp',
    path: 'openApp',
    component: OpenApp,
    meta: {
      title: '打开App'
    }
  }, //我的收藏
  {
    name: 'myCollect',
    path: 'myCollect',
    component: MyCollect,
    meta: {
      title: '我的收藏'
    }
  }, //学习档案
  {
    name: 'learningPortfolio',
    path: 'learningPortfolio',
    component: LearningPortfolio,
    meta: {
      title: '学习档案'
    }
  }, //考试记录
  {
    name: 'examHistory',
    path: 'examHistory',
    component: ExamHistory,
    meta: {
      title: '考试记录'
    }
  }, // 错题回顾
  {
    name: 'examReview',
    path: 'examReview',
    component: ExamReview,
    meta: {
      title: '查看错题'
    }
  }, //成果展示
  {
    name: 'resultShow',
    path: 'resultShow',
    component: ResultShow,
    meta: {
      title: '成果展示'
    }
  }, //成果展示详情
  {
    name: 'resultShowDetail',
    path: 'resultShowDetail',
    component: ResultShowDetail,
    meta: {
      title: '成果展示详情'
    }
  }, //成果展示搜索
  {
    name: 'resultShowSearch',
    path: 'resultShowSearch',
    component: ResultShowSearch,
    meta: {
      title: '成果展示搜索'
    }
  }, //笔记详情
  {
    name: 'notesDetail',
    path: 'notesDetail',
    component: NotesDetail,
    meta: {
      title: '笔记详情'
    }
  }, //通知详情
  {
    name: 'noticeDetail',
    path: 'noticeDetail',
    component: NoticeDetail,
    meta: {
      title: '通知详情'
    }
  }, //学分考核
  {
    name: 'trainDetail',
    path: 'trainDetail',
    component: TrainDetail,
    meta: {
      title: '学分考核'
    }
  }, {
    name: 'raceHistory',
    path: 'raceHistory',
    component: RaceHistory,
    meta: {
      title: '历史测试记录'
    }
  }, // 上传进度
  {
    name: 'uploadProgress',
    path: 'uploadProgress',
    component: UploadProgress,
    meta: {
      title: '上传进度'
    }
  }, // pdf阅读页
  {
    name: 'pdfReader',
    path: 'pdfReader',
    component: PdfReader,
    meta: {
      title: 'pdf阅读'
    }
  }, // pdf列表
  {
    name: 'pdfList',
    path: 'pdfList',
    component: PdfList,
    meta: {
      title: '在线测试题库'
    }
  }, // 在线测试排名
  {
    name: 'userRaceRank',
    path: 'userRaceRank',
    component: UserRaceRank,
    meta: {
      title: '在线测试排名'
    }
  }, {
    name: 'examGuide',
    path: 'examGuide',
    component: ExamGuide,
    meta: {
      title: '我的考试'
    }
  }, // 专题学习
  {
    name: 'specialTask',
    path: '/specialTask',
    component: SpecialTask,
    meta: {
      title: '专题学习'
    }
  }, // 资讯中心
  {
    name: 'communityCenter',
    path: '/communityCenter',
    component: CommunityCenter,
    meta: {
      title: '资讯中心'
    }
  }, // 定制培训
  {
    name: 'costomTraining',
    path: '/costomTraining',
    component: CostomTraining,
    meta: {
      title: '定制培训'
    }
  }, //error
  {
    name: 'error',
    path: '/error',
    component: Error,
    meta: {
      title: 'error'
    }
  }]
}, {
  path: '*',
  redirect: '/error'
}];
var _default = routes;
exports["default"] = _default;