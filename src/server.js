require('import-export') // node does not support yet the imports and exports

const http = require('http')
const path = require('path')
// const fs = require('fs')
const express = require('express')
const React = require('react')
const reactDomServer = require('react-dom/server')
const reactRouter = require('react-router')

const renderToString = reactDomServer.renderToString
const match = reactRouter.match
const RouterContext = reactRouter.RouterContext

const staticFiles = [
  '/static/*',
  'asset-manifest.json',
  'favicon.ico',
  'index.html',
  'manifest.json',
  'logo.svg'
]

const app = express()
app.server = http.createServer(app)

app.use(express.static(path.join(__dirname, '../build')));


staticFiles.forEach(file => {
  app.get(file, (req, res) => {
    const filePath = path.join(__dirname, '../build', req.url )
    res.sendFile(filePath)
  })
})

// app.get('*', (req, url) => {
//   const htmlFilePath = path.join(__dirname, '../build', 'index.html')
//   fs.readFile(htmlFilePath, 'utf8', (err, htmlDate) => {
//     if(err) {
//
//     }
//   })
// })


app.server.listen(process.env.PORT || 3000, () => {
  console.log(`Listing on http://localhost:${(app.server.address().port)}`)
})
