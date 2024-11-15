import React, { useState } from 'react'
import axios from 'axios'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const savepost = async (e) => {
    e.preventDefault()
    setLoading(true) // Start loading state
    try {
      navigate('/dashboard')

      const result = await axios.post('http://localhost:5000/academy/loginuser', login)

      const tokenFromHeaders = result.headers['x-auth-token'] || result.headers['X-Auth-Token']

      if (tokenFromHeaders) {
        localStorage.setItem('token', tokenFromHeaders)
        setMsg(result.data.message || 'Login successful')
        setError('')
        navigate('/dashboard')
      } else {
        setError('Token not found in response headers')
      }
    } catch (err) {
      console.error('Error:', err)
      const errorMsg = err.response?.data?.message || 'An error occurred'
      setError(errorMsg)
      setMsg('')
    } finally {
      setLoading(false) // End loading state
    }
  }

  const forgetpassword = () => {
    navigate('forgetpassword')
  }

  return (
    <div className="vh-100 bg-body-tertiary text-center d-flex align-items-center backgroundimg">
      <CContainer className="w-50">
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup className="gradient">
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Mail"
                        autoComplete="email"
                        value={login.email}
                        onChange={(e) => setLogin({ ...login, email: e.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={login.password}
                        onChange={(e) => setLogin({ ...login, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <div>
                        {loading && <CSpinner color="primary" />}
                        {msg && !loading && <p className="text-success">{msg}</p>}
                        {error && !loading && <p className="text-danger">{error}</p>}
                      </div>
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={savepost}
                          disabled={loading}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0" onClick={forgetpassword}>
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
