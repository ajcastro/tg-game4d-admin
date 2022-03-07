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
          <label>Website</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.website_id"
            :options="websiteOptions"
            class="w-100"
            label="code"
            :reduce="val => val.id"
            @input="(val) => $emit('input', {...value, website_id: val})"
          />
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Created Date</label>
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
          <label>Status</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.status"
            :options="statusOptions"
            class="w-100"
            :reduce="val => val.value"
            @input="(val) => $emit('input', {...value, status: val})"
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
import dayjs from 'dayjs'
import flatPickr from 'vue-flatpickr-component'

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
      dateRange: null,
      originalFilters: this.value,
      websiteOptions: [],
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
      ],
    }
  },
  computed: {
  },
  mounted() {
    this.getWebsiteOptions()
  },
  methods: {
    async reset() {
      this.dateRange = null
      await this.$nextTick()
      this.$emit('input', { ...this.originalFilters })
    },
    async getWebsiteOptions() {
      const res = await this.$http.get('api/admin/websites', {
        params: {
          paginate: false,
          fields: {
            websites: 'id,code',
          },
        },
      })

      this.websiteOptions = res.data.data
    },
    onSelectDateRange(value) {
      const dates = value.map(d => dayjs(d).format('YYYY-MM-DD'))
      if (dates.length) {
        this.$emit('input', { ...this.value, created_at_range: dates.join(',') })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
