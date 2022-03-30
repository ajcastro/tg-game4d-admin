<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Promotion'"
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

          <!-- short_description -->
          <b-col cols="12">
            <b-form-group
              label="Short Description"
              label-for="v-short_description"
            >
              <b-form-input
                id="v-short_description"
                v-model="form.short_description"
                :state="null"
                :readonly="!canSave"
                @input="errors.short_description = []"
              />
              <input-errors :errors="errors.short_description" />
            </b-form-group>
          </b-col>

          <!-- description -->
          <b-col cols="12">
            <b-form-group
              label="Description"
              label-for="v-description"
            >
              <b-form-textarea
                id="v-description"
                v-model="form.description"
                :state="null"
                :readonly="!canSave"
                @input="errors.description = []"
              />
              <input-errors :errors="errors.description" />
            </b-form-group>
          </b-col>

          <!-- sort_order -->
          <b-col cols="12">
            <b-form-group
              label="Sort Order"
              label-for="v-sort_order"
            >
              <b-form-input
                id="v-sort_order"
                v-model="form.sort_order"
                :state="null"
                :readonly="!canSave"
                type="number"
                @input="errors.sort_order = []"
              />
              <input-errors :errors="errors.sort_order" />
            </b-form-group>
          </b-col>

          <!-- slug -->
          <!-- TODO: Convert into javascript-side slug generator using @/helpers/slugify  -->
          <b-col cols="12">
            <b-form-group
              label="Slug"
              label-for="v-slug"
            >
              <b-form-input
                id="v-slug"
                v-model="form.slug"
                :state="null"
                :readonly="!canSave"
                @input="errors.slug = []"
              />
              <input-errors :errors="errors.slug" />
            </b-form-group>
          </b-col>

          <!-- image -->
          <b-col cols="12">
            <b-form-group
              label="Image"
              label-for="v-image"
            >
              <b-form-file
                id="v-image"
                v-model="form.image"
                :state="null"
                :readonly="!canSave"
                accept="image/*"
                @input="errors.image = []"
              />
              <input-errors :errors="errors.image" />
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
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BSpinner, BFormTextarea, BFormFile,
} from 'bootstrap-vue'
import Promotion from '@/models/Promotion'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import slugify from '@/helpers/slugify'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormTextarea,
    BFormFile,
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
      form: { title: '', slug: '' },
      errors: {},
      model: Promotion,

      roleOptions: [],
      parentGroupOptions: [],
    }
  },
  computed: {
    canSave() {
      if (this.isCreating) {
        return true
      }
      return this.$can('update', 'Promotion')
    },
  },
  watch: {
    // eslint-disable-next-line func-names
    'form.title': function (value) {
      if (this.isCreating) {
        const slug = slugify(value)
        this.form = { ...this.form, slug }
      }
    },
  },
  methods: {
    populateForm(data) {
      // see https://stackoverflow.com/a/44396079
      const { image, image_thumb, ...form } = data
      return form
    },
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
