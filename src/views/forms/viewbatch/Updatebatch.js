import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const Updatebatch = () => {
  const { id } = useParams()
  const [batches, setBatches] = useState({
    batchname: '',
    start_time: '',
    end_time: '',
    trainerid: '',
  })
  const [error, setError] = useState()
  const [msg, setMsg] = useState()
  const [trainers, setTrainers] = useState([])
  const navigate = useNavigate()

  const back = () => {
    navigate('/batch/view')
  }

  // trainer get
  useEffect(() => {
    enrolls()
  }, [])
  async function enrolls() {
    try {
      let result = await axios.get('http://localhost:5000/trainers')
      console.log(result)
      setTrainers(result.data)
    } catch (err) {
      console.log(err)
    }
  }
  // batch get
  useEffect(() => {
    enroll()
  }, [])

  async function enroll() {
    try {
      let result = await axios.get('http://localhost:5000/batches/' + id)
      console.log('result:', result)
      setBatches(result.data)
      console.log(batches)
    } catch (err) {
      console.log(err)
    }
  }
  //  trainer update
  const updatebatch = (e) => {
    e.preventDefault()
    update()

    // console.log(user)

    if (!error) {
      msg && navigate('/batch/view')
    }
  }
  async function update() {
    try {
      const token = localStorage.getItem('token')

      // Set up the headers including the token
      const headers = {
        'Content-Type': 'application/json', // or any other content type you need
        'x-auth-token': token, // Add the token to the headers
      }
      let asser = await axios.put('http://localhost:5000/batches/' + id, batches, { headers })
      console.log(asser)
      setMsg(asser.data)
      setError()
    } catch (error) {
      console.log(error)
      console.log('error:', error.response.data)
      setError(error.response.data)
    }
  }
  return (
    <>
      <div>
        {msg && <p className="alert alert-success">{msg}</p>}
        {error && <p className="alert alert-danger">{error}</p>}
      </div>
      <div className=" card border border-secondary rounded-3 ">
        <div className="d-flex justify-content-between border-bottom">
          <h2 className=" h2   p-2 px-3">Update Batch</h2>
          <button className="btn m-3  btn-secondary " onClick={back}>
            Back
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
                value={batches.batchname}
                onChange={(e) => {
                  setBatches({ ...batches, batchname: e.target.value })
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
                value={batches.start_time}
                onChange={(e) => {
                  setBatches({ ...batches, start_time: e.target.value })
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
                value={batches.end_time}
                onChange={(e) => {
                  setBatches({ ...batches, end_time: e.target.value })
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
              onChange={(e) => {
                setBatches({ ...batches, trainerid: e.target.value })
              }}
            >
              <option value="">Trainer Name</option>
              {trainers.map((trainer) => (
                <option key={trainer.tname} value={trainer._id}>
                  {trainer.tname}
                </option>
              ))}
            </select>
          </div>

          <div className="text-start ms-5 my-3 px-5">
            <button className="btn btn-primary mt-4 px-2" onClick={updatebatch}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default Updatebatch
