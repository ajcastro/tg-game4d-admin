<template>
  <div>
    <b-modal
      ref="bModal"
      :title="(form.member||{}).username"
      hide-footer
      no-close-on-backdrop
      size="lg"
      @hidden="resetForm()"
      @show="(getResource())"
    >
      <b-table-simple
        hover
        small
        caption-top
        responsive
        bordered
      >
        <b-thead>
          <b-tr>
            <b-th>Username</b-th>
            <b-th>Game Category</b-th>
            <b-th>Turn Over Amount</b-th>
            <b-th>Referral Percentage</b-th>
            <b-th>Referral Amount</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-if="loading"
          >
            <b-td
              class="text-center"
              colspan="100"
            >
              Loading...
            </b-td>
          </b-tr>
          <b-tr
            v-for="detail in form.details"
            :key="detail.id"
          >
            <b-td> {{ detail.downlink_member.username }}</b-td>
            <b-td> {{ detail.game_category.title }}</b-td>
            <b-td> {{ detail.turn_over_amount | currency }}</b-td>
            <b-td> {{ detail.referral_percentage }}</b-td>
            <b-td> {{ detail.referral_amount | currency }}</b-td>
          </b-tr>
          <b-tr v-if="!loading">
            <b-td colspan="4" />
            <b-td class="font-weight-bold">
              {{ form.referral_amount | currency }}
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </b-modal>
  </div>
</template>

<script>
/* eslint-disable new-cap */
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormInput,
  BTableSimple, BThead, BTr, BTbody, BTd, BTh,
} from 'bootstrap-vue'
import resourceFormModal from '@/mixins/resource/resource-form-modal'
import ReferralLog from '@/models/ReferralLog'

export default {
  components: {
    BRow,
    BCol,
    BTableSimple,
    BThead,
    BTr,
    BTbody,
    BTd,
    BTh,
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
      form: {
        details: [],
      },
      model: ReferralLog,
    }
  },
  computed: {
  },
  methods: {
  },
}
</script>

<style>

</style>
