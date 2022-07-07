import { useState } from 'react'
import useRequest from '../../hooks/useRequest'

//@page-route  ticketing.dev/auth/signup
//? fix errors display bug, does not go away when entering valid creds

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { executeRequest, errors } = useRequest({
    url: '/api/v1/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
  })

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    executeRequest()
  }

  return (
    <div className='row g-3'>
      <form className='container-sm' onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <div className='form-group mb-3'>
          <label className='form-label'>Email Address</label>
          <input
            type='text'
            className='form-control'
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className='form-group mb-3'>
          <label>Password</label>
          <input
            type='password'
            className='form-control'
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        {errors ? errors : ''}
        <button className='btn btn-primary'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
