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
          <b-card-title>Referral Settings</b-card-title>
        </div>
      </div>

      <b-card-body>

        <b-form @submit.prevent="save">
          <b-row>
            <!-- referral.content -->
            <b-col cols="12">
              <b-form-group
                label="Referral Content:"
                label-for="h-referral_content"
                label-cols-md="12"
              >
                <quill-editor
                  v-model="referral.content"
                  :options="snowOption"
                />
                <small
                  v-for="error in errors.content"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- referral.pay_period -->
            <b-col cols="12">
              <b-form-group
                label="Pay Period:"
                label-for="h-referral_pay_period"
                label-cols-md="1"
                label-cols-sm="4"
                label-cols-xs="12"
              >
                <b-form-select
                  id="h-referral_pay_period"
                  v-model="referral.pay_period"
                  :options="[{value:0, text: 'Weekly'}, {value:1, text: 'Monthly'}]"
                  class="col-xs-12 col-md-2"
                />
                <small
                  v-for="error in errors.pay_period"
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
                  v-model="referral.is_active"
                  name="checkbox-is_active"
                >
                  <template v-if="referral.is_active">
                    Referral Enabled
                  </template>
                  <template v-else>
                    Referral Disabled
                  </template>
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
                  v-model="referral.is_shown"
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
                  Game Category
                </b-th>
                <b-th>Min Commission</b-th>
                <b-th>Max Commission</b-th>
                <b-th>Referral Level (%)</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="setting in referralSettings"
                :key="setting.id"
              >
                <b-td> {{ setting.game_category.title }}</b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.min_commission"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.max_commission"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.referral_level"
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
      referral: {},
      referralSettings: [],
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
      this.getReferralSettings()
    },
  },
  created() {
    this.getReferralSettings()
  },
  methods: {
    async getReferralSettings() {
      if (!this.selectedWebsiteId) return

      this.loading = true
      const { data } = await this.$http.get(`api/admin/referral_settings/${this.selectedWebsiteId}`)
      const { settings, ...referral } = data
      this.referral = referral
      this.referralSettings = settings
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = {
          ...this.referral,
          referral_settings: this.referralSettings,
        }
        await this.$http.post(`api/admin/referral_settings/${this.selectedWebsiteId}`, payload)
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
