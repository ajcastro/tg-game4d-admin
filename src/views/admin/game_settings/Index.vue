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
          <b-card-title>Game Settings</b-card-title>
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
                <b-th>Game Name</b-th>
                <b-th>Min Bet</b-th>
                <b-th>Max Bet</b-th>
                <b-th>Win (x)</b-th>
                <b-th>Discount(%)</b-th>
                <b-th>Kei(%)</b-th>
                <b-th>Limit</b-th>
                <b-th>Limit Total</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="game in games"
                :key="game.id"
              >
                <b-td> {{ game.title }}</b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.min_bet"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.max_bet"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.win_multiplier"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.percentage_discount"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.percentage_kei"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.limit"
                    type="number"
                  />
                </b-td>
                <b-td>
                  <b-form-input
                    v-model="game.setting.limit_total"
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
  BRow, BCol, BForm, BButton, BFormInput, BSpinner,
  BCard, BCardTitle, BCardBody,
  BTableSimple, BThead, BTr, BTbody, BTd, BTh,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BFormInput,
    BSpinner,
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
      games: [],
      errors: {},
    }
  },
  computed: {
    canSave() {
      return this.$can('update', 'GameSetting')
    },
    selectedWebsiteId() {
      return this.$store.state.websiteSelector.selectedWebsiteId
    },
  },
  watch: {
    selectedWebsiteId() {
      this.getGameSettings()
    },
  },
  created() {
    this.getGameSettings()
  },
  methods: {
    async getGameSettings() {
      if (!this.selectedWebsiteId) return

      this.loading = true
      const { data } = await this.$http.get(`api/admin/game_settings/${this.selectedWebsiteId}`)
      this.games = data
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const payload = {
          game_settings: this.games.map(m => m.setting),
        }
        await this.$http.post(`api/admin/game_settings/${this.selectedWebsiteId}`, payload)
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
