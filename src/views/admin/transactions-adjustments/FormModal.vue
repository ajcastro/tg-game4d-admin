<template>
  <div>
    <b-modal
      ref="bModal"
      title="Create Adjustment"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getResource(), getMembers())"
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

          <!-- member_id -->
          <b-col cols="12">
            <b-form-group
              label="Member"
              label-for="v-member_id"
              busy
            >
              <template
                v-if="!hasSelectedWebsite"
              >
                <div
                  class="d-flex align-items-center text-danger"
                >
                  Please select a website first...
                </div>
              </template>
              <template v-else>
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
              </template>
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
import { mapState } from 'vuex'

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
        company_bank: 'None',
        company_bank_factor: 1,
      },
      errors: {},
      model: MemberTransaction,

      websiteOptions: [],
      loadingMembers: false,
      memberOptions: [],
    }
  },
  computed: {
    ...mapState({
      selectedWebsiteId: state => state.websiteSelector.selectedWebsiteId,
    }),
    hasSelectedWebsite() {
      return !!this.selectedWebsiteId
    },
  },
  methods: {
    async getMembers() {
      this.memberOptions = []
      this.loadingMembers = true
      this.form = { ...this.form, member_id: null }
      const res = await this.$http.get('api/admin/members', {
        params: {
          paginate: false,
          fields: {
            members: 'id,username',
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
