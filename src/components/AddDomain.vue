<template>
    <div
        class="full-height padding-10 gap-10 full-width flex flex-column align-items-center justify-start back-static block border-radius-content opacity-full">
        <div
            class="relative back-static back block full-height gap-0 padding-0 full-width flex flex-column align-items-start justify-center opacity-full">
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">Адресс домена</span>
                    <input type="text" v-model="domain"
                        class="input flex-1 full-width back-static input-skin-price height-40 border-radius-10"
                        placeholder="введите домен в формате http(https)://domain.com" />
                </div>
            </div>
        </div>
        <button @click="createDomain" type="button" v-if="!loading"
            class="button gap-5 flex flex-row padding-10 back-static back block height-60 upper font-bold fs-10 border-[main-color] gradient-fresh-block full-width">
            <SvgComponent :svgKey="SVG.EDIT" />
            Добавить
        </button>
        <div class="loader-container full-width full-height flex-column align-items-center justify-center flex" v-else>
            <span class="loader"></span>
        </div>
    </div>
</template>

<script>
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
export default {
    props: ['className', 'data'],
    components: {
        SvgComponent
    },
    data() {
        return {
            SVG,
            domain: null,
            loading: false
        }
    },
    mounted() {
    },
    methods: {
        createDomain() {
            if (!this.domain) {
                this.$root.showAlert('error', 'Введите адрес домена');
                return;
            }

            this.loading = true;
            this.$root.$http.post('/user/domains/add', {
                domain: this.domain,
                id: this.$root.user.id
            }).then(res => {
                let data = res.data;

                if (data.success) {
                    this.$root.emit('updateDomains');
                    this.$root.emit('hideModal');
                } else {
                    this.$root.showAlert('error', this.$t(data.message));
                    this.loading = false;
                }
            }).catch(err => {
                console.log(JSON.stringify(err));
                this.loading = false;
            });
        }
    }
}
</script>
