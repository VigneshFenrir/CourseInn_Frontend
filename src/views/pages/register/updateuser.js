import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const updateuser = () => {
  const { id } = useParams()
  const [users, setUsers] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirm_password: '',
    role: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()

  const navigate = useNavigate()

  const back = () => {
    navigate('/user/view')
  }

  useEffect(() => {
    enroll()
  }, [])

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/academy/' + id)
      console.log('result:', result)
      setUsers(result.data)
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
      msg && navigate('/user/view')
    }
  }
  async function update() {
    try {
      let asser = await axios.put('http://localhost:5000/academy/' + id, users)
      console.log(asser)
      setMsg(asser.data)
      goToTop()
      setError()
    } catch (error) {
      console.log(error)
      console.log('error:', error.response.data)
      setError(error.response.data)
      goToTop()
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
          <h2 className=" h2  text-dark p-2 px-3">Update Users</h2>
          <button className="btn m-3  btn-secondary " onClick={back}>
            Back
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <div>
              <label htmlFor="" className=" form-label">
                User Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                placeholder="Name"
                value={users.name}
                onChange={(e) => {
                  setUsers({ ...users, name: e.target.value })
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5 ">
            <label htmlFor="" className=" form-label text-bold">
              User mail :
            </label>
            <div className="me-3">
              <input
                type="mail"
                placeholder="Email"
                value={users.email}
                onChange={(e) => {
                  setUsers({ ...users, email: e.target.value })
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5 ">
            <label htmlFor="" className=" form-label text-bold">
              User mobile :
            </label>
            <div className="me-3">
              <input
                type="number"
                placeholder="Mobile Number"
                value={users.mobile}
                onChange={(e) => {
                  setUsers({ ...users, mobile: e.target.value })
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5 ">
            <label htmlFor="" className=" form-label text-bold">
              Password :
            </label>
            <div className="me-3">
              <input
                type="password"
                placeholder="Password"
                value={users.password}
                onChange={(e) => {
                  setUsers({ ...users, password: e.target.value })
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5 ">
            <label htmlFor="" className=" form-label text-bold">
              Confirm Password :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Confirm Password"
                value={users.confirm_password}
                onChange={(e) => {
                  setUsers({ ...users, confirm_password: e.target.value })
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5 ">
            <label htmlFor="" className=" form-label text-bold">
              User Role :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Role"
                value={users.role}
                onChange={(e) => {
                  setUsers({ ...users, role: e.target.value })
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

export default updateuser
