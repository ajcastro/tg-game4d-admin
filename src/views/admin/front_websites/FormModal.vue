<template>
  <div>
    <b-modal
      ref="bModal"
      title="Add Front Website"
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

          <!-- ip_address -->
          <b-col cols="12">
            <b-form-group
              label="IP Address"
              label-for="v-ip_address"
            >
              <b-form-input
                id="v-ip_address"
              />
            </b-form-group>
          </b-col>

          <!-- domain_name -->
          <b-col cols="12">
            <b-form-group
              label="Domain Name"
              label-for="v-domain_name"
            >
              <b-form-input
                id="v-domain_name"
              />
            </b-form-group>
          </b-col>

          <!-- checkbox -->
          <b-col cols="12">
            <b-form-group>
              <b-form-checkbox
                id="is_active"
                name="is_active"
                value="is_active"
              >
                Is Active
              </b-form-checkbox>
            </b-form-group>
          </b-col>

          <!-- checkbox -->
          <b-col cols="12">
            <b-form-group
              label="Assigned Client"
              label-for="v-assigned_client"
            >
              <b-form-select
                v-model="selected"
                :options="clientOptions"
              />
            </b-form-group>
          </b-col>

          <!-- remarks -->
          <b-col cols="12">
            <b-form-group
              label="Remarks"
              label-for="v-remarks"
            >
              <b-form-textarea
                id="v-remarks"
                placeholder=""
                rows="2"
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
  BRow, BCol, BFormGroup, BFormInput, BFormCheckbox, BForm, BButton, BFormSelect, BFormTextarea,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    BFormCheckbox,
    BFormSelect,
    BFormTextarea,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      clientOptions: [
        'ABC123',
        'XYZ456',
      ],
    }
  },
}
</script>

<style>

</style>
