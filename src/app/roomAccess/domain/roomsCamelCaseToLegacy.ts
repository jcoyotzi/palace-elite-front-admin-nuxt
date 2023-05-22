import {RoomAccess} from "app/roomAccess/domain/entities/roomAccess";

export function RoomsCamelCaseToLegacy(roomAccessNoLegacy: any[]): RoomAccess[] {
  const rooms: RoomAccess[] = []

  for (const roomAccessNoLegacyElement of roomAccessNoLegacy) {
    rooms.push({
      haveAccess: roomAccessNoLegacyElement.haveAccess,
      CLVRoomTypeCategory: roomAccessNoLegacyElement.cLVRoomTypeCategory,
      Category: roomAccessNoLegacyElement.category,
      RealCode: roomAccessNoLegacyElement.realCode,
      RoomArea: roomAccessNoLegacyElement.roomArea ?? undefined,
      availability: roomAccessNoLegacyElement.availability,
      bookingTerms: roomAccessNoLegacyElement.bookingTerms,
      chg_date: roomAccessNoLegacyElement.chg_date ?? "",
      chg_oper: roomAccessNoLegacyElement.chg_oper ?? "",
      chg_term: roomAccessNoLegacyElement.chg_term ?? "",
      chg_time: roomAccessNoLegacyElement.chg_time ?? "",
      code: roomAccessNoLegacyElement.code ?? "",
      description: roomAccessNoLegacyElement.description ?? "",
      doubleb: roomAccessNoLegacyElement.doubleb ?? "",
      eff_date: roomAccessNoLegacyElement.eff_date ?? "",
      ent_date: roomAccessNoLegacyElement.ent_date ?? "",
      ent_oper: roomAccessNoLegacyElement.ent_oper ?? "",
      ent_term: roomAccessNoLegacyElement.ent_term ?? "",
      ent_time: roomAccessNoLegacyElement.ent_time ?? "",
      hotel: roomAccessNoLegacyElement.hotel ?? "",
      infoAvailability: roomAccessNoLegacyElement.infoAvailability ?? null,
      isVirtual: roomAccessNoLegacyElement.isVirtual ?? false,
      king: roomAccessNoLegacyElement.king ?? 0,
      lockOffType: roomAccessNoLegacyElement.lockOffType ?? "",
      max_pers: roomAccessNoLegacyElement.max_pers ?? 0,
      max_priv: roomAccessNoLegacyElement.max_priv ?? 0,
      murphy: roomAccessNoLegacyElement.murphy ?? 0,
      ocn_view: roomAccessNoLegacyElement.ocn_view ?? "",
      operaId: roomAccessNoLegacyElement.operaId ?? "",
      pertenece: roomAccessNoLegacyElement.pertenece ?? "",
      promotionAccessRoom: roomAccessNoLegacyElement.promotionAccessRoom ?? undefined,
      queen: roomAccessNoLegacyElement.queen ?? 0,
      rate1: roomAccessNoLegacyElement.rate1 ?? 0,
      rate2: roomAccessNoLegacyElement.rate2 ?? 0,
      rate3: roomAccessNoLegacyElement.rate3 ?? 0,
      rate_add: roomAccessNoLegacyElement.rate_add ?? 0,
      recnum: roomAccessNoLegacyElement.recnum ?? 0,
      relRoomsCodes: roomAccessNoLegacyElement.relRoomsCodes ?? "",
      rooms: roomAccessNoLegacyElement.rooms ?? 0,
      totalRooms: roomAccessNoLegacyElement.totalRooms ?? 0
    })
  }

  return rooms;
}
