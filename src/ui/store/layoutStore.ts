import {Store, Pinia} from 'pinia-class-component'
import layoutTypes from '~/src/app/common/types/layoutTypes'
import GetFooterUseCase from '~/src/app/layout/application/getFooterUseCase'
import GetNavbarUseCase from '~/src/app/layout/application/getNavbarUseCase'
import {lazyInject} from '~/src/container'
import GetMenuUseCase from '~/src/app/layout/application/getMenuUseCase'
import {MenuTypeOfDeviceEntity} from '~/src/app/layout/domain/entities/menuEntity'
import MergeMenuDataUseCase from '~/src/app/layout/application/mergeMenuDataUseCase'
import {baglioniCodes} from '~/src/app/property/domain/data/baglioniCodes'
import GetDestinationsUseCase from '~/src/app/layout/application/getDestinationsUseCase'
import { SingleTypes } from '~/src/app/Strapi/StrapiConfiguration'

@Store({
  name: 'layoutStore'
})
export class LayoutStore extends Pinia {
  @lazyInject(layoutTypes.getFooterUseCase)
  private readonly getFooterUseCase!: GetFooterUseCase

  @lazyInject(layoutTypes.getNavbarUseCase)
  private readonly getNavbarUseCase!: GetNavbarUseCase

  @lazyInject(layoutTypes.getMenuUseCase)
  private readonly getMenuUseCase!: GetMenuUseCase

  @lazyInject(layoutTypes.mergeMenuDataUseCase)
  private readonly mergeMenuDataUseCase!: MergeMenuDataUseCase
  
  @lazyInject(layoutTypes.getDestinationsUseCase)
  private readonly getDestinatinosUseCase!: GetDestinationsUseCase

  public currentLocale: string = 'en';

  public modalTitle: string = ''

  public modalMessage: string = ''

  public showModal: boolean = false

  public snackbar: boolean = false

  public snackbarDetailDefault = {
    title: 'Informational Message',
    message: 'Some additional text to explain said message.',
    type: 'error'
  }

  public showModalPleca: boolean = false

  public snackbarDetail = this.snackbarDetailDefault

  public singleTypesLoaded: any = {};

  private footer: any = null

  private navbar: any = {}

  private destinationsStrapi: any = []

  private menuStrapi: MenuTypeOfDeviceEntity = {
    desktop: {
      logoutLabel: '',
      loginLabel: '',
      primaryLinks: [],
      secondaryLinks: [],
      telephone: ''
    },
    mobile: {
      logoutLabel: '',
      loginLabel: '',
      primaryLinks: [],
      secondaryLinks: [],
      telephone: ''
    }
  }

  public itemIndexMembership: number = 0

  public loginLabel = 'Login'

  showSnackbar(title: string = '', message: string = '', type: string = 'error') {
    this.snackbar = true

    this.snackbarDetail = {title, message, type}

    setTimeout(() => {
      this.snackbar = false
    }, 5000)
  }

  async loadSingleType(type: SingleTypes): Promise<any> {
    let singleTypeData: any;
    const locale = this.currentLocale

    if (!this.singleTypesLoaded[type])
      this.singleTypesLoaded[type] = {}
    
    const singleType = this.singleTypesLoaded[type]

    if (singleType[locale])
      return singleType[locale]
    
    switch (type) {
    case SingleTypes.Navbar:
      singleTypeData = await this.getNavbarUseCase.run(locale);
      break;
    case SingleTypes.Menu:
      singleTypeData = await this.getMenuUseCase.run(locale);
      break;
    case SingleTypes.Footer:
      singleTypeData = await this.getFooterUseCase.run(locale);
      break;
    }
    
    if (singleTypeData) {
      singleType[locale] = singleTypeData
    }

    return singleTypeData;
  }

  async fetchFooterStrapi() {
    this.footer = await this.loadSingleType(SingleTypes.Footer);
    return this.footer
  }

  async fetchNavbarStrapi() {
    this.navbar = await this.loadSingleType(SingleTypes.Navbar);
    return this.navbar
  }
  
  async fetchDestinationsStrapi() {
    const data = await this.getDestinatinosUseCase.run(this.currentLocale)
    this.destinationsStrapi = data
  }

  get propertiesPalace() {
    const props = this.navbar.destinations.properties.filter((prop: any) => {
      return !baglioniCodes.includes(prop.externalId)
    })
    return {properties: props}
  }

  get propertiesBaglioni() {
    const props = this.navbar.destinations.properties.filter((prop: any) => {
      return baglioniCodes.includes(prop.externalId)
    })
    return {properties: props}
  }

  async fetchMenuStrapi() {
    const menu = await this.loadSingleType(SingleTypes.Menu);
    this.menuStrapi = this.mergeMenuDataUseCase.run({menu, navbar: this.navbarData})

    return this.menuStrapi
  }

  toggleModal() {
    this.showModal = !this.showModal
  }

  openModal(title: string, message: string) {
    this.showModal = true
    this.modalTitle = title
    this.modalMessage = message
  }

  get footerData() {
    if (!this.footer)
      this.fetchFooterStrapi()
    return this.footer
  }

  get navbarData() {
    if (!this.navbar)
      this.fetchNavbarStrapi()
    return this.navbar
  }

  get menuData() {
    if (!this.menuStrapi)
      this.fetchMenuStrapi()
    return this.menuStrapi
  }
  
  get destinationsData() {
    if (!this.destinationsStrapi)
      this.fetchDestinationsStrapi()
    return this.destinationsStrapi
  }

  get modalData() {
    return {
      show: this.showModal,
      title: this.modalTitle,
      message: this.modalMessage
    }
  }
}
