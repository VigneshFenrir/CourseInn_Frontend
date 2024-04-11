import axios from 'axios'
import React from 'react'
import { useState } from 'react'

const Accordion = () => {
  // const courseName = useRef < HTMLInputElement > null
  // const courseDur = useRef < HTMLInputElement > null
  const [coursename, setCoursename] = useState('')
  const [duration, setduration] = useState('')

  const savepost = (e) => {
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
      <div className=" bg-white  border border-secondary rounded-3 ">
        <h2 className="h2 border-bottom p-3">Add courses</h2>
        <form action="" onSubmit={savepost} className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2">
            <div>
              <label htmlFor="" className=" form-label">
                Course Name :
              </label>
            </div>
            <div className="me-3">
              <input
                type="text"
                className="form-control ms-4 "
                placeholder="Coruse Name"
                onChange={(e) => {
                  setCoursename(e.target.value)
                }}
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ">
            <label htmlFor="" className=" form-label">
              Duration :
            </label>
            <div className="me-3">
              <input
                type="text"
                placeholder="Duration"
                onChange={(e) => {
                  setduration(e.target.value)
                }}
                className="form-control ms-4 "
              />
            </div>
          </div>

          <div className="text-start ms-5 my-3 px-5">
            <input type="submit" className="btn btn-primary mt-4 px-2" />
          </div>
        </form>
      </div>
    </>
  )
}

export default Accordion
