<template>
  <div class="flex flex-column full-width full-height block gap-10">
    <div class="rows flex flex-row gap-20 justify-space-between align-items-start full-width">
      <div class="row full-width flex flex-column align-items-center justify-center gap-10">
        <div
          class="border-dashed profile-nav full-width height-60 gap-2 flex-row back-static block flex align-items-center justify-center opacity-full">
          <router-link :to="{ name: 'admin-domains', params: { type: 'active' } }"
            :class="$route.path.includes('active') ? 'active' : ''"
            class="profile-general gap-10 fs-12 svg-[20] font-bold back-opacity-60 back upper flex-1 white full-height block flex flex-row align-items-center justify-center">
            <SvgComponent :svgKey="SVG.ARROW_SUCCESS" />
            Активные
          </router-link>
          <router-link :to="{ name: 'admin-domains', params: { type: 'disable' } }"
            :class="$route.path.includes('disable') ? 'active' : ''"
            class="profile-inventory flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
            <SvgComponent :svgKey="SVG.X" />
            Не активные
          </router-link>
        </div>
      </div>
    </div>
    <div class="flex flex-row gap-10 full-width align-items-center justify-center">
      <button @click="create"
        class="button button-set-bet gradient-main-block height-40 flex auto flex-row align-items-start">
        <div class="flex flex-row gap-5 align-items-center">
          <SvgComponent :svgKey="SVG.MARKET" />
          <span class="upper fs-12">Добавить домен</span>
        </div>
      </button>
      <div class="align-items-center justify-center relative flex flex-1 flex-row align-items-center justify-center">
        <input type="text"
          class="input flex-1 full-width back-static padding-left-40 padding-right-40 input-skin-price height-40 border-radius-10"
          v-model="search" placeholder="Наименование" />
        <div class="absolute left-10">
          <SvgComponent :svgKey="SVG.SEARCH" />
        </div>
        <div class="absolute right-10 cursor" @click="clearFilter" v-if="search">
          <SvgComponent :svgKey="SVG.X" />
        </div>
      </div>
    </div>
    <div class="loader-container full-width full-height flex-column align-items-center justify-center flex"
      v-if="loading">
      <span class="loader"></span>
    </div>
    <div class="overflow overflow-y height-500 full-width gap-5 flex flex-column block items-scroll"
      v-else-if="domains.length > 0">
      <div v-for="domain in domains" v-bind:key="domain"
        class="flex cursor flex-row full-width align-items-start justify-space-between back-static block bet history-bet opacity-full">
        <div
          class="flex cursor flex-row full-width align-items-center overflow justify-space-between back-static block bet padding-10">
          <div class="flex flex-row gap-5 align-items-center justify-center width-100">
            <div @click="changeLogo(domain)"
              class="button button-set-bet gradient-bs height-30 flex flex-row align-items-center justify-center">
              <div class="flex flex-row gap-5 align-items-center full-width">
                <SvgComponent :svgKey="SVG.EDIT" />
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-10 align-items-center justify-start full-height full-width">
            <div class="loader-container full-height flex-column align-items-center justify-center flex"
              v-if="domain.load">
              <span class="loader"></span>
            </div>
            <div v-else>
              <img :src="'data:' + domain.logo.mimeType + ';base64, ' + domain.logo.data" v-if="domain.logo" />
              <img src="../../../public/images/logo-new.png" v-else />
            </div>
            <div class="flex flex-column gap-5">
              <span class="main upper">{{ domain.domain }}</span>
              <span class="title fs-12">
                <CashCoin :cash="domain.tokens" />
              </span>
            </div>
          </div>
          <div class="flex flex-column gap-2 align-items-start justify-center full-height width-150">
            <span class="main overflow-text">
              <CashCoin :cash="domain.used_tokens ? domain.used_tokens : 0" />
            </span>
            <span class="title fs-12">использовано</span>
          </div>
          <div class="flex flex-column gap-2 align-items-start justify-center full-height width-150">
            <span class="main overflow-text">
              <CashCoin :cash="domain.tokens - domain.used_tokens" />
            </span>
            <span class="title fs-12">осталось</span>
          </div>
          <div @click="updateField('n8n_schema.clients', 'active', false, 'id', domain.id,)" v-if="domain.active == 1"
            class="button button-set-bet gradient-alert-error height-45 min-width-180 flex flex-row align-items-center justify-center">
            <div class="flex flex-row gap-5 align-items-center full-width">
              <SvgComponent :svgKey="SVG.X" />
              <span class="upper fs-12 font-bold">Деактивировать</span>
            </div>
          </div>
          <div @click="updateField('n8n_schema.clients', 'active', true, 'id', domain.id,)" v-if="domain.active == 0"
            class="button button-set-bet gradient-alert-success height-45 min-width-180 flex flex-row align-items-center justify-center">
            <div class="flex flex-row gap-5 align-items-center full-width">
              <SvgComponent :svgKey="SVG.ARROW_SUCCESS" />
              <span class="upper fs-12 font-bold">Активировать</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-row align-items-center justify-center full-height">
      <span class="main back back-static block padding-10">Домены не найдены</span>
    </div>
  </div>
</template>

<script>
import CashCoin from '@/components/CashCoin.vue';
import { SVG } from '../../components/svg/Enum';
import SvgComponent from '../../components/svg/Svg.vue';
export default {
  name: 'AdminMain',
  components: {
    SvgComponent, CashCoin
  },
  data() {
    return {
      loading: true,
      search: null,
      domains: [],
      SVG
    };
  },
  watch: {
    'search': function () {
      this.getDomains();
    },
    '$route.params.type': function () {
      this.getDomains();
    },
    '$route.params.active': function () {
      this.getDomains();
    }
  },
  methods: {
    clearFilter() {
      this.search = null;
    },
    changeLogo(domain) {
      this.$root.emit('showModal', {
        header: this.$t('profile.logo_file'),
        component: 'UploadDomainLogo',
        back: true,
        data: domain.id,
        classWindow: 'create-promocode-window',
        clear: true
      });
    },
    create() {
      this.$root.emit('showModal', {
        header: 'Добавить домен',
        component: 'AddDomain',
        back: true,
        classWindow: 'create-promocode-window',
        clear: true
      });
    },
    getDomains() {
      this.loading = true;
      this.$root.$http.post('/user/domains/list', {
        search: this.search,
        id: this.$root.user.id,
        active: this.$route.params.type == 'active' ? true : false
      }).then(res => {
        this.domains = [];
        if (res.data[0].success) {
          JSON.parse(res.data[0].data).map(m => m.json).forEach(element => {
            element.load = true;
            this.domains.push(element);
            this.loadDomainLogo(element);
          });
        }

        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    loadDomainLogo(domain) {
      this.$root.$http.post('/user/domains/load-logo', { id: domain.id }).then(res => {
        if (res.data.success) {
          domain.logo = res.data.logo;
        }

        domain.load = false;
        this.$forceUpdate();
      }).catch(err => {
        console.log(err);
        this.domains.push(domain);
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
          this.getDomains();
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
    this.getDomains();

    this.$root.on('updateDomains', () => {
      this.getDomains();
    });
  },
}
</script>
