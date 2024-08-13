import request from 'supertest'
import app from '../src/app'

describe('POST / /api/wallet-types', ()=> {
  it('should create a wallet type with valid data', async () => {
    const res = await request(app)
    .post('/api/wallet-type/walletType')
    .send({name: 'Naira Wallet', description: 'Carry out only transaction in naira'})
    .expect(201) 
    expect(res.body.message).toBe('wallet created')
    console.log(res)
     
  });
  it('should return 400 if required fields are missing', async ()=> {
    const res = await request(app)
    .post('/api/wallet-type/walletType')
    .send({name:'',description:''})
    .expect(400)
    expect(res.body.errors).toBeDefined()
  })
  it('should return 409 if wallet type with the same name already exists', async ()=> {
    await request(app).post('/api/wallet-type/walletType').send({name:'Saving',description:'Saving Account'}).expect(201)
    
    const res = await request(app).post('/api/wallet-type/walletType').send({name:'Saving',description:'Saving Account'}).expect(409)
    expect(res.body.errors).toBe('wallet type already exists')
  })
})
describe('Put / /api/walletType/:id', () => {
  it('should update a wallet type with valid data', async ()=> {
    const res = await request(app)
    .put('/api/wallet-type/walletType/1')
    .send({name:'Saving Account',description:'Saving Wallet Account'})
    .expect(201)
    expect(res.statusCode).toEqual(201)
    expect(res.body.message).toBe('updated')
  })
  it('should return 400 if required fields are missing', async () => {
    const res = await request(app)
    .put('/api/wallet-type/walletType/1')
    .send({name:'', description:''})
    .expect(409)
    expect(res.statusCode).toEqual(409)
    expect(res.body.errors).toBeDefined()
  })
} )
describe('GET / /api/walletType/:id', () => {
  it('should retrieve wallet type with status 201', async ()=> {
    const res = await request(app)
    .get('/api/wallet-type/walletType/1')
    .expect(201)
    expect(res.body).toHaveProperty('walletType');
  })
  it('should return 404 if the wallet type does not exist', async () => {
    const res = await request(app)
    .get('/api/wallet-type/walletType/999')
    .expect(404)
    expect(res.body.message).toBe('wallet type not found')
  })
} )
describe('GET / /api/wallettypes/all', () => {
  it('should retrieve all wallet types with status 201', async ()=> {
    const res = await request(app)
    .get('/api/wallet-type/wallettypes')
    .expect(201)
    expect(res.body).toHaveProperty('wallet_Types')

  })
} )
