<template>
  <div>
    <b-modal
      ref="bModal"
      title="Create Adjustment"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getResource(), getWebsites())"
    >
      <b-form @submit.prevent="save">
        <b-row>
          <!-- type -->
          <b-col cols="12">
            <b-form-group
              label="Type"
              label-for="v-type"
            >
              <v-select
                v-model="form.type"
                id-for="v-type"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="[{value: 'deposit', label: 'Deposit'}, {value: 'withdraw', label: 'Withdraw'}]"
                :reduce="(item) => item.value"
                @input="errors.type = []"
              />
              <input-errors :errors="errors.type" />
            </b-form-group>
          </b-col>

          <!-- website_id -->
          <b-col cols="12">
            <b-form-group
              label="Website"
              label-for="v-website_id"
            >
              <v-select
                v-model="form.website_id"
                id-for="v-website_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="websiteOptions"
                :reduce="(item) => item.id"
                label="code"
                @input="(errors.website_id = [], getMembers($event))"
              />
              <input-errors :errors="errors.website_id" />
            </b-form-group>
          </b-col>

          <!-- member_id -->
          <b-col cols="12">
            <b-form-group
              label="Member"
              label-for="v-member_id"
              busy
            >
              <div
                v-if="loadingMembers"
                class="d-flex align-items-center"
              >
                Loading...
                <b-spinner
                  class="ml-auto"
                  small
                />
              </div>
              <v-select
                v-else
                v-model="form.member_id"
                id-for="v-member_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                :options="memberOptions"
                :reduce="(item) => item.id"
                label="username"
                @input="errors.member_id = []"
              />
              <input-errors :errors="errors.member_id" />
            </b-form-group>
          </b-col>

          <!-- account_code -->
          <b-col cols="12">
            <b-form-group
              label="Account Code"
              label-for="v-account_code"
            >
              <b-form-input
                id="v-account_code"
                v-model="form.account_code"
                :state="null"
              />
              <input-errors :errors="errors.account_code" />
            </b-form-group>
          </b-col>

          <!-- account_name -->
          <b-col cols="12">
            <b-form-group
              label="Account Name"
              label-for="v-account_name"
            >
              <b-form-input
                id="v-account_name"
                v-model="form.account_name"
                :state="null"
              />
              <input-errors :errors="errors.account_name" />
            </b-form-group>
          </b-col>

          <!-- account_number -->
          <b-col cols="12">
            <b-form-group
              label="Account Number"
              label-for="v-account_number"
            >
              <b-form-input
                id="v-account_number"
                v-model="form.account_number"
                :state="null"
              />
              <input-errors :errors="errors.account_number" />
            </b-form-group>
          </b-col>

          <!-- company_bank -->
          <b-col cols="12">
            <b-form-group
              label="Company Bank"
              label-for="v-company_bank"
            >
              <b-form-input
                id="v-company_bank"
                v-model="form.company_bank"
                :state="null"
              />
              <input-errors :errors="errors.company_bank" />
            </b-form-group>
          </b-col>

          <!-- company_bank_factor -->
          <b-col cols="12">
            <b-form-group
              label="Company Bank Rate"
              label-for="v-company_bank_factor"
            >
              <b-form-input
                id="v-company_bank_factor"
                v-model="form.company_bank_factor"
                :state="null"
              />
              <input-errors :errors="errors.company_bank_factor" />
            </b-form-group>
          </b-col>

          <!-- amount -->
          <b-col cols="12">
            <b-form-group
              label="Amount"
              label-for="v-amount"
            >
              <b-form-input
                id="v-amount"
                v-model="form.amount"
                :state="null"
              />
              <input-errors :errors="errors.amount" />
            </b-form-group>
          </b-col>

          <!-- remarks -->
          <b-col cols="12">
            <b-form-group
              label="Remarks"
              label-for="v-remarks"
            >
              <b-form-textarea
                id="v-remarks"
                v-model="form.remarks"
                placeholder=""
                rows="2"
              />
              <input-errors :errors="errors.remarks" />
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
/* eslint-disable camelcase */
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner, BFormTextarea,
} from 'bootstrap-vue'
import MemberTransaction from '@/models/MemberTransaction'
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
    BSpinner,
    BFormTextarea,
    vSelect,

    InputErrors,
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
      form: {
        is_adjustment: true,
      },
      errors: {},
      model: MemberTransaction,

      websiteOptions: [],
      loadingMembers: false,
      memberOptions: [],
    }
  },
  methods: {
    async getWebsites() {
      const res = await this.$http.get('api/admin/websites', { params: { paginate: false } })
      this.websiteOptions = res.data.data
    },
    async getMembers(website_id) {
      this.memberOptions = []
      this.loadingMembers = true
      this.form = { ...this.form, member_id: null }
      const res = await this.$http.get('api/admin/members', {
        params: {
          paginate: false,
          fields: {
            members: 'id,username',
          },
          filter: {
            website_id,
          },
        },
      })
      this.loadingMembers = false
      this.memberOptions = res.data.data
    },
  },
}
</script>

<style>

</style>
