import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const Viewcourse = () => {
  const [user, setuser] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentuser, setCurrentuser] = useState()
  const [msg, setMsg] = useState()

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
    setCurrentuser(user)
    setVisible(!visible)
  }
  const deleteitem = async () => {
    let results = await axios.delete('http://localhost:5000/course/users/' + currentuser._id)
    console.log(results)
    console.log('result:', results.data)
    setMsg(results.data)
    setVisible(false)
    enroll()
  }

  const adduser = () => {
    navigate('/course/add')
  }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Confirm Delete</CModalTitle>
        </CModalHeader>
        <CModalBody className="h5">Are you sure you want to delete this item ?</CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
          <CButton color="danger" onClick={deleteitem}>
            Delete
          </CButton>
        </CModalFooter>
      </CModal>
      {msg && <p className="alert alert-success">{msg}</p>}
      <div className=" bg-white   rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom">
          <h2 className=" h2 text-dark  p-2 px-3">Courses</h2>

          <button className="btn m-3  btn-info" on onClick={adduser}>
            Add course
          </button>
        </div>
        <div className=" bg-light   ">
          <table className="table ">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((user) => (
                <tr key={user._id}>
                  <td>{user.coursename}</td>
                  <td>{user.duration}</td>
                  <td>{user.date}</td>

                  <td>
                    <Link to={`/course/update/${user._id}`} className="text-warning d-inline h3 ">
                      <FaMessage />
                    </Link>
                    <Link
                      className="text-danger d-inline ms-3 h3 "
                      onClick={() => handledelete(user)}
                    >
                      <FaTrash />
                    </Link>
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
