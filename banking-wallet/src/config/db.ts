import { Pool } from 'pg'

export const pool = new Pool({
  user: '',
  password: '',
  host: '',
  port: 5432,
  database: ''
})

pool.connect((error, client, release) => {
  if (error != null) {
    console.log('connection failed')
  } else {
    console.log('connection successful')
    release()
  }
})
