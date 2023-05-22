import {ContainerModule, interfaces} from 'inversify'
import createRmFolio from 'app/common/types/createRmFolio'
import {CreateReservation} from 'app/reservation/application/CreateReservation'
import {RoomAccessMapper} from 'app/filldatareservation/domain/mappers/roomAccessMapper'
import {userMemberMapper} from 'app/filldatareservation/domain/mappers/userMemberMapper'
import {CreateReservationRateCodes} from 'app/reservation/application/CreateReservationRateCodes'
import {PromotionMapper} from 'app/filldatareservation/domain/mappers/promotionMapper'
import {PromotionListMapper} from 'app/filldatareservation/domain/mappers/promotionListMapper'
import {GetReservationRate} from 'app/reservation/application/GetReservationRate'

export default new ContainerModule((bind: interfaces.Bind) => {
  /* bind<CreateRmFolio>(createRmFolio.createRmFolioRepository).to(
    CreateRmFolio
  ); */

  bind<CreateReservation>(createRmFolio.createReservation).to(CreateReservation)
  bind<RoomAccessMapper>(createRmFolio.roomAccesMapper).to(RoomAccessMapper)
  bind<userMemberMapper>(createRmFolio.userMemberMapper).to(userMemberMapper)
  bind<PromotionMapper>(createRmFolio.promotionMapper).to(PromotionMapper)
  bind<CreateReservationRateCodes>(createRmFolio.createReservationRateCodes).to(
    CreateReservationRateCodes
  )
  bind<GetReservationRate>(createRmFolio.getReservationRate).to(
    GetReservationRate
  )
  bind<PromotionListMapper>(createRmFolio.promotionListMapper).to(PromotionListMapper)
})
