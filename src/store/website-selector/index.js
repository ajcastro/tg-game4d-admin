import axios from '@axios'

export default {
  namespaced: true,
  state: {
    websites: [],
    selectedWebsiteId: null,
  },
  getters: {},
  mutations: {
    setWebsites(state, websites) {
      state.websites = [
        ...websites,
      ]
    },
    selectWebsiteId(state, websiteId) {
      state.selectedWebsiteId = websiteId
      axios.defaults.params = {
        ...axios.defaults.params,
        website_selector_website_id: websiteId,
      }
    },
  },
  actions: {
    async getWebsites({ commit }) {
      const { data } = await axios.get('api/admin/websites', {
        params: {
          filter: {},
          paginate: false,
        },
      })

      commit('setWebsites', data.data)

      return Promise.resolve(data.data)
    },
  },
}
