<template>
    <div
        class="full-height padding-10 gap-10 full-width flex flex-column align-items-center justify-start back-static block border-radius-content opacity-full">
        <div
            class="relative back-static back block full-height gap-0 padding-0 full-width flex flex-column align-items-start justify-center opacity-full">
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">{{ $t('profile.select_logo') }}</span>
                    <input type="file" v-on:change="imageChanged"
                        class="input flex-1 full-width back-static input-skin-price min-height-50 border-radius-10" />
                </div>
            </div>
        </div>
        <button @click="uploadLogo" type="button" v-if="!loading"
            class="button gap-5 flex flex-row padding-10 back-static back block height-60 upper font-bold fs-10 border-[main-color] gradient-fresh-block full-width">
            <SvgComponent :svgKey="SVG.EDIT" />
            {{ $t('profile.upload_logo_btn') }}
        </button>
        <div class="loader-container full-width height-60 flex-column align-items-center justify-center flex" v-else>
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
            image: null,
            loading: false
        }
    },
    mounted() {
    },
    methods: {
        imageChanged(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length)
                return;

            this.image = files[0];
        },
        uploadLogo() {
            if (!this.image) {
                this.$root.showAlert('error', this.$t('profile.empty_file'));
                return;
            }

            this.loading = true;
            this.$root.$http.post('user/domains/upload-logo', {
                file: this.image, id: this.data
            }, { headers: { "Content-Type": "multipart/form-data" } })
                .then(res => {
                    let data = res.data;

                    if (data.success) {
                        this.$root.emit('hideModal');
                        this.$root.emit('updateDomain');
                        this.$root.showAlert('success', this.$t('profile.logo_change_success'));
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
