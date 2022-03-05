<template>
  <b-modal
    ref="bModal"
    title="View Member"
    no-close-on-backdrop
    ok-only
    ok-title="Done"
    size="xl"
    @hidden="resetForm()"
  >
    <!-- @show="getAllResourceData()" -->
    <b-breadcrumb
      class="mb-1"
    >
      <b-breadcrumb-item
        v-for="(item, index) in memberBreadcrumbs"
        :key="item.id"
        :active="item.active"
        @click="selectFromMemberBreadcrumbs(index+1)"
      >
        {{ item.text }}
      </b-breadcrumb-item>
    </b-breadcrumb>

    <b-tabs
      content-class="pt-1"
      fill
    >
      <b-tab
        active
        title="Profile"
      >
        <b-form @submit.prevent="save">
          <b-row>
            <!-- username -->
            <b-col cols="12">
              <b-form-group
                label="Username"
                label-for="v-username"
              >
                <b-form-input
                  id="v-username"
                  v-model="form.username"
                  :state="null"
                  :disabled="true"
                />
                <input-errors :errors="errors.username" />
              </b-form-group>
            </b-col>

            <!-- phone_number -->
            <b-col cols="12">
              <b-form-group
                label="Phone Number"
                label-for="v-phone_number"
              >
                <b-form-input
                  id="v-phone_number"
                  v-model="form.phone_number"
                  :state="null"
                  :disabled="true"
                />
                <input-errors :errors="errors.phone_number" />
              </b-form-group>
            </b-col>

            <!-- referral_number -->
            <b-col cols="12">
              <b-form-group
                label="Referral Number"
                label-for="v-referral_number"
              >
                <b-form-input
                  id="v-referral_number"
                  v-model="form.referral_number"
                  :state="null"
                  :disabled="true"
                />
                <input-errors :errors="errors.referral_number" />
              </b-form-group>
            </b-col>

            <!-- upline_referral.referral_number -->
            <b-col cols="12">
              <b-form-group
                label="Referral Number"
                label-for="v-upline_referral_number"
              >
                <b-form-input
                  id="v-upline_referral_number"
                  v-model="form.upline_referral.referral_number"
                  :state="null"
                  :disabled="true"
                />
                <input-errors :errors="errors.upline_referral_number" />
              </b-form-group>
            </b-col>

          </b-row>
        </b-form>
      </b-tab>
      <b-tab
        title="Banks"
        lazy
      >
        <b-card
          v-for="(bank, index) in form.banks"
          :key="bank.id"
        >
          <b-card-text>
            # {{ index+1 }}
          </b-card-text>
          <b-card-text>
            <strong>Account Name :</strong> {{ bank.account_name }}
          </b-card-text>
          <b-card-text>
            <strong>Account Code :</strong> {{ bank.account_code }}
          </b-card-text>
          <b-card-text>
            <strong>Account Number :</strong> {{ bank.account_number }}
          </b-card-text>
        </b-card>
      </b-tab>
      <b-tab
        title="Deposit History"
        lazy
      >
        <b-table
          responsive="sm"
          :items="depositTransactions"
        />
      </b-tab>
      <b-tab
        title="Withdrawal History"
        lazy
      >
        <b-table
          responsive="sm"
          :items="withdrawTransactions"
        />
      </b-tab>
      <b-tab
        title="Adjustment History"
        lazy
      >
        <b-table
          responsive="sm"
          :items="adjustTransactions"
        />
      </b-tab>
      <b-tab
        title="Login History"
        lazy
      >
        <b-table
          responsive="sm"
          :items="loginHistory"
        />
      </b-tab>
      <b-tab
        title="Referral List"
        lazy
      >
        <b-table
          responsive="sm"
          :items="referrals"
          show-empty
          empty-text="No referrals"
        >
          <template #cell(actions)="data">
            <b-button
              size="sm"
              @click="viewMember(data.item.id)"
            >
              View
            </b-button>
          </template>

        </b-table>
      </b-tab>
    </b-tabs>
  </b-modal>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton,
  BBreadcrumb, BBreadcrumbItem,
  BCard,
  BCardText,
  BTab, BTabs,
  BTable,
} from 'bootstrap-vue'
import Member from '@/models/Member'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import dayjs from 'dayjs'

let runningBalance = 0
export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTab,
    BTabs,
    BCard,
    BCardText,
    BTable,
    BButton,
    BBreadcrumb,
    BBreadcrumbItem,

    InputErrors,
  },
  directives: {
    Ripple,
  },
  mixins: [
    resourceFormModal,
  ],
  props: {
  },
  data() {
    return {
      memberBreadcrumbs: [],
      formDisabled: false,
      loading: false,
      form: {
        upline_referral: {},
      },
      errors: {},
      model: Member,
      depositTransactions: [{
        account_name: 'Pw4soejCfh',
        account_code: '22104 CEDEX',
        account_number: '94',
        company_bank: 'BPI',
        company_bank_factor: 5,
        amount: 50.00,
      }, {
        account_name: 'SpZJMbN7T',
        account_code: '7042',
        account_number: '34',
        company_bank: 'BPI',
        company_bank_factor: 5,
        amount: 30.00,
      }, {
        account_name: 'vCnGPrPSy',
        account_code: '5092',
        account_number: '13',
        company_bank: 'BPI',
        company_bank_factor: 5,
        amount: 20.00,
      }, {
        account_name: 'S4RoQDQ9si',
        account_code: '8042',
        account_number: '6856',
        company_bank: 'BPI',
        company_bank_factor: 5,
        amount: 30.00,
      }, {
        account_name: 'W4ov72Vvm5t',
        account_code: '5042',
        account_number: '5087',
        company_bank: 'BPI',
        company_bank_factor: 5,
        amount: 10.00,
      }],
      withdrawTransactions: [{
        account_name: 'Pw4soejCfh',
        account_code: '22104 CEDEX',
        account_number: '94',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 50.00,
      }, {
        account_name: 'SpZJMbN7T',
        account_code: '7042',
        account_number: '34',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 30.00,
      }, {
        account_name: 'vCnGPrPSy',
        account_code: '5092',
        account_number: '13',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 20.00,
      }, {
        account_name: 'S4RoQDQ9si',
        account_code: '8042',
        account_number: '6856',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 30.00,
      }, {
        account_name: 'W4ov72Vvm5t',
        account_code: '5042',
        account_number: '5087',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 10.00,
      }],
      adjustTransactions: [{
        account_name: 'Pw4soejCfh',
        account_code: '22104 CEDEX',
        account_number: '94',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 50.00,
      }, {
        account_name: 'SpZJMbN7T',
        account_code: '7042',
        account_number: '34',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 30.00,
      }, {
        account_name: 'vCnGPrPSy',
        account_code: '5092',
        account_number: '13',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 20.00,
      }, {
        account_name: 'S4RoQDQ9si',
        account_code: '8042',
        account_number: '6856',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 30.00,
      }, {
        account_name: 'W4ov72Vvm5t',
        account_code: '5042',
        account_number: '5087',
        company_bank: 'BPI',
        company_bank_factor: 1,
        amount: 10.00,
      }],
      loginHistory: [
        {
          login_date: '02 Feb 2021, 08:10 PM',
          ip: '192.168.9.1',
          device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }, {
          login_date: '02 Feb 2021, 08:10 PM',
          ip: '192.168.9.1',
          device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }, {
          login_date: '02 Feb 2021, 08:10 PM',
          ip: '192.168.9.1',
          device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }, {
          login_date: '02 Feb 2021, 08:10 PM',
          ip: '192.168.9.1',
          device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }, {
          login_date: '02 Feb 2021, 08:10 PM',
          ip: '192.168.9.1',
          device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        }, {
          login_date: '02 Feb 2021, 08:10 PM',
          ip: '192.168.9.1',
          device_info: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        },
      ],
      referrals: [
        {
          username: 'johndoe',
          join_date: '02 Feb 2022, 08:30 AM',
          actions: '',
        }, {
          username: 'janedoe',
          join_date: '02 Feb 2022, 08:30 AM',
          actions: '',
        }, {
          username: 'peterdoe',
          join_date: '02 Feb 2022, 08:30 AM',
          actions: '',
        }, {
          username: 'jenylopez',
          join_date: '02 Feb 2022, 08:30 AM',
          actions: '',
        },
      ],
    }
  },
  watch: {
    resourceId() {
      this.getAllResourceData()
    },
  },
  mounted() {
  },
  methods: {
    resetForm() {
      this.$emit('update:resource-id', null)
      this.form = { ...this.formOriginal }
      this.loading = false
      this.errors = {}
      this.memberBreadcrumbs = []
    },
    getRunningBalance(item) {
      runningBalance += parseFloat(parseFloat(item.amount).toFixed(2))
      return runningBalance
    },
    getAllResourceData() {
      this.getResource()
      this.getReferrals()
    },
    async getResource() {
      if (!this.resourceId) return

      this.loading = true
      const res = await this.model.with('upline_referral,banks').find(this.resourceId)

      this.form = {
        ...res.data,
        ...{
          upline_referral: (res.data.upline_referral || { referral_number: '' }),
        },
      }
      this.loading = false

      this.addToMemberBreadcrumbs({ ...this.form })
    },
    async getReferrals() {
      const res = await this.$http.get('api/admin/members', {
        params: {
          filter: {
            upline_referral_id: this.resourceId,
          },
          fields: {
            members: 'id,username,created_at',
          },
        },
      })

      this.referrals = res.data.data.map(member => ({
        id: member.id,
        username: member.username,
        join_date: dayjs(member.created_at).format('DD MMM YYYY, hh:mm a'),
        actions: '',
      }))
    },
    selectFromMemberBreadcrumbs(index) {
      this.memberBreadcrumbs.splice(index)
      const item = this.memberBreadcrumbs.at(-1)
      item.active = true
      this.viewMember(item.id)
    },
    addToMemberBreadcrumbs(member) {
      const exists = this.memberBreadcrumbs.map(i => i.id).includes(member.id)
      if (exists) return
      this.memberBreadcrumbs = this.memberBreadcrumbs.map(item => ({ ...item, active: false })).concat({
        id: member.id,
        text: member.username,
        active: true,
      })
    },
    viewMember(id) {
      this.$emit('update:resource-id', id)
    },
  },
}
</script>

<style>

</style>
