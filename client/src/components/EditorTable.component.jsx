import React from 'react'
import { MainContainer } from '../common'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
const EditorTableComponent = ({products}) => {
  const navigate = useNavigate()
  return (
    <MainContainer>
      <Table>
        <thead>
          <tr>
            <th> id </th>
            <th> titleKr </th>
            <th> contentKr </th>
            <th> titleUs </th>
            <th> contentUs </th>
            <th> titleCn </th>
            <th> contentCn </th>
            <th> price </th>
            <th> writer </th>
            <th> created date </th>
          </tr>
        </thead>
        <tbody>
          {
            products.map(product => {
              const {id, titleKr, titleUs, titleCn, contentKr, contentUs, contentCn, price, email, createDate} = product
              return (
                <tr key={id} onClick={() => navigate(`/product/${id}`, {state: {product: product}})}>
                  <td> {id} </td>
                  <td> {titleKr ? titleKr : 'null'} </td>
                  <td> {contentKr ? contentKr : 'null'} </td>
                  <td> {titleUs ? titleUs : 'null'} </td>
                  <td> {contentUs ? contentUs : 'null'} </td>
                  <td> {titleCn ? titleCn : 'null'} </td>
                  <td> {contentCn ? contentCn : 'null'} </td>
                  <td> {price} </td>
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

export default EditorTableComponent

const Table = styled.table`
  width: 70%
`