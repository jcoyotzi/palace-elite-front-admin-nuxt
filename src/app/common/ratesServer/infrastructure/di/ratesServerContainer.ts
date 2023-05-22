import {ContainerModule, interfaces} from 'inversify'
import {HttpRates} from '../../../../common/ratesServer/domain/httpRates'
import AxiosRatesServer from '../AxiosRatesServer'
import ratesTypes from './ratesTypes'

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<HttpRates>(ratesTypes.ratesServer).to(AxiosRatesServer)
})
