import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilNotes, cilPuzzle, cilSpeedometer, cilStar } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },

  {
    component: CNavTitle,
    name: 'Components',
  },
  {
    component: CNavGroup,
    name: 'Courses',
    to: '/courses',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Course',
        to: '/course/add',
      },
      {
        component: CNavItem,
        name: 'View Courses',
        to: '/course/view',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Trainer',
    to: '/buttons',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Trainer',
        to: '/trainer/add',
      },
      {
        component: CNavItem,
        name: 'View Trainers',
        to: '/trainer/view',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Batch',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Batch',
        to: '/batch/add',
      },
      {
        component: CNavItem,
        name: 'View Batch',
        to: '/batch/view',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Student',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add Student',
        to: '/student/add',
      },
      {
        component: CNavItem,
        name: 'View Student',
        to: '/student/view',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'User',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/user/add',
      },
      {
        component: CNavItem,
        name: 'View User',
        to: '/user/view',
      },
    ],
  },
]

export default _nav
