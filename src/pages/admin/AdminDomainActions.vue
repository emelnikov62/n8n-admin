<template>
  <div class="flex flex-column full-width gap-20 profile-general-container padding-top-0 full-height">
    <div class="rows flex flex-row gap-20 justify-space-between align-items-start full-width general-top full-height">
      <div class="flex flex-column full-width justify-space-between align-items-start gap-5 full-height">
        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
          <div class="flex flex-column align-items-start justify-start">
            <button type="button" @click="addAction"
              class="button back-static gradient-main-block padding-10 flex width-200 flex-row gap-5 back block height-40 upper font-bold fs-12">
              <SvgComponent :svgKey="SVG.FAST_TRADE" />{{ $t('profile.add_action') }}
            </button>
          </div>
          <div
            class="align-items-center justify-center relative flex flex-1 flex-row align-items-center justify-center">
            <input type="text"
              class="input flex-1 full-width back-static padding-left-40 padding-right-40 input-skin-price height-40 border-radius-10"
              v-model="search" :placeholder="$t('profile.filter_placeholder')" />
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
          v-else-if="actions.length != 0">
          <div v-for="action in actions" v-bind:key="action"
            class="flex cursor flex-row full-width align-items-start justify-space-between back-static block bet history-bet opacity-full">
            <div
              class="flex cursor flex-row gap-5 full-width align-items-center overflow justify-space-between back-static block bet padding-10">
              <div class="flex flex-row gap-10 align-items-center justify-start full-height full-width">
                <div @click="editAction(action)"
                  class="button button-set-bet gradient-alert-success height-45 min-width-40 flex flex-row align-items-center justify-center">
                  <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                    <SvgComponent :svgKey="SVG.EDIT" />
                  </div>
                </div>
                <div class="flex flex-column gap-5">
                  <span class="main upper">{{ action.name }}</span>
                  <span class="title fs-12">
                    {{ action.key }}
                  </span>
                </div>
              </div>
              <div v-if="action.integration_pg && action.integration_pg[0].type_id && action.integration_pg[0].host"
                class="button button-set-bet gradient-empty height-45 width-60 flex flex-row align-items-center justify-center">
                <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                  <SvgComponent :svgKey="SVG.POSTGRES" />
                </div>
              </div>
              <div
                v-if="action.integration_excel && action.integration_excel[0].type_id && action.integration_excel[0].sheet_id"
                class="button button-set-bet gradient-empty height-45 width-60 flex flex-row align-items-center justify-center">
                <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                  <SvgComponent :svgKey="SVG.EXCEL" />
                </div>
              </div>
              <div
                v-if="action.integration_rest && action.integration_rest[0].type_id && action.integration_rest[0].host"
                class="button button-set-bet gradient-empty height-45 width-60 flex flex-row align-items-center justify-center">
                <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                  <SvgComponent :svgKey="SVG.HTTP" />
                </div>
              </div>
              <div @click="updateField('n8n_schema.actions', 'active', false, 'id', action.id,)"
                v-if="action.active == 1"
                class="button button-set-bet gradient-alert-error height-45 min-width-180 flex flex-row align-items-center justify-center">
                <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                  <span class="upper fs-12 font-bold">{{ $t('profile.not_active_domain_btn') }}</span>
                </div>
              </div>
              <div @click="updateField('n8n_schema.actions', 'active', true, 'id', action.id,)"
                v-if="action.active == 0"
                class="button button-set-bet gradient-alert-success height-45 min-width-180 flex flex-row align-items-center justify-center">
                <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                  <span class="upper fs-12 font-bold">{{ $t('profile.active_domain_btn') }}</span>
                </div>
              </div>
              <div @click="removeAction(action.id)"
                class="button button-set-bet gradient-cl height-45 width-60 flex flex-row align-items-center justify-center">
                <div class="flex flex-row gap-5 align-items-center justify-center full-width">
                  <SvgComponent :svgKey="SVG.TRASH" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="flex flex-row align-items-center justify-center full-height full-width">
          <span class="main back back-static block padding-10">{{ $t('profile.actions_not_found') }}</span>
        </div>
      </div>
    </div>
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
      actions: [],
      search: null,
      SVG
    };
  },
  watch: {
    'search': function () {
      this.getDomainActions();
    }
  },
  methods: {
    clearFilter() {
      this.search = null;
    },
    addAction() {
      this.$root.emit('showModal', {
        header: this.$t('profile.add_action'),
        component: 'AddDomainAction',
        back: true,
        classWindow: 'create-promocode-window actions-window',
        clear: true
      });
    },
    getDomainActions() {
      this.loading = true;
      this.$root.$http.post('user/domains/actions', {
        id: this.$route.params.id,
        search: this.search
      }).then(res => {
        this.actions = [];
        if (res.data.success) {
          res.data.data.forEach(element => {
            this.actions.push(element.json);
          });

          // var message = '';
          // var actionsHeader = '';
          // var actionsStatus = '';
          // var fieldsList = '';
          // this.actions.filter(f => f.active).forEach(action => {
          //   actionsHeader += `${action.name} - запрашивать: ` + action.fields.map(field => {
          //     return `${field.name}`
          //   }).join(',') + ', если не были предоставлены ранее.'
          //   actionsStatus += `${action.key} - если все данные введены для ${action.name} и клиент их подтвердил`;
          //   fieldsList += action.fields.map(field => {
          //     return `\n"${field.key}": <${field.name}>`;
          //   }).join(',');
          // });

          // message += actionsHeader;
          // message += '\nВсегда возвращай ответ от бота.\nВозвращай ответ всегда в JSON формате:';
          // message += '\n{';
          // message += '\n"output": <текст ответа бота>,';
          // message += `\n"action": <${actionsStatus}, иначе null>,`;
          // message += `\n"fields": {${fieldsList}\n}`;
          // message += '\n}';

          // console.log(message);
        }

        this.loading = false;
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
    editAction(action) {
      this.$root.emit('showModal', {
        header: this.$t('profile.edit_action'),
        component: 'AddDomainAction',
        data: action,
        back: true,
        classWindow: 'create-promocode-window actions-window',
        clear: true
      });
    },
    removeAction(id) {
      this.loading = true;
      this.$root.$http.post('user/domains/actions/remove', {
        id: id, client_id: this.$route.params.id
      }).then(res => {
        if (res.data.success) {
          this.getDomainActions();
        } else {
          this.loading = false;
          this.$root.showAlert('error', this.$t(res.data.message));
        }
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
          this.getDomainActions();
        } else {
          this.loading = false;
          this.$root.showAlert('error', this.$t(res.data.message));
        }
      }).catch(err => {
        console.log(err);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.getDomainActions();

    this.$root.on('updateDomainAction', () => {
      this.getDomainActions();
    });
  },
}
</script>
