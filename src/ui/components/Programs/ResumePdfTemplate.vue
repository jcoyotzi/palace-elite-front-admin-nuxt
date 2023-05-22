<template>
  <client-only>
    <div class="pe-w-[796px]">
      <vue-html2pdf
        ref="html2pdf"
        v-bind="pdfSettings"
        @beforeDownload="beforeDownloadPdf($event)"
      >
        <div slot="pdf-content">
          <section :class="sectionClasses">
            <img
              :src="require('../../assets/img/logo_elite_black.png')"
              alt=""
              class="pe-max-w-[180px] pe-py-3"
            />
            <div class="pe-w-full relative">
              <img
                :src="require('../../assets/img/pe-template-activities-header.png')"
                class="pe-absolute pe-right-0 pe-left-0 pe-bottom-0 pe-mx-auto pe-w-[670px]"
              />
              <div class="pe-h-[550px]"></div>
              <div class="pe-flex pe-h-[150px]">
                <div :class="leftTriangleClasses"></div>
                <div :class="rightTriangleClasses"></div>
              </div>
            </div>
          </section>
          <section :class="darkContentClasses">
            <div :class="contentClasses">
              <p class="pe-text-[22px] pe-font-semibold pe-my-[20px]">{{ name }}</p>
              <p class="pe-font-semibold pe-mb-[20px]">{{ affiliation }}</p>
              <p class="pe-mb-[20px]"
                >Please find below the selection of activities and tours in the Resort Credit
                calculator.</p
              >
            </div>
          </section>
          <section
            v-for="(items, index) in servicesByCategory"
            :key="index"
            :class="darkContentClasses"
            class="pe-mx-auto"
          >
            <div :class="contentClasses">
              <h2 class="pe-uppercase">{{ index }}</h2>
              <ul class="pe-mb-5">
                <li
                  v-for="(item, index) in items"
                  :key="index"
                  class="pe-flex pe-justify-between pe-gap-4"
                >
                  <div class="flex pe-gap-2">
                    <div>
                      {{ item.quantity }}
                    </div>
                    <div>
                      {{ item.title }}
                    </div>
                  </div>
                  <div> {{ (item.quantity * item.price) | currency_no_decimals }} USD </div>
                </li>
              </ul>
            </div>
          </section>
          <section :class="darkContentClasses">
            <div :class="contentClasses">
              <div class="pe-flex pe-justify-between pe-py-1">
                <p class="pe-text-[24px]">Total</p>
                <p class="pe-text-[24px]"
                  >{{ total | currency_no_decimals }} <span class="pe-text-base">USD</span></p
                >
              </div>
              <div class="pe-flex pe-justify-between pe-py-1">
                <p>Resort Credit Remaining</p>
                <p> {{ remainCredits | currency_no_decimals }} <span>USD</span></p>
              </div>
            </div>
          </section>
          <section :class="darkContentClasses">
            <div :class="contentClasses">
              <p class="pe-my-10">
                *Please remember that the tool is a simulation and all prices or activities are
                subject to change without notice.
              </p>
            </div>
          </section>
        </div>
      </vue-html2pdf>
      <!-- <PEButton @click="generatePdf"> Download :) </PEButton> -->
    </div>
  </client-only>
</template>

<script lang="ts">
import {Component, Vue, Ref, Prop, Emit, Watch} from 'vue-property-decorator'

@Component({
  name: 'ResumePdfTemplate'
})
export default class ResumePdfTemplate extends Vue {
  @Ref('html2pdf') pdfRef!: any
  @Prop({type: String, default: ''}) readonly name!: string
  @Prop({type: String, default: ''}) readonly affiliation!: string
  @Prop({type: [], default: []}) readonly servicesByCategory!: any
  @Prop({type: Number, default: 0}) readonly total!: number
  @Prop({type: Number, default: 0}) readonly remainCredits!: number
  @Prop() download!: boolean
  @Prop({type: Function}) downloadFn!: any

  get leftTriangleClasses() {
    return [
      'pe-w-0 pe-h-0 pe-border-l-[202px] pe-border-l-black pe-border-b-[75px] pe-border-b-black pe-border-t-[75px] pe-border-t-transparent pe-border-r-[196px] pe-border-r-transparent'
    ]
  }

  get rightTriangleClasses() {
    return [
      'pe-w-0 pe-h-0 pe-border-l-[202px] pe-border-l-transparent pe-border-b-[75px] pe-border-b-black pe-border-t-[75px] pe-border-t-transparent pe-border-r-[196px] pe-border-r-black'
    ]
  }

  get sectionClasses() {
    return [
      'pe-bg-white pe-flex pe-flex-col pe-justify-center pe-items-center pe-text-sm resume pe-box-border pe-w-[796px]'
    ]
  }

  get darkContentClasses() {
    return ['pe-w-[796px] pe-bg-black pe-text-white pe-py-1']
  }

  get contentClasses() {
    return ['pe-mx-auto pe-w-[665px] pe-py-1']
  }

  pdfSettings = {
    showLayout: false,
    // floatLayout: false,
    enableDownload: false,
    pdfFormat: 'a4',
    pdfOrientation: 'portrait',
    pdfContentWidth: '796.8',
    paginateElementsByHeight: 1000,
    manualPagination: false,
    filename: 'resort_credit_simulator_' + Date.now()
  }

  generatePdf() {
    this.pdfRef.generatePdf()
  }

  // @ts-ignore
  async beforeDownloadPdf({html2pdf, options, pdfContent}) {
    await html2pdf()
      .set(options)
      .from(pdfContent)
      .toPdf()
      .get('pdf')
      // @ts-ignore
      .then(pdf => {
        const totalPages = pdf.internal.getNumberOfPages()
        for (let i = 1; i <= totalPages; i++) {
          pdf.setPage(i)
          pdf.setFontSize(10)
          pdf.text('www.PalaceElite.com', 3.3646, 10.948)
          pdf.text('US, CA, Elite Members 1-888-987-7655 MX', 2.8125, 11.1156)
          pdf.text(
            'Elite Members 800-226-4634 WW Direct, Elite Members +52-998-234-0616',
            1.8,
            11.27
          )
          pdf.text('2021 ELITE Members, Palace Resorts', 2.979, 11.438)
        }
      })
      .save()
      .then(() => {
        this.finishedPdf()
      })
  }

  @Emit()
  finishedPdf() {
    return false
  }

  @Watch('download')
  handleDownload(val: boolean) {
    if (!val) return
    this.generatePdf()
  }
}
</script>
<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap');
.resume {
  font-family: 'Inter', sans-serif;
}
</style>
