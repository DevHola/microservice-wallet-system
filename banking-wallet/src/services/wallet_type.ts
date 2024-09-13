import { pool } from '../config/db'
import { type wallet_type } from '../interfaces/interface'
export const wtCreate = async (name: string, description: string): Promise<void> => {
  const find = await pool.query('SELECT * FROM wallet_type WHERE name=$1', [name])
  const type = find.rows[0] as wallet_type | undefined
  if (type != null) {
    throw new Error('wallet type already exists')
  }
  await pool.query('INSERT INTO wallet_type (name,description) VALUES ($1,$2)', [name, description])
}

export const wtUpdate = async (name: string, description: string, id: number): Promise<void> => {
  await pool.query('UPDATE wallet_type SET name=$1,description=$2 where wallet_type_id=$3', [name, description, id])
}
export const wtdetail = async (queryid: number): Promise<wallet_type> => {
  const find = await pool.query('SELECT * FROM wallet_type WHERE wallet_type_id=$1', [queryid])
  const wtype = find.rows[0] as wallet_type | undefined
  if (wtype == null) {
    throw new Error('wallet type not found')
  }
  return wtype
}

export const wtAll = async (): Promise<wallet_type[]> => {
  const find = await pool.query('SELECT * FROM wallet_type')
  return find.rows as wallet_type[]
}
