import express, {Request, Response, NextFunction} from 'express';
import {body} from 'express-validator';
import { requireAuth, validateRequest, NotAuthorizedError, NotFoundError } from '@smaugtickets/common';
import { Ticket } from '../models/ticket';
import { title } from 'process';

const router = express.Router();

router.put('/api/tickets/:id', requireAuth, [
    body('title')
        .not()
        .isEmpty()
        .withMessage('Title is required'),
    
        body('price')
            .isFloat({gt: 0})
], validateRequest,
    async(req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        throw new NotFoundError();
    }
    if(ticket.userId !== req.currentUser!.id) {
        throw new NotAuthorizedError()
    }

    ticket.set({
        title: req.body.title,
        price: req.body.price
    });
    await ticket.save();
    res.status(200).send(ticket)
});

export {router as updateTicketRouter}