// import { CheckLoginStatus } from '../service/getData'
import {setStore, userAgent} from '../plugins/utils';
import {
  ALERT_TIMES,
  GET_USERAGENT,
  SAVE_COURSEINFO,
  SAVE_USERINFO,
  SET_APPTYPE
} from './mutation-types.js';

export default {
  saveUserInfo({state, commit}, payload) {
    setStore('userInfo', payload);
    commit(SAVE_USERINFO, payload);
  },
  getUserAgent({state, commit}, payload) {
    let data = userAgent();
    commit(GET_USERAGENT, data);
  },
  saveCourseInfo({state, commit}, courseInfo) {
    setStore('courseInfo', courseInfo);
    commit(SAVE_COURSEINFO, courseInfo);
  },
  saveAlertTimes({state, commit}, payload) {
    commit(ALERT_TIMES, payload);
  },
  saveAppType({state, commit}, type) {
    setStore('apptype', type);
    commit(SET_APPTYPE, type)
  }
};
