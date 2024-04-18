import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Base
const Addcourse = React.lazy(() => import('./views/base/addcourse/Addcourse'))
const Viewcourse = React.lazy(() => import('./views/base/viewcourse/Viewcourse'))
const Updatecourse = React.lazy(() => import('./views/base/viewcourse/Updatecourse'))

// Buttons
const Viewtrainer = React.lazy(() => import('./views/buttons/viewtrainer/Viewtrainer'))
const Addtrainer = React.lazy(() => import('./views/buttons/addtrainer/Addtrainer'))
const Updatetrainer = React.lazy(() => import('./views/buttons/viewtrainer/Updatetrainer'))

//Forms

const Addbatch = React.lazy(() => import('./views/forms/addbatch/Addbatch'))
const Viewbatch = React.lazy(() => import('./views/forms/viewbatch/Viewbatch'))
const Updatebatch = React.lazy(() => import('./views/forms/viewbatch/Updatebatch'))

// Icons
const Viewstudent = React.lazy(() => import('./views/icons/viewstudent/Viewstudent'))
const Addstudent = React.lazy(() => import('./views/icons/addstudent/Addstudent'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/course/add', name: 'Add Course', element: Addcourse },
  { path: '/course/view', name: 'View Courses', element: Viewcourse },
  { path: '/course/update/:id', name: 'Update Course', element: Updatecourse },
  { path: '/trainer/view', name: 'View Trainer', element: Viewtrainer },
  { path: '/trainer/add', name: 'Add Trainer', element: Addtrainer },
  { path: '/trainer/update/:id', name: 'Update Trainer', element: Updatetrainer },
  { path: '/batch/add', name: 'Add Batch', element: Addbatch },
  { path: '/batch/view', name: 'View Batch', element: Viewbatch },
  { path: '/batch/update/:id', name: 'Update Batch', element: Updatebatch },
  { path: '/student/view', name: 'View Student', element: Viewstudent },
  { path: '/student/add/:id', name: 'Add Student', element: Addstudent },
]

export default routes
