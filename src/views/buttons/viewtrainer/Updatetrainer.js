import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Updatetrainer = () => {
  const { id } = useParams()
  const [trainer, setTrainer] = useState({
    tname: '',
    email: '',
    mobile: '',
    courseid: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const [courses, setCourse] = useState([])
  const navigate = useNavigate()

  const back = () => {
    navigate('/trainer/view')
  }

  // course get
  useEffect(() => {
    enrolls()
  }, [])
  async function enrolls() {
    try {
      let result = await axios.get('http://localhost:5000/courses')
      console.log(result)
      setCourse(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  // trainer get
  useEffect(() => {
    enroll()
  }, [])

  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/trainers/' + id)
      console.log('result:', result)
      setTrainer(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  //  trainer update
  const updatecourse = (e) => {
    e.preventDefault()
    update()

    // console.log(user)

    if (!error) {
      msg && navigate('/trainer/view')
    }
  }
  async function update() {
    try {
      let asser = await axios.put('http://localhost:5000/trainers/' + id, trainer)
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
      <div className=" bg-white  border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2  text-dark p-2 px-3">Update Trainer</h2>
          <button className="btn m-3  btn-secondary " onClick={back}>
            Back
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
                value={trainer.tname}
                onChange={(e) => {
                  setTrainer({ ...trainer, tname: e.target.value })
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
                value={trainer.email}
                onChange={(e) => {
                  setTrainer({ ...trainer, email: e.target.value })
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
                value={trainer.mobile}
                onChange={(e) => {
                  setTrainer({ ...trainer, mobile: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ps-3 ">
            <select
              name="coursename"
              id=""
              className="form-select mx-3  "
              onChange={(e) => {
                setTrainer({ ...trainer, courseid: e.target.value })
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
          <div className="text-start ms-5 my-3 px-5">
            <button className="btn btn-primary mt-4 px-2" onClick={updatecourse}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Updatetrainer
