import { useState } from 'react'
import axios from 'axios'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])

  const api = '/api/v1/users/signup'

  const handleSubmit = async (evt) => {
    evt.preventDefault()

    try {
      const response = await axios.post(api, {
        email,
        password,
      })
    } catch (error) {
      setErrors(error.response.data.errors)
    }
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
        <div className='alert alert-danger'>
          <h4>Oh no!</h4>
          <ul className='my-0'>
            {errors.map((error) => (
              <li key={error.message}>{error.message}</li>
            ))}
          </ul>
        </div>
        <button className='btn btn-primary'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup
