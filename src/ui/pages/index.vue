<script lang="ts">
import { Component } from 'vue-property-decorator'
import HomePage from './home.vue';

@Component({
  name: 'IndexPage',
  meta: {
    auth: true,
    breadcrumb: ['home'],
  }
})
export default class IndexPage extends HomePage { }
</script>