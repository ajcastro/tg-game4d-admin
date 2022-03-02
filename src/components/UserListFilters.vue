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
          <label>Role</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.role_id"
            :options="roleOptions"
            :reduce="val => val.id"
            class="w-100"
            label="name"
            @input="(val) => $emit('input', {...value, role_id: val})"
          />
        </b-col>
        <b-col
          cols="12"
          md="4"
          class="mb-md-0 mb-2"
        >
          <label>Is Active</label>
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            :value="value.is_active"
            :options="isActiveOptions"
            :reduce="val => val.value"
            class="w-100"
            @input="(val) => $emit('input', {...value, is_active: val})"
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

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    BButton,
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
      originalFilters: this.value,
      roleOptions: [],
      isActiveOptions: [
        {
          value: 0,
          label: 'Inactive',
        },
        {
          value: 1,
          label: 'Active',
        },
      ],
    }
  },
  computed: {
  },
  mounted() {
    this.getRoleOptions()
  },
  methods: {
    async getRoleOptions() {
      const res = await this.$http.get('api/admin/roles', { params: { paginate: false } })
      this.roleOptions = res.data.data
    },
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
