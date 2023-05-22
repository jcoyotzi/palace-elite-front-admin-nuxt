<template>
  <div class="w-full flex pe-my-10">
    <div :class="columnClasses">
      <p :class="titleClasses">
        {{ membershipInfo.label }}
      </p>
      <ul
        v-for="(link, index) in membershipInfo.links"
        :key="index"
      >
        <li>
          <PEButton
            v-bind="link"
            :class="buttonClasses"
            without-border
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
import {Membership} from '../../../../app/layout/domain/entities/navbarEntity'
import ItemsList from './ItemsList.vue'

@Component({
  name: 'Benefits',
  components: {
    ItemsList
  }
})
export default class MembershipSubmenu extends Vue {
  @Prop({type: Object, required: true}) membership!: Membership

  get membershipInfo(): any {
    return this.membership.information
    // return this.mockBenefits.information
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

  itemClicked() {
    this.$emit('clickedItem')
  }
}
</script>
