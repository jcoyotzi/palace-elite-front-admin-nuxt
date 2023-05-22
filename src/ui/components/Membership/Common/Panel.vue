<template>
  <div
    class="pe-relative pe-text-white"
    :class="wrapperClasses"
  >
    <div
      class="pe-flex pe-items-center"
      :class="classes"
    >
      <slot name="headerText"> {{ headerText }} </slot>
      <div
        class="pe-contents pe-cursor-pointer"
        @click="toggleContent"
      >
        <PE-icon
          :class="internalIconClasses"
          class="pe-mx-1"
          >{{ icon }}</PE-icon
        >
      </div>
    </div>
    <slot
      class="pe-w-full pe-basis-full"
      name="unfoldableContent"
    >
    </slot>
    <div v-show="open">
      <slot name="content"> </slot>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator'

interface IExpansionPanel {
  headerText: string
  subHeaderText?: string
  justifyHeaderClass: string
  icon: string
  iconClasses: string
  reverse: boolean
}

@Component
class Panel extends Vue implements IExpansionPanel {
  // #region Props
  @Prop({
    type: String,
    default: ''
  })
  headerText!: string

  @Prop({
    type: String,
    default: 'pe-justify-between'
  })
  justifyHeaderClass!: string

  @Prop({
    type: String,
    default: 'chevron-down'
  })
  icon!: string

  @Prop({
    type: String,
    default: 'pe-text-white'
  })
  iconClasses!: string

  @Prop({type: Boolean, default: false})
  reverse!: boolean

  @Prop({type: Boolean, default: false})
  rounded!: boolean
  // #endregion Props

  // #region Data
  public open: boolean = false
  // #endregion Data

  // #region Computed

  public get classes() {
    return {
      [this.justifyHeaderClass]: true,
      'pe-justify-end pe-flex-row-reverse': this.reverse
    }
  }

  public get wrapperClasses() {
    return {
      'pe-rounded-[10px]': this.rounded
    }
  }

  public get internalIconClasses() {
    return {
      [this.iconClasses]: true,
      'pe-ease-in-out pe-duration-300': true,
      '-pe-rotate-180 pe-ease-in-out pe-duration-300': this.open
    }
  }

  // #region Methods
  public toggleContent() {
    this.open = !this.open
  }
  // #endregion Methods
}

export default Panel
</script>
