<template>
  <div class="flex flex-column full-width gap-20 profile-general-container" v-if="!loading">
    <div class="rows flex flex-row gap-20 justify-space-between align-items-center full-width general-top">
      <div class="row width-70 height-160 flex flex-column align-items-center justify-center">
        <div
          class="general-top-container padding-20 block back-static flex-column full-height full-width opacity-full block flex align-items-center justify-space-between">
          <div class="general-top-container-top flex flex-row full-width justify-space-between align-items-start">
            <div class="flex flex-row align-items-center gap-20">
              <img v-if="$root.user.logo" :src="'data:' + $root.user.logo.mimeType + ';base64, ' + $root.user.logo.data"
                class="block profile-img" />
              <img v-else src="../../../public/images/logo-new.png" class="block profile-img" />
              <span class="white font-bold">{{ $root.user.name }} {{ $root.user.surname }}</span>
            </div>
            <div class="flex flex-row align-items-center flex-1 justify-end">
              <div
                class="border-dashed fs-14 gap-10 upper back back-static block padding-10 flex flex-row height-45 align-items-center justify-center">
                <span class="title fs-14">ID: </span>
                <span class="main orange fs-14">{{ $root.user.id }}</span>
                <span class="flex-1 flex flex-row align-items-center justify-end" @click="$root.copy($root.user.id)">
                  <SvgComponent :svgKey="SVG.COPY" />
                </span>
              </div>
            </div>
          </div>
          <div class="general-top-container-bottom flex flex-row full-width justify-space-between align-items-end">
            <div class="flex flex-row align-items-center gap-10">
              <div class="flex flex-row gap-10 align-items-center justify-center back back-static block border-dashed ">
                <button @click="uploadLogo" type="button"
                  class="button flex flex-row gap-10 padding-10 flex-1 height-45 upper font-bold fs-10">
                  <div class="flex flex-row gap-5 align-items-center justify-center full-height">
                    <SvgComponent :svgKey="SVG.LINK" />
                    <span>{{ $t('profile.logo_file') }}</span>
                  </div>
                  <div
                    class="trade-status block back-static padding-10 back flex flex-row gap-5 align-items-center justify-center"
                    :class="$root.user.logo ? 'trade-status-success' : 'trade-status-x'">
                    <SvgComponent :svgKey="SVG.ARROW_SUCCESS" v-if="$root.user.logo" />
                    <SvgComponent :svgKey="SVG.X" v-else />
                    {{ $root.user.logo != null ? $t('profile.logo_success')
                      : $t('profile.logo_fail') }}
                  </div>
                </button>
              </div>
            </div>
            <div class="flex flex-row align-items-center flex-1 justify-end">
              <button @click="$root.exit" type="button"
                class="border-dashed button gap-5 flex flex-row padding-10 back-static back block height-45 upper font-bold fs-10">
                <SvgComponent :svgKey="SVG.EXIT" />{{ $t('profile.exit') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row width-30 height-160 flex flex-row flex-1 align-items-center justify-space-between block back-static opacity-full">
        <div class="flex-column full-height flex gap-5 padding-20 align-items-start justify-start">
          <div class="padding-10">
            <CashCoin :cash="$root.user.balance.toFixed(2)"
              :className="'white fs-20 font-bold gap-5 align-items-center svg-[20]'" />
            <span class="title fs-14">{{ $t('profile.balance_title') }}</span>
          </div>
          <div class="flex flex-1 flex-column align-items-start justify-end">
            <button type="button"
              class="button back-static gradient-main-block padding-10 flex width-150 flex-row gap-5 back block height-45 upper font-bold fs-12">
              <SvgComponent :svgKey="SVG.STAR" />{{ $t('header.deposit') }}
            </button>
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
import { SVG } from '../../components/svg/Enum';
import SvgComponent from '../../components/svg/Svg.vue';
import CashCoin from '@/components/CashCoin.vue';
export default {
  name: 'AdminMain',
  components: {
    SvgComponent, CashCoin
  },
  data() {
    return {
      loading: true,
      SVG
    };
  },
  mounted() {
    setTimeout(() => { this.loading = false; }, 100);
  },
  methods: {
    uploadLogo() {
      this.$root.emit('showModal', {
        header: this.$root.$t('profile.logo_file'),
        component: 'UploadUserLogo',
        back: true,
        data: {},
        classWindow: 'edit-trade-link-window'
      });
    }
  }
}
</script>
