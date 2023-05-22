import Vue from 'vue'

export default () => {
  Vue.filter('currency', function (value: number) {
    if (value === null || value === undefined) return ''
    if (value === 0) return '$0'
    const fixed = value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
    return `$${fixed}`
  })

  Vue.filter('currency_no_decimals', function (value: number) {
    if (value === null || value === undefined) return ''
    if (value === 0) return '$0'
    const fixed = value.toString(10).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    return `$${fixed}`
  })
}
