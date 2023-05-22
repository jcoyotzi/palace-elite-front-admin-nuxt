import {ContainerModule, interfaces} from 'inversify'
import {HttpJS} from '../../domain/httpJS'
import AxiosJsonServer from '../axiosJsonServer'
import jsonTypes from './jsonTypes'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<HttpJS>(jsonTypes.jsonServer).to(AxiosJsonServer)
})
