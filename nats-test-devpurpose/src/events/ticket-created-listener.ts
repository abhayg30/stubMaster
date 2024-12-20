import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subjects";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListner extends Listener<TicketCreatedEvent>{
    readonly subject: Subjects.TicketCreated;
    queueGroupName: 'ticket-service';
    onMessage(data: TicketCreatedEvent['data'], msg: Message) {
        console.log('Event data!', data);
    
        console.log(data.id);
        console.log(data.title);
        console.log(data.price);
    
        msg.ack();
    }

}