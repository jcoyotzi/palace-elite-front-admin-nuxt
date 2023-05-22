import {Plugin} from '@nuxt/types'
import {Amplify} from 'aws-amplify'

const plugin: Plugin = function plugin({$config}) {
  Amplify.configure($config.awsAmplifyConfig)
}

export default plugin
