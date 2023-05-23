package com.revende.adapter.persistence.repositories;

import com.revende.adapter.persistence.entities.Category;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface CategoryRepository extends JpaRepository<Category, Integer>{
}
