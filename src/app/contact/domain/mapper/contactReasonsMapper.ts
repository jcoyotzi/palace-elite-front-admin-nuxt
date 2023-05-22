import {ContactReasonDto, Departament, IDepartment} from '../dto/contactFromDto'

export class ContactReasonsMapper {
  static mapReasons(ReasonsObject: ContactReasonDto) {
    const iAmAMember = ReasonsObject.data.attributes.iAmAMember
    const iAmNotAMember = ReasonsObject.data.attributes.iAmNotAMember

    if (!iAmAMember && !iAmNotAMember) return

    return {
      member: this.mapReasonsArray(iAmAMember),
      notMember: this.mapReasonsArray(iAmNotAMember)
    }
  }

  static mapReasonsArray(props: Departament[]): IDepartment[] {
    const propertiesMapped: IDepartment[] = props.map(prop => {
      return {
        id: prop.id,
        name: prop.name,
        emails: prop.emails,
        resorts: prop.resorts.map(resort => ({
          id: resort.id,
          emails: resort.emails,
          title: resort.resort.data.attributes.title,
          externalId: resort.resort.data.attributes.externalId,
          comingSoon: resort.resort.data.attributes.comingSoon,
          comingSoonLabel: resort.resort.data.attributes.comingSoonLabel
        }))
      }
    })

    return propertiesMapped
  }
}
