<template>
  <div
    class="mb-4 col-md-6 mx-auto"
  >
    <h5 v-if="role.id">
      Set Permissions for {{ role.name }} ({{ (role.parent_group||{}).code }})
    </h5>
    <b-row class="mt-2 mb-1">
      <b-col class="font-weight-bolder">
        Total - {{ selectedPermissions.length }} / {{ permissions.length }}
      </b-col>
      <b-col class="text-right">
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
      </b-col>
    </b-row>

    <b-form @submit.prevent="save">
      <div
        v-for="(childPermissions, groupDisplay) in groupedPermissions"
        :key="groupDisplay"
      >
        <b-row>
          <b-col class="font-weight-bolder">
            {{ groupDisplay }}
            -
            {{ countSelectedPermissionsPerGroup(groupDisplay) }} / {{ countPermissionsPerGroup(groupDisplay) }}
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

      <!-- submit and reset -->
      <b-row>
        <b-col
          cols="7"
          class="text-left"
        >
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            type="a"
            variant="secondary"
            class=""
            :to="{name: 'roles'}"
          >
            Go Back to Roles
          </b-button>
        </b-col>
        <b-col
          cols="5"
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
import intersection from 'lodash/intersection'

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
  created() {
    this.getAllRequiredData()
  },
  methods: {
    async getAllRequiredData() {
      this.loading = true
      await this.getRole()
      await this.getRolePermissions()
      await this.getAllPermissions()
      this.loading = false
    },
    async getRole() {
      const res = await this.$http.get(`api/admin/roles/${this.$route.params.id}`, { params: { include: 'parent_group' } })
      this.role = { ...res.data.data }
    },
    async getRolePermissions() {
      const res = await this.$http.get(`api/admin/roles/${this.$route.params.id}/permissions`)
      this.selectedPermissions = res.data.data.map(i => i.id)
      return Promise.resolve({})
    },
    async getAllPermissions() {
      const res = await this.$http.get('api/admin/permissions', { params: { paginate: false, append: 'group,group_display' } })
      this.permissions = [...res.data.data]
      this.groupedPermissions = groupBy(res.data.data, 'group_display')
      return Promise.resolve({})
    },

    getPermissionsOfGroup(group) {
      return (this.groupedPermissions[group] || [])
    },
    isAllSelectedGroup(group) {
      const permissions = this.getPermissionsOfGroup(group)
      const diff = difference(permissions.map(i => i.id), this.selectedPermissions)

      return diff.length === 0
    },

    toggleSelectAllGroup(group) {
      const permissionIds = this.getPermissionsOfGroup(group).map(i => i.id)
      if (this.isAllSelectedGroup(group)) {
        this.selectedPermissions = this.selectedPermissions.filter(id => !permissionIds.includes(id))
      } else {
        this.selectedPermissions = [
          ...this.selectedPermissions,
          ...permissionIds,
        ]
      }
    },
    countPermissionsPerGroup(group) {
      return this.getPermissionsOfGroup(group).length
    },
    countSelectedPermissionsPerGroup(group) {
      const permissions = this.getPermissionsOfGroup(group)
      const intersect = intersection(permissions.map(i => i.id), this.selectedPermissions)

      return intersect.length
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
