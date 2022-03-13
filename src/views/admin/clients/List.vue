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
              <b-button
                variant="primary"
                @click="add()"
              >
                <span class="text-nowrap">Add Client</span>
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
              @click="edit(data.item, data)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
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
import Client from '@/models/Client'
import resourceTable from '@/mixins/resource/resource-table'
import dayjs from 'dayjs'
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
  },
  mixins: [
    resourceTable,
  ],
  data() {
    return {
      resourceId: null,
      model: Client,
      ...makeTable({
        columns: [
          { key: 'actions' },
          { key: 'code', sortable: true },
          { key: 'remarks', sortable: false },
          { key: 'percentage_share', sortable: true },
          { key: 'is_active', sortable: true },
          {
            key: 'created_by',
            sortable: true,
            formatter: (value, key, item) => item.created_by.name,
          },
          {
            key: 'created_at',
            sortable: true,
            formatter: value => dayjs(value).format('DD MMM YYYY, hh:mm a'),
          },
          {
            key: 'updated_by',
            sortable: true,
            formatter: (value, key, item) => item.updated_by.name,
          },
          {
            key: 'updated_at',
            sortable: true,
            formatter: value => dayjs(value).format('DD MMM YYYY, hh:mm a'),
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
