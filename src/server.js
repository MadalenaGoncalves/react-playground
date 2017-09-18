import serialize from 'serialize-javascript'
import express from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { matchPath } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import 'isomorphic-fetch'
import App from 'components/App'
import routes from 'routes'

const app = express()

app.use(express.static('../build'))

app.get('*', (req, res) => {
  const currentRoute = routes.find(route => matchPath(req.url, route));
  const requestInitialData = currentRoute.component.requestInitialData && currentRoute.component.requestInitialData();

  console.log('currentRoute', currentRoute);
  console.log('requestInitialData', requestInitialData);

  Promise.resolve(requestInitialData)
    .then(initialData => {
      const context = {initialData}
      const markup = renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      )

      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Universal React</title>
            <script src="/bundle.js" defer></script>
            <script>window.__initialData__ = ${serialize(initialData)}</script>
          </head>
          <body>
            <div id="root">${markup}</div>
          </body>
        </html>
      `)
    })
})

app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening')
})
