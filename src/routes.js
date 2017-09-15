import React from 'react'
import HomePage from 'containers/HomePage'
import AboutPage from 'containers/AboutPage'
import UserPage from 'containers/UserPage'
import WorkoutDetailPage from 'containers/DetailPage/WorkoutDetailPage'
import GroupDetailPage from 'containers/DetailPage/GroupDetailPage'


const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>/</div>,
    main: () => <HomePage />
  },
  { path: '/about',
    sidebar: () => <div>/about</div>,
    main: () => <AboutPage />
  },
  {
    path: '/user',
    sidebar: () => <div>/user</div>,
    main: () => <UserPage />
  },
  {
    path: '/workout/:id',
    main: (props) => <WorkoutDetailPage {...props} />
  },
  {
    path: '/group/:id',
    main: (props) => <GroupDetailPage {...props} />
  }
];


export default routes
