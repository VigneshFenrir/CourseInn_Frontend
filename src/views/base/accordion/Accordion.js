import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Accordion = () => {
  // const courseName = useRef < HTMLInputElement > null
  // const courseDur = useRef < HTMLInputElement > null
  const [coursename, setCoursename] = useState('')
  const [duration, setduration] = useState('')

  const savepost = (e) => {
    e.preventDefault()

    const User = {
      coursename: coursename, // coursename,
      duration: duration, //duration,
    }
    console.log(User)

    // if (courseName.current) {
    //   User.coursename = courseName.current.value
    //   //   setCoursename(courseName.current.value);
    // }
    // if (courseDur.current) {
    //   User.duration = courseDur.current.value
    //   //   setduration(courseDur.current.value);
    // }

    async function enroll() {
      try {
        let result = await axios.post('http://localhost:5000/course/users', User)
        console.log(result)
      } catch (err) {
        console.log(err)
      }
    }
    enroll()
  }
  return (
    <>
      <div className="container w-50 border border-secondary rounded-3 py-5">
        <h2 className="h2 text-center mb-4">Add courses</h2>
        <form action="" onSubmit={savepost}>
          <div className="mb-3 row justify-content-md-center">
            <div className="col-sm-3 justify-content-center ">
              <label htmlFor="" className=" col-form-label">
                Couse Name :
              </label>
            </div>
            <div className="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setCoursename(e.target.value)
                }}
                className="form-control"
              />
            </div>
          </div>

          <div className="mb-3 row justify-content-md-center">
            <label htmlFor="" className="col-sm-3 col-form-label">
              Duration :
            </label>
            <div className="col-sm-5">
              <input
                type="text"
                onChange={(e) => {
                  setduration(e.target.value)
                }}
                className="form-control"
              />
            </div>
          </div>

          <div className="text-end me-5">
            <input type="submit" className="btn btn-primary mt-4 " />
          </div>
        </form>
      </div>
    </>
  )
}

export default Accordion
