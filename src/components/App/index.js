import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from 'containers/HomePage'
import Sidebar from 'components/layout/Sidebar'
import AboutPage from 'containers/AboutPage'
import UserPage from 'containers/UserPage'
import WorkoutDetailPage from 'containers/DetailPage/WorkoutDetailPage'
import GroupDetailPage from 'containers/DetailPage/GroupDetailPage'

const rootRoutes = [
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

const App = (props) =>
  <div style={{ display: 'flex' }}>
    <Sidebar />

    <div style={{ flex: 1, padding: '10px' }}>
      {rootRoutes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          render={route.main}
        />
     ))}
   </div>
  </div>

export default App;
