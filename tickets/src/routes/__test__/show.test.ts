import request from 'supertest';
import { app } from '../../app';
import exp from 'constants';

it('returns 404 if ticket not found', async () =>{
    await request(app)
        .get('/api/tickets/abcder')
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