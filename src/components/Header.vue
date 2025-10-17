<template>
    <div class="header flex flex-row justify-space-between align-items-center gradient-header">
        <div class="header-container flex justify-space-between align-items-center flex-row">
            <div class="header-container-left flex flex-row justify-start align-items-center gap-20">
                <a href="/"
                    class="button button-header flex flex-row justify-center align-items-center back back-static block sound border-dashed">
                    <SvgComponent :svgKey="SVG.STOCKS" />
                    Menu Item 1
                </a>
                <a href="/"
                    class="button button-header back back-static block flex flex-row justify-center align-items-center sound border-dashed">
                    <SvgComponent :svgKey="SVG.STOCKS" />
                    Menu Item 2
                </a>
            </div>
            <div class="header-container-center flex flex-row justify-center align-items-center">
                <a href="/" class="logo flex flex-row align-items-center justify-center">
                    <img src="../../public/images/logo-new.png">
                </a>
            </div>
            <div class="header-container-right flex justify-end align-items-center gap-10">
                <LangsMenu :className="'lang-menu-items'" :classNameContainer="'back-static relative'" />
                <button type="button"
                    class="button border-dashed back-static auth-steam back flex flex-row gap justify-center align-items-center padding-left-right-10"
                    @click="$router.push({ name: 'auth' })" v-if="!$root.user">
                    <SvgComponent :svgKey="SVG.AUTH" />
                </button>
                <div class="button profile deposit gradient-main-block" v-if="$root.user" @click="showDeposit">
                    <SvgComponent :svgKey="SVG.REFERRAL_BALANCE" />
                    {{ $t('header.deposit') }}
                </div>
                <div class="button profile balance back padding-left-right-10 border-dashed back-static"
                    v-if="$root.user" @click="location.href = '/'">
                    <CashCoin :cash="$root.user.balance && $root.user.balance.toFixed(2)" />
                </div>
                <div class="button notify back back-static border-dashed padding-left-right-5" v-if="$root.user"
                    @click="location.href = '/'">
                    <SvgComponent :svgKey="SVG.NOTIFY" />
                </div>
                <div class="button profile border-dashed back-static back padding-5 flex flex-row justify-center align-items-center"
                    v-if="$root.user" @click="location.href = '/admin/general'">
                    <a class="avatar flex justify-center align-items-center">
                        <img v-if="$root.user.logo"
                            :src="'data:' + $root.user.logo.mimeType + ';base64, ' + $root.user.logo.data"
                            class="block profile-img" />
                        <img src="../../src/assets/logo.png" v-else />
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
import CashCoin from './CashCoin.vue';
import LangsMenu from './LangsMenu.vue';
export default {
    props: [],
    components: {
        SvgComponent, CashCoin, LangsMenu
    },
    data() {
        return {
            SVG, location
        }
    },
    mounted() {
        this.$root.on('reopenDepositWindow', () => {
            this.showDeposit();
        });
    },
    methods: {
        addHandlerOut() {
            setTimeout(() => {
                $('.header').on('click', () => {
                    this.hideAllMenus();
                });
                $('.content').on('click', () => {
                    this.hideAllMenus();
                });
                $('.footer').on('click', () => {
                    this.hideAllMenus();
                });
            }, 100);
        },
        hideAllMenus() {
            $(`.lang-menu-items`).removeClass('active');
            $(`.auth-menu-items`).removeClass('active');
            $(`.profile-menu-items`).removeClass('active');
            $(`.main-mobile-menu-items`).removeClass('active');
            $(`.lang-footer-menu-items`).removeClass('active');
        },
        removeHadlerOut() {
            $('.header').off('click');
            $('.content').off('click');
            $('.footer').off('click');
            this.hideAllMenus();
        },
        showHideAuthMenu() {
            let show = $(`.auth-menu-items`).hasClass('active');
            this.removeHadlerOut();

            if (show) {
                $('.auth-menu-items').removeClass('active');
            } else {
                $('.auth-menu-items').addClass('active');
            }

            this.$forceUpdate();
            this.addHandlerOut();
        },
        showDeposit() {
            if (!this.$root.checkAuth()) {
                return;
            }

            this.$root.emit('showModal', {
                header: this.$root.$t('main.deposit_window'),
                component: 'Deposit',
                back: true,
                classWindow: 'deposit-window',
                clear: true
            });
        },
    }
}
</script>
