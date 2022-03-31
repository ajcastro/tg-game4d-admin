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
          v-show="showWarningStatusFilter"
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Given Type</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.warning_status"
            :options="givenTypeOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('input', {...value, warning_status: val})"
          />
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Created Date</label>
          <flat-pickr
            v-model="joinDateRange"
            class="form-control"
            :config="{ mode: 'range'}"
            @on-close="onSelectJoinDateRange"
          />
        </b-col>
        <b-col
          v-show="showWarningStatusFilter"
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Status</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.warning_status"
            :options="statusOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('input', {...value, warning_status: val})"
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
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import dayjs from 'dayjs'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
    vSelect,
    flatPickr,
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
      originalFilters: this.value,
      joinDateRange: null,
      givenTypeOptions: [
        {
          value: 0,
          label: 'Early Bonus',
        },
        {
          value: 1,
          label: 'Turn Over Bonus',
        },
      ],
      statusOptions: [
        {
          value: 1,
          label: 'Approved',
        },
        {
          value: 2,
          label: 'Rejected',
        },
        {
          value: 3,
          label: 'In-progress',
        },
        {
          value: 4,
          label: 'Canceled',
        },
      ],
    }
  },
  computed: {
    showWarningStatusFilter() {
      return !this.except.includes('warning_status')
    },
  },
  methods: {
    async reset() {
      this.joinDateRange = null
      await this.$nextTick()
      this.$emit('input', { ...this.originalFilters })
    },
    onSelectJoinDateRange(value) {
      const dates = value.map(d => dayjs(d).format('YYYY-MM-DD'))
      if (dates.length) {
        this.$emit('input', { ...this.value, join_date: dates.join(',') })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
