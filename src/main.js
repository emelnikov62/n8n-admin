import { createApp } from 'vue';
import router from './router';
import VueCookie from 'vue3-cookies';
import axios from 'axios';
import { createI18n } from 'vue-i18n';
import Messages from './messages.js';
import 'aos/dist/aos.css';
import $ from "jquery";

let lang = 'RU';

const i18n = createI18n({
    locale: lang,
    fallbackLocale: lang,
    messages: Messages
});

axios.defaults.baseURL = 'https://n8n-agent-emelnikov62.amvera.io/webhook/';

import Layout from "./components/Layout.vue";
import mitt from 'mitt';

const app = createApp({
    el: '#app',
    i18n,
    data() {
        return {
            lang: 'RU',
            user: null,
            cart: [],
            config: null,
            emitter: null,
            sound: 0,
            loading: false
        }
    },
    mounted() {
        if (!this.emitter) {
            this.emitter = mitt();
        }

        if (this.$cookies.get('token')) {
            this.loading = true;
            this.getUser();
        }

        if (this.$cookies.get('lang')) {
            this.lang = this.$cookies.get('lang');
            this.$i18n.locale = this.lang;
        }

        if (this.$cookies.get('sound')) {
            this.sound = this.$cookies.get('sound');
        }
    },
    methods: {
        on(name, callback) {
            if (!this.emitter) {
                this.emitter = mitt();
            }
            this.emitter.on(name, callback);
        },
        emit(name, params) {
            this.emitter.emit(name, params);
        },
        setToken(token) {
            this.$cookies.set('token', token);
            this.getUser();
        },
        exit() {
            this.$cookies.remove('token');
            window.location.href = '/';
        },
        getUser() {
            axios.post('user/info', { token: this.$cookies.get('token') })
                .then(res => {
                    this.user = res.data;
                    this.loading = false;
                    setTimeout(() => {
                        this.emit('profileLoaded');
                    }, 100);
                }).catch(error => {
                    console.log(error);
                    this.loading = false;
                });

            this.$forceUpdate();
        },
        copy(text) {
            navigator.clipboard.writeText(text);
            this.showAlert('success', `${this.$t('profile.copy_title')} ${text}`);
        },
        showAlert(type, message) {
            let gradient = 'gradient-alert-error';
            let icon = '<svg fill="white" viewBox="0 0 36 36" version="1.1" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>error-line</title> <path class="clr-i-outline clr-i-outline-path-1" d="M18,6A12,12,0,1,0,30,18,12,12,0,0,0,18,6Zm0,22A10,10,0,1,1,28,18,10,10,0,0,1,18,28Z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M18,20.07a1.3,1.3,0,0,1-1.3-1.3v-6a1.3,1.3,0,1,1,2.6,0v6A1.3,1.3,0,0,1,18,20.07Z"></path><circle class="clr-i-outline clr-i-outline-path-3" cx="17.95" cy="23.02" r="1.5"></circle> <rect x="0" y="0" width="36" height="36" fill-opacity="0"></rect> </g></svg>';

            if (type == 'success') {
                gradient = 'gradient-alert-success';
                icon = '<svg fill="white" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <g> <path d="M437.016,74.984c-99.979-99.979-262.075-99.979-362.033,0.002c-99.978,99.978-99.978,262.073,0.004,362.031 c99.954,99.978,262.05,99.978,362.029-0.002C536.995,337.059,536.995,174.964,437.016,74.984z M406.848,406.844 c-83.318,83.318-218.396,83.318-301.691,0.004c-83.318-83.299-83.318-218.377-0.002-301.693 c83.297-83.317,218.375-83.317,301.691,0S490.162,323.549,406.848,406.844z"></path> <path d="M368.911,155.586L234.663,289.834l-70.248-70.248c-8.331-8.331-21.839-8.331-30.17,0s-8.331,21.839,0,30.17 l85.333,85.333c8.331,8.331,21.839,8.331,30.17,0l149.333-149.333c8.331-8.331,8.331-21.839,0-30.17 S377.242,147.255,368.911,155.586z"></path> </g> </g> </g> </g></svg>';
            }

            let rnd = (Math.random() * 100 + 100).toFixed(0);
            let alert = `<div class="alert back back-static block ${gradient}" id="alert-${rnd}"><div class="border-dashed flex full-width flex-row gap-5 padding-left-right-5 align-items-center justify-center">${icon}<p>${message}</p></div></div>`;
            $('.layout').append(alert);

            setTimeout(() => {
                $(`#alert-${rnd}`).addClass('active');
                $(`#alert-${rnd}`).click(function () {
                    $(this).removeClass('active');
                    $(this).remove();
                });
            }, 100);

            setTimeout(() => {
                $(`#alert-${rnd}`).removeClass('active');
                setTimeout(() => {
                    $(`#alert-${rnd}`).remove();
                }, 1000);
            }, 3000);
        },
        formatDate(date, withTime = false) {
            let formatedDate = new Date(date);
            return formatedDate.toLocaleDateString() + (withTime ? ', ' + formatedDate.toLocaleTimeString() : '');
        },
        isMobile() {
            if (document.documentElement.clientWidth < 854) {
                return true;
            } else {
                return false;
            }
        },
        isSmallMobile() {
            if (document.documentElement.clientWidth < 431) {
                return true;
            } else {
                return false;
            }
        },
        checkAuth() {
            if (!this.user) {
                this.$root.showAlert('error', this.$t('main.need_auth'));
                return false;
            }

            return true;
        },
        openLink(href) {
            var width = 970;
            var height = 600;
            var left = screen.width / 2 - width / 2;
            var top = screen.height / 2 - height / 2;
            var windowOptions = "width=".concat(width, ", height=").concat(height, ", top=").concat(top, ", left=").concat(left);
            var type = 'auth';
            window.open(href, type, windowOptions);
        }
    },
    router,
    components: {
        Layout
    }
});

router.beforeEach((to, from, next) => {
    if (to.meta && to.meta.checkAdministrationPermissions) {
        let token = app.config.globalProperties.$cookies.get('token');
        if (!token) {
            return next('auth');
        }

        axios.post('user/info', { token: token })
            .then(res => {
                let user = res.data;

                if (user) {
                    return next();
                }

                return next('/');
            }).catch(error => {
                console.log(error);
                return next('/');
            });
    } else {
        return next();
    }
});

app.config.globalProperties.$http = axios;
app.use(VueCookie);
app.use(i18n);
app.use(router);
app.mount('#app');