<template>
  <footer class="footer flex flex-col justify-center bg-black-light">
    <section class="px-6">
      <div class="flex justify-center py-5 md:py-11">
        <a
          v-if="showLogo"
          href="/"
          class="col-span-11 mx-auto hidden md:flow-root md:w-2/5 xl:w-1/5"
        >
          <PE-image-strapi
            :image="logo"
            class="h-16"
          />
        </a>
      </div>

      <!-- links section, awards & social -->
      <div class="flex">
        <div class="container m-auto md:grid md:grid-cols-12 md:gap-y-5 md:gap-x-5 2xl:gap-x-8">
          <PE-expansion-panel class="md:hidden">
            <template #headerText>
              <p class="my-4 font-semibold">{{ resorts.title }}</p>
            </template>

            <template #content>
              <PE-footer-item
                class="col-span-12 items-start md:col-span-6 lg:col-span-2 lg:items-center"
                :links="resorts.links"
              />
            </template>
          </PE-expansion-panel>

          <PE-footer-item
            class="footer-item col-span-12 flex hidden items-start md:col-span-6 md:flow-root lg:col-span-2 lg:items-center"
            :title="resorts.title"
            :links="resorts.links"
          />

          <!-- link section #2-->

          <PE-expansion-panel
            :header-text="ourWebsites.title"
            class="md:hidden"
          >
            <template #headerText>
              <p class="my-4 font-semibold">{{ ourWebsites.title }}</p>
            </template>

            <template #content>
              <PE-footer-item
                class="col-span-12 items-start md:col-span-6 md:flow-root lg:col-span-3 lg:items-center"
                :links="ourWebsites.links"
              />
            </template>
          </PE-expansion-panel>

          <PE-footer-item
            class="col-span-12 hidden items-start md:col-span-6 md:flex lg:col-span-3 lg:items-center lg:[&>div]:w-[80%]"
            :title="ourWebsites.title"
            :links="ourWebsites.links"
          />

          <PE-expansion-panel
            :header-text="resources.title"
            class="md:hidden"
          >
            <template #headerText>
              <p class="my-4 font-semibold">{{ resources.title }}</p>
            </template>

            <template #content>
              <PE-footer-item
                class="col-span-12 items-start md:col-span-6 md:flow-root lg:col-span-3 lg:items-center"
                :links="resources.links"
              />
            </template>
          </PE-expansion-panel>

          <PE-footer-item
            class="col-span-12 hidden items-start md:col-span-6 md:flex lg:col-span-3 lg:items-center"
            :title="resources.title"
            :links="resources.links"
          />

          <div
            class="col-span-12 mt-2 flex flex-col text-white md:col-span-6 md:mt-0 md:items-center lg:col-span-4 lg:items-end"
          >
            <div class="flex h-full flex-col">
              <p
                class="my-4 font-semibold"
                :class="hasNewsletter ? '' : 'hidden md:flow-root '"
              >
                {{ contactTitle }}
              </p>
              <div
                v-if="hasNewsletter"
                class="footerNewsletter"
              >
                <form class="pt-1">
                  <div class="mb-8 flex">
                    <PE-input
                      type="text"
                      class="!rounded-r-none"
                      :label="newsletter?.placeholder"
                      color="dark"
                    >
                    </PE-input>

                    <div class="w-1/3 rounded-l-none">
                      <PE-button
                        class="rounded-l-none py-[16px] pe-max-w-[100%]"
                        type="submit"
                        solid
                        :label="newsletter?.submitLabel"
                        uppercase
                      />
                    </div>
                  </div>

                  <PE-checkbox
                    v-model="checkbox"
                    :input-value="checkbox"
                    class="my-4 [&>input]:px-2"
                  >
                    <div v-if="hasLinkOneNewsletter">
                      {{ newsletter?.textOne }}

                      <PEButton
                        v-bind="newsletter?.linkOne"
                        text
                        flat
                        class="pe-font-sans pe-text-base !pe-h-[25px]"
                      />
                    </div>

                    <div v-if="hasLinkOneNewsletter">
                      {{ newsletter?.textTwo }}

                      <PEButton
                        v-bind="newsletter?.linkTwo"
                        text
                        flat
                        class="pe-font-sans pe-text-base !pe-h-[25px]"
                      />
                    </div>
                  </PE-checkbox>
                </form>
              </div>

              <div
                class="footer-contact mt-10 mb-2"
                :class="hasNewsletter ? 'md:mt-auto lg:mb-3' : 'md:mt-0'"
              >
                <div class="mb-6 flex items-center">
                  <PEIcon
                    class="mr-3 mb-4 min-w-[16px] text-white"
                    size="24"
                    >map-pin</PEIcon
                  >
                  <p class="pe-body-text pe-body-text--4 pe-body-text--light pe-leading-6">
                    {{ getAddress }}
                  </p>
                </div>

                <div class="flex">
                  <PEIcon
                    class="mr-3 mb-4 text-white"
                    size="22"
                    >phone</PEIcon
                  >
                  <span class="pe-body-text pe-body-text--4 pe-body-text--light">
                    {{ getTelephone }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div class="col-span-12 mb-3 pe-flex pe-justify-between text-white">
            <div class="col-span-12 flex justify-center py-6 md:hidden">
              <a
                href="/"
                class="w-4/6 md:flow-root md:w-2/5 xl:w-1/5"
              >
                <PE-image-strapi
                  :image="logo"
                  class="h-12"
                />
              </a>
            </div>

            <!-- INICIO DE SECCION DE REDES SOCIALES -->
            <div
              class="pe-col-span-12 flex pe-flex-wrap pe-items-end justify-center md:col-span-3 md:justify-start lg:col-span-3 2xl:col-span-3"
            >
              <PEButton
                v-if="hasFacebook"
                text
              >
                <PE-icon class="mx-3 !pe-text-white md:mx-2">facebook</PE-icon>
              </PEButton>

              <PEButton
                v-if="hasInstagram"
                text
              >
                <PE-icon class="mx-5 !pe-text-white md:mx-2">instagram</PE-icon>
              </PEButton>
              <!-- <div
                class="flex"
                v-if="hasSocialNetworks"
              >
              </div> -->
            </div>
            <!-- FIN DE SECCION DE REDES SOCIALES -->

            <!-- INICIO DE SECCION DE AWARDS -->
            <div
              class="col-span-12 mb-5 hidden md:col-span-9 md:flow-root lg:col-span-9 2xl:col-span-9"
            >
              <div class="pb-8 mt-2 flex flex-wrap justify-center md:justify-end">
                <PE-image-strapi
                  v-for="(award, index) in awards"
                  :key="index"
                  :image="getImageAward(award)"
                  class="my-2 h-auto w-28 fill-white md:mx-2 lg:ml-6"
                />
              </div>
            </div>
            <!-- FIN DE SECCION DE AWARDS -->

            <!-- INICIO DE SECCION DE IDIOMA -->
            <LangSwitcher
              div-class="col-span-12 my-5 flex flex-wrap items-end justify-center md:col-span-12 md:hidden md:justify-center lg:col-span-5 2xl:col-span-8"
              link-class="mx-3 text-white"
              display="name"
            />

            <!-- FIN DE SECCION DE IDIOMA -->
          </div>
        </div>
      </div>
    </section>

    <hr class="border-1 col-span-12 mb-3 border-[#5A5B5E]" />
    <section>
      <div class="flex justify-center py-10">
        <div class="container grid grid-cols-12">
          <!-- INICIO DE SECCION LEGAL -->
          <div
            class="col-span-10 flex flex-wrap justify-start text-xs text-white sm:col-span-8 md:col-span-5"
          >
            <template v-if="showLegalInformation">
              <PEButton
                v-for="(legal, index) in legalInformation"
                :key="index"
                text
                class="pe-mx-2 pe-flex !pe-text-xs !pe-text-white !pe-h-[35px] !pe-no-underline"
                v-bind="legal"
              />
            </template>
          </div>
          <!-- FIN DE SECCION LEGAL -->

          <div class="flex flex-wrap justify-around text-xs text-white md:col-span-2"></div>

          <!-- languages desktop-->

          <div
            class="col-span-12 flex flex-wrap items-center justify-start text-xs text-white md:col-span-5 md:justify-evenly"
          >
            <div class="m-2 lg:ml-5">{{ attributes?.allRightsReserved }}</div>

            <!-- INICIO DE SECCION DE IDIOMA -->
              <LangSwitcher
                div-class="m-2 hidden md:flow-root lg:ml-auto"
                link-class="mr-5 text-white"
                display="name"
              />
            <!-- FIN DE SECCION DE IDIOMA -->
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
import LangSwitcher from '../i18n/LangSwitcher.vue'
import PEFooterItem from './PEFooterItem.vue'

@Component({
  name: 'PEFooter',
  components: {
    PEFooterItem,
    LangSwitcher,
  }
})
export default class PEFooter extends Vue {
  checkbox = false

  // ============================================================
  @Prop({type: Object, default: null, required: true}) footerdata!: any

  get hasNewsletter(): boolean {
    return this.attributes.newsletter !== null
  }

  get hasLinkOneNewsletter(): boolean {
    return this.attributes?.newsletter?.linkOne !== null
  }

  get hasLinkTwoNewsletter(): boolean {
    return this.attributes?.newsletter?.linkTwo !== null
  }

  get hasFacebook(): boolean {
    return this.socialNetworks.facebook !== null
  }

  get hasInstagram(): boolean {
    return this.socialNetworks.instagram !== null
  }

  get hasSocialNetworks(): boolean {
    return this.socialNetworks !== null
  }

  get socialNetworks() {
    return this.attributes?.socialNetworks
  }

  get logo() {
    return this.attributes.logo?.media?.data?.attributes
  }

  get showLogo() {
    return ![[], null, undefined].includes(this.attributes.logo?.media?.data?.attributes)
  }

  get getTelephone() {
    return this.contact?.telephone?.data?.attributes?.telephone
  }

  get getAddress() {
    return this.contact?.address
  }

  getImageAward(award: any) {
    return award?.media?.data?.attributes
  }

  // ============================================================

  get attributes() {
    return this.footerdata.data.attributes
  }

  get awards() {
    const {awards} = this.attributes

    return awards
  }

  get contact() {
    return this.attributes.contact
  }

  get showLegalInformation(): boolean {
    return this.legalInformation !== null
  }

  get legalInformation() {
    return this.attributes?.legalInformation
  }

  get locale() {
    return this.attributes.locale
  }

  get newsletter() {
    return this.attributes.newsletter
  }

  get ourWebsites() {
    return this.attributes.ourWebsites
  }

  get resorts() {
    return this.attributes.resorts
  }

  get resources() {
    return this.attributes.resources
  }

  get contactTitle() {
    if (this.hasNewsletter) {
      return this.newsletter.title
    }

    return this.contact.title
  }
}
</script>
