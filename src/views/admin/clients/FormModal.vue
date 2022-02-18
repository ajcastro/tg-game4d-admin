<template>
  <div>
    <b-modal
      ref="bModal"
      title="Add Client"
      hide-footer
    >
      <b-form @submit.prevent>
        <b-row>

          <!-- code -->
          <b-col cols="12">
            <b-form-group
              label="Code"
              label-for="v-code"
            >
              <b-form-input
                id="v-code"
              />
            </b-form-group>
          </b-col>

          <!-- remarks -->
          <b-col cols="12">
            <b-form-group
              label="Remarks"
              label-for="v-remarks"
            >
              <b-form-input
                id="v-remarks"
              />
            </b-form-group>
          </b-col>

          <!-- percentage_share -->
          <b-col cols="12">
            <b-form-group
              label="Percentage Share"
              label-for="v-percentage_share"
            >
              <b-form-input
                id="v-percentage_share"
                type="number"
              />
            </b-form-group>
          </b-col>

          <!-- submit and reset -->
          <b-col
            cols="12"
            class="text-right"
          >
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class=""
            >
              Save
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
  },
  directives: {
    Ripple,
  },
}
</script>

<style>

</style>
