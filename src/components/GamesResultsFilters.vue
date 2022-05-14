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
          <label>Date Range</label>
          <flat-pickr
            v-model="dateRange"
            class="form-control"
            :config="{ mode: 'range'}"
            @on-close="onSelectDateRange"
          />
        </b-col>
        <b-col
          cols="12"
          md="4"
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
  BCard, BCardHeader, BCardBody, BRow, BCol, BButton,
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
      gameCategoryOptions: [],
      originalFilters: this.value,
    }
  },
  computed: {
  },
  mounted() {
  },
  methods: {
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
