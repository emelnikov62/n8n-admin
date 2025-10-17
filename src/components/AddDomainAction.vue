<template>
    <div
        class="full-height padding-10 gap-10 full-width flex flex-column align-items-center justify-start back-static block border-radius-content opacity-full">
        <div
            class="overflow-y actions-data relative back-static back block full-height gap-0 padding-0 full-width flex flex-column align-items-start justify-start opacity-full">
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">{{ $t('profile.action_integration_type_row') }}</span>
                    <select v-model="integrationTypeRow" @change="changeIntegrationTypeRow($event)"
                        class="input back-static lex-1 full-width input-skin-price height-40 border-radius-10 padding-left-10 padding-right-10">
                        <option disabled selected value="-1">
                            {{ $t('profile.action_integration_type_row') }}
                        </option>
                        <option value="insert">{{ $t('profile.action_insert') }}</option>
                        <option value="update">{{ $t('profile.action_update') }}</option>
                        <option value="delete">{{ $t('profile.action_delete') }}</option>
                    </select>
                </div>
            </div>
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">{{ $t('profile.action_name') }}</span>
                    <input type="text"
                        class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                        v-model="name" :placeholder="$t('profile.action_name')" />
                </div>
            </div>
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">{{ $t('profile.action_key') }}</span>
                    <input type="text"
                        class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                        v-model="key" :placeholder="$t('profile.action_key')" />
                </div>
            </div>
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">{{ $t('profile.action_fields') }}</span>
                    <button @click="addField" type="button"
                        class="button gap-5 flex flex-row padding-10 width-100 back-static back block height-40 upper font-bold fs-10 border-[main-color] gradient-bs">
                        <SvgComponent :svgKey="SVG.KEY" />
                        {{ $t('profile.add') }}
                    </button>
                    <div v-for="field in fields" v-bind:key="field"
                        class="flex flex-row gap-10 align-items-center justify-center full-width">
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_field_name') }}</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="field.name" :placeholder="$t('profile.action_field_name')" />
                        </div>
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_field_key') }}</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="field.key" :placeholder="$t('profile.action_field_key')" />
                        </div>
                        <div class="flex flex-row align-items-end justify-end full-h-content">
                            <button @click="removeField(field)" type="button"
                                class="button gap-5 flex flex-row padding-10 width-60 back-static back block height-40 upper font-bold fs-10 border-[main-color] gradient-cl">
                                <SvgComponent :svgKey="SVG.TRASH" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="rows flex flex-row gap-10 justify-space-between align-items-start full-width padding-10">
                <div class="flex flex-1 flex-column gap-2">
                    <span class="title">{{ $t('profile.action_integration') }}</span>
                    <div class="rows flex flex-row gap-20 justify-space-between align-items-start full-width">
                        <div class="row full-width flex flex-column align-items-center justify-center gap-10">
                            <div
                                class="border-dashed profile-nav full-width height-60 gap-2 flex-row back-static block flex align-items-center justify-center opacity-full">
                                <div :class="integrationTypeSelected == 2 ? 'active' : ''"
                                    @click="integrationTypeSelected = 2"
                                    class="profile-general gap-10 fs-12 svg-[20] font-bold back-opacity-60 back upper flex-1 white full-height block flex flex-row align-items-center justify-center">
                                    <SvgComponent :svgKey="SVG.POSTGRES" />
                                    {{ $t('profile.domain_action_pg') }}
                                </div>
                                <div :class="integrationTypeSelected == 1 ? 'active' : ''"
                                    @click="integrationTypeSelected = 1"
                                    class="profile-inventory flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
                                    <SvgComponent :svgKey="SVG.EXCEL" />
                                    {{ $t('profile.domain_action_excel') }}
                                </div>
                                <div :class="integrationTypeSelected == 3 ? 'active' : ''"
                                    @click="integrationTypeSelected = 3"
                                    class="profile-inventory flex-1 fs-12 font-bold gap-10 back back-opacity-60 upper white full-height block flex flex-row align-items-center justify-center">
                                    <SvgComponent :svgKey="SVG.HTTP" />
                                    {{ $t('profile.domain_action_http') }}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div v-if="integrationTypeSelected == 1" class="padding-top-10 flex flex-column gap-10 full-width">
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_sheet_id') }}</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="integrationTypes.excel.sheet_id"
                                :placeholder="$t('profile.action_sheet_id')" />
                        </div>
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_sheet_range') }}</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="integrationTypes.excel.sheet_range"
                                :placeholder="$t('profile.action_sheet_range')" />
                        </div>
                    </div>
                    <div v-if="integrationTypeSelected == 3" class="padding-top-10 flex flex-column gap-10 full-width">
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_postgres_url') }} - POST</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="integrationTypes.rest.url" :placeholder="$t('profile.action_postgres_url')" />
                        </div>
                        <div class="flex flex-1 flex-column gap-2" v-if="fields.length > 0">
                            <span class="title">{{ $t('profile.action_rest_body') }}</span>
                            <span class="main">
                                {{'{"data": ' + JSON.stringify(JSON.parse('{' + fields.filter(f => f.key).map(f =>
                                    `"${f.key}": "value"`).join(',')
                                    + '}')) + '}'}}
                            </span>
                        </div>
                        <div class="flex flex-1 flex-column gap-2" v-else>
                            <span class="main red">{{ $t('profile.action_empty_fields') }}</span>
                        </div>
                    </div>
                    <div v-if="integrationTypeSelected == 2" class="padding-top-10 flex flex-column gap-10 full-width">
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_url') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.url"
                                    :placeholder="$t('profile.action_postgres_url')" />
                            </div>
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_port') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.port"
                                    :placeholder="$t('profile.action_postgres_port')" />
                            </div>
                        </div>
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_db') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.db" :placeholder="$t('profile.action_postgres_db')" />
                            </div>
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_schema') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.schema"
                                    :placeholder="$t('profile.action_postgres_schema')" />
                            </div>
                        </div>
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_login') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.login"
                                    :placeholder="$t('profile.action_postgres_login')" />
                            </div>
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_password') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.password"
                                    :placeholder="$t('profile.action_postgres_password')" />
                            </div>
                        </div>
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_table') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypes.pg.table"
                                    :placeholder="$t('profile.action_postgres_table')" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="processAction" type="button" v-if="!load"
            class="button gap-5 flex flex-row padding-10 back-static back block height-60 upper font-bold fs-10 border-[main-color] gradient-fresh-block full-width">
            <SvgComponent :svgKey="SVG.EDIT" />
            {{ !data ? $t('profile.add_action') : $t('profile.edit_action') }}
        </button>
        <div class="loader-container full-width height-60 flex-column align-items-center justify-center flex" v-else>
            <span class="loader"></span>
        </div>
    </div>
</template>

<script>
import { SVG } from './svg/Enum';
import SvgComponent from './svg/Svg.vue';
export default {
    props: ['className', 'data'],
    components: {
        SvgComponent
    },
    data() {
        return {
            SVG,
            name: null,
            key: null,
            fields: [],
            load: false,
            integrationTypeSelected: '2',
            integrationTypeRow: '-1',
            integrationTypes: {
                pg: {
                    type_id: 2,
                    id: null,
                    url: null,
                    port: null,
                    db: null,
                    schema: null,
                    login: null,
                    password: null,
                    table: null
                },
                excel: {
                    type_id: 1,
                    sheet_id: null,
                    sheet_range: null,
                    id: null
                },
                rest: {
                    type_id: 3,
                    url: null,
                    id: null
                }
            }
        }
    },
    mounted() {
        if (this.data) {
            this.fields = this.data.fields;
            this.name = this.data.name;
            this.key = this.data.key;
            this.integrationTypeRow = this.data.type_row;

            if (this.data.integration_pg) {
                this.integrationTypes.pg = {
                    type_id: this.data.integration_pg[0].type_id,
                    id: this.data.integration_pg[0].integration_id,
                    url: this.data.integration_pg[0].host,
                    port: this.data.integration_pg[0].port,
                    db: this.data.integration_pg[0].database,
                    schema: this.data.integration_pg[0].schema,
                    login: this.data.integration_pg[0].login,
                    password: this.data.integration_pg[0].password,
                    table: this.data.integration_pg[0].table
                };
            }

            if (this.data.integration_rest) {
                this.integrationTypes.rest = {
                    type_id: this.data.integration_rest[0].type_id,
                    url: this.data.integration_rest[0].host,
                    id: this.data.integration_rest[0].integration_id
                };
            }

            if (this.data.integration_excel) {
                this.integrationTypes.excel = {
                    type_id: this.data.integration_excel[0].type_id,
                    sheet_id: this.data.integration_excel[0].sheet_id,
                    sheet_range: this.data.integration_excel[0].range,
                    id: this.data.integration_excel[0].integration_id
                };
            }
        }
    },
    methods: {
        changeIntegrationTypeRow(event) {
            this.integrationTypeRow = event.target.value;
        },
        addField() {
            this.fields.push({});
        },
        removeField(field) {
            this.fields.splice(field, 1);
        },
        processAction() {
            if (!this.name || !this.key || this.fields.length == 0 || !this.validateIntegration() || this.integrationTypeRow == -1) {
                this.$root.showAlert('error', this.$t('profile.action_valid_error'));
                return;
            }

            if (this.integrationTypes.rest && !this.integrationTypes.rest.url) {
                this.integrationTypes.rest = null;
            }

            if (this.integrationTypes.pg && !this.integrationTypes.pg.url) {
                this.integrationTypes.pg = null;
            }

            if (this.integrationTypes.excel && !this.integrationTypes.excel.sheet_id) {
                this.integrationTypes.excel = null;
            }

            this.saveAction();
        },
        saveAction() {
            this.load = true;
            var method = this.data ? 'user/domains/actions/edit' : 'user/domains/actions/add';
            this.$root.$http.post(method, {
                name: this.name,
                key: this.key,
                fields: this.fields,
                type_row: this.integrationTypeRow,
                integrations: this.integrationTypes,
                id: this.data ? this.data.id : this.$route.params.id,
                client_id: this.$route.params.id
            }).then(res => {
                let data = res.data;

                if (data.success) {
                    this.$root.emit('hideModal');
                    this.$root.emit('updateDomainAction');
                    this.$root.showAlert('success', this.$t('profile.action_change_success'));
                } else {
                    this.$root.showAlert('error', this.$t(data.message));
                    this.load = false;
                }
            }).catch(err => {
                console.log(JSON.stringify(err));
                this.load = false;
            });
        },
        validateIntegration() {
            if (!this.integrationTypes.excel.sheet_id
                && !this.integrationTypes.excel.sheet_range
                && !this.integrationTypes.rest.url
                && !this.integrationTypes.pg.url
                && !this.integrationTypes.pg.port
                && !this.integrationTypes.pg.db
                && !this.integrationTypes.pg.schema
                && !this.integrationTypes.pg.login
                && !this.integrationTypes.pg.password
                && !this.integrationTypes.pg.table
            ) {
                return false;
            }

            var checkExcel = true;
            var checkPg = true;

            if (!this.integrationTypes.excel.sheet_id && !this.integrationTypes.excel.sheet_range) {
                checkExcel = true;
            } else {
                if (!this.integrationTypes.excel.sheet_id || !this.integrationTypes.excel.sheet_range) {
                    checkExcel = false;
                }
            }

            if (!this.integrationTypes.pg.url
                && !this.integrationTypes.pg.port
                && !this.integrationTypes.pg.db
                && !this.integrationTypes.pg.schema
                && !this.integrationTypes.pg.login
                && !this.integrationTypes.pg.password
                && !this.integrationTypes.pg.table) {
                checkPg = true;
            } else {
                if (!this.integrationTypes.pg.url
                    || !this.integrationTypes.pg.port
                    || !this.integrationTypes.pg.db
                    || !this.integrationTypes.pg.schema
                    || !this.integrationTypes.pg.login
                    || !this.integrationTypes.pg.password
                    || !this.integrationTypes.pg.table) {
                    checkPg = false;
                }
            }

            return checkPg && checkExcel;
        }
    }
}
</script>
