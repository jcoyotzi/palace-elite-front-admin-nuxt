import {ContainerModule, interfaces} from 'inversify'
import httpTypes from '../../common/types/httpTypes'
import {HttpApi} from '../common/domain/entity/httpApi'
import AxiosServer from './axiosServer'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<HttpApi>(httpTypes.axiosServer).to(AxiosServer)
})
