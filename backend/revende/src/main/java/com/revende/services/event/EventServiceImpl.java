package com.revende.services.event;

import com.revende.domain.entities.Event;
import com.revende.repositories.EventRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class EventServiceImpl implements EventService{

    private final EventRepository eventRepository;

    public EventServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    @Scheduled(cron = "0 0 0 * * ?")
    @Override
    public void deleteExpiredEvents() {
        LocalDate currentDate = LocalDate.now();
        List<Event> expiredEvents = eventRepository.findByDateLessThan(currentDate);

        eventRepository.deleteAll(expiredEvents);
    }

    @Override
    public List<Event> getAllEvents() throws Exception {

        final var events = eventRepository.findAll();

        try{
            if(events.isEmpty()){
                return null;
            }
        }catch(Exception e){
            throw new Exception("Erro ao tentar recuperar os eventos {}", e);
        }

        return events;
    }
}
