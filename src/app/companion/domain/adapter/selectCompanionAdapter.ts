import dayjs from 'dayjs'
import {MembershipTable} from 'app/common/domain/entities/membershipTable'

export interface PESelectDto {
  value: any
  text: string
  disable: boolean
}

export function getAgeFromBirthDay(date: string): number {
  if (date === '') {
    return 19
  }
  const birth = dayjs(date)
  const now = dayjs()
  return now.diff(birth, 'years')
}

/**
 * @deprecated selectCompanionAdapter
 */
export const selectCompanionAdapter = (
  items: MembershipTable[],
  showSeparator: boolean = false
) => {
  // Obtener la edad a partir del birthday
  if (!items) return []
  const workIntems = items.map(item => {
    return {
      ...item,
      age: getAgeFromBirthDay(item.memberUtils.BIRTHDAY)
    }
  })
  // Reglas de agrupacion
  // Adultos = 18 +
  const adults = workIntems.filter(item => item.age >= 18)
  // Children = 17 -
  const children = workIntems.filter(item => item.age < 18)

  // nombres de grupo

  const result: PESelectDto[] = []

  // TODO: Sacar de i18n
  if (showSeparator) {
    result.push({value: null, text: 'ADULTS', disable: true})
  }

  for (const item of adults) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {age, ...rest} = item
    result.push({
      value: rest,
      text: `${rest.memberUtils.firstname} ${rest.memberUtils.lastname}`,
      disable: false
    })
  }

  if (children !== undefined) {
    if (showSeparator) {
      result.push({value: null, text: 'CHILDREN', disable: true})
    }
    for (const item of children) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const {age, ...rest} = item
      result.push({
        value: rest,
        text: rest.memberUtils.firstname,
        disable: false
      })
    }
  }

  return result
}
