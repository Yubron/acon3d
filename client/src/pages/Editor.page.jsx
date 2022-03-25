import React, { useEffect } from 'react'
import { MainContainer } from '../common'
import ProductTableComponent from '../components/ProductTable.component'
import { useGetPendingProducts } from '../hooks/useQuery/useProduct'
import { useNavigate } from 'react-router-dom';
import LoadingPage from './Loading.page'

const EditorPage = () => {
  const { data, isLoading } = useGetPendingProducts({})
  const navigate = useNavigate()
  
  useEffect(() => {
    if(localStorage.getItem('role') !== 'editor') {
      alert('do not have permission')
      navigate('/')
    }
  }, [])
  
  if(isLoading) {
    return <LoadingPage />
  }

  return (
    <MainContainer>
      <ProductTableComponent products={data}/>
    </MainContainer>
  )
}

export default EditorPage