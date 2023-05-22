<template>
  <div class="w-full flex pe-my-10">
    <div :class="columnClasses">
      <p :class="titleClasses">
        {{ weeksInfo.label }}
      </p>
      <ul
        v-for="(link, index) in weeksInfo.links"
        :key="index"
      >
        <li>
          <PEButton
            v-bind="link"
            without-border
            :class="buttonClasses"
          >
            {{ link.label }}
          </PEButton>
        </li>
      </ul>
    </div>
    <div :class="columnClasses">
      <p :class="titleClasses">
        {{ programsInfo.label }}
      </p>
      <ul
        v-for="(link, index) in programsInfo.links"
        :key="index"
      >
        <li>
          <PEButton
            v-bind="link"
            without-border
            :class="buttonClasses"
          >
            {{ link.label }}
          </PEButton>
        </li>
      </ul>
    </div>
    <div :class="columnClasses">
      <p :class="titleClasses">
        {{ walletInfo.label }}
      </p>
      <ul
        v-for="(link, index) in walletInfo.links"
        :key="index"
      >
        <li>
          <PEButton
            v-bind="link"
            without-border
            :class="buttonClasses"
          >
            {{ link.label }}
          </PEButton>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import {Benefits} from '../../../../app/layout/domain/entities/navbarEntity'
import ItemsList from './ItemsList.vue'

@Component({
  name: 'Benefits',
  components: {
    ItemsList
  }
})
export default class BenefitsSubmenu extends Vue {
  @Prop({type: Object, required: true}) benefits!: Benefits

  get weeksInfo() {
    return this.benefits.weeks
  }

  get programsInfo() {
    return this.benefits.programs
  }

  get walletInfo() {
    return this.benefits.wallet
  }

  get columnClasses() {
    return ['pe-mr-[180px]']
  }

  get titleClasses() {
    return ['pe-text-white pe-font-sans pe-text-[32px] pe-mb-10']
  }

  get buttonClasses() {
    return ['pe-cursor-pointer pe-text-white']
  }
}
</script>
