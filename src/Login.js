import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Validation from './LoginValidation'
import {axiosInstance as axios}  from "./apicalls"
function Login() {
    const navigate=useNavigate()
    const [values,setValues]=useState({
        email:"",
        password:""
    })
    const [errors,setErrors]=useState({})
    const handleInput=async (event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))

    }

    const handleSubmit= async (event)=>{
        event.preventDefault()
        setErrors(Validation(values))
        
        if(!errors.email && !errors.password){
            try{
              console.log("Hiii")
            const response = await axios.post('api/users/login',values)
            console.log(response)
            localStorage.setItem('token',response.data.token)
            navigate('/home')
        }
        catch(error){
            console.error('Login failed:', error.response.data.error);
            console.log(error.response);
        }
    }
        
    }
   
  return (
    <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
        <div className='bg-white p-3 rounded w-25'>
            <h2>Log-in</h2>
            <form action='' onSubmit={handleSubmit}>
            <div className='mb-3'>
           <label htmlFor='email'><strong>Email</strong></label>
           <input type='email' name='email'  onChange={handleInput} placeholder='Enter Email!!!' className='form-control rounded-0' />
           {errors.email && <span className='text-danger'> {errors.email}</span>}
            </div>
            <div className='mb-3'>
                <label htmlFor='password'> <strong>Password</strong></label>
                <input type='password' name='password' onChange={handleInput} placeholder='Enter password'className='form-control rounded-0'/>
                {errors.password && <span className='text-danger'> {errors.password}</span>}
            </div>
            <button type='submit' className='btn btn-success w-100 rounded-0'>Log in</button>
            <p>You have agreed to our terms and conditions</p>
            <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create Account</Link>
            </form>

        </div>
    </div>
  )
}

export default Login



