package com.gdc.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.RuntimeWiringConfigurer;

import graphql.scalars.ExtendedScalars;

@Configuration
public class DataFormatConfig {
	@Bean
	RuntimeWiringConfigurer runtimeWiringConfigurer() {
	    return wiringBuilder -> wiringBuilder.scalar(ExtendedScalars.GraphQLByte);
	}
}
