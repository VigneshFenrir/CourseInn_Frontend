import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <span className="ms-1">&copy; 2024 Courseinn Academy</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.bigziel.com/" target="_blank" rel="noopener noreferrer">
          Bigziel - Technologies pvt ltd.
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
