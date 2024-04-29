import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// course
const Addcourse = React.lazy(() => import('./views/base/addcourse/Addcourse'))
const Viewcourse = React.lazy(() => import('./views/base/viewcourse/Viewcourse'))
const Updatecourse = React.lazy(() => import('./views/base/viewcourse/Updatecourse'))

// trainer
const Viewtrainer = React.lazy(() => import('./views/Trainer/viewtrainer/Viewtrainer'))
const Addtrainer = React.lazy(() => import('./views/Trainer/addtrainer/Addtrainer'))
const Updatetrainer = React.lazy(() => import('./views/Trainer/viewtrainer/Updatetrainer'))

//batch

const Addbatch = React.lazy(() => import('./views/forms/addbatch/Addbatch'))
const Viewbatch = React.lazy(() => import('./views/forms/viewbatch/Viewbatch'))
const Updatebatch = React.lazy(() => import('./views/forms/viewbatch/Updatebatch'))

// student
const Viewstudent = React.lazy(() => import('./views/icons/viewstudent/Viewstudent'))
const Addstudent = React.lazy(() => import('./views/icons/addstudent/Addstudent'))
const Updatestudent = React.lazy(() => import('./views/icons/viewstudent/Updatestudent'))

// users
const Viewuser = React.lazy(() => import('./views/pages/register/Userview'))
const Adduser = React.lazy(() => import('./views/pages/register/Adduser'))
const Updateuser = React.lazy(() => import('./views/pages/register/updateuser'))

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
  { path: '/student/add', name: 'Add Student', element: Addstudent },
  { path: '/student/update/:id', name: 'Update student', element: Updatestudent },
  { path: '/user/view', name: 'View User', element: Viewuser },
  { path: '/user/add', name: 'Add User', element: Adduser },
  { path: '/user/update/:id', name: 'Update User', element: Updateuser },
]

export default routes
