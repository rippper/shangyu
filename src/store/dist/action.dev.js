"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _utils = require("../plugins/utils");

var _mutationTypes = require("./mutation-types.js");

// import { CheckLoginStatus } from '../service/getData'
var _default = {
  saveUserInfo: function saveUserInfo(_ref, payload) {
    var state = _ref.state,
        commit = _ref.commit;
    (0, _utils.setStore)('userInfo', payload);
    commit(_mutationTypes.SAVE_USERINFO, payload);
  },
  getUserAgent: function getUserAgent(_ref2, payload) {
    var state = _ref2.state,
        commit = _ref2.commit;
    var data = (0, _utils.userAgent)();
    commit(_mutationTypes.GET_USERAGENT, data);
  },
  saveCourseInfo: function saveCourseInfo(_ref3, courseInfo) {
    var state = _ref3.state,
        commit = _ref3.commit;
    (0, _utils.setStore)('courseInfo', courseInfo);
    commit(_mutationTypes.SAVE_COURSEINFO, courseInfo);
  },
  saveAlertTimes: function saveAlertTimes(_ref4, payload) {
    var state = _ref4.state,
        commit = _ref4.commit;
    commit(_mutationTypes.ALERT_TIMES, payload);
  },
  saveAppType: function saveAppType(_ref5, type) {
    var state = _ref5.state,
        commit = _ref5.commit;
    (0, _utils.setStore)('apptype', type);
    commit(_mutationTypes.SET_APPTYPE, type);
  }
};
exports["default"] = _default;