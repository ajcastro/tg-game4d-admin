<template>
  <div>
    <b-modal
      ref="bModal"
      :title="'View Users for '+(parentGroup||{}).code"
      hide-footer
      no-close-on-backdrop
      size="lg"
      @hidden="(resetForm(), users = [])"
      @show="(getParentGroupUsers())"
    >
      <template>
        <b-table
          :fields="columns"
          responsive="sm"
          :items="users"
          show-empty
          :empty-text="loading ? 'Loading...' : 'No users'"
        >
          <!-- Column: Row Number -->
          <template #cell(row_number)="data">
            <div>{{ data.index+1 }}</div>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div>
              <b-button
                variant="danger"
                size="sm"
                class="btn-icon"
                @click="removeItem(data.index)"
              >
                <feather-icon icon="XIcon" />
              </b-button>
            </div>
          </template>
        </b-table>
      </template>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BButton, BSpinner, BTable,
} from 'bootstrap-vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BTable,
    BSpinner,
  },
  directives: {
    Ripple,
  },
  mixins: [
    resourceFormModal,
  ],
  data() {
    return {
      loading: false,
      parentGroup: null,
      columns: [
        { key: 'row_number', label: '#' },
        { key: 'username' },
        { key: 'name' },
        { key: 'email' },
        { key: 'role', formatter: (value, key, item) => item.role.name },
        // { key: 'actions', label: '' },
      ],

      users: [],
    }
  },
  computed: {
  },
  methods: {
    setParentGroup(parentGroup) {
      this.parentGroup = parentGroup
      return this
    },
    open() {
      this.$refs.bModal.show()
    },
    close() {
      this.$refs.bModal.hide()
    },
    async getParentGroupUsers() {
      this.loading = true
      const { data } = await this.$http.get(`api/admin/parent_groups/${this.parentGroup.id}/users`)
      this.loading = false
      this.users = data.data
    },
  },
}
</script>

<style>

</style>
