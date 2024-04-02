package com.revende.services.email.strategy;

import com.revende.domain.entities.user.User;
import com.revende.repositories.UserRepository;
import com.revende.services.email.enums.EmailType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;

@Component
public class EmailConfirmationStrategy implements EmailStrategy {
    private final JavaMailSender javaMailSender;
    private final SpringTemplateEngine templateEngine;
    private final UserRepository userRepository;

    private static final String CONFIRMATION_LINK = "http://localhost:3000/confirm/";

    public EmailConfirmationStrategy(JavaMailSender javaMailSender, SpringTemplateEngine templateEngine, UserRepository userRepository) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
        this.userRepository = userRepository;
    }

    @Override
    public void execute(final String email) throws MessagingException {

        final var message = javaMailSender.createMimeMessage();
        final var helper = new MimeMessageHelper(message, true);
        final var confirmationLink = CONFIRMATION_LINK + this.getConfirmationToken(email);
        final var name = this.getUsername(email);

        final var context = new Context();
        context.setVariable("nome", name);
        context.setVariable("confirmationLink", confirmationLink);

        final var emailContent = templateEngine.process("confirmation_email_template", context);

        helper.setTo(email);
        helper.setSubject("Confirmação de E-mail");
        helper.setText(emailContent, true);

        javaMailSender.send(message);
    }

    private String getConfirmationToken(final String email) {

        final var user = userRepository.findByEmail(email);

        return user.map(User::getConfirmationToken).orElse(null);

    }

    private String getUsername(final String email) {

        final var user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            return null;
        }

        final var name = user.get().getName();
        final String [] nameParts = name.split(" ");

        if (nameParts.length > 1) {
            return nameParts[0];
        }

        return null;
    }

    @Override
    public EmailType applyTo() {

        return EmailType.EMAIL_CONFIRMATION;
    }
}
