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
                :readonly="!canSave"
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
                :readonly="!canSave"
                @input="errors.username = []"
              />
              <input-errors :errors="errors.username" />
            </b-form-group>
          </b-col>

          <!-- phone -->
          <b-col cols="12">
            <b-form-group
              label="Phone"
              label-for="v-phone"
            >
              <b-form-input
                id="v-phone"
                v-model="form.phone"
                autocomplete="off"
                :state="null"
                :readonly="!canSave"
                @input="errors.phone = []"
              />
              <input-errors :errors="errors.phone" />
            </b-form-group>
          </b-col>

          <!-- is_admin -->
          <b-col cols="12">
            <b-form-group
              label="Is Admin?"
              label-for="v-is_admin"
            >
              <b-form-checkbox
                id="v-is_admin"
                v-model="form.is_admin"
              />
              <input-errors :errors="errors.is_admin" />
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
                :readonly="!canSave"
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
                :readonly="!canSave"
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
              :disabled="loading || !canSave"
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner, BFormCheckbox,
} from 'bootstrap-vue'
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
    BFormCheckbox,

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
  computed: {
    canSave() {
      if (this.isCreating) {
        return true
      }
      return this.$can('update', 'User')
    },
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
