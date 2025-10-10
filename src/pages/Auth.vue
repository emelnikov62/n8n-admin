<template>
    <div v-if="!loading" class="content flex flex-column align-items-center justify-start profile-content">
        <div class="content-inner flex flex-column gap-20">
            <div class="flex flex-column gap-10 align-items-center justify-center">
                <img alt="Vue logo" src="../assets/logo.png">
                <div class="main fs-30">{{ $t('main.auth_title') }}</div>
                <div class="flex flex-column gap-2 full-width">
                    <div class="main fs-14">{{ $t('main.login') }}</div>
                    <div class="full-width">
                        <input v-model="login" class="input input-skin-price full-width" type="text">
                    </div>
                </div>
                <div class="flex flex-column gap-2 full-width">
                    <div class="main fs-14">{{ $t('main.password') }}</div>
                    <div class="full-width">
                        <input v-model="password" class="input input-skin-price full-width" type="password">
                    </div>
                </div>
                <div class="flex cursor flex-column gap-2 full-width align-items-center justify-center">
                    <button @click="checkAuth" v-if="!loading" type="button"
                        class="back-static cursor padding-10 gradient-fresh-block flex full-width flex-row align-items-center justify-space-between gap-10 back block height-45 font-bold fs-14">
                        <SvgComponent :svgKey="SVG.AUTH"></SvgComponent>
                        <span class="main fs-14">{{ $t('main.login_btn') }}</span>
                    </button>
                    <div v-else class="flex flex-row align-items-center justify-center padding-20 z-10">
                        <div
                            class="loader-container full-width full-height flex-column align-items-center justify-center flex">
                            <span class="loader"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="loader-container full-width full-height flex-column align-items-center justify-center flex" v-else>
        <span class="loader"></span>
    </div>
</template>

<script>
import { SVG } from '../components/svg/Enum';
import SvgComponent from '../components/svg/Svg.vue';

export default {
    name: 'Auth',
    components: { SvgComponent },
    props: {
    },
    data() {
        return {
            SVG,
            login: null,
            password: null,
            loading: true
        }
    },
    mounted() {
        setTimeout(() => {
            this.loading = false;
        }, 300);
    },
    methods: {
        checkAuth() {
            if (!this.login || !this.password) {
                this.$root.showAlert('error', 'Введите данные для входа');
                return;
            }

            this.loading = true;
            this.$root.$http.post('auth', { 'login': this.login, 'password': this.password })
                .then(data => {
                    var result = data.data;

                    if (result && result.token) {
                        this.$root.setToken(result.token);
                        this.$router.push({ name: 'admin-general' });
                        return;
                    } else {
                        this.$root.showAlert('error', 'В данный момент невозможно войти');
                    }

                    this.loading = false;
                })
                .catch(error => {
                    console.log(error);
                    this.loading = false;
                });
        }
    }
}
</script>