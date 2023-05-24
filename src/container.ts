import 'reflect-metadata'
import { Container } from 'inversify'
import getDecorators from 'inversify-inject-decorators'
// import axiosServerContainer from './app/network/axiosServer/axiosServerContainer'
import persistenceContainer from './app/common/infrastructure/persistence/persistence.container'

const container = new Container()

container.load(
  ...[
    // axiosServerContainer,
    persistenceContainer,
  ]
)

const { lazyInject } = getDecorators(container)

export { lazyInject, container }
