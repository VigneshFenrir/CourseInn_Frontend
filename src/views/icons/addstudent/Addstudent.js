import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addstudent = () => {
  const [batches, setBatches] = useState([])
  const [courses, setCourses] = useState([])
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  // const { id } = useParams()
  const [student, setStudent] = useState({
    student_name: '',
    student_email: '',
    student_mobile: '',
    student_address: '',
    student_education: '',
    batchid: '',
    courseid: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    enroll(1)
    getCourse()
  }, [])
  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/batches')
      console.log(result)
      setBatches(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  async function getCourse() {
    try {
      let result = await axios.get('http://localhost:5000/courses')
      console.log(result)
      setCourses(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const savepost = (e) => {
    e.preventDefault()
    async function post() {
      try {
        const token = localStorage.getItem('token')

        // Set up the headers including the token
        const headers = {
          'Content-Type': 'application/json', // or any other content type you need
          'x-auth-token': token, // Add the token to the headers
        }
        let result = await axios.post('http://localhost:5000/students', student, { headers })
        console.log('result:', result)
        setMsg(result.data)
        goToTop()

        setStudent({
          student_name: '',
          student_email: '',
          student_mobile: '',
          student_address: '',
          student_education: '',
          batchid: '',
          courseid: '',
        })
        setError()
      } catch (err) {
        console.log(err)
        console.log('error:', err.response.data)

        setError(err.response.data)
        goToTop()
      }
    }

    post()
  }
  console.log(student)

  const viewall = () => {
    navigate('/student/view')
  }

  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className=" card  border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className="h2 px-3 my-3 ">Add Student</h2>
          <button className="btn btn-secondary m-3" onClick={viewall}>
            View Students
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <div>
              <label htmlFor="" className=" form-label">
                Student Name :
              </label>
            </div>
            <div className="">
              <input
                type="text"
                className="form-control ms-3 "
                placeholder="Batch Name"
                value={student.student_name}
                onChange={(e) => {
                  setStudent({ ...student, student_name: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Student Email :
            </label>
            <div className="me-3">
              <input
                type="email"
                placeholder="Student Email"
                value={student.student_email}
                onChange={(e) => {
                  setStudent({ ...student, student_email: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>
          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Student Mobile :
            </label>
            <div className="me-3">
              <input
                type="number"
                placeholder="Student Mobile "
                value={student.student_mobile}
                onChange={(e) => {
                  setStudent({ ...student, student_mobile: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>

          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Student Address :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Student Address "
                value={student.student_address}
                onChange={(e) => {
                  setStudent({ ...student, student_address: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>

          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Student Education :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Student Education "
                value={student.student_education}
                onChange={(e) => {
                  setStudent({ ...student, student_education: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <label htmlFor="" className="form-label">
              Batch Name :
            </label>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ps-3 ">
            <select
              name="Batchname"
              id=""
              className="form-select mx-3  "
              value={student.batchid}
              onChange={(e) => {
                setStudent({ ...student, batchid: e.target.value })
              }}
            >
              <option value="">Batch Name</option>
              {batches.map((batch) => (
                <option key={batch.batchname} value={batch._id}>
                  {batch.batchname}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <label htmlFor="" className="form-label">
              Course Name :
            </label>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ps-3 ">
            <select
              name="Coursename"
              id=""
              className="form-select mx-3  "
              value={student.courseid}
              onChange={(e) => {
                setStudent({ ...student, courseid: e.target.value })
              }}
            >
              <option value="">Course Name</option>
              {courses.map((course) => (
                <option key={course.coursename} value={course._id}>
                  {course.coursename}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start  my-3 ">
            <button className="btn btn-primary  px-3 " onClick={savepost}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Addstudent
