import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListner } from './events/ticket-created-listener';

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
    url: 'http:localhost:4222',
});

stan.on('connect', () => {
    console.log('Listener connected to NATS!!!')

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    })
    new TicketCreatedListner(stan).listen();
});
process.on('SIGTERM', () => stan.close())
process.on('SIGINT', () => stan.close())