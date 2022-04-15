<template>
  <div class="pb-1">
    <b-card
      v-if="$store.state.websiteSelector.selectedWebsiteId"
      no-body
      class="mb-4 col-md-12 mx-auto"
    >
      <div class="card-header">
        <!-- Title & SubTitle -->
        <div>
          <b-card-title>Rebate Settings</b-card-title>
        </div>
      </div>

      <b-card-body>

        <b-form @submit.prevent="save">
          <b-row>
            <!-- rebate.content -->
            <b-col cols="12">
              <b-form-group
                label="Rebate Content:"
                label-for="h-rebate_content"
                label-cols-md="12"
              >
                <quill-editor
                  v-model="rebate.content"
                  :options="snowOption"
                />
                <small
                  v-for="error in errors.content"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- is_active -->
            <b-col
              md="8"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-is_active"
                  v-model="rebate.is_active"
                  name="checkbox-is_active"
                >
                  Rebate Enable / Rebate Disable
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <!-- is_shown -->
            <b-col
              md="8"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-is_shown"
                  v-model="rebate.is_shown"
                  name="checkbox-is_shown"
                >
                  Show In Page Website
                </b-form-checkbox>
              </b-form-group>
            </b-col>
          </b-row>

          <b-table-simple
            hover
            small
            caption-top
            responsive
          >
            <b-thead>
              <b-tr>
                <b-th width="20%">
                  Game
                </b-th>
                <b-th>Rebate Percentage</b-th>
                <b-th width="10%">
                  Pay Out By
                </b-th>
                <b-th>Min Amount</b-th>
                <b-th>Max Amount</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="setting in rebateSettings"
                :key="setting.id"
              >
                <b-td> {{ setting.game_category.title }}</b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.percentage_level_0"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-select
                    v-model="setting.pay_out_by"
                    :options="[{value:0, text: 'Daily'}, {value:1, text: 'Weekly'}]"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.min_amount"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.max_amount"
                    type="number"
                    step="any"
                  />
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-row>
            <b-col
              class="mt-1 text-center"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                :disabled="loading || !canSave"
                type="submit"
                variant="primary"
                class=""
              >
                <b-spinner
                  v-if="
                    loading"
                  small
                  class="mr-1"
                />
                Save
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>

    <b-card
      v-else
      class="mb-0 bg-danger text-white"
    >
      Please select website first.
    </b-card>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BForm, BButton, BFormGroup, BFormInput, BSpinner, BFormSelect, BFormCheckbox,
  BCard, BCardTitle, BCardBody,
  BTableSimple, BThead, BTr, BTbody, BTd, BTh,
} from 'bootstrap-vue'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BSpinner,
    BFormSelect,
    BFormCheckbox,
    BCard,
    BCardTitle,
    BCardBody,

    BTableSimple,
    BThead,
    BTr,
    BTbody,
    BTd,
    BTh,

    quillEditor,
  },
  directives: {
    Ripple,
  },
  mixins: [
  ],
  data() {
    return {
      loading: false,
      rebate: {},
      rebateSettings: [],
      errors: {},

      snowOption: {
        theme: 'snow',
      },
    }
  },
  computed: {
    canSave() {
      return true
    },
    selectedWebsiteId() {
      return this.$store.state.websiteSelector.selectedWebsiteId
    },
  },
  watch: {
    selectedWebsiteId() {
      this.getRebateSettings()
    },
  },
  created() {
    this.getRebateSettings()
  },
  methods: {
    async getRebateSettings() {
      if (!this.selectedWebsiteId) return

      this.loading = true
      const { data } = await this.$http.get(`api/admin/rebate_settings/${this.selectedWebsiteId}`)
      const { settings, ...rebate } = data
      this.rebate = rebate
      this.rebateSettings = settings
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = {
          ...this.rebate,
          rebate_settings: this.rebateSettings,
        }
        await this.$http.post(`api/admin/rebate_settings/${this.selectedWebsiteId}`, payload)
        this.$notifySuccess('Successfully Saved Settings!')
        this.errors = {}
      } catch (err) {
        if (err.response && err.response.status === 422) {
          this.errors = { ...err.response.data.errors }
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
