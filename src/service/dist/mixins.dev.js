"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPlay = exports.goBack = void 0;
var goBack = {
  methods: {
    goBack: function goBack() {
      this.$router.go(-1);
    }
  }
};
exports.goBack = goBack;
var toPlay = {
  methods: {
    toPlay: function toPlay(type, id) {
      if (type == 'nstdc') {
        this.$router.push({
          path: '/playMp4',
          query: {
            id: id
          }
        });
      } else if (type == 'jyzxnews') {
        this.$router.push({
          path: '/playJYAicc',
          query: {
            id: id
          }
        });
      } else if (type == 'h5') {
        this.$router.push({
          path: '/playH5',
          query: {
            id: id
          }
        });
      } else {
        this.$router.push({
          path: '/playMp4',
          query: {
            id: id
          }
        });
      }
    }
  }
};
exports.toPlay = toPlay;