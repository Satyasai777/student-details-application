import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function CreateStudent() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/create',{name,email})
        .then(res => navigate('/home'))
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter your name' className='form-control' onChange={e=>setName(e.target.value)}/>
                </div>
                <div className='mt-3'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your Email
                    ' className='form-control' onChange={e=>setEmail(e.target.value)}/>
                </div>
                <button className='btn btn-success mt-3'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default CreateStudent