<template>
  <div>
    <b-modal
      ref="bModal"
      title="Broadcast Message"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
    >
      <b-form @submit.prevent="save">
        <b-row>
          <!-- message -->
          <b-col cols="12">
            <b-form-group
              label="Message"
              label-for="v-password"
            >
              <b-form-textarea
                id="v-message"
                v-model="form.message"
                rows="5"
              />
              <input-errors :errors="errors.message" />
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
              Broadcast
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
  BRow, BCol, BFormGroup, BForm, BButton, BSpinner, BFormTextarea,
} from 'bootstrap-vue'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BForm,
    BButton,
    BSpinner,
    BFormTextarea,

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
        await this.$http.post('api/admin/broadcast_messages', this.form)
        this.$notifySuccess('Message is succesfully broadcasted!')
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
