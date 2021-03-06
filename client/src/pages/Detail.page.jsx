import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { MainContainer } from '../common'
import { useApproveProduct, useGetProduct } from '../hooks/useQuery/useProduct'
import LoadingPage from './Loading.page'

const DetailPage = () => {
  const { id } = useParams()
  
  const {data: product, isLoading, isSuccess} = useGetProduct(id)
  const approveProduct = useApproveProduct()
  
  const [ isReadonly, setIsReadonly ] = useState(true)
  const [ approveProductDto, setApproveProductDto ] = useState({})
  
  const changeHandler = (e) => {
    setApproveProductDto({...approveProductDto, [e.target.name]: e.target.value })
  }
  const approveProductHandler = (e) => {
    approveProduct.mutate(approveProductDto)
  }

  useEffect(() => {
    if(isSuccess) {
      setApproveProductDto({
        id: product.id,
        titleKr: product.titleKr,
        titleUs: product.titleUs,
        titleCn: product.titleCn,
        contentKr: product.contentKr,
        contentUs: product.contentUs,
        contentCn: product.contentCn,
        price: product.price,
        commission: product.commission
      })
      setIsReadonly(product.status === 'approved' ? true : false)
    }
  }, [isSuccess, product])
  if(isLoading) {
    return <LoadingPage />
  }
  
  return (  
    <MainContainer>
      <DetailContainer>
        <label> ID </label>
        <Input type={'text'} name={'id'} value={approveProductDto.id} readOnly/>

        <h2> TITLE </h2>
        <label> TITLE KR </label>
        <Input type={'text'} name={'titleKr'} value={approveProductDto.titleKr} onChange={changeHandler} readOnly={isReadonly}/>

        <label> TITLE US </label>
        <Input type={'text'} name={'titleUs'} value={approveProductDto.titleUs} onChange={changeHandler} readOnly={isReadonly}/>

        <label> TITLE CN </label>
        <Input type={'text'} name={'titleCn'} value={approveProductDto.titleCn} onChange={changeHandler} readOnly={isReadonly}/>

        <h2> CONTENT </h2>
        <label> CONTENT KR </label>
        <Textarea type={'text'} name={'contentKr'} value={approveProductDto.contentKr} onChange={changeHandler} readOnly={isReadonly}/>

        <label> CONTENT US </label>
        <Textarea type={'text'} name={'contentUs'} value={approveProductDto.contentUs} onChange={changeHandler} readOnly={isReadonly}/>

        <label> CONTENT CN </label>
        <Textarea type={'text'} name={'contentCn'} value={approveProductDto.contentCn} onChange={changeHandler} readOnly={isReadonly}/>

        <h2> PRICE </h2>
        <label> PRICE </label>
        <Input type={'number'} name={'price'} value={approveProductDto.price} onChange={changeHandler} readOnly={isReadonly}/>

        <label> COMMISION </label>
        <Input type={'number'} name={'commission'} value={approveProductDto.commission} onChange={changeHandler} readOnly={isReadonly}/>

        {
          isReadonly
          ? <button onClick={() => {}}> BUY </button>
          : <button onClick={approveProductHandler}> APPROVE </button>
        }
        
      </DetailContainer>
    </MainContainer>
  )
}

export default DetailPage

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`

const Input = styled.input`
  margin-bottom: 20px;
`

const Textarea = styled.textarea`
  margin-bottom: 20px;
  resize: none;
`