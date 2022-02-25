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
                <span class="text-nowrap">Add Parent Group</span>
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

        <!-- Column: warning_status -->
        <template #cell(warning_status)="data">
          <b-badge
            pill
            :variant="`light-${resolveWarningStatusVariant(data.item.warning_status)}`"
            class="text-capitalize"
          >
            {{ data.item.warning_status_display }}
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
            <!-- <b-dropdown-item
              :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item> -->

            <b-dropdown-item
              v-if="data.item.warning_status == 0"
              @click="suspend(data.item, data)"
            >
              <feather-icon icon="AlertCircleIcon" />
              <span class="align-middle ml-50">Suspend</span>
            </b-dropdown-item>
            <b-dropdown-item
              v-if="data.item.warning_status === 1"
              @click="removeSuspension(data.item, data)"
            >
              <feather-icon icon="RotateCcwIcon" />
              <span class="align-middle ml-50">Remove Suspension</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-if="data.item.warning_status != 2"
              @click="blacklist(data.item, data)"
            >
              <feather-icon icon="XIcon" />
              <span class="align-middle ml-50">Blacklist</span>
            </b-dropdown-item>

            <!-- <b-dropdown-item @click="remove(data.item, data)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item> -->

            <!-- <b-dropdown-item
              v-if="!data.item.is_active"
              @click="setActive(data.item, true)"
            >
              <feather-icon icon="CheckSquareIcon" />
              <span class="align-middle ml-50">Set Active</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-if="data.item.is_active"
              @click="setActive(data.item, false)"
            >
              <feather-icon icon="XSquareIcon" />
              <span class="align-middle ml-50">Set Inactive</span>
            </b-dropdown-item> -->
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

    <ask-reason
      ref="askReason"
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
import Member from '@/models/Member'
import AskReason from '@/components/AskReason.vue'
import confirm from '@/mixins/confirm'
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
    AskReason,
  },
  mixins: [
    confirm,
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: Member,
      ...makeTable({
        columns: [
          { key: 'id', sortable: true },
          {
            key: 'website',
            sortable: true,
            formatter: (value, key, item) => item.website.code,
          },
          { key: 'username', sortable: true },
          {
            key: 'member_level',
            sortable: true,
            formatter: (value, key, item) => item.member_level_display,
          },
          {
            key: 'balance_amount',
            label: 'Credit',
            sortable: true,
            formatter: (value, key, item) => this.$options.filters.currency(item.balance_amount),
          },
          {
            key: 'banks',
            sortable: false,
            formatter: () => 'TODO',
          },
          {
            key: 'created_at',
            label: 'Join Date',
            sortable: true,
            formatter: value => dayjs(value).format('DD MMM YYYY, hh:mm a'),
          },
          {
            key: 'upline_referral_number',
            label: 'Upline ID',
            sortable: true,
            formatter: (value, key, item) => item.upline_referral?.referral_number,
          },
          {
            key: 'referral_number',
            label: 'Referral No',
            sortable: true,
          },
          {
            key: 'warning_status',
            label: 'Status',
            sortable: true,
            formatter: (value, key, item) => item.warning_status_display,
          },
          { key: 'actions' },
        ],
      }),
    }
  },
  methods: {
    fetchRowsParams() {
      return {
        include: 'website,banks,upline_referral',
        'fields[website]': 'id,code',
        'fields[banks]': 'id,account_name,account_number',
        'fields[upline_referral]': 'id,referral_number',
        append: 'member_level_display,warning_status_display',
      }
    },
    resolveWarningStatusVariant(status) {
      if (status === 1) return 'warning'
      if (status === 2) return 'danger'
      return ''
    },
    async suspend(item) {
      const reason = await this.$refs.askReason.ask('Suspend')
      this.$refs.askReason.setLoading(true)
      await this.$http.post(`/api/admin/members/${item.id}/suspend`, { reason })
      this.$refs.askReason.setLoading(false)
      this.$refs.askReason.hide(false)
      this.$notifySuccess('Member has been suspended.')
      this.$refs.resourceTable.refresh()
    },
    async removeSuspension(item) {
      const confirmed = await this.$confirm('Are you sure to remove suspension for this member?')
      if (!confirmed) return

      await this.$http.delete(`api/admin/members/${item.id}/suspend`)
      this.$refs.resourceTable.refresh()
      this.$notifySuccess('Member has been removed from suspension')
    },
    async blacklist(item) {
      const reason = await this.$refs.askReason.ask('Blacklist')
      this.$refs.askReason.setLoading(true)
      await this.$http.post(`/api/admin/members/${item.id}/blacklist`, { reason })
      this.$refs.askReason.setLoading(false)
      this.$refs.askReason.hide(false)
      this.$notifySuccess('Member has been blacklisted.')
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
