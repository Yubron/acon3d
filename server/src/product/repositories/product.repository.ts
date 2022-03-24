import { Product } from "src/common/entities/product.entity"
import { User } from "src/common/entities/user.entity"
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
        RETURNING *
      `
    )
  }

  approveProduct(setList: string[], id: number) {
    return this.query(
      `
        UPDATE product
        SET ${setList.join(',')}
        WHERE id = ${id}
        RETURNING *
      `
    )
  }

  getApprovedProducts(offset: number, displayLanguage: string) {
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

  getPendingProducts(offset: number) {
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