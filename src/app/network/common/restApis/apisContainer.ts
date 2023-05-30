import {ContainerModule, interfaces} from 'inversify'
import {StrapiHttpApi} from '../restApis/strapiHttpApi'
import { HttpApi } from '../domain/entity/httpApi'
import { ApiUrl } from './apiUrl'
import httpTypes from '~/src/app/common/types/httpTypes'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<HttpApi>(httpTypes.apiUrl).to(ApiUrl)
  bind<HttpApi>(httpTypes.strapiHttpApi).to(StrapiHttpApi)
})
