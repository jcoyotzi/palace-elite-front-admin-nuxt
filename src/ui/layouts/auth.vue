<template>
  <div class="pe-bg-black">
    <!-- <PENavbar class="pe-absolute pe-z-30 pe-bg-navbar pe-border-navbar" :is-authenticated="false" :logo-img="logoImg"
      :logo-icon-img="logoIconImg" :login-label="loginLabel" :home="home" @click-menu="onMenuClicked"
      @show-login="onShowLoginForm">
      <template #login-form="{ show }">
        <PEAuthHandler v-if="show" :external-error-message="externalErrorMessage"
          @sing-up:identifiers="signUpIdentifiers" @sign-up:password="signUp" @sign-up:confirmation="confirmSignUp"
          @sign-in="signIn" @forgot-password:email="forgotPassword"
          @forgot-password:reset-password="forgotPasswordSubmit" />
      </template>
    </PENavbar> -->
    <client-only>
      <PENavbarStrapi />
      <PEMenu
        :value="navigationMenu"
        :primary-links="primaryLinks"
        :secondary-links="secondaryLinks"
        :languages="languages"
        :phone="phone"
        @input="onMenuClicked"
      />
    </client-only>

    <main>
      <client-only>
        <Nuxt />
      </client-only>
    </main>
    <PEFooterStrapi />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import PENavbarStrapi from '../components/Layout/PENavbarStrapi.vue'
import {UseAuth} from '~/src/ui/store/auth'
import {
  AuthHandlerSubmitEvent,
  SingInForm,
  SignUpConfirmationForm,
  SignUpPasswordForm,
  SignUpIdentifiersForm,
  ForgotPasswordEmailForm,
  ForgotPasswordResetPasswordForm
} from '~/src/ui/components/PEAuthHandler.vue'
// import { LayoutStore } from '../store/layoutStore'
import PEFooterStrapi from '~/src/ui/components/Layout/PEFooterStrapi.vue'
import i18n from '~/src/ui/i18n/login/loginForm'

@Component({
  components: {PEFooterStrapi, PENavbarStrapi, i18n},
  name: 'auth'
})
export default class Auth extends Vue {
  // layoutStore = new LayoutStore()
  /** MENU **/
  navigationMenu = false

  /* get footerDataStrapi() {
    return this.layoutStore.footerData
  } */

  async mounted() {
    console.log('AUTH LAYOUT MOUNTED!')
  }

  externalErrorMessage = ''
  auth = {
    affiliationNumber: '',
    email: ''
  }

  get authStore() {
    return new UseAuth()
  }

  onShowLoginForm() {
    this.externalErrorMessage = ''
  }

  async signIn({form, submitEnd}: AuthHandlerSubmitEvent<SingInForm>) {
    try {
      await this.authStore.signIn(form.email, form.password)
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async signUpIdentifiers({
    submitEnd,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<SignUpIdentifiersForm>) {
    try {
      await new Promise(resolve => resolve(2))
      this.auth.email = form.email
      this.auth.affiliationNumber = form.affiliationId
      await this.authStore.isSignUPossible(form.email, form.affiliationId)
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async signUp({submitEnd, nextStep, form}: AuthHandlerSubmitEvent<SignUpPasswordForm>) {
    try {
      await this.authStore.signUp(this.auth.email, form.password, this.auth.affiliationNumber)
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async confirmSignUp({submitEnd, nextStep, form}: AuthHandlerSubmitEvent<SignUpConfirmationForm>) {
    try {
      await this.authStore.confirmSignUp(this.auth.email, form.confirmationCode)
      // console.log(form)
      submitEnd()
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async forgotPassword({
    submitEnd,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<ForgotPasswordEmailForm>) {
    try {
      await new Promise(resolve => resolve(2))
      const forgotPassword = await this.authStore.forgotPassword(form.email)
      // console.log(forgotPassword)
      submitEnd()
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  async forgotPasswordSubmit({
    submitEnd,
    nextStep,
    form
  }: AuthHandlerSubmitEvent<ForgotPasswordResetPasswordForm>) {
    try {
      await new Promise(resolve => resolve(2))
      const forgotPasswordConfirmation = await this.authStore.forgotPasswordSubmit(
        form.email,
        form.confirmationCode,
        form.password
      )
      // console.log(form)
      // console.log(forgotPasswordConfirmation)
      submitEnd()
      nextStep()
    } catch (error: any) {
      this.externalErrorMessage = (error.message + '') as string
    } finally {
      submitEnd()
    }
  }

  onMenuClicked() {
    this.navigationMenu = !this.navigationMenu
  }

  authProps = {
    externalErrorMessage: null as string | null,
    titleLogin: this.$t('unlock'),
    titleSignin: this.$t('firstTimeUser'),
    titleReset: this.$t('resetPasword'),
    affiliationID: 'Affiliation Id',
    password: 'Password',
    show: this.$t('showPassword'),
    forgotPassword: {
      label: this.$t('forgotPassword'),
      url: '#'
    },
    rememberMe: this.$t('rememberMe'),
    buttonLogin: {
      label: this.$t('loginBtn'),
    },
    buttonSignin: {
      label: this.$t('sendLbl'),
    },
    buttonReset: {
      label: this.$t('resetPasword'),
    },
    firstTimeUsers: {
      label: this.$t('firstTimeUser'),
      url: '#'
    },
    becomeAMember: {
      label: 'Tempted to become a member?',
      url: '#'
    },
    back: 'Back to Login',
    memberEmail: 'Member Email',
    privacyLabel: 'For more information about the processing of your personal data, read our',
    privacyLink: {
      label: 'Privacy Notice',
      url: '#'
    },
    description:
      "Enter your Affiliation ID and we'll send a link to your registered email where you can reset your password"
  }

  primaryLinks = [
    {id: 1, label: 'Home', to: '/'},
    {id: 2, label: 'Destinations & Resorts', href: ''},
    {id: 3, label: 'Offers', href: ''},
    {id: 4, label: 'Login', href: ''}
  ]

  secondaryLinks = [
    {id: 1, label: 'All inclusive', href: ''},
    {id: 2, label: 'Weddings & Resorts', href: ''},
    {id: 3, label: 'Palace Resorts Brand', href: ''},
    {id: 4, label: 'Moon Palace Brand', href: ''},
    {id: 5, label: 'Le Blanc Resorts Brand', href: ''},
    {id: 6, label: 'Meetings', href: ''},
    {id: 7, label: 'Palace Foundation', href: ''},
    {id: 8, label: 'Low Carbon', href: ''},
    {id: 9, label: 'Pre Check-in', href: ''},
    {id: 10, label: 'Contact Us', href: ''}
  ]

  languages = [
    {id: 1, label: 'es', href: ''},
    {id: 2, label: 'en', href: ''}
  ]

  phone = '4612106159'
  logoImg = {
    title: 'Palace Elite',
    url: 'https://d396g00xwrhdnt.cloudfront.net/content/palace_elite_logo_a16dc780f7.svg'
  }

  logoIconImg = {
    title: 'Palace Elite',
    url: 'https://d396g00xwrhdnt.cloudfront.net/content/pr_icon_logo_13715db4b1.svg'
  }

  loginLabel = 'Login'
  home = {
    tag: 'NuxtLink',
    to: '/',
    label: 'Home'
  }

  dashboard = {
    tag: 'NuxtLink',
    to: '/dashboard',
    label: 'Dashboard'
  }

  booking = {
    tag: 'NuxtLink',
    to: '/booking',
    label: 'Booking'
  }

  offers = {
    tag: 'NuxtLink',
    to: '/offers',
    label: 'Offers'
  }

  membership = {
    label: 'My Information',
    to: '/membership',
    childs: [
      {
        to: '/SummaryAndPayments',
        label: 'Summary & Payments'
      },
      {
        to: '/MyContract',
        label: 'My Contract'
      },
      {
        to: '/CreditCards',
        label: 'Credit Cards'
      },
      {
        to: '/Owners',
        label: 'Owners'
      },
      {
        to: '/Beneficiaries',
        label: 'Beneficiaries'
      },
      {
        to: '/Guests',
        label: 'Guests'
      }
    ]
  }

  benefits = [
    {
      label: 'Weeks',
      to: '/weeks',
      childs: [
        {
          label: 'Preferential Weeks',
          to: '/preferential'
        },
        {
          label: 'Imperial Weeks',
          to: '/imperial'
        },
        {
          label: 'Bonus Weeks',
          to: '/bonus'
        },
        {
          label: 'Anniversary Weeks',
          to: '/anniversary'
        },
        {
          label: 'Incentive Weeks',
          to: '/incentive'
        },
        {
          label: 'All Weeks',
          to: '/all'
        }
      ]
    },
    {
      label: 'Programs',
      to: '/programs',
      childs: [
        {
          label: 'Reward nights',
          to: 'rewards'
        },
        {
          label: 'Referal program',
          to: 'referal'
        },
        {
          label: 'Resort credit',
          to: 'resort'
        }
      ]
    },
    {
      label: 'Wallet',
      to: '/wallet',
      childs: [
        {
          label: 'Universal Credit',
          to: '/universal'
        },
        {
          label: 'Referal program',
          to: '/booking'
        }
      ]
    }
  ]

  footerdata = {
    data: {
      id: 1,
      attributes: {
        locale: 'en',
        resorts: {
          id: 2,
          title: 'Resorts',
          links: [
            {
              id: 11,
              type: 'page',
              label: 'Moon Palace Resorts Cancún ',
              url: '/iframe.html?globals=backgrounds.navigationMenu:!hex(272527)&id=atomic-pefooter--pe-footer-1&viewMode=story',
              page: {
                data: {
                  id: 5,
                  attributes: {
                    slug: 'destinations-resorts-moon-palace-resorts',
                    title: 'Moon Palace Resorts'
                  }
                }
              }
            },
            {
              id: 11,
              type: 'page',
              label: 'Palace Resorts',
              url: '/iframe.html?globals=backgrounds.navigationMenu:!hex(272527)&id=atomic-pefooter--pe-footer-1&viewMode=story',
              page: {
                data: {
                  id: 5,
                  attributes: {
                    slug: 'destinations-resorts-moon-palace-resorts',
                    title: 'Moon Palace Resorts'
                  }
                }
              }
            },
            {
              id: 11,
              type: 'page',
              label: 'Le Blanc Spa Resorts ',
              url: '/iframe.html?globals=backgrounds.navigationMenu:!hex(272527)&id=atomic-pefooter--pe-footer-1&viewMode=story',
              page: {
                data: {
                  id: 5,
                  attributes: {
                    slug: 'destinations-resorts-moon-palace-resorts',
                    title: 'Moon Palace Resorts'
                  }
                }
              }
            }
          ]
        },
        ourWebsites: {
          id: 3,
          title: 'Our Websites',
          links: [
            {
              id: 12,
              type: 'page',
              label: 'Moon Palace Resorts',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            },
            {
              id: 12,
              type: 'page',
              label: 'Palace Premier Moon Palace Resorts Cancún',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            },
            {
              id: 12,
              type: 'page',
              label: 'Palace Premier',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            },
            {
              id: 12,
              type: 'page',
              label: 'Palace Premier',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            },
            {
              id: 12,
              type: 'page',
              label: 'Weddings',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            },
            {
              id: 12,
              type: 'page',
              label: 'Meetings',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            },
            {
              id: 12,
              type: 'page',
              label: 'Travel Agents',
              url: null,
              page: {
                data: {
                  id: 4,
                  attributes: {
                    slug: 'all-inclusive',
                    title: 'All inclusive'
                  }
                }
              }
            }
          ]
        },
        resources: {
          id: 4,
          title: 'Resources',
          links: [
            {
              id: 13,
              type: 'page',
              label: 'Moon Palace Resorts Moon Palace Resorts',
              url: '/palace-premier/contact-us',
              page: {
                data: {
                  id: 6,
                  attributes: {
                    slug: 'contact-us',
                    title: 'Contact Us'
                  }
                }
              }
            },
            {
              id: 13,
              type: 'page',
              label: 'Help Center',
              url: null,
              page: {
                data: {
                  id: 6,
                  attributes: {
                    slug: 'contact-us',
                    title: 'Contact Us'
                  }
                }
              }
            }
          ]
        },
        newsletter: {
          id: 1,
          title: 'Having trouble receiving newsletter?',
          placeholder: 'Tell us what happened',
          submitLabel: 'Submit',
          textOne: 'I have read and agree to the',
          textTwo: 'and',
          linkOne: {
            id: 14,
            type: 'page',
            label: 'Terms & Conditions',
            url: null,
            page: {
              data: {
                id: 7,
                attributes: {
                  slug: 'terms-and-conditions',
                  title: 'Terms & Conditions'
                }
              }
            }
          },
          linkTwo: {
            id: 15,
            type: 'page',
            label: 'Privacy Notice',
            url: null,
            page: {
              data: {
                id: 8,
                attributes: {
                  slug: 'privacy-notice',
                  title: 'Privacy Notice'
                }
              }
            }
          }
        },
        contact: {
          id: 1,
          title: 'Contact',
          address: 'Cancun - Chetumal Km 340, Riviera Maya, 77500 Cancun, Q.R., Mexico',
          telephone: {
            data: {
              id: 2,
              attributes: {
                telephone: '+52 (998) 193-0285'
              }
            }
          }
        },
        socialNetworks: {
          id: 1,
          facebook: {
            id: 16,
            type: 'url',
            label: null,
            url: 'https://facebook.com/palace-resorts'
          },
          instagram: {
            id: 17,
            type: 'url',
            label: null,
            url: 'https://instagram.com/palace-resorts'
          }
        },
        awards: [
          {
            id: 2,
            title: 'Traveler 2021',
            altText: 'Traveler 2021',
            media: {
              data: {
                id: 1,
                attributes: {
                  name: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  alternativeText: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  caption: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  width: 3236,
                  height: 1820,
                  formats: {
                    large: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'large_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'large_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 71.14,
                      width: 1000,
                      height: 562
                    },
                    small: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'small_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'small_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 27.02,
                      width: 500,
                      height: 281
                    },
                    medium: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'medium_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'medium_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 47.41,
                      width: 750,
                      height: 422
                    },
                    thumbnail: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'thumbnail_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'thumbnail_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 9.24,
                      width: 245,
                      height: 138
                    }
                  },
                  hash: 'tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  size: 379.89,
                  url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                  previewUrl: null,
                  provider: 'local',
                  provider_metadata: null,
                  createdAt: '2022-07-14T17:57:24.819Z',
                  updatedAt: '2022-07-14T17:57:24.819Z'
                }
              }
            }
          },
          {
            id: 2,
            title: 'Traveler 2021',
            altText: 'Traveler 2021',
            media: {
              data: {
                id: 1,
                attributes: {
                  name: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  alternativeText: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  caption: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  width: 3236,
                  height: 1820,
                  formats: {
                    large: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'large_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'large_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 71.14,
                      width: 1000,
                      height: 562
                    },
                    small: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'small_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'small_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 27.02,
                      width: 500,
                      height: 281
                    },
                    medium: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'medium_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'medium_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 47.41,
                      width: 750,
                      height: 422
                    },
                    thumbnail: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'thumbnail_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'thumbnail_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 9.24,
                      width: 245,
                      height: 138
                    }
                  },
                  hash: 'tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  size: 379.89,
                  url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                  previewUrl: null,
                  provider: 'local',
                  provider_metadata: null,
                  createdAt: '2022-07-14T17:57:24.819Z',
                  updatedAt: '2022-07-14T17:57:24.819Z'
                }
              }
            }
          },
          {
            id: 2,
            title: 'Traveler 2021',
            altText: 'Traveler 2021',
            media: {
              data: {
                id: 1,
                attributes: {
                  name: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  alternativeText: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  caption: 'tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                  width: 3236,
                  height: 1820,
                  formats: {
                    large: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'large_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'large_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 71.14,
                      width: 1000,
                      height: 562
                    },
                    small: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'small_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'small_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 27.02,
                      width: 500,
                      height: 281
                    },
                    medium: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'medium_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'medium_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 47.41,
                      width: 750,
                      height: 422
                    },
                    thumbnail: {
                      ext: '.jpg',
                      url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                      hash: 'thumbnail_tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                      mime: 'image/jpeg',
                      name: 'thumbnail_tech_neoncircuitboard_857021704_medium_lc5h05.jpg',
                      path: null,
                      size: 9.24,
                      width: 245,
                      height: 138
                    }
                  },
                  hash: 'tech_neoncircuitboard_857021704_medium_lc5h05_be70cf0276',
                  ext: '.jpg',
                  mime: 'image/jpeg',
                  size: 379.89,
                  url: 'https://prod-playa-palace.s3.amazonaws.com/tripadvisor_2022_gris_oscuro_b837f79f4a.svg',
                  previewUrl: null,
                  provider: 'local',
                  provider_metadata: null,
                  createdAt: '2022-07-14T17:57:24.819Z',
                  updatedAt: '2022-07-14T17:57:24.819Z'
                }
              }
            }
          }
        ],
        legalInformation: [
          {
            id: 18,
            type: 'page',
            label: 'Covid Measures',
            url: null,
            page: {
              data: {
                id: 9,
                attributes: {
                  slug: 'covid-measures',
                  title: 'Covid Measures'
                }
              }
            }
          },
          {
            id: 18,
            type: 'page',
            label: 'Sustainability Policy',
            url: null,
            page: {
              data: {
                id: 9,
                attributes: {
                  slug: 'covid-measures',
                  title: 'Covid Measures'
                }
              }
            }
          },
          {
            id: 18,
            type: 'page',
            label: 'Hurricane Policy',
            url: null,
            page: {
              data: {
                id: 9,
                attributes: {
                  slug: 'covid-measures',
                  title: 'Covid Measures'
                }
              }
            }
          },
          {
            id: 18,
            type: 'page',
            label: 'Terms of Use ',
            url: null,
            page: {
              data: {
                id: 9,
                attributes: {
                  slug: 'covid-measures',
                  title: 'Covid Measures'
                }
              }
            }
          },
          {
            id: 18,
            type: 'page',
            label: 'Privacy Notice',
            url: null,
            page: {
              data: {
                id: 9,
                attributes: {
                  slug: 'covid-measures',
                  title: 'Covid Measures'
                }
              }
            }
          },
          {
            id: 18,
            type: 'page',
            label: 'Sitemap',
            url: null,
            page: {
              data: {
                id: 9,
                attributes: {
                  slug: 'covid-measures',
                  title: 'Covid Measures'
                }
              }
            }
          }
        ]
      }
    }
  }
}
</script>

<style>
.bg-navbar {
  background: rgb(255, 255, 255);
  background: linear-gradient(
    0deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(0, 0, 0, 0.6923144257703081) 80%
  );
}

.border-navbar {
  border-color: rgba(255, 255, 255, 0.75);
}

.font-sans {
  font-family: 'Open sans';
}
</style>
