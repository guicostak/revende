package com.revende.rest.endpoints;

import com.revende.rest.endpoints.dto.request.TicketDTO;
import com.revende.rest.builder.CategoryDTOBuilder;
import com.revende.rest.endpoints.dto.response.CustomResponseBodyDTO;
import com.revende.services.category.CategoryService;
import com.revende.domain.entities.Category;
import com.revende.domain.entities.Ticket;
import com.revende.services.ticket.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/ticket")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/sell")
    public ResponseEntity<?> cadastrarIngresso(@RequestBody TicketDTO ticketDTO, HttpSession session) throws IOException {


        Ticket ticket = new Ticket(ticketDTO);

        categoryService.saveCategory(ticketDTO);

        Category category = CategoryDTOBuilder.toEntity(ticketDTO);
        ticket.setCategory(category);

        var result = ticketService.postRegistrationTicket(ticketDTO, session);

        var response = new CustomResponseBodyDTO<TicketDTO>()
                .setData(result);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<TicketDTO>> getLatestTickets() {
        List<TicketDTO> latestTickets = ticketService.findLatestTickets();
        return ResponseEntity.ok(latestTickets);
    }

    @GetMapping("/related/{ticketId}")
    public ResponseEntity<?> getRelatedTickets(@PathVariable UUID ticketId) {

        var result= ticketService.getRelatedTickets(ticketId);

        var response = new CustomResponseBodyDTO<TicketDTO>()
                .setData((TicketDTO) result);

        return ResponseEntity.ok(response);
    }
}
