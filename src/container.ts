import 'reflect-metadata'
import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
import apisContainer from './app/network/common/restApis/apisContainer'
import persistenceContainer from './app/common/infrastructure/persistence/persistence.container'
import pageContainer from './app/page/page.container'
import bpgContainer from './app/bpg/bpg.container'
import bookingContainer from './app/booking/booking.container'
import rulesContainer from './app/rules/rules.container'

const container = new Container()

container.load(
  ...[
    apisContainer,
    persistenceContainer,
    pageContainer,
    bpgContainer,
    bookingContainer,
    rulesContainer,
  ]
)

const { lazyInject } = getDecorators(container)

export { lazyInject, container }
