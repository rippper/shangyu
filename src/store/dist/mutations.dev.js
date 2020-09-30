"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mutationTypes = require("./mutation-types.js");

var _GET_USERINFO$SAVE_US;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_GET_USERINFO$SAVE_US = {}, _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.GET_USERINFO, function (state, userInfo) {
  state.userInfo = userInfo;
}), _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.SAVE_USERINFO, function (state, userInfo) {
  state.userInfo = userInfo;
}), _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.GET_USERAGENT, function (state, userAgent) {
  state.userAgent = userAgent;
}), _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.GET_NETWORKTYPE, function (state, netWorkType) {
  state.netWorkType = netWorkType;
}), _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.SAVE_COURSEINFO, function (state, courseInfo) {
  state.courseInfo = courseInfo;
}), _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.ALERT_TIMES, function (state, payload) {
  state.alertTimes = payload;
}), _defineProperty(_GET_USERINFO$SAVE_US, _mutationTypes.SET_APPTYPE, function (state, type) {
  state.appType = type;
}), _GET_USERINFO$SAVE_US);

exports["default"] = _default;