import Component from 'vue-class-component'
import {Vue} from 'vue-property-decorator'

@Component
export class DividerLine extends Vue {
  get dividerStyle() {
    return {
      backgroundColor: 'rgba(219, 218, 218, 0.5)'
    }
  }
}
