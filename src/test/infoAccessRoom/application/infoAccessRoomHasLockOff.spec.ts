import 'reflect-metadata'
import detailAccessRoomWithLockOff from '../mock/detailAccessRoomWithLockOff.mock'
import detailAccessRoomWithoutLockOff from '../mock/detailAccessRoomWithoutLockOff.mock'
import {InfoAccessRoomHasLockOff} from 'app/infoAccessRoom/application/infoAccessRoomHasLockOff'

const givenBookingDateRange = {
  from: '2022-01-15',
  to: '2022-01-30'
}

const infoAccessRoomHasLockOff = new InfoAccessRoomHasLockOff()

describe('Información del acceso a cuartos', () => {
  it('Debera regresar que el usuario si tiene acceso a habitación LockOff', async () => {
    const hasLockOff = await infoAccessRoomHasLockOff.run({
      from: givenBookingDateRange.from,
      to: givenBookingDateRange.to,
      access: detailAccessRoomWithLockOff as any
    })

    expect(hasLockOff).toBeTruthy()
  })

  it('Debera regresar que el no usuario si tiene acceso a habitación LockOff por los rangos de fechas', async () => {
    const hasLockOff = await infoAccessRoomHasLockOff.run({
      from: givenBookingDateRange.from,
      to: givenBookingDateRange.to,
      access: detailAccessRoomWithoutLockOff as any
    })

    expect(hasLockOff).toBeFalsy()
  })
})
