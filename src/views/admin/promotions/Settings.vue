<template>
  <div class="pb-1">
    <b-card
      no-body
      class="mb-4 col-md-6 mx-auto"
    >
      <div class="card-header">
        <!-- Title & SubTitle -->
        <div>
          <b-card-title>Promotion Settings</b-card-title>
        </div>
      </div>

      <b-card-body>

        <b-form @submit.prevent="save">
          <b-row>
            <!-- is_shown_in_banner -->
            <b-col cols="12">
              <b-form-group
                label="Display Status:"
                label-for="h-is_shown_in_banner"
                label-cols-md="4"
              >
                <v-select
                  v-model="form.is_shown_in_banner"
                  id-for="h-is_shown_in_banner"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="[{value:0, label: 'Hide'}, {value:1, label: 'Publish'}]"
                  :reduce="(item) => item.value"
                  @input="errors.is_shown_in_banner = []"
                />
                <small
                  v-for="error in errors.calculation_type"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- valid_from -->
            <b-col cols="12">
              <b-form-group
                label="Valid From:"
                label-for="h-valid_from"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-valid_from"
                  v-model="form.valid_from"
                  type="date"
                />
                <small
                  v-for="error in errors.valid_from"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- valid_thru -->
            <b-col cols="12">
              <b-form-group
                label="Valid Thru:"
                label-for="h-valid_thru"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-valid_thru"
                  v-model="form.valid_thru"
                  type="date"
                  :disabled="form.no_valid_thru_date"
                />
                <small
                  v-for="error in errors.valid_thru"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- no_valid_thru_date -->
            <b-col
              md="8"
              offset-md="4"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-2"
                  v-model="form.no_valid_thru_date"
                  name="checkbox-2"
                  @input="(val) => val && (form.valid_thru = null)"
                >
                  No Valid Thru Date
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <!-- given_method -->
            <b-col cols="12">
              <b-form-group
                label="Given Method:"
                label-for="h-given_method"
                label-cols-md="4"
              >
                <v-select
                  v-model="form.given_method"
                  id-for="h-given_method"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="[{value: 0, label: 'At Beginning'}, {value: 1, label: 'After Turn Over Reached'}]"
                  :reduce="(item) => item.value"
                  @input="errors.given_method = []"
                />
                <small
                  v-for="error in errors.given_method"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- promotion_type -->
            <b-col cols="12">
              <b-form-group
                label="Promotion Type:"
                label-for="h-promotion_type"
                label-cols-md="4"
              >
                <v-select
                  v-model="form.promotion_type"
                  id-for="h-promotion_type"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="promotionTypeOptions"
                  :reduce="(item) => item.value"
                  @input="errors.promotion_type = []"
                />
                <small
                  v-for="error in errors.promotion_type"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- allowed_n_times -->
            <b-col cols="12">
              <b-form-group
                label="Number of Times:"
                label-for="h-allowed_n_times"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-allowed_n_times"
                  v-model="form.allowed_n_times"
                  type="number"
                />
                <small
                  v-for="error in errors.allowed_n_times"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- calculation_type -->
            <b-col cols="12">
              <b-form-group
                label="Calculation Type:"
                label-for="h-calculation_type"
                label-cols-md="4"
              >
                <v-select
                  v-model="form.calculation_type"
                  id-for="h-calculation_type"
                  :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                  :options="[{value:0, label: 'Fix Amount'}, {value:1, label: 'Percentage'}]"
                  :reduce="(item) => item.value"
                  @input="errors.calculation_type = []"
                />
                <small
                  v-for="error in errors.calculation_type"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- calculation_fix_amount -->
            <b-col
              v-if="form.calculation_type === 0"
              cols="12"
            >
              <b-form-group
                label="Calculation Fix Amount:"
                label-for="h-calculation_fix_amount"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-calculation_fix_amount"
                  v-model="form.calculation_fix_amount"
                  type="number"
                  step="any"
                />
                <small
                  v-for="error in errors.calculation_fix_amount"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- calculation_rate -->
            <b-col
              v-if="form.calculation_type === 1"
              cols="12"
            >
              <b-form-group
                label="Calculation Rate (%):"
                label-for="h-calculation_rate"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-calculation_rate"
                  v-model="form.calculation_rate"
                  type="number"
                  step="any"
                />
                <small
                  v-for="error in errors.calculation_rate"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- turn_over_obligation -->
            <b-col cols="12">
              <b-form-group
                label="Turn Over Obligation:"
                label-for="h-turn_over_obligation"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-turn_over_obligation"
                  v-model="form.turn_over_obligation"
                  type="number"
                  step="any"
                />
                <small
                  v-for="error in errors.turn_over_obligation"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- is_include_bonus_to_calculate_obligation -->
            <b-col
              md="8"
              offset-md="4"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-is_include_bonus_to_calculate_obligation"
                  v-model="form.is_include_bonus_to_calculate_obligation"
                  name="checkbox-is_include_bonus_to_calculate_obligation"
                >
                  Include Bonus to Calculate Obligation
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <!-- min_deposit -->
            <b-col cols="12">
              <b-form-group
                label="Min. Deposit:"
                label-for="h-min_deposit"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-min_deposit"
                  v-model="form.min_deposit"
                  type="number"
                  step="any"
                />
                <small
                  v-for="error in errors.min_deposit"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- max_given_count -->
            <b-col cols="12">
              <b-form-group
                label="Max Given Count:"
                label-for="h-max_given_count"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-max_given_count"
                  v-model="form.max_given_count"
                  type="number"
                  step="any"
                />
                <small
                  v-for="error in errors.max_given_count"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- max_given_amount -->
            <b-col cols="12">
              <b-form-group
                label="Max Given Amount:"
                label-for="h-max_given_amount"
                label-cols-md="4"
              >
                <b-form-input
                  id="h-max_given_amount"
                  v-model="form.max_given_amount"
                  type="number"
                  step="any"
                />
                <small
                  v-for="error in errors.max_given_amount"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- is_for_new_member_only -->
            <b-col
              md="8"
              offset-md="4"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-is_auto_release"
                  v-model="form.is_auto_release"
                  name="checkbox-is_auto_release"
                >
                  Auto-Release
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <!-- is_lock_withdrawal -->
            <b-col
              md="8"
              offset-md="4"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-is_lock_withdrawal"
                  v-model="form.is_lock_withdrawal"
                  name="checkbox-is_lock_withdrawal"
                >
                  Lock Withdrawal
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <!-- is_for_new_member_only -->
            <b-col
              md="8"
              offset-md="4"
            >
              <b-form-group>
                <b-form-checkbox
                  id="checkbox-is_for_new_member_only"
                  v-model="form.is_for_new_member_only"
                  name="checkbox-is_for_new_member_only"
                >
                  For New Member Only
                </b-form-checkbox>
              </b-form-group>
            </b-col>
            <!-- deposit_methods -->
            <b-col cols="12">
              <b-form-group
                label="Deposit Methods:"
                label-for="h-deposit_methods"
                label-cols-md="12"
              >
                <b-form-checkbox
                  id="checkbox-selectAllDepositMethods"
                  v-model="selectAllDepositMethods"
                  name="checkbox-selectAllDepositMethods"
                  class="mb-1"
                  @input="(val) => val
                    ? (form.deposit_methods = bankGroupOptions.map(i => i.id))
                    : (form.deposit_methods = [])"
                >
                  Select All
                </b-form-checkbox>

                <b-form-checkbox-group
                  id="h-deposit_methods"
                  v-model="form.deposit_methods"
                  name="deposit_methods"
                  class=""
                  label="code"
                >
                  <b-form-checkbox
                    v-for="bankGroup in bankGroupOptions"
                    :key="bankGroup.id"
                    :value="bankGroup.id"
                    class="col-3 mb-1"
                  >
                    {{ bankGroup.code }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
                <small
                  v-for="error in errors.deposit_methods"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>
            <!-- game list -->
            <b-col cols="12">
              <b-form-group
                label="Game List:"
                label-for="h-game_list"
                label-cols-md="12"
              >
                <b-form-checkbox
                  id="checkbox-selectAllGames"
                  v-model="selectAllGames"
                  name="checkbox-selectAllGames"
                  class="mb-1"
                  @input="(val) => val
                    ? (form.game_list = gameOptions.map(i => i.id))
                    : (form.game_list = [])"
                >
                  Select All
                </b-form-checkbox>

                <b-form-checkbox-group
                  id="h-game_list"
                  v-model="form.game_list"
                  name="game_list"
                  class=""
                  label="code"
                >
                  <b-form-checkbox
                    v-for="game in gameOptions"
                    :key="game.id"
                    :value="game.id"
                    class="col-12 mb-1"
                  >
                    {{ game.parent.title }}: {{ game.title }}
                  </b-form-checkbox>
                </b-form-checkbox-group>
                <small
                  v-for="error in errors.game_list"
                  :key="error"
                  class="text-danger d-block"
                >{{ error }}</small>
              </b-form-group>
            </b-col>

            <!-- submit and reset -->
            <b-col
              offset-md="4"
              class="mt-1"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                :disabled="loading || !canSave"
                type="submit"
                variant="primary"
                class="mr-1"
              >
                <b-spinner
                  v-if="loading"
                  small
                  class="mr-1"
                />
                Save
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                variant="outline-secondary"
                @click="$router.back()"
              >
                Back
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BForm, BButton, BFormGroup, BFormInput, BSpinner, BFormCheckbox, BFormCheckboxGroup,
  BCard, BCardTitle, BCardBody,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import dayjs from 'dayjs'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BSpinner,
    BCard,
    BCardTitle,
    BCardBody,
    BFormCheckbox,
    BFormCheckboxGroup,
    vSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [
  ],
  data() {
    return {
      loading: false,
      selectAllDepositMethods: false,
      selectAllGames: false,
      form: {
        is_shown_in_banner: 0,
        no_valid_thru_date: false,
      },
      errors: {},

      promotionTypeOptions: [
        { value: 0, label: 'One Time' },
        { value: 1, label: 'Daily' },
        { value: 2, label: 'Weekly' },
        { value: 3, label: 'Monthly' },
        { value: 4, label: 'Everytime' },
      ],
      bankGroupOptions: [],
      gameOptions: [],
    }
  },
  computed: {
    canSave() {
      return true
    },
  },
  created() {
    this.getSetting()
    this.getBankGroups()
    this.getGameList()
  },
  methods: {
    async getSetting() {
      this.loading = true
      const { data } = await this.$http.get(`api/admin/promotions/${this.$route.params.id}/settings`)
      this.form = {
        ...this.form,
        ...data,
        valid_from: dayjs(data.valid_from).format('YYYY-MM-DD'),
        valid_thru: data.valid_thru ? dayjs(data.valid_thru).format('YYYY-MM-DD') : null,
        is_shown_in_banner: data.is_shown_in_banner ? 1 : 0,
        calculation_rate: data.calculation_rate * 100,
      }
      this.loading = false
    },
    async getBankGroups() {
      const { data } = await this.$http.get('api/admin/bank_groups', { params: { fields: { bank_groups: 'id,code' } } })
      this.bankGroupOptions = data.data
    },
    async getGameList() {
      const { data } = await this.$http.get('api/admin/game_list')
      this.gameOptions = data
    },
    reset() {
      this.form = {}
      this.errors = {}
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = {
          ...this.form,
          calculation_rate: this.form.calculation_rate / 100,
        }
        await this.$http.post(`api/admin/promotions/${this.$route.params.id}/settings`, payload)
        this.$notifySuccess('Successfully Saved Settings!')
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
