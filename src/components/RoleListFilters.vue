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
          md="3"
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
  },
  methods: {
    async reset() {
      await this.$nextTick()
      this.$emit('input', { ...this.originalFilters })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
