<template>
  <div>
    <b-modal
      ref="bModal"
      :title="'Set Access Code and Roles for '+(user||{}).username"
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
          :items="parentGroups"
          show-empty
          empty-text="No parent groups"
        >
          <!-- Column: Row Number -->
          <template #cell(row_number)="data">
            <div>{{ data.index+1 }}</div>
          </template>

          <!-- Column: Parent Group -->
          <template #cell(parent_group)="data">
            <div>
              <v-select
                v-model="data.item.parent_group_id"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="code"
                :reduce="val => val.id"
                :options="parentGroupOptions"
                style="min-width: 200px;"
              />
              <input-errors
                v-if="(data.item.errors||{}).parent_group_id"
                :errors="['This is required.']"
              />
            </div>
          </template>

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
              <input-errors
                v-if="(data.item.errors||{}).role_id"
                :errors="['This is required.']"
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
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    vSelect,
    BTable,
    BSpinner,
    InputErrors,
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
    }
  },
  computed: {
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
      this.loading = true
      const { data } = await this.$http.get(`/api/admin/users/${this.user.id}/parent_groups`)
      this.parentGroups = data.data
      this.loading = false
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
      this.parentGroups.push({ parent_group_id: null, role_id: null })
    },
    removeItem(index) {
      this.parentGroups.splice(index, 1)
    },
    valid() {
      const parentGroups = this.parentGroups.map(pg => ({
        ...pg,
        errors: {
          parent_group_id: !pg.parent_group_id,
          role_id: !pg.role_id,
        },
      }))

      this.parentGroups = parentGroups

      const valid = parentGroups.filter(pg => (!pg.parent_group_id) || (!pg.role_id)).length === 0
      return valid
    },
    async save() {
      try {
        if (!this.valid()) return

        this.loading = true
        const items = this.parentGroups.map(i => ({ parent_group_id: i.parent_group_id, role_id: i.role_id }))
        await this.$http.post(`/api/admin/users/${this.user.id}/parent_groups`, { items })
        this.$notifySuccess('Successfully Saved!')
        this.close()
      } catch (error) {
        if (!this.$notifyError422(error)) throw error
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>

</style>
