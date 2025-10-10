<template>
  <div class="content flex flex-column align-items-center justify-start profile-content">
    <div class="content-inner flex flex-column gap-20">
      <div class="flex flex-column gap-10 align-items-center justify-center">
        <img alt="Vue logo" src="./assets/logo.png">
        <div class="main fs-30">{{ $t('main.welcome') }}</div>
        <button @click="goTo"
          class="button-go-to back-static cursor padding-10 gradient-fresh-block flex full-width flex-row align-items-center justify-space-between gap-10 back block height-45 font-bold fs-14">
          <span class="main fs-16">{{ $t('main.started_btn') }}</span>
          <SvgComponent :svgKey="SVG.MENU_MOBILE"></SvgComponent>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SvgComponent from './components/svg/Svg.vue';
import { SVG } from './components/svg/Enum';
export default {
  name: 'App',
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
    goTo() {
      $('.button-go-to').hide();
      this.$router.push({ name: 'admin-general' });
    }
  }
}
</script>
