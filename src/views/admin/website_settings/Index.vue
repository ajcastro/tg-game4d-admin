<template>
  <div class="pb-1">
    <b-card
      v-if="$store.state.websiteSelector.selectedWebsiteId"
      no-body
      class="mb-4 col-md-8 mx-auto"
    >
      <div class="card-header">
        <!-- Title & SubTitle -->
        <div>
          <b-card-title>Website Settings</b-card-title>
        </div>
      </div>

      <b-card-body>

        <b-form @submit.prevent="save">
          <b-row>
            <!-- title -->
            <b-col cols="12">
              <b-form-group
                label="Website Title"
                label-for="v-title"
              >
                <b-form-input
                  id="v-title"
                  v-model="form.title"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.title = []"
                />
                <input-errors :errors="errors.title" />
              </b-form-group>
            </b-col>
            <!-- brand_name -->
            <b-col cols="12">
              <b-form-group
                label="Brand Name"
                label-for="v-brand_name"
              >
                <b-form-input
                  id="v-brand_name"
                  v-model="form.brand_name"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.brand_name = []"
                />
                <input-errors :errors="errors.brand_name" />
              </b-form-group>
            </b-col>

            <!-- logo -->
            <b-col cols="6">
              <b-form-group
                label="Website Logo"
                label-for="v-logo"
              >
                <b-img
                  v-if="form.logo_url"
                  class="mb-1"
                  height="100"
                  :src="form.logo_url"
                />
                <b-form-file
                  id="v-logo"
                  v-model="form.logo"
                  :state="null"
                  :readonly="!canSave"
                  accept="image/*"
                  size="sm"
                  @input="errors.logo = []"
                />
                <input-errors :errors="errors.logo" />
              </b-form-group>
            </b-col>

            <!-- favicon -->
            <b-col cols="6">
              <b-form-group
                label="Website Favicon"
                label-for="v-favicon"
              >
                <!-- TODO: try centering logo, favicon, jackpot_image -->
                <b-img
                  v-if="form.favicon_url"
                  class="mb-1"
                  height="100"
                  :src="form.favicon_url"
                />
                <b-form-file
                  id="v-favicon"
                  v-model="form.favicon"
                  :state="null"
                  :readonly="!canSave"
                  accept="image/*"
                  size="sm"
                  @input="errors.favicon = []"
                />
                <input-errors :errors="errors.favicon" />
              </b-form-group>
            </b-col>

            <!-- jackpot_image -->
            <b-col cols="12">
              <b-form-group
                label="Progressive Jackpot Image"
                label-for="v-jackpot_image"
              >
                <b-img
                  v-if="form.jackpot_image_url"
                  class="mb-1"
                  height="100"
                  :src="form.jackpot_image_url"
                />
                <b-form-file
                  id="v-jackpot_image"
                  v-model="form.jackpot_image"
                  :state="null"
                  :readonly="!canSave"
                  accept="image/*"
                  size="sm"
                  @input="errors.jackpot_image = []"
                />
                <input-errors :errors="errors.jackpot_image" />
              </b-form-group>
            </b-col>

            <!-- running_text_announcement -->
            <b-col cols="12">
              <b-form-group
                label="Running Text Announcement"
                label-for="v-running_text_announcement"
              >
                <b-form-input
                  id="v-running_text_announcement"
                  v-model="form.running_text_announcement"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.running_text_announcement = []"
                />
                <input-errors :errors="errors.running_text_announcement" />
              </b-form-group>
            </b-col>

            <!-- livechat_url -->
            <b-col cols="12">
              <b-form-group
                label="Livechat URL"
                label-for="v-livechat_url"
              >
                <b-form-input
                  id="v-livechat_url"
                  v-model="form.livechat_url"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.livechat_url = []"
                />
                <input-errors :errors="errors.livechat_url" />
              </b-form-group>
            </b-col>

            <!-- livechat_code -->
            <b-col cols="12">
              <b-form-group
                label="Livechat Code"
                label-for="v-livechat_code"
              >
                <b-form-input
                  id="v-livechat_code"
                  v-model="form.livechat_code"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.livechat_code = []"
                />
                <input-errors :errors="errors.livechat_code" />
              </b-form-group>
            </b-col>

            <!-- on_maintenance_mode -->
            <b-col cols="12">
              <b-form-group
                label="Website Status"
                label-for="v-on_maintenance_mode"
              >
                <v-select
                  v-model="form.on_maintenance_mode"
                  id-for="v-on_maintenance_mode"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="[{value: 0, label: 'Active'},{value: 1, label: 'Maintenance'},]"
                  :reduce="(item) => item.value"
                />
                <input-errors :errors="errors.on_maintenance_mode" />
              </b-form-group>
            </b-col>

            <!-- timezone -->
            <b-col cols="12">
              <b-form-group
                label="Timezone"
                label-for="v-timezone"
              >
                <v-select
                  v-model="form.timezone"
                  id-for="v-timezone"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="timezoneOptions"
                  :reduce="(item) => item.timezone_string"
                />
                <input-errors :errors="errors.timezone" />
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col
              cols="12"
              class="text-right"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                :disabled="loading || !canSave"
                type="submit"
                variant="primary"
                class=""
              >
                <b-spinner
                  v-if="loading"
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
  BRow, BCol, BForm, BButton, BFormGroup, BFormInput, BSpinner, BFormFile,
  BCard, BCardTitle, BCardBody, BImg,
} from 'bootstrap-vue'
import InputErrors from '@/components/InputErrors.vue'
import vSelect from 'vue-select'
import timezones from '@/libs/timezones'
import { serialize } from 'object-to-formdata'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BSpinner,
    BFormFile,
    BCard,
    BCardTitle,
    BCardBody,
    BImg,

    vSelect,
    InputErrors,
  },
  directives: {
    Ripple,
  },
  mixins: [
  ],
  data() {
    return {
      loading: false,
      form: {},
      errors: {},
      timezoneOptions: [...timezones],
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
      this.getWebsiteSettings()
    },
  },
  created() {
    this.getWebsiteSettings()
  },
  methods: {
    setForm(data) {
      const {
        logo, favicon, jackpot_image, ...form
      } = {
        ...data,
        on_maintenance_mode: data.on_maintenance_mode ? 1 : 0,
      }
      this.form = form
    },
    async getWebsiteSettings() {
      if (!this.selectedWebsiteId) return

      this.loading = true
      const { data } = await this.$http.get(`api/admin/website_settings/${this.selectedWebsiteId}`)
      this.setForm(data)
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = serialize({
          ...this.form,
        }, {
          nullsAsUndefineds: true,
        })
        const { data } = await this.$http.post(`api/admin/website_settings/${this.selectedWebsiteId}`, payload)
        this.$notifySuccess('Successfully Saved Settings!')
        this.setForm(data)
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
