<template>
  <div>
    <games-results-filters
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
              <!-- <b-form-input
                v-model="filter.search"
                class="d-inline-block mr-1"
                placeholder="Search by code or name..."
              /> -->
              <!-- <b-button
                variant="primary"
                @click="add()"
              >
                <span class="text-nowrap">Add Client</span>
              </b-button> -->
            </div>
          </b-col>
        </b-row>
      </div>

      <b-table
        ref="resourceTable"
        class="position-relative"
        responsive
        bordered
        small
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

        <!-- Column: edit_date -->
        <template #cell(edit_date)="data">
          {{ data.value }}
          <b-button
            v-if="!data.item.pending_edit_date"
            variant="secondary"
            class="btn-icon float-right"
            size="sm"
            title="Edit Date"
            @click="editGame(data.item, 'date')"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            v-else
            variant="success"
            class="btn-icon float-right"
            size="sm"
            @click="approveGameEdit(data.item, data.item.pending_edit_date)"
          >
            <feather-icon icon="CheckIcon" />
          </b-button>
        </template>

        <!-- Column: edit_close_time -->
        <template #cell(edit_close_time)="data">
          {{ data.value }}
          <b-button
            v-if="!data.item.pending_edit_close_time"
            variant="secondary"
            class="btn-icon float-right"
            size="sm"
            title="Edit Close Time"
            @click="editGame(data.item, 'close_time')"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            v-else
            variant="success"
            class="btn-icon float-right"
            size="sm"
            @click="approveGameEdit(data.item, data.item.pending_edit_close_time)"
          >
            <feather-icon icon="CheckIcon" />
          </b-button>
        </template>

        <!-- Column: input_result -->
        <template #cell(input_result)="data">
          {{ data.value }}
          <b-button
            v-if="!data.item.pending_edit_market_result"
            variant="secondary"
            class="btn-icon float-right"
            size="sm"
            title="Input Result"
            @click="editGame(data.item, 'market_result')"
          >
            <feather-icon icon="EditIcon" />
          </b-button>
          <b-button
            v-else
            variant="success"
            class="btn-icon float-right"
            size="sm"
            @click="approveGameEdit(data.item, data.item.pending_edit_market_result)"
          >
            <feather-icon icon="CheckIcon" />
          </b-button>
        </template>

        <!-- Column: Status -->
        <template #cell(status)="data">
          <b-badge
            pill
            :variant="`light-${data.item.status === 'online' ? 'success' : 'danger'}`"
            class="text-capitalize"
          >
            {{ data.item.status === 'online' ? 'Online' : 'Offline' }}
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
              @click="edit(data.item, data)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
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
import Game from '@/models/Game'
import dayjs from 'dayjs'
import GamesResultsFilters from '@/components/GamesResultsFilters.vue'
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
    GamesResultsFilters,
  },
  mixins: [
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: Game,
      ...makeTable({
        filter: {
          market_ids: [],
          period: '',
          search: '',
          date_range: '',
        },
        sortBy: 'market_name',
        sortDesc: false,
        columns: [
          {
            key: 'market_code',
            sortable: true,
            formatter: (value, key, item) => (item.market.code),
          },
          {
            key: 'market_name',
            sortable: true,
            formatter: (value, key, item) => (item.market.name),
          },
          { key: 'period', sortable: true },
          {
            key: 'date',
            sortable: true,
            formatter: value => dayjs(value).format('DD-MMM-YYYY'),
            thAttr: { width: '10%' },
          },
          { key: 'close_time', sortable: true },
          { key: 'result_time', sortable: true },
          {
            key: 'market_result', label: 'Result', sortable: true,
          },
        ],
      }),
    }
  },
  mounted() {
  },
  methods: {
    fetchRowsParams() {
      return {
        filter: {
          open: false,
        },
        append: 'result_day_text',
        include: 'market',
      }
    },
    editGame(item, field) {
      this.$refs.formModal.editting(field)
      this.edit(item)
    },
    approveGameEdit(item, gameEdit) {
      this.$refs.formModal.approving(gameEdit).open()
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

.edit-icon-btn {
  margin-right: 5px;
}
</style>
