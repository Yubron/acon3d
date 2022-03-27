import React from 'react'
import { MainContainer } from '../common'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
const ProductTableComponent = ({products}) => {
  const navigate = useNavigate()
  return (
    <MainContainer>
      <Table>
        <thead>
          <tr>
            <th> id </th>
            <th> title </th>
            <th> content </th>
            <th> price </th>
            <th> writer </th>
            <th> created date </th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {
              const {id, title, content, localPrice, email, createDate} = product
              return (
                <tr key={id} onClick={() => navigate(`/product/${id}`, {state: {product: product}})}>
                  <td> {id} </td>
                  <td> {title} </td>
                  <td> {content} </td>
                  <td> {localPrice} </td>
                  <td> {email} </td>
                  <td> {createDate} </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </MainContainer>
  )
}

export default ProductTableComponent

const Table = styled.table`
  width: 70%
`