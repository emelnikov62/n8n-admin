<template>
    <span class="flex flex-row align-items-center gap-2 coin" :class="className">
        <span>{{ cash }}</span>
        <SvgComponent :svgKey="SVG.STAR" v-if="!demo" />
        <SvgComponent :svgKey="SVG.GAMES" v-if="demo" />
    </span>
</template>

<script>
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
export default {
    props: ['cash', 'className', 'demo'],
    components: {
        SvgComponent
    },
    data() {
        return {
            SVG
        }
    },
    mounted() {

    },
    methods: {

    }
}
</script>
