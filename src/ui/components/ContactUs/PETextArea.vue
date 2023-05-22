<template>
  <div class="flex items-center">
    <slot name="prepend" />
    <div :class="containerClasses">
      <slot name="prepend-inner" />
      <div class="relative flex-grow pe-h-full">
        <textarea
          :id="computedId"
          :ref="inputRef"
          v-model="inputValue"
          v-mask="mask"
          :class="inputClasses"
          :type="type"
          :readonly="readonly"
          :disabled="disabled"
          :maxlength="inputMaxLenght"
          @focus="onFocus"
          @blur="onBlur"
          @keyup.enter="onEnter"
          @change="onChange"
        />
        <label
          :for="computedId"
          :class="labelClasses"
          >{{ label }}
          <span
            v-if="errorToShow"
            class="text-sm italic text-red-600"
            >{{ errorToShow }}</span
          ></label
        >
      </div>
      <slot name="append-inner" />
    </div>
    <slot name="append" />
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import VueMask from 'v-mask';

// Vue.use(VueMask());

enum Colors {
  DARK = 'dark',
  MEDIUM = 'medium',
  LIGHT = 'light'
}

const COLORSLIST: string[] = Object.values(Colors)

@Component({
  name: 'PETextArea'
})
export default class PETextArea extends Vue {
  @Prop({
    type: String,
    default: 'dark',
    validator: value => COLORSLIST.includes(value as string)
  })
  color!: string

  @Prop({
    type: String,
    default: 'text'
  })
  type!: string

  @Prop({
    type: String
  })
  label!: string

  @Prop({type: String})
  id!: string

  @Prop({type: Boolean, default: false})
  readonly!: boolean

  @Prop({type: Boolean, default: false})
  disabled!: boolean

  @Prop({
    type: String
  })
  mask!: string

  @Prop({type: String})
  readonly value!: string

  @Prop({
    type: Array
  })
  errors!: string[]

  @Prop({type: String, default: 'peinput'}) inputRef!: string

  @Prop({type: String, default: ''}) inputMaxLenght!: string

  hasContent = false

  inputValue = ''

  @Watch('value', {immediate: true})
  onChangeValue(value: string) {
    this.inputValue = value
    this.inputHasContent(value)
  }

  @Watch('inputValue')
  onChangeCheckedValue(value: string) {
    this.$emit('input', value)
    this.inputHasContent(value)
  }

  inputHasContent(value: string) {
    this.hasContent = !!value
  }

  onFocus(val: any) {
    this.$emit('focus', val)
  }

  onBlur(val: any) {
    this.$emit('blur', val)
  }

  onChange(val: any) {
    this.$emit('change', val)
  }

  onEnter(val: any) {
    this.$emit('onEnter', val)
  }

  public generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }

  get errorToShow() {
    return this.errors ? this.errors[0] : ''
  }

  get computedId() {
    return this.id || this.generateId('pe-input')
  }

  // Computated classes
  get containerClasses(): string[] {
    const initialClasses = 'relative flex w-full items-center rounded border-none pe-h-full'

    const arrayInitialClasses = initialClasses.trim().split(/\s+/)
    const array: string[] = [...arrayInitialClasses]
    if (this.color) {
      const availableColors = new Map()
        .set(Colors.MEDIUM, 'bg-black-light')
        .set(Colors.LIGHT, 'bg-white')
        .set(Colors.DARK, 'bg-black')

      array.push(availableColors.get(this.color))
    }
    if (this.hasContent) {
      array.push('top-1 text-sm')
    }
    if (this.disabled) {
      array.push('opacity-60')
    }
    return array
  }

  get inputClasses(): string[] {
    const initialClasses =
      'peer flex w-full appearance-none !bg-transparent px-5 pt-6 pb-1 outline-none pe-h-full'

    const arrayInitialClasses = initialClasses.trim().split(/\s+/)
    const array: string[] = [...arrayInitialClasses]
    if (this.disabled || this.readonly) {
      array.push('cursor-not-allowed opacity-60')
    }
    if (this.color === 'light') {
      array.push('text-black')
    } else {
      array.push('text-white')
    }
    return array
  }

  get labelClasses() {
    const initialClasses =
      'top-1 text-sm autofill:off pointer-events-none absolute left-5 top-3.5 z-10 transform leading-6 duration-300 peer-focus:top-1 peer-focus:text-sm'

    const arrayInitialClasses = initialClasses.trim().split(/\s+/)
    const array: string[] = [...arrayInitialClasses]

    if (this.disabled) {
      array.push('opacity-60')
    }
    if (this.color === 'light') {
      array.push('text-black')
    } else {
      array.push('text-white')
    }
    return array
  }
}
</script>

<style lang="scss" scoped>
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
  border: 2px solid rgb(255, 255, 255);
  -webkit-text-fill-color: #fff;
  box-shadow: 0 0 0px 1000px rgba(0, 0, 0, 0) inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
