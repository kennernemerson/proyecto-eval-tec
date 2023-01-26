package com.kenner.medios;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class MediosApplication {

	public static void main(String[] args) {
		SpringApplication.run(MediosApplication.class, args);
	}
}
