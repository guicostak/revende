package com.revende.services.event;

import com.revende.domain.entities.Event;

import java.util.List;

public interface EventService {
    void deleteExpiredEvents();

    List<Event> getAllEvents() throws Exception;
}
