import {Component, Vue} from 'vue-property-decorator'

@Component
export default class GenerateIdMixin extends Vue {
  generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }
}
