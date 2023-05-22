<template>
  <section class="pe-w-full pe-bg-black pe-py-8">
    <div class="pe-w-11/12 pe-mx-auto pe-flex">
      <PE-image-strapi
        rounded
        fit
        :image="media"
        class="pe-hidden pe-w-full pe-flex-grow xl:block h-auto"
      />
      <div class="pe-w-full pe-flex-none xl:pe-max-w-[552px] pe-ml-0 xl:pe-ml-8">
        <PECard
          id="card"
          :title="title"
          :subtitle="subtitle"
        >
          <template #body>
            <div class="w-full flex justify-center pt-8">
              <progress-circle
                :completed-steps="usedWeeks"
                :total-steps="totalWeeks"
              >
                <p class="pe-text-white pe-text-2xl pe-font-semibold">
                  {{ usedWeeks }}/{{ totalWeeks }}
                </p>
                <span class="pe-text-white pe-text-xs pe-text-center pe-uppercase"
                  >Preferential <span class="pe-block">Weeks</span></span
                >
              </progress-circle>
            </div>
          </template>
          <template #footer>
            <div class="pe-w-full pe-flex pe-flex-col xl:pe-flex-row pe-justify-center pe-pt-8">
              <div class="pe-pr-0" :class="customClassFirstButton">
                <PEButton
                  v-if="primaryBtnLabel"
                  block
                  flat
                  secondary
                  uppercase
                  :label="primaryBtnLabel"
                  @click="useNowClick"
                />
              </div>
              <div v-if="secondaryBtnLabel" class="pe-pl-0 pe-pt-4 xl:pe-pl-4 xl:pe-pt-0">
                <PEButton
                  block
                  flat
                  outlined-secondary
                  uppercase
                  :label="secondaryBtnLabel"
                  @click="learnMoreClick"
                />
              </div>
            </div>
          </template>
        </PECard>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import {Component, Emit, Prop, Vue} from 'vue-property-decorator'
// @ts-ignore
import ProgressCircle from './ProgressCircle'

export interface Image {
  mime: string
  url: string
  alt: string
  title: string
}

@Component({
  name: 'Widget',
  components: {ProgressCircle}
})
export default class Widget extends Vue {
  @Prop({type: String, default: 'Vestibulum id pellentesque dui'})
  readonly title!: string

  @Prop({
    type: String,
    default:
      'Get real-time insights into your used weeks and nights left, so you can plan your vacation time accordingly.'
  })
  readonly subtitle!: string

  @Prop({type: Number, default: 0})
  readonly totalWeeks!: number

  @Prop({type: Number, default: 0})
  readonly usedWeeks!: number

  @Prop({type: String, default: ''})
  readonly primaryBtnLabel!: string

  @Prop({type: String, default: ''})
  readonly secondaryBtnLabel!: string

  @Prop({type: Object, required: true})
  readonly media!: Image

  @Prop({type: String, default: '#FFFFFF'})
  readonly firstProgressBarColor!: string

  @Prop({type: String, default: '#90AFC5'})
  readonly secondProgressBarColor!: string

  get customClassFirstButton() {
    return {
      "xl:pe-pr-4": this.secondaryBtnLabel,
      "": !this.secondaryBtnLabel
    }
  }

  // @Emit()
  useNowClick():void {
    this.$nuxt.$router.push(this.localePath('/build-your-search'))
  }

  @Emit()
  learnMoreClick(e: any) {
    return e
  }
}
</script>

<style lang="scss" scoped>
#card {
  p,
  h3 span {
    text-align: center;
  }
}
</style>
