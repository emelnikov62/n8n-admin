<template>
    <div class="border-dashed button lang-container back block padding-10 flex flex-row justify-center align-items-center gap-5 relative"
        :class="classNameContainer" @click="showHideLangMenu">
        <div>{{ $root.lang }}</div>
        <SvgComponent :svgKey="$root.lang == 'RU' ? SVG.RUS : SVG.ENG" />
        <SvgComponent :svgKey="SVG.ARROW_DOWN" />
        <Menu :items="[
            {
                title: 'Русский',
                svgKey: SVG.RUS,
                click: changeLang,
                params: 'RU',
                active: $root.lang == 'RU'
            },
            {
                title: 'English',
                svgKey: SVG.ENG,
                click: changeLang,
                params: 'ENG',
                active: $root.lang == 'ENG'
            }
        ]" :className="className" />
    </div>
</template>

<script>
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
import Menu from './Menu.vue';
export default {
    props: ['className', 'classNameContainer'],
    components: {
        SvgComponent, Menu
    },
    data() {
        return {
            SVG
        }
    },
    mounted() {

    },
    methods: {
        showHideLangMenu() {
            let show = $(`.${this.className}`).hasClass('active');

            this.$parent.removeHadlerOut();

            if (show) {
                $(`.${this.className}`).removeClass('active');
            } else {
                $(`.${this.className}`).addClass('active');
            }

            this.$forceUpdate();
            this.$parent.addHandlerOut();
        },
        changeLang(lang) {
            setTimeout(() => {
                this.$parent.hideAllMenus();
                setTimeout(() => {
                    this.$root.lang = lang;
                    this.$cookies.set('lang', lang);
                    this.$i18n.locale = lang;
                    this.$forceUpdate();
                }, 300);
            }, 200);
        }
    }
}
</script>
