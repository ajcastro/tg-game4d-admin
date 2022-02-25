/* eslint-disable camelcase */
/* eslint-disable new-cap */
import { ctxToParams } from '@/helpers/table'

export default {
  methods: {
    fetchRowsParams() {
      return {
        include: 'created_by,updated_by',
        'fields[created_by]': 'id,name',
        'fields[updated_by]': 'id,name',
      }
    },
    async fetchRows(ctx) {
      console.log('🚀 ~ file: List.vue ~ line 224 ~ fetchRows ~ ctx', ctx)

      const resource = (new this.model()).resource()

      const res = await this.$http.get(`/api/admin/${resource}`, {
        params: {
          ...this.fetchRowsParams(),
          ...ctxToParams(ctx),
        },
      })

      this.meta = {
        from: res.data.meta.from,
        to: res.data.meta.to,
        of: res.data.meta.total,
      }

      this.totalRows = res.data.meta.total

      return res.data.data
    },
    add() {
      this.$refs.formModal.$refs.bModal.show()
    },
    async edit(item) {
      this.$refs.formModal.setFormDisabled(false)
      this.resourceId = item.id
      await this.$nextTick()
      this.$refs.formModal.$refs.bModal.show()
    },
    async view(item) {
      this.$refs.formModal.setFormDisabled(true)
      this.resourceId = item.id
      await this.$nextTick()
      this.$refs.formModal.$refs.bModal.show()
    },
    confirm(confirmMessage = 'Are you sure?') {
      return this.$bvModal.msgBoxConfirm(confirmMessage, {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'YES',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true,
      })
    },
    refreshResourceTable() {
      this.$refs.resourceTable.refresh()
    },
    async remove(item) {
      try {
        const confirmed = await this.confirm('Are you sure to delete this item?')

        if (!confirmed) return

        const model = new this.model(item)
        await model.delete()
        this.refreshResourceTable()
      } catch (err) {
        console.log('🚀 ~ file: List.vue ~ line 274 ~ remove ~ err', err)
      }
    },
    async setActive(item, is_active) {
      const confirmMessage = is_active
        ? 'Are you sure to set this to active?'
        : 'Are you sure to set this to inactive?'

      const confirmed = await this.confirm(confirmMessage)

      if (!confirmed) return

      const resource = (new this.model()).resource()

      await this.$http.post(`/api/admin/${resource}/${item.id}/set_active`, {
        is_active,
      })

      this.refreshResourceTable()
    },
    resolveIsActiveVariant(is_active) {
      return is_active ? 'success' : 'secondary'
    },
  },
}
