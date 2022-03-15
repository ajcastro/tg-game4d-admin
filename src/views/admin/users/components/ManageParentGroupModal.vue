<template>
  <div>
    <b-modal
      ref="bModal"
      :title="'Manage Parent Groups for '+(user||{}).username"
      hide-footer
      no-close-on-backdrop
      size="lg"
      @hidden="resetForm()"
      @show="(getUserParentGroups(), getRoleOptions(), getParentGroupOptions())"
    >
      <template>
        <b-row class="mb-2">
          <b-col
            cols="12"
            md="6"
            class="mb-md-0 mb-2"
          >
            <label>Select Parent Code</label>
            <v-select
              v-model="selectParentGroup"
              id-for="v-parent_group"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="code"
              :options="parentGroupFinalOptions"
            />
          </b-col>
          <b-col
            cols="12"
            md="3"
            class="mb-md-0 mb-2"
          >
            <label> &nbsp; </label>
            <div>
              <b-button
                variant="primary"
                @click="addItem()"
              >
                Add
              </b-button>
            </div>
          </b-col>
        </b-row>

        <b-table
          :fields="columns"
          responsive="sm"
          :items="items"
          show-empty
          empty-text="No parent groups"
        >
          <!-- Column: Role -->
          <template #cell(role)="data">
            <div>
              <v-select
                v-model="data.item.role_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :reduce="val => val.id"
                :options="roleOptions"
                style="min-width: 200px;"
              />
            </div>
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

        <b-row>
          <b-col
            cols="12"
            class="text-right"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              :disabled="loading"
              variant="primary"
              class=""
              @click="save()"
            >
              <b-spinner
                v-if="loading"
                small
                class="mr-1"
              />
              Save
            </b-button>
          </b-col>
        </b-row>
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
import vSelect from 'vue-select'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    vSelect,
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
      columns: [
        { key: 'row_number', label: '#' },
        { key: 'parent_group' },
        { key: 'role' },
        { key: 'actions', label: '' },
      ],

      user: null,
      parentGroups: [],

      parentGroupOptions: [],
      roleOptions: [],
      selectParentGroup: null,
    }
  },
  computed: {
    items() {
      return this.parentGroups.map((pg, index) => ({
        row_number: index + 1,
        parent_group_id: pg.id,
        parent_group: pg.code,
        role: pg.pivot.role_id,
        role_id: pg.pivot.role_id,
      }))
    },
    parentGroupFinalOptions() {
      const selectedParentGroupIds = this.items.map(i => i.parent_group_id)
      return this.parentGroupOptions.filter(i => !selectedParentGroupIds.includes(i.id))
    },
  },
  methods: {
    setUser(user) {
      this.user = user
      return this
    },
    open() {
      this.$refs.bModal.show()
    },
    close() {
      this.$refs.bModal.hide()
    },
    async getUserParentGroups() {
      const { data } = await this.$http.get(`/api/admin/users/${this.user.id}/parent_groups`)
      this.parentGroups = data.data
    },
    async getRoleOptions() {
      const res = await this.$http.get('api/admin/roles', { params: { paginate: false } })
      this.roleOptions = res.data.data
    },
    async getParentGroupOptions() {
      const res = await this.$http.get('api/admin/parent_groups', { params: { paginate: false } })
      this.parentGroupOptions = res.data.data
    },
    addItem() {
      if (!this.selectParentGroup) return
      this.parentGroups.push({ ...this.selectParentGroup, pivot: { role_id: null } })
      this.selectParentGroup = null
    },
    removeItem(index) {
      this.parentGroups.splice(index, 1)
    },
    async save() {
      try {
        this.loading = true
        const items = this.items.map(i => ({ parent_group_id: i.parent_group_id, role_id: i.role_id }))
        await this.$http.post(`/api/admin/users/${this.user.id}/parent_groups`, { items })
        this.$notifySuccess('Successfully Saved!')
        this.close()
      } catch (error) {
        this.$notifyError422(error)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>

</style>
