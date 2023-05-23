package com.revende.adapter.persistence.repositories;

import com.revende.adapter.persistence.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    List<Ticket> findTop10ByOrderByDateDesc();

}
