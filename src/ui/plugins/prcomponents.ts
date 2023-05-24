import { Plugin } from '@nuxt/types'
import { plugin as PRPlugin } from '@pr-elite-components-library/lib'
import Vue from 'vue'

const plugin: Plugin = function plugin() {
  Vue.use(PRPlugin)
}

export default plugin