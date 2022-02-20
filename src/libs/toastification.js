import Vue from 'vue'
import Toast from 'vue-toastification'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

// Toast Notification Component Styles
import '@core/scss/vue/libs/toastification.scss'

/**
 * NOTE: If you are using other transition them make sure to import it in `src/@core/scss/vue/libs/notification.scss` from it's source
 */
Vue.use(Toast, {
  hideProgressBar: true,
  closeOnClick: false,
  closeButton: false,
  icon: false,
  timeout: 3000,
  transition: 'Vue-Toastification__fade',
})

function $notify(message, props) {
  Vue.$toast({
    component: ToastificationContent,
    props: {
      title: message,
      icon: 'CircleIcon',
      variant: 'info',
      ...props,
    },
  })
}

Vue.prototype.$notify = $notify

Vue.prototype.$notifySuccess = (message, props) => {
  $notify(message, { ...props, variant: 'success', icon: 'CheckIcon' })
}

Vue.prototype.$notifyError = (message, props) => {
  $notify(message, { ...props, variant: 'danger' })
}

Vue.prototype.$notifyInfo = (message, props) => {
  $notify(message, { ...props, variant: 'info' })
}
