import request from 'supertest'
import { app } from '../../app';
import { title } from 'process';

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'ticket123',
            price: 20
        })
}

it('can fetch list of tickets', async() => {
    await createTicket();
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
                        .get('/api/tickets')
                        .send()
                        .expect(200)
    expect(response.body.length).toEqual(4)
})