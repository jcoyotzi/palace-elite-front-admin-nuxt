// @ts-nocheck
import {Plugin} from '@nuxt/types'
import {plugin as PRPlugin} from '@pr-elite-components-library/lib'
import Vue from 'vue'

const plugin: Plugin = function plugin() {
  Vue.use(PRPlugin)

  const INSPECTLET_ID = process.env.INSPECTLET_ID

  if (INSPECTLET_ID) {
    window.__insp = window.__insp || []
    __insp.push(['wid', INSPECTLET_ID])
    var ldinsp = function () {
      if (typeof window.__inspld != 'undefined') return
      window.__inspld = 1
      var insp = document.createElement('script')
      insp.type = 'text/javascript'
      insp.async = true
      insp.id = 'inspsync'
      insp.src =
        ('https:' == document.location.protocol ? 'https' : 'http') +
        `://cdn.inspectlet.com/inspectlet.js?wid=${INSPECTLET_ID}&r=` +
        Math.floor(new Date().getTime() / 3600000)
      var x = document.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(insp, x)
    }
    setTimeout(ldinsp, 0)
  }
}
export default plugin
