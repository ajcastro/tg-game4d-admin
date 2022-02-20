<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(isCreating ? 'Add' : 'Edit') + ' Client'"
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
                :state="null"
              />
              <input-errors :errors="errors.code" />
            </b-form-group>
          </b-col>

          <!-- remarks -->
          <!-- <b-col cols="12">
            <b-form-group
              label="Remarks"
              label-for="v-remarks"
            >
              <b-form-input
                id="v-remarks"
              />
            </b-form-group>
          </b-col> -->

          <!-- percentage_share -->
          <b-col cols="12">
            <b-form-group
              label="Percentage Share"
              label-for="v-percentage_share"
            >
              <b-form-input
                id="v-percentage_share"
                v-model="form.percentage_share"
              />
              <input-errors :errors="errors.percentage_share" />
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
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BFormTextarea,
  BSpinner,
} from 'bootstrap-vue'
import Client from '@/models/Client'
import InputErrors from '@/components/InputErrors'

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
  },
  directives: {
    Ripple,
  },
  props: {
    resourceId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      loading: false,
      form: {},
      errors: {},
    }
  },
  computed: {
    isCreating() {
      return !this.resourceId
    },
  },
  methods: {
    newModel(attributes) {
      return new Client(attributes)
    },
    resetForm() {
      this.$emit('update:resource-id', null)
      this.form = {}
      this.loading = false
      this.errors = {}
    },
    async getResource() {
      if (!this.resourceId) return

      this.loading = true
      const res = await Client.find(this.resourceId)
      this.form = { ...res.data }
      this.loading = false
    },
    async save() {
      this.loading = true
      const model = this.newModel({
        id: this.resourceId,
        ...this.form,
      })
      try {
        const res = await model.save()
        this.$emit('update:resource-id', res.id)
        console.log('🚀 ~ file: FormModal.vue ~ line 138 ~ save ~ res', res)
        console.log('🚀 ~ file: FormModal.vue ~ line 138 ~ save ~ model', model)
        this.$notifySuccess('Successfully Saved!')
      } catch (err) {
        console.log('🚀 ~ file: FormModal.vue ~ line 150 ~ save ~ err', err.response)
        if (!err.response) return
        if (err.response.status === 422) {
          this.errors = { ...err.response.data.errors }
        }
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style>

</style>
