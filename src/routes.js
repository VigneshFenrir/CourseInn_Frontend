import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Updatecourse = React.lazy(() => import('./views/base/breadcrumbs/Updatecourse'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))

//Forms

const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const Select = React.lazy(() => import('./views/forms/select/Select'))

// Icons
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/course/add', name: 'Add user', element: Accordion },
  { path: '/base/breadcrumbs', name: 'View User', element: Breadcrumbs },
  { path: '/course/update-course/:id', name: 'Updatecourse', element: Updatecourse },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
]

export default routes
