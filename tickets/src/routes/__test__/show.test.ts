import request from 'supertest';
import { app } from '../../app';

it('returns 404 if ticket not found', async () =>{
    await request(app)
        .get('/api/tickets/abcder')
        .send()
        .expect(404)
})