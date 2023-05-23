package com.revende.adapter.persistence;

import com.revende.adapter.persistence.entities.Ticket;
import com.revende.adapter.persistence.repositories.TicketRepository;
import com.revende.application.port.PersistenceRepositoryPort;
import com.revende.infrastructure.annotations.Adapter;
import org.springframework.beans.factory.annotation.Autowired;

import javax.transaction.Transactional;

@Adapter
public class TicketRepositoryAdapter implements PersistenceRepositoryPort<Ticket> {

    @Autowired
    private TicketRepository repository;

    @Override
    @Transactional
    public Ticket save (
            final Ticket data
    ){
        return repository.save(data);
    }

}
