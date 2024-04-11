import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'

const Viewcourse = () => {
  const [user, setuser] = useState([])

  const navigate = useNavigate()
  // console.log(user)
  useEffect(() => {
    enroll()
  }, [])
  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/course/users')
      console.log(result)
      setuser(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handledelete = (user) => {
    axios.delete('http://localhost:5000/course/users/' + user._id)
  }

  const adduser = () => {
    navigate('/course/add')
  }

  return (
    <>
      <div className=" bg-light   rounded-4 ">
        <div className="d-flex justify-content-between border-bottom">
<<<<<<< HEAD:src/views/base/viewcourse/Viewcourse.js
          <h2 className=" h2   p-2 px-3">Courses</h2>
=======
          <h2 className=" h2   p-2 px-3 text-dark">View User</h2>
>>>>>>> 0130a104d323b87c46d3ec9f76aa5bdaeb624f49:src/views/base/breadcrumbs/Breadcrumbs.js
          <button className="btn m-3  btn-info" on onClick={adduser}>
            Add user
          </button>
        </div>
        <div className=" bg-light rounded p-3 ">
          <table className="table ">
            <thead>
              <tr>
                <th>Id</th>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.coursename}</td>
                  <td>{user.duration}</td>

                  <td>
                    <Link to={`/course/update/${user._id}`} className="text-warning d-inline h3 ">
                      <FaMessage />
                    </Link>
                    <h3 className="text-danger d-inline ms-3 " onClick={() => handledelete(user)}>
                      <FaTrash />
                    </h3>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Viewcourse
