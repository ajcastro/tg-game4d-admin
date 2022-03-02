/* eslint-disable new-cap */
export default {
  props: {
    resourceId: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      closeOnSave: true,
      formDisabled: false,
      loading: false,
      form: {},
      formOriginal: {},
      errors: {},
      model: null, // this is required, please assign your model in your component
    }
  },
  computed: {
    isCreating() {
      return !this.resourceId
    },
  },
  created() {
    this.formOriginal = { ...this.form }
  },
  methods: {
    setFormDisabled(disabled = true) {
      this.formDisabled = disabled
    },
    newModel(attributes) {
      return new this.model(attributes)
    },
    resetForm() {
      this.$emit('update:resource-id', null)
      this.form = { ...this.formOriginal }
      this.loading = false
      this.errors = {}
    },
    async getResource() {
      if (!this.resourceId) return

      this.loading = true
      const res = await this.model.find(this.resourceId)
      this.form = { ...res.data }
      this.loading = false
    },
    async save() {
      try {
        this.loading = true
        const model = this.newModel({
          id: this.resourceId,
          ...this.form,
        })
        const res = await model.save()
        this.$emit('update:resource-id', res.id)
        this.$notifySuccess('Successfully Saved!')
        this.errors = {}
        this.$emit('save', res)
        if (this.closeOnSave) {
          this.$refs.bModal.hide()
        }
      } catch (err) {
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
