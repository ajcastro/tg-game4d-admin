<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Role'"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getResource(), getParentGroupOptions())"
    >
      <b-form @submit.prevent="save">
        <b-row>
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
                :disabled="!isCreating"
                @input="errors.parent_group_id = []"
              />
              <input-errors :errors="errors.parent_group_id" />
            </b-form-group>
          </b-col>

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
              />
              <input-errors :errors="errors.name" />
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
import Role from '@/models/Role'
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
      closeOnSave: true,
      loading: false,
      form: {},
      errors: {},
      model: Role,

      parentGroupOptions: [],
    }
  },
  methods: {
    async getParentGroupOptions() {
      const res = await this.$http.get('api/admin/parent_groups', { params: { paginate: false } })
      this.parentGroupOptions = res.data.data
    },
  },
}
</script>

<style>

</style>
