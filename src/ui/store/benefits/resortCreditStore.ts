import {Pinia, Store} from 'pinia-class-component'
import ActivityEntity from '~/src/app/benefits/domain/entities/activityEntity'
import {StrapiResortCreditMapper} from '~/src/app/benefits/domain/mapper/strapiResortCreditMapper'
import {
  GetTermsAndConditionsDto,
  TermsAndConditions
} from '~/src/app/bookings/domain/dto/getTermsAndConditionsDto'
import UseCase from '~/src/app/common/application/UseCase'
import benefitsTypes from '~/src/app/common/types/benefitsTypes'
import bookingsTypes from '~/src/app/common/types/bookingsTypes'
import emailTypes from '~/src/app/common/types/emailTypes'
import {Emailentity} from '~/src/app/email/domain/entities/emailEntity'
import {lazyInject} from '~/src/container'
import {Response} from '~/src/app/common/domain/entities/response'
import {ResortCreditOptions} from '~/src/app/benefits/domain/enum/resortCreditOptions'

@Store({
  name: 'resortCreditStore'
})
export class ResortCreditStore extends Pinia {
  @lazyInject(benefitsTypes.getResortCreditActivitiesUseCase)
  private readonly getResortCreditActivities!: UseCase<String, any>

  @lazyInject(benefitsTypes.getStrapiResortCreditPageUseCase)
  private readonly getResortCreditPage!: any

  @lazyInject(emailTypes.postEmailUseCase)
  private readonly postEmailUseCase!: any

  @lazyInject(bookingsTypes.getTermsAndConditionsUseCase)
  private readonly getTermsAndConditionsUseCase!: UseCase<null, Response<GetTermsAndConditionsDto>>

  public isLoading: boolean = false

  public isSendingEmail: boolean = false

  public hasError: boolean = false

  activities: ActivityEntity[] | null = null

  categories: string[] | null = null

  pageContent: any = null

  isSuccessfullEmail: boolean = false
  // @ts-ignore
  resortCreditTerms: TermsAndConditions = {
    code: '',
    title: '',
    content: ''
  }

  public async getActivities(resort: string) {
    try {
      this.isLoading = true
      this.hasError = false
      const response = await this.getResortCreditActivities.run(resort)
      this.activities = response
      this.categories = this.getCategories(response)
    } catch (error) {
      this.hasError = true
    } finally {
      this.isLoading = false
    }
  }

  getCategories(activities: ActivityEntity[]) {
    const categories = activities?.map(activity => {
      return activity.category
    })

    categories.unshift('All')

    return [...new Set(categories)] || []
  }

  public async getPageContent() {
    try {
      this.isLoading = true
      const response = await this.getResortCreditPage.run()
      this.pageContent = StrapiResortCreditMapper.mapResortCreditPage(response.data)
    } catch (error) {
      this.hasError = true
    } finally {
      this.isLoading = false
    }
  }

  public resetActivitieItem(payload: ActivityEntity) {
    if (this.activities === null) return
    const index = this.activities.findIndex(item => item.id === payload.id)
    if (index !== -1) {
      this.activities[index].quantity = 0
    }
  }

  public async sendActivitiesEmail(payload: Emailentity) {
    try {
      this.isSendingEmail = true
      this.hasError = false
      const response = await this.postEmailUseCase.run(payload)
      this.isSuccessfullEmail = response.data.data
    } catch (error) {
      this.hasError = true
      this.isSuccessfullEmail = false
    } finally {
      this.isSendingEmail = false
    }
  }

  public async getResortCreditTerms() {
    try {
      const {data} = await this.getTermsAndConditionsUseCase.run(null) || {}
      if (data?.data) {
        const filteredTerms = data.data.filter(term => {
          return term.attributes.code === 'resort-credit'
        })
        this.resortCreditTerms = filteredTerms[0].attributes
      }
    } catch (error) {}
  }

  public calcResortCredits(nights: number): number {
    if (nights === 3) return ResortCreditOptions.CREDITS_3_NIGHTS
    if (nights === 4 ) return ResortCreditOptions.CREDITS_4_NIGHTS
    if (nights >= 5 && nights <= 8) return ResortCreditOptions.CREDITS_5_8_NIGHTS
    if (nights >= 9 && nights <= 11) return ResortCreditOptions.CREDITS_9_11_NIGHTS
    if (nights >= 12) return ResortCreditOptions.CREDITS_12_NIGHTS
    return 0
  }
}
