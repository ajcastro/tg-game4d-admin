<template>
  <div>
    <b-modal
      ref="bModal"
      :title="titlePrefix+' Reason'"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @shown="$refs.reason.focus()"
    >
      <validation-observer ref="askReasonRules">
        <b-form>
          <b-row>
            <b-col md="12">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="reason"
                  rules="required"
                >
                  <b-form-input
                    ref="reason"
                    v-model="reason"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Reason"
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
  ],
  data() {
    return {
      required,

      titlePrefix: '',
      reason: '',
      loading: false,
      resolveCallback: () => {},
    }
  },
  mounted() {
  },
  methods: {
    ask(titlePrefix) {
      this.titlePrefix = titlePrefix
      this.$refs.bModal.show()
      return new Promise(resolve => {
        this.resolveCallback = resolve
      })
    },
    async submit() {
      const valid = await this.$refs.askReasonRules.validate()
      if (valid) this.resolveCallback(this.reason)
    },
    setLoading(loading = true) {
      this.loading = loading
    },
    resetForm() {
      this.reason = ''
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
