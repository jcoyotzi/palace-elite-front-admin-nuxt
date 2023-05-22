/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 5 8:37:57
 *
 */

import {getRoomsSorted, HotelCodes} from 'app/ratesClever/infrastructure/getRoomsSorted'

describe('getRoomsSorted', () => {
  it('Happy Path', () => {
    // GIVEN
    const hotelCode = HotelCodes.BP

    // WHEN
    const result = getRoomsSorted(hotelCode)

    // THEN 8
    expect(result.length).toBe(8)
  })

  it('Bad Path', () => {
    // GIVEN
    const hotelCode = 'NOT_EXISTENT'

    // WHEN
    const result = getRoomsSorted(hotelCode)

    // THEN 8
    expect(result.length).toBe(0)
  })

  it('Real Case Path', () => {
    // GIVEN
    const hotelCode = 'CZ'

    const accesibleCategories = [
      {
        RealCode: 'CNG',
        TotalRooms: 0,
        IsVirtual: false,
        RelRoomsCodes: '',
        LockOffType: '',
        PromotionAccessRoom: null,
        recnum: 273,
        hotel: 'CZ',
        code: 'CNG',
        description: 'Superior Honeymoon – Concierge',
        rate1: 0,
        rate2: 0,
        rate3: 0,
        rate_add: 0,
        eff_date: '2009-12-07T00:00:00',
        rooms: 23,
        ent_date: '2008-07-24T00:00:00',
        ent_time: '11:45',
        ent_term: 'ROOT',
        ent_oper: 'BOSS',
        chg_date: '2022-08-31T00:00:00',
        chg_time: '10:07',
        chg_term: 'lekuyoc',
        chg_oper: 'lekuyoc',
        max_pers: 2,
        max_priv: 2,
        ocn_view: 'Y',
        pertenece: '',
        doubleb: 0,
        king: 23,
        queen: 0,
        murphy: 0,
        Category: {
          _Recnum: 10,
          _Hotel: 'CZ',
          _Rmtype: 'CNG',
          _Type: 3,
          _IsDouble: false,
          _IsPartwho: false,
          _IsPartOne: true,
          _RmtypeRelated: '',
          _ExcludeInternet: false,
          _ReservationCostType: 'V',
          _Amenities:
            'ai-safe-box,ai-serving-plate-hand,ai-hair-dryer,ai-call-talk,ai-coffee-machine,ai-wifi',
          _Images:
            'CNG-1631222517907.2183.jpeg,CNG-1631294980145.1758.jpeg,CNG-1631294994692.4033.jpeg'
        },
        CLVRoomTypeCategory: {
          room_type_category: 'CNG',
          room_type_category_clever: 'HNY',
          resort: 'ZRCZ',
          default_occupancy: 2,
          max_occupancy: 2,
          max_adults: 2,
          max_children: 0,
          order_view_global: 15
        },
        InfoAvailability: null,
        OperaId: 'HN',
        RoomArea: {
          _area: 581,
          _area_unit: 1,
          _unit_code: 'ft2',
          _room_code: 'HNY'
        },
        BookingTerms:
          '<p><span style="color:#ffffff">FAMILY RESORTS / HIGH SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid. Please consider that, if modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">FAMILY RESORTS / REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><br />\n<span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid, including the extra fees involved. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">ADULTS ONLY RESORTS / HIGH SEASON AND REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the whole amount that was paid. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.<br />\n<br />\n<em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">RESERVATIONS FOR VILLAS AND RESIDENCE SUITES</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Villas &amp; Residence Suites:</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply, this night will be equivalent to the prorated cost of the stay. This applies for all type of Seasons &amp; Resorts.</span></p>\n\n<p><span style="color:#ffffff">*The suites&rsquo; access for the corresponding anniversary year will be forfeited*</span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n',
        area: '456 ft2',
        images: [
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_15_682a037efc.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_24_b675bc93e1.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_04_8bcf5fb7d5.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_53_44a20e8d77.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_41_c8f2e8e670.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_29_54fbca70a1.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          }
        ],
        items: [
          {
            appendIcons: ['coffee', 'hair-dryer', 'wifi'],
            content: {
              contentLeft:
                '<ul><li>1 cama king o 2 camas dobles&nbsp;</li><li>La vista puede ser limitada u obstruida parcialmente | Vista a la laguna</li><li>Baño privado con ducha de lluvia y jets de hidromasaje</li><li>Tina de hidromasaje doble</li><li>Dispensador de licores con marcas premium: Bacardi ron blanco, Johnny Walker Black Label, Absolut vodka y Tequila Maestro Tequilero Reposado (sujetas a cambio en cualquier momento)</li></ul>',
              contentRight:
                '<ul><li>Minibar con refrescos, agua embotellada, jugos, cervezas nacionales e importadas (abastecido diariamente)</li><li>Los aperitivos en la habitación incluyen papas fritas, chocolates y cacahuates (sujetas a cambio en cualquier momento)</li><li>2 habitación disponibles para personas con capacidades diferentes, bajo petición y sujeta a disponibilidad</li><li>Máxima capacidad: 4 adultos (2 camas dobles) o 2 adultos (1 cama king) sujetas a disponibilidad</li></ul>'
            },
            header: 'Amenities'
          },
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<p>MÉXICO - ALL INCLUSIVE - NO REEMBOLSABLE<br>Política de cancelación<br>&nbsp;</p><p>El importe total no reembolsable de la reserva se cargará inmediatamente en su tarjeta de crédito en el momento de la reserva. Esta misma tarjeta de crédito se debe mostrar al encargado de la recepción al registrarse, junto con una identificación con foto. El nombre del titular de la tarjeta debe ser del mismo nombre en la reserva. Si por algún motivo no podemos completar la transacción, uno de nuestros agentes de reservas se pondrá en contacto con usted por correo electrónico para finalizar la transacción.<br><br>Tenga encuenta que el registro de entrada es a las 15:00 y el de salida a las 12:00.</p><p>Política de garantía<br>&nbsp;</p><p><strong>Tarifa No Reembolsable</strong></p><ul><li>Tenga en cuenta que TODOS LOS CARGOS SE HACEN EN USD y que ciertos bancos pueden aplicar tarifas para los pagos realizados en dicha moneda. Ni Operadora Palace Resorts, que está autorizada para distribuir y comercializar los servicios de alojamiento de Palace Resorts, ni los Palace Resorts en sí mismos, serán de ninguna manera responsables por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito. Por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones. Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>',
              contentRight:
                '<p><br><strong>Política del Hotel y Procedimiento de pago</strong></p><ul><li>La cancelación será gratuita hasta 4 días antes de la fecha de llegada sin penalización. Para cancelaciones y/o modificación de las fechas de viaje&nbsp;hechas dentro de los 3 días previos a la llegada, o si no se presenta (No-show), se cobrará una penalización de una noche a los huéspedes.</li></ul><p><strong>Política de salida anticipada</strong></p><ul><li>Para los huéspedes que realicen el check-out antes de la fecha de salida programada, se agregará una multa de una noche a su factura.</li><li>El saldo restante, una vez aplicada la penalización por salida anticipada, se reembolsará dentro de los siguientes 14-21 días hábiles.</li></ul><p>Los Términos y Condiciones se regirán e interpretarán de conformidad con las leyes del Estado de Quintana Roo, Estados Unidos Mexicanos, sin dar efecto a ningún principio o legislación de conflictos de leyes, y usted acepta esto mediante el uso de este sitio web.<br>&nbsp;</p><p><strong>Información Importante:</strong></p><ul><li>El importe correspondiente a la primera noche se cargará automáticamente en la tarjeta de crédito proporcionada en el momento de la reserva con la finalidad de garantizar la reserva.</li><li>El saldo del total de la reserva se cobrará al momento del check-in.</li><li>Palace Resorts no se hará de ninguna manera responsable por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones.</li><li>Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>'
            },
            header: 'Booking Terms'
          }
        ],
        max: 4,
        title: 'Concierge Honeymoon',
        tour: 'https://my.matterport.com/show/?m=FKr3Lsh9Pk5&play=1&lp=1&ts=1&hl=0&mf=1'
      },
      {
        RealCode: 'MEZ',
        TotalRooms: 0,
        IsVirtual: false,
        RelRoomsCodes: '',
        LockOffType: '',
        PromotionAccessRoom: null,
        recnum: 176,
        hotel: 'CZ',
        code: 'MEZ',
        description: 'UpSell:Superior Loft Suite',
        rate1: 0,
        rate2: 0,
        rate3: 0,
        rate_add: 0,
        eff_date: '2007-01-05T00:00:00',
        rooms: 12,
        ent_date: '2005-05-25T00:00:00',
        ent_time: '13:17',
        ent_term: 'ROOT',
        ent_oper: 'ROOT',
        chg_date: '2022-09-29T00:00:00',
        chg_time: '11:06',
        chg_term: 'lekuyoc',
        chg_oper: 'lekuyoc',
        max_pers: 6,
        max_priv: 4,
        ocn_view: 'Y',
        pertenece: '',
        doubleb: 12,
        king: 0,
        queen: 1,
        murphy: 0,
        Category: {
          _Recnum: 13,
          _Hotel: 'CZ',
          _Rmtype: 'MEZ',
          _Type: 3,
          _IsDouble: false,
          _IsPartwho: false,
          _IsPartOne: true,
          _RmtypeRelated: '',
          _ExcludeInternet: false,
          _ReservationCostType: 'F',
          _Amenities: 'ai-safe-box,ai-hair-dryer,ai-tv,ai-coffee-machine,ai-wifi,ai-alarm-clock',
          _Images:
            'MEZ-1631222796744.948.jpeg,MEZ-1631222796744.9702.jpeg,MEZ-1631222796744.3662.jpeg,MEZ-1631295050999.5024.jpeg'
        },
        CLVRoomTypeCategory: {
          room_type_category: 'MEZ',
          room_type_category_clever: 'MZK',
          resort: 'ZRCZ',
          default_occupancy: 2,
          max_occupancy: 6,
          max_adults: 6,
          max_children: 5,
          order_view_global: 20
        },
        InfoAvailability: null,
        OperaId: 'MZK',
        RoomArea: {
          _area: 827,
          _area_unit: 1,
          _unit_code: 'ft2',
          _room_code: 'MZK'
        },
        BookingTerms:
          '<p><span style="color:#ffffff">FAMILY RESORTS / HIGH SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid. Please consider that, if modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">FAMILY RESORTS / REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><br />\n<span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid, including the extra fees involved. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">ADULTS ONLY RESORTS / HIGH SEASON AND REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the whole amount that was paid. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.<br />\n<br />\n<em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">RESERVATIONS FOR VILLAS AND RESIDENCE SUITES</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Villas &amp; Residence Suites:</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply, this night will be equivalent to the prorated cost of the stay. This applies for all type of Seasons &amp; Resorts.</span></p>\n\n<p><span style="color:#ffffff">*The suites&rsquo; access for the corresponding anniversary year will be forfeited*</span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n',
        area: '456 ft2',
        images: [
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_15_682a037efc.png',
            alt: 'Mezanine',
            title: 'Mezanine'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_24_b675bc93e1.png',
            alt: 'Mezanine',
            title: 'Mezanine'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_04_8bcf5fb7d5.png',
            alt: 'Mezanine',
            title: 'Mezanine'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_53_44a20e8d77.png',
            alt: 'Mezanine',
            title: 'Mezanine'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_41_c8f2e8e670.png',
            alt: 'Mezanine',
            title: 'Mezanine'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_29_54fbca70a1.png',
            alt: 'Mezanine',
            title: 'Mezanine'
          }
        ],
        items: [
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<ul><li>1 cama king o 2 camas dobles&nbsp;</li><li>La vista puede ser limitada u obstruida parcialmente | Vista a la laguna</li><li>Baño privado con ducha de lluvia y jets de hidromasaje</li><li>Tina de hidromasaje doble</li><li>Dispensador de licores con marcas premium: Bacardi ron blanco, Johnny Walker Black Label, Absolut vodka y Tequila Maestro Tequilero Reposado (sujetas a cambio en cualquier momento)</li></ul>',
              contentRight:
                '<ul><li>Minibar con refrescos, agua embotellada, jugos, cervezas nacionales e importadas (abastecido diariamente)</li><li>Los aperitivos en la habitación incluyen papas fritas, chocolates y cacahuates (sujetas a cambio en cualquier momento)</li><li>2 habitación disponibles para personas con capacidades diferentes, bajo petición y sujeta a disponibilidad</li><li>Máxima capacidad: 4 adultos (2 camas dobles) o 2 adultos (1 cama king) sujetas a disponibilidad</li></ul>'
            },
            header: 'Amenities'
          },
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<p>MÉXICO - ALL INCLUSIVE - NO REEMBOLSABLE<br>Política de cancelación<br>&nbsp;</p><p>El importe total no reembolsable de la reserva se cargará inmediatamente en su tarjeta de crédito en el momento de la reserva. Esta misma tarjeta de crédito se debe mostrar al encargado de la recepción al registrarse, junto con una identificación con foto. El nombre del titular de la tarjeta debe ser del mismo nombre en la reserva. Si por algún motivo no podemos completar la transacción, uno de nuestros agentes de reservas se pondrá en contacto con usted por correo electrónico para finalizar la transacción.<br><br>Tenga encuenta que el registro de entrada es a las 15:00 y el de salida a las 12:00.</p><p>Política de garantía<br>&nbsp;</p><p><strong>Tarifa No Reembolsable</strong></p><ul><li>Tenga en cuenta que TODOS LOS CARGOS SE HACEN EN USD y que ciertos bancos pueden aplicar tarifas para los pagos realizados en dicha moneda. Ni Operadora Palace Resorts, que está autorizada para distribuir y comercializar los servicios de alojamiento de Palace Resorts, ni los Palace Resorts en sí mismos, serán de ninguna manera responsables por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito. Por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones. Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>',
              contentRight:
                '<p><br><strong>Política del Hotel y Procedimiento de pago</strong></p><ul><li>La cancelación será gratuita hasta 4 días antes de la fecha de llegada sin penalización. Para cancelaciones y/o modificación de las fechas de viaje&nbsp;hechas dentro de los 3 días previos a la llegada, o si no se presenta (No-show), se cobrará una penalización de una noche a los huéspedes.</li></ul><p><strong>Política de salida anticipada</strong></p><ul><li>Para los huéspedes que realicen el check-out antes de la fecha de salida programada, se agregará una multa de una noche a su factura.</li><li>El saldo restante, una vez aplicada la penalización por salida anticipada, se reembolsará dentro de los siguientes 14-21 días hábiles.</li></ul><p>Los Términos y Condiciones se regirán e interpretarán de conformidad con las leyes del Estado de Quintana Roo, Estados Unidos Mexicanos, sin dar efecto a ningún principio o legislación de conflictos de leyes, y usted acepta esto mediante el uso de este sitio web.<br>&nbsp;</p><p><strong>Información Importante:</strong></p><ul><li>El importe correspondiente a la primera noche se cargará automáticamente en la tarjeta de crédito proporcionada en el momento de la reserva con la finalidad de garantizar la reserva.</li><li>El saldo del total de la reserva se cobrará al momento del check-in.</li><li>Palace Resorts no se hará de ninguna manera responsable por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones.</li><li>Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>'
            },
            header: 'Booking Terms'
          }
        ],
        max: 4,
        title: 'Mezanine',
        tour: null
      },
      {
        RealCode: 'JOF',
        TotalRooms: 0,
        IsVirtual: false,
        RelRoomsCodes: '',
        LockOffType: '',
        PromotionAccessRoom: null,
        recnum: 385,
        hotel: 'CZ',
        code: 'JOF',
        description: 'Superior Ocean Front Suite',
        rate1: 0,
        rate2: 0,
        rate3: 0,
        rate_add: 0,
        eff_date: '2016-06-12T00:00:00',
        rooms: 2,
        ent_date: '2016-12-09T00:00:00',
        ent_time: '18:39',
        ent_term: 'MPRIETO',
        ent_oper: 'CENTRA29',
        chg_date: '2022-08-31T00:00:00',
        chg_time: '10:03',
        chg_term: 'lekuyoc',
        chg_oper: 'lekuyoc',
        max_pers: 4,
        max_priv: 2,
        ocn_view: 'Y',
        pertenece: '',
        doubleb: 1,
        king: 1,
        queen: 0,
        murphy: 0,
        Category: {
          _Recnum: 107,
          _Hotel: 'CZ',
          _Rmtype: 'JOF',
          _Type: 3,
          _IsDouble: false,
          _IsPartwho: false,
          _IsPartOne: true,
          _RmtypeRelated: '',
          _ExcludeInternet: false,
          _ReservationCostType: 'V',
          _Amenities: 'ai-alarm-clock,ai-safe-box,ai-hair-dryer,ai-tv,ai-coffee-machine,ai-wifi',
          _Images:
            'JOF-1631222625444.6428.jpeg,JOF-1631295020460.6912.jpeg,JOF-1631295030876.7405.jpeg'
        },
        CLVRoomTypeCategory: {
          room_type_category: 'JOF',
          room_type_category_clever: 'JOF',
          resort: 'ZRCZ',
          default_occupancy: 2,
          max_occupancy: 4,
          max_adults: 4,
          max_children: 3,
          order_view_global: 10
        },
        InfoAvailability: null,
        OperaId: 'JOF',
        RoomArea: {
          _area: 581,
          _area_unit: 1,
          _unit_code: 'ft2',
          _room_code: 'JOF'
        },
        BookingTerms:
          '<p><span style="color:#ffffff">FAMILY RESORTS / HIGH SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid. Please consider that, if modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">FAMILY RESORTS / REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><br />\n<span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid, including the extra fees involved. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">ADULTS ONLY RESORTS / HIGH SEASON AND REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the whole amount that was paid. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.<br />\n<br />\n<em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">RESERVATIONS FOR VILLAS AND RESIDENCE SUITES</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Villas &amp; Residence Suites:</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply, this night will be equivalent to the prorated cost of the stay. This applies for all type of Seasons &amp; Resorts.</span></p>\n\n<p><span style="color:#ffffff">*The suites&rsquo; access for the corresponding anniversary year will be forfeited*</span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n',
        area: '456 ft2',
        images: [
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_15_682a037efc.png',
            alt: 'Ocean Front Suite',
            title: 'Ocean Front Suite'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_24_b675bc93e1.png',
            alt: 'Ocean Front Suite',
            title: 'Ocean Front Suite'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_04_8bcf5fb7d5.png',
            alt: 'Ocean Front Suite',
            title: 'Ocean Front Suite'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_53_44a20e8d77.png',
            alt: 'Ocean Front Suite',
            title: 'Ocean Front Suite'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_41_c8f2e8e670.png',
            alt: 'Ocean Front Suite',
            title: 'Ocean Front Suite'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_29_54fbca70a1.png',
            alt: 'Ocean Front Suite',
            title: 'Ocean Front Suite'
          }
        ],
        items: [
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<ul><li>1 cama king o 2 camas dobles&nbsp;</li><li>La vista puede ser limitada u obstruida parcialmente | Vista a la laguna</li><li>Baño privado con ducha de lluvia y jets de hidromasaje</li><li>Tina de hidromasaje doble</li><li>Dispensador de licores con marcas premium: Bacardi ron blanco, Johnny Walker Black Label, Absolut vodka y Tequila Maestro Tequilero Reposado (sujetas a cambio en cualquier momento)</li></ul>',
              contentRight:
                '<ul><li>Minibar con refrescos, agua embotellada, jugos, cervezas nacionales e importadas (abastecido diariamente)</li><li>Los aperitivos en la habitación incluyen papas fritas, chocolates y cacahuates (sujetas a cambio en cualquier momento)</li><li>2 habitación disponibles para personas con capacidades diferentes, bajo petición y sujeta a disponibilidad</li><li>Máxima capacidad: 4 adultos (2 camas dobles) o 2 adultos (1 cama king) sujetas a disponibilidad</li></ul>'
            },
            header: 'Amenities'
          },
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<p>MÉXICO - ALL INCLUSIVE - NO REEMBOLSABLE<br>Política de cancelación<br>&nbsp;</p><p>El importe total no reembolsable de la reserva se cargará inmediatamente en su tarjeta de crédito en el momento de la reserva. Esta misma tarjeta de crédito se debe mostrar al encargado de la recepción al registrarse, junto con una identificación con foto. El nombre del titular de la tarjeta debe ser del mismo nombre en la reserva. Si por algún motivo no podemos completar la transacción, uno de nuestros agentes de reservas se pondrá en contacto con usted por correo electrónico para finalizar la transacción.<br><br>Tenga encuenta que el registro de entrada es a las 15:00 y el de salida a las 12:00.</p><p>Política de garantía<br>&nbsp;</p><p><strong>Tarifa No Reembolsable</strong></p><ul><li>Tenga en cuenta que TODOS LOS CARGOS SE HACEN EN USD y que ciertos bancos pueden aplicar tarifas para los pagos realizados en dicha moneda. Ni Operadora Palace Resorts, que está autorizada para distribuir y comercializar los servicios de alojamiento de Palace Resorts, ni los Palace Resorts en sí mismos, serán de ninguna manera responsables por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito. Por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones. Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>',
              contentRight:
                '<p><br><strong>Política del Hotel y Procedimiento de pago</strong></p><ul><li>La cancelación será gratuita hasta 4 días antes de la fecha de llegada sin penalización. Para cancelaciones y/o modificación de las fechas de viaje&nbsp;hechas dentro de los 3 días previos a la llegada, o si no se presenta (No-show), se cobrará una penalización de una noche a los huéspedes.</li></ul><p><strong>Política de salida anticipada</strong></p><ul><li>Para los huéspedes que realicen el check-out antes de la fecha de salida programada, se agregará una multa de una noche a su factura.</li><li>El saldo restante, una vez aplicada la penalización por salida anticipada, se reembolsará dentro de los siguientes 14-21 días hábiles.</li></ul><p>Los Términos y Condiciones se regirán e interpretarán de conformidad con las leyes del Estado de Quintana Roo, Estados Unidos Mexicanos, sin dar efecto a ningún principio o legislación de conflictos de leyes, y usted acepta esto mediante el uso de este sitio web.<br>&nbsp;</p><p><strong>Información Importante:</strong></p><ul><li>El importe correspondiente a la primera noche se cargará automáticamente en la tarjeta de crédito proporcionada en el momento de la reserva con la finalidad de garantizar la reserva.</li><li>El saldo del total de la reserva se cobrará al momento del check-in.</li><li>Palace Resorts no se hará de ninguna manera responsable por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones.</li><li>Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>'
            },
            header: 'Booking Terms'
          }
        ],
        max: 4,
        title: 'Ocean Front Suite',
        tour: null
      },
      {
        RealCode: 'JRS',
        TotalRooms: 0,
        IsVirtual: false,
        RelRoomsCodes: '',
        LockOffType: '',
        PromotionAccessRoom: null,
        recnum: 151,
        hotel: 'CZ',
        code: 'JRS',
        description: 'Superior Ocean View Suite',
        rate1: 0,
        rate2: 0,
        rate3: 0,
        rate_add: 0,
        eff_date: '2005-02-01T00:00:00',
        rooms: 129,
        ent_date: '2005-02-10T00:00:00',
        ent_time: '10:42',
        ent_term: 'ROOT',
        ent_oper: 'ROOT',
        chg_date: '2022-08-30T00:00:00',
        chg_time: '17:56',
        chg_term: 'lekuyoc',
        chg_oper: 'lekuyoc',
        max_pers: 4,
        max_priv: 2,
        ocn_view: 'Y',
        pertenece: '',
        doubleb: 47,
        king: 82,
        queen: 1,
        murphy: 1,
        Category: {
          _Recnum: 12,
          _Hotel: 'CZ',
          _Rmtype: 'JRS',
          _Type: 3,
          _IsDouble: false,
          _IsPartwho: false,
          _IsPartOne: true,
          _RmtypeRelated: '',
          _ExcludeInternet: false,
          _ReservationCostType: 'V',
          _Amenities: 'ai-safe-box,ai-hair-dryer,ai-tv,ai-coffee-machine,ai-wifi,ai-alarm-clock',
          _Images: 'JRS-1631640492361.8586.jpeg,JRS-1631640513718.3496.jpeg'
        },
        CLVRoomTypeCategory: {
          room_type_category: 'JRS',
          room_type_category_clever: 'JR',
          resort: 'ZRCZ',
          default_occupancy: 2,
          max_occupancy: 4,
          max_adults: 4,
          max_children: 3,
          order_view_global: 5
        },
        InfoAvailability: null,
        OperaId: 'JR',
        RoomArea: {
          _area: 581,
          _area_unit: 1,
          _unit_code: 'ft2',
          _room_code: 'JR'
        },
        BookingTerms:
          '<p><span style="color:#ffffff">FAMILY RESORTS / HIGH SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid. Please consider that, if modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">FAMILY RESORTS / REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><br />\n<span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the total amount paid, including the extra fees involved. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.</span></p>\n\n<p><span style="color:#ffffff"><em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">ADULTS ONLY RESORTS / HIGH SEASON AND REGULAR SEASON</span></p>\n\n<p><span style="color:#ffffff"><strong><em>REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive Week, Anniversary Week</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay.</span></p>\n\n<p><span style="color:#ffffff"><strong><em>NON-REFUNDABLE Reservations paid with Preferential Rate, Referrals, Incentive, Anniversary</em></strong><br />\nOnly modifications are allowed, cancelation of reservation will result on forfeiting the whole amount that was paid. Please consider that if modified 3 days or less prior to the arrival date, 1 Night Penalty Fee will apply. This night will be equivalent to the prorated cost of the stay. As well, the member will need to cover any difference in rate (if any).</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Reservations for Imperial (Week &amp; Nights), Bonus or Rewards</em></strong><br />\nIf reservation is cancelled or modified 3 days or less prior to the arrival date, the provisions will be forfeited.<br />\n<br />\n<em>*Bonus weeks: Are considered final transactions and changes are not allowed. In case of a change or a cancellation, the Bonus weeks will be forfeited.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n\n<p>&nbsp;</p>\n\n<p><span style="color:#ffffff">RESERVATIONS FOR VILLAS AND RESIDENCE SUITES</span></p>\n\n<p><span style="color:#ffffff"><strong><em>Villas &amp; Residence Suites:</em></strong><br />\nIf reservation is cancelled or modified 30 days or less prior to the arrival date, 1 Night Penalty Fee will apply, this night will be equivalent to the prorated cost of the stay. This applies for all type of Seasons &amp; Resorts.</span></p>\n\n<p><span style="color:#ffffff">*The suites&rsquo; access for the corresponding anniversary year will be forfeited*</span></p>\n\n<p><span style="color:#ffffff"><em>*One- or three-night penalty fee will apply to NO SHOWS depending on the season.</em></span></p>\n\n<p><span style="color:#ffffff"><em>*The lodging and services included provided in this confirmation Apply only once any duplication of it, shall be covered by the member(s) at the current preferential rate.</em></span></p>\n',
        area: '456 ft2',
        images: [
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_29_54fbca70a1.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_53_44a20e8d77.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_15_682a037efc.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_22_41_c8f2e8e670.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_24_b675bc93e1.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          },
          {
            mime: 'image/png',
            url: 'https://d396g00xwrhdnt.cloudfront.net/content/Captura_de_Pantalla_2022_09_26_a_la_s_23_23_04_8bcf5fb7d5.png',
            alt: 'Concierge Honeymoon',
            title: 'Concierge Honeymoon'
          }
        ],
        items: [
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<ul><li>1 cama king o 2 camas dobles&nbsp;</li><li>La vista puede ser limitada u obstruida parcialmente | Vista a la laguna</li><li>Baño privado con ducha de lluvia y jets de hidromasaje</li><li>Tina de hidromasaje doble</li><li>Dispensador de licores con marcas premium: Bacardi ron blanco, Johnny Walker Black Label, Absolut vodka y Tequila Maestro Tequilero Reposado (sujetas a cambio en cualquier momento)</li></ul>',
              contentRight:
                '<ul><li>Minibar con refrescos, agua embotellada, jugos, cervezas nacionales e importadas (abastecido diariamente)</li><li>Los aperitivos en la habitación incluyen papas fritas, chocolates y cacahuates (sujetas a cambio en cualquier momento)</li><li>2 habitación disponibles para personas con capacidades diferentes, bajo petición y sujeta a disponibilidad</li><li>Máxima capacidad: 4 adultos (2 camas dobles) o 2 adultos (1 cama king) sujetas a disponibilidad</li></ul>'
            },
            header: 'Amenities'
          },
          {
            appendIcons: [],
            content: {
              contentLeft:
                '<p>MÉXICO - ALL INCLUSIVE - NO REEMBOLSABLE<br>Política de cancelación<br>&nbsp;</p><p>El importe total no reembolsable de la reserva se cargará inmediatamente en su tarjeta de crédito en el momento de la reserva. Esta misma tarjeta de crédito se debe mostrar al encargado de la recepción al registrarse, junto con una identificación con foto. El nombre del titular de la tarjeta debe ser del mismo nombre en la reserva. Si por algún motivo no podemos completar la transacción, uno de nuestros agentes de reservas se pondrá en contacto con usted por correo electrónico para finalizar la transacción.<br><br>Tenga encuenta que el registro de entrada es a las 15:00 y el de salida a las 12:00.</p><p>Política de garantía<br>&nbsp;</p><p><strong>Tarifa No Reembolsable</strong></p><ul><li>Tenga en cuenta que TODOS LOS CARGOS SE HACEN EN USD y que ciertos bancos pueden aplicar tarifas para los pagos realizados en dicha moneda. Ni Operadora Palace Resorts, que está autorizada para distribuir y comercializar los servicios de alojamiento de Palace Resorts, ni los Palace Resorts en sí mismos, serán de ninguna manera responsables por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito. Por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones. Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>',
              contentRight:
                '<p><br><strong>Política del Hotel y Procedimiento de pago</strong></p><ul><li>La cancelación será gratuita hasta 4 días antes de la fecha de llegada sin penalización. Para cancelaciones y/o modificación de las fechas de viaje&nbsp;hechas dentro de los 3 días previos a la llegada, o si no se presenta (No-show), se cobrará una penalización de una noche a los huéspedes.</li></ul><p><strong>Política de salida anticipada</strong></p><ul><li>Para los huéspedes que realicen el check-out antes de la fecha de salida programada, se agregará una multa de una noche a su factura.</li><li>El saldo restante, una vez aplicada la penalización por salida anticipada, se reembolsará dentro de los siguientes 14-21 días hábiles.</li></ul><p>Los Términos y Condiciones se regirán e interpretarán de conformidad con las leyes del Estado de Quintana Roo, Estados Unidos Mexicanos, sin dar efecto a ningún principio o legislación de conflictos de leyes, y usted acepta esto mediante el uso de este sitio web.<br>&nbsp;</p><p><strong>Información Importante:</strong></p><ul><li>El importe correspondiente a la primera noche se cargará automáticamente en la tarjeta de crédito proporcionada en el momento de la reserva con la finalidad de garantizar la reserva.</li><li>El saldo del total de la reserva se cobrará al momento del check-in.</li><li>Palace Resorts no se hará de ninguna manera responsable por las tarifas adicionales que cobren las instituciones bancarias o de tarjetas de crédito por lo tanto, recomendamos verificar dicha información con su banco.</li><li>Las tarifas que se muestran arriba no son aplicables para reuniones, incentivos, convenciones o exhibiciones.</li><li>Por favor lea nuestra política de cancelación para más detalles.</li><li>Tenga en cuenta que el check-in es a las 3 PM y la hora de salida es a las 12 PM.</li><li>Con la finalidad de garantizar la seguridad de su transacción y prevenir casos de fraudes, tenga en cuenta que la tarjeta de crédito utilizada para hacer la reserva debe presentarse al momento del registro y el titular de la tarjeta también debe estar presente. En caso contrario, cualquier pago anterior se considerará inválido y el pago total de la reserva se cobrará al momento del check-in.</li></ul>'
            },
            header: 'Booking Terms'
          }
        ],
        max: 4,
        title: 'Concierge Honeymoon tmp',
        tour: null
      }
    ]

    // WHEN
    const roomOrder = getRoomsSorted(hotelCode)

    const sortStep1 = roomOrder.map(hotel => {
      const accessibles = accesibleCategories.find(item => item.RealCode === hotel.roomCode)
      if (accessibles !== undefined) {
        return accessibles
      } else {
        return null
      }
    })
    const sorted = sortStep1.filter(room => room !== null)

    // THEN 8
    expect(roomOrder.length).toBe(0)
  })
})
