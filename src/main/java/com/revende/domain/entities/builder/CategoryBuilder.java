package com.revende.domain.entities.builder;

import com.revende.adapter.persistence.entities.Category;
import com.revende.domain.entities.CategoryTypeIdentification;

public class CategoryBuilder {
    
    public static CategoryTypeIdentification fromEntityToDomain
            (Category entity){
        
        if(entity == null) return null;
        
        return new CategoryTypeIdentification()
                .setCategoryId(entity.getCategoryId())
                .setCategoryName(entity.getCategoryName());
    }

  public static Category fromDomainToEntity
          (CategoryTypeIdentification domain){

        if(domain == null) return null;

      Category category = new Category();
      category.setCategoryId(domain.getCategoryId());
      category.setCategoryName(domain.getCategoryName());

      return category;
  }
}
