import request from "supertest";
import { app } from "../../app";
import { title } from "process";
import { Ticket } from "../../models/ticket";
it('has a route handler listening to /api/tickets for post reuquests', async() => {
    const response = await request(app)
                            .post('/api/tickets')
                            .send({});
    expect(response.status).not.toEqual(404);
})

it('can be accessed if user is signed in', async() => {
    const response = await request(app)
                    .post('/api/tickets')
                    .send({});
    expect(response.status).toEqual(401)
    
})

it('if user signed in then should not return 401', async() => {
    const response = await request(app)
                    .post('/api/tickets')
                    .set('Cookie', global.signin())  //global signin would be taken from setup
                    .send({});
    expect(response.status).not.toEqual(401)
    
})

it('returns an error if an invalid title is provided', async() => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: '',
            price: 10
        })
        .expect(400)
})

it('returns an error if an invalid price is provided', async() => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcd',
            price: -10
        })
        .expect(400)
    
    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcdw',
        })
        .expect(400)
})

it('creates tickets with valid input', async() => {
    //to add check to make sure that ticket was saved in mongo
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send({
            title: 'abcder',
            price: 20
        })
        .expect(201)
    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
})