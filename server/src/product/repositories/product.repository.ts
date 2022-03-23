import { Product } from "src/entities/product.entity"
import { User } from "src/entities/user.entity"
import { EntityRepository, Repository } from "typeorm"
import { CreateProductDto } from "../dtos/create-product.dto"

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  getAll() {    
    return this.query(
      `
        SELECT *
        FROM product
      `
    )
  }
  
  createProduct(createProductDto: CreateProductDto) {
    const { title, content, price, country } = createProductDto
    
    return this.query(
      `
        INSERT INTO product
          (title${country}, content${country}, price)
        VALUES
          ('${title}', '${content}', '${price}')
      `
    )
  }
}