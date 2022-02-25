import Vue from 'vue'
import Vue2Filters from 'vue2-filters'

Vue.use(Vue2Filters, {
  currency: {
    symbol: '',
    decimalDigits: 2,
    thousandsSeparator: ',',
    decimalSeparator: '.',
    symbolOnLeft: true,
    spaceBetweenAmountAndSymbol: false,
    showPlusSign: false,
  },
})
