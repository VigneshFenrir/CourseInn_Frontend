import React from 'react'

import { CCard } from '@coreui/react'

import WidgetsDropdown from '../widgets/WidgetsDropdown'

const Dashboard = () => {
  return (
    <>
      <WidgetsDropdown className="mb-4" />
      <CCard className="mb-4"></CCard>
    </>
  )
}

export default Dashboard
