<template>
  <div class="flex flex-column full-width gap-10 profile-general-container full-height" v-if="!loading">
    <div class="rows flex flex-row gap-20 justify-space-between align-items-center full-width general-top">
      <div class="row width-70 height-160 flex flex-column align-items-center justify-center">
        <div
          class="general-top-container padding-10 block back-static flex-column full-height full-width opacity-full flex align-items-center justify-space-between">
          <div class="general-top-container-top flex flex-row full-width justify-space-between align-items-start">
            <div class="flex flex-row align-items-center gap-20">
              <img v-if="domain && domain.logo" :src="'data:' + domain.logo.mimeType + ';base64, ' + domain.logo.data"
                class="block profile-img" />
              <img v-else src="../../../public/images/logo-new.png" class="block profile-img" />
              <span class="white font-bold">{{ domain.domain }}</span>
            </div>
            <div class="flex flex-row align-items-center flex-1 justify-end">
              <div
                class="border-dashed fs-14 gap-10 upper back back-static block padding-10 flex flex-row height-45 align-items-center justify-center">
                <span class="title fs-14">ID: </span>
                <span class="main orange fs-14">{{ domain.id }}</span>
                <span class="flex-1 flex flex-row align-items-center justify-end" @click="$root.copy(domain.id)">
                  <SvgComponent :svgKey="SVG.COPY" />
                </span>
              </div>
            </div>
          </div>
          <div class="general-top-container-bottom flex flex-row full-width justify-space-between align-items-end">
            <div class="flex flex-row align-items-center gap-10">
              <div class="flex flex-row gap-10 align-items-center justify-center back back-static block border-dashed ">
                <button @click="changeLogo" type="button"
                  class="button flex flex-row gap-10 padding-10 flex-1 height-45 upper font-bold fs-10">
                  <div class="flex flex-row gap-5 align-items-center justify-center full-height">
                    <SvgComponent :svgKey="SVG.LINK" />
                    <span>{{ $t('profile.logo_file') }}</span>
                  </div>
                  <div
                    class="trade-status block back-static padding-10 back flex flex-row gap-5 align-items-center justify-center"
                    :class="domain.logo ? 'trade-status-success' : 'trade-status-x'">
                    <SvgComponent :svgKey="SVG.ARROW_SUCCESS" v-if="domain.logo" />
                    <SvgComponent :svgKey="SVG.X" v-else />
                    {{ domain.logo != null ? $t('profile.logo_success')
                      : $t('profile.logo_fail') }}
                  </div>
                </button>
              </div>
            </div>
            <div class="flex flex-row align-items-center flex-1 justify-end">
              <button @click="this.$router.push({ name: 'admin-domains', params: { type: 'active' } })" type="button"
                class="border-dashed button gap-5 flex flex-row padding-10 back-static back block height-45 upper font-bold fs-10">
                <SvgComponent :svgKey="SVG.EXIT" />{{ $t('profile.to_domains_list') }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="row width-30 height-160 flex flex-row flex-1 align-items-center justify-space-between block back-static opacity-full">
        <div class="flex-column full-height flex gap-5 padding-20 align-items-start justify-start">
          <div class="padding-10">
            <CashCoin :cash="domain.tokens - domain.used_tokens"
              :className="'white fs-20 font-bold gap-5 align-items-center svg-[20]'" />
            <span class="title fs-14">{{ $t('profile.availible_tokens') }}</span>
          </div>
          <div class="padding-10">
            <CashCoin :cash="domain.used_tokens"
              :className="'white fs-20 font-bold gap-5 align-items-center svg-[20]'" />
            <span class="title fs-14">{{ $t('profile.used_tokens') }}</span>
          </div>
        </div>
        <div class="padding-10">
          <div class="flex flex-1 flex-column align-items-start justify-end">
            <button type="button"
              class="button back-static gradient-main-block padding-10 flex width-150 flex-row gap-5 back block height-45 upper font-bold fs-12">
              <SvgComponent :svgKey="SVG.STAR" />{{ $t('header.deposit') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width full-height">
      <div class="row full-width flex flex-column align-items-center justify-center gap-10 full-height">
        <div
          class="border-dashed profile-nav full-width height-60 gap-2 flex-row back-static block flex align-items-center justify-center opacity-full">
          <router-link :to="{ name: 'admin-domain-settings-main' }"
            :class="$route.path.includes('settings-main') ? 'active' : ''"
            class="profile-general gap-10 fs-12 svg-[20] font-bold back-opacity-60 back upper flex-1 white full-height block flex flex-row align-items-center justify-center">
            <SvgComponent :svgKey="SVG.PROFILE" />
            {{ $t('profile.domain_general') }}
          </router-link>
          <router-link :to="{ name: 'admin-domain-settings-actions' }"
            :class="$route.path.includes('settings-actions') ? 'active' : ''"
            class="profile-inventory flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
            <SvgComponent :svgKey="SVG.FAST_TRADE" />
            {{ $t('profile.domain_actions') }}
          </router-link>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
  <div class="loader-container full-width full-height flex-column align-items-center justify-center flex"
    v-if="loading">
    <span class="loader"></span>
  </div>
</template>

<script>
import CashCoin from '@/components/CashCoin.vue';
import { SVG } from '../../components/svg/Enum';
import SvgComponent from '../../components/svg/Svg.vue';
export default {
  name: 'AdminDomain',
  components: {
    SvgComponent, CashCoin
  },
  data() {
    return {
      loading: true,
      domain: null,
      SVG
    };
  },
  watch: {
  },
  methods: {
    changeLogo() {
      this.$root.emit('showModal', {
        header: this.$t('profile.logo_file'),
        component: 'UploadDomainLogo',
        back: true,
        data: this.domain.id,
        classWindow: 'create-promocode-window',
        clear: true
      });
    },
    getDomain() {
      this.loading = true;
      this.$root.$http.post('/user/domains/get', {
        id: this.$route.params.id
      }).then(res => {
        if (res.data.success) {
          this.domain = res.data.data;
        }

        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    updateField(table, field, value, key, keyValue) {
      this.$root.$http.post('/user/domains/update', {
        table: table,
        key: key,
        key_value: keyValue,
        field: field,
        value: value
      }).then(res => {
        if (res.data.success) {
          this.getDomain();
        } else {
          this.loading = false;
          this.$root.showAlert('error', this.$t(res.data.message));
        }
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    }
  },
  mounted() {
    this.getDomain();

    this.$root.on('updateDomain', () => {
      this.getDomain();
    });
  },
}
</script>
