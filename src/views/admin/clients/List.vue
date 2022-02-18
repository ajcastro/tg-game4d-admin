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
        ref="refListTable"
        class="position-relative"
        responsive
        primary-key="id"
        show-empty
        empty-text="No matching records found"
        :fields="columns"
        :items="fetchRows"
        :sort-by.sync="sortBy"
        :sort-desc.sync="isSortDirDesc"
        :filter="filter"
        :no-local-sorting="true"
      >
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
              :to="{ name: 'apps-users-edit', params: { id: data.item.id } }"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item>
              <feather-icon icon="TrashIcon" />
              <span class="align-middle ml-50">Delete</span>
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

    <form-modal ref="formModal" />
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
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import axios from '@axios'
import TableOptions from './TableOptions'
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

    vSelect,

    FormModal,
  },
  data() {
    return {
      // ...TableOptions.make(),
      columns: [
        { key: 'id', sortable: true },
        { key: 'code', sortable: true },
        { key: 'remarks', sortable: false },
        { key: 'percentage_share', sortable: true },
        { key: 'actions' },
      ],
      filter: { search: '' },
      currentPage: 1,
      perPage: 10,
      perPageOptions: [10, 25, 50, 100],
      isSortDirDesc: false,
      sortBy: null,
      totalRows: 0,
      meta: [],
    }
  },
  methods: {
    fetchRows(ctx) {
      console.log('called fetch rows..')
      console.log('🚀 ~ file: List.vue ~ line 192 ~ fetchRows ~ ctx', ctx)

      const list = [{
        id: 1,
        code: 'Comb duck',
        remarks: 'projection',
        percentage_share: 21.98,
      }, {
        id: 2,
        code: "Francolin, swainson's",
        remarks: 'focus group',
        percentage_share: 84.26,
      }, {
        id: 3,
        code: 'Chacma baboon',
        remarks: 'Business-focused',
        percentage_share: 25.18,
      }, {
        id: 4,
        code: 'Downy woodpecker',
        remarks: 'optimal',
        percentage_share: 87.55,
      }, {
        id: 5,
        code: 'Skink, african',
        remarks: 'optimal',
        percentage_share: 21.28,
      }, {
        id: 6,
        code: 'Baboon, gelada',
        remarks: 'Proactive',
        percentage_share: 77.83,
      }, {
        id: 7,
        code: 'Lemming, arctic',
        remarks: 'client-driven',
        percentage_share: 66.23,
      }, {
        id: 8,
        code: 'Cheetah',
        remarks: 'Exclusive',
        percentage_share: 15.17,
      }, {
        id: 9,
        code: 'Fox, grey',
        remarks: 'Cross-platform',
        percentage_share: 84.28,
      }, {
        id: 10,
        code: 'Blue crane',
        remarks: 'web-enabled',
        percentage_share: 29.0,
      }]

      return list

      // const res = await this.$http.get('/api/admin/clients')
      // return Promise.resolve()
      // return axios.get('/api/admin/clients', {
      //   params: TableOptions.toQueryParams(ctx),
      // })
    },
    add() {
      this.$refs.formModal.$refs.bModal.show()
    },
    edit(row) {
      this.$refs.formModal.$refs.bModal.show()
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
