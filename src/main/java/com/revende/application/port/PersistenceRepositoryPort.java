package com.revende.application.port;

public interface PersistenceRepositoryPort <T>{

    T save(final T data);
}
