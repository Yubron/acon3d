import React, { useEffect, useState } from 'react'
import { MainContainer } from '../common'
import { useGetPendingProducts } from '../hooks/useQuery/useProduct'
import { useNavigate } from 'react-router-dom';
import LoadingPage from './Loading.page'
import EditorTableComponent from '../components/EditorTable.component';

const EditorPage = () => {
  const { page, setPage } = useState(1)

  const { data, isLoading } = useGetPendingProducts({page: page})
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
      <EditorTableComponent products={data}/>
    </MainContainer>
  )
}

export default EditorPage