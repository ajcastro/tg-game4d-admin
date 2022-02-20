<template>
  <div>
    <small
      v-for="error in errors"
      :key="error"
      class="text-danger d-block"
    >{{ error }}</small>
    <!-- try remove d-block class and its margin-top from input is different -->
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style>

</style>
