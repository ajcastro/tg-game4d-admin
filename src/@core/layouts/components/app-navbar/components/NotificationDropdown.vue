<template>
  <b-nav-item-dropdown
    class="dropdown-notification mr-25"
    menu-class="dropdown-menu-media"
    right
  >
    <template #button-content>
      <feather-icon
        badge="0"
        badge-classes="bg-danger"
        class="text-body"
        icon="BellIcon"
        size="21"
      />
    </template>

    <!-- Header -->
    <li class="dropdown-menu-header">
      <div class="dropdown-header d-flex">
        <h4 class="notification-title mb-0 mr-auto">
          Notifications
        </h4>
        <!-- <b-badge
          pill
          variant="light-primary"
        >
          6 New
        </b-badge> -->
      </div>
    </li>

    <!-- Notifications -->
    <!-- v-once -->
    <vue-perfect-scrollbar
      :settings="perfectScrollbarSettings"
      class="scrollable-container media-list scroll-area"
      tagname="li"
    >
      <!-- Account Notification -->
      <!-- <b-link
        v-for="notification in notifications"
        :key="notification.subtitle"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :src="notification.avatar"
              :text="notification.avatar"
              :variant="notification.type"
            />
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link> -->

      <!-- System Notification Toggler -->
      <!-- <div class="media d-flex align-items-center">
        <h6 class="font-weight-bolder mr-auto mb-0">
          System Notifications
        </h6>
        <b-form-checkbox
          :checked="true"
          switch
        />
      </div> -->

      <!-- System Notifications -->
      <b-link
        v-for="notification in systemNotifications"
        :key="notification.id"
      >
        <b-media>
          <template #aside>
            <b-avatar
              size="32"
              :variant="notification.type"
            >
              <feather-icon :icon="notification.icon" />
            </b-avatar>
          </template>
          <p class="media-heading">
            <span class="font-weight-bolder">
              {{ notification.title }}
            </span>
          </p>
          <small class="notification-text">{{ notification.subtitle }}</small>
        </b-media>
      </b-link>
    </vue-perfect-scrollbar>

    <!-- Cart Footer -->
    <li class="dropdown-menu-footer"><b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="primary"
      block
      @click="$refs.broadcastMessage.open()"
    >Broadcast message</b-button>
    </li>

    <broadcast-message ref="broadcastMessage" />
  </b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BMedia, BLink, BAvatar, BButton, /* BFormCheckbox, BBadge, */
} from 'bootstrap-vue'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import Ripple from 'vue-ripple-directive'
import BroadcastMessage from '@/components/BroadcastMessage.vue'

export default {
  components: {
    BNavItemDropdown,
    BMedia,
    BLink,
    BAvatar,
    VuePerfectScrollbar,
    BButton,
    // BBadge,
    // BFormCheckbox,
    BroadcastMessage,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      perfectScrollbarSettings: {
        maxScrollbarLength: 60,
        wheelPropagation: false,
      },
      notifications: [],
      systemNotifications: [
        // {
        //   title: 'Server down',
        //   subtitle: 'USA Server is down due to hight CPU usage',
        //   type: 'light-danger',
        //   icon: 'XIcon',
        // },
        // {
        //   title: 'Sales report generated',
        //   subtitle: 'Last month sales report generated',
        //   type: 'light-success',
        //   icon: 'CheckIcon',
        // },
        // {
        //   title: 'High memory usage',
        //   subtitle: 'BLR Server using high memory',
        //   type: 'light-warning',
        //   icon: 'AlertTriangleIcon',
        // },
      ],
    }
  },
  mounted() {
    this.getNotifications()
    this.pollNotificationsData()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    async getNotifications() {
      const { data } = await this.$http.get('api/admin/broadcast_messages')
      this.systemNotifications = data.data.map(i => this.makeNotifItem(i))
    },
    makeNotifItem(responseItem) {
      return {
        id: responseItem.id,
        title: responseItem.data.from_user.username,
        subtitle: responseItem.data.message,
        type: 'light-success',
        icon: 'InfoIcon',
      }
    },
    pollNotificationsData() {
      this.polling = setInterval(() => {
        this.getNotifications()
      }, 5000)
    },
  },
}
</script>

<style>

</style>
