import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Home() {

    const [student,setStudent] = useState([]);
useEffect(()=>{
    axios.get('http://localhost:8081/home')
    .then(res => setStudent(res.data))
    .catch(err => console.log(err))
})


    function handleDelete(id){
        axios.delete('http://localhost:8081/student/'+id)
        .then(res => window.location.reload())
        .catch(err => console.log(err))
    }

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
        <div className='w-50 bg-white rounded p-3'>
            <Link to='/create' className='btn btn-outline-success'>Add +</Link>
            <table className='table table-striped table-dark mt-3'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        student.map((data,i)=>(
                        <tr key={i}>
                            <td>{i+1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>
                                <Link to={`/update/${data.id}`} className='btn btn-success'>Update</Link>
                                <button className='btn btn-danger ms-3' onClick={e=>handleDelete(data.id)}>Delete</button>
                            </td>
                        </tr>
                        ))
                    }  
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Home
