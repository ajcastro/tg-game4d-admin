/* eslint-disable new-cap */
export default {
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
    async enterRemarks(item) {
      const remarks = await this.$refs.askForRemarks.ask(item.remarks)
      this.$refs.askForRemarks.setLoading(true)
      await this.$http.post(`api/admin/member_transactions/${item.id}/enter_remarks`, { remarks })
      this.$refs.askForRemarks.setLoading(false)
      this.$refs.askForRemarks.hide()
      this.$notifySuccess('Remarks has been saved.')
      this.$refs.resourceTable.refresh()
    },
  },
}
