package com.revende.repository;

import com.revende.domain.entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {
    List<Ticket> findTop10ByOrderByDateDesc();
    List<Ticket> findRelatedTicketsByCategoryAndDateAndType(String category, LocalDate date, String eventType);

}
