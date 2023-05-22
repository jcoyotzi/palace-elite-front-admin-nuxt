import {JwtToken} from '../entities/jwtToken'

export class JwtTokenMapper {
  public static parseJwt(token: string): JwtToken {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())
  }
}
