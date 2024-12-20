import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { title } from "process";
import { natsWrapper } from "../../nats-wrapper";
import exp from "constants";

const createTicket = () => {
    return request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'ticket123',
            price: 20
        })
}


it('returns 404 if provided id is not present', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'abcder',
            price: 20
        })
        .expect(404)
})

it('returns 401 if user is not authenticated', async() => {
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
        .put(`/api/tickets/${id}`)
        .send({
            title: 'abcder',
            price: 20
        })
        .expect(401)
})

it('returns 401 if user is not the resource owner', async() => {
    const response = await createTicket();

    await request(app)
        .put(`/api/tickets/${response.body.id}`)
        .set('Cookie', global.signin())
        .send({
            title: 'asder',
            price: 90
        })
        .expect(401)

})

it('returns 400 if the user provied invalid inputs (title or price)', async() => {
    const cookie = global.signin();
    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', cookie)
                    .send({
                        title: 'ticket123',
                        price: 20
                    })
    await request(app)
                    .put(`/api/tickets/${response.body.id}`)
                    .set('Cookie', cookie)
                    .send({
                        title: '',
                        price: 20
                    })
                    .expect(400)

})

it('updates the tickets successfully on valid inputs', async() => {
    const cookie = global.signin();
    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', cookie)
                    .send({
                        title: 'ticket123',
                        price: 20
                    })
    await request(app)
                    .put(`/api/tickets/${response.body.id}`)
                    .set('Cookie', cookie)
                    .send({
                        title: 'ticket12345',
                        price: 20
                    })
                    .expect(200)
    const ticketResponse = await request(app).get(`/api/tickets/${response.body.id}`).send()
    expect(ticketResponse.body.title).toEqual('ticket12345')
    expect(ticketResponse.body.price).toEqual(20)

})
it('creates an invent after successful call', async() => {
    const cookie = global.signin();
    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', cookie)
                    .send({
                        title: 'ticket123',
                        price: 20
                    })
    await request(app)
                    .put(`/api/tickets/${response.body.id}`)
                    .set('Cookie', cookie)
                    .send({
                        title: 'ticket12345',
                        price: 20
                    })
                    .expect(200)
    expect(natsWrapper.client.publish).toHaveBeenCalled();
})