<template>
  <div>
    <b-modal
      ref="bModal"
      :title="title"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @shown="getCompanyBanks()"
    >
      <validation-observer ref="validationRules">
        <b-form>
          <b-row>
            <b-col md="12">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="company bank"
                  rules="required"
                >
                  <v-select
                    v-model="selectedBank"
                    :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                    :options="companyBanks"
                    class="w-100"
                  >
                    <template #option="{ bank_code, bank_acc_no }">
                      <span>{{ bank_code }} ({{ bank_acc_no }})</span>
                    </template>
                    <template #selected-option="{ bank_code, bank_acc_no }">
                      <span>{{ bank_code }} ({{ bank_acc_no }})</span>
                    </template>
                  </v-select>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col
              cols="12"
              class="text-right"
            >
              <b-button
                variant="primary"
                type="submit"
                :disabled="loading"
                @click.prevent="submit"
              >
                <b-spinner
                  v-if="loading"
                  small
                  class="mr-1"
                />
                Submit
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BForm, BButton, BSpinner,
} from 'bootstrap-vue'
import { required } from '@validations'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
    vSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [
  ],
  data() {
    return {
      required,

      companyBanks: [],
      selectedBank: null,
      type: null,

      title: 'Select Company Bank',
      loading: false,
      resolveCallback: () => {},
    }
  },
  mounted() {
  },
  methods: {
    async getCompanyBanks() {
      const { data } = await this.$http.get('/api/admin/company_banks', {
        params: {
          filter: {
            is_active: 1,
            bank_type: this.type,
          },
        },
      })
      this.companyBanks = data.data
    },
    ofType(type) {
      this.type = type
      return this
    },
    ask(title) {
      this.title = title || this.title
      this.$refs.bModal.show()
      return new Promise(resolve => {
        this.resolveCallback = resolve
      })
    },
    async submit() {
      const valid = await this.$refs.validationRules.validate()
      if (valid) this.resolveCallback(this.selectedBank)
    },
    setLoading(loading = true) {
      this.loading = loading
    },
    resetForm() {
      this.selectedBank = null
      this.loading = false
      this.resolveCallback = () => {}
    },
    hide() {
      this.$refs.bModal.hide()
    },
  },
}
</script>

<style>

</style>
