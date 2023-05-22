// @ts-nocheck
import {MembershipTable} from 'app/common/domain/entities/membershipTable'
import {
  selectCompanionAdapter,
  getAgeFromBirthDay
} from 'app/companion/domain/adapter/selectCompanionAdapter'

describe('selectAdapter', () => {
  it('getAgeFromBirthDay', () => {
    const birthday = '1953-01-01T00:00:00'
    const age = getAgeFromBirthDay(birthday)

    expect(age).toBe(69)
  })

  it('age grouper', () => {
    const data: MembershipTable[] = [
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        memberUtils: {
          isAdult: false,
          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Lola',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '1953-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        memberUtils: {
          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Juan',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '1972-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        memberUtils: {

          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Enrique',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '2010-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        memberUtils: {
          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Luz',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '2008-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        memberUtils: {

          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Daniel',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '1753-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      }
    ]

    const result = selectCompanionAdapter(data)
    expect(result.length).toBeGreaterThanOrEqual(data.length)
  })

  it('Group by Age', () => {
    const data: MembershipTable[] = [
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        // @ts-ignore
        memberUtils: {

          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Lola',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '1953-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        // @ts-ignore
        memberUtils: {

          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Lola',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '1972-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        // @ts-ignore
        memberUtils: {

          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Lola',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '2010-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        // @ts-ignore
        memberUtils: {

          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Lola',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '2008-01-01T00:00:00',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      },
      {
        name: 'string',
        tableData: [
          {
            data: [
              {
                title: ''
              }
            ]
          }
        ],
        // @ts-ignore
        memberUtils: {
          memberlevel: '',
          membertype: '',
          statusmembresia: '',
          firstname: 'Lola',
          lastname: 'López',
          password: '4564',
          email: 'asdfa',
          City: 'asdfa',
          Country: 'asdfa',
          Zip: 'asdfa',
          SocialSecurityNumber: 'asdfa',
          idprofileopera: 'asdfa',
          relationship: 5,
          idrelacionclub: 5,
          Language: 'asdfa',
          company: 5,
          BIRTHDAY: '',
          MemberProfileSocialNetwork: [
            {
              title: 'asdfa',
              value: 'asdfa'
            }
          ],
          mobilePhone: 'asdfa',
          homePhone: 'asdfa',
          officePhone: 'asdfa',
          application: 'asdfa',
          InReferral: 5,
          isGuest: false,
          IsNational: false,
          role: 'owner'
        }
      }
    ]

    const result = selectCompanionAdapter(data, true)

    expect(result.length).toBeGreaterThanOrEqual(data.length)
  })
})
