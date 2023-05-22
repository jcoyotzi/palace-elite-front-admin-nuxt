/*
 * Copyright (c) 2022.
 * Author: Enrique Nieto Martínez
 * Company: Palace Resorts
 * Created:  2022 / 11 / 5 7:42:28
 * TODO: Pasar a Strapi
 */

import {HotelRoomSorted, RoomSort} from 'app/ratesClever/infrastructure/getRoomsSorted'

export const indexedRoomSorts: HotelRoomSorted = {
  "Owner's Estate Punta Cana": [
    {
      orderPosition: 1,
      hotelCode: " Owner's Estate Punta Cana",
      hotel: " Owner's Estate Punta Cana",
      roomCode: 'VCP',
      suiteType: 'Estancia completa - Tarifa definida',
      description: " Owner's Estate Punta Cana",
      maxPax: 12,
      isFamiliar: true
    }
  ],
  BP: [
    {
      orderPosition: 1,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'SUP',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Lagoon View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'SUP-OV',
      suiteType: 'Estandar 20% ',
      description: 'Superior Deluxe / Ocean View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'GS',
      suiteType: 'Especial 30%',
      description: 'Governor Suite',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'SUPF1',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe King 1',
      maxPax: 6,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'SUPF2',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe Double2',
      maxPax: 0,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'BP',
      hotel: 'BEACH PALACE',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 4,
      isFamiliar: true
    }
  ],
  CZ: [
    {
      orderPosition: 1,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'JRS',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'JOF',
      suiteType: 'Estandar 20%',
      description: 'Ocean Front Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'MEZ',
      suiteType: 'Especial 30%',
      description: 'Mezanine',
      maxPax: 6,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'VT1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'VILLA TWO BEDROOMS 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'CZ',
      hotel: 'COZUMEL PALACE',
      roomCode: 'VT2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'VILLA TWO BEDROOMS 2',
      maxPax: 4,
      isFamiliar: true
    }
  ],
  LBC: [
    {
      orderPosition: 1,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'RDLX',
      suiteType: 'Estandar 20%',
      description: 'Royale Deluxe',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 2,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'OV',
      suiteType: 'Estandar 20%',
      description: 'Royal Deluxe Ocean View Doble',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 2,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'PO',
      suiteType: 'Estandar 20%',
      description: 'Royal Deluxe Partial Ocean Vie',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 3,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'RHNY',
      suiteType: 'Estandar 20%',
      description: 'Royale Honeymoon',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 4,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'WL',
      suiteType: 'Especial 30%',
      description: 'Royal Wellness',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 5,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'WO',
      suiteType: 'Especial 30%',
      description: 'Walk Out Suite',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 6,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'RJRS',
      suiteType: 'Especial 30%',
      description: 'Royal Junior Suite',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 7,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'RPRE',
      suiteType: 'Presidencial 60%',
      description: 'Royale Presidential',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'RGOB',
      suiteType: 'Especial 30%',
      description: 'Royale Govenor',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 9,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidencial',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 10,
      hotelCode: 'LBC',
      hotel: 'LE BLANC CANUN',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite Parte Chica',
      maxPax: 2,
      isFamiliar: false
    }
  ],
  ZPLB: [
    {
      orderPosition: 1,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'RDLX',
      suiteType: 'Estandar 20%',
      description: 'Royale Deluxe',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 2,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'OV',
      suiteType: 'Estandar 20%',
      description: 'Royal Deluxe Ocean View',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 3,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'RHNY',
      suiteType: 'Estandar 20%',
      description: 'Royale Honeymoon',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 4,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'WL',
      suiteType: 'Especial 30%',
      description: 'Royal Wellness',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 5,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'WO',
      suiteType: 'Especial 30%',
      description: 'Walk Out Suite',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 6,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'RJRS',
      suiteType: 'Especial 30%',
      description: 'Royal Junior Suite',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 7,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'RGOB',
      suiteType: 'Especial 30%',
      description: 'Royale Govenor',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'D1K',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Diamond Suite King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'D2K',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Diamond Suite King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'D1K',
      suiteType: 'Presidencial 60%',
      description: 'Diamond Suite King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 8,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'D2K',
      suiteType: 'Presidencial 60%',
      description: 'Diamond Suite King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 9,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'VT1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 9,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'VT2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 9,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'VT3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite Doub',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 10,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'GV1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 1 King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 10,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'GV2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 2 King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 10,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'GV3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 3 Double',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 10,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'GV4',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 4 Double',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 11,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'R1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 1 King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 11,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'R2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 2 King',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 11,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'R3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 3 Double',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 11,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'R4',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 4 Double',
      maxPax: 4,
      isFamiliar: false
    },
    {
      orderPosition: 11,
      hotelCode: 'ZPLB',
      hotel: 'LE BLANC LOS CABOS',
      roomCode: 'RES',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence',
      maxPax: 12,
      isFamiliar: false
    }
  ],
  ZCJG: [
    {
      orderPosition: 1,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'RV',
      suiteType: 'Estandar 20%',
      description: 'Resort View',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'ON',
      suiteType: 'Estandar 20%',
      description: 'Deluxe Ocean View',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'RS',
      suiteType: 'Estandar 20%',
      description: 'Resort View Balcony',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'SUP-OV',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Ocean View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'WL',
      suiteType: 'Especial 30%',
      description: 'Walk Out Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'JRS',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'GS',
      suiteType: 'Especial 30%',
      description: 'Gobernador Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 9,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'SUPF1',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe King 1',
      maxPax: 6,
      isFamiliar: true
    },
    {
      orderPosition: 9,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'SUPF2',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe Doble2',
      maxPax: 0,
      isFamiliar: true
    },
    {
      orderPosition: 10,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'N1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite North',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 10,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'N2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite North',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 11,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 11,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 12,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'VT1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 12,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'VT2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite 2',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 12,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'VT3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite 3',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 13,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'GV1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Suite 1 King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 13,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'GV2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Suite 2 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 13,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'GV3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Suite 1 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 13,
      hotelCode: 'ZCJG',
      hotel: 'MOON PALACE JAMAICA',
      roomCode: 'GV4',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Suite 1 King',
      maxPax: 2,
      isFamiliar: true
    }
  ],
  MP: [
    {
      orderPosition: 1,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'SUP',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Garden View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'SUP-OV',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Ocean View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'SUP-OF',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe Ocean Front',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'ASKK',
      suiteType: 'Especial 30%',
      description: 'Governor Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'SUPF1',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe King 1',
      maxPax: 6,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'SUPF2',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe Double2',
      maxPax: 0,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'GV1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Villa 1 King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'GV2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Villa 2 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'GV3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Villa 1 King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'R1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 1 King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'R2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 2 King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'R3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 3 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'R4',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence 4 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MP',
      hotel: 'MOON PALACE NIZUC',
      roomCode: 'RES',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Residence',
      maxPax: 12,
      isFamiliar: true
    }
  ],
  MPS: [
    {
      orderPosition: 1,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'JGS',
      suiteType: 'Estandar 20%',
      description: 'Junior Golf Suite',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 1,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'SUP',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Garden View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'SUP-OV',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Ocean View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'SWIM',
      suiteType: 'Especial 30%',
      description: 'Swim Up Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'ASKK',
      suiteType: 'Especial 30%',
      description: 'Governor Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'SUPF1',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe King 1',
      maxPax: 6,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'SUPF2',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe Double2',
      maxPax: 0,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'D1K',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Diamond Suite King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'D2D',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Diamond Suite Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'PG1',
      suiteType: 'Presidencial 60%',
      description: 'Presidencial Golf Suite P Gde',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'PG2',
      suiteType: 'Presidencial 60%',
      description: 'Presidencial Golf Suite P Chic',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'VG1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Luxury Golf Villa 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MPS',
      hotel: 'MOON PALACE SUNRISE',
      roomCode: 'VG2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Luxury Golf Villa 2',
      maxPax: 4,
      isFamiliar: true
    }
  ],
  MPG: [
    {
      orderPosition: 1,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GRS',
      suiteType: 'Estandar 20%',
      description: 'Grand Deluxe Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'HNY',
      suiteType: 'Estandar 20%',
      description: 'Grand Honeymoon Suite',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'SWIM',
      suiteType: 'Especial 30%',
      description: 'Grand Swim Up Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GS',
      suiteType: 'Especial 30%',
      description: 'Grand Governor Suite',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'SUPF1',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe King 1',
      maxPax: 6,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'SUPF2',
      suiteType: 'Especial 30%',
      description: 'Family Superior Deluxe Double2',
      maxPax: 0,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GP1',
      suiteType: 'Presidencial 60%',
      description: 'Grand Presidencial Suite Pgde',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GP2',
      suiteType: 'Presidencial 60%',
      description: 'Grand Presidencial Suite Pchi',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GP2K',
      suiteType: 'Presidencial 60%',
      description: 'Grand Presidential P2K',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'A1',
      suiteType: 'Presidencial 60%',
      description: 'Grand Aqua Presidential Suite',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'A2D',
      suiteType: 'Presidencial 60%',
      description: 'Grand Aqua Presidential Suited',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'S1',
      suiteType: 'Presidencial 60%',
      description: 'Grand Swim Up S1K',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'S2',
      suiteType: 'Presidencial 60%',
      description: 'Grand Swim Up S2K',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 9,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'D1K',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Diamond Suite King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 9,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'D2D',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Diamond Suite Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 10,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'VT1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 10,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'VT2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite 2',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 10,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'VT3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Villa Three Bedroom Suite 3',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 11,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GV1',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 1 King',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 11,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GV2',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 2 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 11,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GV3',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 3 Double',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 11,
      hotelCode: 'MPG',
      hotel: 'MOON PALACE THE GRAND',
      roomCode: 'GV4',
      suiteType: 'Exclusiva (BPG o Tarifa)',
      description: 'Grand Luxury Villa 4 King',
      maxPax: 2,
      isFamiliar: true
    }
  ],
  PL: [
    {
      orderPosition: 1,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'SUP',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Parcial Ocea',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'SUP-OV',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Ocean View',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'SAND',
      suiteType: 'Especial 30%',
      description: 'Walk Out Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'GS',
      suiteType: 'Especial 30%',
      description: 'Gobernador Suite',
      maxPax: 4,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'PL',
      hotel: 'PLAYACAR PALACE',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 4,
      isFamiliar: true
    }
  ],
  SP: [
    {
      orderPosition: 1,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'OS',
      suiteType: 'Estandar 20%',
      description: 'Standar Ocean View Double',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 2,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'JRS',
      suiteType: 'Especial 30%',
      description: 'Junior Suite / Ocean View',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 3,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'SUP-OV',
      suiteType: 'Estandar 20%',
      description: 'Superior Deluxe / Ocean View',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 4,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'CNG',
      suiteType: 'Especial 30%',
      description: 'Concierge Honeymoon',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 5,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'GS',
      suiteType: 'Especial 30%',
      description: 'Gobernador Suite',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 6,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'PS1',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 1',
      maxPax: 2,
      isFamiliar: false
    },
    {
      orderPosition: 6,
      hotelCode: 'SP',
      hotel: 'SUN PALACE',
      roomCode: 'PS2',
      suiteType: 'Presidencial 60%',
      description: 'Presidential Suite 2',
      maxPax: 2,
      isFamiliar: false
    }
  ],
  LUVE: [
    {
      orderPosition: 1,
      hotelCode: 'LUVE',
      hotel: 'BAGLIONI HOTEL LUNA',
      roomCode: 'JSU',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    }
  ],
  BAMA: [
    {
      orderPosition: 1,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'BV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 2,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'WV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 3,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'WVS',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 4,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'PWV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 5,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'PBV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 6,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'PGBV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 7,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'PSBV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 8,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'FBV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 9,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: '2PSBV',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    },
    {
      orderPosition: 10,
      hotelCode: 'BAMA',
      hotel: 'BAGLIONI RESORT MALDIVES',
      roomCode: 'PRE',
      suiteType: 'Estandar 20%',
      description: 'Junior Suite W/ Jacuzzi',
      maxPax: 2,
      isFamiliar: true
    }
  ]
}
