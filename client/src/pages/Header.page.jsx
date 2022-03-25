import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Header = () => {

  return (
    <HeaderContainer>
      <ButtonFrame>
        <button> <Link to='/register'> REGISTER </Link> </button>
        <button> <Link to='/login'> LOGIN </Link> </button>
      </ButtonFrame>

      <h2> PAGE </h2>
      <ButtonFrame>
        <button> <Link to='/'> GUEST PAGE </Link> </button>
        <button> <Link to='/writer'> WRITER PAGE </Link> </button>
        <button> <Link to='/editor'> EDITOR PAGE </Link> </button>
      </ButtonFrame>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.div`
  width: 100%;
  background-color: blue;
  margin-bottom: 30px;
`

const ButtonFrame = styled.div`
  width: 13%;
  background-color: pink;
  display: flex;
  justify-content: space-between
`