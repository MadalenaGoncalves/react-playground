import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory'
import routes from 'routes'
import Page from 'components/layout/Page'

const history = createBrowserHistory()

const App = (props) =>
  <BrowserRouter
    history={history}
    onUpdate={() => window.scrollTo(0, 0)}
  >
    <Page>
      <div style={{ flex: 1, padding: '10px' }}>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            exact={route.exact}
            render={route.main}
          />
       ))}
     </div>
    </Page>
  </BrowserRouter>

export default App;
