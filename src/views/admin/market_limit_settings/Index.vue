<template>
  <div class="pb-1">
    <b-card
      v-if="$store.state.websiteSelector.selectedWebsiteId"
      no-body
      class="mb-4 col-md-12 mx-auto"
    >
      <div class="card-header">
        <!-- Title & SubTitle -->
        <div>
          <b-card-title>Market Limit Settings</b-card-title>
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
                <b-th>Market Code</b-th>
                <b-th>Market Name</b-th>
                <b-th>Limit Line 4D</b-th>
                <b-th>Limit Line 3D</b-th>
                <b-th>Limit Line 2D</b-th>
                <b-th>Limit Line 2D Front</b-th>
                <b-th>Limit Line 2D Middle</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="market in markets"
                :key="market.id"
              >
                <b-td> {{ market.code }}</b-td>
                <b-td> {{ market.name }}</b-td>
                <b-td>
                  <b-form-input
                    v-model="market.limit_setting.limit_line_4d"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="market.limit_setting.limit_line_3d"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="market.limit_setting.limit_line_2d"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="market.limit_setting.limit_line_2d_front"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="market.limit_setting.limit_line_2d_middle"
                    type="number"
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

    <b-card
      v-else
      class="mb-0 bg-danger text-white"
    >
      Please select website first.
    </b-card>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BForm, BButton, BFormGroup, BFormInput, BSpinner, BFormSelect, BFormCheckbox,
  BCard, BCardTitle, BCardBody,
  BTableSimple, BThead, BTr, BTbody, BTd, BTh,
} from 'bootstrap-vue'

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
    BFormCheckbox,
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
      markets: [],
      errors: {},
    }
  },
  computed: {
    canSave() {
      return this.$can('update', 'MarketLimitSetting')
    },
    selectedWebsiteId() {
      return this.$store.state.websiteSelector.selectedWebsiteId
    },
  },
  watch: {
    selectedWebsiteId() {
      this.getMarketLimitSettings()
    },
  },
  created() {
    this.getMarketLimitSettings()
  },
  methods: {
    async getMarketLimitSettings() {
      if (!this.selectedWebsiteId) return

      this.loading = true
      const { data } = await this.$http.get(`api/admin/market_limit_settings/${this.selectedWebsiteId}`)
      this.markets = data
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = {
          market_limit_settings: this.markets.map(m => m.limit_setting),
        }
        await this.$http.post(`api/admin/market_limit_settings/${this.selectedWebsiteId}`, payload)
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
