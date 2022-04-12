<template>
  <div>
    <b-modal
      ref="bModal"
      :title="title"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
    >
      <!-- @shown="getCompanyBanks()" -->
      <validation-observer ref="validationRules">
        <b-form>
          <b-row>
            <b-col md="12">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="credit"
                  rules="required"
                >
                  <b-form-input
                    ref="credit"
                    v-model="credit"
                    autofocus
                    type="number"
                    :state="errors.length > 0 ? false:null"
                    placeholder="0.00"
                  />
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner,
} from 'bootstrap-vue'
import { required } from '@validations'
import vSelect from 'vue-select'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BSpinner,
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  mixins: [
    resourceFormModal,
  ],
  data() {
    return {
      required,

      credit: null,

      title: 'Edit Website Credit',
      loading: false,
      resolveCallback: () => {},
    }
  },
  mounted() {
  },
  methods: {
    ask(title) {
      this.title = title || this.title
      this.$refs.bModal.show()
      return new Promise(resolve => {
        this.resolveCallback = resolve
      })
    },
    async submit() {
      const valid = await this.$refs.validationRules.validate()
      if (valid) this.resolveCallback(this.credit)
    },
    setCredit(credit) {
      this.credit = credit
      return this
    },
    setLoading(loading = true) {
      this.loading = loading
    },
    resetForm() {
      this.credit = null
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
