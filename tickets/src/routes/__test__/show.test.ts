import request from 'supertest';
import { app } from '../../app';
import exp from 'constants';
import mongoose from 'mongoose';

//this test fails with 400 bad request why ??
// Ans: look at error handler middleware if there is no custom error it goes to 400 but we deifned not found error so??
//ans: because the id we are sending is not valid accroding to mongo hence 400 so we generate mongo ID
it('returns 404 if ticket not found', async () =>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .get(`/api/tickets/${id}`)
        .send()
        .expect(404)
})

it('returns the ticket if the ticket is found', async()=>{
    const title = 'ticket123'
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: title,
            price: 20
        })
        .expect(201)
    const ticketResponseData = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200)
    expect(ticketResponseData.body.title).toEqual(title)
    expect(ticketResponseData.body.price).toEqual(20)
})
