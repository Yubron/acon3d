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

  getApprovedProducts(page: number, displayLanguage: string) {
    const offset = (page-1) * 30
    
    return this.query(
      `
        SELECT 
          product."id",
          product."title${displayLanguage}" as "title", 
          product."content${displayLanguage}" as "content",
          product."price",
          product."createDate",
          product."updateDate",
          "user"."email"
        FROM product
        JOIN "user" on product."writerId" = "user"."id"
        WHERE "status" = 'approved'
        ORDER BY product."createDate" DESC
        OFFSET ${offset}
        LIMIT ${30}
      `
    )
  }

  getPendingProducts(page: number) {
    const offset = (page-1) * 30
    return this.query(
      `
        SELECT product.*, "user"."email"
        FROM product
        JOIN "user" on product."writerId" = "user"."id"
        WHERE "status" = 'pending'
        ORDER BY product."createDate" DESC
        OFFSET ${offset}
        LIMIT ${30}
      `
    )
  }
}