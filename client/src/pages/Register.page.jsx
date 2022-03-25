import React, { useState } from 'react'
import styled from 'styled-components'
import { MainContainer } from '../common'
import { useAuthRegister } from '../hooks/useQuery/useAuth'

const RegisterPage = () => {
  const authRegister = useAuthRegister()

  const [registerDto, setRegisterDto] = useState({
    email: 'guest@naver.com',
    password: 'qwer1234!',
    role: 'guest'
  })
  
  const changeHandler = e => {
    setRegisterDto({...registerDto, [e.target.name]: e.target.value})
  }

  return (
    <MainContainer >
      <ReigsterContainer>
        <label> email </label>
        <input type={'email'} name={'email'} value={registerDto.email} onChange={changeHandler}/>

        <label> password (default: qwer1234!) </label>
        <input type={'password'} name={'password'} value={registerDto.password} onChange={changeHandler}/>

        <label> role </label>
        <RadioContainer>
          <input type={'radio'} name={'role'} value={'guest'} checked={registerDto.role === 'guest'} onChange={changeHandler} /> 
          <label> guest </label>
        </RadioContainer>
        <RadioContainer>
          <input type={'radio'} name={'role'} value={'writer'} checked={registerDto.role === 'writer'} onChange={changeHandler} /> 
          <label> writer </label>
        </RadioContainer>
        <RadioContainer>
          <input type={'radio'} name={'role'} value={'editor'} checked={registerDto.role === 'editor'} onChange={changeHandler} /> 
          <label> editor </label>
        </RadioContainer>
        <button onClick={() => authRegister.mutate(registerDto)}> Register </button>
      </ReigsterContainer>
    </MainContainer>
  )
}

export default RegisterPage

const ReigsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
`

const RadioContainer = styled.div`
  display: flex;
`