import {Plugin} from '@nuxt/types'
import {Component} from 'vue-property-decorator'

const plugin: Plugin = function plugin() {
  Component.registerHooks(['asyncData', 'fetch'])
}

export default plugin
