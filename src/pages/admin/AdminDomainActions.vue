<template>
  <div class="flex flex-column full-width gap-20 profile-general-container padding-top-20" v-if="!loading">
    <div class="rows flex flex-row gap-20 justify-space-between align-items-center full-width general-top">
      <div class="general-top-container-top flex flex-column full-width justify-space-between align-items-start gap-10">
        <div class="flex flex-row align-items-center gap-10">
          <SvgComponent :svgKey="SVG.USER" />
          <span class="main fs-14 bold">Системный промпт агента</span>
        </div>
        <div class="flex flex-row align-items-center gap-10 full-width">
          <textarea class="full-width input-promo main padding-10" v-model="domain.systemMessage" rows="20"></textarea>
        </div>
        <div class="flex full-width flex-column align-items-end justify-end">
          <button type="button"
            class="button back-static gradient-main-block padding-10 flex width-150 flex-row gap-5 back block height-45 upper font-bold fs-12">
            <SvgComponent :svgKey="SVG.SAVE" />{{ $t('profile.save') }}
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="loader-container full-width full-height flex-column align-items-center justify-center flex padding-top-20"
    v-if="loading">
    <span class="loader"></span>
  </div>
</template>

<script>
import { SVG } from '../../components/svg/Enum';
import SvgComponent from '../../components/svg/Svg.vue';
export default {
  name: 'AdminDomainGeneralSettings',
  components: {
    SvgComponent
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
