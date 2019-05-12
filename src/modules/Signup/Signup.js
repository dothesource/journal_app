import React, { useState } from 'react'
import Container from '../../components/Container'
import AppBar from '../../components/AppBar'
import api from '../../utils/api'
const Signup = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' })

  const handleEmailChange = event => {
    console.log(event.target.value);
    setUser({
      ...user,
      email: event.target.value
    })
  }

  const handleNameChange = event => {
    console.log(event.target.value);
    setUser({
      ...user,
      name: event.target.value
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
      register()
    }
  }

  const register = () => {
    api
      .register({user: user})
  }

  return (
    <div>
      <AppBar title='Register' />
      <Container>
        <input
          type="text"
          placeholder="Name"
          onChange={handleNameChange}
          onKeyPress={handleKeyPress}
        />
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

        <button onClick={register}>Register</button>
      </Container>
    </div>
  )
}
export default Signup
