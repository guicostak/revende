package com.revende.exception;

import javax.naming.AuthenticationException;

public class InvalidJwtAuthenticationException extends AuthenticationException {

    public InvalidJwtAuthenticationException(String s){
        super(s);
    }
}
