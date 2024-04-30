import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const Viewtrainer = () => {
  const [trainer, setTrainer] = useState([])
  const [visible, setVisible] = useState(false)
  const [currenttrainer, setCurrenttrainer] = useState()
  const navigate = useNavigate()
  const [msg, setMsg] = useState()
  const [pagelinks, setPagelinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const userperpage = 10
  let pagerange = []
  const [totalitem, setTotalitem] = useState()
  const [error, setError] = useState()

  useEffect(() => {
    enroll(1)
    pagination()
  }, [])

  const pageLinkclick = (pagenumber) => {
    enroll(pagenumber)
  }

  async function enroll(pagenumber) {
    try {
      setCurrentPage(pagenumber)
      let result = await axios.get(`http://localhost:5000/trainers?page=${pagenumber}`)
      console.log(currentPage)
      console.log(pagenumber)
      setTrainer(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  async function pagination() {
    try {
      const total = await axios.get('http://localhost:5000/trainers/total')
      const totalitem = total.data
      setTotalitem(totalitem)
      const pagecount = Math.ceil(totalitem / userperpage)
      // console.log(pagecount)

      pagerange = [...Array(pagecount).keys()].map((i) => i + 1)

      setPagelinks(pagerange)
    } catch (err) {
      console.log(err)
    }
  }

  const handledelete = (user) => {
    setCurrenttrainer(user)
    setVisible(!visible)
  }
  const deleteitem = async () => {
    try {
      let results = await axios.delete('http://localhost:5000/trainers/' + currenttrainer._id)
      console.log(results)
      setMsg(results.data)
      console.log('result:', results.data)

      setVisible(false)
      enroll()
    } catch (err) {
      setError(err.response.data)
      setVisible(false)
    }
  }

  const addtrainer = () => {
    navigate('/trainer/add')
  }
  return (
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
      {error && <p className="alert alert-danger">{error}</p>}

      <div className=" card  rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom">
          <h2 className=" h2   p-2 px-3">
            Trainers <span className="h5 text-success">({totalitem})</span>
          </h2>
          <button className="btn m-3  btn-info" onClick={addtrainer}>
            Add Trainer
          </button>
        </div>
        <div className="   ">
          <table className="table ">
            <thead>
              <tr>
                <th>Trainer Name</th>
                <th>Trainer Email</th>
                <th>Mobile Number</th>
                <th>Course Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {trainer.map((user) => (
                <tr key={user._id}>
                  <td>{user.tname}</td>
                  <td>{user.email}</td>
                  <td>{user.mobile}</td>
                  <td>{user.course.coursename}</td>
                  <td>{user.date}</td>

                  <td>
                    <Link to={`/trainer/update/${user._id}`} className="text-warning d-inline h3 ">
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
          {pagelinks.map((pagenumber) => (
            <button
              key={pagenumber}
              className={`page-button m-1 px-2 ${currentPage === pagenumber ? 'bg-dark' : ''} text-info  rounded-2`}
              onClick={() => pageLinkclick(pagenumber)}
            >
              {pagenumber}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default Viewtrainer
