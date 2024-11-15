import axios from 'axios'
import { useState } from 'react'
import { FaArrowAltCircleLeft } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const Forgetpassword = () => {
  const [step, setStep] = useState(1)
  const [user, setUser] = useState({})
  const [error, setError] = useState()
  const [userid, setuserid] = useState()
  const [emailed, setEmailed] = useState([])
  const navigate = useNavigate()

  const sendemail = async (e) => {
    e.preventDefault()
    console.log('err')
    try {
      let sendingmail = await axios.post('http://localhost:5000/academy/forgetpassword', user)
      if (sendingmail.data.success) {
        console.log('data success')
        setEmailed(sendingmail.data.email)
        setUser({ email: '' })
        setError('')
        setStep(2)
      }
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }
  //dkarthick201099@gmail.com
  const verifyotp = async (e) => {
    e.preventDefault()
    console.log('verify')
    try {
      let sendotp = await axios.post('http://localhost:5000/academy/verifyotp', user, emailed)
      if (sendotp.data.success) {
        console.log('dont send')
        setuserid(sendotp.data.userid)
        setUser({ email: '', otp: '' })
        setError('')
        setStep(3)
      }
      console.log(sendotp)
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }
  console.log(userid)
  const updatepassword = async (e) => {
    e.preventDefault()
    try {
      let updatepass = await axios.put(
        'http://localhost:5000/academy/updatepassword/' + userid,
        user,
      )
      console.log(updatepass)

      setUser({
        email: '',
        otp: '',
      })
      navigate('/')
      setError(updatepass.data)
    } catch (err) {
      console.log(err)
      setError(err.response.data)
    }
  }
  const reverse = () => {
    navigate('/')
  }

  if (step === 1) {
    return (
      <div className="  vh-100 bg-body-tertiary text-center d-flex justify-content-center align-items-center backgroundimg">
        <div className=" w-50 py-5 d-flex flex-column bg-white border  rounded gradient ">
          <h2 className="mb-3 py-3">Forget Password</h2>
          <div className="arrow">
            <FaArrowAltCircleLeft size="30px" onClick={reverse} />
          </div>

          <form className=" text-center form-group " onSubmit={sendemail}>
            <div className="row justify-content-center">
              <div className="col-5">
                <input
                  className="form-control  "
                  type="email"
                  placeholder="Enter Your Mail Id"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
            </div>
            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="row justify-content-center">
              <div className="col-5">
                <button className="btn btn-success form-submit my-4 text-white px-5">submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  } else if (step === 2) {
    return (
      <div className="  vh-100 bg-body-tertiary text-center d-flex justify-content-center align-items-center backgroundimg">
        <div className=" w-50 py-5 d-flex flex-column bg-white border  rounded gradient">
          <h2 className="pb-2">Verify OTP</h2>
          <form className=" text-center form-group " onSubmit={verifyotp}>
            <div className="row justify-content-center">
              <p className="h5 pb-2">
                Mail Sending :<span className="text-info">{emailed}</span>
              </p>
              <div className="col-5">
                <input
                  type="text"
                  className="form-control text-center "
                  placeholder="Enter Your OTP"
                  value={user.otp}
                  onChange={(e) => setUser({ ...user, otp: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="row justify-content-center">
              <div className="col-5">
                <button className="btn btn-primary form-submit my-4 text-white px-5">verify</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  } else if (step === 3) {
    return (
      <div className="  vh-100 bg-body-tertiary text-center d-flex justify-content-center align-items-center backgroundimg">
        <div
          className=" w-50 py-5 d-flex flex-column bg-white border gradient rounded"
          onSubmit={updatepassword}
        >
          <h2 className="mb-3 py-3">Reset Password</h2>
          <form className=" text-center form-group ">
            <div className="row justify-content-center">
              <div className="col-5">
                <input
                  type="password"
                  className="form-control  "
                  placeholder="Enter New Password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
              </div>
            </div>
            <div className=" row justify-content-center pt-4">
              <div className="col-5">
                <input
                  type="password"
                  className="form-control  "
                  placeholder="Enter confirm Password"
                  value={user.confirm_password}
                  onChange={(e) => setUser({ ...user, confirm_password: e.target.value })}
                />
              </div>
            </div>

            {error && <p className="text-danger mt-3">{error}</p>}
            <div className="row justify-content-center">
              <div className="col-5">
                <button className="btn btn-success form-submit my-4 text-white px-5">submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Forgetpassword
