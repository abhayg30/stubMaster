import { Publisher, Subjects, TicketCreatedEvent } from "@smaugtickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
    subject: Subjects.TicketCreated = Subjects.TicketCreated;

}