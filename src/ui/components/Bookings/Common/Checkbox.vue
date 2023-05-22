<template>
  <div class="flex">
    <input
      :id="computedId"
      v-model="bindingValue"
      :aria-checked="bindingValue"
      :disabled="disabled"
      :class="classes"
      class="pe-checkbox--box peer relative mr-5 h-[1.875rem] w-[1.875rem] shrink-0 cursor-pointer appearance-none rounded after:absolute after:top-[40%] after:left-1/2 after:h-[1rem] after:w-[0.5rem] after:-translate-x-2/4 after:-translate-y-2/4 after:border-b-2 after:border-r-2 after:border-solid after:transition-all after:ease-in-out disabled:pointer-events-none disabled:opacity-50"
      role="checkbox"
      type="checkbox"
      @click="onClick"
    />

    <label
      :for="computedId"
      class="cursor-pointer text-white peer-disabled:opacity-50"
    >
      <slot> </slot>
    </label>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Prop, Watch, Emit} from 'vue-property-decorator'

enum Colors {
  DARK = 'dark',
  MEDIUM = 'medium',
  LIGHT = 'light',
  BLUE = 'blue'
}

const COLORSLIST: string[] = Object.values(Colors)

@Component({
  name: 'PECheckbox',
  inheritAttrs: false
})
export default class PECheckbox extends Vue {
  @Prop({type: String})
  id!: string

  @Prop({default: false, type: Boolean})
  readonly disabled!: boolean

  @Prop({
    type: String,
    default: 'dark',
    validator: value => COLORSLIST.includes(value as string)
  })
  color!: string

  @Prop({default: false, type: Boolean})
  value!: boolean

  // checkedValue = false;

  mounted() {
    //   this.checkedValue = this.value;
  }

  get bindingValue() {
    return this.value
  }

  set bindingValue(value: boolean) {
    this.$emit('input', value)
  }

  @Emit('click')
  onClick(e: Event): Event {
    return e
  }

  get classes() {
    let classes: string[] = []

    if (this.bindingValue) {
      classes = classes.concat(['after:rotate-45', 'after:scale-100', 'after:opacity-100'])
    } else {
      classes = classes.concat(['after:rotate-0', 'after:scale-0', 'after:opacity-0'])
    }

    if (this.color) {
      const availableColors = new Map()
        .set(Colors.LIGHT, ['bg-white', 'after:border-black'])
        .set(Colors.MEDIUM, ['bg-black-light', 'after:border-white'])
        .set(Colors.DARK, ['bg-black', 'after:border-white'])
        .set(Colors.BLUE, ['after:border-white'])

      classes = classes.concat(availableColors.get(this.color))

      const blueBg = this.bindingValue ? 'bg-blue-light' : 'bg-black'

      classes.push(blueBg)
    }

    return classes
  }

  get computedId() {
    return this.id || this.generateId('pe-checkbox')
  }

  public generateId(prefix: string): string {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`
  }
}
</script>
