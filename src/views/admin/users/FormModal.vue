<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' User'"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getResource(), getRoleOptions(), getParentGroupOptions())"
    >
      <b-form @submit.prevent="save">
        <b-row>
          <!-- name -->
          <b-col cols="12">
            <b-form-group
              label="Name"
              label-for="v-name"
            >
              <b-form-input
                id="v-name"
                v-model="form.name"
                :state="null"
                @input="errors.name = []"
              />
              <input-errors :errors="errors.name" />
            </b-form-group>
          </b-col>

          <!-- username -->
          <b-col cols="12">
            <b-form-group
              label="Username"
              label-for="v-username"
            >
              <b-form-input
                id="v-username"
                v-model="form.username"
                :state="null"
                @input="errors.username = []"
              />
              <input-errors :errors="errors.username" />
            </b-form-group>
          </b-col>

          <!-- email -->
          <b-col cols="12">
            <b-form-group
              label="Email"
              label-for="v-email"
            >
              <b-form-input
                id="v-email"
                v-model="form.email"
                autocomplete="off"
                :state="null"
                @input="errors.email = []"
              />
              <input-errors :errors="errors.email" />
            </b-form-group>
          </b-col>

          <!-- parent_group -->
          <b-col cols="12">
            <b-form-group
              label="Parent Code"
              label-for="v-parent_group"
            >
              <v-select
                v-model="form.parent_group_id"
                id-for="v-parent_group"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="code"
                :options="parentGroupOptions"
                :reduce="(item) => item.id"
                @input="errors.parent_group_id = []"
              />
              <input-errors :errors="errors.parent_group_id" />
            </b-form-group>
          </b-col>

          <!-- role -->
          <b-col cols="12">
            <b-form-group
              label="Role"
              label-for="v-role"
            >
              <v-select
                v-model="form.role_id"
                id-for="v-role"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="roleOptions"
                :reduce="(item) => item.id"
                @input="errors.role_id = []"
              />
              <input-errors :errors="errors.role_id" />
            </b-form-group>
          </b-col>

          <!-- password -->
          <b-col cols="12">
            <b-form-group
              label="Password"
              label-for="v-password"
            >
              <b-form-input
                id="v-password"
                v-model="form.password"
                autocomplete="off"
                :state="null"
                type="password"
                @input="errors.password = []"
              />
              <input-errors :errors="errors.password" />
            </b-form-group>
          </b-col>

          <!-- password_confirmation -->
          <b-col cols="12">
            <b-form-group
              label="Confirm Password"
              label-for="v-password_confirmation"
            >
              <b-form-input
                id="v-password_confirmation"
                v-model="form.password_confirmation"
                autocomplete="off"
                type="password"
                :state="null"
              />
              <input-errors :errors="errors.password_confirmation" />
            </b-form-group>
          </b-col>

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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import User from '@/models/User'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BSpinner,
    vSelect,

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
      form: {},
      errors: {},
      model: User,

      roleOptions: [],
      parentGroupOptions: [],
    }
  },
  methods: {
    async getRoleOptions() {
      const res = await this.$http.get('api/admin/roles', { params: { paginate: false } })
      this.roleOptions = res.data.data
    },
    async getParentGroupOptions() {
      const res = await this.$http.get('api/admin/parent_groups', { params: { paginate: false } })
      this.parentGroupOptions = res.data.data
    },
  },
}
</script>

<style>

</style>
