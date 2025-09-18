<template>
    <div class="relative spinner flex align-items-center justify-center z-2">
        <div
            class="pointer-events-none absolute inset-x-0 top-0 z-3 flex h-[50%] flex-column align-items-center justify-center lg:h-[65%]">
            <div class="relative z-2 max-w-full pointer-events-auto" :data-double-type="color ? color : 'green'">
                <div class="relative aspect-square mx-auto">
                    <div
                        class="absolute left-1/2 top-1/2 -z-1 flex -translate-x-1/2 -translate-y-1/2 w-full items-center justify-center rounded-full">
                        <div
                            class="absolute border-0 inset-0 rounded-full border-[.75rem] lg:border-[1rem] lg:border-[1.225rem] [--bg:--from] border-bg-mix-10 img-win">
                            <img src="/storage/logo.png" v-if="color" class="width-50p height-45" />
                        </div>
                        <div class="relative aspect-square">
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                class="stroke-[--from] transition-[stroke]" fill="none"
                                vector-effect="non-scaling-stroke" :style="`width: ${w}px; height: ${h}px`">
                                <circle cx="40" cy="40" r="35" opacity=".3" stroke-width="10"></circle>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"
                                class="absolute left-0 top-0 animate-spin stroke-[--stroke] transition-[stroke] [animation-duration:4s] [mask-image:conic-gradient(from_35deg,transparent_14%,#000_50%,transparent_62%,transparent_70%,#000)]"
                                fill="none" vector-effect="non-scaling-stroke" :style="`width: ${w}px; height: ${h}px`">
                                <circle cx="40" cy="40" r="35" stroke-width="10" stroke-dasharray="70, 40"
                                    stroke-linecap="round"></circle>
                            </svg>
                        </div>
                        <svg class="absolute aspect-square animate-spin  stroke-[--from] [animation-duration:1.5s] [mask-image:conic-gradient(from_45deg,rgba(0,0,0,0)_75%,#000)]"
                            viewBox="25 25 50 50" :style="`width: ${w}px; height: ${h}px`">
                            <circle stroke-linecap="round" stroke-dasharray="25 200" stroke-dashoffset="-70" cx="50"
                                cy="50" r="18" fill="none" stroke-width="6"></circle>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { SVG } from './svg/Enum';
export default {
    props: ['w', 'h', 'color'],
    components: {
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
