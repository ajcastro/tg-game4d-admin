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
            {{ isCreating ? 'New' : 'Edit' }} Guide Content
          </b-card-title>
        </div>
        <div class="col col-md-6 text-right p-0">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            :disabled="loading"
            variant="secondary"
            class=""
            to="/guide_contents"
          >
            Back
          </b-button>
        </div>
      </div>

      <b-card-body>

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
                  readonly
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
                  readonly
                  @input="errors.category = []"
                />
                <input-errors :errors="errors.category" />
              </b-form-group>
            </b-col>

            <!-- content -->
            <b-col cols="12">
              <b-form-group
                label="Content"
                label-for="v-content"
              >
                <quill-editor
                  v-model="form.guide_content.content"
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
                to="/guide_contents"
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
import GuideContent from '@/models/GuideContent'
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
      model: GuideContent,
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
      this.$router.replace('/guide_contents')
    },
  },
  created() {
    if (!this.selectedWebsiteId) {
      this.$router.replace('/guide_contents')
    } else {
      this.getResource()
    }
  },
  methods: {
    newModel() {
      return new this.model({
        id: this.resourceId,
        content: this.form.guide_content.content,
      })
    },
    close() {
      this.$router.push('/guide_contents')
    },
  },
}
</script>

<style lang="scss">
@import "@core/scss/vue/libs/vue-select.scss";
</style>
