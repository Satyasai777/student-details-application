import React,{ useState } from 'react'
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'

function UpdateStudent() {

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const {id} = useParams();
    const navigate = useNavigate();

    function handleSubmit(event){
        event.preventDefault();
        axios.put('http://localhost:8081/update/'+id,{name,email})
        .then(res => navigate('/home'))
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-info justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <h2>Update Student</h2>
            <form onSubmit={handleSubmit}>
                <div className='mt-3'>
                    <label>Name</label>
                    <input type='text' placeholder='Enter your name' className='form-control' onChange={e=>setName(e.target.value)}/>
                </div>
                <div className='mt-3'>
                    <label>Email</label>
                    <input type='email' placeholder='Enter your name' className='form-control' onChange={e=>setEmail(e.target.value)}/>
                </div>
                <button className='btn btn-success mt-3'>Update</button>
            </form>
        </div>
    </div>
  )
}

export default UpdateStudent