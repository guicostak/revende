package com.revende.domain.service;

import com.revende.application.entrypoint.dto.request.TicketDTO;
import com.revende.application.entrypoint.builder.CategoryDTOBuilder;
import com.revende.adapter.persistence.entities.Category;
import com.revende.adapter.persistence.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category saveCategory(TicketDTO ticketDTO) {
        Category category = CategoryDTOBuilder.toEntity(ticketDTO);

        return categoryRepository.save(category);
    }
}
