export default {
  methods: {
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
