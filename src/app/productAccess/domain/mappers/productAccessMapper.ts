import {Product, Detail, ProductAccessData} from '../dto/productAccessDto'
import {ProductAccessEntity} from '../entities/productAccess'

export class ProductAccessMapper {
  static map(productAccesss: ProductAccessData): ProductAccessEntity[] {
    return this.matchProductsDetails(productAccesss._PRODUCTS, productAccesss._DETAILS)
  }

  static matchProductsDetails(products: Product[], details: Detail[]): ProductAccessEntity[] {
    return products.flatMap(product => {
      const detail = details.find(detail => detail.IDPRODUCTO === product.IDPRODUCTO)
      return detail ? {...product, ...detail} : []
    })
  }
}
