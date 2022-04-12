<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Bank Group'"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="getResource()"
    >
      <b-form @submit.prevent="save">
        <b-row>

          <!-- code -->
          <b-col cols="12">
            <b-form-group
              label="Code"
              label-for="v-code"
            >
              <b-form-input
                id="v-code"
                v-model="form.code"
                autofocus
              />
              <input-errors :errors="errors.code" />
            </b-form-group>
          </b-col>

          <!-- is_require_account_no -->
          <b-col cols="12">
            <b-form-group
              label=""
              label-for="v-is_require_account_no"
            >
              <b-form-checkbox
                v-model="form.is_require_account_no"
              >
                Require Account No.
              </b-form-checkbox>
              <input-errors :errors="errors.is_require_account_no" />
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col
            cols="12"
            class="text-right"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              :disabled="loading"
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
    </b-modal>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner, BFormCheckbox,
} from 'bootstrap-vue'
import BankGroup from '@/models/BankGroup'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormCheckbox,
    InputErrors,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  mixins: [
    resourceFormModal,
  ],
  data() {
    return {
      loading: false,
      form: {},
      errors: {},
      model: BankGroup,
    }
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style>

</style>
