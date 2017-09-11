import React from 'react'
import { Route, Link } from 'react-router-dom'

const routes = [
  {
    path: 'general',
    label: 'General',
    main: () => <p>I am the UserGeneral component - I am SMART</p>
  },
  {
    path: 'events',
    label: 'Events',
    main: () => <p>I am the UserEvents component - I am SMART</p>
  },
  {
    path: 'results',
    label: 'Results',
    main: () => <p>I am the UserResults component - I am SMART</p>
  },
  {
    path: 'account',
    label: 'Account',
    main: () => <p>I am the UserAccount component - I am SMART</p>
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

  {/* <Link to={`${match.url}/${route.path}`}>{route.path}</Link> */}

export default User;
