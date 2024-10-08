import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Updatecourse = () => {
  const { id } = useParams()
  const [user, setUser] = useState({
    coursename: '',
    duration: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()

  const navigate = useNavigate()

  const back = () => {
    navigate('/course/view')
  }

  useEffect(() => {
    enroll()
  }, [])

  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/courses/' + id)
      console.log('result:', result)
      setUser(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const updatecourse = (e) => {
    e.preventDefault()
    console.log('update')
    update()

    // console.log(user)

    if (!error) {
      msg && navigate('/course/view')
    }
  }
  async function update() {
    try {
      const token = localStorage.getItem('token')

      // Set up the headers including the token
      const headers = {
        'Content-Type': 'application/json', // or any other content type you need
        'x-auth-token': token, // Add the token to the headers
      }
      let asser = await axios.put('http://localhost:5000/courses/' + id, user, { headers })
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
      <div className="  card border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2   p-2 px-3">Update Course</h2>
          <button className="btn m-3  btn-secondary " onClick={back}>
            Back
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label">
                Couse Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="Coruse Name"
                value={user.coursename}
                onChange={(e) => {
                  setUser({ ...user, coursename: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ">
            <label htmlFor="" className=" form-label">
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

export default Updatecourse
