import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaTrash } from 'react-icons/fa'
import { FaMessage } from 'react-icons/fa6'

const Viewcourse = () => {
  const [user, setuser] = useState([])
  const [pageLinks, setPagelinks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()
  const usersPerPage = 8
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
      let result = await axios.get(`http://localhost:5000/course/users?page=${page}`)
      // console.log(result)
      setuser(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  async function pagination() {
    try {
      let totalCount = await axios.get('http://localhost:5000/course/users/total')
      const totalitems = totalCount.data
      let pgCount = Math.ceil(totalitems / usersPerPage)

      pageRange = [...Array(pgCount).keys()].map((i) => i + 1)

      setPagelinks(pageRange)
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
      <div className=" bg-white   rounded-4 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2 text-dark  p-2 px-3">Courses</h2>
          <h2 className=" h2   p-2 px-3">Courses</h2>
          <button className="btn m-3  btn-info" onClick={adduser}>
            Add user
          </button>
        </div>
        <div className=" bg-light   ">
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

export default Viewcourse
