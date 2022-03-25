import React, { useState } from 'react'
import styled from 'styled-components'
import { MainContainer } from '../common'
import { useAuthLogin } from '../hooks/useQuery/useAuth'

const LoginPage = () => {
  const authLogin = useAuthLogin()
  
  const [loginDto, setLoginDto] = useState({
    email: 'guest@naver.com',
    password: 'qwer1234!',
  })
  
  const changeHandler = e => {
    setLoginDto({...loginDto, [e.target.name]: e.target.value})
  }

  return (
    <MainContainer>
      <LoginReigsterContainer>
        <label> EMAIL </label>
        <input type={'email'} name={'email'} value={loginDto.email} onChange={changeHandler} />

        <label> PASSWORD </label>
        <input type={'password'} name={'password'} value={loginDto.password} onChange={changeHandler} />

        <button onClick={() => authLogin.mutate(loginDto)}> LOGIN </button>
      </LoginReigsterContainer>  
    </MainContainer>
  )
}

export default LoginPage

const LoginReigsterContainer = styled.div`
  display: flex;
  flex-direction: column;
`