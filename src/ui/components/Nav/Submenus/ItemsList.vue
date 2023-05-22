<template>
  <div class="min-w-[300px]">
    <ul>
      <li
        v-for="(item, index) in items"
        :key="index"
      >
        <PEButton
          without-border
          tag="NuxtLink"
          :to="item.url"
          class="cursor-pointer"
          type=""
        >
          {{ item.label }}
        </PEButton>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Emit, Prop, Watch} from 'vue-property-decorator'
import {LinkEntity} from '~/src/app/layout/domain/entities/linkEntity'

@Component({
  name: 'ItemsList'
})
export default class List extends Vue {
  @Prop() items!: LinkEntity[]

  @Emit('closeMenu')
  close() {}
}
</script>
