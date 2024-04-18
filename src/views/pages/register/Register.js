import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilDevices, cilLockLocked, cilPhone, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [register, setRegister] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    mobile: '',
    role: '',
  })
  const navigate = useNavigate()
  const [error, setError] = useState()
  const [msg, setMsg] = useState()

  const savepost = (e) => {
    e.preventDefault()

    async function post() {
      try {
        console.log('reg')
        console.log(register)
        let result = await axios.post('http://localhost:5000/academy/signinusers', register)
        console.log('result:', result)
        if (password !== confirm_password) {
          setError("Password Doesn't Match")
          return
        }
        navigate('*')
        setMsg(result.data)

        setError()
      } catch (err) {
        console.log(err)
        console.log('error:', err.response.data)
        setError(err.response.data)
        console.log(err.response.data.message)
      }
    }

    post()
  }
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center backgroundimg">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4 gradient">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-body-secondary">Create your account</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="name"
                      autoComplete="name"
                      value={register.name}
                      onChange={(e) => {
                        setRegister({ ...register, name: e.target.value })
                      }}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput
                      type="mail"
                      placeholder="Email"
                      autoComplete="email"
                      value={register.email}
                      onChange={(e) => {
                        setRegister({ ...register, email: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilPhone} />
                    </CInputGroupText>
                    <CFormInput
                      type="number"
                      placeholder="Phone Number"
                      autoComplete="phonenumber"
                      value={register.mobile}
                      onChange={(e) => {
                        setRegister({ ...register, mobile: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autoComplete="new-password"
                      value={register.password}
                      onChange={(e) => {
                        setRegister({ ...register, password: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat password"
                      autoComplete="new-password"
                      value={register.confirm_password}
                      onChange={(e) => {
                        setRegister({ ...register, confirm_password: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilDevices} />
                    </CInputGroupText>
                    <CFormInput
                      type="text"
                      placeholder="Role"
                      autoComplete="role"
                      value={register.role}
                      onChange={(e) => {
                        setRegister({ ...register, role: e.target.value })
                      }}
                    />
                  </CInputGroup>
                  <div>
                    {msg && <p className="text-success">{msg}</p>}
                    {!msg && <p className="text-danger">{error}</p>}
                  </div>
                  <div className="d-grid">
                    <CButton color="success" onClick={savepost}>
                      Create Account
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
