import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Updatestudent = () => {
  const { id } = useParams()
  const [student, setStudent] = useState({
    student_name: '',
    student_email: '',
    student_mobile: '',
    student_address: '',
    student_education: '',
    batchid: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const [batch, setBatch] = useState([])
  const navigate = useNavigate()

  const back = () => {
    navigate('/student/view')
  }

  // batch get
  useEffect(() => {
    enrolls()
  }, [])

  async function enrolls() {
    try {
      let result = await axios.get('http://localhost:5000/batches')
      console.log(result)
      setBatch(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  // student get
  useEffect(() => {
    enroll()
  }, [])

  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/students/' + id)
      console.log('result:', result)
      setStudent(result.data)
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

  const updatestudent = (e) => {
    e.preventDefault()

    update()
    goToTop()

    // console.log(user)

    if (!error) {
      msg && navigate('/students/view')
    }
  }
  async function update() {
    try {
      let asser = await axios.put('http://localhost:5000/students/' + id, student)
      console.log(asser)
      setMsg(asser.data)

      setError()
    } catch (error) {
      console.log(error)
      console.log('error:', error.response.data)
      setError(error.response.data)
    }
  }
  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>
      <div className=" card  border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2   p-2 px-3">Update student</h2>
          <button className="btn m-3  btn-secondary " onClick={back}>
            Back
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
              {batch.map((batches) => (
                <option key={batches.batchname} value={batches._id}>
                  {batches.batchname}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start  my-3 ">
            <button className="btn btn-primary  px-3 " onClick={updatestudent}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Updatestudent
