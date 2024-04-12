import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Addcourse = React.lazy(() => import('./views/base/addcourse/Addcourse'))
const Viewcourse = React.lazy(() => import('./views/base/viewcourse/Viewcourse'))
const Updatecourse = React.lazy(() => import('./views/base/viewcourse/Updatecourse'))

// Buttons
const Viewtrainer = React.lazy(() => import('./views/buttons/viewtrainer/Viewtrainer'))
const Addtrainer = React.lazy(() => import('./views/buttons/addtrainer/Addtrainer'))

//Forms

const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))

const Select = React.lazy(() => import('./views/forms/select/Select'))

// Icons
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/course/add', name: 'Add Course', element: Addcourse },
  { path: '/course/view', name: 'View Courses', element: Viewcourse },
  { path: '/course/update/:id', name: 'Update Course', element: Updatecourse },
  { path: '/trainer/view', name: 'View Trainer', element: Viewtrainer },
  { path: '/trainer/add', name: 'Add Trainer', element: Addtrainer },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
]

export default routes
