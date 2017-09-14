import React from 'react'
import { Route, Link } from 'react-router-dom'
import Profile from './../containers/user/profile-page.jsx'
import Workouts from './../containers/user/workouts-page.jsx'
import Results from './../containers/user/results-page.jsx'
import Account from './../containers/user/account-page.jsx'

const routes = [
  {
    path: 'profile',
    label: 'Profile',
    main: () => <Profile test='test passing properties' />
  },
  {
    path: 'workouts',
    label: 'Workouts',
    main: () => <Workouts />
  },
  {
    path: 'results',
    label: 'Results',
    main: () => <Results />
  },
  {
    path: 'account',
    label: 'Account',
    main: () => <Account />
  }
]

const User = (props) =>
  <div>
    <h2>This is the profile pages wrapper - i'm also dumb, but my children are smart</h2>

    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '10%',
        background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {routes.map((route, index) => (
            <li key={route.path}>
              <Link to={`/user/${route.path}`}>{route.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ padding: '0 10px' }}>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={`/user/${route.path}`}
            component={route.main}
          />
        ))}
      </div>
    </div>
  </div>

  /* <Link to={`${match.url}/${route.path}`}>{route.path}</Link> */

export default User;
