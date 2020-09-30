"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vue = _interopRequireDefault(require("vue"));

var _vueRouter = _interopRequireDefault(require("vue-router"));

require("./assets/iconfont/iconfont.css");

require("./components/global");

var _utils = require("./plugins/utils");

var _router = _interopRequireDefault(require("./router"));

require("./service/filter");

var _getData = require("./service/getData");

var _store = _interopRequireDefault(require("./store/"));

require("./style/base.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
_vue["default"].config.productionTip = false;

_vue["default"].use(_vueRouter["default"]); //修改title


var changeTitle = function changeTitle(title) {
  if (title) {
    document.title = title;

    if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
      var i = document.createElement('iframe');
      i.src = '//m.baidu.com/favicon.ico';
      i.style.display = 'none';

      i.onload = function () {
        setTimeout(function () {
          i.remove();
        }, 9);
      };

      document.body.appendChild(i);
    }
  }
}; // 检查登录状态


var getLoginStatus = function getLoginStatus(next) {
  var Mac = (0, _utils.getMac)();
  var userInfo = _store["default"].state.userInfo;
  (0, _getData.CheckLoginStatus)({
    UserID: userInfo.UserId,
    Mac: Mac
  }).then(function (res) {
    res = Number(res);

    if (res !== 1) {
      _store["default"].dispatch('saveUserInfo', {});

      next({
        path: '/login'
      });
    } else {
      next();
    }
  }); // next();
};

var router = new _vueRouter["default"]({
  routes: _router["default"]
});
router.beforeEach(function (to, from, next) {
  var fromUrl = from.fullPath;
  var href = window.location.href;

  if (!/\/favicon\.ico/.test(href)) {
    (0, _utils.setStore)('fromUrl', fromUrl);
  }

  var title = to.meta.title;
  changeTitle(title);
  next();

  if (to.name !== 'login') {
    if (JSON.stringify(_store["default"].state.userInfo) === '{}') {
      next({
        path: '/login'
      });
    } else {
      getLoginStatus(next);
    }
  } else {
    next();
  }
});
router.afterEach(function (to, from) {
  window.scrollTo(0, 0);
  /*存入当前url*/

  var currentUrl = to.fullPath;
  var href = window.location.href;

  if (!/\/favicon\.ico/.test(href)) {
    (0, _utils.setStore)('currentUrl', currentUrl);
  }
  /*判断mobile weixin*/


  var agent = (0, _utils.userAgent)();
  (0, _utils.setStore)('userAgent', agent);

  if (_store["default"].state.userAgent == '') {
    _store["default"].commit('GET_USERAGENT', agent);
  }
}); // if (process.env.NODE_ENV == 'development') {

new _vue["default"]({
  router: router,
  store: _store["default"]
}).$mount('#app'); // } else {
//   let agent = userAgent();
//   if (!(agent.mobile || agent.android || agent.iPhone || agent.iPad || agent.weixin || agent.qq)) {
//     new Vue({
//       template: `<h1 style="text-align: center;font-size: 26px;padding-top: 50px;">请在手机浏览器或微信中打开</h1>`
//     }).$mount('#app');
//   } else {
//     new Vue({
//       router,
//       store
//     }).$mount('#app');
//   }
// }

var _default = router;
exports["default"] = _default;