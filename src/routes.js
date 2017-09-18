import React from 'react'
import HomePage from 'containers/HomePage'
import AboutPage from 'containers/AboutPage'
import UserPage from 'containers/UserPage'
import WorkoutDetailPage from 'containers/DetailPage/WorkoutDetailPage'
import GroupDetailPage from 'containers/DetailPage/GroupDetailPage'


const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage
  },
  {
    path: '/about',
    component: AboutPage
  },
  {

    path: '/user',
    component: UserPage
  },
  // {
  //
  //   path: '/workout/:id',
  //   main: (props) => <WorkoutDetailPage {...props} />
  // },
  // {
  //
  //   path: '/group/:id',
  //   main: (props) => <GroupDetailPage {...props} />
  // }
];


export default routes
