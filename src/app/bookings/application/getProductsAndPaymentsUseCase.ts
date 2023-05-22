import {injectable, inject} from 'inversify'
import UseCase from '../../common/application/UseCase'
import {Response} from '~/src/app/common/domain/entities/response'
import ProductsAndPayments from '../domain/entities/productsAndPayments'
import {GetProductsAndPaymentsDto} from '../domain/dto/getProductsAndPaymentsDto'
import bookingsTypes from '../../common/types/bookingsTypes'
import {BookingsRepository} from '../domain/repositories/bookingsRepository'

@injectable()
export default class GetProductsAndPaymentUseCase
  implements UseCase<ProductsAndPayments, Response<GetProductsAndPaymentsDto>>
{
  constructor(
    @inject(bookingsTypes.bookingsRepository)
    private readonly bookingsRepository: BookingsRepository
  ) {}

  async run(payload: ProductsAndPayments): Promise<Response<GetProductsAndPaymentsDto>> {
    const response = await this.bookingsRepository.getProductsAndPaymentUseCase(payload)

    // @ts-ignore
    return response.data!
  }
}
