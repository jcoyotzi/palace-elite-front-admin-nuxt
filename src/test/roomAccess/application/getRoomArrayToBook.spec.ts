import 'reflect-metadata'
import roomAccessResponse from '../domain/data/roomAccessResponse.mock'
import GetRoomArrayToBook from 'app/roomAccess/application/getRoomArrayToBook'
import {GetRoomNoRelated} from 'app/roomAccess/application/getRoomNoRelated'
import {CreateLockOffRoomAccess} from 'app/roomAccess/application/createLockOffRoomAccess'

const createLockOffAccess = new CreateLockOffRoomAccess()
const getRoomNoRelated = new GetRoomNoRelated()
const getRoomArrayToBook = new GetRoomArrayToBook(getRoomNoRelated, createLockOffAccess)

describe('Acceso a cuartos con disponibilidad y lock off', () => {
  it('Regresar una lista de cuartos con lock off', async () => {
    const rooms = await getRoomArrayToBook.run(roomAccessResponse as any)
  })
})
