import { Product } from "src/entities/product.entity"
import { User } from "src/entities/user.entity"
import { EntityRepository, Repository } from "typeorm"
import { ApproveProductDto } from "../dtos/approve-product.dto"
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
        RETURNING *
      `
    )
  }

  approveProduct(approveProductDto: ApproveProductDto, user: User) {
    const setList = []
    setList.push(`"editorId" = ${user.id}`)
    setList.push(`"status" = 'approved'`)
    for (const [key, value] of Object.entries(approveProductDto)) {
      if(key !== 'id') {
        setList.push(`"${key}" = '${value}'`)
      }
    }
    
    return this.query(
      `
        UPDATE product
        SET ${setList.join(',')}
        WHERE id = ${approveProductDto.id}
        RETURNING *
      `
    )
  }
}