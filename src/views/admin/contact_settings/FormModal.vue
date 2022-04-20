<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Contact'"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
      @show="(getResource())"
    >
      <b-form @submit.prevent="save">
        <b-row>
          <!-- title -->
          <b-col cols="12">
            <b-form-group
              label="Title"
              label-for="v-title"
            >
              <b-form-input
                id="v-title"
                v-model="form.title"
                :state="null"
                :readonly="!canSave"
                @input="errors.title = []"
              />
              <input-errors :errors="errors.title" />
            </b-form-group>
          </b-col>

          <!-- value -->
          <b-col cols="12">
            <b-form-group
              label="Value"
              label-for="v-value"
            >
              <b-form-input
                id="v-value"
                v-model="form.value"
                :state="null"
                :readonly="!canSave"
                @input="errors.value = []"
              />
              <input-errors :errors="errors.value" />
            </b-form-group>
          </b-col>

          <!-- is_shown -->
          <b-col cols="12">
            <b-form-group
              label-for="v-is_shown"
            >
              <b-form-checkbox
                id="checkbox-is_shown"
                v-model="form.is_shown"
                name="checkbox-is_shown"
              >
                Show In Website
              </b-form-checkbox>
              <input-errors :errors="errors.is_shown" />
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
import ContactSetting from '@/models/ContactSetting'
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
      model: ContactSetting,

      roleOptions: [],
      parentGroupOptions: [],
    }
  },
  computed: {
    canSave() {
      if (this.isCreating) {
        return true
      }
      return this.$can('update', 'ContactSetting')
    },
  },
  methods: {
    newModel(attributes) {
      return new this.model({
        ...attributes,
        website_id: this.$store.state.websiteSelector.selectedWebsiteId,
      })
    },
  },
}
</script>

<style>

</style>
