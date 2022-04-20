<template>
  <div class="pb-1">
    <b-card
      no-body
      class="mb-4 col-md-12 mx-auto"
    >
      <div class="card-header">
        <!-- Title & SubTitle -->
        <div class="col col-md-6 p-0">
          <b-card-title>
            {{ isCreating ? 'New' : 'Edit' }} Page Content
          </b-card-title>
        </div>
        <div class="col col-md-6 text-right p-0">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            :disabled="loading"
            variant="secondary"
            class=""
            to="/page_contents"
          >
            Back
          </b-button>
        </div>
      </div>

      <b-card-body>

        <b-form @submit.prevent="save">
          <b-row>
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

            <!-- url -->
            <b-col cols="12">
              <b-form-group
                label="Page URL"
                label-for="v-url"
              >
                <b-form-input
                  id="v-url"
                  v-model="form.url"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.url = []"
                />
                <input-errors :errors="errors.url" />
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

            <!-- meta_title -->
            <b-col cols="12">
              <b-form-group
                label="Meta Title"
                label-for="v-meta_title"
              >
                <b-form-input
                  id="v-meta_title"
                  v-model="form.meta_title"
                  :state="null"
                  :readonly="!canSave"
                  @input="errors.meta_title = []"
                />
                <input-errors :errors="errors.meta_title" />
              </b-form-group>
            </b-col>

            <!-- meta_keyword -->
            <b-col cols="12">
              <b-form-group
                label="Meta Keyword"
                label-for="v-meta_keyword"
              >
                <b-form-textarea
                  id="v-meta_keyword"
                  v-model="form.meta_keyword"
                  placeholder=""
                  rows="2"
                  :readonly="!canSave"
                  @input="errors.meta_keyword = []"
                />
                <input-errors :errors="errors.meta_keyword" />
              </b-form-group>
            </b-col>

            <!-- meta_description -->
            <b-col cols="12">
              <b-form-group
                label="Meta Description"
                label-for="v-meta_description"
              >
                <b-form-textarea
                  id="v-meta_description"
                  v-model="form.meta_description"
                  placeholder=""
                  rows="2"
                  :readonly="!canSave"
                  @input="errors.meta_description = []"
                />
                <input-errors :errors="errors.meta_description" />
              </b-form-group>
            </b-col>

            <!-- content -->
            <b-col cols="12">
              <b-form-group
                label="Content"
                label-for="v-content"
              >
                <quill-editor
                  v-model="form.content"
                  :options="snowOption"
                />
                <input-errors :errors="errors.content" />
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
                variant="secondary"
                class="mr-1"
                to="/page_contents"
              >
                Back
              </b-button>
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
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BForm, BButton, BFormGroup, BFormInput, BSpinner, BFormCheckbox, BFormTextarea,
  BCard, BCardTitle, BCardBody,
} from 'bootstrap-vue'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import PageContent from '@/models/PageContent'
// eslint-disable-next-line
import 'quill/dist/quill.core.css'
// eslint-disable-next-line
import 'quill/dist/quill.snow.css'
// eslint-disable-next-line
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
  components: {
    BRow,
    BCol,
    BForm,
    BButton,
    BFormGroup,
    BFormInput,
    BSpinner,
    BCard,
    BCardTitle,
    BCardBody,
    BFormCheckbox,
    BFormTextarea,

    InputErrors,
    quillEditor,
  },
  directives: {
    Ripple,
  },
  mixins: [
    resourceFormModal,
  ],
  data() {
    return {
      closeOnSave: false,
      loading: false,
      form: {},
      errors: {},
      model: PageContent,
      snowOption: {
        theme: 'snow',
      },
    }
  },
  computed: {
    canSave() {
      return true
    },
    selectedWebsiteId() {
      return this.$store.state.websiteSelector.selectedWebsiteId
    },
  },
  watch: {
    selectedWebsiteId() {
      this.$router.replace('/page_contents')
    },
  },
  created() {
    if (!this.selectedWebsiteId) {
      this.$router.replace('/page_contents')
    } else {
      this.getResource()
    }
  },
  methods: {
    newModel(attributes) {
      return new this.model({ ...attributes, website_id: this.selectedWebsiteId })
    },
    close() {
      this.$router.push('/page_contents')
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
