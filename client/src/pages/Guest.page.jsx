import React from 'react'
import { MainContainer } from '../common'
import ProductTableComponent from '../components/ProductTable.component'
import { useGetApprovedProducts } from '../hooks/useQuery/useProduct'
import LoadingPage from './Loading.page'

const GuestPage = () => {
  const {data, isLoading} = useGetApprovedProducts({})

  if(isLoading) {
    return <LoadingPage />
  }

  return (
    <MainContainer>
      <ProductTableComponent products={data}/>
    </MainContainer>
  )
}

export default GuestPage

