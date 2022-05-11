<template>
  <div>
    <b-modal
      ref="bModal"
      title="Set Market Schedule"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getMarketSchedule())"
    >
      <b-form @submit.prevent="save">
        <b-row>
          <!-- result_day -->
          <b-col cols="12">
            <b-form-group
              label="Result Day"
              label-for="v-result_day"
            >
              <b-form-checkbox
                id="checkbox-select-all"
                v-model="form.is_result_day_everyday"
                class="mb-1"
                @input="(val) => val
                  ? (form.result_day = [...dayOptions])
                  : (form.result_day = [])"
              >
                Select All
              </b-form-checkbox>

              <b-form-checkbox-group
                id="v-result_day"
                v-model="form.result_day"
              >
                <b-form-checkbox
                  v-for="day in dayOptions"
                  :key="day"
                  :value="day"
                  class="col-3 mb-1"
                >
                  {{ day }}
                </b-form-checkbox>
              </b-form-checkbox-group>
            </b-form-group>
          </b-col>

          <!-- close_time -->
          <b-col cols="12">
            <b-form-group
              label="Close Time"
              label-for="v-close_time"
            >
              <b-form-input
                id="v-close_time"
                v-model="form.close_time"
                :state="null"
                :readonly="!canSave"
                @input="errors.close_time = []"
              />
              <input-errors :errors="errors.close_time" />
            </b-form-group>
          </b-col>

          <!-- result_time -->
          <b-col cols="12">
            <b-form-group
              label="Result Time"
              label-for="v-result_time"
            >
              <b-form-input
                id="v-result_time"
                v-model="form.result_time"
                :state="null"
                :readonly="!canSave"
                @input="errors.result_time = []"
              />
              <input-errors :errors="errors.result_time" />
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col
            cols="12"
            class="text-right"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              :disabled="loading || !canSave"
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner, BFormCheckbox, BFormCheckboxGroup,
} from 'bootstrap-vue'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import MarketSchedule from '@/models/MarketSchedule'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormCheckbox,
    BFormCheckboxGroup,
    BButton,
    BSpinner,

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
      market: null,
      form: {},
      errors: {},
      model: MarketSchedule,

      roleOptions: [],
      parentGroupOptions: [],
      dayOptions: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    }
  },
  computed: {
    canSave() {
      if (this.isCreating) {
        return true
      }
      return this.$can('update', 'MarketSchedule')
    },
  },
  methods: {
    async setMarketSchedule(market) {
      this.market = { ...market }
      await this.$nextTick()
      this.open()
    },
    async getMarketSchedule() {
      const { data } = await this.$http.get(`api/admin/markets/${this.market.id}/market_schedule`)
      this.form = data
    },
    async save() {
      try {
        this.loading = true

        await this.$http.post(`api/admin/markets/${this.market.id}/market_schedule`, this.form)

        this.$notifySuccess('Successfully Saved!')
        this.errors = {}
        this.$emit('save')
        this.close()
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

<style>

</style>
