/* eslint-disable */
import moment from 'moment'
import {RoomFolio} from '../domain/roomFolio'
import {RoomAccess} from '../domain/roomAccess/roomAccess'
import {InfoUserMember} from '../domain/infoUserMember'
import {ImperialsModeReservation} from './ImperialModeReservation'
import {ProvisionsModeReservation} from './provisionModeReservation'
import {GetModeReservation} from './getModeReservation'
import {GetAgency} from './getAgency'
import {GetRoomType} from './GetRoomType'
import {GetSelectedRoomData} from './GetSelectedRoomData'
import {BonusModeReservation} from './BonusModeReservation'
import {getRewFullPax} from './getRewFullPax'
import {GetTotalPax} from './getTotalPax'
import {EvalRefundableRsvPromotionExchange} from './evalRefundableRsvPromotionExchange'
import {getPaxForReservation} from './getPaxForReservation'
import {RsvFreeModeReservation} from './RsvFreeModeReservation'
import {AssignMarket} from './AssignMarket'
import {SetRatesRmFolioRC} from './SetRatesRmFolioRC'
import {GetTypeRateByHotelCategory} from './GetTypeRateByHotelCategory'
import {GetTotalPaxIndexed} from './GetTotalPaxIndexed'
import {GenerateTemporalBenefitsRequest} from './GenerateTemporalBenefitsRequest'
import {GenerateListPromotionSelectedToSave} from './GenerateListPromotionSelectedToSave'
import {ReservationTypes} from 'app/filldatareservation/domain/reservationTypes'

export interface AppReservationMember {
  IsNational: boolean
  MemberExtension: () => {
    ReservationCostType: any
    rate_Type: any
  }
}

export interface Context {
  Deposit?: number
  OriginalRmtype?: any
  Index: number
  IsFamily: boolean
  IsPresidential: boolean
  rm_type: string // SUP | SP1 | SUP-OV - Codigo de la habitacion
  IsLockOff: boolean
  IsVilla: boolean
  Refundable: boolean
  ModeReservation: string // TIPO DE RESERVACION EN STRING - PREFERENCIAL | REFERIDOS
  CustomReservation: string // Valor que el script de BookingRateCode.js modifica
  TxtFirstName: string //
  Hotel: string // Codigo de hotel BP | TMP
  TxtLastName: string
  DdlstTypeResevation: string // R - Siempre, lo determina el back - costo de la reserva vs pago
  DdlstStatusReservation: string // String vacío o R xd
  DdlstGuestCd: string // Color de la pulsera Nivel de membrecía - Titular - Al seleccionar se ejecuta @ChangeTypeGuest
  TxtEMail: string
  Folio: number // Solo si tiene provision se usa.
  Share: string // Servia para provisioners - Nombre provision F: {Folio de la provision}, - Preguntar a luis nieto
  _CurrentSuiteMultiCategory: string // Presidencial, Villas y familiares - Es una reserva de multiples partes - PENDIENTES
  __currentProvision: any[] // Catalogo con proviciones que puede tener el afiliado consultar CurrentProvicion.mock
  _Reservation: any[] // Dato que modifica bookingRateCode.js es un array
  FolioOpera: number
  TxtReference: string // Dato que se obtiene de un input tiene que ver con el nivel de afiliacion al parecer: M
  RoomAccess: RoomAccess[] // Accessos que tiene el afiliado a cuartos
  _RoomTypesRelated: any[] // ARRAU DE Cuartos relacionados | Presidencial | Villas
  adults: number
  childs: number
  Rel_folio: number // Folios relacionados otras habitaciones
  ArrivalDateStr: any // Fecha de checkin
  Nights: any // Noches que se planean pasar en base a la reservacion
  DepartureDateStr: any // Fecha de checkout
  Year: any
  Week: any // Semana del año en la que nos encontramos
  Company: any // Company del afiliado
  Application: any // Numero de afiliacion
  Member: any // // Numero de afiliacion
  Address: any
  Country: any
  State: any
  City: any
  Zip: any
  Phone: any
  Nationality: any
  /**
   * @description Passport id
   */
  Id: any
  /**
   * @description TxtFederalId
   */
  co_id: any
  Lang: any // E
  /**
   * @description TxtRmCompany
   */
  RmCompany: any
  OmitCheckPaxFree: any // Se manipula por bookingRateCode.js
  OmitModeReservation: any // Se manipula por bookingRateCode.js
  Rate: any // Costo de la reservacion [lo que conocemos como rateCode en nuestro sistema]
  Credit_lmt: any // SE OBTIENE DEL USUARIO
  Lmt_date: any // Cargos adicionales se asignan en base a createReservation
  Chg_cd1: any // Cargos adicionales se asignan en base a createReservation
  Chg_amt1: any // Cargos adicionales se asignan en base a createReservation
  Pay_cd1: any // Cargos adicionales se asignan en base a createReservation
  Pay_amt1: any // Cargos adicionales se asignan en base a createReservation
  Chg_cd2: any // Cargos adicionales se asignan en base a createReservation
  Chg_amt2: any // Cargos adicionales se asignan en base a createReservation
  Pay_cd2: any // Cargos adicionales se asignan en base a createReservation
  Pay_amt2: any // Cargos adicionales se asignan en base a createReservation
  Chg_cd3: any // Cargos adicionales se asignan en base a createReservation
  Chg_amt3: any // Cargos adicionales se asignan en base a createReservation
  Pay_cd3: any // Cargos adicionales se asignan en base a createReservation
  Pay_amt3: any // Cargos adicionales se asignan en base a createReservation
  points: any // Puntos del club
  MarketContractDefault: any // Mercado por defecto se carga del afiliado
  AditionalCharges: any // Cargos adicionales se generan si el afiliado selecciona alguno de acuerdo a su  tipo de reservacion y paxes
  AmountThanksGiving: any // Se puede cargar si se encuentra en esa fecha - SEMANA 52
  AmountOutOfSeason: any // Se carga en base a ciertas fechas - SEMANA 52
  _UseTemporalBenefit: any // SE MODIFICA EN BASE A CreateReservation
  _SelectedProvisions: any // SE MANDA 0 SI APLICA
  _reservationsSelected: any // RESERVACION SELECCIONADA
  marketFee: number
  selectBenefit: any
  companions: any // Acompañantes de la reserva
  eliteProductType?: any
}

// @ts-ignore
// eslint-disable-next-line camelcase
String._toFormattedString = function String$_toFormattedString(useLocale, args) {
  let result = ''
  const format = args[0]
  for (let i = 0; ; ) {
    const open = format.indexOf('{', i)
    const close = format.indexOf('}', i)
    if (open < 0 && close < 0) {
      result += format.slice(i)
      break
    }
    if (close > 0 && (close < open || open < 0)) {
      if (format.charAt(close + 1) !== '}') {
        // @ts-ignore
        throw Error.argument('format', Sys.Res.stringFormatBraceMismatch)
      }
      result += format.slice(i, close + 1)
      i = close + 2
      continue
    }
    result += format.slice(i, open)
    i = open + 1
    if (format.charAt(i) === '{') {
      result += '{'
      i++
      continue
    }
    // @ts-ignore
    if (close < 0) throw Error.argument('format', Sys.Res.stringFormatBraceMismatch)
    const brace = format.substring(i, close)
    const colonIndex = brace.indexOf(':')
    const argNumber = parseInt(colonIndex < 0 ? brace : brace.substring(0, colonIndex), 10) + 1
    // @ts-ignore
    if (isNaN(argNumber)) throw Error.argument('format', Sys.Res.stringFormatInvalid)
    const argFormat = colonIndex < 0 ? '' : brace.substring(colonIndex + 1)
    let arg = args[argNumber]
    if (typeof arg === 'undefined' || arg === null) {
      arg = ''
    }
    if (arg.toFormattedString) {
      result += arg.toFormattedString(argFormat)
    } else if (useLocale && arg.localeFormat) {
      result += arg.localeFormat(argFormat)
    } else if (arg.format) {
      result += arg.format(argFormat)
    } else result += arg.toString()
    i = close + 1
  }
  return result
}

// @ts-ignore
// eslint-disable-next-line camelcase
// @ts-ignore
Function._validateParams = function Function$_validateParams(
  // @ts-ignore
  params,
  // @ts-ignore
  expectedParams,
  // @ts-ignore
  validateParameterCount
) {
  let e
  const expectedLength = expectedParams.length
  validateParameterCount = validateParameterCount || typeof validateParameterCount === 'undefined'
  // @ts-ignore
  // e = Function._validateParameterCount(params, expectedParams, validateParameterCount);
  if (e) {
    // e.popStackFrame();
    return e
  }
  for (let i = 0, l = params.length; i < l; i++) {
    const expectedParam = expectedParams[Math.min(i, expectedLength - 1)]
    let paramName = expectedParam.name
    if (expectedParam.parameterArray) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      paramName += '[' + (i - expectedLength + 1) + ']'
    } else if (!validateParameterCount && i >= expectedLength) {
      break
    }
    // @ts-ignore
    // e = Function._validateParameter(params[i], expectedParam, paramName);
    if (e) {
      // e.popStackFrame();
      return e
    }
  }
  return null
}

// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
String.format = function String$format(format, args) {
  // @ts-ignore
  const e = Function._validateParams(arguments, [
    {name: 'format', type: String},
    {name: 'args', mayBeNull: true, parameterArray: true}
  ])
  if (e) throw e
  // @ts-ignore
  return String._toFormattedString(false, arguments)
}

export function FillDataReservations(
  Context: Context,
  _Combinations: any[], // Vienen datos por defecto, se cambian al momento de cambiar una provision
  _MultiSelectedProvision: any[],
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
  /**
   * @description Info del usuario logeado
   * */
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
  promotions?: any,
  benefitsSelecteds?: any
) {
  const reserva = new RoomFolio()

  try {
    const index = Context.Index
    const IsFamily = Context.IsFamily
    const IsPresidential = Context.IsPresidential
    // _MultiSelectedProvision[index - 1]
    // var ProvisionId = ImperialsModeReservation()? _Combinations[index - 1].ProvisionToChange:_SelectedProvision != undefined? _SelectedProvision:"";

    const isImperialReservation = ImperialsModeReservation(
      Context.rm_type,
      Context.ModeReservation,
      _IsMultiCategoryEngine,
      Context.CustomReservation
    )

    const isRsvFreeModeReservation = RsvFreeModeReservation(
      Context.rm_type,
      Context.ModeReservation,
      _IsMultiCategoryEngine,
      Context.CustomReservation,
      __RsvPromotionTargetType
    )

    const ProvisionId = isImperialReservation
      ? _Combinations[index - 1].ProvisionToChange
      : _MultiSelectedProvision[index - 1] != undefined &&
        _MultiSelectedProvision[index - 1].TYPE != undefined &&
        _MultiSelectedProvision[index - 1].TYPE != ''
      ? _MultiSelectedProvision[index - 1].TYPE
      : ''

    const IsLockOffRoom = Context.IsLockOff != undefined ? Context.IsLockOff : false

    const IsVilla = Context.IsVilla != undefined ? Context.IsVilla : false
    // var CurselectedRoom = _IsMultiCategoryEngine ? Context.rm_type : selectedRoom;
    const CurselectedRoom = Context.rm_type
    const CurSelectedRoomRefundable =
      Context.Refundable != undefined ? Context.Refundable : selectedRoomRefundable
    // ID promocion de reservas
    // var RsvPromotionId = (__PromoExchangeFreeselected[index - 1].Recnum != null && __PromoExchangeFreeselected[index - 1].Recnum != undefined && __PromoExchangeFreeselected[index - 1].Recnum  > 0) ? __PromoExchangeFreeselected[index - 1].Recnum : 0;
    // Presidenciales index 0
    const CurrentPromoExchangeFreeselected =
      __PromoExchangeFreeselected[IsPresidential ? 0 : index - 1]
    const RsvPromotionId =
      CurrentPromoExchangeFreeselected.Recnum != null &&
      CurrentPromoExchangeFreeselected.Recnum != undefined &&
      CurrentPromoExchangeFreeselected.Recnum > 0
        ? CurrentPromoExchangeFreeselected.Recnum
        : 0
    reserva.Recnum = 0
    // reserva.Folio = GetFolio();

    const isBonusReservation = BonusModeReservation(
      Context.rm_type,
      Context.ModeReservation,
      _IsMultiCategoryEngine,
      Context.CustomReservation
    )

    const isProvisionModeReservation = ProvisionsModeReservation(
      Context.rm_type,
      Context.ModeReservation,
      _IsMultiCategoryEngine,
      Context.CustomReservation
    )

    const reservationType = GetModeReservation(
      CurselectedRoom,
      Context.ModeReservation,
      _IsMultiCategoryEngine,
      Context.CustomReservation
    )

    const IsRewards = reservationType == '8'

    reserva.Folio =
      index == 2 &&
      (IsFamily || IsPresidential) &&
      !isProvisionModeReservation &&
      !isImperialReservation
        ? 0
        : !_PreferentialRates.IsActive[index - 1] ||
          reservationType == ReservationTypes.INCENTIVA ||
          reservationType == ReservationTypes.ANIVERSARIO ||
          isImperialReservation
        ? Context.Folio
        : 0
    reserva.Hotel = Context.Hotel
    reserva.Last_name = Context.TxtLastName
    reserva.First_name = Context.TxtFirstName
    reserva.Share =
      !_PreferentialRates.IsActive[index == 2 && (IsFamily || IsPresidential) ? 0 : index - 1] ||
      reservationType == ReservationTypes.INCENTIVA ||
      reservationType == ReservationTypes.ANIVERSARIO
        ? Context.Share
        : ''
    reserva.Type = Context.DdlstTypeResevation
    reserva.Status = Context.DdlstStatusReservation
    reserva.Guest_cd = Context.DdlstGuestCd
    reserva.Mail_name = Context.TxtEMail
    reserva.Group_cd = ''
    reserva.Group_desc = ''
    // [jaigonzalez] 30/01/2018
    // [efdiaz] 07/05/2020 Se verifica Refundable para promocion de reservaciones
    reserva.Refundable = EvalRefundableRsvPromotionExchange(
      Context.Refundable,
      RsvPromotionId,
      __RsvPromotionTargetType,
      __APPLYFREENIGHTSPROMOTION,
      __PromoExchangeFree,
      __PromotionCatalogActivesSelected
    )
    // reserva.Refundable = EvalRefundableRsvPromotionExchange(selectedRoomRefundable, RsvPromotionId);
    // reserva.Refundable=selectedRoomRefundable;

    const agency = GetAgency(
      Context.Index,
      Context.rm_type,
      Context.ModeReservation,
      _IsMultiCategoryEngine,
      WCtrlSetMember_InfoUserMember,
      Context._CurrentSuiteMultiCategory,
      Context.CustomReservation,
      Context.__currentProvision,
      Context._Reservation
    )

    if (!_PreferentialRates.IsActive[index == 2 && IsFamily ? 0 : index - 1]) {
      if (WCtrlSetMember_InfoUserMember.UserMember.Isnational) {
        reserva.Agency_cd = index == 2 && (IsFamily || IsPresidential) ? 'M/PR-ELI' : agency
      } else {
        reserva.Agency_cd = index == 2 && (IsFamily || IsPresidential) ? 'PR-ELITE' : agency
      }
    } else {
      reserva.Agency_cd =
        index == 2 && (IsFamily || IsPresidential) && !isImperialReservation
          ? WCtrlSetMember_InfoUserMember.UserMember.Isnational
            ? 'M/PR-ELI'
            : 'PR-ELITE'
          : agency
    }
    if (_IsMultiCategoryEngine) {
      reserva.Agency_cd = agency
    }

    reserva.Agency_name = ''

    reserva.Agency_resv = index == 2 && (IsFamily || IsPresidential) ? 0 : Context.FolioOpera // PUEDE ESTAR VACIO
    reserva.Ref = Context.TxtReference

    reserva.Rm_type =
      index == 2 && (IsFamily || IsPresidential)
        ? _CurrentRoomTypeInfo[0].Category.RmtypeRelated
        : GetRoomType(
            index,
            Context.RoomAccess,
            Context.rm_type,
            _IsMultiCategoryEngine,
            Context._RoomTypesRelated // TODO para preguntar
          )

    /*if (IsLockOffRoom) {
      reserva.Rm_type = GetSelectedRoomData(Context.RoomAccess, Context.rm_type).OriginalCode
    }*/

    // reserva.Bed = index == 2 && (IsFamily || IsPresidential) ? 'D' : GetBedType(Context);
    // reserva.Bed = index == 2 && (IsFamily) ? 'D' : GetBedType(Context);
    reserva.Bed = 'K'
    reserva.Rooms = 1

    /* var AdultTmp = index == 2 && IsFamily ? 0 : GetAdults();
    var KidTmp = index == 2 && IsFamily ? 0 : GetKids();
    var ChildTmp = index == 2 && IsFamily ? 0 : GetChilds(); */
    // Para cuando es Rewards
    // Uso con multicategoria
    // Ahora se usa la distribucion que se tienen con las tarifas.
    if (_IsMultiCategoryEngine) {
      // var MultiPax = _OriginalPaxIndexedReservation[reserva.Rm_type];
      // [efdiaz] 03/09/2020 - Si es BONO o IMPERIALES se toma configuacion de PAX EXTRA
      const MultiPax =
        isBonusReservation || isImperialReservation
          ? _PaxExtraIndexedReservation[reserva.Rm_type]
          : _PaxIndexedReservation[reserva.Rm_type]

      reserva.Adult = MultiPax.Adults
      reserva.Kid = MultiPax.Kids
      reserva.Child = MultiPax.Childs
      reserva.Baby = MultiPax.Babys
      // --Extra's
      reserva.Xtra_adu = MultiPax.Xtra_adu
      reserva.Xtra_chd = MultiPax.Xtra_chd
      reserva.Xtra_kid = MultiPax.Xtra_kid
      /*
      var PresidentialPax = getPaxForPresidential(index==1?true:false);
      reserva.Adult = PresidentialPax.Adults;
      reserva.Kid  =  PresidentialPax.Childs;
      reserva.Child = PresidentialPax.Kids;
      reserva.Baby  = PresidentialPax.Babys;
      //--
      reserva.Xtra_adu = PresidentialPax.Xtra_adu;
      reserva.Xtra_chd = PresidentialPax.Xtra_chd;
      reserva.Xtra_kid = PresidentialPax.Xtra_kid;
      */
    } else if (IsRewards) {
      // Si es rewards o aniversario sacamos los pax extras.
      const RewardsPax = getRewFullPax(Context.adults, Context.childs)
      reserva.Adult = RewardsPax.adults
      reserva.Baby = RewardsPax.infants
      // --PAX EXTRA
      reserva.Xtra_adu = RewardsPax.xtra_adu
      reserva.Xtra_chd = RewardsPax.xtra_chd
      reserva.Xtra_kid = RewardsPax.xtra_kid
    } else {
      /*
      reserva.Adult = _PreferentialRates.IsActive[index-1] ? (index == 2 && IsFamily ? 0 : AdultTmp ) : (index == 2 && IsFamily ? 0 : (AdultTmp > 2 ? 2 : AdultTmp));
      reserva.Kid  =  _PreferentialRates.IsActive[index-1] ? (index == 2 && IsFamily ? 0 : KidTmp)    : (index == 2 && IsFamily ? 0 : (AdultTmp>=2? 0:KidTmp));
      reserva.Child = _PreferentialRates.IsActive[index-1] ? (index == 2 && IsFamily ? 0 : ChildTmp ) : (index == 2 && IsFamily ? 0 : (AdultTmp>=2? 0:ChildTmp));
      reserva.Baby  = index == 2 && IsFamily ? 0: GetBabys(index);
      //--
      reserva.Xtra_adu = _PreferentialRates.IsActive[index-1] ? 0 : AdultTmp> 2 ? (AdultTmp-2): 0;//0;
      reserva.Xtra_chd = _PreferentialRates.IsActive[index-1] ? 0 : AdultTmp>=2 ? ChildTmp:0;
      reserva.Xtra_kid = _PreferentialRates.IsActive[index-1] ? 0 : AdultTmp>=2 ? KidTmp:0;
      */
      // [efdiaz] 29/08/2019
      // Implement a funcion to Get All Pax Distribuition

      const CommonPax = getPaxForReservation(
        {
          IsFamily,
          ProvisionId,
          Index: index,
          RoomCode: reserva.Rm_type,
          Babys: 0,
          Kids: 0,
          Childs: Context.childs,
          Adults: Context.adults,
          totalPax: Context.adults + Context.childs,
          roomCode: Context.rm_type,
          OmitCheckPaxFree: Context.OmitCheckPaxFree,
          OmitModeReservation: Context.OmitModeReservation
        },
        __PromoExchangeFreeselected,
        isImperialReservation,
        isBonusReservation,
        isRsvFreeModeReservation,
        _FamilyProvs,
        ProvsId,
        _reservationExchangesPromotion
      )

      reserva.Adult = CommonPax.Adults
      reserva.Kid = CommonPax.Kids
      reserva.Child = CommonPax.Childs
      reserva.Baby = CommonPax.Babys
      // --
      reserva.Xtra_adu = CommonPax.Xtra_adu
      reserva.Xtra_chd = CommonPax.Xtra_chd
      reserva.Xtra_kid = CommonPax.Xtra_kid
    }

    reserva.Rel_folio = Context.Rel_folio
    reserva.Arv_date = Context.ArrivalDateStr
    reserva.Nights = Context.Nights
    reserva.Depart_dt = Context.DepartureDateStr
    reserva.Year = Context.Year
    reserva.Week = Context.Week
    reserva.Co = Context.Company
    reserva.Member = Context.Member
    reserva.Vouch = ''
    // Configuracion de pax extra
    // if(IsRewards || (GetModeReservation()==9 && index==1)){
    /*
    if(IsRewards){
    reserva.Xtra_adu = RewardsPax.xtra_adu;
    reserva.Xtra_chd = RewardsPax.xtra_chd;
    reserva.Xtra_kid = RewardsPax.xtra_kid;
  }
  else{
    reserva.Xtra_adu = _PreferentialRates.IsActive[index-1] ? 0 : AdultTmp> 2 ? (AdultTmp-2): 0;//0;
    reserva.Xtra_chd = _PreferentialRates.IsActive[index-1] ? 0 : AdultTmp>=2 ? ChildTmp:0;
    reserva.Xtra_kid = _PreferentialRates.IsActive[index-1] ? 0 : AdultTmp>=2 ? KidTmp:0;
  }
  */
    reserva.Xtra_ctk = ''
    // Se verifica la combinacion para obtener la categoria
    // Se verifica segunda parte de presidencial en bono como preferencial
    // Se elimina restriccion de la bono, no idea de donde salio
    /*reserva.ContractCategoryId = isImperialReservation
      ? _Combinations[index - 1].TypeProvision == 'W'
        ? 4
        : 3
      : reservationType*/

    reserva.ContractCategoryId = reservationType
    // reserva.Deposit = $('#TxtDeposit').val();
    let amountTransportation = 0
    if (promotions) {
      promotions.forEach((element: any) => {
        if (element.AdditionalBenefitSelected) {
          element.AdditionalBenefitSelected.forEach((elementAdditional: any) => {
            amountTransportation + elementAdditional.amount
          })
        }
      })
    }

    reserva.Deposit = Context.Deposit! + amountTransportation

    // [efdiaz] Dependiendo de la categoria se va por la tarifa correspondiente
    let depositRoom = ''
    if (isProvisionModeReservation) {
      // depositRoom = selectedRoom + (selectedRoomRefundable?"":"_NR") + _SelectedProvision;
      depositRoom = CurselectedRoom + (CurSelectedRoomRefundable ? '' : '_NR') + ProvisionId
    } else {
      depositRoom = CurSelectedRoomRefundable ? CurselectedRoom : CurselectedRoom + '_NR'
    }

    if (index == 2 && IsFamily) {
      reserva.Deposit = 0
      reserva.Rate = 0
      // Si es Index 2 y Familiar la categoria es preferencial
      reserva.ContractCategoryId = 2
    } else {
      // [jaigonzalez] se valida si es refundable o no para ir la tarifa correspondiente

      // Si es reservación referida, se le debe agregar el referal fee al deposit
      /**
       * DEPOSIT
       */
      if (reservationType == ReservationTypes.REFERIDOS) {
        if (_IsMultiCategoryEngine) {
          // TODO:
          // reserva.Deposit = GetNumberWithoutCharacters($(String.format('#TxtDeposit{0}', depositRoom)).val()) + GetNumberWithoutCharacters($(String.format("#txtMarketFee{0}", depositRoom)).val());
        } else {
          reserva.Deposit = Context.Deposit! + Context.marketFee
          // reserva.Deposit = GetNumberWithoutCharacters($(String.format('#TxtDeposit{0}', index == 2 && IsPresidential ? _PresidentialPrice[depositRoom].RmtypeRelated : depositRoom)).val()) + GetNumberWithoutCharacters($(String.format("#txtMarketFee{0}", depositRoom)).val());
        }
      } else if (reservationType === ReservationTypes.BONO) {
        reserva.Deposit = Context.Rate + Context.Chg_amt3 + Context.Deposit
      }
      // Incentiva - Aniversario
      else if (isProvisionModeReservation) {
        reserva.Deposit = Context.Deposit!
      } else if (_IsMultiCategoryEngine) {
        /**
         * END DEPOSIT
         */
        // reserva.Deposit = GetNumberWithoutCharacters($(String.format('#TxtDeposit{0}', depositRoom)).val());
      } else {
        reserva.Deposit = Context.Deposit!
        // reserva.Deposit = GetNumberWithoutCharacters($(String.format('#TxtDeposit{0}', index == 2 && IsPresidential ? _PresidentialPrice[depositRoom].RmtypeRelated : depositRoom)).val());
      }

      if (_IsMultiCategoryEngine) {
        reserva.Rate = Context.Rate
      } else {
        reserva.Rate =
          index == 2 && IsPresidential
            ? _PresidentialPrice[depositRoom].RmtypeRelated
            : Context.Rate
      }
    }

    reserva.Rate_1 = reserva.Rate
    reserva.Rate1_from = reserva.Arv_date
    reserva.Rate1_to = reserva.Depart_dt
    reserva.Lmt_date = Context.Lmt_date
    reserva.Credit_lmt = Context.Credit_lmt

    // direccion del socio
    reserva.Address = Context.Address
    reserva.Country = Context.Country
    reserva.State = Context.State
    reserva.City = Context.City
    reserva.Zip = Context.Zip
    reserva.Phone = Context.Phone
    reserva.Nationality = Context.Nationality
    reserva.Id = Context.Id
    reserva.co_id = Context.co_id
    reserva.Lang = Context.Lang
    /// informacion del agente

    reserva.Co_address = ''
    reserva.Co_addr2 = ''
    reserva.Co_City = ''
    reserva.Co_country = ''
    reserva.Co_State = ''
    reserva.Co_country = ''
    reserva.Co_dedcomm = ''
    reserva.Co_comm = 0

    reserva.Club_stat = AppReservationMembers.IsNational ? '' : 'R'
    /// cargo por semana 52
    /**
     * @description PARA SEMANA 52 agregar cargo
     */
    reserva.Chg_cd1 = index == 2 && IsFamily ? 0 : Context.Chg_cd1
    reserva.Chg_amt1 = index == 2 && IsFamily ? 0 : Context.Chg_amt1
    reserva.Pay_cd1 = index == 2 && IsFamily ? 0 : Context.Pay_cd1
    reserva.Pay_amt1 = index == 2 && IsFamily ? 0 : Context.Pay_amt1
    reserva.Chg_cd2 = index == 2 && IsFamily ? 0 : Context.Chg_cd2
    // cargo acceso a lbc
    reserva.Chg_amt2 = index == 2 && IsFamily ? 0 : Context.Chg_amt2
    reserva.Pay_cd2 = index == 2 && IsFamily ? 0 : Context.Pay_cd2
    reserva.Pay_amt2 = index == 2 && IsFamily ? 0 : Context.Pay_amt2
    reserva.Chg_cd3 = index == 2 && IsFamily ? 0 : Context.Chg_cd3
    /// //cargos adicionales o upgrade habitaciones
    reserva.Chg_amt3 = index == 2 && IsFamily ? 0 : Context.Chg_amt3
    reserva.Pay_cd3 = index == 2 && IsFamily ? 0 : Context.Pay_cd3
    reserva.Pay_amt3 = index == 2 && IsFamily ? 0 : Context.Pay_amt3

    reserva.points = Context.points /// /ObtenerNumero($('#TxtClubPoints').val());
    // Se agrega is rewards ""

    const assignedMarket = AssignMarket(_MarketsAfiliation, Context.MarketContractDefault)

    reserva.Mkt_seg = _PreferentialRates.IsActive[index - 1]
      ? ''
      : index == 2 && IsFamily
      ? ''
      : IsRewards
      ? ''
      : assignedMarket
    // reserva.RateType =  _PreferentialRates.IsActive[index-1] ? "" : (index == 2 && IsFamily ? "" : _ReservationCostType);
    reserva.RateType = ''
    if (index == 2 && IsFamily) {
      // Si es family parte 2 se crea el detallado en vacio y 0
      SetRatesRmFolioRC({
        Index: Context.Index,
        Rm_type: reserva.Rm_type,
        isProvisionalReservation: isProvisionModeReservation,
        Nights: Context.Nights,
        market: Context.MarketContractDefault,
        ArvDate: Context.ArrivalDateStr,
        selectedRoomRefundable: Context.Refundable,
        Isnational: AppReservationMembers.IsNational,
        selectedRoom: Context.rm_type,
        _MultiSelectedProvision,
        _ReservationsRateCodes,
        _RateForSecondFamilyRoom,
        _currentRateInfo,
        ReservationCostType: reservationCostType,

        callback: (CodeRatesArrayTem: any) => {
          _currentRateInfo[1] = CodeRatesArrayTem
        }
      })
      // reserva.RateCodeDetails = _ReservationsRateCodes[selectedRoomRefundable?selectedRoom:selectedRoom+"_NR"][Context.Index-1]
      // reserva.RateCodeDetails = _ReservationsRateCodes[depositRoom][Context.Index-1]
      reserva.RateCodeDetails = _ReservationsRateCodes[depositRoom][0]
      // reserva.Contract = reserva.RateCodeDetails[0].RateCode;
      reserva.Contract = reserva.RateCodeDetails[0].RateCodeCLV
    }
    // Presidenciales entra en desglose de multicategoria
    /*
      else if(index==2 && IsPresidential){
        //reserva.RateCodeDetails = _ReservationsRateCodes[_PresidentialPrice[selectedRoomRefundable?selectedRoom:selectedRoom+"_NR"].RmtypeRelated][0]
        reserva.RateCodeDetails = _ReservationsRateCodes[_PresidentialPrice[depositRoom].RmtypeRelated][0]
        //reserva.Contract = reserva.RateCodeDetails[0].RateCode;
        reserva.Contract = reserva.RateCodeDetails[0].RateCodeCLV;
        //Sobreescribimos el contractcategori si es bono
        reserva.ContractCategoryId = BonusModeReservation(reserva.Rm_type) ?__RateRoomCategoryReservation[_PresidentialPrice[depositRoom].RmtypeRelated]:reserva.ContractCategoryId;
      }
      */
    // Implementacion multicategoria
    else if (_IsMultiCategoryEngine) {
      // reserva.RateCodeDetails = _ReservationsRateCodes[CurselectedRoom][0]
      reserva.RateCodeDetails = _ReservationsRateCodes[depositRoom][0]
      reserva.Contract = reserva.RateCodeDetails[0].RateCodeCLV
    } else {
      // reserva.RateCodeDetails = _ReservationsRateCodes[selectedRoomRefundable?Context.rm_type:Context.rm_type+"_NR"][Context.Index-1];
      reserva.RateCodeDetails = _ReservationsRateCodes[depositRoom][Context.Index - 1]
      // reserva.Contract = reserva.RateCodeDetails[0].RateCode;
      reserva.Contract = reserva.RateCodeDetails[0].RateCodeCLV
    }

    /* Validacion para aniversario pack mandar mercado MERCADO|ANVWKS O ANVNIG */
    /* [efdiaz] 27/09/2019 Se agrega validaciones para igualar REQ de ICC */
    const TotalExtra = reserva.Xtra_adu + reserva.Xtra_chd + reserva.Xtra_kid
    let MarketTemp = ''
    if (TotalExtra > 0) {
      reserva.Mkt_seg = assignedMarket
      reserva.RateType = GetTypeRateByHotelCategory(
        reserva.Hotel,
        reserva.ContractCategoryId,
        AppReservationMembers.MemberExtension().rate_Type,
        AppReservationMembers.MemberExtension().ReservationCostType,
        Context.rm_type,
        '',
        ProvisionId,
        Context.RoomAccess
      )
      if (reserva.Mkt_seg.trim() == '') {
        // console.log('Publish Information $AlertMarketNotFound')
        // PublishInformation(window.$AlertMarketNotFound);
        return
      }
      if (
        reserva.ContractCategoryId == '8' ||
        (reserva.ContractCategoryId == '2' && TotalExtra > 0)
      ) {
        // @ts-ignore
        MarketTemp = String.format('{0}|RWD', reserva.Mkt_seg)
      } else {
        const category = reserva.RateCodeDetails[0].Category.includes('ANV') ? 'ANV' : ''
        // @ts-ignore
        MarketTemp =
          category.trim() != ''
            ? // @ts-ignore
              String.format('{0}|{1}', reserva.Mkt_seg, category)
            : reserva.Mkt_seg
      }
    }
    reserva.IsLookOff = Context.IsLockOff != undefined ? Context.IsLockOff : false

    if (reserva.IsLookOff) {
      _Extensions[index - 1].IsLockOff = "L1"
    }

    _Extensions[index - 1].OriginRsv = 'CLV'
    // Definimos el  objeto extension de la reserva
    _Extensions[index - 1].AditionalCharges = index == 2 && IsFamily ? 0 : Context.AditionalCharges
    _Extensions[index - 1].AmountThanksGiving =
      index == 2 && IsFamily ? 0 : Context.AmountThanksGiving
    _Extensions[index - 1].AmountOutOfSeason =
      index == 2 && IsFamily ? 0 : Context.AmountOutOfSeason
    _Extensions[index - 1].Hotel = reserva.Hotel
    _Extensions[index - 1].Folio = reserva.Folio
    _Extensions[index - 1].Company = reserva.Co
    _Extensions[index - 1].Application = reserva.Member
    //* [efdiaz] Add _Extensions Params*/
    _Extensions[index - 1].OriginRsv = 'CLV'
    // _Extensions[index-1].ProvisionToChange = _SelectedProvision != undefined? _SelectedProvision:"";
    // _Extensions[index-1].RsvCategory = GetModeReservation();
    _Extensions[index - 1].TypeBooking = 0
    // -------------------
    _Extensions[index - 1].TypeGolf = isImperialReservation
      ? _Combinations[index - 1].GolfType
      : 'AINC'
    _Extensions[index - 1].ProvisionToChange = isImperialReservation
      ? _Combinations[index - 1].ProvisionToChange
      : ProvisionId != undefined
      ? ProvisionId
      : ''
    _Extensions[index - 1].ProvisionToChangeComplement =
      _Combinations[index - 1].ProvisionToChangeComplement
    _Extensions[index - 1].TotalProvisToChange = _Combinations[index - 1].TotalProvisToChange
    _Extensions[index - 1].TotalProvisToChangeComplement =
      _Combinations[index - 1].TotalProvisToChangeComplement
    _Extensions[index - 1].TypeCombination = _Combinations[index - 1].TypeCombination
    _Extensions[index - 1].AdditionalCost = _Combinations[index - 1].AdditionalCost // guardar el costo de pax extra ej. 1350
    _Extensions[index - 1].RsvPromotion = _Combinations[index - 1].PromotionId
    _Extensions[index - 1].RsvCategory = reserva.ContractCategoryId
    // -------------------
    _Extensions[index - 1].GolfRate = isImperialReservation
      ? _Combinations[index - 1].ULGAMOUNT
      : index == 2 && IsFamily
      ? 0
      : _Extensions[index - 1].GolfRate
    _Extensions[index - 1].RecnumDiamondPromotion = 0
    _Extensions[index - 1].GolfRateType = isImperialReservation
      ? _Combinations[index - 1].GolfType
      : 0
    _Extensions[index - 1].MarketExtra = reserva.Mkt_seg
    _Extensions[index - 1].RateTypeExtra = reserva.RateType
    _Extensions[index - 1].IsTravelInsurance = false
    _Extensions[index - 1].FreeUpGrade = false
    _Extensions[index - 1].TypeBooking = 0
    // TODO: PREGUNTAR
    _Extensions[index - 1].MarketFee = reservationType == '5' ? Context.marketFee : 0
    // -------------------
    _Extensions[index - 1].MarketExtra = MarketTemp
    _Extensions[index - 1].RateTypeExtra = reserva.RateType
    // ID RsvPromotions
    // Para RsvPromotionFREE no se manda RsvPromotionId
    // _Extensions[index-1].RsvPromotionId = (__PromoExchangeFreeselected[index - 1].Recnum != null && __PromoExchangeFreeselected[index - 1].Recnum != undefined && __PromoExchangeFreeselected[index - 1].Recnum  > 0) ? __PromoExchangeFreeselected[index - 1].Recnum : 0;
    _Extensions[index - 1].RsvPromotionId =
      __RsvPromotionTargetType == 'exchange' ? RsvPromotionId : 0
    // [efdiaz] 25/01/2021 se remueve validacion que aplicaba non refundable a reservas con ref500
    isBenefitRef = _IsBenefitRef[reserva.Rm_type]
    if (isBenefitRef) {
      // @ts-ignore
      reserva.Sharef3 = String.format('REF{0}', Context.selectBenefit)
    }
    // [efdiaz] 07/05/2020 Se verifica Refundable para promocion de reservaciones
    _Extensions[index - 1].Refundable = EvalRefundableRsvPromotionExchange(
      reserva.Refundable,
      _Extensions[0].RsvPromotionId,
      __RsvPromotionTargetType,
      __APPLYFREENIGHTSPROMOTION,
      __PromoExchangeFree,
      __PromotionCatalogActivesSelected
    )

    _Extensions[index - 1].TemporalBenefit =
      Context.Index == 1
        ? Context._UseTemporalBenefit && _TemporalBenefitSelected[0] != undefined
          ? _TemporalBenefitSelected[0].toString()
          : ''
        : ''
    _Extensions[index - 1].ProductType = Context.eliteProductType

    if (isImperialReservation) {
      _Extensions[index - 1].ProductType = ''
    }

    reserva.Extension = _Extensions[index - 1] // SUPF1|2 && index = 2 ? 0:Extension GolfRate = 0

    // [jaigonzalez] 07/11/2017 Se cambia la manera de enviar los acompañantes
    // En caso que tenga acompañantes

    const totalPax = GetTotalPax(Context.adults, Context.childs)

    reserva.Company = `${profile.idprofileopera}|${profile.membertype}|${profile.memberlevel}|${profile.statusmembresia}||MND`

    if (totalPax > 1) {
      // if(false){
      const companions = new Array()
      // Obtenemos el total de acompañantes en la habitacion
      // Si es la parte grande de Presidencial y solo tiene 2 pax
      // Entonces solo debemos pasar el Titular de la habitacion(index =1), sino al titular y 1 guest (index=2)
      // Si es la parte chica se debe introducir los pax restantes
      // var n = (Context.IsPresidential && Context.Index==1)?GetTotalPax()==2?1:2:GetTotalPax();
      // var n = _IsMultiCategoryEngine ? GetTotalPaxIndexed(_OriginalPaxIndexedReservation[reserva.Rm_type]) : GetTotalPax();
      const n = _IsMultiCategoryEngine
        ? GetTotalPaxIndexed(_PaxIndexedReservation[reserva.Rm_type])
        : totalPax
      // Se recorren los selects de acompañantes
      // Si es la parte chica de la presidencial y van más de 2 pax entones empezamos a partir del indice 2 (3er pax)
      // En caso contrario empezamos con el indice 1 (Pax 2, ya que el 1er pax es el titular de la hbitación 1)
      // -------------> Cada suite tendra su propio titular
      // Iniciamos configurando los titulares
      // Familiar primera y segunda parte va el mismo titular
      // Se agrega concatenbaciones para lockoof

      // TODO:
      // var target_ddlsHolder = "#ddlsHolder" + (selectedLockOff || IsFamily ? selectedRoom : reserva.Rm_type);

      //reserva.Company = `${profile.idprofileopera}|${profile.membertype}|${profile.memberlevel}|${profile.statusmembresia}||MND`
      reserva.First_name = profile.firstname
      reserva.Last_name = profile.lastname
      reserva.Ref = profile.relationship == 4 ? 'G' : 'M' // Member, Guest

      // if (index >= 2 && reserva.Rm_type == 'SUPF2') {
      //   // var target_ddlsHolderFam = "#ddlsHolderSUPF1";
      //   // @ts-ignore
      //   // reserva.Company = String.format(
      //   //   '{0}|{1}|{2}|{3}||MND',
      //   //   profile.idprofileopera,
      //   //   profile.membertype,
      //   //   profile.memberlevel,
      //   //   profile.statusmembresia
      //   // )
      //   reserva.Company = `${profile.idprofileopera}|${profile.membertype}|${profile.memberlevel}|${profile.statusmembresia}||MND`
      //   reserva.First_name = profile.firstname
      //   reserva.Last_name = profile.lastname
      //   reserva.Ref = profile.relationship == 4 ? 'G' : 'M' // Member, Guest
      //   debugger
      // } else {
      //   // var Co = $('#TxtRmCompany').val().split("|");
      //   // @ts-ignore
      //   // reserva.Company = String.format(
      //   //   '{0}|{1}|{2}|{3}||MND',
      //   //   profile.idprofileopera,
      //   //   profile.membertype,
      //   //   profile.memberlevel,
      //   //   profile.statusmembresia
      //   // )
      //   reserva.Company = `${profile.idprofileopera}|${profile.membertype}|${profile.memberlevel}|${profile.statusmembresia}||MND`
      //   reserva.First_name = profile.firstname
      //   reserva.Last_name = profile.lastname
      //   reserva.Ref = profile.relationship == 4 ? 'G' : 'M'
      //   debugger
      // }

      // console.log(Context.companions)
      for (let i = 1; i < n; i++) {
        // TODO
        // No aplica si es familiar parte 2
        if (index == 2 && IsFamily) {
          break
        }
        // console.log(Context.companions)

        if (Context.companions.length > 0) {
          var companion = {
            Hotel: Context.Hotel,
            Folio: '',
            Idprofile: Context.companions[i].memberUtils.idprofileopera, //$(String.format("#ddlsCompanion{0}",i)).val(),
            Type: Context.companions[i].memberUtils.relationship, //$("#ddlsCompanion"+i).select2("data")[0].relationship
            firstname: Context.companions[i].memberUtils.firstname,
            lastname: Context.companions[i].memberUtils.lastname
          }

          companions.push(companion)
        }
      }
      reserva.Companions = companions
    }

    // [efdiaz] 27/09/2019 Promocion de la tarifa
    const ObjPromo = new Array()
    let RateCodeRsvPromotion
    if (__PromotionCurrent[depositRoom] !== null) {
      // revisamos promociones
      __PromotionCurrent[depositRoom].forEach(function (item: any) {
        RateCodeRsvPromotion = {
          IdPromo: item.Promo,
          Hotel: reserva.Hotel,
          // @ts-ignore
          ArvDate: moment(item.ArrvDate).format('YYYY-MM-DD'),
          // @ts-ignore
          DeptDate: moment(item.DeptDate).format('YYYY-MM-DD'),
          Nights: item.Nights
        }
        ObjPromo.push(RateCodeRsvPromotion)
      })
      reserva.RateCodeRsvPromotion = ObjPromo
    }

    reserva.listRsvExchangeForFree = new Array()

    /*
     * TODO
     * */
    /* if (RsvFreeModeReservation(reserva.Rm_type) && RsvPromotionId > 0) {
      var RsvExchangeByFree = GenerateRequestSaveLinkExchange(null, Context.Index, IsPresidential);
      if (RsvExchangeByFree !== null) {
        reserva.listRsvExchangeForFree.push(RsvExchangeByFree);
      }
    } */

    // [efdiaz] 05/02/2021 Implementacion para beneficios temporales
    reserva.ListTemporalBenefits = new Array()
    // Si hay beneficios seleccionados
    if (_TemporalBenefitSelected[0].length > 0) {
      const TemporalBenefits = GenerateTemporalBenefitsRequest(
        _MemberPromotionsEngine,
        _TemporalBenefitSelected
      )
      if (TemporalBenefits != null) {
        reserva.ListTemporalBenefits = TemporalBenefits
      }
    }
    // [efdiaz] 28/05/2021 Implementacion para promocion de reservas
    reserva.PromotionByRsv = new Array()
    /*
    const PromotionsToRsv = GenerateListPromotionSelectedToSave(

      //__PromotionCatalogActivesSelected,
      //_ListPromotionAccessRoomSelected,
      //Context.Index,
      //reserva.Rm_type

      promotions,
      benefitsSelecteds
    )
    */
    const PromotionsToRsv = promotions

    if (PromotionsToRsv != null) {
      reserva.PromotionByRsv = PromotionsToRsv
    }

    // [jaigonzalez] 14/12/2017 migrated Validación para reserva bono
    /*if (reserva.Agency_cd == 'PEL' || reserva.Agency_cd.toUpperCase() == 'M/PEL') {
      if (
        !(
          Context._SelectedProvisions == 1 ||
          (_reservationReferralsPromotion[index - 1] && Context._reservationsSelected == 2)
        )
      ) {
        // PublishWarning(window.$MsgBonpelRequirements);
        // hidePreloader();
        return
      }
    }*/

    reserva.ReferidosBonpel = new Object()
    reserva.ReferidosBonpel = _reservationReferralsPromotion[index - 1]

    return reserva
  } catch (ex) {
    // En caso que ocurra un error ocultamos el preloader
    // hidePreloader();
    // PublishException(String.format('FillDataReservations: {0}', ex.message));
    // console.log(ex)
  }
}
