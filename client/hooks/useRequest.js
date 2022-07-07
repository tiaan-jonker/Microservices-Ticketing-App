import axios from 'axios'
import { useState } from 'react'

// Custom hook component that receives:
//    - url
//    - method
//    - body
// There will be function to execute the request and
// will capture and contain any errors after the req was made, if any

const useRequest = ({ url, method, body }) => {
  const [errors, setErrors] = useState(null)

  const executeRequest = () => {
    try {
      const response = await axios[method](url, body)
      return response.data
    } catch (error) {
      setErrors(
      <div className='alert alert-danger'>
        <h4>Oh no! You missed something:</h4>
        <ul className='my-0'>
          {errors.response.data.errors.map((error) => (
            <li key={error.message}>{error.message}</li>
          ))}
        </ul>
      </div>
    )
    }
  }

  return { executeRequest, errors }
}

export default useRequest
