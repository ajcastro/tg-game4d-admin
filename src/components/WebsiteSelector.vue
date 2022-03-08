<template>
  <div class="row">
    <div
      class="col-md-4"
    >
      <v-select
        placeholder="- All Websites -"
        :value="selectedWebsiteId"
        :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
        :options="websites"
        :reduce="(item) => item.id"
        label="code"
        class="website-selector"
        @input="onSelectWebsite"
      />
    </div>
  </div>
</template>

<script>
import {
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    vSelect,
  },
  data() {
    return {
      selected: null,
    }
  },
  computed: {
    ...mapState({
      websites: state => state.websiteSelector.websites,
      selectedWebsiteId: state => state.websiteSelector.selectedWebsiteId,
    }),
  },
  async created() {
    await this.getWebsites()
  },
  methods: {
    ...mapActions('websiteSelector', [
      'getWebsites',
    ]),
    onSelectWebsite($event) {
      this.$store.commit('websiteSelector/selectWebsiteId', $event)
      this.$root.$emit('selected-website', { website_selector_website_id: $event, website_id: $event })
    },
  },
}
</script>

<style>
.website-selector.vs--single .vs__dropdown-toggle {
  background-color: #28c76f;
  color: #ffffff !important;
}

.website-selector.vs--single .vs__selected,
.website-selector.vs--single .vs__actions .vs__clear svg,
.website-selector.vs--single .vs__search::placeholder,
.dark-layout .website-selector.v-select.vs--single .vs__selected {
  color: #ffffff !important;
}
</style>
