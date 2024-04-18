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
  const [currentbatch, setCurrentbatch] = useState()
  const navigate = useNavigate()
  const [msg, setMsg] = useState()

  useEffect(() => {
    enroll()
  }, [])

  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/batches')
      // console.log(result)
      setBatches(result.data)
    } catch (err) {
      console.log(err)
    }
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
          <h2 className=" h2 text-dark  p-2 px-3">Batches</h2>
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
      </div>
    </>
  )
}

export default Viewbatch
