<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">

      <!-- Brand logo-->
      <b-link class="brand-logo">
        <!-- <vuexy-logo />
        <h2 class="brand-text text-primary ml-1">
          Vuexy
        </h2> -->
        <app-name />
      </b-link>
      <!-- /Brand logo-->

      <!-- Left Text-->
      <b-col
        lg="8"
        class="d-none d-lg-flex align-items-center p-5"
        style="background-color: rgb(63 53 64);"
      >
        <!--  -->
        <div class="w-100 d-lg-flex align-items-center justify-content-center px-5">
          <b-img
            fluid
            :src="imgUrl"
            alt="Login V2"
          />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col
        lg="4"
        class="d-flex align-items-center auth-bg px-2 p-lg-5"
      >
        <b-col
          sm="8"
          md="6"
          lg="12"
          class="px-xl-2 mx-auto"
        >
          <b-card-title
            class="mb-1 font-weight-bold"
            title-tag="h2"
          >
            Welcome to TeleGaming! 👋
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your account.
          </b-card-text>

          <!-- <b-alert
            variant="primary"
            show
          >
            <div class="alert-body font-small-2">
              <p>
                <small class="mr-50"><span class="font-weight-bold">Admin:</span> admin@demo.com | admin</small>
              </p>
              <p>
                <small class="mr-50"><span class="font-weight-bold">Client:</span> client@demo.com | client</small>
              </p>
            </div>
            <feather-icon
              v-b-tooltip.hover.left="'This is just for ACL demo purpose'"
              icon="HelpCircleIcon"
              size="18"
              class="position-absolute"
              style="top: 10; right: 10;"
            />
          </b-alert> -->

          <!-- form -->
          <validation-observer
            ref="loginForm"
            #default="{invalid}"
          >
            <b-form
              class="auth-login-form mt-2"
              @submit.prevent="login"
            >
              <!-- access group -->
              <b-form-group
                label="Access Group"
                label-for="parent-group"
              >
                <validation-provider
                  #default="{ errors }"
                  name="access group"
                  vid="parent-group"
                  rules="required"
                >
                  <b-form-input
                    id="parent-group"
                    v-model.trim="parentGroupCode"
                    :state="errors.length > 0 ? false:null"
                    name="parent-group"
                    placeholder="Access Group"
                    @input="invalidCredentials=false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- username -->
              <b-form-group
                label="Username"
                label-for="login-username"
              >
                <validation-provider
                  #default="{ errors }"
                  name="username"
                  vid="username"
                  rules="required"
                >
                  <b-form-input
                    id="login-username"
                    v-model.trim="username"
                    :state="errors.length > 0 ? false:null"
                    name="login-username"
                    placeholder="Username"
                    @input="invalidCredentials=false"
                  />
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- forgot password -->
              <b-form-group>
                <div class="d-flex justify-content-between">
                  <label for="login-password">Password</label>
                  <b-link :to="{name:'auth-forgot-password'}">
                    <small>Forgot Password?</small>
                  </b-link>
                </div>
                <validation-provider
                  #default="{ errors }"
                  name="Password"
                  vid="password"
                  rules="required"
                >
                  <b-input-group
                    class="input-group-merge"
                    :class="errors.length > 0 ? 'is-invalid':null"
                  >
                    <b-form-input
                      id="login-password"
                      v-model="password"
                      :state="errors.length > 0 ? false:null"
                      class="form-control-merge"
                      :type="passwordFieldType"
                      name="login-password"
                      placeholder="Password"
                      @input="invalidCredentials=false"
                    />
                    <b-input-group-append is-text>
                      <feather-icon
                        class="cursor-pointer"
                        :icon="passwordToggleIcon"
                        @click="togglePasswordVisibility"
                      />
                    </b-input-group-append>
                  </b-input-group>
                  <small class="text-danger">{{ errors[0] }}</small>
                </validation-provider>
              </b-form-group>

              <!-- checkbox -->
              <!-- <b-form-group>
                <b-form-checkbox
                  id="remember-me"
                  v-model="status"
                  name="checkbox-1"
                >
                  Remember Me
                </b-form-checkbox>
              </b-form-group> -->

              <!-- submit buttons -->
              <b-button
                type="submit"
                variant="primary"
                block
                :disabled="invalid || loggingIn"
              >
                <b-spinner
                  v-if="loggingIn"
                  small
                  class="mr-1"
                />
                Sign in
              </b-button>
              <small
                v-if="invalidCredentials"
                class="text-danger"
              >
                Invalid Credentials
              </small>

            </b-form>
          </validation-observer>

          <!-- <b-card-text class="text-center mt-2">
            <span>New on our platform? </span>
            <b-link :to="{name:'auth-register'}">
              <span>&nbsp;Create an account</span>
            </b-link>
          </b-card-text> -->

          <!-- divider -->
          <!-- <div class="divider my-2">
            <div class="divider-text">
              or
            </div>
          </div> -->

          <!-- social buttons -->
          <!-- <div class="auth-footer-btn d-flex justify-content-center">
            <b-button
              variant="facebook"
              href="javascript:void(0)"
            >
              <feather-icon icon="FacebookIcon" />
            </b-button>
            <b-button
              variant="twitter"
              href="javascript:void(0)"
            >
              <feather-icon icon="TwitterIcon" />
            </b-button>
            <b-button
              variant="google"
              href="javascript:void(0)"
            >
              <feather-icon icon="MailIcon" />
            </b-button>
            <b-button
              variant="github"
              href="javascript:void(0)"
            >
              <feather-icon icon="GithubIcon" />
            </b-button>
          </div> -->
        </b-col>
      </b-col>
    <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { ValidationProvider, ValidationObserver } from 'vee-validate'
// import VuexyLogo from '@core/layouts/components/Logo.vue'
import {
  BRow, BCol, BLink, BFormGroup, BFormInput, BInputGroupAppend, BInputGroup, BCardText, BCardTitle, BImg, BForm, BButton, VBTooltip, BSpinner,
  // BAlert, BFormCheckbox,
} from 'bootstrap-vue'
import useJwt from '@/auth/jwt/useJwt'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import AppName from '@/components/AppName.vue'

export default {
  directives: {
    'b-tooltip': VBTooltip,
  },
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    // BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    BSpinner,
    // BAlert,
    AppName,
    // VuexyLogo,
    ValidationProvider,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      parentGroupCode: 'spvadmin',
      username: 'adm_master',
      password: 'password',
      sideImg: require('@/assets/images/pages/login-tg.jpg'),
      invalidCredentials: false,
      loggingIn: false,

      // validation rules
      required,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-tg.jpg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    login() {
      this.$refs.loginForm.validate().then(success => {
        if (success) {
          this.loggingIn = true
          useJwt.login({
            parent_group_code: this.parentGroupCode,
            username: this.username,
            password: this.password,
          })
            .then(response => {
              const userData = response.data.data.user
              useJwt.setToken(response.data.data.access_token)
              // useJwt.setRefreshToken(response.data.data.refreshToken)
              localStorage.setItem('userData', JSON.stringify(userData))
              this.$ability.update(userData.ability)

              // ? This is just for demo purpose as well.
              // ? Because we are showing eCommerce app's cart items count in navbar
              // this.$store.commit('app-ecommerce/UPDATE_CART_ITEMS_COUNT', userData.extras.eCommerceCartItemsCount)

              // ? This is just for demo purpose. Don't think CASL is role based in this case, we used role in if condition just for ease
              this.$router.replace(userData.admin_redirect || '/')
                .then(() => {
                  this.$toast({
                    component: ToastificationContent,
                    position: 'top-right',
                    props: {
                      title: `Welcome ${userData.name || userData.username}`,
                      icon: 'CoffeeIcon',
                      variant: 'success',
                      text: `You have successfully logged in as ${userData.role}. Now you can start to explore!`,
                    },
                  })
                })
            })
            .catch(error => {
              if (error.response && error.response.status === 401) {
                this.invalidCredentials = true
                this.$notifyError('Invalid credentials')
              } else {
                throw error
              }
            }).finally(() => {
              this.loggingIn = false
            })
        }
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
