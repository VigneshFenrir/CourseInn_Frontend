import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const Userview = () => {
  const [users, setusers] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentuser, setCurrentuser] = useState()
  const [msg, setMsg] = useState()
  const [pageLinks, setPagelinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const [totalitem, setTotalitem] = useState()
  const usersPerPage = 10
  let pageRange = []

  useEffect(() => {
    enroll(1)
    pagination()
  }, [])

  const pageLinkClick = (page) => {
    enroll(page)
  }
  async function enroll(page) {
    try {
      console.log(page)
      setCurrentPage(page)
      console.log(currentPage)
      let result = await axios.get(`http://localhost:5000/academy?page=${page}`)
      // console.log(result)
      setusers(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  // let totalitems
  async function pagination() {
    try {
      let totalCount = await axios.get('http://localhost:5000/academy/total')
      const totalitems = totalCount.data
      setTotalitem(totalitems)

      let pgCount = Math.ceil(totalitems / usersPerPage)

      pageRange = [...Array(pgCount).keys()].map((i) => i + 1)

      setPagelinks(pageRange)
    } catch (err) {
      console.log(err)
    }
  }

  const handledelete = (user) => {
    setCurrentuser(user)
    setVisible(!visible)
  }
  const deleteitem = async () => {
    let results = await axios.delete('http://localhost:5000/academy/' + currentuser._id)
    console.log(results)
    console.log('result:', results.data)
    setMsg(results.data)
    setVisible(false)
    enroll()
  }

  const adduser = () => {
    navigate('/user/add')
  }

  return (
    <>
      <>
        <CModal visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Confirm Delete</CModalTitle>
          </CModalHeader>
          <CModalBody className="">Are you sure you want to delete this item ?</CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
            <CButton color="danger" className="text-white" onClick={deleteitem}>
              Delete
            </CButton>
          </CModalFooter>
        </CModal>
        {msg && <p className="alert alert-success">{msg}</p>}
        <div className=" bg-white   rounded-4 ">
          <div className="d-flex  justify-content-between border-bottom">
            <h2 className=" h2 text-dark  p-2 px-3">
              Users <span className="h5 text-success">({totalitem})</span>
            </h2>
            <button className="btn m-3  btn-info" onClick={adduser}>
              Add User
            </button>
          </div>
          <div className=" bg-light   ">
            <table className="table ">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>User mobile</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.role}</td>
                    <td>{user.date}</td>

                    <td>
                      <Link to={`/user/update/${user._id}`} className="text-warning d-inline h3 ">
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
          <div className="pagination justify-content-center  ">
            {pageLinks.map((pageNumber) => (
              <button
                key={pageNumber}
                className={`page-button m-1 px-2 ${currentPage === pageNumber ? 'bg-dark' : ''} text-info  rounded-2`}
                onClick={() => pageLinkClick(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}
          </div>
        </div>
      </>
    </>
  )
}

export default Userview
