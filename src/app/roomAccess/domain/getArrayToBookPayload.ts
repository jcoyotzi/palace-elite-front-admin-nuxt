import {RoomAccess} from "app/roomAccess/domain/entities/roomAccess";

export interface GetArrayToBookPayload {
  allRooms: RoomAccess[],
  hasLockOffAccess: boolean,
}
