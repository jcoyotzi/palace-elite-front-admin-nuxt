<template>
  <div>
    <div
      class="w-full rounded-[8px] px-[24px] py-[26px]"
      :class="backgroundClasses"
    >
      <div
        class="flex cursor-pointer justify-between"
        @click.prevent="showContent"
      >
        <span
          class="font-sans text-[16px] font-normal"
          :class="titleClasses"
        >
          {{ title }}
        </span>
        <PEIcon
          v-show="!bindValue"
          class="text-white"
          >chevron-down</PEIcon
        >
        <PEIcon
          v-show="bindValue"
          class="text-white"
          >chevron-up</PEIcon
        >
      </div>
      <div class="scroll">
        <component
          v-if="bindValue && component"
          :is="component.component"
          v-bind="component"
        />
      </div>
      <div
        v-if="bindValue"
        class="wrapper-tabs mt-6 font-sans text-[16px] font-normal"
        :class="titleClasses"
        v-html="description"
      />
    </div>
    <div
      v-if="!showConsiderationsList"
      class="mx-auto mb-6 w-full rounded-md border border-black-light p-4 shadow"
    >
      <div class="animation-pulse flex space-x-4">
        <div class="flex-1 space-y-6 py-1">
          <div class="mb-2 h-4 rounded bg-black-light"></div>
          <div class="space-y-12">
            <div class="grid grid-cols-3 gap-4">
              <div class="col-span-2 h-4 rounded bg-black-light"></div>
              <div class="col-span-1 h-4 rounded bg-black-light"></div>
            </div>
            <div class="mt-2 h-4 rounded bg-black-light"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
//   import PEIcon from '../PEIcon/PEIcon.vue';

interface IHeader {
  title: string
  name: string
  width: string
  align: string
}

interface TableAccess {
  component: any
  headers: IHeader[]
  items: any[]
}

@Component({
  name: 'PEExpansionPanelMicroSite'
  // components: {
  //   PEIcon,
  // },
})
export default class PEExpansionPanelMicroSite extends Vue {
  @Prop({default: '', type: String}) title!: string

  @Prop({default: '', type: String}) description!: string

  @Prop({}) component!: TableAccess

  @Prop({default: false, type: Boolean}) value!: boolean

  @Prop({default: false, type: Boolean}) showConsiderationsList!: boolean

  @Prop({default: true, type: Boolean}) dark!: boolean

  public show = false;

  beforeMount() {
    this.bindValue = this.value;
  }

  public get bindValue(): boolean {
    return this.show
  }

  public set bindValue(value: boolean) {
    this.show = value
    this.$emit('input', value)
  }

  public showContent() {
    this.bindValue = !this.value
  }

  get backgroundClasses() {
    return {
      'bg-black-light': this.dark,
      'bg-white border border-gray-300': !this.dark
    }
  }

  get titleClasses() {
    return {
      'text-[#E6E1E5]': this.dark,
      'text-gray-600': !this.dark
    }
  }
}
</script>
<style scoped>
::v-deep .wrapper-tabs ul {
  margin-left: 10px !important;
  list-style-type: disc !important;
  list-style-position: inside;
}
::v-deep .wrapper-tabs ul li {
  margin-left: 15px !important;
}

::v-deep .wrapper-tabs a {
  color: #90afc5;
}
div.scroll {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}

.animation-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>