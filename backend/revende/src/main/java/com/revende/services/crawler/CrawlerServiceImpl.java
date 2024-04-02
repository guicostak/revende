package com.revende.services.crawler;

import com.revende.domain.entities.Event;
import com.revende.repositories.EventRepository;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;

@Service
public class CrawlerServiceImpl implements CrawlerService {
    private final EventRepository eventRepository;

    @Value("${app.international.events.host}")
    private String URL_EVENTOS;
    private final int RANGE_MINUTES = 60000;

    public CrawlerServiceImpl(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Scheduled(fixedRate = RANGE_MINUTES)
    @Override
    public void getInternationalEvents() {

        final HttpClient httpClient = HttpClients.createDefault();

        try {
            HttpGet httpGet = new HttpGet(URL_EVENTOS);
            CloseableHttpResponse response = (CloseableHttpResponse) httpClient.execute(httpGet);
            Document document = Jsoup.parse(response.getEntity().getContent(), "UTF-8", URL_EVENTOS + LocalDate.now());

            final Elements elements = document.select("div.tribe-common-g-row.tribe-events-calendar-list__event-row");

            for (Element element : elements) {

                String title = element.select("h3.tribe-events-calendar-list__event-title a")
                        .text();
                String[] arrayString = title.split("–");
                title = arrayString[0];

                final String imageUrl = element.select("div.tribe-events-calendar-list__event-featured-image-wrapper img").
                attr("data-src");

                final String address = element.select("address.tribe-events-calendar-list__event-venue .tribe-events-calendar-list__event-venue-address")
                        .text();

                final String description = element.select("div.tribe-events-calendar-list__event-description")
                        .text();

                final String date = element.select("time.tribe-events-calendar-list__event-date-tag-datetime")
                        .attr("datetime");

                //final String time = element.select("span.tribe-event-time").text();

                if(!LocalDate.parse(date).isBefore(LocalDate.now())){
                    saveEvents(title, imageUrl, address, description, date);
                }
            }

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Event saveEvents(String title, String imageUrl, String address, String description, String date){

        if(!eventRepository.existsByTitle(title)){
            final Event event = new Event();
            event.setTitle(title);
            event.setImage(imageUrl);
            event.setAddress(address);
            event.setDescription(description);
            event.setDate(LocalDate.parse(date));

            return eventRepository.save(event);
        }

        return null;
    }
}
