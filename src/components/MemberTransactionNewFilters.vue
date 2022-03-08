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
          <label>Ticket ID</label>
          <b-form-input
            :value="value.ticket_id"
            placeholder="D0001-0000001"
            @input="(val) => $emit('input', {...value, ticket_id: val})"
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
  BCard, BCardHeader, BCardBody, BRow, BCol, BButton, BFormInput,
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
    BFormInput,
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
      websiteOptions: [],
    }
  },
  computed: {
  },
  mounted() {
    this.getWebsiteOptions()
  },
  methods: {
    async reset() {
      this.joinDateRange = null
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
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
