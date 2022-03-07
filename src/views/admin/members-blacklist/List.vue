<template>
  <div>
    <member-list-filters
      v-show="showFilter"
      v-model="filter"
      :except="['warning_status']"
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
                placeholder="Search by username, email or phone number..."
              />
              <!-- <b-button
                variant="danger"
                @click="kickAll()"
              >
                <span class="text-nowrap">Kick All Members</span>
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
  BPagination,
  BBadge,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { makeTable } from '@/helpers/table'
import resourceTable from '@/mixins/resource/resource-table'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Member from '@/models/Member'
import AskReason from '@/components/AskReason.vue'
import confirm from '@/mixins/confirm'
import MemberListFilters from '@/components/MemberListFilters.vue'
import FormModal from './FormModal.vue'

dayjs.extend(relativeTime)

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormInput,
    BTable,
    BPagination,
    BBadge,
    vSelect,
    FormModal,
    AskReason,
    MemberListFilters,
  },
  mixins: [
    confirm,
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: Member,
      showFilter: true,
      ...makeTable({
        filter: {
          search: '',
          join_date: '',
          warning_status: null,
        },
        columns: [
          { key: 'id', sortable: true },
          {
            key: 'created_at',
            label: 'Join Date',
            sortable: true,
            formatter: (value, key, item) => dayjs(item.created_at).format('DD MMM YYYY, hh:mm a'),
          },
          { key: 'username', sortable: true },
          { key: 'email', sortable: true },
          { key: 'phone_number', sortable: true },
          {
            key: 'blacklisted_reason',
            label: 'Description',
          },
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
    fetchRowsParams() {
      return {
        include: '',
        'fields[members]': 'id,created_at,username,email,phone_number,blacklisted_reason',
        'filter[warning_status]': 2, // 2 means blacklist
      }
    },
    resolveWarningStatusVariant(status) {
      if (status === 1) return 'warning'
      if (status === 2) return 'danger'
      return ''
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
