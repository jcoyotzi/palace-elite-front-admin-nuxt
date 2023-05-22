import 'reflect-metadata'
import detailAccessRoomWithLockOff from '../mock/detailAccessRoomWithLockOff.mock'
import roomAccessWithLock from '../mock/roomAccessWithLock.mock'
import {IsLockOffAvailable} from 'app/infoAccessRoom/application/isLockOffAvailable'
import {InfoAccessRoomHasLockOff} from 'app/infoAccessRoom/application/infoAccessRoomHasLockOff'

const infoAccessRoomHasLockOff = new InfoAccessRoomHasLockOff()
const isLockOffAvailable = new IsLockOffAvailable(infoAccessRoomHasLockOff)

const widgetDateRangeSelected = {
  from: '2022-01-15',
  to: '2022-01-30'
}

describe('Acceso lock off Disponible', () => {
  it('Validar si el usuario tiene acceso y están disponibles', async () => {
    const isAvailable = await isLockOffAvailable.run({
      access: detailAccessRoomWithLockOff as any,
      to: widgetDateRangeSelected.to,
      from: widgetDateRangeSelected.from,
      roomTypeAccess: roomAccessWithLock as any
    })

    expect(isAvailable).toBeTruthy()
  })
})
