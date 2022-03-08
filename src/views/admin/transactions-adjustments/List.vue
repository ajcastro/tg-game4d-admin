<template>
  <div>
    <member-transaction-adjustments-filters
      v-show="showFilter"
      v-model="filter"
    />

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
                placeholder="Search by username or bank destination..."
              />
              <!-- <b-button
                variant="primary"
                class="btn-icon"
                @click="showFilter = !showFilter"
              >
                <feather-icon icon="FilterIcon" />
              </b-button> -->
              <b-button
                variant="primary"
                @click="add()"
              >
                <span class="text-nowrap">Create</span>
              </b-button>
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

        <!-- Column: type -->
        <template #cell(type)="data">
          <span class="text-capitalize"> {{ data.item.type }}</span>
        </template>

        <!-- Column: status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${resolveStatusVariant(data.item.status)}`"
            class="text-capitalize"
          >
            {{ resolveStatusText(data.item.status) }}
          </b-badge>
        </template>

        <!-- Column: Actions -->
        <template #cell(actions)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>

            <b-dropdown-item
              v-if="data.item.status === 0"
              @click="approve(data.item)"
            >
              <feather-icon icon="CheckIcon" />
              <span class="align-middle ml-50">Approve</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-if="data.item.status === 0"
              @click="reject(data.item)"
            >
              <feather-icon icon="XIcon" />
              <span class="align-middle ml-50">Reject</span>
            </b-dropdown-item>

            <b-dropdown-item
              @click="enterRemarks(data.item)"
            >
              <feather-icon icon="Edit2Icon" />
              <span class="align-middle ml-50">Edit Remarks</span>
            </b-dropdown-item>

          </b-dropdown>
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

    <ask-for-remarks
      ref="askForRemarks"
    />
  </div>
</template>

<script>
/* eslint-disable new-cap */
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
import resourceTable from '@/mixins/resource/resource-table'
import dayjs from 'dayjs'
import MemberTransaction from '@/models/MemberTransaction'
import AskForRemarks from '@/components/AskForRemarks.vue'
import confirm from '@/mixins/confirm'
import newTransactions from '@/mixins/transactions/new-transactions'
import MemberTransactionAdjustmentsFilters from '@/components/MemberTransactionAdjustmentsFilters.vue'
import FormModal from './FormModal.vue'

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
    AskForRemarks,
    MemberTransactionAdjustmentsFilters,
  },
  mixins: [
    confirm,
    newTransactions,
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: MemberTransaction,
      showFilter: true,
      ...makeTable({
        sortDesc: true,
        sortBy: 'ticket_id',
        filter: {
          search: '',
        },
        columns: [
          { key: 'ticket_id', sortable: true },
          {
            key: 'website',
            sortable: true,
            formatter: (value, key, item) => item.website.code,
          },
          {
            key: 'username',
            sortable: true,
            formatter: (value, key, item) => item.member.username,
          },
          {
            key: 'type',
            sortable: true,
          },
          { key: 'amount', sortable: true },
          {
            key: 'created_at',
            label: 'Created Date',
            sortable: true,
            formatter: value => dayjs(value).format('DD MMM YYYY, hh:mm a'),
          },
          {
            key: 'approved_at',
            label: 'Approved Date',
            sortable: true,
            formatter: value => (value ? dayjs(value).format('DD MMM YYYY, hh:mm a') : ''),
          },
          {
            key: 'approved_by',
            label: 'Approved By',
            sortable: true,
            formatter: (value, key, item) => item?.approved_by?.name,
          },
          { key: 'remarks', sortable: false },
          { key: 'status', sortable: true },
          { key: 'actions' },
        ],
      }),
    }
  },
  mounted() {
    this.$root.$on('selected-website', () => {
      this.$refs.resourceTable.refresh()
    })
  },
  methods: {
    fetchRowsParams(ctx) {
      return {
        append: 'ticket_id',
        include: 'website,member,approved_by',
        fields: {
          website: 'id,code',
          member: 'id,username',
          approved_by: 'id,name',
        },
        filter: {
          is_adjustment: 1,
        },
      }
    },
    resolveStatusVariant(status) {
      if (status === 0) return 'secondary'
      if (status === 1) return 'success'
      if (status === 2) return 'danger'
      return ''
    },
    resolveStatusText(status) {
      if (status === 0) return 'New'
      if (status === 1) return 'Approved'
      if (status === 2) return 'Rejected'
      return ''
    },
    async approve(item) {
      const confirmed = await this.$confirm('Are you sure to approve this transaction?')
      if (!confirmed) return

      await this.$http.post(`api/admin/member_transactions/${item.id}/approve`)
      this.$notifySuccess('Successfully Approved!')
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
