<template>
    <div class="specialTask container_top">
        <header-fix title="专题学习" fixed>
            <i class="webapp webapp-back" @click.stop="goBack" slot="left"></i>
        </header-fix>
        <div class="st_bodypart">
            <ul>
                <li>
                    <router-link :to="{ path: '/courseCenter', query: { title: '“不忘初心、牢记使命”主题教育' } }">
                        <img src="../assets/sy_specialImg1.png" alt>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/courseCenter', query: { title: '党的十九大精神学习专题' } }">
                        <img src="../assets/sy_specialImg2.png" alt>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ path: '/courseCenter', query: { title: '十九届四中全会精神学习专题' } }">
                        <img src="../assets/sy_specialImg3.png" alt>
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { headerFix } from '../components'
import { goBack } from "../service/mixins";

export default {
    mixins: [goBack],
    name: 'specialTask',
    components: {
        headerFix
    }
}
</script>

<style lang="scss">
  @import "../style/mixin";
    .specialTask{
        .st_bodypart{
            ul{
                li{
                    margin-top: toRem(30px);
                    a{
                        display: block;
                        width: 9.2rem;
                        height: 4.4rem;
                        margin: 0 auto;
                        border-radius: toRem(15px);
                        overflow: hidden;
                        img{
                            width: 9.2rem;
                            height: 4.4rem;
                        }
                    }

                }
            }
        }   
    }
</style>