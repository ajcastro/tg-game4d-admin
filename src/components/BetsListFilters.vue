<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filters
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Market</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.market_ids"
            :options="marketOptions"
            label="name"
            multiple
            class="w-100"
            :reduce="val => val.id"
            @input="(val) => $emit('input', {...value, market_ids: val})"
          />
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Game Code</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.game_codes"
            :options="gameCodeOptions"
            multiple
            class="w-100"
            placeholder="All Games"
            @input="(val) => $emit('input', {...value, game_codes: val})"
          />
        </b-col>
        <!-- <b-col
          cols="12"
          md="3"
          class="mb-md-0 mb-2"
        >
          <label>Date Range</label>
          <flat-pickr
            v-model="dateRange"
            class="form-control"
            :config="{ mode: 'range'}"
            @on-close="onSelectDateRange"
          />
        </b-col> -->
        <b-col
          cols="12"
          md="2"
          class="mb-md-0 mb-2"
        >
          <label> &nbsp; </label>
          <div>
            <b-button
              variant="primary"
              @click="reset()"
            >
              Reset Filters
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BRow, BCol, BButton, BFormInput,
} from 'bootstrap-vue'
import dayjs from 'dayjs'
import flatPickr from 'vue-flatpickr-component'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    BFormInput,
    flatPickr,
    vSelect,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    except: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      dateRange: null,
      marketOptions: [],
      gameCodeOptions: [
        '4D',
        '3D',
        '2D',
        '2D Tengah',
        '2D Depan',
        '4D/3D/2D',
        '4D/3D/2D SET',
        'Bolak Balik',
        'Quick 2D',
        'Colok Bebas',
        'Colok Macau',
        'Colok Naga',
        'Colok Jitu',
        '5050 Umum',
        '5050 Spesial',
        '5050 Kombinasi',
        'Kombinasi',
        'Dasar',
        'Shio',
        'Player/Banker',
      ],
      originalFilters: this.value,
    }
  },
  computed: {
  },
  mounted() {
    this.getMarketOptions()
  },
  methods: {
    async getMarketOptions() {
      const { data } = await this.$http.get('api/admin/markets', { params: { paginate: false, fields: { markets: 'id,name' } } })
      this.marketOptions = data.data
    },
    async reset() {
      this.dateRange = null
      await this.$nextTick()
      this.$emit('input', { ...this.originalFilters })
    },
    onSelectDateRange(value) {
      const dates = value.map(d => dayjs(d).format('YYYY-MM-DD'))
      if (dates.length) {
        this.$emit('input', { ...this.value, date_range: dates.join(',') })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
