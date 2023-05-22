import 'reflect-metadata'
import {Container} from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import jsonServerContainer from './app/common/jsonServer/infrastructure/di/jsonServerContainer'
import propertyContainer from './app/property/property.container'
import contractContainer from './app/contract/contract.container'
import calendarContainer from './app/calendar/calendar.container'
import paymentContainer from './app/payments/payments.container'
import axiosServerContainer from './app/network/axiosServer/axiosServerContainer'
import apisContainer from './app/network/restApis/apisContainer'
import bookingContainer from './app/booking/booking.container'
import ratesCleverContainer from './app/ratesClever/ratesClever.container'
import categoryContainer from './app/category/category.container'
import ownersContainer from './app/owners/owners.container'
import userContainer from './app/user/user.container'
import roomAccessContainer from './app/roomAccess/roomAccess.container'
import reservationContainer from './app/reservation/reservation.container'
import paymentMembershipContainer from './app/paymentMembership/paymentMembershipContainer'
import infoAccessRoomContainer from './app/infoAccessRoom/infoAccessRoom.container'
import balanceContainer from './app/balance/balance.container'
import guestsContainer from './app/guests/guests.container'
import beneficiaryContainer from './app/beneficiaries/beneficiaries.container'
import benefitsContainer from './app/benefits/benefits.container'
import layoutContainer from './app/layout/layout.container'
import bookingsContainer from './app/bookings/bookings.container'
import bookingBenefitContainer from './app/bookingBenefits/bookingBenefit.container'
import pageContainer from './app/page/page.container'
import dashboardContainer from './app/dashboard/dashboard.container'
import contactContainer from './app/contact/contact.container'
import emailContainer from './app/email/email.container'
import offerContainer from './app/offer/offer.container'
import notificationsContainer from './app/notifications/notifications.container'
import bookingPaymentContainer from './app/bookingpayment/bookingPaymentContainer'
import CreateRmFolioContainer from './app/reservation/CreateRmFolio.container'
import productAccessContainer from './app/productAccess/productAccess.container'
import buildSearchContainer from './app/buildSearch/buildSearch.container'
import rulesContainer from './app/rules/rules.container'
import cancelationsContainer from './app/cancelations/cancelations.container'
import countryContainer from 'app/country/country.container'
import companionContainer from 'app/companion/companion.container'
import contractByPromotionContainer from 'app/contractByPromotion/contractByPromotion.container'
import payLinkContainer from 'app/paylink/paylink.container'
import provisionContainer from "app/provisions/provision.container";
import termiAndConditionsContainer from './app/termsAndCoditions/termiAndConditions.container'
import modalAndContentContainer from './app/modals/modalAndContent.container'
const container = new Container()

container.load(
  ...[
    infoAccessRoomContainer,
    payLinkContainer,
    benefitsContainer,
    bookingsContainer,
    apisContainer,
    roomAccessContainer,
    jsonServerContainer,
    propertyContainer,
    paymentContainer,
    contractContainer,
    calendarContainer,
    bookingContainer,
    ratesCleverContainer,
    axiosServerContainer,
    categoryContainer,
    ownersContainer,
    userContainer,
    reservationContainer,
    balanceContainer,
    beneficiaryContainer,
    paymentMembershipContainer,
    guestsContainer,
    layoutContainer,
    pageContainer,
    bookingBenefitContainer,
    countryContainer,
    contactContainer,
    companionContainer,
    offerContainer,
    bookingPaymentContainer,
    productAccessContainer,
    emailContainer,
    notificationsContainer,
    buildSearchContainer,
    dashboardContainer,
    contractByPromotionContainer,
    CreateRmFolioContainer,
    rulesContainer,
    cancelationsContainer,
    provisionContainer,
    termiAndConditionsContainer,
    modalAndContentContainer
  ]
)

const {lazyInject} = getDecorators(container)
export {lazyInject, container}
