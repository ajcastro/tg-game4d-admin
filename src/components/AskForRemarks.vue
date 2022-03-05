<template>
  <div>
    <b-modal
      ref="bModal"
      title="Enter Remarks"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @shown="$refs.remarks.focus()"
    >
      <validation-observer ref="askReasonRules">
        <b-form>
          <b-row>
            <b-col md="12">
              <b-form-group>
                <validation-provider
                  #default="{ errors }"
                  name="remarks"
                  rules="required"
                >
                  <b-form-textarea
                    ref="remarks"
                    v-model="remarks"
                    :state="errors.length > 0 ? false:null"
                    placeholder="Remarks"
                    rows="3"
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
  BRow, BCol, BFormGroup, BForm, BButton, BSpinner, BFormTextarea,
} from 'bootstrap-vue'
import { required } from '@validations'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormTextarea,
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

      remarks: '',
      loading: false,
      resolveCallback: () => {},
    }
  },
  mounted() {
  },
  methods: {
    ask(defaultRemarks) {
      this.remarks = defaultRemarks
      this.$refs.bModal.show()
      return new Promise(resolve => {
        this.resolveCallback = resolve
      })
    },
    async submit() {
      const valid = await this.$refs.askReasonRules.validate()
      if (valid) this.resolveCallback(this.remarks)
    },
    setLoading(loading = true) {
      this.loading = loading
    },
    resetForm() {
      this.remarks = ''
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
