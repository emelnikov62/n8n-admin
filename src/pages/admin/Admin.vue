<template>
  <div class="content flex flex-column align-items-center justify-start profile-content">
    <div class="content-inner flex flex-column width-80 gap-20">
      <div class="rows flex flex-row gap-20 justify-space-between align-items-start full-width">
        <div class="row full-width flex flex-column align-items-center justify-center gap-10">
          <div
            class="border-dashed profile-nav full-width height-60 gap-2 flex-row back-static block flex align-items-center justify-center opacity-full">
            <router-link to="/admin/general" :class="$route.path.includes('general') ? 'active' : ''"
              class="profile-general gap-10 fs-12 svg-[20] font-bold back-opacity-60 back upper flex-1 white full-height block flex flex-row align-items-center justify-center">
              <SvgComponent :svgKey="SVG.USER" />
              {{ $t('profile.general') }}
            </router-link>
            <router-link to="/admin/domains/active" :class="$route.path.includes('domains') || $route.path.includes('domain/') ? 'active' : ''"
              class="profile-inventory flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
              <SvgComponent :svgKey="SVG.MARKET" />
              {{ $t('profile.domains') }}
            </router-link>
            <router-link to="/admin/stats" :class="$route.path.includes('stats') ? 'active' : ''"
              class="profile-game-stats flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
              <SvgComponent :svgKey="SVG.GAME_STATS" />
              {{ $t('profile.stats') }}
            </router-link>
            <router-link to="/admin/operations" :class="$route.path.includes('operations') ? 'active' : ''"
              class="profile-operations flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
              <SvgComponent :svgKey="SVG.TRANSACTIONS" />
              {{ $t('profile.operations') }}
            </router-link>
          </div>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { SVG } from '../../components/svg/Enum';
import SvgComponent from '../../components/svg/Svg.vue';
export default {
  name: 'Admin',
  components: {
    SvgComponent
  },
  data() {
    return {
      SVG
    };
  },
  mounted() {
    if (!this.$root.checkAuth()) {
      this.$router.push({ name: 'auth' });
      return;
    }
  }
}
</script>
