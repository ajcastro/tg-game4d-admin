<template>
  <div>
    <!-- Table Container Card -->
    <b-card
      no-body
      class="mb-0"
    >
      <div class="m-2">
        <!-- Table Top -->
        <b-row>
          <!-- Per Page -->
          <b-col
            cols="12"
            md="6"
            class="d-flex align-items-center justify-content-start mb-1 mb-md-0"
          >
            <label>Show</label>
            <v-select
              v-model="perPage"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="perPageOptions"
              :clearable="false"
              class="per-page-selector d-inline-block mx-50"
            />
            <label>entries</label>
          </b-col>

          <!-- Search -->
          <b-col
            cols="12"
            md="6"
          >
            <div class="d-flex align-items-center justify-content-end">
              <b-form-input
                v-model="filter.search"
                class="d-inline-block mr-1"
                placeholder="Search..."
              />
              <!-- <b-button
                variant="primary"
                @click="add()"
              >
                <span class="text-nowrap">Add Front Website</span>
              </b-button> -->
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="resourceTable"
        class="position-relative"
        responsive
        primary-key="id"
        show-empty
        empty-text="No matching records found"
        :fields="columns"
        :items="fetchRows"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :filter="filter"
        :no-local-sorting="true"
        :filter-debounce="600"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <!-- Column: Status -->
        <template #cell(is_active)="data">
          <b-badge
            pill
            :variant="`light-${resolveIsActiveVariant(data.item.is_active)}`"
            class="text-capitalize"
          >
            {{ data.item.is_active ? 'Active' : 'Inactive' }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">

          <b-button
            variant="secondary"
            size="sm"
            @click="editCredit(data.item, data)"
          >
            <span class="text-nowrap">Set Credit</span>
          </b-button>

        </template>
      </b-table>
      <div class="mx-2 mb-2">
        <b-row>
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-start
            "
          >
            <span
              class="text-muted"
            >Showing {{ meta.from }} to {{ meta.to }} of
              {{ meta.of }} entries</span>
          </b-col>
          <!-- Pagination -->
          <b-col
            cols="12"
            sm="6"
            class="
              d-flex
              align-items-center
              justify-content-center justify-content-sm-end
            "
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              first-number
              last-number
              class="mb-0 mt-1 mt-sm-0"
              prev-class="prev-item"
              next-class="next-item"
            >
              <template #prev-text>
                <feather-icon
                  icon="ChevronLeftIcon"
                  size="18"
                />
              </template>
              <template #next-text>
                <feather-icon
                  icon="ChevronRightIcon"
                  size="18"
                />
              </template>
            </b-pagination>
          </b-col>
        </b-row>
      </div>
    </b-card>

    <form-modal
      ref="formModal"
      :resource-id.sync="resourceId"
      @save="$refs.resourceTable.refresh()"
    />

    <edit-credit-modal
      ref="editCreditModal"
    />
  </div>
</template>

<script>
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BButton,
  BTable,
  BDropdown,
  BDropdownItem,
  BPagination,
  BBadge,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { makeTable } from '@/helpers/table'
import Website from '@/models/Website'
import resourceTable from '@/mixins/resource/resource-table'
import dayjs from 'dayjs'
import FormModal from './FormModal.vue'
import EditCreditModal from './components/EditCreditModal.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BDropdown,
    BDropdownItem,
    BPagination,
    BBadge,

    vSelect,

    FormModal,
    EditCreditModal,
  },
  mixins: [
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: Website,
      ...makeTable({
        columns: [
          { key: 'actions' },
          { key: 'code', sortable: true },
          {
            key: 'assigned_client',
            sortable: true,
            formatter: (value, key, item) => item.assigned_client.code,
          },
          { key: 'ip_address', sortable: true },
          { key: 'domain_name', sortable: true },
          { key: 'is_active', sortable: true },
          // { key: 'remarks', sortable: false },
          // {
          //   key: 'created_by',
          //   sortable: true,
          //   formatter: (value, key, item) => item.created_by.name,
          // },
          // {
          //   key: 'created_at',
          //   sortable: true,
          //   formatter: value => dayjs(value).format('DD MMM YYYY, hh:mm a'),
          // },
          // {
          //   key: 'updated_by',
          //   sortable: true,
          //   formatter: (value, key, item) => item.updated_by.name,
          // },
          // {
          //   key: 'updated_at',
          //   sortable: true,
          //   formatter: value => dayjs(value).format('DD MMM YYYY, hh:mm a'),
          // },
        ],
      }),
    }
  },
  methods: {
    fetchRowsParams() {
      return {
        include: 'assigned_client,created_by,updated_by',
        'fields[assigned_client]': 'id,code',
        'fields[created_by]': 'id,name',
        'fields[updated_by]': 'id,name',
      }
    },
    async editCredit(item) {
      this.$refs.editCreditModal.open()
      this.$refs.editCreditModal.setLoading(true)
      const { data } = await this.$http.get(`api/admin/websites/${item.id}/credit`)
      this.$refs.editCreditModal.setCredit(data.credit)
      this.$refs.editCreditModal.setLoading(false)

      const credit = await this.$refs.editCreditModal.ask()
      this.$refs.editCreditModal.setLoading(true)
      await this.$http.post(`api/admin/websites/${item.id}/update_credit`, {
        credit,
      })
      this.$refs.editCreditModal.setLoading(false)
      this.$refs.editCreditModal.hide()

      this.$notifySuccess('Successfully Updated Website Credit!')
      this.$refs.resourceTable.refresh()
    },
  },
}
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
