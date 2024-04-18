import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'

const Viewbatch = () => {
  const [batches, setBatches] = useState([])
  const [visible, setVisible] = useState(false)
  const [query, setQuery] = useState('')
  const [currentbatch, setCurrentbatch] = useState()
  const navigate = useNavigate()
  const [msg, setMsg] = useState()
  const [totalitem, setTotalitem] = useState()
  const [pageLinks, setPagelinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
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
      console.log(query)
      let result = await axios.get(`http://localhost:5000/batches?page=${page}&search=${query}`)
      // console.log(result)
      setBatches(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  // let totalitems
  async function pagination() {
    try {
      let totalCount = await axios.get('http://localhost:5000/batches/total')
      const totalitems = totalCount.data
      setTotalitem(totalitems)

      let pgCount = Math.ceil(totalitems / usersPerPage)

      pageRange = [...Array(pgCount).keys()].map((i) => i + 1)

      setPagelinks(pageRange)
    } catch (err) {
      console.log(err)
    }
  }
  const handleInputChange = (event) => {
    setQuery(event.target.value)

    // enroll(1)
  }

  const handledelete = (batch) => {
    setCurrentbatch(batch)
    setVisible(!visible)
  }
  const deleteitem = async () => {
    let results = await axios.delete('http://localhost:5000/batches/' + currentbatch._id)
    console.log(results)
    setMsg(results.data)
    console.log('result:', results.data)

    setVisible(false)
    enroll()
  }

  const addtrainer = () => {
    navigate('/batch/add')
  }
  const searchofbatch = () => {
    enroll(1)
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
      <div className=" bg-white   rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom">
          <h2 className=" h2 text-dark  p-2 px-3">
            Batches <span className="h5 text-success">({totalitem})</span>
          </h2>
          <div className="pt-3 ">
            <form className="col-12  d-flex  justify-content-between ">
              <input
                type="text"
                placeholder="search..."
                onChange={handleInputChange}
                value={query}
                className="form-control "
              />
              <button className="btn btn-primary ms-2" onClick={searchofbatch}>
                search
              </button>
            </form>
          </div>
          <button className="btn m-3  btn-info" onClick={addtrainer}>
            Add Batch
          </button>
        </div>
        <div className=" bg-light   ">
          <table className="table ">
            <thead>
              <tr>
                <th>Batch Name</th>
                <th>Start Time</th>
                <th>End Time </th>
                <th>Trainer Name</th>
                <th>Course Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch._id}>
                  <td>{batch.batchname}</td>
                  <td>{batch.start_time}</td>
                  <td>{batch.end_time}</td>
                  <td>{batch.trainer.tname}</td>
                  <td>{batch.trainer.course.coursename}</td>
                  <td>{batch.date}</td>

                  <td>
                    <Link to={`/batch/update/${batch._id}`} className="text-warning d-inline h3 ">
                      <FaMessage />
                    </Link>
                    <Link
                      className="text-danger d-inline ms-3 h3 "
                      onClick={() => handledelete(batch)}
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
  )
}

export default Viewbatch
