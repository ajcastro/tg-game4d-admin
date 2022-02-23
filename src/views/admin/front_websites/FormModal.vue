<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Front Website'"
      hide-footer
      @hidden="resetForm()"
      @show="getResource()"
    >
      <b-form @submit.prevent="save">
        <b-row>

          <!-- code -->
          <b-col cols="12">
            <b-form-group
              label="Code"
              label-for="v-code"
            >
              <b-form-input
                id="v-code"
                v-model="form.code"
              />
              <input-errors :errors="errors.code" />
            </b-form-group>
          </b-col>

          <!-- ip_address -->
          <b-col cols="12">
            <b-form-group
              label="IP Address"
              label-for="v-ip_address"
            >
              <b-form-input
                id="v-ip_address"
                v-model="form.ip_address"
              />
              <input-errors :errors="errors.ip_address" />
            </b-form-group>
          </b-col>

          <!-- domain_name -->
          <b-col cols="12">
            <b-form-group
              label="Domain Name"
              label-for="v-domain_name"
            >
              <b-form-input
                id="v-domain_name"
                v-model="form.domain_name"
              />
              <input-errors :errors="errors.domain_name" />
            </b-form-group>
          </b-col>

          <!-- assigned_client -->
          <b-col cols="12">
            <b-form-group
              label="Assigned Client"
              label-for="v-assigned_client"
            >
              <v-select
                v-model="form.assigned_client_id"
                id-for="v-assigned_client"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="clientOptions"
                :reduce="(item) => item.id"
              />
              <input-errors :errors="errors.assigned_client_id" />
            </b-form-group>
          </b-col>

          <!-- remarks -->
          <b-col cols="12">
            <b-form-group
              label="Remarks"
              label-for="v-remarks"
            >
              <b-form-textarea
                id="v-remarks"
                v-model="form.remarks"
                placeholder=""
                rows="2"
              />
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
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormTextarea, BSpinner,
} from 'bootstrap-vue'
import Website from '@/models/Website'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormTextarea,
    InputErrors,
    BSpinner,
    vSelect,
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
      model: Website,
      clientOptions: [],
    }
  },
  mounted() {
    this.getClients()
  },
  methods: {
    async getClients() {
      const res = await this.$http.get('/api/admin/clients', {
        params: {
          'fields[clients]': 'id,code',
          paginate: false,
        },
      })
      this.clientOptions = res.data.data.map(item => ({ ...item, title: item.code }))
    },
  },
}
</script>

<style>

</style>
