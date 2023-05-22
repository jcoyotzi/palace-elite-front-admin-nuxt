<template>
  <div
    class="pe-bg-black-light pe-px-[30px] pe-rounded-[10px] pe-py-[20px] pe-text-white pe-w-full pe-text-justify pe-text-[12px]"
  >
    {{ content }}
    <ul class="pe-mt-[15px] list-disc">
      <li
        class="pe-ml-10"
        v-for="(amenities, index) in items"
        :key="index"
      >
        {{ amenities }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'

@Component
export default class ContentInfo extends Vue {
  @Prop() content!: string
  @Prop({default: () => [], type: Array}) items!: string[]
}
</script>
