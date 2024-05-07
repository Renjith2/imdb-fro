import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Validation from './RegisterValidation';
import axios from 'axios'

function Register() {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
      event.preventDefault();
      setErrors(Validation(values));
  
      if (!errors.name && !errors.email && !errors.password) {
        console.log("Sending request with data:", values); 
          try {
              const response = await axios.post('http://localhost:8080/api/users/register', values);
              console.log(response.data);
              navigate('/');
          } catch (error) {
            if (error.response && error.response.status === 409) {
                // Email already exists
                setErrors({ email: 'Email already exists' });
            } else {
                console.error('Registration failed:', error.response ? error.response.data.error : error.message);
            }
          }
      }
  };
  

    return (
        <div className='d-flex justify-content-center align-items-center bg-primary' style={{ minHeight: '100vh' }}>
            <div className='bg-white p-3 rounded' style={{ width: '40%', maxWidth: '600px' }}>
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>Name</strong></label>
                        <input type='text' name='name' onChange={handleInput} placeholder='Enter Name!!!!!' className='form-control rounded-0' />
                        {errors.name && <span className='text-danger'>{errors.name}</span>}
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='email'><strong>Email</strong></label>
                        <input type='email' name='email' onChange={handleInput} placeholder='Enter Email!!!' className='form-control rounded-0' />
                        {errors.email && <span className='text-danger'>{errors.email}</span>}
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'> <strong>Password</strong></label>
                        <input type='password' name='password' onChange={handleInput} placeholder='Enter password' className='form-control rounded-0' />
                        {errors.password && <span className='text-danger'>{errors.password}</span>}
                    </div>
                    <button className='btn btn-success w-100 rounded-0'>Register</button>
                    <p>You have agreed to our terms and conditions</p>
                    <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Log-in</Link>
                </form>
            </div>
        </div>
    );
}

export default Register;
