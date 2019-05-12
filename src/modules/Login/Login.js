import React, { useState } from 'react'
import Container from '../../components/Container'
import AppBar from '../../components/AppBar'
import api from '../../utils/api'
const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' })

  const handleEmailChange = event => {
    console.log(event.target.value);
    setUser({
      ...user,
      email: event.target.value
    })
  }

  const handlePasswordChange = event => {
    console.log(event.target.value);
    setUser({
      ...user,
      password: event.target.value
    })
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      login()
    }
  }

  const login = () => {
    api
      .login({user: user})
  }

  return (
    <div>
      <AppBar title='Login' />
      <Container>
        <input
          type="email"
          placeholder="Email"
          onChange={handleEmailChange}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          onKeyPress={handleKeyPress}
        />

        <button onClick={login}>Login</button>
      </Container>
    </div>
  )
}
export default Login
