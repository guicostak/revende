package com.revende.rest.controller;

import com.revende.services.event.EventService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<?> getAllEventos() throws Exception {

       final var events = eventService.getAllEvents();

       return ResponseEntity.ok(events);
    }
}
