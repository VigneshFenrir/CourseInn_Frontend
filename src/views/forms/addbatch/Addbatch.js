import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Addbatch = () => {
  const [trainer, setTrainer] = useState([])
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const [batch, setBatch] = useState({
    batchname: '',
    start_time: '',
    end_time: '',
    trainerid: '',
  })
  const navigate = useNavigate()

  useEffect(() => {
    enrolls()
  }, [])
  async function enrolls() {
    try {
      let result = await axios.get('http://localhost:5000/trainers')
      console.log(result)
      setTrainer(result.data)
    } catch (err) {
      console.log(err)
    }
  }

  const savepost = (e) => {
    e.preventDefault()
    async function enroll() {
      try {
        const token = localStorage.getItem('token')

        // Set up the headers including the token
        const headers = {
          'Content-Type': 'application/json', // or any other content type you need
          'x-auth-token': token, // Add the token to the headers
        }
        console.log(batch)
        let result = await axios.post('http://localhost:5000/batches', batch, { headers })
        console.log('result:', result)
        setMsg(result.data)
        setBatch({
          batchname: '',
          start_time: '',
          end_time: '',
          trainerid: '',
        })
        setError()
      } catch (err) {
        console.log(err)
        console.log('error:', err.response.data)
        setError(err.response.data)
      }
    }

    enroll()
  }

  const viewall = () => {
    navigate('/batch/view')
  }

  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>

      <div className="  card border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className="h2 px-3 my-3 ">Add Batch</h2>
          <button className="btn btn-secondary m-3" onClick={viewall}>
            View Batches
          </button>
        </div>
        <form action="" className="px-3 py-4">
          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <div>
              <label htmlFor="" className=" form-label">
                Batch Name :
              </label>
            </div>
            <div className="">
              <input
                type="text"
                className="form-control ms-3 "
                placeholder="Batch Name"
                value={batch.batchname}
                onChange={(e) => {
                  setBatch({ ...batch, batchname: e.target.value })
                }}
              />
            </div>
          </div>

          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              Start Time :
            </label>
            <div className="me-3">
              <input
                type="time"
                placeholder="Start Time"
                value={batch.start_time}
                onChange={(e) => {
                  setBatch({ ...batch, start_time: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>
          <div className="mb-3  row justify-content-md-center mx-2 h5">
            <label htmlFor="" className=" form-label">
              End Time :
            </label>
            <div className="me-3">
              <input
                type="time"
                placeholder="End Time "
                value={batch.end_time}
                onChange={(e) => {
                  setBatch({ ...batch, end_time: e.target.value })
                }}
                className="form-control ms-3 "
              />
            </div>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 h5">
            <label htmlFor="" className="form-label">
              Trainer Name :
            </label>
          </div>

          <div className="mb-3 me-3 row justify-content-md-center mx-2 ps-3 ">
            <select
              name="trainername"
              id=""
              className="form-select mx-3  "
              value={batch.trainerid}
              onChange={(e) => {
                setBatch({ ...batch, trainerid: e.target.value })
              }}
            >
              <option value="">Trainer Name</option>
              {trainer.map((trainers) => (
                <option key={trainers.tname} value={trainers._id}>
                  {trainers.tname}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start  my-3 px-5">
            <button className="btn btn-primary mt-4 px-3 " onClick={savepost}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Addbatch
