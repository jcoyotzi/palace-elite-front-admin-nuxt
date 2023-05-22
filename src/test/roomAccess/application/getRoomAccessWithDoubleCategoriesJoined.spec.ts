import 'reflect-metadata'
import roomAccess from '../domain/data/roomAccessResponse.mock'
import GetRoomAccessWithDoubleCategoriesJoined from '../../../app/roomAccess/application/getRoomAccessWithDoubleCategoriesJoined'
import {GetRoomAccessRelated} from 'app/roomAccess/application/getRoomAccessRelated'
import {GetRoomNoRelated} from 'app/roomAccess/application/getRoomNoRelated'

const getRoomNoRelated = new GetRoomNoRelated()
const getJoinedRoomsByRealCode = new GetRoomAccessRelated()

const getRoomAccessWithDoubleCategoriesJoined = new GetRoomAccessWithDoubleCategoriesJoined(
  getJoinedRoomsByRealCode,
  getRoomNoRelated
)

describe('Acceso a cuartos con categoría', () => {
  it('Regresar los cuartos y si tienen segunda parte unirlos en uno solo', async () => {
    const roomResult = await getRoomAccessWithDoubleCategoriesJoined.run(roomAccess as any)
    expect(roomResult.length).toBe(6)
  })
})
