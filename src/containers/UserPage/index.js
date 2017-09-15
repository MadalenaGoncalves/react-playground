import React from 'react'
import { Route, Link, Redirect, Switch } from 'react-router-dom'
import Profile from './ProfilePage'
import Workouts from './WorkoutsPage'
import Results from './ResultsPage'
import Account from './AccountPage'

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

        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={`/user/${route.path}`}
              component={route.main}
            />
          ))}
          <Redirect from="/user" exact to="/user/profile" />
        </Switch>

      </div>
    </div>
  </div>

export default User;
