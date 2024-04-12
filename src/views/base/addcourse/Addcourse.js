import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Addcourse = () => {
  const [coursename, setCoursename] = useState('')
  const [duration, setduration] = useState('')
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')

  const savepost = (e) => {
    e.preventDefault()
    const User = {
      coursename: coursename,
      duration: duration,
    }
    console.log(User)

    async function enroll() {
      try {
        let result = await axios.post('http://localhost:5000/course/users', User)
        console.log('result:', result)

        setMsg(result.data)
      } catch (err) {
        console.log(err)
        console.log('error:', err.response.data)
        setError(err.response.data)
      }
    }
    enroll()
  }
  return (
    <>
      <div className=" bg-white  border border-secondary rounded-3 ">
        <h2 className="h2 border-bottom p-3 text-dark">Add Courses</h2>
        <form action="" onSubmit={savepost} className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label text-dark">
                Course Name :
              </label>
            </div>

            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="course Name"
                onChange={(e) => {
                  setCoursename(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ">
            <label htmlFor="" className=" form-label text-dark">
              Duration :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Duration"
                onChange={(e) => {
                  setduration(e.target.value)
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>

          <div className="text-start ms-5 my-3 px-5">
            {!msg && <p className="text-danger">{error}</p>}
            {msg && <p className="text-success">{msg}</p>}
          </div>

          <div className="text-start ms-5 my-3 px-5">
            <input type="submit" className="btn btn-primary mt-4 px-2 " />
          </div>
        </form>
      </div>
    </>
  )
}

export default Addcourse
