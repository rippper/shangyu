<template>
    <div class="skeleArtItem">
        <div class="animated-background sai_title"></div>
        <div class="animated-background sai_content"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  @import "../style/mixin";
  
  @include keyframes(placeHolderShimmer){
    0%{
      background-position: -468px 0
    }
    100%{
      background-position: 468px 0
    }
  }
  .animated-background {
    animation-duration: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #bbb 8%, #eee 18%, #bbb 33%);
    background-size: 800px 104px;
    height: 40px;
    position: relative;
  }
  .skeleArtItem{
    width: toRem(690px);
    height: toRem(200px);
    padding-top: toRem(16px);
    margin: 0 auto;
    .sai_title{
        width: toRem(690px);
        height: toRem(90px)
    }
    .sai_content{
        width: toRem(690px);
        height: toRem(30px);
        margin-top: toRem(32px);
    }
  }

</style>