<template>
  <div
    class="align-center pe-mb-10 flex min-h-[70px] cursor-pointer items-center justify-center rounded-[5px] pe-bg-black xl:pe-mb-0 xl:min-h-fit xl:w-fit xl:pe-bg-transparent"
    @click="click"
  >
    <PE-icon class="mx-3 h-[39px] w-[31px] text-white">{{ firstIcon }}</PE-icon>

    <div class="flex w-full grow items-center justify-center rounded-[5px] text-sm">
      <div :class="firstDisplayClasses">
        <span
          class="mb-0 w-full text-ellipsis font-sans text-sm text-white xl:text-base xl:leading-[1.375rem] inline-grid overflow-hidden overflow-hidden"
        >
          {{ firstDisplayTitle }}
        </span>

        <span class="w-full font-sans text-white">
          <span class="font-sans xl:text-base xl:leading-[1.375rem]">
            {{ firstDisplayText }}
          </span>
        </span>
      </div>

      <div
        v-if="secondDisplayTitle"
        :class="dividerClasses"
      >
        &nbsp;
      </div>

      <div
        v-if="secondDisplayTitle"
        class="mx-1 flex w-full max-w-[55%] items-center justify-start"
      >
        <div>
          <PE-icon class="mr-3 h-[39px] w-[31px] text-white">{{ secondIcon }}</PE-icon>
        </div>

        <div class="flex flex-col items-center justify-start w-[100px]">
          <span class="mb-0 font-sans text-sm text-white xl:text-base xl:leading-[1.375rem]">
            {{ secondDisplayTitle }}
          </span>

          <span class="w-full font-sans text-white xl:text-base xl:leading-[1.375rem]">
            {{ secondDisplayText }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Emit, Prop} from 'vue-property-decorator'

@Component({
  name: 'RoomInfo'
})
export default class RoomInfo extends Vue {
  @Prop({type: [String, Number], default: ''})
  readonly roomsLabel!: string | number

  @Prop({type: [String, Number], default: ''})
  readonly guestsLabel!: string | number

  @Prop({type: [String, Number], default: undefined})
  readonly roomsValue!: string | number

  @Prop({type: [String, Number], default: undefined})
  readonly guestsValue!: string | number

  @Prop({type: String, default: ''})
  readonly firstIcon!: string

  @Prop({type: String, default: ''})
  readonly secondIcon!: string

  @Prop({type: String, default: 'bg-[#DBDADA7F]'})
  readonly dividerBackground!: string

  @Emit('click')
  click() {}

  get firstDisplayTitle() {
    return this.roomsLabel
  }

  get firstDisplayText() {
    return this.roomsValue
  }

  get secondDisplayTitle() {
    return this.guestsLabel
  }

  get secondDisplayText() {
    return this.guestsValue
  }

  get dividerClasses() {
    return {
      'divider  my-auto mr-2 ml-auto xl:m-1 xl:m-5    inline-block h-[80%] w-[1px] max-w-[1%] ':
        true,

      [this.dividerBackground]: true
    }
  }

  get firstDisplayClasses() {
    return {
      'ml-1 w-full': true,

      'max-w-[40%] xl:max-w-[44%] xl:max-w-[50%]  flex  flex-col items-center justify-start':
        !this.onlyOneDisplay
    }
  }

  get onlyOneDisplay() {
    if (!this.secondDisplayTitle) {
      return true
    }
  }
}
</script>

<style>
.text-ellipsis {
  text-overflow: ellipsis;
}
</style>
