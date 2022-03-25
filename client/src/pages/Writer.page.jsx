import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MainContainer } from '../common'
import { useCreateProduct } from '../hooks/useQuery/useProduct'

const WriterPage = () => {
  const navigate = useNavigate()
  const createProduct = useCreateProduct()
  
  useEffect(() => {
    if(localStorage.getItem('role') !== 'writer') {
      alert('do not have permission')
      navigate('/')
    }
  }, [])

  const [createProductDto, setCreateProductDto] = useState({
    title: 'title',
    content: 'content',
    price: 1000
  })
  
  const changeHandler = e => {
    setCreateProductDto({...createProductDto, [e.target.name]: e.target.value})
  }

  return (
    <MainContainer>
      <label> TITLE </label>
      <input type={'text'} name={'title'} value={createProductDto.title} onChange={changeHandler}/> 

      <label> CONTENT </label>
      <input type={'text'} name={'content'} value={createProductDto.content} onChange={changeHandler}/> 

      <label> PRICE </label>
      <input type={'number'} name={'price'} value={createProductDto.price} onChange={changeHandler}/> 

      <button onClick={() => createProduct.mutate(createProductDto)}> Create </button>
    </MainContainer>
  )
}

export default WriterPage