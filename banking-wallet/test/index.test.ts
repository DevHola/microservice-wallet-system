import request from 'supertest'
import app from '../src/app'

// describe('GET /', function () {
//     it('should respond with a JSON message saying "Hello World"', function (done) {
//       request(app)
//         .get('/')
//         .expect('Content-Type', /json/)
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err);
//           expect(res.status).toEqual(200);
//           done();
//         });
//     });
//   });

describe('POST / /api/wallet-types', ()=> {
  it('should create a wallet type with valid data', async () => {
    const res = await request(app)
    .post('/api/walletType')
    .send({name: 'Naira Wallet', description: 'Carry out only transaction in naira'})
    .expect(201) 
    expect(res.statusCode).toEqual(201)
     
  });
  it('should return 400 if required fields are missing', async ()=> {
    const res = await request(app)
    .post('/api/walletType')
    .send({name:'',description:''})
    .expect(400)
    expect(res.body.errors).toBeDefined()
  })
  it('should return 409 if wallet type with the same name already exists', async ()=> {
    await request(app).post('/api/walletType').send({name:'Saving',description:'Saving Account'}).expect(201)
    
    const res = await request(app).post('/api/walletType').send({name:'Saving',description:'Saving Account'}).expect(409)
    expect(res.body.errors).toBe('wallet type already exists')
  })
})