<template>
    <div class="menu-items back gradient-ig gap-5" :class="className">
        <div class="menu-item back-static back block gap-5 flex flex-row justify-start align-items-center min-height-40"
            v-for="item in items" @click="item.click(item.params)" :class="item.active ? 'active' : ''" :key="item">
            <SvgComponent :svgKey="item.svgKey" v-if="item.svgKey" />
            {{ item.title }}
        </div>
        <div class="menu-item gap-5 flex flex-row justify-start align-items-center gradient-ig"
            v-if="className == 'auth-menu-items mobile'">
            <telegram-login-temp @callback="onTelegramAuth" mode="callback" telegram-login="CsDeepMarketBot"
                :userpic="false" size="large" radius="5" />
        </div>
    </div>
</template>

<script>
import { telegramLoginTemp } from 'vue3-telegram-login';
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
export default {
    props: ['items', 'className'],
    components: {
        SvgComponent, telegramLoginTemp
    },
    data() {
        return {
            SVG
        }
    },
    mounted() {
    },
    methods: {
        onTelegramAuth(user) {
            this.$root.checkTgUser(user.id);
        }
    }
}
</script>
