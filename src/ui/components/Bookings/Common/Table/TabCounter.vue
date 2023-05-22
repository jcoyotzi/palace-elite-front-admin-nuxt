<template>
  <div clasS="pe-w-full pe-flex pe-justify-end">
    <div
      class="pe-flex pe-h-auto pe-w-[280px] pe-items-center pe-overflow-hidden pe-rounded-t-[5px] pe-bg-white pe-py-[11px] pe-pl-[23px] pe-pr-[20px] pe-font-serif pe-text-base pe-text-black md:pe-py-[10px]"
      :class="classText"
    >
      <PEIcon class="pe-mt-0 pe-mr-[10px] pe-text-black">clock</PEIcon>
      <span
        class="pe-m-0 pe-inline-block pe-whitespace-nowrap pe-p-0 pe-align-bottom pe-leading-[15px]"
      >
        {{ clock }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop, Watch} from 'vue-property-decorator'

import i18n from '~/src/ui/i18n/bookings.lang'
import {zeroFill} from '~/src/ui/utils/dateHelpers'
interface Countdown {
  title: string
  endTime: Date
}

@Component({
  i18n
})
export default class TabCounter extends Vue {
  internalDate: any

  currentTime: any = new Date()

  interval: any

  @Prop({default: false, type: Boolean}) uppercase: boolean = false

  @Prop({type: [Date], required: true})
  endTime!: Countdown['endTime']

  mounted() {
    if (this.validateDate()) this.setIntervalDate()
  }

  // clear the interval when the component is destroyed
  beforeDestroy() {
    clearInterval(this.interval)
  }

  // set the interval in which the currentTime will be updated
  public setIntervalDate() {
    this.interval = setInterval(() => {
      this.currentTime = new Date()
    }, 1000)
  }

  public getDays(): string {
    const diff = Number(this.endTime) - this.currentTime
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days < 0) {
      return '00'
    }
    return zeroFill(String(days))
  }

  public getHours(): string {
    const diff = Number(this.endTime) - this.currentTime
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (hours < 0) {
      return '00'
    }
    return zeroFill(String(hours))
  }

  public getMinutes(): string {
    const diff = Number(this.endTime) - this.currentTime
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    if (minutes < 0) {
      return '00'
    }
    return zeroFill(String(minutes))
  }

  public getSeconds(): string {
    const diff = Number(this.endTime) - this.currentTime
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    if (seconds < 0) {
      return '00'
    }
    return zeroFill(String(seconds))
  }

  // return true if the currentTime is greater or equal than the endTime
  public validateDate(): boolean {
    if (this.currentTime >= this.endTime) return false
    return true
  }

  get classText() {
    return {
      uppercase: this.uppercase
    }
  }

  get clock() {
    return `${this.$t('timeRemaining')} ${this.hours}:${this.minutes}:${this.seconds}`
  }

  get days() {
    return this.getDays().toString()
  }

  get hours() {
    return this.getHours().toString()
  }

  get minutes() {
    return this.getMinutes().toString()
  }

  get seconds() {
    return this.getSeconds().toString()
  }

  @Watch('endTime')
  currentTimerWatch() {
    if (this.interval) {
      clearInterval(this.interval)
    }
    this.setIntervalDate()
    if (!this.validateDate()) clearInterval(this.interval)
  }
}
</script>

<style scoped></style>
