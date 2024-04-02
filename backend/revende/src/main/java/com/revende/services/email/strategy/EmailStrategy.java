package com.revende.services.email.strategy;

import com.revende.services.email.enums.EmailType;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailStrategy {

    void execute(final String email) throws MessagingException, IOException;

    EmailType applyTo();
}
