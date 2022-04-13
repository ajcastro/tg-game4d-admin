<template>
  <div>
    <promotion-release-filters
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
                placeholder="Search by username or promo title..."
              />
              <!-- <b-button
                v-if="$can('create_manual', 'Promotion')"
                variant="primary"
                @click="add()"
              >
                <span class="text-nowrap">Create</span>
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
        <!-- Column: Image -->
        <template #cell(image)="data">
          <div>
            <b-img
              class="mb-1 mb-sm-0"
              height="80"
              :src="data.item.image_thumb_url"
            />
          </div>
        </template>

        <!-- Column: Status -->
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
            <!-- <b-dropdown-item
              :to="{ name: 'apps-users-view', params: { id: data.item.id } }"
            >
              <feather-icon icon="FileTextIcon" />
              <span class="align-middle ml-50">Details</span>
            </b-dropdown-item> -->

            <!-- TODO: v-if for casl permission check -->
            <b-dropdown-item
              @click="release(data.item, data)"
            >
              <feather-icon icon="CheckIcon" />
              <span class="align-middle ml-50">Release</span>
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
import PromotionRelease from '@/models/PromotionRelease'
import PromotionReleaseFilters from '@/components/PromotionReleaseFilters.vue'
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
    BImg,
    vSelect,

    FormModal,
    PromotionReleaseFilters,
  },
  mixins: [
    confirm,
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: PromotionRelease,
      ...makeTable({
        filter: {
          search: '',
          given_method: null,
          status: null,
          created_date: null,
        },
        columns: [
          { key: 'actions' },
          { key: 'username', sortable: false },
          { key: 'promo_title', sortable: false },
          { key: 'deposit_amount_display', label: 'Deposit Amount', sortable: false },
          { key: 'bonus_amount_display', label: 'Bonus Amount', sortable: false },
          { key: 'obligation_amount_display', label: 'Target TO', sortable: false },
          { key: 'turn_over_amount_display', label: 'Accumulate TO', sortable: false },
          { key: 'status', sortable: true },
          {
            key: 'created_at',
            sortable: true,
            formatter: (value, key, item) => dayjs(item.created_at).format('DD MMM YYYY, hh:mm a'),
          },
          {
            key: 'updated_at',
            sortable: true,
            formatter: (value, key, item) => dayjs(item.updated_at).format('DD MMM YYYY, hh:mm a'),
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
        append: 'image_url,image_thumb_url',
        include: 'setting',
      }
    },
    // TODO: refactor into mixin, transactionResolveStatus (transaction-resolve-status.js)
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
    async release(item) {
      const confirmed = await this.$confirm('Are you sure to release this?')
      if (!confirmed) return

      await this.$http.post(`api/admin/promotion_releases/${item.id}/release`)
      this.$notifySuccess('Promotion is successfully released!')
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
