import app from './app'
const port = process.env.port
app.listen(port, () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
