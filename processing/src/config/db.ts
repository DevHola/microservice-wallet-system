import { Pool } from 'pg'

export const pool = new Pool({
  user: 'dev',
  password: '12345678',
  host: 'localhost',
  port: 5432,
  database: 'Banking'
})

pool.connect((error, client, release) => {
  if (error != null) {
    console.log(error)
  } else {
    console.log('connection successful')
    release()
  }
})
