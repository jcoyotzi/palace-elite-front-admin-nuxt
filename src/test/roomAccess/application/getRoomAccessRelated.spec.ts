import 'reflect-metadata'
import roomAccessRelated from '../domain/data/roomAccessRelated.mock'
import {GetRoomAccessRelated} from 'app/roomAccess/application/getRoomAccessRelated'

const getRoomAccessRelated = new GetRoomAccessRelated()

describe('Unir cuartos si están relacionados', () => {
  it('Agrupar el cuarto SUPF1 y SUPF2 en uno solo', async () => {
    const result = await getRoomAccessRelated.run(roomAccessRelated as any)
    expect(result.length).toBe(1)
  })
})
