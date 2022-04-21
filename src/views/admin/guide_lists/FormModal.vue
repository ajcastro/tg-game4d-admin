<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Guide'"
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

          <!-- category -->
          <b-col cols="12">
            <b-form-group
              label="Category"
              label-for="v-category"
            >
              <b-form-input
                id="v-category"
                v-model="form.category"
                :state="null"
                :readonly="!canSave"
                @input="errors.category = []"
              />
              <input-errors :errors="errors.category" />
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
import GuideList from '@/models/GuideList'
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
      model: GuideList,

      roleOptions: [],
      parentGroupOptions: [],
    }
  },
  computed: {
    canSave() {
      if (this.isCreating) {
        return true
      }
      return this.$can('update', 'GuideList')
    },
  },
  methods: {
  },
}
</script>

<style>

</style>
