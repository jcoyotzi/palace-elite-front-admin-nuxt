import {injectable} from 'inversify'
import dayjs from 'dayjs'
import UseCase from 'app/common/application/UseCase'
import {FindLockOffAccess} from 'app/infoAccessRoom/domain/findLockOffAccess'
import {LockOffAccessType} from 'app/infoAccessRoom/domain/data/lockOffAccessType'

@injectable()
export class InfoAccessRoomHasLockOff implements UseCase<FindLockOffAccess, boolean> {
  // eslint-disable-next-line require-await
  async run({access, from, to}: FindLockOffAccess): Promise<boolean> {
    const lockOffAvailable = access.filter(({IDTYPEROOM}) => LockOffAccessType.includes(IDTYPEROOM))

    if (lockOffAvailable.length === 0) {
      return false
    }

    return lockOffAvailable.some(({DATEFROM, DATETO}) => {
      const dateStart = dayjs(DATEFROM).subtract(1, 'day')
      const dateEnd = dayjs(DATETO).add(1, 'day')
      return dayjs(from).isAfter(dateStart) && dayjs(to).isBefore(dateEnd)
    })
  }
}
