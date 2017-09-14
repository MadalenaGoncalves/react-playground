import React from 'react'
import { Route } from 'react-router-dom'
import HomePage from './../containers/home-page.jsx'
import Sidebar from './layout/sidebar.jsx'
import About from './about.jsx'
import User from './user.jsx'
import WorkoutDetailPage from './../containers/workout-detail-page.jsx'
import GroupDetailPage from './../containers/group-detail-page.jsx'

const rootRoutes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>/</div>,
    main: () => <HomePage />
  },
  { path: '/about',
    sidebar: () => <div>/about</div>,
    main: () => <About />
  },
  {
    path: '/user',
    sidebar: () => <div>/user</div>,
    main: () => <User />
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
