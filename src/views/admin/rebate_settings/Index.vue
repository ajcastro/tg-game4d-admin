<template>
  <div class="pb-1">
    <b-card
      no-body
      class="mb-4 col-md-12 mx-auto"
    >
      <div class="card-header">
        <!-- Title & SubTitle -->
        <div>
          <b-card-title>Rebate Settings</b-card-title>
        </div>
      </div>

      <b-card-body>

        <b-form @submit.prevent="save">
          <b-table-simple
            hover
            small
            caption-top
            responsive
          >
            <b-thead>
              <b-tr>
                <b-th width="20%">
                  Game
                </b-th>
                <b-th>New Member</b-th>
                <b-th>Regular Member</b-th>
                <b-th width="10%">
                  Pay Out By
                </b-th>
                <b-th>Min Amount</b-th>
                <b-th>Max Amount</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="setting in rebateSettings"
                :key="setting.id"
              >
                <b-td> {{ setting.category.title }}</b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.new_member"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.regular_member"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-select
                    v-model="setting.pay_out_by"
                    :options="[{value:0, text: 'Daily'}, {value:1, text: 'Weekly'}]"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.min_amount"
                    type="number"
                    step="any"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="setting.max_amount"
                    type="number"
                    step="any"
                  />
                </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>

          <b-row>
            <b-col
              class="mt-1 text-center"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                :disabled="loading || !canSave"
                type="submit"
                variant="primary"
                class=""
              >
                <b-spinner
                  v-if="
                    loading"
                  small
                  class="mr-1"
                />
                Save
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
  BRow, BCol, BForm, BButton, BFormGroup, BFormInput, BSpinner, BFormSelect,
  BCard, BCardTitle, BCardBody,
  BTableSimple, BThead, BTr, BTbody, BTd, BTh,
} from 'bootstrap-vue'
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
    BFormSelect,
    BCard,
    BCardTitle,
    BCardBody,

    BTableSimple,
    BThead,
    BTr,
    BTbody,
    BTd,
    BTh,
  },
  directives: {
    Ripple,
  },
  mixins: [
  ],
  data() {
    return {
      loading: false,
      rebateSettings: [],
      errors: {},
    }
  },
  computed: {
    canSave() {
      return true
    },
  },
  created() {
    this.getRebateSettings()
  },
  methods: {
    async getRebateSettings() {
      this.loading = true
      const { data } = await this.$http.get('api/admin/rebate_settings')
      this.rebateSettings = data
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = {
          rebate_settings: this.rebateSettings,
        }
        await this.$http.post('api/admin/rebate_settings', payload)
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
