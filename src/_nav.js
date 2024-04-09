import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilNotes, cilPuzzle, cilSpeedometer, cilStar } from '@coreui/icons'
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
    name: 'Course',
    to: '/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/base/accordion',
      },
      {
        component: CNavItem,
        name: 'View User',
        to: '/base/breadcrumbs',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Trainer',
    to: '/buttons',
    icon: "",
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/buttons/buttons',
      },
      {
        component: CNavItem,
        name: 'View User',
        to: '/buttons/button-groups',
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
        name: 'Add User',
        to: '/forms/form-control',
      },
      {
        component: CNavItem,
        name: 'View User',
        to: '/forms/select',
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'student',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Add User',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'View User',
        to: '/icons/brands',
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Pages',
    items: [
      {
        component: CNavItem,
        name: 'Login',
        to: '/login',
      },
      {
        component: CNavItem,
        name: 'Register',
        to: '/register',
      },
      {
        component: CNavItem,
        name: 'Error 404',
        to: '/404',
      },
      {
        component: CNavItem,
        name: 'Error 500',
        to: '/500',
      },
    ],
  },
]

export default _nav
