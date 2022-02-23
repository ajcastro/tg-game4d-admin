<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Parent Group'"
      hide-footer
      no-close-on-backdrop
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
                :state="null"
              />
              <input-errors :errors="errors.code" />
            </b-form-group>
          </b-col>

          <!-- client -->
          <b-col cols="12">
            <b-form-group
              label="Assigned Client"
              label-for="v-client"
            >
              <v-select
                v-model="form.client_id"
                id-for="v-client"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="clientOptions"
                :reduce="(item) => item.id"
              />
              <input-errors :errors="errors.client_id" />
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
              <input-errors :errors="errors.remarks" />
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormTextarea,
  BSpinner,
} from 'bootstrap-vue'
import ParentGroup from '@/models/ParentGroup'
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
    BSpinner,

    InputErrors,

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
      model: ParentGroup,
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
