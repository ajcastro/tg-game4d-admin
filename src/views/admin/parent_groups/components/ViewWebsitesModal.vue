<template>
  <div>
    <b-modal
      ref="bModal"
      :title="'View Websites for '+(parentGroup||{}).code"
      hide-footer
      no-close-on-backdrop
      size="lg"
      @hidden="(resetForm(), websites = [])"
      @show="(getParentGroupWebsites(), getWebsiteOptions())"
    >
      <template>
        <b-row>
          <b-col
            cols="12"
            md="5"
            class="mb-md-2 mb-2"
          >
            <label>Select Website first</label>
            <v-select
              v-model="selectWebsite"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="code"
              :options="websiteFinalOptions"
            />
          </b-col>
          <b-col
            cols="12"
            md="3"
            class="mb-md-2 mb-2"
          >
            <label> &nbsp; </label>
            <div>
              <b-button
                variant="primary"
                :disabled="loading"
                @click="addWebsite()"
              >
                <b-spinner
                  v-if="loading"
                  small
                  class="mr-1"
                />
                Add
              </b-button>
            </div>
          </b-col>
        </b-row>

        <b-table
          :fields="columns"
          responsive="sm"
          :items="websites"
          show-empty
          :empty-text="loading ? 'Loading...' : 'No websites'"
        >
          <!-- Column: Row Number -->
          <template #cell(row_number)="data">
            <div>{{ data.index+1 }}</div>
          </template>

          <!-- Column: Status -->
          <template #cell(is_active)="data">
            <b-badge
              pill
              :variant="`light-${resolveIsActiveVariant(data.item.is_active)}`"
              class="text-capitalize"
            >
              {{ data.item.is_active ? 'Active' : 'Inactive' }}
            </b-badge>
          </template>

          <!-- Column: Actions -->
          <template #cell(actions)="data">
            <div>
              <b-button
                variant="danger"
                size="sm"
                class="btn-icon"
                @click="removeWebsite(data.item, data.index)"
              >
                <feather-icon icon="XIcon" />
              </b-button>
            </div>
          </template>
        </b-table>
        </b-row></template>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BButton, BSpinner, BTable, BBadge,
} from 'bootstrap-vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import vSelect from 'vue-select'

export default {
  components: {
    BRow,
    BCol,
    BButton,
    BTable,
    BSpinner,
    BBadge,
    vSelect,
  },
  directives: {
    Ripple,
  },
  mixins: [
    resourceFormModal,
  ],
  data() {
    return {
      loading: false,
      parentGroup: null,
      columns: [
        { key: 'row_number', label: '#' },
        { key: 'code' },
        { key: 'ip_address' },
        { key: 'domain_name' },
        { key: 'is_active' },
        { key: 'actions', label: '' },
      ],

      selectWebsite: null,
      websites: [],
      websiteOptions: [],
    }
  },
  computed: {
    websiteFinalOptions() {
      const selectedWebsiteIds = this.websites.map(w => w.id)
      return this.websiteOptions.filter(w => !selectedWebsiteIds.includes(w.id))
    },
  },
  methods: {
    setParentGroup(parentGroup) {
      this.parentGroup = parentGroup
      return this
    },
    open() {
      this.$refs.bModal.show()
    },
    close() {
      this.$refs.bModal.hide()
    },
    async getParentGroupWebsites() {
      this.loading = true
      const { data } = await this.$http.get(`/api/admin/parent_groups/${this.parentGroup.id}/websites`)
      this.loading = false
      this.websites = data.data
    },
    async getWebsiteOptions() {
      const { data } = await this.$http.get('/api/admin/websites', { params: { paginate: false } })
      console.log('🚀 ~ file: ViewWebsitesModal.vue ~ line 138 ~ getWebsiteOptions ~ data', data)
      this.websiteOptions = data.data
    },
    async addWebsite() {
      try {
        if (!this.selectWebsite) return

        this.loading = true
        await this.$http.post(`/api/admin/parent_groups/${this.parentGroup.id}/websites`, {
          website_id: this.selectWebsite.id,
        })
        this.$notifySuccess(`Wesbite ${this.selectWebsite.code} has been added.`)
        this.websites.push({ ...this.selectWebsite })
        this.selectWebsite = null
      } catch (error) {
        if (!this.$notifyError422(error)) throw error
      } finally {
        this.loading = false
      }
    },
    async removeWebsite(website, index) {
      await this.$http.delete(`/api/admin/parent_groups/${this.parentGroup.id}/websites/${website.id}`)
      this.$notifySuccess(`Successfully removed website ${website.code}.`)
      this.websites.splice(index, 1)
    },
    resolveIsActiveVariant(isActive) {
      return isActive ? 'success' : 'secondary'
    },
  },
}
</script>

<style>

</style>
