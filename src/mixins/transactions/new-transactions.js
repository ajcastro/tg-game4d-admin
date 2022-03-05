/* eslint-disable new-cap */
import enterRemarks from './enter-remarks'

export default {
  mixins: [
    enterRemarks,
  ],
  methods: {
    async approve(item) {
      const confirmed = await this.$confirm('Are you sure to approve this transaction?')
      if (!confirmed) return

      await this.$http.post(`api/admin/member_transactions/${item.id}/approve`)
      this.$notifySuccess('Successfully Approved!')
      this.$refs.resourceTable.refresh()
    },
    async reject(item) {
      const confirmed = await this.$confirm('Are you sure to reject this transaction?')
      if (!confirmed) return

      await this.$http.post(`api/admin/member_transactions/${item.id}/reject`)
      this.$notifySuccess('Successfully Approved!')
      this.$refs.resourceTable.refresh()
    },
  },
}
