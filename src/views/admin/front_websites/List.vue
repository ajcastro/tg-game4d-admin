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
                <span class="text-nowrap">Add Front Website</span>
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
              @click="edit(data.item, data)"
            >
              <feather-icon icon="EditIcon" />
              <span class="align-middle ml-50">Edit</span>
            </b-dropdown-item>

            <b-dropdown-item @click="remove(data.item, data)">
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
        { key: 'assigned_client', sortable: true },
        { key: 'ip_address', sortable: true },
        { key: 'domain_name', sortable: true },
        { key: 'is_active', sortable: true },
        { key: 'remarks', sortable: false },
        { key: 'created_by', sortable: true },
        { key: 'updated_by', sortable: true },
        { key: 'created_at', sortable: true },
        { key: 'updated_at', sortable: true },
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
        code: '76237-145',
        remarks: 'Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        assigned_client: 'Gay Breche',
        ip_address: '126.28.51.251',
        domain_name: 'mapy.cz',
        is_active: true,
        created_by: 'Lorrayne Jillions',
        updated_by: 'Ali Braunlein',
      }, {
        id: 2,
        code: '68258-7013',
        remarks: 'In blandit ultrices enim.',
        assigned_client: 'Carolan Drysdall',
        ip_address: '154.252.241.132',
        domain_name: 'etsy.com',
        is_active: false,
        created_by: 'Drusi Belfitt',
        updated_by: 'Leon McCard',
      }, {
        id: 3,
        code: '62111-0212',
        remarks: 'Proin eu mi.',
        assigned_client: 'Micah Klamman',
        ip_address: '10.245.42.144',
        domain_name: 'disqus.com',
        is_active: false,
        created_by: 'Billye Oneile',
        updated_by: 'Arlie Peacocke',
      }, {
        id: 4,
        code: '0268-0625',
        remarks: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin risus. Praesent lectus.',
        assigned_client: 'Annadiane Biskupek',
        ip_address: '139.127.58.121',
        domain_name: 'vistaprint.com',
        is_active: false,
        created_by: 'Malena Mendonca',
        updated_by: 'Alma Alpine',
      }, {
        id: 5,
        code: '49348-039',
        remarks: 'Nullam molestie nibh in lectus. Pellentesque at nulla.',
        assigned_client: 'Sophie Yeaman',
        ip_address: '200.33.51.54',
        domain_name: 'census.gov',
        is_active: false,
        created_by: 'Karol Dumingo',
        updated_by: 'Alfredo Woodbridge',
      }, {
        id: 6,
        code: '55505-103',
        remarks: 'Nulla tellus. In sagittis dui vel nisl.',
        assigned_client: 'Melvin Antonutti',
        ip_address: '95.16.87.146',
        domain_name: 'bing.com',
        is_active: true,
        created_by: 'Rosabel Rebillard',
        updated_by: 'Colly Oxherd',
      }, {
        id: 7,
        code: '52685-335',
        remarks: 'Donec posuere metus vitae ipsum.',
        assigned_client: 'Yetta Doubleday',
        ip_address: '37.180.202.14',
        domain_name: 'acquirethisname.com',
        is_active: false,
        created_by: 'Irvine Heinish',
        updated_by: 'Trever Abbotts',
      }, {
        id: 8,
        code: '64950-901',
        remarks: 'Aenean sit amet justo. Morbi ut odio.',
        assigned_client: 'Riccardo Hardesty',
        ip_address: '132.62.225.164',
        domain_name: 'buzzfeed.com',
        is_active: true,
        created_by: 'Greer Richemont',
        updated_by: 'Ossie Bister',
      }, {
        id: 9,
        code: '44087-0188',
        remarks: 'Etiam vel augue.',
        assigned_client: 'Farr Kings',
        ip_address: '48.252.50.15',
        domain_name: 'uol.com.br',
        is_active: false,
        created_by: 'Rolland Cardello',
        updated_by: 'Ferrell Doggart',
      }, {
        id: 10,
        code: '53499-7172',
        remarks: 'Vivamus vestibulum sagittis sapien.',
        assigned_client: 'Tallie Sappy',
        ip_address: '96.72.15.60',
        domain_name: 'miibeian.gov.cn',
        is_active: true,
        created_by: 'Katherine Blaasch',
        updated_by: 'Andreas Truter',
      }]

      return list.map(item => ({
        ...item,
        remarks: 'lorem ipsum dolor sit amet',
        created_at: '02/18/2022 02:00 pm',
        updated_at: '02/18/2022 02:00 pm',
      }))

      // const res = await this.$http.get('/api/admin/clients')
      // return Promise.resolve()
      // return axios.get('/api/admin/clients', {
      //   params: TableOptions.toQueryParams(ctx),
      // })
    },
    add() {
      this.$refs.formModal.$refs.bModal.show()
    },
    edit(item) {
      console.log('🚀 ~ file: List.vue ~ line 289 ~ edit ~ item', item)
      this.$refs.formModal.$refs.bModal.show()
    },
    remove(item) {
      this.$bvModal.msgBoxConfirm('Are you sure to delete this item?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
        .then(confirmed => {
          if (confirmed) { console.log(confirmed, 'deleting...', item) }
        })
        .catch(err => {
          // An error occurred
        })
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
