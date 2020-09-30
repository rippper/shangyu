"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vuex = _interopRequireDefault(require("vuex"));

var _utils = require("../plugins/utils");

var _action = _interopRequireDefault(require("./action"));

var _getters = _interopRequireDefault(require("./getters"));

var _mutations = _interopRequireDefault(require("./mutations"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].use(_vuex["default"]);

var state = {
  userInfo: (0, _utils.getStore)('userInfo') || {},

  /*用户信息*/
  userAgent: '',

  /*浏览器设备信息*/
  wxIndexUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx63218cd64084079f&redirect_uri=http%3A%2F%2Fwww.szgx.suzhou.gov.cn%2Fwechat%2F%23%2Fhome&response_type=code&scope=snsapi_base#wechat_redirect',
  wxLoginUrl: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx63218cd64084079f&redirect_uri=http%3A%2F%2Fwww.szgx.suzhou.gov.cn%2Fwechat%2F%23%2Flogin&response_type=code&scope=snsapi_base#wechat_redirect',
  netWorkType: '',

  /*网络类型*/
  courseInfo: (0, _utils.getStore)('courseInfo'),
  // 要播放的课程信息
  alertTimes: 0,
  appType: (0, _utils.getStore)('apptype') || '' // 记录来源是否为app，帮助判别浏览高度

};

var _default = new _vuex["default"].Store({
  state: state,
  getters: _getters["default"],
  actions: _action["default"],
  mutations: _mutations["default"]
});

exports["default"] = _default;