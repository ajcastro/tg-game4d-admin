<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Bank'"
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
              label="Bank Code"
              label-for="v-code"
            >
              <b-form-input
                id="v-code"
                v-model="form.code"
              />
              <input-errors :errors="errors.code" />
            </b-form-group>
          </b-col>

          <!-- name -->
          <b-col cols="12">
            <b-form-group
              label="Bank Name"
              label-for="v-name"
            >
              <b-form-input
                id="v-name"
                v-model="form.name"
              />
              <input-errors :errors="errors.name" />
            </b-form-group>
          </b-col>

          <!-- website -->
          <b-col cols="12">
            <b-form-group
              label="Website"
              label-for="v-website"
            >
              <b-form-input
                id="v-website"
                v-model="form.website"
              />
              <input-errors :errors="errors.website" />
            </b-form-group>
          </b-col>

          <!-- bank_group -->
          <b-col cols="12">
            <b-form-group
              label="Bank Group"
              label-for="v-bank_group"
            >
              <v-select
                v-model="form.bank_group_id"
                id-for="v-bank_group"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="bankGroupOptions"
                :reduce="(item) => item.id"
              />
              <input-errors :errors="errors.bank_group_id" />
            </b-form-group>
          </b-col>

          <!-- logo -->
          <b-col cols="12">
            <b-form-group
              label="Logo"
              label-for="v-logo"
            >
              <b-form-file
                id="v-logo"
                v-model="form.logo"
                :state="null"
                :readonly="!canSave"
                accept="logo/*"
                @input="errors.logo = []"
              />
              <input-errors :errors="errors.logo" />
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormFile, BSpinner,
} from 'bootstrap-vue'
import Bank from '@/models/Bank'
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
    BFormFile,
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
      model: Bank,
      bankGroupOptions: [],
    }
  },
  computed: {
    canSave() {
      return true
    },
  },
  mounted() {
    this.getBankGroups()
  },
  methods: {
    async getBankGroups() {
      const res = await this.$http.get('/api/admin/bank_groups', {
        params: {
          'fields[bank_groups]': 'id,code',
          paginate: false,
        },
      })
      this.bankGroupOptions = res.data.data.map(item => ({ ...item, title: item.code }))
    },
    populateForm(data) {
      // see https://stackoverflow.com/a/44396079
      const { logo, ...form } = data
      return form
    },
  },
}
</script>

<style>

</style>
