<template>
  <section>
    <div class="pe-w-full">
      <div
        class="pe-flex pe-flex-col pe-rounded-md pe-bg-black-light pe-p-8 pe-md:p-12"
        :class="isOutlined"
      >
        <h3
          class="pe-mb-6 pe-flex pe-flex-col pe-font-sans pe-text-2xl pe-font-medium pe-uppercase pe-md:flex-row"
        >
          <span class="pe-font-sans pe-text-[24px] pe-font-semibold pe-text-blue-light">{{
            title
          }}</span>

          <span class="pe-ml-0 pe-text-white pe-md:ml-2">{{ uncheckedTitle }}</span>
        </h3>

        <p class="pe-text-base pe-font-normal pe-text-white">
          {{ subtitle }}
        </p>

        <slot name="body" />

        <slot name="footer" />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

import {Component, Prop} from 'vue-property-decorator'

@Component({
  name: 'PECard'
})
export default class PECard extends Vue {
  @Prop({type: String, default: ''})
  title!: string

  @Prop({type: String, default: ''})
  uncheckedTitle!: string

  @Prop({type: String, default: ''})
  subtitle!: string

  @Prop({type: Boolean, default: false})
  outlined!: boolean

  get isOutlined() {
    return {
      'pe-border-[1px] pe-border-blue-light': this.outlined
    }
  }
}
</script>
