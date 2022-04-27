<template>
  <div>
    <user-log-filters
      v-if="$store.state.websiteSelector.selectedWebsiteId"
      v-model="filter"
    />
    <!-- Table Container Card -->
    <b-card
      v-if="$store.state.websiteSelector.selectedWebsiteId"
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
                placeholder="Search by member's username, user's username or category..."
              />
              <!-- <b-button
                v-if="$can('create', 'Promotion')"
                variant="primary"
                @click="add()"
              >
                <span class="text-nowrap">Add Promotion</span>
              </b-button> -->
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="resourceTable"
        class="position-relative"
        fixed
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

        <!-- Column: user-->
        <template #cell(user)="data">
          <span v-b-tooltip.hover.top="data.item.user.username"> {{ data.item.user.username }} </span>
        </template>

        <!-- Column: date-->
        <template #cell(date)="data">
          <span v-b-tooltip.hover.top="data.value"> {{ data.value }} </span>
        </template>

        <!-- Column: member-->
        <template #cell(member)="data">
          <span v-b-tooltip.hover.top="data.value"> {{ data.value }} </span>
        </template>

        <!-- Column: user_info-->
        <template #cell(user_info)="data">
          <span v-b-tooltip.hover.top="data.item.user_info"> {{ data.item.user_info }} </span>
        </template>

        <!-- Column: activity-->
        <template #cell(activity)="data">
          <span v-b-tooltip.hover.top="data.item.activity"> {{ data.item.activity }} </span>
        </template>

        <!-- Column: detail-->
        <template #cell(detail)="data">
          <span v-b-tooltip.hover.top="data.item.detail"> {{ data.item.detail }} </span>
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
              v-if="$can('view_detail', 'Promotion') || $can('update', 'Promotion')"
              @click="edit(data.item, data)"
            >
              <feather-icon icon="EyeIcon" />
              <span class="align-middle ml-50">View Details</span>
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

    <b-card
      v-else
      class="mb-0 bg-danger text-white"
    >
      Please select website first.
    </b-card>

    <form-modal
      ref="formModal"
      :resource-id.sync="resourceId"
      @save="$refs.resourceTable.refresh()"
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
  VBTooltip,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { makeTable } from '@/helpers/table'
import resourceTable from '@/mixins/resource/resource-table'
import dayjs from 'dayjs'
import UserLog from '@/models/UserLog'
import UserLogFilters from '@/components/UserLogFilters.vue'
import Ripple from 'vue-ripple-directive'
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
    UserLogFilters,
  },
  directives: {
    'b-tooltip': VBTooltip,
    Ripple,
  },
  mixins: [
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: UserLog,
      ...makeTable({
        filter: {
          search: '',
          date_range: '',
        },
        columns: [
          // { key: 'actions' },
          {
            key: 'user',
            sortable: true,
            formatter: (value, key, item) => item.user.username,
          },
          {
            key: 'date',
            sortable: true,
            formatter: value => (value ? dayjs(value).format('DD MMM YYYY hh:mm a') : ''),
          },
          {
            key: 'user_ip',
            sortable: true,
          },
          {
            key: 'user_info',
            sortable: false,
            tdClass: 'text-truncate',
          },
          {
            key: 'member',
            sortable: true,
            formatter: (value, key, item) => item.member.username,
          },
          {
            key: 'category',
            sortable: true,
          },
          {
            key: 'activity',
            sortable: false,
          },
          {
            key: 'detail',
            sortable: false,
          },
        ],
      }),
    }
  },
  mounted() {
    this.$root.$on('selected-website', () => {
      this.$nextTick(
        () => {
          // TODO: issue here, the request sent is duplicated sometimes
          this.$refs.resourceTable.refresh()
        },
      )
    })
  },
  methods: {
    fetchRowsParams() {
      return {
        fields: {
          user: 'id,username',
          member: 'id,username',
        },
        include: 'user,member',
      }
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
