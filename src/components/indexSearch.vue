<template>
    <div class="indexSearch">
        <div class="index_inputbox">
            <input type="text" placeholder="请输入关键词、标签" v-model="searchValue">
            <button @click="getSearchValue"></button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'indexSearch',
    data () {
        return {
            searchValue: ''
        }
    },
    methods: {
        getSearchValue () {
            this.$router.push({ path: '/courseSearch', query: { Keyword: this.searchValue } })
        }
    }
}
</script>

<style lang="scss">
 @import "../style/mixin";
 .indexSearch{
     width: 100%;
     height: toRem(96px);
     background: $brand-primary;
     position: relative;
     .index_inputbox{
         width: toRem(689px);
         height: toRem(60px);
         border-radius: toRem(10px);
         background: #cd4f54;
         position: absolute;
         top: 0;
         right: 0;
         bottom: 0;
         left: 0;
         margin: auto;
         display: flex;
         justify-content: space-between;
         align-items: center;
         input{
             width: toRem(580px);
             height: toRem(60px);
             line-height: toRem(60px);
             margin-left: toRem(29px);
             background: none;
             color: #ebb1b3;
             font-size: 0.35rem;
             &::-webkit-input-placeholder{
                color: #ebb1b3;
            }
             &::-moz-placeholder{
                color: #ebb1b3;
            }
         }
         button{
             width: toRem(60px);
             height: toRem(60px);
             margin-right: toRem(5px);
             background: url('../assets/sy_search.png') no-repeat 50% 50%;
             background-size: toRem(38px) toRem(36px);
             border:none;
         }
     }
 }
</style>