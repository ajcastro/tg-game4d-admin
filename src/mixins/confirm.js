export default {
  methods: {
    $confirm(confirmMessage) {
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
  },
}
