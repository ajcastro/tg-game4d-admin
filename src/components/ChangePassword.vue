<template>
  <div>
    <b-modal
      ref="bModal"
      title="Change Password"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
    >
      <b-form @submit.prevent="save">
        <b-row>
          <!-- old_password -->
          <b-col cols="12">
            <b-form-group
              label="Old Password"
              label-for="v-password"
            >
              <b-form-input
                id="v-old_password"
                v-model="form.old_password"
                autocomplete="off"
                :state="null"
                type="password"
                :readonly="!canSave"
                @input="errors.old_password = []"
              />
              <input-errors :errors="errors.old_password" />
            </b-form-group>
          </b-col>

          <!-- new_password -->
          <b-col cols="12">
            <b-form-group
              label="New Password"
              label-for="v-new_password"
            >
              <b-form-input
                id="v-new_password"
                v-model="form.new_password"
                autocomplete="off"
                :state="null"
                type="password"
                :readonly="!canSave"
                @input="errors.new_password = []"
              />
              <input-errors :errors="errors.new_password" />
            </b-form-group>
          </b-col>

          <!-- new_password_confirmation -->
          <b-col cols="12">
            <b-form-group
              label="Confirm Password"
              label-for="v-new_password_confirmation"
            >
              <b-form-input
                id="v-new_password_confirmation"
                v-model="form.new_password_confirmation"
                autocomplete="off"
                type="password"
                :state="null"
                :readonly="!canSave"
              />
              <input-errors :errors="errors.new_password_confirmation" />
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner,
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
    }
  },
  computed: {
    canSave() {
      return true
    },
  },
  methods: {
    async save() {
      try {
        this.loading = true
        await this.$http.post('api/auth/change_password', this.form)
        this.$notifySuccess('Password is successfully changed.')
        this.close()
      } catch (err) {
        if (!err.response) return
        if (err.response.status === 422) {
          this.errors = { ...err.response.data.errors }
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>

</style>
