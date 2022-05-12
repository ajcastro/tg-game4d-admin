<template>
  <div>
    <b-modal
      ref="bModal"
      :title="editFieldTitle"
      hide-footer
      no-close-on-backdrop
      @hidden="resetForm()"
    >
      <!-- @show="(getResource())" -->
      <b-form @submit.prevent="save">
        <b-row>
          <!-- date -->
          <b-col
            v-if="editField === 'date'"
            cols="12"
          >
            <b-form-group
              label="Date"
              label-for="v-date"
            >
              <b-form-input
                id="v-date"
                v-model="form.date"
                :readonly="!canSave"
                type="date"
                @input="errors.date = []"
              />
              <input-errors :errors="errors.date" />
            </b-form-group>
          </b-col>

          <!-- close_time -->
          <b-col
            v-if="editField === 'close_time'"
            cols="12"
          >
            <b-form-group
              label="Close Time"
              label-for="v-close_time"
            >
              <b-form-input
                id="v-close_time"
                v-model="form.close_time"
                :readonly="!canSave"
                @input="errors.close_time = []"
              />
              <input-errors :errors="errors.close_time" />
            </b-form-group>
          </b-col>

          <!-- market_result -->
          <b-col
            v-if="editField === 'market_result'"
            cols="12"
          >
            <b-form-group
              label="Market Result"
              label-for="v-market_result"
            >
              <b-form-input
                id="v-market_result"
                v-model="form.market_result"
                :readonly="!canSave"
                @input="errors.market_result = []"
              />
              <input-errors :errors="errors.market_result" />
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
import Game from '@/models/Game'
import InputErrors from '@/components/InputErrors.vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import dayjs from 'dayjs'

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
      model: Game,
      editField: null,

    }
  },
  computed: {
    canSave() {
      return true
    },
    editFieldTitle() {
      if (this.editField === 'date') {
        return 'Edit Date'
      }
      if (this.editField === 'close_time') {
        return 'Edit Close Time'
      }
      if (this.editField === 'market_result') {
        return 'Input Result'
      }
      return ''
    },
  },
  methods: {
    editting(field) {
      this.editField = field
    },
    populateForm(data) {
      return {
        ...data,
        date: dayjs(data.date).format('YYYY-MM-DD'),
      }
    },
    newModel(attributes) {
      const params = {
        id: attributes.id,
      }
      params[this.editField] = attributes[this.editField] || ''
      return new this.model(params)
    },
  },
}
</script>

<style>

</style>
