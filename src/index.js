import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import User from './User'
import { BrowserRouter, Route, Link } from 'react-router-dom'

const routes = [
  { path: '/',
    exact: true,
    sidebar: () => <div>/</div>,
    main: () => <App />
  },
  { path: '/about',
    sidebar: () => <div>/about</div>,
    main: () => <h2>This is the about page - i am dumb</h2>
  },
  { path: '/plans',
    sidebar: () => <div>plans</div>,
    main: () => <h2>This is the plans page - i am dumb</h2>
  },
  { path: '/facts',
    sidebar: () => <div>/facts</div>,
    main: () => <h2>This is the facts page - i am dumb</h2>
  },
  {
    path: '/user',
    sidebar: () => <div>/user</div>,
    main: () => <User />
  }
]

ReactDOM.render(
  <BrowserRouter>
    <div style={{ display: 'flex' }}>
      <div style={{
        padding: '10px',
        width: '10%',
        background: '#f0f0f0'
      }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/plans">Plans</Link></li>
          <li><Link to="/facts">Facts</Link></li>
          <li><Link to="/user">Profile</Link></li>
        </ul>

        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            component={route.sidebar}
          />
        ))}
      </div>

      <div style={{ flex: 1, padding: '10px' }}>
       {routes.map((route, index) => (
         <Route
           key={index}
           path={route.path}
           exact={route.exact}
           component={route.main}
         />
       ))}
     </div>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
)
