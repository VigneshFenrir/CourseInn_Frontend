import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const Viewstudent = () => {
  const [user, setuser] = useState([])
  const [visible, setVisible] = useState(false)
  const [currentuser, setCurrentuser] = useState()
  const [msg, setMsg] = useState()
  const [pageLinks, setPagelinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const [totalitem, setTotalitem] = useState()
  const usersPerPage = 10
  let pageRange = []
  const [QueryBatch, setQueryBatch] = useState('')
  const [QueryCourse, setQueryCourse] = useState('')
  const [courses, setCourses] = useState([])
  const [batches, setBatches] = useState([])

  useEffect(() => {
    enroll(1)
    pagination()
    getCourse()
    getBatch()
  }, [])

  const pageLinkClick = (page) => {
    enroll(page)
  }
  async function getCourse() {
    try {
      let result = await axios.get('http://localhost:5000/courses')
      console.log(result)
      setCourses(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  async function getBatch() {
    try {
      let result = await axios.get('http://localhost:5000/batches')
      console.log(result)
      setBatches(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  // console.log(user.course.coursename)
  async function enroll(page) {
    try {
      console.log(page)
      setCurrentPage(page)
      console.log(currentPage)
      let result = await axios.get(
        `http://localhost:5000/students?page=${page}&batch=${QueryBatch}&course=${QueryCourse}`,
      )
      // console.log(result)
      setuser(result.data)
      // console.log(users)
    } catch (err) {
      console.log(err)
    }
  }
  // let totalitems
  async function pagination() {
    try {
      let totalCount = await axios.get('http://localhost:5000/students/total')
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
    let results = await axios.delete('http://localhost:5000/students/' + currentuser._id)
    console.log(results)
    console.log('result:', results.data)
    setMsg(results.data)
    setVisible(false)
    enroll()
  }

  const adduser = () => {
    navigate('/student/add')
  }
  const handleBatchChange = (event) => {
    event.preventDefault()
    setQueryBatch(event.target.value)
    console.log(event.target.value)
    if (!event.target.value) {
      console.log('if')
      setQueryBatch(null)
      enroll(1)
    }
  }
  const handleCourseChange = (event) => {
    setQueryCourse(event.target.value)
    console.log(event.target.value)
    if (!event.target.value) {
      console.log('if')
      setQueryCourse(null)
      enroll(1)
    }
  }
  const filter = (e) => {
    e.preventDefault()
    enroll(1)
  }
  const pdfdownload = () => {
    try {
      const input = document.getElementById('pdf-content')

      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true)
        const imgWidth = 210
        const imgHeight = (canvas.height * imgWidth) / canvas.width
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
        pdf.save('page_as_pdf.pdf')
      })
    } catch (err) {
      console.log(err)
    }
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
      <div className=" card rounded-4 ">
        <div className="d-flex  justify-content-between border-bottom">
          <h2 className=" h2   p-2 px-3">
            Students <span className="h5 text-success">({totalitem})</span>
          </h2>
          <div className="pt-3 ">
            <form className="col-12  d-flex  justify-content-between ">
              <select
                name="Coursename"
                id=""
                className="form-select "
                value={QueryCourse}
                onChange={handleCourseChange}
              >
                <option value="">Course Name</option>
                {courses.map((course) => (
                  <option key={course.coursename} value={course._id}>
                    {course.coursename}
                  </option>
                ))}
              </select>
              <select
                name="Batchname"
                id=""
                className="form-select "
                value={QueryBatch}
                onChange={handleBatchChange}
              >
                <option value="">Batch Name</option>
                {batches.map((batch) => (
                  <option key={batch.batchname} value={batch._id}>
                    {batch.batchname}
                  </option>
                ))}
              </select>
              <button className="btn btn-primary ms-2" onClick={filter}>
                search
              </button>
            </form>
          </div>
          <Link className="text-info d-inline ms-3 h3 " onClick={pdfdownload}>
            <FaTrash />
          </Link>
          <button className="btn m-3  btn-info" onClick={adduser}>
            Add student
          </button>
        </div>
        <div className="  ">
          <table className="table ">
            <thead>
              <tr>
                <th>student Name</th>
                <th>student Email</th>
                <th>student mobile</th>
                <th>Batch Name</th>
                <th>Course Name</th>
                <th>Trainer Name</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {user.map((users) => (
                <tr key={users._id}>
                  <td>{users.student_name}</td>
                  <td>{users.student_email}</td>
                  <td>{users.student_mobile}</td>
                  <td>{users.batches.batchname}</td>
                  <td>{users.course.coursename}</td>
                  <td>{users.batches.trainer.tname}</td>
                  <td>{users.date}</td>

                  <td>
                    <Link to={`/student/update/${user._id}`} className="text-warning d-inline h3 ">
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
  )
}

export default Viewstudent
