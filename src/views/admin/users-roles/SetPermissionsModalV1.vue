<template>
  <div>
    <b-modal
      ref="bModal"
      :title="`Set Permissions for ${role.name} (${(role.parent_group||{}).code})`"
      hide-footer
      size="md"
      no-close-on-backdrop
      @hidden="reset()"
      @show="getAllRequiredData()"
    >
      <div class="text-right mb-1">
        <b-button
          variant="primary"
          size="sm"
          class=""
          @click="toggleSelectAll()"
        >
          <span
            v-if="isAllSelected"
            class="text-nowrap"
          >Unselect All</span>
          <span
            v-else
            class="text-nowrap"
          >Select All</span>
        </b-button>
      </div>
      <b-form @submit.prevent="save">
        <div
          v-for="(childPermissions, groupDisplay) in groupedPermissions"
          :key="groupDisplay"
        >
          <b-row>
            <b-col class="font-weight-bolder">
              {{ groupDisplay }}
            </b-col>
            <b-col class="text-right">
              <b-button
                variant="primary"
                size="sm"
                class="mb-1"
                @click="toggleSelectAllGroup(groupDisplay)"
              >
                <span
                  v-if="isAllSelectedGroup(groupDisplay)"
                  class="text-nowrap"
                >Unselect</span>
                <span
                  v-else
                  class="text-nowrap"
                >Select</span>
              </b-button>
            </b-col>
          </b-row>
          <b-list-group class="mb-1">
            <b-list-group-item
              v-for="permission in childPermissions"
              :key="permission.id"
              class="d-flex justify-content-between align-items-center"
            >
              <span>{{ permission.label }}</span>
              <b-form-checkbox
                v-model="selectedPermissions"
                :value="permission.id"
              />
            </b-list-group-item>
          </b-list-group>
        </div>

        <b-row>
          <!-- submit and reset -->
          <b-col
            cols="12"
            class="text-right"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              :disabled="loading"
              type="submit"
              variant="primary"
              class=""
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
      </b-form>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BForm, BButton, BSpinner,
  BListGroup, BListGroupItem, BFormCheckbox,
} from 'bootstrap-vue'
import groupBy from 'lodash/groupBy'
import isEqual from 'lodash/isEqual'
import difference from 'lodash/difference'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BSpinner,
    BListGroup,
    BListGroupItem,
    BFormCheckbox,

  },
  directives: {
    Ripple,
  },
  mixins: [
  ],
  data() {
    return {
      role: {},
      loading: false,
      permissions: [],
      groupedPermissions: {},
      selectedPermissions: [],
    }
  },
  computed: {
    isAllSelected() {
      return isEqual(this.selectedPermissions, this.permissions.map(i => i.id))
    },
  },
  methods: {
    setRole(role) {
      this.role = role
    },
    isAllSelectedGroup(group) {
      const permissions = this.groupedPermissions[group] || []
      const diff = difference(permissions.map(i => i.id), this.selectedPermissions)

      return diff.length === 0
    },
    toggleSelectAllGroup(group) {
      const permissionIds = (this.groupedPermissions[group] || []).map(i => i.id)
      if (this.isAllSelectedGroup(group)) {
        this.selectedPermissions = this.selectedPermissions.filter(id => !permissionIds.includes(id))
      } else {
        this.selectedPermissions = [
          ...this.selectedPermissions,
          ...permissionIds,
        ]
      }
    },
    toggleSelectAll() {
      if (this.isAllSelected) {
        this.selectedPermissions = []
      } else {
        this.selectedPermissions = this.permissions.map(i => i.id)
      }
    },
    reset() {
      this.role = {}
      this.loading = false
      this.selectedPermissions = []
    },
    async getAllRequiredData() {
      this.loading = true
      await this.getRolePermissions()
      await this.getAllPermissions()
      this.loading = false
    },
    async getRolePermissions() {
      const res = await this.$http.get(`api/admin/roles/${this.role.id}/permissions`)
      this.selectedPermissions = res.data.data.map(i => i.id)
      return Promise.resolve({})
    },
    async getAllPermissions() {
      const res = await this.$http.get('api/admin/permissions', { params: { paginate: false, append: 'group,group_display' } })
      this.permissions = [...res.data.data]
      this.groupedPermissions = groupBy(res.data.data, 'group_display')
      return Promise.resolve({})
    },
    async save() {
      this.loading = true
      await this.$http.post(`api/admin/roles/${this.role.id}/set_permissions`, {
        permission_ids: this.selectedPermissions,
      })
      this.$notifySuccess('Successfully Saved Permissions!')
      this.loading = false
      this.$refs.bModal.hide()
    },
  },
}
</script>

<style>

</style>
