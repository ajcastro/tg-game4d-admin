/* eslint-disable new-cap */
import { ctxToParams } from '@/helpers/table'

export default {
  methods: {
    async fetchRows(ctx) {
      console.log('🚀 ~ file: List.vue ~ line 224 ~ fetchRows ~ ctx', ctx)

      const resource = (new this.model()).resource()

      const res = await this.$http.get(`/api/admin/${resource}`, {
        params: {
          include: 'created_by,updated_by',
          'fields[created_by]': 'id,name',
          'fields[updated_by]': 'id,name',
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
      this.resourceId = item.id
      await this.$nextTick()
      this.$refs.formModal.$refs.bModal.show()
    },
    async remove(item) {
      try {
        const confirmed = await this.$bvModal.msgBoxConfirm('Are you sure to delete this item?', {
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

        if (!confirmed) return

        const model = new this.model(item)
        await model.delete()

        this.$refs.resourceTable.refresh()
      } catch (err) {
        console.log('🚀 ~ file: List.vue ~ line 274 ~ remove ~ err', err)
      }
    },
  },
}
