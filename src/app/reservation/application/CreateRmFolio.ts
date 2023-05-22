/* eslint-disable */
import {RoomFolio} from 'app/filldatareservation/domain/roomFolio'
import {
  AppReservationMember,
  Context,
  FillDataReservations
} from 'app/filldatareservation/legacyBin/fillDataReservations'
import {InfoUserMember} from 'app/filldatareservation/domain/infoUserMember'

export class CreateRmFolio {
  private readonly result: RoomFolio | undefined

  constructor(
    context: Context,
    _Combinations: any[], // Vienen datos por defecto, se cambian al momento de cambiar una provision
    _MultiSelectedProvision: any[], // ['', '', '', '']
    selectedRoomRefundable: boolean,
    __PromoExchangeFreeselected: any[],
    __PromoExchangeFree: any,
    _PreferentialRates: any, // Pendiente
    _IsMultiCategoryEngine: boolean, // HABITACION TIENE MAS DE UNA HABITACION
    // eslint-disable-next-line camelcase
    WCtrlSetMember_InfoUserMember: InfoUserMember,
    _Extensions: any, // Propiedad de reservation - Se inicializa como array de objetos vacios, info cargos adcionales de la reserva
    _CurrentRoomTypeInfo: any[],
    _PaxExtraIndexedReservation: any,
    _PaxIndexedReservation: any,
    IsRewards: boolean,
    _ReservationsRateCodes: any,
    __RsvPromotionTargetType: any,
    __PromotionCurrent: any,
    _TemporalBenefitSelected: any,
    _reservationReferralsPromotion: any,
    __APPLYFREENIGHTSPROMOTION: boolean,
    __PromotionCatalogActivesSelected: any,
    _reservationExchangesPromotion: any[],
    _FamilyProvs: any,
    ProvsId: any,
    _PresidentialPrice: any,
    AppReservationMembers: AppReservationMember,
    _MarketsAfiliation: any,
    _IsBenefitRef: any,
    reservationCostType: any,
    _RateForSecondFamilyRoom: any,
    _currentRateInfo: any,
    profile: any,
    _MemberPromotionsEngine: any,
    _ListPromotionAccessRoomSelected: any,
    isBenefitRef: boolean = false,
    promotions: any = [],
    benefitsSelecteds: any = []
  ) {
    this.result = FillDataReservations(
      context,
      _Combinations, // ✅
      _MultiSelectedProvision, // ✅ De momento se pasará array vacio
      selectedRoomRefundable, // ✅ El cliente va a comparar si el string dice refundable roomSelected.selectedRefundRate
      __PromoExchangeFreeselected, // ✅ Se enviara array de objetos vacios llamada a createReservation
      __PromoExchangeFree, // ✅ Para preferencia se envia objeto vacio
      _PreferentialRates, // ✅ TODO: QUEDA PENDIENTE (ANGEL)
      _IsMultiCategoryEngine, // ✅ Se envia false para preferencial
      WCtrlSetMember_InfoUserMember, // ✅ Se envia al usuario en sesion
      _Extensions, // ✅ Los esta checando Juan
      _CurrentRoomTypeInfo, // ✅ Default: [false, false, false, false]
      _PaxExtraIndexedReservation, // ✅ PaxIndexedReservation.mock
      _PaxIndexedReservation, // ✅ PaxIndexedReservation.mock
      IsRewards, // ✅ Se envia false para preferencial
      _ReservationsRateCodes, // ✅ Estructura de datos Referencia: reservationRateCode.mock
      __RsvPromotionTargetType, // ✅ Caso preferencial mandar 'exchange'
      __PromotionCurrent, // ✅ Catalogo de promociones por habitacion - Siempre tiene datos: Referencia promotionCurrent.mock
      _TemporalBenefitSelected, // ✅ Solo aplica para cuando tenemos beneficios seleccionados
      _reservationReferralsPromotion, // ✅ Para este momento se envia array de nulls: - Catalogo [null, null, null, null]
      __APPLYFREENIGHTSPROMOTION, // ✅ Variable que manipula createReservation solo aplica para cuando tiene noches gratis o tiene dicha promocion
      __PromotionCatalogActivesSelected, // ✅ Array de promociones activas y seleccionadas por el momento se envia array de arrays vacios
      _reservationExchangesPromotion, // ✅ Por el moento se envia array de arrays vacios
      _FamilyProvs, // ✅ Catalogo de claves para proviciones familiares - Referencia: FamilyProvs.mock
      ProvsId, // ✅ Objeto que manipula create reservation: {Origin: '', ToChange: ''}
      _PresidentialPrice, // ✅ Precio de la presidencial si aplica si no enviar array vacio
      AppReservationMembers, // ✅ Clase que debemos de crear con la info del usuario en sesion este mismo debe tener meta data que se debe consultar de alguna fuente: [IsNational, RateType, ReservationCostType]
      _MarketsAfiliation, // ✅ La funcion nececita esta estructura a fuerzas!! son los mercados del afiliado Ref: MarketAffiliation.mock
      _IsBenefitRef, // ✅ Create reservation manipula este dato : se manda falso por defecto
      reservationCostType, // ✅ Se obtiene de la affiliation V - Variable, MPG
      _RateForSecondFamilyRoom, // ✅ Create reservation manipula este dato: se envia null en ocaciones
      _currentRateInfo, // ✅ El cliente determina el valor de esta variable por el momento se envia: [Array(0), false, false, false]
      profile, // ✅ Main guest de la habitacion - Ref: Profile.mock
      _MemberPromotionsEngine, // ✅ Array de promociones por tipo de reservacion del afiliado: Ref: MemberPromotionEngine.mock
      _ListPromotionAccessRoomSelected, // ✅ Lista de promociones aplicables por habitacion - inicialmente empiza como [Array(0), Array(0), Array(0), Array(0)]
      isBenefitRef, // ✅ Dato que manipula createReservation
      promotions,
      benefitsSelecteds
    )
  }

  public run() {
    return this.result
  }
}
