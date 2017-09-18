import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from 'routes'
import Page from 'components/layout/Page'

const App = (props) =>
  <Page>
    <div style={{ flex: 1, padding: '10px' }}>
      <Switch>
        {routes.map((route, index) => <Route key={index} {...route} />)}
     </Switch>
   </div>
  </Page>

export default App;
