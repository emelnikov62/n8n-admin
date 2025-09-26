<template>
    <div
        class="full-height padding-10 gap-10 full-width flex flex-column align-items-center justify-start back-static block border-radius-content opacity-full">
        <div
            class="overflow-y actions-data relative back-static back block full-height gap-0 padding-0 full-width flex flex-column align-items-start justify-start opacity-full">
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
                    <select v-model="integrationType" @change="changeIntegrationType($event)"
                        class="input back-static lex-1 full-width input-skin-price height-40 border-radius-10 padding-left-10 padding-right-10">
                        <option disabled selected value="-1">
                            {{ $t('profile.empty_integration_type') }}
                        </option>
                        <option v-for="type in integrationTypes" v-bind:key="type" :value="type.id">
                            {{ type.type }}
                        </option>
                    </select>
                    <div v-if="integrationType == 1" class="padding-top-10 flex flex-column gap-10 full-width">
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_sheet_id') }}</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="integrationTypeValue.sheet_id" :placeholder="$t('profile.action_sheet_id')" />
                        </div>
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_sheet_range') }}</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="integrationTypeValue.sheet_range"
                                :placeholder="$t('profile.action_sheet_range')" />
                        </div>
                    </div>
                    <div v-if="integrationType == 3" class="padding-top-10 flex flex-column gap-10 full-width">
                        <div class="flex flex-1 flex-column gap-2">
                            <span class="title">{{ $t('profile.action_postgres_url') }} - POST</span>
                            <input type="text"
                                class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                v-model="integrationTypeValue.url" :placeholder="$t('profile.action_postgres_url')" />
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
                    <div v-if="integrationType == 2" class="padding-top-10 flex flex-column gap-10 full-width">
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_url') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.url"
                                    :placeholder="$t('profile.action_postgres_url')" />
                            </div>
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_port') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.port"
                                    :placeholder="$t('profile.action_postgres_port')" />
                            </div>
                        </div>
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_db') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.db" :placeholder="$t('profile.action_postgres_db')" />
                            </div>
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_schema') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.schema"
                                    :placeholder="$t('profile.action_postgres_schema')" />
                            </div>
                        </div>
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_login') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.login"
                                    :placeholder="$t('profile.action_postgres_login')" />
                            </div>
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_password') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.password"
                                    :placeholder="$t('profile.action_postgres_password')" />
                            </div>
                        </div>
                        <div class="flex flex-row gap-10 full-width align-items-center justify-center">
                            <div class="flex flex-1 flex-column gap-2">
                                <span class="title">{{ $t('profile.action_postgres_table') }}</span>
                                <input type="text"
                                    class="input flex-1 full-width back-static padding-left-10 padding-right-10 input-skin-price height-40 border-radius-10"
                                    v-model="integrationTypeValue.table"
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
            integrationTypes: [],
            integrationType: "-1",
            integrationTypeValue: {}
        }
    },
    mounted() {
        this.getIntegrationTypes();

        if (this.data) {
            this.fields = this.data.fields;
            this.name = this.data.name;
            this.key = this.data.key;
            this.integrationType = this.data.type_id;

            if (this.integrationType == 2) {
                this.integrationTypeValue = {
                    type_id: this.data.type_id,
                    id: this.data.integration_id,
                    url: this.data.host,
                    port: this.data.port,
                    db: this.data.database,
                    schema: this.data.schema,
                    login: this.data.login,
                    password: this.data.password,
                    table: this.data.table
                };
            }

            if (this.integrationType == 3) {
                this.integrationTypeValue = {
                    type_id: this.data.type_id,
                    url: this.data.host,
                    id: this.data.integration_id
                };
            }

            if (this.integrationType == 1) {
                this.integrationTypeValue = {
                    type_id: this.data.type_id,
                    sheet_id: this.data.sheet_id,
                    sheet_range: this.data.range,
                    id: this.data.integration_id
                };
            }
        }
    },
    methods: {
        changeIntegrationType(event) {
            this.integrationTypeValue = { type_id: event.target.value };
        },
        getIntegrationTypes() {
            this.$root.$http.get('user/domains/actions/types')
                .then(res => {
                    let data = res.data;

                    if (data.success) {
                        data.data.forEach(element => {
                            this.integrationTypes.push({ id: element.json.id, type: element.json.type });
                        });
                    } else {
                        this.$root.showAlert('error', this.$t(data.message));
                        this.$root.emit('hideModal');
                        return;
                    }
                }).catch(err => {
                    console.log(JSON.stringify(err));
                });
        },
        addField() {
            this.fields.push({});
        },
        removeField(field) {
            this.fields.splice(field, 1);
        },
        processAction() {
            if (!this.name || !this.key || this.fields.length == 0 || !this.validPostgreFields() || !this.validRestFields() || !this.validExcelFields()) {
                this.$root.showAlert('error', this.$t('profile.action_valid_error'));
                return;
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
                integration: this.integrationTypeValue,
                id: this.data ? this.data.id : this.$route.params.id
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
        validPostgreFields() {
            if (!this.integrationTypeValue) {
                return false;
            }

            if (this.integrationType != 2) {
                return true;
            }

            if (!this.integrationTypeValue.url
                || !this.integrationTypeValue.port
                || !this.integrationTypeValue.db
                || !this.integrationTypeValue.schema
                || !this.integrationTypeValue.login
                || !this.integrationTypeValue.password
                || !this.integrationTypeValue.table) {
                return false;
            }

            return true;
        },
        validRestFields() {
            if (!this.integrationTypeValue) {
                return false;
            }

            if (this.integrationType != 3) {
                return true;
            }

            if (!this.integrationTypeValue.url) {
                return false;
            }

            return true;
        },
        validExcelFields() {
            if (!this.integrationTypeValue) {
                return false;
            }

            if (this.integrationType != 1) {
                return true;
            }

            if (!this.integrationTypeValue.sheet_id || !this.integrationTypeValue.sheet_range) {
                return false;
            }

            return true;
        }
    }
}
</script>
