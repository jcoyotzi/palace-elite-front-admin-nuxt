<template>
  <div
    class="pe-max-w-[95%] xl:pe-min-w-[400px] pe-flex pe-items-center pe-justify-center pe-rounded pe-overflow-hidden pe-text-white pe-bg-black-light pe-py-2 pe-px-5 xl:pe-py-5"
  >
    <PEIcon
      class="pe-text-white mr-2"
      :size="36"
      >offer-clock</PEIcon
    >
    <p class="pe-font-serif pe-pr-2 xl:pe-pr-2 pe-text-sm xl:pe-text-[13px] pe-uppercase">
      <slot name="title"> </slot>
    </p>
    <div
      class="pe-flex pe-items-start pe-text-center pe-border-l pe-border-l-white pe-pl-2.5"
    >
      <div>
        <p class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px]">{{
          days.length > 1 ? days : '0' + days
        }}</p>
        <p class="pe-text-[10px] pe-uppercase">
          {{ dayLabel }}
        </p>
      </div>
      <div class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px] pe-mx-1">:</div>
      <div>
        <p class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px]">{{
          hours.length > 1 ? hours : '0' + hours
        }}</p>
        <p class="pe-text-[10px] pe-uppercase">
          {{ hourLabel }}
        </p>
      </div>
      <div class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px] pe-mx-1">:</div>
      <div>
        <p class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px]">{{
          minutes.length > 1 ? minutes : '0' + minutes
        }}</p>
        <p class="pe-text-[10px] pe-uppercase">
          {{ minuteLabel }}
        </p>
      </div>
      <div class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px] pe-mx-1">:</div>
      <div>
        <p class="pe-text-2xl xl:pe-text-[1rem] xl:pe-leading-[20px]">{{
          seconds.length > 1 ? seconds : '0' + seconds
        }}</p>
        <p class="pe-text-[10px] pe-uppercase">
          {{ secondLabel }}
        </p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Component, Vue, Prop, Watch} from 'vue-property-decorator'

type EndTime = Date | string | number

interface ICountdown {
  title: string
  endTime: EndTime
  dayLabel: string
  hourLabel: string
  minuteLabel: string
  secondLabel: string
}

@Component
export default class PECountDown extends Vue {
  internalDate: any

  currentTime: any = new Date()

  interval: any

  @Prop({type: [Date, Number, String], required: true})
    endTime!: ICountdown['endTime']

  @Prop({type: String, required: true})
    dayLabel!: string

  @Prop({type: String, required: true})
    hourLabel!: string

  @Prop({type: String, required: true})
    minuteLabel!: string

  @Prop({type: String, required: true})
    secondLabel!: string

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

  public getDays() {
    const diff = (this.endTime as any) - this.currentTime
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    if (days < 0) {
      return 0
    }
    return days
  }

  public getHours() {
    const diff = (this.endTime as any) - this.currentTime
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    if (hours < 0) {
      return 0
    }
    return hours
  }

  public getMinutes() {
    const diff = (this.endTime as any) - this.currentTime
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    if (minutes < 0) {
      return 0
    }
    return minutes
  }

  public getSeconds() {
    const diff = (this.endTime as any) - this.currentTime
    const seconds = Math.floor((diff % (1000 * 60)) / 1000)
    if (seconds < 0) {
      return 0
    }
    return seconds
  }

  // return true if the currentTime is greater or equal than the endTime
  public validateDate(): boolean {
    if (this.currentTime >= this.endTime) return false
    return true
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
