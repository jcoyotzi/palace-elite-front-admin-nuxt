import 'reflect-metadata'
import roomAccessRelated from '../domain/data/roomAccessRelated.mock'
import {GetRoomNoRelated} from '../../../app/roomAccess/application/getRoomNoRelated'

const getRoomNoRelated = new GetRoomNoRelated()

describe('Obtener cuartos sin relación', () => {
  it('Encontrar 1 cuarto que no tenga relación con otra habitación', async () => {
    const roomsWithoutComplement = await getRoomNoRelated.run(roomAccessRelated as any)
    expect(roomsWithoutComplement.length).toBe(1)
  })
})
