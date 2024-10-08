import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addcourse = () => {
  const [user, setUser] = useState({
    coursename: '',
    duration: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const navigate = useNavigate()

  const savepost = (e) => {
    e.preventDefault()
    async function enroll() {
      try {
        const token = localStorage.getItem('token')

        // Set up the headers including the token
        const headers = {
          'Content-Type': 'application/json', // or any other content type you need
          'x-auth-token': token, // Add the token to the headers
        }
        let result = await axios.post('http://localhost:5000/courses', user, { headers })
        console.log('result:', result)
        setMsg(result.data)
        setUser({
          coursename: '',
          duration: '',
        })
        setError()
      } catch (err) {
        console.log(err)
        console.log('error:', err.response.data)
        setError(err.response.data)
      }
    }

    enroll()
  }

  const viewall = () => {
    navigate('/course/view')
  }

  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className=" card  border border-secondary rounded-3  rocked">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className="h2 px-3 my-3 ">Add Course</h2>
          <button className="btn btn-secondary m-3" onClick={viewall}>
            View Courses
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <div>
              <label htmlFor="" className=" form-label">
                Course Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="Course Name"
                value={user.coursename}
                onChange={(e) => {
                  setUser({ ...user, coursename: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5 ">
            <label htmlFor="" className=" form-label text-bold">
              Duration :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Duration"
                value={user.duration}
                onChange={(e) => {
                  setUser({ ...user, duration: e.target.value })
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>

          <div className="text-start  my-3 px-5">
            <button className="btn btn-primary mt-4 px-3 " onClick={savepost}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Addcourse
