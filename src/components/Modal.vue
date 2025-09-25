<template>
    <div class="layout-modal">
        <div class="layout-modal-container gradient-wnd block" :class="classWindow"
            :style="`top: ${top}px; left: ${left}px; right: ${right}px`">
            <div class="layout-modal-header back-static block border-radius-header" v-if="header">
                <div class="layout-modal-header-title">{{ header }}</div>
                <div class="back back-static border-dashed gradient-cv flex flex-row align-items-center justify-center"
                    @click="$root.emit('hideModal')">
                    <SvgComponent :svgKey="SVG.X" />
                </div>
            </div>
            <component v-bind:is="component" :data="data" />
        </div>
        <div class="layout-modal-back" @click="$root.emit('hideModal')"></div>
    </div>
</template>

<script>
import AddDomain from './AddDomain.vue';
import AddDomainAction from './AddDomainAction.vue';
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
import UploadDomainLogo from './UploadDomainLogo.vue';
import UploadUserLogo from './UploadUserLogo.vue';

export default {
    components: {
        SvgComponent, AddDomain, UploadDomainLogo, UploadUserLogo, AddDomainAction
    },
    props: [],
    data() {
        return {
            header: '',
            back: true,
            component: null,
            classWindow: '',
            data: null,
            top: null,
            left: null,
            right: null,
            clear: true,
            backComponent: null,
            SVG
        }
    },
    mounted() {
        this.$root.on('showModal', (params) => {
            this.header = params.header;
            this.component = params.component;
            this.data = params.data;
            this.back = params.back;
            this.classWindow = params.classWindow;
            this.top = params.top ? params.top : 'auto';
            this.left = params.left ? params.left : 'auto';
            this.right = params.right ? params.right : 'auto';
            this.clear = params.clear != null ? params.clear : true;
            this.backComponent = params.backComponent ? params.backComponent : null;

            $('.layout-modal').addClass('active');
            if (!this.back) {
                $('.layout-modal-back').addClass('transparent')
            }

            $('body').css({ 'overflow': 'hidden' });
        })

        this.$root.on('hideModal', () => {
            $('.layout-modal').removeClass('active');
            $('body').css({ 'overflow': 'auto' });

            this.component = null;

            if (this.clear) {
                this.$root.emit('clearData');
            }
        });
    },
    methods: {
    },
    sockets: {
    }
}
</script>
