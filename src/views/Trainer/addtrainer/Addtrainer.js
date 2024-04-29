import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addtrainer = () => {
  const [courses, setCourse] = useState([])
  const [user, setUser] = useState({
    tname: '',
    email: '',
    mobile: '',
    courseid: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    enroll()
  }, [])
  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/courses')
      console.log(result)
      setCourse(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const savepost = (e) => {
    e.preventDefault()
    async function enroll() {
      try {
        console.log(user)
        let result = await axios.post('http://localhost:5000/trainers', user)
        console.log('result:', result)
        setMsg(result.data)
        setUser({
          tname: '',
          email: '',
          mobile: '',
          courseid: '',
        })
        navigate('/trainer/add')
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
    navigate('/trainer/view')
  }

  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className="  card border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className="h2 px-3 my-3 ">Add Trainer</h2>
          <button className="btn btn-secondary m-3" onClick={viewall}>
            View Trainers
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <div>
              <label htmlFor="" className=" form-label">
                Trainer Name :
              </label>
            </div>
            <div className="">
              <input
                type="text"
                className="form-control ms-3 "
                placeholder="Trainer Name"
                value={user.tname}
                onChange={(e) => {
                  setUser({ ...user, tname: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Trainer Email :
            </label>
            <div className="me-3">
              <input
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>
          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Trainer Mobile no :
            </label>
            <div className="me-3">
              <input
                type="number"
                placeholder="Mobile Number"
                value={user.mobile}
                onChange={(e) => {
                  setUser({ ...user, mobile: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <label htmlFor="" className="form-label">
              Course Name :
            </label>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ps-3 ">
            <select
              name="coursename"
              id=""
              className="form-select mx-3  "
              value={user.courseid}
              onChange={(e) => {
                setUser({ ...user, courseid: e.target.value })
              }}
            >
              <option value="">courses</option>
              {courses.map((course) => (
                <option key={course.coursename} value={course._id}>
                  {course.coursename}
                </option>
              ))}
            </select>
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

export default Addtrainer
