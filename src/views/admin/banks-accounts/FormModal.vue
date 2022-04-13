<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Bank Account'"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getResource(), getBankOptions())"
    >
      <b-form @submit.prevent="save">
        <b-row>

          <!-- bank_type -->
          <b-col cols="12">
            <b-form-group
              label="Transaction Type"
              label-for="v-bank_type"
            >
              <v-select
                v-model="form.bank_type"
                id-for="v-bank_type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="[{value: 'deposit', label: 'Deposit'},{value: 'withdraw', label: 'Withdraw'},]"
                :reduce="(item) => item.value"
              />
              <input-errors :errors="errors.bank_type" />
            </b-form-group>
          </b-col>

          <!-- bank_code -->
          <b-col cols="12">
            <b-form-group
              label="Bank Code"
              label-for="v-bank_code"
            >
              <v-select
                v-model="form.bank_code"
                id-for="v-bank_code"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="bankOptions"
                label="code"
                :reduce="(item) => item.code"
              />
              <input-errors :errors="errors.bank_code" />
            </b-form-group>
          </b-col>

          <!-- bank_acc_name -->
          <b-col cols="12">
            <b-form-group
              label="Account Name"
              label-for="v-bank_acc_name"
            >
              <b-form-input
                id="v-bank_acc_name"
                v-model="form.bank_acc_name"
              />
              <input-errors :errors="errors.bank_acc_name" />
            </b-form-group>
          </b-col>

          <!-- bank_acc_no -->
          <b-col cols="12">
            <b-form-group
              label="Account No."
              label-for="v-bank_acc_no"
            >
              <b-form-input
                id="v-bank_acc_no"
                v-model="form.bank_acc_no"
              />
              <input-errors :errors="errors.bank_acc_no" />
            </b-form-group>
          </b-col>

          <!-- is_auto_update_balance -->
          <b-col cols="12">
            <b-form-group
              label="Approval Method"
              label-for="v-is_auto_update_balance"
            >
              <v-select
                v-model="form.is_auto_update_balance"
                id-for="v-is_auto_update_balance"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="[{value: 0, label: 'MANUAL'},{value: 1, label: 'AUTO'},]"
                :reduce="(item) => item.value"
              />
              <input-errors :errors="errors.is_auto_update_balance" />
            </b-form-group>
          </b-col>

          <!-- min_amount -->
          <b-col
            v-if="form.bank_type === 'deposit'"
            cols="12"
          >
            <b-form-group
              label="Min. Amount"
              label-for="v-min_amount"
            >
              <b-form-input
                id="v-min_amount"
                v-model="form.min_amount"
                type="number"
                step="any"
              />
              <input-errors :errors="errors.min_amount" />
            </b-form-group>
          </b-col>

          <!-- max_amount -->
          <b-col
            v-if="form.bank_type === 'withdraw'"
            cols="12"
          >
            <b-form-group
              label="Max. Amount"
              label-for="v-max_amount"
            >
              <b-form-input
                id="v-max_amount"
                v-model="form.max_amount"
                type="number"
                step="any"
              />
              <input-errors :errors="errors.max_amount" />
            </b-form-group>
          </b-col>

          <!-- bank_factor -->
          <b-col cols="12">
            <b-form-group
              label="Rate"
              label-for="v-bank_factor"
            >
              <b-form-input
                id="v-bank_factor"
                v-model="form.bank_factor"
                type="number"
                step="any"
              />
              <input-errors :errors="errors.bank_factor" />
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
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner,
} from 'bootstrap-vue'
import CompanyBank from '@/models/CompanyBank'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    InputErrors,
    BSpinner,
    vSelect,
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
      form: { is_auto_update_balance: 0 },
      errors: {},
      model: CompanyBank,
      bankOptions: [],
    }
  },
  computed: {
    canSave() {
      return true
    },
  },
  mounted() {
  },
  methods: {
    newModel(attributes) {
      return new this.model({ ...attributes, website_id: this.$store.state.websiteSelector.selectedWebsiteId })
    },
    populateForm(data) {
      return {
        ...data,
        is_auto_update_balance: data.is_auto_update_balance ? 1 : 0,
      }
    },
    async getBankOptions() {
      const { data } = await this.$http.get('api/admin/banks', {
        params: {
          paginate: false,
          'fields[banks]': 'id,code,name',
        },
      })
      this.bankOptions = data.data
    },
  },
}
</script>

<style>

</style>
