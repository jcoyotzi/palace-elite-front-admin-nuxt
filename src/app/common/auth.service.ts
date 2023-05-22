import appClient from '../../../src/app/common/clients/app.client'
import {AffiliationCredentialsResponse} from '@/src/app/auth/domain/entities/affiliationCredentialsResponse'
import {AffiliationCredentials} from '@/src/app/auth/domain/entities/affiliationCredentials'
import {PreLoginStatus} from '@/src/app/auth/domain/enum/PreLogin'

export const affiliationApiUrl = process.env.affiliationApiUrl as string | undefined
export const userApiUrl = process.env.apiUrl as string | undefined

export async function getAffiliationCredentials(
  affiliationNumber: string
): Promise<AffiliationCredentials> {
  // if (affiliationApiUrl) {
  //   const { data } = await appClient.post<AffiliationCredentialsResponse>(
  //     'dev/login',
  //     { affiliationNumber },
  //     {
  //       baseURL: affiliationApiUrl,
  //     }
  //   )
  //   return affiliationCredentialsAdapt.apiToApp(data)
  // }

  if (affiliationNumber === '4044216') {
    return {
      affiliationId: '952e741f-42cb-4f67-b507-a97de65f8fb9',
      email: 'mail@mail.com',
      affiliationNumber
    }
  }

  throw new Error('El usuario o la contraseña son invalidos')
}

export async function getCurrentUser(): Promise<any> {
  // TODO:
  // await new Promise((resolve) => setTimeout(resolve, 100))
  // if (userApiUrl) {
  //   const { data } = await appClient.get(
  //     'dev/user_affiliation',
  //     {
  //       baseURL: userApiUrl,
  //     }
  //   )
  //   return userAdapt.apiToApp(data)
  // }

  return {
    affiliationId: '1001584',
    name: 'Rodolfo',
    lastname: 'Dzul',
    countryResident: 'México',
    email: 'rdzul@palaceresorts.com',
    bussinessName: 'SR',
    company: 5,
    isNational: true
  }
}

export async function preLogin(affiliationNumber: number, email: string) {
  const url = `pe-login/api/v1/pre-login?affiliationNumber=${affiliationNumber}&email=${email}`

  const {data} = await appClient.get<{
    data: {
      preLoginStatus: PreLoginStatus
    }
    warnings: string[]
  }>(url)
  return data
}

export default {
  getAffiliationCredentials,
  getCurrentUser
}
