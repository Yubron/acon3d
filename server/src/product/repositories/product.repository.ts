import { Product } from "src/entities/product.entity"
import { User } from "src/entities/user.entity"
import { EntityRepository, Repository } from "typeorm"
import { CreateProductDto } from "../dtos/create-product.dto"

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {  
  createProduct(createProductDto: CreateProductDto, user: User) {
    const { title, content, price, country } = createProductDto
    
    return this.query(
      `
        INSERT INTO product
          ("title${country}", "content${country}", "price", "writerId")
        VALUES
          ('${title}', '${content}', '${price}', '${user.id}')
      `
    )
  }
}