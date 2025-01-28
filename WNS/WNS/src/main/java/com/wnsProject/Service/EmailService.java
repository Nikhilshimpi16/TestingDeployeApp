package com.wnsProject.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {
	
	@Autowired
	private  JavaMailSender javaemailsender;
	
	public void sendEmail(String to, String subject, String body)
	{
		SimpleMailMessage mailsend = new SimpleMailMessage();
		mailsend.setTo(to);
		mailsend.setSubject(subject);
		mailsend.setText(body);
		javaemailsender.send(mailsend);
	}

}
