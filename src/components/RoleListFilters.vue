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
          <label>Parent Code</label>
          <v-select
            :value="value.parent_group_id"
            id-for="v-parent_group"
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="code"
            :options="parentGroupOptions"
            :reduce="(item) => item.id"
            @input="(val) => $emit('input', {...value, parent_group_id: val})"
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
      parentGroupOptions: [],
    }
  },
  computed: {
  },
  mounted() {
    this.getParentGroupOptions()
  },
  methods: {
    async getParentGroupOptions() {
      const res = await this.$http.get('api/admin/parent_groups', { params: { paginate: false } })
      this.parentGroupOptions = res.data.data
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
