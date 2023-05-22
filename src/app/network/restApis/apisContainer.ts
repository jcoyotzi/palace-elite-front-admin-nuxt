import {ContainerModule, interfaces} from 'inversify'
import httpTypes from '../../common/types/httpTypes'
import {HttpApi} from '../common/domain/entity/httpApi'
import {IntelligenceXHttpApi} from '../restApis/intelligenceXHttpApi'
import {LegacyHttpApi} from '../restApis/legacyHttpApi'
import {AmazonHttpApi} from '../restApis/amazonHttpApi'
import {StrapiHttpApi} from '../restApis/strapiHttpApi'
import {ApiUrl} from './apiUrl'
import {ApiUrlWithoutToken} from './apiUrlWithoutToken'
import {IntelligenceXWithoutToken} from './IntelligenceXWithoutToken'
import {RatesApi} from './RatesApi'
import JsonApi from './jsonApi'
import {ExampleAuthFakeApi} from '~/src/app/network/restApis/exampleAuthFakeApi'
import {RatesCleverFakeApi} from '~/src/app/network/restApis/ratesCleverFakeApi'
import {RatesApiFake} from '~/src/app/network/restApis/RatesFakeApi'
// ADD HERE NEW APIS IMPORTS

export default new ContainerModule((bind: interfaces.Bind) => {
  bind<HttpApi>(httpTypes.jsonApi).to(JsonApi)
  bind<HttpApi>(httpTypes.ratesApi).to(RatesApi)
  bind<HttpApi>(httpTypes.ratesApiFake).to(RatesApiFake)
  bind<HttpApi>(httpTypes.ratesCleverFakeApi).to(RatesCleverFakeApi)
  bind<HttpApi>(httpTypes.intelligenceXHttpApi).to(IntelligenceXHttpApi)
  bind<HttpApi>(httpTypes.apiUrl).to(ApiUrl)
  bind<HttpApi>(httpTypes.apiUrlWithoutToken).to(ApiUrlWithoutToken)
  bind<HttpApi>(httpTypes.intelligenceXWithoutToken).to(IntelligenceXWithoutToken)
  bind<HttpApi>(httpTypes.amazonHttpApi).to(AmazonHttpApi)
  bind<HttpApi>(httpTypes.legacyApi).to(LegacyHttpApi)
  bind<HttpApi>(httpTypes.strapiHttpApi).to(StrapiHttpApi)
  bind<HttpApi>(httpTypes.exampleAuthFakeApi).to(ExampleAuthFakeApi)
  // ADD HERE NEW BINDS
})
