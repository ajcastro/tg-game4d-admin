<template>
  <div>
    <referral-log-filters
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
                placeholder="Search by member's username..."
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
              v-if="$can('view_detail', 'Promotion') || $can('update', 'Promotion')"
              @click="edit(data.item, data)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <!-- <b-dropdown-item @click="remove(data.item, data)">
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
            </b-dropdown-item> -->

            <b-dropdown-item
              v-if="!data.item.is_active && $can('activate', 'Promotion')"
              @click="setActive(data.item, true)"
            >
              <feather-icon icon="CheckSquareIcon" />
              <span class="align-middle ml-50">Set Active</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-if="data.item.is_active && $can('deactivate', 'Promotion')"
              @click="setActive(data.item, false)"
            >
              <feather-icon icon="XSquareIcon" />
              <span class="align-middle ml-50">Set Inactive</span>
            </b-dropdown-item>

            <b-dropdown-item
              v-if="$can('setting', 'Promotion')"
              :to="{name: 'promotions.settings', params: { id: data.item.id }}"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Setting</span>
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
      @created="$refs.manageParentGroupModal.setUser($event).open()"
    />
    <!-- TODO:@created redirect to promotion settings page -->
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
  BImg,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { makeTable } from '@/helpers/table'
import resourceTable from '@/mixins/resource/resource-table'
import dayjs from 'dayjs'
import ReferralLog from '@/models/ReferralLog'
import ReferralLogFilters from '@/components/ReferralLogFilters.vue'
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
    BImg,

    vSelect,
    FormModal,
    ReferralLogFilters,
  },
  mixins: [
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: ReferralLog,
      ...makeTable({
        filter: {
          search: '',
          date_range: '',
          game_category_ids: [],
        },
        columns: [
          // { key: 'actions' },
          {
            key: 'game_category',
            sortable: true,
            formatter: (value, key, item) => item.game_category.title,
          },
          {
            key: 'member',
            sortable: true,
            formatter: (value, key, item) => item.member.username,
          },
          {
            key: 'uplink_member',
            label: 'Username',
            sortable: true,
            formatter: (value, key, item) => item.uplink_member.username,
          },
          {
            key: 'turn_over_amount',
            sortable: true,
            formatter: value => this.$options.filters.currency(value),
          },
          {
            key: 'referral_percentage',
            sortable: true,
          },
          {
            key: 'referral_amount',
            sortable: true,
            formatter: value => this.$options.filters.currency(value),
          },
          {
            key: 'paid_period_from',
            sortable: true,
            formatter: value => (value ? dayjs(value).format('DD MMM YYYY, hh:mm a') : ''),
          },
          {
            key: 'paid_period_thru',
            sortable: true,
            formatter: value => (value ? dayjs(value).format('DD MMM YYYY, hh:mm a') : ''),
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
          member: 'id,username',
          uplink_member: 'id,username',
          game_category: 'id,title',
        },
        include: 'game_category,member,uplink_member',
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
