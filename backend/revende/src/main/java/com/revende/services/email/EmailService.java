package com.revende.services.email;

import javax.mail.MessagingException;
import java.io.IOException;

public interface EmailService {

    void sendEmail(final String email, final String emailType) throws MessagingException, IOException;
}
