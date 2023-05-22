<template>
  <section>
    <div class="w-full">
      <div
        class="flex flex-col rounded-md bg-black-light p-8 md:p-12"
        :class="isOutlined"
      >
        <h3 class="mb-6 flex flex-col font-serif text-2xl uppercase md:flex-row">
          <span class="font-serif text-2xl text-blue-light">{{ title }}</span>

          <span class="ml-0 text-white md:ml-2">{{ uncheckedTitle }}</span>
        </h3>

        <p class="text-base font-normal text-white">
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

@Component
export default class WeeksCard extends Vue {
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
      'border-[1px] border-blue-light': this.outlined
    }
  }
}
</script>
