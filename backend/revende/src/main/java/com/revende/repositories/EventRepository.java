package com.revende.repositories;

import com.revende.domain.entities.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface EventRepository extends JpaRepository<Event, UUID> {

    boolean existsByTitle(String title);

    List<Event> findByDateLessThan(LocalDate date);
}
